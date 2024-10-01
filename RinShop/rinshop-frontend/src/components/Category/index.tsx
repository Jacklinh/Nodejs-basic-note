import React from 'react'
import { globalSetting } from '@/constanst/configs';
import Link from 'next/link';
import Image from 'next/image'
import { TypeCategory, TypeProduct } from '@/types/type';
export default async function Category() {
    // get category
    const dataCategories = await fetch(`${globalSetting.URL_API}/categories`,{
        next: { revalidate: 60 }, // sau 60s thi refect lại fetch data
    });
    const categories = await dataCategories.json();
    // get products
    const dataProducts = await fetch(`${globalSetting.URL_API}/products`,{
        next: { revalidate: 60 }, // sau 60s thi refect lại fetch data
    });
    const products = await dataProducts.json();
    return (
        <div className='aside_category'>
            <ul className='category_list'>
                {
                    categories && categories.data.categories_list.length > 0 
                    && categories.data.categories_list.map((c: TypeCategory)=> {
                        return (
                            <li key={c._id}>
                                <Link href={`/category/${c.slug}`}>{c.category_name}</Link>
                            </li>
                        )
                    })
                }
            </ul>
            <ul className='product_list'>
                {
                    products && products.data.products_list.length > 0
                    && products.data.products_list.map((p: TypeProduct) => {
                        return (
                            <li key={p._id}>
                                <div className="product_item">
                                    <div className="product_img">
                                        <p><Image src={`${globalSetting.UPLOAD_DIRECTORY}/${p.thumbnail}`} width={450} height={450} alt="" /></p>
                                    </div>
                                    <div className="product_cnt">
                                        <p className="product_name">
                                            <Link href="/">{p.product_name}</Link>
                                        </p>
                                        {p.discount > 0 && (
                                            <>
                                                <p className='product_discount'>{p.discount}%</p>
                                                <p className="product_price">
                                                    <del>{p.price} VND</del>
                                                    <span>{(p.price - (p.price * p.discount / 100)).toFixed(0)} VND</span>
                                                </p>
                                            </>
                                        )}
                                        {p.discount === 0 && (
                                            <p className="product_price">
                                                <span>{p.price} VND</span>
                                            </p>
                                        )}
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