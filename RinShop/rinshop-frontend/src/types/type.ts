export type TypeCategory = {
    _id?: string,
    category_name: string,
    description?: string,
    slug?: string,
    banner?: string | undefined
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
export type TProductCate = {
    products_list: TypeProduct[],
    pagination: {
        page: number,
        limit: number,
        totalPage: number,
        totalRecords: number
    }
}
export type TProductCart = {
    _id: string | undefined,
    product_name: string | undefined,
    price: number | 0,
    discount?: number | undefined,
    thumbnail?: string,
    quantity: number | 1,
}

export type TCustomer = {
    _id: string,
    fullName: string,
    password: string,
    phone: string;
    email: string;
    address?: string,
    remember?: string,
    active?: boolean,
}

export type TypeOrderItem = {
    product: {
      _id: string;
      thumbnail?: string;
    };
    product_name: string;
    quantity: number;
    price: number;
    discount: number;
}
// Định nghĩa type cho customer khi tạo mới
export type TNewCustomer = {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    address?: string;
}
export type TypeOrder = {
    _id: string;
    order_code?: string;// mã đơn hàng
    customer: string | TNewCustomer;
    payment_type?: number;// loại thanh toán
    payment_status?: number;// trạng thái thanh toán
    status?: number;// trạng thái đơn hàng
    shipping_address?: string;// địa chỉ giao hàng
    tracking_number?: string;// số điện thoại giao hàng
    shipping_fee: number,// phí vận chuyển
    note?: string;// ghi chú
    order_items: TypeOrderItem[];
    total_amount: number;
    cancelled_reason?: string;// lý do hủy đơn
    cancelled_at?: Date;// thời gian hủy đơn
    delivered_at?: Date;// thời gian giao hàng
    createdAt: Date | string ;
    updatedAt?: Date | string;
}