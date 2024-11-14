import { Skeleton } from "@/components/ui/skeleton"

export default function ProductCategoryLoading() {
    return (
        <> 
            <section className="sec_banner">
                <div className="container mx-auto">
                    <div className="banner_item">
                        <Skeleton className="w-full h-[250px]" />
                    </div>
                </div>
            </section>
            <section className="sec_product_cate">
                <div className="container mx-auto">
                    <div className="article_product_cate">
                        <div className="product_cate_list">
                            {/* Sort section loading */}
                            <div className="mb-6 flex justify-end items-center gap-5">
                                <Skeleton className="h-4 w-[120px]" />
                                <div className="flex gap-2">
                                    <Skeleton className="h-[40px] w-[150px]" />
                                    <Skeleton className="h-[40px] w-[150px]" />
                                </div>
                            </div>

                            {/* Products grid loading */}
                            <ul className="product_list list_col3">
                                {[...Array(9)].map((_, index) => (
                                    <li key={`skeleton-${index}`}>
                                        <div className="product_box">
                                            <div className="product_image">
                                                <Skeleton className="w-full h-[200px] mb-4" />
                                            </div>
                                            <div className="product_detail space-y-3">
                                                <Skeleton className="h-4 w-full" />
                                                <Skeleton className="h-4 w-[100px]" />
                                                <div className="product_price flex justify-between items-center">
                                                    <Skeleton className="h-6 w-[120px]" />
                                                    <Skeleton className="h-[40px] w-[40px] rounded-full" />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            {/* Pagination loading */}
                            <div className="flex justify-center gap-2 mt-8">
                                {[...Array(5)].map((_, index) => (
                                    <Skeleton 
                                        key={`page-${index}`}
                                        className="h-[40px] w-[40px]"
                                    />
                                ))}
                            </div>
                        </div>  

                        {/* Sidebar filters loading */}
                        <div className="aside_prodcuct_cate">
                            <div className="widget_filter space-y-6">
                                {/* Search section */}
                                <div className="space-y-3">
                                    <Skeleton className="h-6 w-[100px]" />
                                    <Skeleton className="h-[40px] w-full" />
                                    <Skeleton className="h-[40px] w-[100px]" />
                                </div>

                                {/* Price filter section */}
                                <div className="space-y-3">
                                    <Skeleton className="h-6 w-[150px]" />
                                    {[...Array(4)].map((_, index) => (
                                        <Skeleton 
                                            key={`filter-${index}`}
                                            className="h-[40px] w-full"
                                        />
                                    ))}
                                    <Skeleton className="h-[40px] w-full mt-4" />
                                </div>
                            </div>
                        </div>
                    </div>           
                </div>
            </section>
        </>
    )
}