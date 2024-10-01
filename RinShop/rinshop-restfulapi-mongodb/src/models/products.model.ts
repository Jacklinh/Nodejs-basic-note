import {Schema, model } from "mongoose";
import { buildSlug } from "../helpers/buildSlug";
import { TypeProduct } from "../types/models";
import createError from "http-errors";
const productSchema = new Schema<TypeProduct>({
    product_name: {
        type: String,
        maxLength: 255,
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
        max: 100,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    description: {
        type: String,
        require: false,
        maxlength: 500,
        trim: true
    },
    origin: {
        type: String,
        require: false,
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
    gallery: {
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
    isActive: {
        type: Boolean,
        drequire: false,
        default: false
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
},{
    timestamps: true
});

productSchema.pre('validate', async function(next){
    if(!this.product_name) {
        throw createError(400,"product name not found");
    }
    this.slug = buildSlug(this.product_name);
    next();
})
const Product = model<TypeProduct>('Product',productSchema);
export default Product;