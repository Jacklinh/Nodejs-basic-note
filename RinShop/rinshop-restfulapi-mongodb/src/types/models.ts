import { ObjectId } from "mongoose";

export type TypeStaff = {
    _id?: ObjectId;
    fullName: string;
    phone: string;
    email: string;
    address: string,
    password: string;
    active?: boolean,
    role?: string[];
}

export type TypeCategory = {
    _id?: ObjectId,
    category_name: string,
    description?: string,
    slug?: string,
    banner?: string
}

export type TypeProduct = {
    _id?: ObjectId,
    product_name: string,
    price: number,
    discount: number,// Giảm giá cho sản phẩm (nếu có), có thể là tỷ lệ phần trăm hoặc số tiền.
    category: ObjectId,
    description?: string,
    origin?: string, // nơi xuất xứ sản phẩm
    slug?: string,
    thumbnail?: string, // image sản phẩm
    gallery?: string[], // images 
    stock?: number, //Số lượng sản phẩm có trong kho
    isActive: boolean, // trạng thái hoạt động của sản phẩm
    isBest: boolean, /* SP bán nổi bật */
    isNewProduct: boolean, /* SP mới về */
    isShowHome: boolean, // sản phẩm có hiển thị trên trang chủ không.
}
export type TypeOderItems = {
    product: ObjectId,
    product_name?: string,
    quantity: number,
    price: number,
    discount: number
}
export type TypeOrder = {
    _id?: ObjectId,
    order_code?: string,// mã đơn hàng
    customer?: string | ObjectId,
    payment_type?: number,// loại thanh toán
    payment_status?: number,// trạng thái thanh toán
    status?: number,// trạng thái đơn hàng
    shipping_address?: string,// địa chỉ giao hàng
    tracking_number?: string,// số điện thoại giao hàng
    shipping_fee: number,// phí vận chuyển
    note?: string,// ghi chú
    order_items: TypeOderItems[],
    total_amount?: number,
    cancelled_reason?: string,// lý do hủy đơn
    cancelled_at?: Date,// thời gian hủy đơn
    delivered_at?: Date,// thời gian giao hàng
    createdAt?: Date;
    updatedAt?: Date;
}
export type TypeCustomer = {
    _id: ObjectId,
    fullName: string,
    password: string,
    phone: string;
    email: string;
    address: string,
    active?: boolean,
}
export enum EnumRole {
    Admin = 'admin', // all quyền
    SubAdmin = 'subAdmin', // quản lý sản phẩm, có quyền thêm, sửa, xoá, quản lý tồn kho
    User = 'user', // người dùng có quyền thêm, sửa nhưng không có xoá
    Viewer = 'viewer'// người dùng chỉ có quyền xem sản phẩm.
}

