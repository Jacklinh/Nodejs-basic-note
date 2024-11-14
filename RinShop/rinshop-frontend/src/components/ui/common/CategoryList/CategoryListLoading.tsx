import { Skeleton } from "@/components/ui/skeleton"

export default function CategoryListLoading() {
  return (
    <>
      {/* Loading cho phần danh mục */}
      <section className="sec_category my-[40px]">
        <div className="container mx-auto">
          <Skeleton className="h-8 w-[200px] mb-6" /> {/* Loading cho tiêu đề */}
          <div className="article_category">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, index) => (
                <div 
                  key={`category-skeleton-${index}`} 
                  className="flex flex-col items-center gap-3 p-4 rounded-lg border"
                >
                  <Skeleton className="h-[40px] w-[40px] rounded-full" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Loading cho phần sản phẩm theo danh mục */}
      {[...Array(6)].map((_, sectionIndex) => (
        <section className="sec_product_best my-[40px]" key={`section-skeleton-${sectionIndex}`}>
          <div className="container mx-auto">
            {/* Loading cho header section */}
            <div className="product_heading flex justify-between items-center mb-6">
              <Skeleton className="h-8 w-[200px]" />
              <Skeleton className="h-8 w-[100px]" />
            </div>

            {/* Loading cho danh sách sản phẩm */}
            <div className="article_product">
              <ul className="product_list grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[...Array(5)].map((_, productIndex) => (
                  <li key={`product-skeleton-${sectionIndex}-${productIndex}`}>
                    <div className="product_box p-4 border rounded-lg">
                      {/* Loading cho ảnh sản phẩm */}
                      <Skeleton className="w-full aspect-square rounded-lg mb-4" />
                      
                      {/* Loading cho thông tin sản phẩm */}
                      <div className="space-y-3">
                        <Skeleton className="h-5 w-full" /> {/* Tên sản phẩm */}
                        <Skeleton className="h-4 w-[100px]" /> {/* Đơn vị */}
                        <div className="flex justify-between items-center">
                          <Skeleton className="h-6 w-[120px]" /> {/* Giá */}
                          <Skeleton className="h-10 w-10 rounded-full" /> {/* Nút thêm vào giỏ */}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}