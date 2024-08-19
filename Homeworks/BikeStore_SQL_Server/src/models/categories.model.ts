import { Schema, model } from "mongoose";
import createError from 'http-errors';
import { buildSlug } from "../helpers/buildSlug";
// khởi tạo 1 schema
// doc <https://mongoosejs.com/docs/schematypes.html>
const categorySchema = new Schema({
    category_name: {
        type: String,
        maxLength: 50,// DataSize- tối đa 50 ký tự
        unique: true, // chống trùng lặp tên
        trim: true,

    },
    description: {
        type: String,
        maxLength: 500,
        require: false // Allow null - mặc định là true- k cho phép rỗng ,
    },
    /**
   * Vì sao cần slug vì dùng để SEO
   * category_name: Điện thoại
   * slug: dien-thoai
   */
    slug: {
        type: String,
        maxLength: 50,
        trim: true,
        require: false
    }
},{ 
    // khai báo timestamps để khi quản lý dữ liệu khi thay đổi , nó sẽ tự động sinh ra 2 biến createdAt(thời gian tạo request) và updatedAt(thời gian update request)
    timestamps: true 
    // collection: 'categories' ở đây trên database sẽ tạo name database theo tên mình đặt
})
categorySchema.pre('validate', async function(next){
    if(!this.category_name){
        throw createError(400,"category name not fould")
    }
    this.slug = buildSlug(this.category_name);
    next();
})
// Export một Model, doc <https://mongoosejs.com/docs/models.html>, name Xxx = new model()
// Ở đây ta đặt tên theo name số ít 
const Category = model("Category", categorySchema);
export default Category