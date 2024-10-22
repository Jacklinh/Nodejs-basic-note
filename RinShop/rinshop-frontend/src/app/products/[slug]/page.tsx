
"use client";
import { globalSetting } from "@/constanst/configs";
import { TypeProduct } from "@/types/type";
import Image from 'next/image'
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
export default function Page({params}:{params: {slug: string}}) {
    const {addToCart} = useCart();
    const slug = params.slug;
    const [productDetail,setProductDetail] = useState<TypeProduct | null>(null);
    useEffect(() => {
        const fetchProductBySlug = async () => {
            try {
                const res = await fetch(`${globalSetting.URL_API}/products/details/${slug}`);
                const data = await res.json();
                setProductDetail(data.data);
            }catch(error) {
                console.log('error',error);
            }
        } 
        fetchProductBySlug();  
    },[slug])
    const handleAddToCart = () => {
        const product = {
            _id: productDetail?._id,
            product_name: productDetail?.product_name,
            price: productDetail?.price || 0,
            discount: productDetail?.discount,
            quantity: 1 // thêm 1 sản phẩm vào giỏ hàng
        }
        addToCart(product);
    }
    return (
        <>
           {productDetail && (
            <>
                <h1>{productDetail.product_name}</h1>
                <p>{productDetail.description}</p>
                <p>
                    <Image
                    src={`${globalSetting.UPLOAD_DIRECTORY}/${productDetail.thumbnail}`}
                    width={450}
                    height={450}
                    alt={productDetail.product_name}
                    />
                </p>
                <button type="button" className="bg-blue-500 text-white py-2 px-4" onClick={handleAddToCart}>Mua ngay</button>
            </>
           )}
        </>
  )
}