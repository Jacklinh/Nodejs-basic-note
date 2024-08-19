import { Schema, model } from "mongoose";

const customerSchema = new Schema({
    first_name: {
        type: String,
        maxlength: 50
    },
    last_name: {
        type: String,
        maxlength: 50
    },
    phone: {
        type: String,
        maxlength: 50,
        unique: true
    },
    email: {
        type: String,
        maxlength: 150,
        unique: true
    },
    street: {
        type: String,
        maxlength: 255
    },
    city: {
        type: String,
        maxlength: 50
    },
    state: {
        type: String,
        maxlength: 50
    },
    zip_code: {
        type: String,
        maxlength: 5
    },
    password: {
        type: String,
        maxlength: 255,
        require: false,
        default: null
    }
},{ 
    timestamps: true 
})

const Customer = model("Customer", customerSchema);
export default Customer