
import createError from 'http-errors';
import Student from '../models/students.model';
import { TStudent } from '../types/models';
const findAll = async (query: any) => {
    const students = await Student.find().select('-__v');
    return {
        student_list: students
    };
}
const findByID = async (id: string) => {
    const student = await Student.findById(id).select('-__v');
    if(!student) {
        throw createError(400,'student not found')
    }
    return student;
}
const createRecord = async (body: TStudent) => {
    const payloads = {
        fullName: body.fullName,
        age: body.age,
        email: body.email,
        mobile: body.mobile,
        class: body.class
    }
    const student = await Student.create(payloads);
    return student;
}
export default {
    findAll,
    findByID,
    createRecord
}