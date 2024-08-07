import { Schema, model } from "mongoose";
import createError from 'http-errors';
import { buildSlug } from "../helpers/buildSlug";
const brandSchema = new Schema({
    brand_name: {
        type: String,
        maxLength: 100,
        unique: true,
        trim: true

    },
    description: {
        type: String,
        maxLength: 500,
        require: false
    },
    slug: {
        type: String,
        maxLength: 100,
        trim: true,
        require: false
    }
},{ 
    timestamps: true 
})
brandSchema.pre('validate',async function(next){
    if(!this.brand_name) {
        throw createError(400,"brand name not found");
    }
    this.slug = buildSlug(this.brand_name);

    next();
})
const Brand = model("Brand", brandSchema);
export default Brand