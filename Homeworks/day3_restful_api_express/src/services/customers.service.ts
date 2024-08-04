
import createError from 'http-errors';
import Customer from '../models/customers.model';
import {ObjectId} from 'mongoose'
type typeCustomers = {
    id: ObjectId,
    first_name: string,
    last_name: string,
    phone: string,
    email: string,
    street: string,
    city: string,
    state: string,
    zip_code: string,
    password?: string
}
const findAll = async () => {
    const customers = await Customer.find();
    return customers;
}
const findByID = async (id: string) => {
    const customer = await Customer.findById(id);
    if(!customer) {
        throw createError(400,'customers not found')
    }
    return customer;
}
const createRecord = async (payload: typeCustomers) => {
    const customer = await Customer.create(payload);
    return customer;
}
const updateByID = async (id: string, payload: typeCustomers) => {
    const customer = await Customer.findByIdAndUpdate(id,payload);
    if(!customer){
        throw createError(400,"customers not found");
    }
    return customer;
}
const deleteByID = async (id: string) => {
    const customer = await Customer.findByIdAndDelete(id);
    if(!customer) {
        throw createError(400,"customers not found");
    }
    return customer;
}
export default {
    findAll,
    findByID,
    createRecord,
    updateByID,
    deleteByID
}