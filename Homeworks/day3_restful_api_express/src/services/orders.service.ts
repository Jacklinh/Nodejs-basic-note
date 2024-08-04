
import createError from 'http-errors';
import Order from '../models/orders.model';
import {ObjectId} from 'mongoose'
type typeItemOrder = {
    quantity: number,
    price: number,
    discount: number
}
type typeOrders = {
    id: ObjectId,
    order_status: number,
    order_date: Date,
    require_date: Date,
    shipping_date: Date,
    order_note: string,
    street: string,
    city: string,
    state: string,
    payment_type: number,
    order_item: typeItemOrder
}
const findAll = async () => {
    const orders = await Order.find();
    return orders;
}
const findByID = async (id: string) => {
    const order = await Order.findById(id);
    if(!order) {
        throw createError(400,'orders not found')
    }
    return order;
}
const createRecord = async (payload: typeOrders) => {
    const order = await Order.create(payload);
    return order;
}
const updateByID = async (id: string, payload: typeOrders) => {
    const order = await Order.findByIdAndUpdate(id,payload);
    if(!order){
        throw createError(400,"orders not found");
    }
    return order;
}
const deleteByID = async (id: string) => {
    const order = await Order.findByIdAndDelete(id);
    if(!order) {
        throw createError(400,"orders not found");
    }
    return order;
}
export default {
    findAll,
    findByID,
    createRecord,
    updateByID,
    deleteByID
}