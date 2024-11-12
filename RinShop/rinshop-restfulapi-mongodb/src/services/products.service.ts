
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
    /* Sắp xếp */
    let objSort: any = {};
    const sortBy = query.sort || 'updateAt'; // Mặc định sắp xếp theo ngày tạo giảm dần
    const orderBy = query.order && query.order == 'ASC' ? 1: -1 ; // sắp xếp theo giá (mặc định theo giá giảm dần)
    objSort = {...objSort, [sortBy]: orderBy} // Thêm phần tử sắp xếp động vào object {}
    // filter theo tung dieu kien
    let objectFilter: any = {};
    // search theo ten san pham
    if(query.keyword && query.keyword !== '') {
        const regex = new RegExp(query.keyword, 'i');
        objectFilter = {
            ...objectFilter,
            $or: [
                { product_name: { $regex: regex } }
            ]
        };
    }
    // filter theo khoảng giá
    if(query.price_min || query.price_max) {
        objectFilter.price = {};
        if(query.price_min) {
            objectFilter.price.$gte = parseInt(query.price_min);
        }
        if(query.price_max) {
            objectFilter.price.$lte = parseInt(query.price_max);
        }
    }
    

    const totalRecords = await Product.countDocuments(objectFilter);
    const products = await Product
    .find(objectFilter)
    .sort(objSort)
    .select('-__v')
    .populate({
        path: 'category',
        select: '-__v -createdAt -updatedAt',
    })
    .skip(offset)
    .limit(limit);
    
    return {
        products_list: products,
        sorts: objSort,
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
const findAllByCate = async(query: any, slug: string) => {
    // phan trang
    const page_str = query.page; // trang hien tai
    const limit_str = query.limit; // so luong item tren 1 trang
    const page = page_str ? parseInt(page_str) : 1;
    const limit = limit_str ? parseInt(limit_str) : 9;
    const offset = (page - 1) * limit;
    // filter theo tung dieu kien
    let objectFilter: any = {};
;    // loc theo ten danh muc
    if(query.category && query.category !== '') {
        objectFilter = {...objectFilter, category: query.category}
    }
    // chỉ lấy các sản phẩm active
    objectFilter = {
        ...objectFilter,
        isActive: true
    }
    /* Sắp xếp */
    let objSort: any = {};
    const sortBy = query.sort || 'updateAt'; // Mặc định sắp xếp theo ngày tạo giảm dần
    const orderBy = query.order && query.order == 'ASC' ? 1: -1 ; // sắp xếp theo giá (mặc định theo giá giảm dần)
    objSort = {...objSort, [sortBy]: orderBy} // Thêm phần tử sắp xếp động vào object {}

    // đếm tổng số record hiện có
    const totalRecords = await Product.countDocuments(objectFilter);
    const productAll = await Product
    .find({
        ...objectFilter,
    })
    .sort(objSort)
    .populate({
        path: 'category',
        select: '-__v -createdAt -updatedAt',
        match: {
            slug: slug,
        }
    })
    .skip(offset)
    .limit(limit);
    // lúc này nếu chúng ta return về productAll thì sẽ có category = null nên ta cần thêm 1 bước nữa là filter lọc ra những category khác null
    const products = productAll.filter(p=>p.category);
    return {
        products_list: products,
        sorts: objSort,
        pagination: {
            page,
            limit,
            totalPage: Math.ceil(totalRecords / limit),
            totalRecords
        },
        limit: limit
    };
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
const findOneBySlug = async(slug: string,limit: number = 5) => {
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
    const relatedProducts = await Product
    .find({
            category: product.category,
            slug: { $ne: slug } // Loại bỏ sản phẩm hiện tại
        }
    )
    .select('-__v')
    .limit(limit)
    .populate({
        path: 'category',
        select: '-__v -createdAt -updatedAt',
    })

    return {
        product_detail: product,
        related_products: relatedProducts,
        limit: limit
    }
}
// tìm kiếm sản phẩm nổi bật
const findByIsBest = async(query: any) => {
    // phan trang
    const page_str = query.page; // trang hien tai
    const limit_str = query.limit; // so luong item tren 1 trang
    const page = page_str ? parseInt(page_str) : 1;
    const limit = limit_str ? parseInt(limit_str) : 5;
    const offset = (page - 1) * limit;
    // filter theo tung dieu kien
    let objectFilter: any = {};
    // loc theo ten danh muc
    if(query.category && query.category !== '') {
        objectFilter = {...objectFilter, category: query.category}
    }
    const totalRecords = await Product.countDocuments({
        ...objectFilter
    });
    const products = await Product
    .find({
        ...objectFilter,
        isBest: true,
        isActive: true
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
        gallery: body.gallery,
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
    findAllByCate,
    findOneBySlug,
    findByIsBest,
    createRecord,
    createDocument,
    updateByID,
    deleteByID
}