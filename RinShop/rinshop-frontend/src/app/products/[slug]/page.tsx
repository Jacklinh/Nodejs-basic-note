
"use client";
import { globalSetting } from "@/constanst/configs";
import { TypeProduct } from "@/types/type";
import Link from 'next/link';
import Image from 'next/image'
import { useEffect, useState } from "react";
export default function Page({params}:{params: {slug: string}}) {
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
    console.log(productDetail)
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
            </>
           )}
        </>
  )
}