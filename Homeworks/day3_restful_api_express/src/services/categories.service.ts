// kết nối trực tiếp với database
import createError from 'http-errors';
// import fs for nodejs
// import fs from "node:fs"
// dữ liệu đầu vào
// do sử dụng fs nên khi vào nó sẽ tìm  và đi từ file server.ts 
// const fileName = './src/databases/categories.json';
// import schema model 
import Category from '../models/categories.model';
import {ObjectId} from 'mongoose'
type typeCategories = {
    id: ObjectId,
    name: string,
    desdescription?: string
    slug: string
}
const findAll = async () => {
    // lúc này sẽ k cần đọc file nữa mà nó trực tiếp liên kết với database trên mongodb
    /* 
    b1: đọc nội dung file, có chứa tiếng viết 
    const data = fs.readFileSync(fileName, { encoding: 'utf-8', flag: 'r' });
    convert qua objet
    const cates: typeCategories[] = JSON.parse(data);
    */
    const categories = await Category.find();
    return categories;
}
const findByID = async (id: string) => {
    //Đi tìm 1 cái khớp id
     /**
     * SELECT * FROM categories WHERE id = ''
     */
    const category = await Category.findById(id);
    // bắt lỗi khi không tìm thấy
    if(!category) {
        throw createError(400,'categories not found')
    }
    return category;
}
const createRecord = async (payload: typeCategories) => {
    /* backup 3/08/2024
    // đọc file cũ
    const cates = findAll();
    // thêm phần tử mới vào mãng trên
    const newCates = [...cates,payload];
    //ghi file dùng fs
    fs.writeFile(fileName, JSON.stringify(newCates), function (err) {
        if (err) throw createError(500, 'writeFile error')
    });
    return payload;
    */
    const category = await Category.create(payload);
    return category;
}
const updateByID = async (id: string, payload: typeCategories) => {
    /* backup 3/8/2024
    const cates = findAll();

    const category = cates.find(c=> c.id === id);
    if(!category) {
        throw createError(400,'categories not found')
    }
    // update 
    const newCategory = cates.map(c => {
        if(c.id === id){
            c.name = payload.name
        }
        return c;
    })
    //ghi file dùng fs
    fs.writeFile(fileName, JSON.stringify(newCategory), function (err) {
        if (err) throw createError(500, 'writeFile error')
    });
    return newCategory;
    */
    const category = await Category.findByIdAndUpdate(id,payload);
    if(!category){
        throw createError(400,"categories not found");
    }
    return category;
}
const deleteByID = async (id: string) => {
    /* backup 3/8/2024
    const cates = findAll();
    // 1 kiểm tra id tồn tại
    const category = cates.find(c=> c.id === id);
    if(!category) {
      throw createError(400,'categories not found')
    }
    // 2 nếu tồn tại xoá 
    const newCategory = cates.filter(c => c.id !== id);
    //ghi file dùng fs
    fs.writeFile(fileName, JSON.stringify(newCategory), function (err) {
        if (err) throw createError(500, 'writeFile error')
    });
    return newCategory;
    */
    const category = await Category.findByIdAndDelete(id);
    if(!category) {
        throw createError(400,"categories not found");
    }
    return category;
}
export default {
    findAll,
    findByID,
    createRecord,
    updateByID,
    deleteByID
}