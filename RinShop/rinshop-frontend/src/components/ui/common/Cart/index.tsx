'use client';
import { useState,useEffect } from 'react'
import { useCart } from '@/hooks/useCart';
import { FaWindowClose } from "react-icons/fa";
import { BsCartXFill } from "react-icons/bs";
import Image from 'next/image';
import Link from 'next/link';
import { globalSetting } from '@/constanst/configs';
import ButtonAddToCart from '../ButtonAddToCart';
import { Button } from "@/components/ui/button";
import { formatPrice } from '@/utils/formatPrice';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
const Cart = () => {
    const {getTotalNumber,totalAmount,products,removeFromCart} = useCart();
    const [totalNumber, setTotalNumber] = useState(0);
    // cập nhật khi product thay đổi
    useEffect(() => {
        setTotalNumber(getTotalNumber());
    }, [products]); 
    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="default" className='product_cart'>
                        <span className='cart_number'>{totalNumber} sản phẩm</span>
                        <span className='cart_price'>{formatPrice(totalAmount)}</span>
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>GIỎ HÀNG</SheetTitle>
                        <SheetDescription>{totalNumber} sản phẩm</SheetDescription>
                    </SheetHeader>
                    <div className="box_modal_cart">
                        {!products.length ? (
                            <p className='cart_nodata'><BsCartXFill /></p>
                        ) : (
                            <div className="box_cart">
                                <ul className="cart_list">
                                    {products.map((p) => (
                                        <li key={`product_cart_${p._id}`}>
                                            <div className="cart_item">
                                                <p className="cart_image">
                                                    <Image
                                                        src={`${globalSetting.UPLOAD_DIRECTORY}/${p.thumbnail}`}
                                                        width={50}
                                                        height={50}
                                                        alt={`${p.product_name}`}
                                                        loading='lazy'
                                                    />
                                                </p>
                                                <p className="cart_name">{p.product_name}</p>
                                                <p className='cart_price'>
                                                    {
                                                        p.discount ? 
                                                        (
                                                            <>
                                                                <span className='price_new'>{(p.price - (p.price * p.discount / 100)).toLocaleString('vi-VN')} VNĐ</span>
                                                            </>
                                                        ): 
                                                        (
                                                            <span className='price_new'>{new Intl.NumberFormat('vi-VN',{style: 'currency',currency: 'VND'}).format(p.price)}</span>
                                                        )
                                                    }
                                                </p>
                                            </div>
                                            <div className="cart_button">
                                                <ButtonAddToCart
                                                        data={{
                                                            _id: p._id,
                                                            product_name: p.product_name,
                                                            price: p.price,
                                                            discount: p.discount,
                                                            thumbnail: p.thumbnail,
                                                            quantity: 1
                                                        }}
                                                />
                                                <p className='cart_button_delete'>
                                                    <button onClick={() => removeFromCart(p._id)}><FaWindowClose /></button>
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <SheetFooter>
                                    <p className="cart_checkout">
                                        <Link href='/checkout'>Thanh toán <span className='cart_price'>{new Intl.NumberFormat('vi-VN',{style: 'currency',currency: 'VND'}).format(totalAmount)}</span></Link>
                                    </p>
                                </SheetFooter>
                            </div>
                            
                        )}
                        
                    </div>
                    
                </SheetContent>
            </Sheet>
        </>
    )
}

export default Cart