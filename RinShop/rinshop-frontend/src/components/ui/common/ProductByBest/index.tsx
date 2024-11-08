
"use client";
import {useEffect, useState} from 'react';
import { globalSetting } from '@/constanst/configs';
import Image from 'next/image';
import Link from 'next/link';
import { TypeProduct } from '@/types/type';
import { FaCartPlus } from "react-icons/fa";
const ProductByBest = () => {
    // get product by is best
    const [productsIsBest, setProductsIsBest] = useState([]);
    useEffect(() => {
        const fetchProductsIsBest = async () => {
            const dataProductsIsBest = await fetch(`${globalSetting.URL_API}/products/isbest/`, {
                next: { revalidate: 60 },
            });
            const productsIsBestData = await dataProductsIsBest.json();
            setProductsIsBest(productsIsBestData.data.products_list);
        };
        
        fetchProductsIsBest();
    }, []);
    return (
        <div className="article_product">
            <Link href='/isbest'>Xem thêm</Link>
            <ul className="product_list">
                {
                    productsIsBest && productsIsBest.length > 0 && 
                    productsIsBest.map((p: TypeProduct) => {
                        return (
                            <li key={`productIsBest_${p._id}`}>
                                <div className="product_box">
                                    <div className="product_image">
                                        <Link href=''>
                                            <Image src={`${globalSetting.UPLOAD_DIRECTORY}/${p.thumbnail}`} loading='lazy' width='200' height='200' alt={p.product_name} />
                                        </Link>
                                    </div>
                                    <div className="product_detail">
                                        <h3><Link href=''>{p.product_name}</Link></h3>
                                        <p className='price_unit'>1 kg</p>
                                        <div className="product_price">
                                            <p className='price'>
                                                {
                                                    p.discount > 0 ? 
                                                    (
                                                        <>
                                                            <span className='product_discount'>{p.discount} %</span>
                                                            <del>{p.price} VNĐ</del>
                                                            <span className='price_new'>{(p.price - (p.price * p.discount / 100)).toLocaleString('vi-VN')} VNĐ</span>
                                                        </>
                                                    ): 
                                                    (
                                                        <span className='price_new'>{p.price.toLocaleString('vi-VN')} VNĐ</span>
                                                    )
                                                }
                                                
                                            </p>
                                            <p className='addtocart_btn'>
                                                <button type="button"><FaCartPlus /> Mua ngay</button>
                                            </p>
                                        </div> 
                                    </div>

                                </div>
                            </li>
                        )
                    })
                }
                
            </ul>
        </div>
    )
}

export default ProductByBest