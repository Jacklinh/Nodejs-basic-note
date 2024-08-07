# NoSQL width MongoDB- thực hiện query

## tạo slug tự động theo name 
- cài đặt `slugify` <https://www.npmjs.com/package/slugify>
```bash
npm i slugify 
or yarn add slugify
```
- trong folder src/helpers/buildSlug.ts để tạo hàm dùng chung slug cho toàn dự án
```ts
import slugify from "slugify";
export const buildSlug = (str: string) => {
    return slugify(str,{
        replacement: '-',  // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: false,      // convert to lower case, defaults to `false`
        strict: false,     // strip special characters except replacement, defaults to `false`
        locale: 'vi',      // language code of the locale to use
        trim: true         // trim leading and trailing replacement chars, defaults to `true`
    })
}
```
- trong folder src/models/xxx.models.ts 
sử hook middleware để Can thiệp vào dữ liệu trước khi ghi vào database
```ts
//middleware
// Can thiệp vào dữ liệu trước khi ghi vào database
productschema.pre('validate', async function(next){ // ở đây có thể sử dụng save cho validate, nhưng bên db.ts mình đang sử dụng insertMany nên phải dùng validate để ưu tiên gọi trước bất kỳ xử lý nào. còn save chỉ lưu 1 lần.
  /* tự động tạo slug từ product_name */
  if(!this.product_name) {
    throw createError(400,"product name not found");
  }
  this.slug = buildSlug(this.product_name);
  next();
})
```
## common types
trong src/types/models.ts chứa các type chung

## làm việc với services 
- chỉnh sửa file src/services/xxx.service.ts

```ts

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
```

## làm việc với controller

- chỉnh sửa file src/controller/xxx.service.ts
```ts
import {Request, Response, NextFunction} from 'express'
import productsService from '../services/products.service';
import { sendJsonSuccess } from '../helpers/responseHandler';

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        /* backup 06/08/20224 
          const cates = await productsService.findAll();
        */
        const cates = await productsService.findAll(req.query);
        sendJsonSuccess(res,"success")(cates);
    }catch(error) {
        next(error)
    }
}
const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params;
      const product = await productsService.findByID(id)
      sendJsonSuccess(res,"success")(product);
    }catch(error) {
      next(error)
    }
}
const createRecord = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const product = await productsService.createRecord(req.body)
        sendJsonSuccess(res,"success")(product);
    }catch(error) {
        next(error)
    }
    
}
const updateByID = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params;
      const payload = req.body;
      const newProduct = await productsService.updateByID(id,payload);
      sendJsonSuccess(res,"success")(newProduct);
    }catch(error) {
      next(error)
    }
}
const deleteByID =async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params;
      const product =await productsService.deleteByID(id)
      sendJsonSuccess(res,"success")(product);
    }catch(error) {
      next(error)
    }
}
export default {
    findAll,
    findById,
    createRecord,
    updateByID,
    deleteByID
}
```
