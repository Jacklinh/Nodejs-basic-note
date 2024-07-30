// kết nối trực tiếp với database
import createError from 'http-errors';
// import fs for nodejs
import fs from "node:fs"
// dữ liệu đầu vào
// do sử dụng fs nên khi vào nó sẽ tìm  và đi từ file server.ts 
const fileName = './src/database/categories.json';
type typeCategories = {
    id: number,
    name: string,
    image: string,
    creationAt: string,
    updatedAt: string
}
const findAll = () => {
    // b1: đọc nội dung file, có chứa tiếng viết 
    const data = fs.readFileSync(fileName, { encoding: 'utf-8', flag: 'r' });
    // convert qua objet
    const cates: typeCategories[] = JSON.parse(data);
    return cates;
}
const findByID = (id: number) => {
    // b1: đọc file cũ
    const cates = findAll();
    // đi tìm 1 cái khớp id 
    const category = cates.find(c=> c.id === id);
    if(!category) {
        throw createError(400,'categories not found')
    }
    return category;
}
const createRecord = (payload: typeCategories) => {
    // đọc file cũ
    const cates = findAll();
    // thêm phần tử mới vào mãng trên
    const newCates = [...cates,payload];
    //ghi file dùng fs
    fs.writeFile(fileName, JSON.stringify(newCates), function (err) {
        if (err) throw createError(500, 'writeFile error')
    });
    return payload;
}
const updateByID = (id: number, payload: typeCategories) => {
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
}
const deleteByID = (id: number) => {
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
}
export default {
    findAll,
    findByID,
    createRecord,
    updateByID,
    deleteByID
}