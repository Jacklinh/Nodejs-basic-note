"use client";
import { useEffect, useState } from 'react';
import { globalSetting } from '@/constanst/configs';
import Image from 'next/image';
import Link from 'next/link';
import { TypeProduct, TypeCategory } from '@/types/type';
import { FaArrowRightToBracket } from "react-icons/fa6";
import ButtonAddToCart from '../ButtonAddToCart';

const ProductHomeByCate = () => {
    const [productsByCate, setProductsByCate] = useState<{ category: TypeCategory; products: TypeProduct[] }[]>([]);

    useEffect(() => {
        const fetchProductsByCate = async () => {
            try {
                // Lấy danh sách tất cả category
                const dataCategories = await fetch(`${globalSetting.URL_API}/categories`, {
                    next: { revalidate: 60 },
                });
                const categoriesData = await dataCategories.json();
                const categories = categoriesData.data.categories_list;

                // Tạo các promises để lấy các sản phẩm của từng category
                const categoryProductPromises = categories.map(async (category: TypeCategory) => {
                    const productsRes = await fetch(`${globalSetting.URL_API}/products/slug/${category.slug}`, {
                        next: { revalidate: 60 },
                    });
                    const productsData = await productsRes.json();
                    return { category, products: productsData.data.products_list || [] };
                });

                // Đợi tất cả các promises hoàn thành và cập nhật vào state
                const result = await Promise.all(categoryProductPromises);
                setProductsByCate(result);
            } catch (error) {
                console.log('error', error);
            }
        };

        fetchProductsByCate();
    }, []);

    return (
        <>
            {productsByCate.map(({ category, products }) => (
                products.length > 0 ? (
                    <section className="sec_product_best my-[40px]" key={`productCateHome_${category._id}`}>
                        <div className="container mx-auto">
                            <div className="product_heading">
                                <h2 className="sec_heading">Sản phẩm {category.category_name}</h2>
                                <p className="readmore">
                                    <Link href={`/category/${category.slug}`}>
                                        Xem thêm <FaArrowRightToBracket />
                                    </Link>
                                </p>
                            </div>
                            <div className="article_product">
                                <ul className="product_list">
                                    {products.slice(0, 5).map((p: TypeProduct) => (
                                        <li key={`productCatHome_${p._id}`}>
                                            <div className="product_box">
                                                <div className="product_image">
                                                    <Link href={`/products/${p.slug}`}>
                                                        <Image
                                                            src={`${globalSetting.UPLOAD_DIRECTORY}/${p.thumbnail}`}
                                                            width='200'
                                                            height='200'
                                                            alt={p.product_name}
                                                            loading='lazy'
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="product_detail">
                                                    <h3>
                                                        <Link href={`/products/${p.slug}`}>{p.product_name}</Link>
                                                    </h3>
                                                    <p className='price_unit'>1 kg</p>
                                                    <div className="product_price">
                                                        <p className='price'>
                                                            {p.discount > 0 ? (
                                                                <>
                                                                    <span className='product_discount'>{p.discount} %</span>
                                                                    <del>{p.price.toLocaleString('vi-VN')} VNĐ</del>
                                                                    <span className='price_new'>
                                                                        {(p.price - (p.price * p.discount / 100)).toLocaleString('vi-VN')} VNĐ
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                <span className='price_new'>{p.price.toLocaleString('vi-VN')} VNĐ</span>
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
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
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                ) : null
            ))}
        </>
    );
};

export default ProductHomeByCate;
