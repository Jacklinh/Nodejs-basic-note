
import createError from 'http-errors';
import Staff from '../models/staffs.model';
import {ObjectId} from 'mongoose'
type typeStaffs = {
    id: ObjectId,
    first_name?: string,
    last_name: string,
    phone: string,
    email: string,
    active?: boolean,
    password?: string
}
const findAll = async () => {
    const staffs = await Staff.find();
    return staffs;
}
const findByID = async (id: string) => {
    const staff = await Staff.findById(id);
    if(!staff) {
        throw createError(400,'staffs not found')
    }
    return staff;
}
const createRecord = async (payload: typeStaffs) => {
    const staff = await Staff.create(payload);
    return staff;
}
const updateByID = async (id: string, payload: typeStaffs) => {
    const staff = await Staff.findByIdAndUpdate(id,payload);
    if(!staff){
        throw createError(400,"staffs not found");
    }
    return staff;
}
const deleteByID = async (id: string) => {
    const staff = await Staff.findByIdAndDelete(id);
    if(!staff) {
        throw createError(400,"staffs not found");
    }
    return staff;
}
export default {
    findAll,
    findByID,
    createRecord,
    updateByID,
    deleteByID
}