
import createError from 'http-errors';
import Staff from '../models/staffs.model';
import { TypeStaff } from '../types/models';
const findAll = async (query: any) => {
    /* Phân trang */
    const page_str = query.page;
    const limit_str = query.limit;
    const page = page_str ? parseInt(page_str as string): 1;
    const limit = limit_str ? parseInt(limit_str as string): 10;
    const offset = (page - 1) * limit;
    //Đếm tổng số record hiện có của collection
    const totalRecords = await Staff.countDocuments();
    /* end phan trang */
    /* Sắp xếp */
    let objSort: any = {};
    const sortBy = query.sort || 'updateAt'; // Mặc định sắp xếp theo ngày tạo giảm dần
    const idBy = query._id && query._id == 'ASC' ? 1: -1;
    const nameBy = query.last_name && query.last_name == 'ASC' ? 1: -1;
    objSort = {...objSort, [sortBy]: idBy,nameBy} // Thêm phần tử sắp xếp động vào object {}
    /* Select * FROM product */
    const staffs = await Staff
    .find()
    .sort(objSort)
    .select('-__v -_id -password')
    .skip(offset)
    .limit(limit)
    ;

    return {
        staffs_list: staffs,
        // Phân trang
        pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalRecords / limit), //tổng số trang
        totalRecords
        }
    }
}
const findByID = async (id: string) => {
    const staff = await Staff.findById(id).select('-__v');
    if(!staff) {
        throw createError(400,'staffs not found')
    }
    return staff;
}
const createRecord = async (payload: TypeStaff) => {
    const staff = await Staff.create(payload);
    return staff;
}
const updateByID = async (id: string, payload: TypeStaff) => {
    //b1.Kiểm tra sự tồn tại của danh mục có id này
    const staff = await findByID(id);
    //2. Update = cách ghi đè thuộc tính
    Object.assign(staff,payload)
    await staff.save();
    //3. Trả về kết quả
    return staff;
}
const deleteByID = async (id: string) => {
    const staff = await findByID(id);
    await Staff.deleteOne({ _id: staff._id })
    return staff;
}
export default {
    findAll,
    findByID,
    createRecord,
    updateByID,
    deleteByID
}