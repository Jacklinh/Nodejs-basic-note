
import createError from 'http-errors';
import Order from '../models/orders.model';
const findAll = async (query: any) => {
    // lọc theo từng điều kiện
    let objectFilters:any = {};
    if(query.keyword && query.keyword != '') { // lọc theo tên city
        objectFilters = {...objectFilters, city: new RegExp(query.keyword, 'i')};
    }
    const orders = await Order.find({
        ...objectFilters
    })
    .select('-__v')
    .populate('customer','first_name last_name')
    .populate('staff','first_name last_name');

    return {
        filters: objectFilters,
        orders_list: orders
    };
}
const findByID = async (id: string) => {
    const order = await Order.findById(id).select('-__v');
    if(!order) {
        throw createError(400,'orders not found')
    }
    return order;
}
const createRecord = async (body: any) => {
    const payloads = {
        customer: body.customer,
        staff: body.staff,
        order_status: body.order_status,
        order_date: body.order_date,
        require_date: body.require_date,
        shipping_date: body.shipping_date,
        order_note: body.order_note,
        street: body.street,
        city: body.city,
        state: body.state
    }
    const order = await Order.create(payloads);
    return order;
}
const updateByID = async (id: string, payload: any) => {

    const order = await findByID(id);
    Object.assign(order, payload);
    await order.save();
    
    return order;
}
const deleteByID = async (id: string) => {
    const order = await findByID(id);
    await Order.deleteOne({_id: order._id})
    return order;
}
export default {
    findAll,
    findByID,
    createRecord,
    updateByID,
    deleteByID
}