import { Schema, model } from "mongoose";

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
        unique: true
    }
},{ 
    timestamps: true 
})

const Brand = model("Brand", brandSchema);
export default Brand