
import createError from 'http-errors';
import Brand from '../models/brands.model';
const findAll = async (query: any) => {
     /* backup 06/08/20224 
        const brands = await Brand.find();
        return brands
    */
   // lọc theo từng điều kiện
   let objectFilters:any = {};
    if(query.keyword && query.keyword != '') { // lọc theo tên sản phẩm
        objectFilters = {...objectFilters, brand_name: new RegExp(query.keyword, 'i')};
    }
    const brands = await Brand.find({
        ...objectFilters,
    })
    .select('-__v');
    return {
        brands_list: brands,
        filters: objectFilters
    };
}
const findByID = async (id: string) => {
    const brand = await Brand.findById(id).select('-__v');
    if(!brand) {
        throw createError(400,'brands not found')
    }
    return brand;
}
const createRecord = async (body: any) => {
    const payloads = {
        brand_name: body.brand_name,
        description: body.description
    }
    const brand = await Brand.create(payloads);
    return brand;
}
const updateByID = async (id: string, payload: any) => {
    const brand = await findByID(id);
    Object.assign(brand, payload);
    await brand.save();
    return brand;
}
const deleteByID = async (id: string) => {
    const brand = await findByID(id);
    await Brand.deleteOne({ _id: brand._id })
    return brand;
}
export default {
    findAll,
    findByID,
    createRecord,
    updateByID,
    deleteByID
}