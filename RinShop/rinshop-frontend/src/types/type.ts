export type TypeCategory = {
    _id?: string,
    category_name: string,
    description?: string,
    slug?: string
}
export type TypeProduct = {
    _id?: string,
    product_name: string,
    price: number,
    discount: number,// Giảm giá cho sản phẩm (nếu có), có thể là tỷ lệ phần trăm hoặc số tiền.
    category: TypeCategory,
    description?: string,
    origin?: string, // nơi xuất xứ sản phẩm
    slug?: string,
    thumbnail?: string, // images sản phẩm
    stock?: number, //Số lượng sản phẩm có trong kho
    isActive: boolean, // trạng thái hoạt động của sản phẩm
    isBest: boolean, /* SP bán nổi bật */
    isNewProduct: boolean, /* SP mới về */
    isShowHome: boolean, // sản phẩm có hiển thị trên trang chủ không.
}