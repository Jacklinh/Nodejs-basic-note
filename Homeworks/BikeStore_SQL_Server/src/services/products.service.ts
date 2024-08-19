
import createError from 'http-errors';
import Product from '../models/products.model';
import {ObjectId} from 'mongoose'
const findAll = async (query: any) => {
    /* backup 06/08/20224 
        const products = await Product.find();
        return products;
    */
    //phân trang
    const page_str = query.page;
    const limit_str = query.limit;
    const page = page_str ? parseInt(page_str) : 1;
    const limit = limit_str ? parseInt(limit_str) : 5;
    //Đếm tổng số record hiện có của collection Product
    const totalRecords = await Product.countDocuments();
    const offset = (page - 1) * limit
    // lọc theo từng điều kiện
    let objectFilters:any = {};
    if(query.category && query.category != '') { // lọc theo từng category
        objectFilters = {...objectFilters,category: query.category}
    }
    if(query.keyword && query.keyword != '') { // lọc theo tên sản phẩm
        objectFilters = {...objectFilters, product_name: new RegExp(query.keyword, 'i')};
    }
    /* Sắp xếp */
    let objSort: any = {};
    const sortBy = query.sort || 'updateAt'; // Mặc định sắp xếp theo ngày tạo giảm dần
    const orderBy = query.order && query.order == 'ASC' ? 1: -1
    objSort = {...objSort, [sortBy]: orderBy} // Thêm phần tử sắp xếp động vào object {}

    const products = await Product.find({
        ...objectFilters,
        //isDelete: false // chi lấy những sp chưa xoá
    })
    .select('-__v')// loại bỏ trường, sử dụng ký tự - để không hiển thị ở data khi render
    .populate('category','category_name') 
    .populate('brand', 'brand_name')
    .skip(offset)
    .sort(objSort)
    return {
        product_list: products,
        filters: objectFilters,
        sorts: objSort,
        // phân trang
        pagination: {
            page,
            limit,
            totalPages: Math.ceil(totalRecords / limit), // tổng số trang
            totalRecords
        }
    };
}
const findByID = async (id: string) => {
    const product = await Product.findById(id)
    .select('-__v')
    .populate('category','category_name')
    .populate('brand', 'brand_name');
    if(!product) {
        throw createError(400,'products not found')
    }
    return product;
}
const createRecord = async (body: any) => {
    /* backup 06/08/20224 
        const product = await Product.create(payload);
        return product;
    */
   const payloads = {
        product_name: body.product_name,
        price:body.price,
        discount: body.discount,
        category: body.category, 
        brand: body.brand, 
        model_year:body.model_year, 
        description:body.description, 
        stock:body.stock, 
        slug:body.slug
   }
    const product = await Product.create(payloads);
    return product;
}
const updateByID = async (id: string, payload: any) => {
    /* backup 06/08/20224 
        const product = await Product.findByIdAndUpdate(id,payload);
        if(!product){
            throw createError(400,"products not found");
        }
        return product;
    */
   //b1. Kiểm tính tồn tại
    const product = await findByID(id);
    //2. Update = cách ghi đè thuộc tính
    Object.assign(product, payload);
    await product.save();
    
    return product;
}
const deleteByID = async (id: string) => {
    /* backup 06/08/20224 
        const product = await Product.findByIdAndDelete(id);
        if(!product) {
            throw createError(400,"products not found");
        }
        return product;
    */
    //b1. Kiểm tính tồn tại
    const product = await findByID(id);
    //2. xóa
    await Product.deleteOne({ _id: product._id });
    
    //3. Trả về kết quả
    return product
}
export default {
    findAll,
    findByID,
    createRecord,
    updateByID,
    deleteByID
}