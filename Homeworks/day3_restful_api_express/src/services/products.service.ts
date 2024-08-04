
import createError from 'http-errors';
import Product from '../models/products.model';
import {ObjectId} from 'mongoose'
type typeProducts = {
    id: ObjectId,
    product_name: string,
    price: number,
    discount: number,
    description?: string,
    model_year: number,
    slug: string,
    thumbnail: string,
    stock: number,
    order: number
}
const findAll = async () => {
    const products = await Product.find();
    return products;
}
const findByID = async (id: string) => {
    const product = await Product.findById(id);
    if(!product) {
        throw createError(400,'products not found')
    }
    return product;
}
const createRecord = async (payload: typeProducts) => {
    const product = await Product.create(payload);
    return product;
}
const updateByID = async (id: string, payload: typeProducts) => {
    const product = await Product.findByIdAndUpdate(id,payload);
    if(!product){
        throw createError(400,"products not found");
    }
    return product;
}
const deleteByID = async (id: string) => {
    const product = await Product.findByIdAndDelete(id);
    if(!product) {
        throw createError(400,"products not found");
    }
    return product;
}
export default {
    findAll,
    findByID,
    createRecord,
    updateByID,
    deleteByID
}