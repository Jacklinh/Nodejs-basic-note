
import { TypeProduct } from '@/types/type';
import productApi from '@/constanst/APIEndPoints/products';
import { formatPrice } from '@/utils/formatPrice';
import Image from 'next/image';
import Link from 'next/link';
import { globalSetting } from '@/constanst/configs';
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import ButtonAddToCart from '../ButtonAddToCart';
import Cart from '../Cart';
interface ProductCategoryProps {
    categorySlug: string;
    searchParams: {
        page?: string;
        limit?: string;
        sort?: string;
        order?: string;
        price_min?: string;
        price_max?: string;
        keyword?: string;
    };
}
const ProductCategory = async ({ categorySlug, searchParams }: ProductCategoryProps) => {
    const currentPage = Number(searchParams.page) || 1;
    const sort = searchParams.sort || 'updateAt';
    const order = searchParams.order || 'DESC';
    const response = await productApi.getProductsCategory({
        category_slug: categorySlug,
        page: currentPage,
        limit: 9,
        sort,
        order,
        price_min: searchParams.price_min,
        price_max: searchParams.price_max,
        keyword: searchParams.keyword
    });
    const products = response.data;
    const products_list = products.products_list;
    const category = products_list[0]?.category;
    const { totalPage } = products.pagination;
    // Tạo pagination links
    const createPageUrl = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        if (sort !== 'updateAt') params.set('sort', sort);
        if (order !== 'DESC') params.set('order', order);
        return `?${params.toString()}`;
    };
    // Thêm hàm helper ở đầu component
    const createClearFilterUrl = () => {
        const params = new URLSearchParams(searchParams);
        params.delete('price_min');
        params.delete('price_max');
        params.delete('keyword');
        // Giữ lại sort và order nếu có
        if (sort === 'updateAt') {
            params.delete('sort');
            params.delete('order');
        }
        return `?${params.toString()}`;
    };
    // Kiểm tra dữ liệu trước khi render
    if (!category) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">Không tìm thấy danh mục này</p>
            </div>
        );
    }
    return (
        <>
            <section className="sec_banner">
                <div className="container mx-auto">
                    {category?.banner && (
                        <div className="banner_item">
                            <p className="banner_img">
                                <Image
                                    src={`${globalSetting.UPLOAD_DIRECTORY}/${category.banner}`}
                                    width={1200}
                                    height={500}
                                    alt={category.category_name}
                                    loading="lazy"
                                />
                            </p>
                            <h1 className="banner_title">{category.category_name}</h1>
                        </div>

                    )}
                </div>
            </section>
            {products_list.length > 0 && (
                <>
                    <section className="sec_product_cate">
                        <div className="container mx-auto">
                            <div className="article_product_cate">
                                <div className="product_cate_list">
                                    {/* sort price */}
                                    <div className="mb-6 flex justify-end items-center gap-5">
                                        <p className='text-lg font-bold'>Sắp xếp theo: </p>
                                        <div className="flex gap-2">
                                            <Link
                                                href={`?sort=price&order=ASC${currentPage > 1 ? `&page=${currentPage}` : ''}`}
                                                className={`px-4 py-2 rounded ${sort === 'price' && order === 'ASC'
                                                    ? 'bg-[#0da487] text-white font-bold border border-blue-500'
                                                    : 'bg-gray-100 hover:bg-gray-200'
                                                    }`}
                                            >
                                                Giá thấp đến cao
                                            </Link>
                                            <Link
                                                href={`?sort=price&order=DESC${currentPage > 1 ? `&page=${currentPage}` : ''}`}
                                                className={`px-4 py-2 rounded ${sort === 'price' && order === 'DESC'
                                                    ? 'bg-[#0da487] text-white font-bold border border-blue-500'
                                                    : 'bg-gray-100 hover:bg-gray-200'
                                                    }`}
                                            >
                                                Giá cao đến thấp
                                            </Link>
                                        </div>
                                    </div>
                                    {/* render product list */}
                                    <ul className="product_list list_col3">
                                        {products_list.map((p: TypeProduct, index: number) => (
                                            <li key={`product-${p._id}-${index}`}>
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
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    {/* Pagination */}
                                    {totalPage > 1 && (
                                        <div className="flex justify-center gap-2 mt-8">
                                            {currentPage > 1 && (
                                                <Link
                                                    href={createPageUrl(currentPage - 1)}
                                                    className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
                                                >
                                                    <GrFormPrevious className='text-2xl' />
                                                </Link>
                                            )}

                                            {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
                                                <Link
                                                    key={page}
                                                    href={createPageUrl(page)}
                                                    className={`px-4 py-2 rounded ${currentPage === page
                                                        ? 'bg-[#0da487] text-white font-bold border border-blue-500'
                                                        : 'bg-gray-100 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    {page}
                                                </Link>
                                            ))}

                                            {currentPage < totalPage && (
                                                <Link
                                                    href={createPageUrl(currentPage + 1)}
                                                    className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
                                                >
                                                    <GrFormNext className='text-2xl' />
                                                </Link>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="aside_prodcuct_cate">
                                    <div className="widget_filter">
                                        <h3>Tìm kiếm</h3>
                                        <form action="" method="GET" className="relative">
                                            <input
                                                type="text"
                                                name="keyword"
                                                defaultValue={searchParams.keyword}
                                                placeholder="Nhập tên sản phẩm"
                                                className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0da487] focus:border-transparent"
                                            />
                                            {/* Giữ lại các param khác */}
                                            {sort !== 'updateAt' && (
                                                <>
                                                    <input type="hidden" name="sort" value={sort} />
                                                    <input type="hidden" name="order" value={order} />
                                                </>
                                            )}
                                            {searchParams.price_min && (
                                                <input type="hidden" name="price_min" value={searchParams.price_min} />
                                            )}
                                            {searchParams.price_max && (
                                                <input type="hidden" name="price_max" value={searchParams.price_max} />
                                            )}
                                            <button
                                                type="submit"
                                                className="my-4 px-3 py-1 bg-[#0da487] text-white rounded hover:bg-[#0b8c6f] transition-colors"
                                            >
                                                Tìm kiếm
                                            </button>

                                        </form>
                                        <h3>Tìm kiếm theo giá</h3>
                                        <div className="filter_list space-y-3">
                                            <Link
                                                href={`?price_min=0&price_max=100000${sort !== 'updateAt' ? `&sort=${sort}&order=${order}` : ''}`}
                                                className="flex items-center px-4 py-2 rounded hover:bg-gray-50"
                                            >
                                                <div className={`w-4 h-4 border rounded mr-2 flex items-center justify-center ${searchParams.price_min === '0' && searchParams.price_max === '100000'
                                                    ? 'border-[#0da487] bg-[#0da487]'
                                                    : 'border-gray-300'
                                                    }`}>
                                                    {searchParams.price_min === '0' && searchParams.price_max === '100000' && (
                                                        <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <span className="text-sm text-gray-700">Dưới 100.000đ</span>
                                            </Link>

                                            <Link
                                                href={`?price_min=100000&price_max=300000${sort !== 'updateAt' ? `&sort=${sort}&order=${order}` : ''}`}
                                                className="flex items-center px-4 py-2 rounded hover:bg-gray-50"
                                            >
                                                <div className={`w-4 h-4 border rounded mr-2 flex items-center justify-center ${searchParams.price_min === '100000' && searchParams.price_max === '300000'
                                                    ? 'border-[#0da487] bg-[#0da487]'
                                                    : 'border-gray-300'
                                                    }`}>
                                                    {searchParams.price_min === '100000' && searchParams.price_max === '300000' && (
                                                        <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <span className="text-sm text-gray-700">100.000đ - 300.000đ</span>
                                            </Link>

                                            <Link
                                                href={`?price_min=300000&price_max=500000${sort !== 'updateAt' ? `&sort=${sort}&order=${order}` : ''}`}
                                                className="flex items-center px-4 py-2 rounded hover:bg-gray-50"
                                            >
                                                <div className={`w-4 h-4 border rounded mr-2 flex items-center justify-center ${searchParams.price_min === '300000' && searchParams.price_max === '500000'
                                                    ? 'border-[#0da487] bg-[#0da487]'
                                                    : 'border-gray-300'
                                                    }`}>
                                                    {searchParams.price_min === '300000' && searchParams.price_max === '500000' && (
                                                        <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <span className="text-sm text-gray-700">300.000đ - 500.000đ</span>
                                            </Link>

                                            <Link
                                                href={`?price_min=500000${sort !== 'updateAt' ? `&sort=${sort}&order=${order}` : ''}`}
                                                className="flex items-center px-4 py-2 rounded hover:bg-gray-50"
                                            >
                                                <div className={`w-4 h-4 border rounded mr-2 flex items-center justify-center ${searchParams.price_min === '500000' && !searchParams.price_max
                                                    ? 'border-[#0da487] bg-[#0da487]'
                                                    : 'border-gray-300'
                                                    }`}>
                                                    {searchParams.price_min === '500000' && !searchParams.price_max && (
                                                        <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <span className="text-sm text-gray-700">Trên 500.000đ</span>
                                            </Link>
                                            <Link
                                                href={createClearFilterUrl()}
                                                className="block w-full mt-4 px-4 py-2 text-sm text-gray-600 bg-[#0da487] text-white rounded hover:bg-red-500 text-center transition-colors"
                                            >
                                                Xoá bộ lọc
                                            </Link>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>

                </>

            )}
            <Cart />
        </>
    );
}

export default ProductCategory