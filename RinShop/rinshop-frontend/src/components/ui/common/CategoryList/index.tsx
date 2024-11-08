"use client";
import {useEffect, useState} from 'react';
import { globalSetting } from '@/constanst/configs';
import Link from 'next/link';
import Image from 'next/image';
import { TypeCategory } from '@/types/type';
import styles from './CategoryList.module.css'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper/modules';

const CategoryList = () => {
    // get category
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            const dataCategories = await fetch(`${globalSetting.URL_API}/categories`, {
                next: { revalidate: 60 },
            });
            const categoriesData = await dataCategories.json();
            setCategories(categoriesData.data.categories_list);
        };
        
        fetchCategories();
    }, []);
    return (
        <section className="sec_category my-[40px]">
            <div className="container mx-auto">
                <h2 className="sec_heading">Danh mục sản phẩm</h2>
                <div className='article_category'>
                    <Swiper className={styles.category_list} spaceBetween={30} slidesPerView={5} scrollbar={{hide: true, draggable: true}} modules={[Scrollbar]} >
                        {
                            categories && categories.length > 0 
                            && categories.map((c: TypeCategory)=> {
                                return (
                                    <SwiperSlide key={`categories_${c._id}`} className={styles.category_item}>
                                        <Link href={`/category/${c.slug}`} className={styles.category_box}>
                                            <Image loading='lazy' height={40} width={40} src='images/category/vegetable.svg' alt='vegetable image' />
                                            <span>{c.category_name}</span>
                                        </Link>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>
            </div>
        </section>

    )
}

export default CategoryList;