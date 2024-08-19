import { Schema, model } from "mongoose";

const orderItemsSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
    },
        quantity: {
        type: Number,
        min: 1,
        default: 1
    },
        price: {
        type: Number,
        min: 0,
        default: 0,
    },
        discount: {
        type: Number,
        min: 0,
        max: 70,
        default: 0,
        comments: 'discount BETWEEN 0 AND 70'
    }
})
const orderschema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
      },
      staff: {
        type: Schema.Types.ObjectId, //_id
        ref: 'Staff',
      },
      order_status: {
        type: Number,
        enum: [1, 2, 3, 4],
        default: 1,
        comments: 'Order status: 1 = Pending; 2 = Processing; 3 = Rejected; 4 = Completed'
      },
      order_date: {
        type: Date,
        require: false,
        default: new Date().toISOString()
      },
      require_date: {
        type: Date,
        required: false, 
        default: null
      },
      shipping_date: {
        type: Date, 
        require: false,
        default: null
      },
      order_note: {
        type: String,
        required: false
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
      payment_type: {
        type: Number,
        enum: [1, 2, 3, 4],
        comments: 'payment type: 1 = COD; 2 = Credit; 3 = ATM; 4 = Cash',
        default: 4 // mặc định khi tạo sản phẩm mới
      },
      order_item: [orderItemsSchema]
},{ 
    timestamps: true 
})

const Order = model("Order", orderschema);
export default Order