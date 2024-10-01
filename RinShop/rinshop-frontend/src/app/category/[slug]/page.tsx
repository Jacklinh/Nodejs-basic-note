
"use client";
import { globalSetting } from "@/constanst/configs";
import { TypeProduct } from "@/types/type";
import Link from 'next/link';
import Image from 'next/image'
import { useEffect, useState } from "react";

export default function Page({params} : {params: {slug: string}}) {
   const slug = params.slug;
   const [products, setProducts] = useState<TypeProduct[] | null>(null);
   useEffect(() => {
    const fetchProductBySlug = async () => {
        try {
            const res = await fetch(`${globalSetting.URL_API}/products/slug/${slug}`);
            const data = await res.json();
            setProducts(data.data);
        }catch(error) {
            console.log('error',error)
        }
    }
    fetchProductBySlug()
   },[slug])
    return (
        <>
            <h1>product by category  {slug}</h1>
            <ul className='product_list'>
            {products && products.length > 0 ? (
            products.map((p: TypeProduct) => (
                <li key={p._id}>
                <div className="product_item">
                    <div className="product_img">
                    {/* Hiển thị hình ảnh sản phẩm nếu có */}
                    {p.thumbnail && (
                        <Image
                        src={`${globalSetting.UPLOAD_DIRECTORY}/${p.thumbnail}`}
                        width={450}
                        height={450}
                        alt={p.product_name}
                        />
                    )}
                    </div>
                    <div className="product_cnt">
                    <p className="product_name">
                        <Link href={`/products/${p.slug}`}>{p.product_name}</Link>
                    </p>

                    {/* Kiểm tra và hiển thị giảm giá */}
                    {p.discount > 0 ? (
                        <>
                        <p className='product_discount'>{p.discount}%</p>
                        <p className="product_price">
                            <del>{p.price} VND</del>
                            <span>{(p.price - (p.price * p.discount / 100)).toFixed(0)} VND</span>
                        </p>
                        </>
                    ) : (
                        <p className="product_price">
                        <span>{p.price} VND</span>
                        </p>
                    )}
                    </div>
                </div>
                </li>
            ))
        ) : (
          <p>No products found for this category.</p>
        )}
                
            </ul>
        </>
    )
}
