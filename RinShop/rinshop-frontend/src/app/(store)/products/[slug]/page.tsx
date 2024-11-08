"use client";
import ButtonAddToCart from "@/components/ui/common/ButtonAddToCart";
import { globalSetting } from "@/constanst/configs";
import { TypeProduct } from "@/types/type";
import Image from 'next/image'
import Link from "next/link";
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { useEffect, useState } from "react";
import './ckeditor_article.css';
export default function Page({params}:{params: {slug: string}}) {
    const slug = params.slug;
    const [productDetail,setProductDetail] = useState<TypeProduct | null>(null);
    const [relatedProducts,setRelatedProducts] = useState<TypeProduct[] | null>(null);
    useEffect(() => {
        const fetchProductBySlug = async () => {
            try {
                const res = await fetch(`${globalSetting.URL_API}/products/details/${slug}`);
                const data = await res.json();
                setProductDetail(data.data.product_detail);
                setRelatedProducts(data.data.related_products)
            }catch(error) {
                console.log('error',error);
            }
        } 
        fetchProductBySlug();  
    },[slug])
    const items: TabsProps['items'] = [
        {
          key: '1',
          label: 'Chi tiết sản phẩm',
          children: <article className="article-content" dangerouslySetInnerHTML={{ __html: productDetail?.description || '' }}></article>
        }
      ];
    return (
        productDetail && (
            <>
                <section className="sec_product_cate">
                    <div className="container mx-auto">
                        <div className="article_product_cate">
                            <div className="product_cate_list">
                                <div className="product_box product_box_detail">
                                    <div className="product_image">
                                        <p><Image src={`${globalSetting.UPLOAD_DIRECTORY}/${productDetail.thumbnail}`} loading="lazy" width='318' height='344' alt={productDetail.product_name} /></p>
                                    </div>
                                    <div className="product_detail">
                                        <h3>{productDetail.product_name}</h3>
                                        <p className='price_unit'>Đơn vị: 1 kg</p>
                                        <div className="product_price">
                                            <p className='price'>  
                                                {
                                                    productDetail.discount > 0 ? 
                                                    (
                                                        <>
                                                            <span className='product_discount'>Khuyến mãi giảm {productDetail.discount} %</span>
                                                            <del>{productDetail.price} VNĐ</del>
                                                            <span className='price_new'>{(productDetail.price - (productDetail.price * productDetail.discount / 100)).toLocaleString('vi-VN')} VNĐ</span>
                                                        </>
                                                    ): 
                                                    (
                                                        <span className='price_new'>{productDetail.price.toLocaleString('vi-VN')} VNĐ</span>
                                                    )
                                                }
                                                
                                            </p>
                                            <p className="cate">Danh mục: {productDetail.category.category_name}</p>
                                            <ButtonAddToCart 
                                                data={{
                                                    _id: productDetail._id,
                                                    product_name: productDetail.product_name,
                                                    price: productDetail.price,
                                                    discount: productDetail.discount,
                                                    thumbnail: productDetail.thumbnail,
                                                    quantity: 1  
                                                }} 
                                            />
                                        </div> 
                                    </div>
                                </div>
                                <div className="product_description">
                                    <Tabs defaultActiveKey="1" items={items}/>
                                </div>
                            </div>
                            <div className="aside_prodcuct_cate">
                                <p className="aside_image"><Image loading="lazy" src='/images/aside_vegetable.jpg' width='375' height='980' alt='vegetable banner' /></p>               
                            </div>
                        </div>
                    </div>
                </section>
                <section className="sec_related_products">
                    <div className="container mx-auto">
                        <div className="related_products">
                            <h2 className="sec_heading">Sản phẩm liên quan</h2>
                            <ul className="product_list">
                                {
                                    relatedProducts && relatedProducts.map((p: TypeProduct) => {
                                        return (
                                            <li key={`related_product_${p._id}`}>
                                                <div className="product_box">
                                                    <div className="product_image">
                                                        <Link href={`/products/${p.slug}`}>
                                                            <Image src={`${globalSetting.UPLOAD_DIRECTORY}/${p.thumbnail}`} loading="lazy" width='200' height='200' alt={p.product_name} />
                                                        </Link>
                                                    </div>
                                                    <div className="product_detail">
                                                        <h3><Link href={`/products/${p.slug}`}>{p.product_name}</Link></h3>
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
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </section>
                
            </>
            
           
        )
  )
}