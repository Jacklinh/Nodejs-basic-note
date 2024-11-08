'use client'
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import Image from 'next/image'
import styles from './MainVisual.module.css'
const MainVisual = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        loop={true} 
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{
            delay: 3000,
            disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // Cập nhật slide active
        >
        <SwiperSlide>
            <div className={styles.mainvs_item}>
                <div className="mainvs_img">
                    <Image 
                        src="/images/mainvs-1.jpg"
                        alt="slide-bg-10"
                        width={1920} 
                        height={650} 
                        loading='lazy'
                    />
                </div>
                <div className={styles.mainvs_cnt}>
                    <div className={`${styles.mainvs_inner} ${activeIndex === 0 ? styles.active : '' }`}>
                        <h2 className='heading_h2'>Trái Cây Tươi Sạch</h2>
                        <p>Thưởng thức trái cây tươi ngon, giàu dinh dưỡng từ những nguồn cung cấp uy tín.</p>
                    </div>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className={styles.mainvs_item}>
                <div className="mainvs_img">
                    <Image 
                        src="/images/mainvs-2.jpg"
                        alt="slide-bg-11"
                        width={1920} 
                        height={650} 
                        loading='lazy'
                    />
                </div>
                <div className={styles.mainvs_cnt}>
                    <div className={`${styles.mainvs_inner} ${activeIndex === 1 ? styles.active : '' }`}>
                        <h2 className='heading_h2'>Thực Phẩm Hữu Cơ</h2>
                        <p>Sản phẩm rau củ quả hữu cơ, an toàn cho sức khỏe, thân thiện với môi trường.</p>
                    </div>
                </div>
            </div>
        </SwiperSlide>
        </Swiper>
    )
}

export default MainVisual