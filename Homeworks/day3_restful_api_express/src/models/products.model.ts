import { Schema, model } from "mongoose";
import { buildSlug } from "../helpers/buildSlug";
import createError from 'http-errors';
const productschema = new Schema({
    product_name: {
        type: String,
        maxlength: 255,
        unique: true,
        trim: true,
    },
      price: {
        type: Number,
        min: 0,
        default: 0
      },
      discount: {
        type: Number,
        min: 0,
        max: 70,
        default: 0
      },
      category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
      },
      brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
      },
      description: {
        type: String,
        require: false,
        maxlength: 500,
        trim: true
      },
      model_year: {
        type: Number,
      },
      slug: {
        type: String,
        maxlength: 255,
        trim: true,
        require: false
      },
      thumbnail: {
        type: String,
        maxlength: 255,
        require: false,
      },
      stock: {
        type: Number,
        min: 0,
        default: 0,
        require: false,
      },
      order: {
        type: Number,
        default: 50, //giá trị mặc định khi ko điền,
        min: 1, //giá trị tối thiểu chấp nhận là 1
        require: false,
      },
       /* SP bán nổi bật */
      isBest: {
        type: Boolean,
        require: false,
        default: false
      },
      /* SP mới về */
      isNewProduct: {
        type: Boolean,
        require: false,
        default: false
      },
      /* Show sp ra trang chủ */
      isShowHome: {
        type: Boolean,
        require: false,
        default: false
      },
      /* 
      Soft delete 
      Khi xóa sp thì đi update isDelete = true
      */
      isDelete: {
        type: Boolean,
        require: false,
        default: false
    },
},{ 
    timestamps: true 
})
//middleware
// Can thiệp vào dữ liệu trước khi ghi vào database
productschema.pre('validate', async function(next){
  /* tự động tạo slug từ product_name */
  if(!this.product_name) {
    throw createError(400,"product name not found");
  }
  this.slug = buildSlug(this.product_name);
  next();
})
const Product = model("Product", productschema);
export default Product