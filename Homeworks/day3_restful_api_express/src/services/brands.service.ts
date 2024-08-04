
import createError from 'http-errors';
import Brand from '../models/brands.model';
import {ObjectId} from 'mongoose'
type typeBrands = {
    id: ObjectId,
    description?: string,
    slug: string
}
const findAll = async () => {
    const brands = await Brand.find();
    return brands;
}
const findByID = async (id: string) => {
    const brand = await Brand.findById(id);
    if(!brand) {
        throw createError(400,'brands not found')
    }
    return brand;
}
const createRecord = async (payload: typeBrands) => {
    const brand = await Brand.create(payload);
    return brand;
}
const updateByID = async (id: string, payload: typeBrands) => {
    const brand = await Brand.findByIdAndUpdate(id,payload);
    if(!brand){
        throw createError(400,"brands not found");
    }
    return brand;
}
const deleteByID = async (id: string) => {
    const brand = await Brand.findByIdAndDelete(id);
    if(!brand) {
        throw createError(400,"brands not found");
    }
    return brand;
}
export default {
    findAll,
    findByID,
    createRecord,
    updateByID,
    deleteByID
}