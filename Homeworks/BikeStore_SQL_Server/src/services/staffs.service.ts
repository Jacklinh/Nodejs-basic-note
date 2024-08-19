
import createError from 'http-errors';
import Staff from '../models/staffs.model';
const findAll = async (query: any) => {
    // lọc theo từng điều kiện
    let objectFilters:any = {};
    if(query.keyword && query.keyword != '') { // lọc theo name
        objectFilters = {...objectFilters, first_name: new RegExp(query.keyword, 'i'), email: new RegExp(query.keyword, 'i')};
    }
    const staffs = await Staff.find({...objectFilters,}).select('-__v');
    return {
        filters: objectFilters,
        staffs_list: staffs
    };
}
const findByID = async (id: string) => {
    const staff = await Staff.findById(id).select('-__v');
    if(!staff) {
        throw createError(400,'staffs not found')
    }
    return staff;
}
const createRecord = async (body: any) => {
    const payloads = {
        first_name: body.first_name,
        last_name: body.last_name,
        phone: body.phone,
        email: body.email,
        active: body.active
    }
    const staff = await Staff.create(payloads);
    return staff;
}
const updateByID = async (id: string, payload: any) => {
    const staff = await findByID(id);
    Object.assign(staff,payload)
    await staff.save();
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