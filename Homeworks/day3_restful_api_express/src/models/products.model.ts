import { Schema, model } from "mongoose";

const productschema = new Schema({
    product_name: {
        type: String,
        maxlength: 255,
        unique: true,
        trim: true
      },
      price: {
        type: Number,
        min: 0,
        default: 0
      },
      discount: {
        type: Number,
        min: 0,
        default: 0
      },
      category_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
      },
      brand_id: {
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
        unique: true,
        trim: true,
      },
      thumbnail: {
        type: String,
        maxlength: 255,
        require: false,
      },
      stock: {
        type: Number,
        min: 0,
        default: 0
      },
      order: {
        type: Number,
        default: 50, //giá trị mặc định khi ko điền,
        min: 1, //giá trị tối thiểu chấp nhận là 1
        require: false,
      },
},{ 
    timestamps: true 
})

const Product = model("Product", productschema);
export default Product