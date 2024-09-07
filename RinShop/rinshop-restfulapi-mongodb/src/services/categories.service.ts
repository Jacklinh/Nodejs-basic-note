import createError from "http-errors";
import Category from "../models/categories.model";
import { TypeCategory } from "../types/models";
const findAll= async(query: any)=>{
    // phan trang
    const page_str = query.page;
    const limit_str = query.limit;
    const page = page_str ? parseInt(page_str) : 1;
    const limit = limit_str ? parseInt(limit_str) : 5;
    const offset = (page - 1) * limit;
    // filter 
    let objectFilter: any = {};
    if(query.categoryName && query.categoryName !== ''){
        objectFilter = {...objectFilter, category_name: new RegExp(query.categoryName,'i')}
    }
    // find select * FROM categories
    const categories = await Category
    .find({
        ...objectFilter
    })
    .select('-__v')
    .skip(offset)
    .limit(limit);
    const totalRecords = await Category.countDocuments({
        ...objectFilter
    });
    return {
        categories_list: categories,
        filters: categories,
        pagination: {
            page,
            limit,
            totalPage: Math.ceil(totalRecords / limit), // tong so trang
            totalRecords
        }
    }
}
const findByID = async (id: string) => {
    const category = await Category.findById(id).select('-__v');
    if(!category){
        throw createError(400,"category not found");
    }
    return category;
}
const createRecord = async(payload: TypeCategory) => {
    const category = await Category.create(payload);
    return category;
}
const updateByID = async (id: string, payload: TypeCategory) => {
    const category = await findByID(id);
    Object.assign(category,payload);
    await category.save();
    return category;
}
const deleteByID = async (id: string) => {
    const category = await findByID(id);
    await category.deleteOne({_id: category._id});
    return category;
}
export default {
    findAll,
    findByID,
    createRecord,
    updateByID,
    deleteByID
}