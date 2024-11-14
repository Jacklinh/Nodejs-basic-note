import Link from 'next/link';
import Image from 'next/image';
import { TypeCategory, TypeProduct } from '@/types/type';
import styles from './CategoryList.module.css';
import categoryApi from '@/constanst/APIEndPoints/categories';
import productsApi from '@/constanst/APIEndPoints/products';
import { FaArrowRightToBracket } from 'react-icons/fa6';
import ButtonAddToCart from '../ButtonAddToCart';
import { globalSetting } from '@/constanst/configs';
import { formatPrice } from '@/utils/formatPrice';
async function CategoryList() {
    // Fetch data trực tiếp từ server component
    const response = await categoryApi.getAllCategories();
    const categories = response.data.categories_list;
    // fetch 5 sản phẩm theo danh mục
    const productsCategory = await Promise.all(categories.map(async (category: TypeCategory) => {
        const responseProducts = await productsApi.getProductsCategoryHome(category.slug || '');
        const products = responseProducts.data.products_list;
        return {
            category,
            products
        };
    }));
    return (
        <>
            <section className="sec_category my-[40px]">
                <div className="container mx-auto">
                    <h2 className="sec_heading">Danh mục sản phẩm</h2>
                    <div className="article_category">
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {categories.map((category: TypeCategory) => (
                                <Link 
                                    key={category._id} 
                                    href={`/category/${category.slug}`} 
                                    className={styles.category_box}
                                >
                                    <Image loading='lazy' height={40} width={40} src='images/category/vegetable.svg' alt='vegetable image' />
                                    <span>{category.category_name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            {productsCategory.map(({category,products}) => (
                <>  
                    {/* nếu sản phẩm không có trong category thì không render */}
                    {products.length > 0 && (
                        <section className="sec_product_best my-[40px]" key={`productCategoryHome_${category._id}`}>
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
                                        {products.map((p: TypeProduct) => (
                                            <li key={p._id}>
                                                <div className="product_box">
                                                <div className="product_image">
                                                    <Link href={`/products/${p.slug}`}>
                                                        <Image
                                                            src={`${globalSetting.UPLOAD_DIRECTORY}/${p.thumbnail}`}
                                                            width={500}
                                                            height={500}    
                                                            alt={p.product_name}
                                                            loading="lazy"
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="product_detail">
                                                    <h3>
                                                        <Link href={`/product/${p.slug}`}>{p.product_name}</Link>
                                                    </h3>
                                                    <p className="price_unit">Đơn vị {p.unit}</p>
                                                    <div className="product_price">
                                                        <p className="price">
                                                                {p.discount > 0 ? (
                                                                    <>
                                                                        <span className="product_discount">{p.discount} %</span>
                                                                        <del>{formatPrice(p.price)}</del>
                                                                        <span className="price_new">
                                                                            {formatPrice(p.price - (p.price * p.discount / 100))}
                                                                        </span>
                                                                    </>
                                                                ) : (
                                                                    <span className="price_new">{formatPrice(p.price)}</span>
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
                                                        quantity: 1,
                                                        stock: p.stock
                                                    }}
                                                />
                                            </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>
                    )}
                </>
            ))}
        </>
    );
}

export default CategoryList;