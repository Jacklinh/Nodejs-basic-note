'use client';
import { useState,useEffect } from 'react'
import { Button, Drawer  } from 'antd';
import { useCart } from '@/hooks/useCart';
import { FaCartPlus } from "react-icons/fa6";
import { FaWindowClose } from "react-icons/fa";
import { BsCartXFill } from "react-icons/bs";
import Image from 'next/image';
import Link from 'next/link';
import { globalSetting } from '@/constanst/configs';
import ButtonAddToCart from '../ButtonAddToCart';
const Cart = () => {
    const {getTotalNumber,totalAmount,products,removeFromCart} = useCart();
    const [totalNumber, setTotalNumber] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // cập nhật khi product thay đổi
    useEffect(() => {
        setTotalNumber(getTotalNumber());
    }, [products]); 
    return (
        <>
            <Button type="primary" onClick={showModal} className='product_cart'>
                <span className='cart_number'><FaCartPlus />{totalNumber} sản phẩm</span>
                <span className='cart_price'>{new Intl.NumberFormat('vi-VN',{style: 'currency',currency: 'VND'}).format(totalAmount)}</span>
            </Button>
            <Drawer title="GIỎ HÀNG" open={isModalOpen} onClose={handleCancel}>
                <div className="box_modal_cart">
                    <p className="cart_heading"><FaCartPlus />{totalNumber} sản phẩm</p>
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
                                                    width='50'
                                                    height='50'
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
                            <p className="cart_checkout">
                                <Link href='/checkout' onClick={handleCancel}>Thanh toán <span className='cart_price'>{new Intl.NumberFormat('vi-VN',{style: 'currency',currency: 'VND'}).format(totalAmount)}</span></Link>
                            </p>
                        </div>
                    )}
                    
                </div>
            </Drawer>
        </>
    )
}

export default Cart