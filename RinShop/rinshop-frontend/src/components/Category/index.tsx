import React from 'react'
import { globalSetting } from '@/constanst/configs';
import Link from 'next/link';
import { TypeCategory } from '@/types/type';
export default async function Category() {
    // get category
    const dataCategories = await fetch(`${globalSetting.URL_API}/categories`,{
        next: { revalidate: 60 }, // sau 60s thi refect lại fetch data
    });
    const categories = await dataCategories.json();
    return (
        <div className='aside_category'>
            <div className="container mx-auto">
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
            </div>
        </div>

    )
}