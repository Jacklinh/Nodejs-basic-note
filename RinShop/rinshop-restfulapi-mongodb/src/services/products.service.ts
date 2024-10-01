
import Product from "../models/products.model";
import { TypeProduct } from "../types/models";
import createError from "http-errors";

const findAll = async(query: any) => {
    // phan trang
    const page_str = query.page; // trang hien tai
    const limit_str = query.limit; // so luong item tren 1 trang
    const page = page_str ? parseInt(page_str) : 1;
    const limit = limit_str ? parseInt(limit_str) : 5;
    const offset = (page - 1) * limit;
    // filter theo tung dieu kien
    let objectFilter: any = {};
    // search theo ten san pham
    if(query.keyword && query.keyword !== '') {
        objectFilter = {... objectFilter, product_name: new RegExp(query.keyword, "i")}
    }
    // loc theo ten danh muc
    if(query.category && query.category !== '') {
        objectFilter = {...objectFilter, category: query.category}
    }
    const totalRecords = await Product.countDocuments({
        ...objectFilter
    });
    const products = await Product
    .find({
        ...objectFilter
    })
    .select('-__v')
    .populate({
        path: 'category',
        select: '-__v -createdAt -updatedAt',
        match: objectFilter
    })
    .skip(offset)
    .limit(limit);
    
    return {
        products_list: products,
        filters: objectFilter,
        pagination: {
            page,
            limit,
            totalPage: Math.ceil(totalRecords / limit),
            totalRecords
        }
    }
}
const findByID = async(id: string) => {
    const product = await Product.findById(id).select('-__v');
    if(!product){
        throw createError(400, "product not found");
    }
    return product;
}
const findAllCategoryBySlug = async(slug: string) => {
    const productAll = await Product
    .find()
    .populate({
        path: 'category',
        select: '-__v -createdAt -updatedAt',
        match: {
            slug: slug
        }
    });
    // lúc này nếu chúng ta return về productAll thì sẽ có category = null nên ta cần thêm 1 bước nữa là filter lọc ra những category khác null
    const products = productAll.filter(p=>p.category);
    return products;
}
const findOneBySlug = async(slug: string) => {
    const product = await Product.findOne({
        slug: slug
    })
    .select('-__v')
    .populate({
        path: 'category',
        select: '-__v -createdAt -updatedAt',
    });
    if(!product){
        throw createError(400, "product not found");
    }
    return product;
}
const createDocument = async(body: any) => {
    const payloads = {
        product_name : body.product_name,
        price: body.price,
        discount: body.discount,
        category: body.category,
        description: body.description,
        origin: body.model_year, 
        slug: body.slug,
        thumbnail: body.thumbnail, 
        stock: body.stock, 
        isBest: body.isBest, 
        isNewProduct: body.isNewProduct, 
        isShowHome: body.isShowHome, 
        isActive: body.isActive 
    }
    const product = await Product.create(payloads);
    return product;
}
const createRecord = async(payload: TypeProduct) => {
    const product = await Product.create(payload);
    return product;
}
const updateByID = async(id: string, payload: TypeProduct) => {
    const product = await findByID(id);
    Object.assign(product, payload);
    await product.save();
    return product;
}
const deleteByID = async(id: string) => {
    const product = await findByID(id);
    await product.deleteOne({_id: product._id});
    return product;
}
export default {
    findAll,
    findByID,
    findAllCategoryBySlug,
    findOneBySlug,
    createRecord,
    createDocument,
    updateByID,
    deleteByID
}