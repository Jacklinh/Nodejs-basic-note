
import createError from 'http-errors';
import Customer from '../models/customers.model';
const findAll = async (query: any) => {
    // lọc theo từng điều kiện
    let objectFilters:any = {};
    if(query.keyword && query.keyword != '') { // lọc theo name
        objectFilters = {...objectFilters, first_name: new RegExp(query.keyword, 'i'), email: new RegExp(query.keyword, 'i')};
    }
    const customers = await Customer.find({...objectFilters,}).select('-__v');
    return {
        filters: objectFilters,
        customers_list: customers
    };
}
const findByID = async (id: string) => {
    const customer = await Customer.findById(id).select('-__v');
    if(!customer) {
        throw createError(400,'customer not found')
    }
    return customer;
}
const createRecord = async (body: any) => {
    const payloads = {
        first_name: body.first_name,
        last_name: body.last_name,
        phone: body.phone,
        email: body.email,
    }
    const customer = await Customer.create(payloads);
    return customer;
}
const updateByID = async (id: string, payload: any) => {
    const customer = await findByID(id);
    Object.assign(customer,payload)
    await customer.save();
    return customer;
}
const deleteByID = async (id: string) => {
    const customer = await findByID(id);
    await customer.deleteOne({ _id: customer._id })
    return customer;
}
export default {
    findAll,
    findByID,
    createRecord,
    updateByID,
    deleteByID
}