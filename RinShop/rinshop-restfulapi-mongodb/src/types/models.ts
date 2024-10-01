import { ObjectId } from "mongoose";

export type TypeStaff = {
    _id?: ObjectId;
    fullName: string;
    phone: string;
    email: string;
    password: string;
    active?: boolean,
    role?: string[];
}

export type TypeCategory = {
    _id?: ObjectId,
    category_name: string,
    description?: string,
    slug?: string
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

export enum EnumRole {
    Admin = 'admin', // all quyền
    SubAdmin = 'subAdmin', // quản lý sản phẩm, có quyền thêm, sửa, xoá, quản lý tồn kho
    User = 'user', // người dùng có quyền thêm, sửa nhưng không có xoá
    Viewer = 'viewer'// người dùng chỉ có quyền xem sản phẩm.
}