"use client";
import { Suspense } from 'react';
import LoadingSpinner from "@/components/ui/common/Loading";
import { globalSetting } from "@/constanst/configs";
import { TypeProduct, TProductCate, TypeCategory } from "@/types/type";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { Pagination, Radio, Space } from "antd";
import type { PaginationProps, RadioChangeEvent } from 'antd';
import ButtonAddToCart from "@/components/ui/common/ButtonAddToCart";
import Cart from '@/components/ui/common/Cart';

export default function Page({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    const [products, setProducts] = useState<TProductCate | null>(null);
    const [categories, setCategories] = useState<TypeCategory[]>([]);
    const [filterCategory, setFilterCategory] = useState<string | null>(slug);
    const [sortOrder, setSortOrder] = useState<string>("ASC");

    const router = useRouter();
    const searchParams = useSearchParams();
    const page_str = searchParams.get('page');
    const page = page_str ? parseInt(page_str) : 1;

    useEffect(() => {
        const fetchProductBySlug = async () => {
            try {
                const selectedSlug = filterCategory || slug;
                const url = `${globalSetting.URL_API}/products/slug/${selectedSlug}?page=${page}&sort=price&order=${sortOrder}`;
                const res = await fetch(url, { next: { revalidate: 60 } });
                const data = await res.json();
                setProducts(data.data);
            } catch (error) {
                console.log('error', error);
            }
        };
        fetchProductBySlug();
    }, [page, slug, filterCategory, sortOrder]);

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch(`${globalSetting.URL_API}/categories`, {
                next: { revalidate: 60 },
            });
            const data = await res.json();
            setCategories(data.data.categories_list);
        };
        fetchCategories();
    }, []);

    const onChangePagination: PaginationProps["onChange"] = (page) => {
        router.push(`?page=${page}`);
    };

    const handleSortChange = (e: RadioChangeEvent) => {
        setSortOrder(e.target.value);
    };

    const handleCategoryChange = (e: RadioChangeEvent) => {
        const selectedCategory = e.target.value;
        setFilterCategory(selectedCategory);
        router.push(`/category/${selectedCategory}`);
    };

    const currentCategory = categories.find((category) => category.slug === filterCategory);

    return (
        <>
        <Suspense fallback={<LoadingSpinner />}>
            <section className="sec_banner">
                <div className="container mx-auto">
                    {currentCategory?.banner && (
                        <p className="banner_item">
                            <Image
                                src={`${globalSetting.UPLOAD_DIRECTORY}/${currentCategory.banner}`}
                                width={1200}
                                height={500}
                                alt={currentCategory.category_name}
                                loading="lazy"
                            />
                        </p>
                    )}
                </div>
            </section>
            <section className="sec_product_cate">
                <div className="container mx-auto">
                    <div className="article_product_cate">
                        <div className="product_cate_list">
                            {products && products.products_list.length > 0 ? (
                                <>
                                    <div className="product_sort">
                                        <p>Sắp xếp theo:</p>
                                        <Radio.Group onChange={handleSortChange} value={sortOrder}>
                                            <Space direction="horizontal">
                                                <Radio.Button value="ASC">Giá thấp đến cao</Radio.Button>
                                                <Radio.Button value="DESC">Giá cao đến thấp</Radio.Button>
                                            </Space>
                                        </Radio.Group>
                                    </div>
                                    <ul className="product_list list_col3">
                                        {products.products_list.map((p: TypeProduct) => (
                                            <li key={`productCate_${p._id}`}>
                                                <div className="product_box">
                                                    <div className="product_image">
                                                        <Link href={`/products/${p.slug}`}>
                                                            <Image
                                                                src={`${globalSetting.UPLOAD_DIRECTORY}/${p.thumbnail}`}
                                                                width={200}
                                                                height={200}
                                                                alt={p.product_name}
                                                                loading="lazy"
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="product_detail">
                                                        <h3>
                                                            <Link href={`/products/${p.slug}`}>{p.product_name}</Link>
                                                        </h3>
                                                        <p className="price_unit">1 kg</p>
                                                        <div className="product_price">
                                                            <p className="price">
                                                                {p.discount > 0 ? (
                                                                    <>
                                                                        <span className="product_discount">{p.discount} %</span>
                                                                        <del>{new Intl.NumberFormat('vi-VN',{style: 'currency',currency: 'VND'}).format(p.price)}</del>
                                                                        <span className="price_new">
                                                                            {new Intl.NumberFormat('vi-VN',{style: 'currency',currency: 'VND'}).format(p.price - (p.price * p.discount / 100))}
                                                                        </span>
                                                                    </>
                                                                ) : (
                                                                    <span className="price_new">{new Intl.NumberFormat('vi-VN',{style: 'currency',currency: 'VND'}).format(p.price)}</span>
                                                                )}
                                                            </p>
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
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <Pagination
                                        className="pagination_page my-[40px]"
                                        defaultCurrent={1}
                                        pageSize={products.pagination.limit || 5}
                                        total={products.pagination.totalRecords || 0}
                                        onChange={onChangePagination}
                                    />
                                </>
                            ) : (
                                <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">Hiện chưa có sản phẩm nào phù hợp</p>
                            )}
                        </div>
                        <div className="aside_prodcuct_cate">
                            <div className="widget_filter">
                                <h3>Danh mục sản phẩm</h3>
                                <Radio.Group
                                    onChange={handleCategoryChange}
                                    value={filterCategory}
                                    className="widget_radio"
                                >
                                    <Space direction="vertical">
                                        {categories.map((category) => (
                                            <Radio value={category.slug} key={`category_filter_${category._id}`}>
                                                {category.category_name}
                                            </Radio>
                                        ))}
                                    </Space>
                                </Radio.Group>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Cart />
        </Suspense>
    
        </>
    );
}
