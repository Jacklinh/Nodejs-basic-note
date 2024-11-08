import { Schema, model } from "mongoose";
import { TypeOrder, TypeOderItems } from "../types/models";
const orderItemsSchema = new Schema<TypeOderItems>({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        require: true
    },
    product_name: {
        type: String,
    },
    quantity: {
        type: Number,
        min: 1
    },
    price: {
        type: Number,
        min: 0
    },
    discount: {
        type: Number,
        min: 0
    }
})
const orderSchema = new Schema<TypeOrder>({
    order_code: {
        type: String,
        unique: true,
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    payment_type: {
        type: Number,
        required: false,
        /**
         * payment type: 
         * 1 = COD = Thanh toán khi nhận hàng; 
         * 2 = ATM = Chuyển khoản ngân hàng; 
         * 3 = Cash = Thanh toán qua ví điện tử; 
         */
        enum:[1,2,3],
        default: 1, // mặc định khi tạo đơn mới
    },
    // trạng thái thanh toán
    payment_status: {
        type: Number,
        required: true,
        /**
         * Payment status:
         * 1 = Chưa thanh toán
         * 2 = Đã thanh toán
         * 3 = Hoàn tiền
         */
        enum: [1, 2, 3],
        default: 1
    },
    // trạng thái đơn hàng
    status: {
        type: Number,
        required: true,
        /**
         * Order status:
         * 1 = Chờ xác nhận
         * 2 = Đã xác nhận
         * 3 = Đang giao hàng
         * 4 = Đã giao hàng
         * 5 = Đã hủy
         * 6 = Hoàn trả
         */
        enum: [1, 2, 3, 4, 5, 6],
        default: 1
    },
    // địa chỉ giao hàng
    shipping_address: {
        type: String,
        required: true
    },
    // số điện thoại người nhận
    tracking_number: {
        type: String
    },
    // phí vận chuyển
    shipping_fee: {
        type: Number,
        default: 0,
        min: 0
    },
    // ghi chú
    note: {
        type: String
    },
    // danh sách sản phẩm trong đơn hàng
    order_items: [orderItemsSchema],
    // tổng tiền đơn hàng
    total_amount: {
        type: Number,
        required: true,
        min: 0
    },
    // lý do hủy đơn
    cancelled_reason: {
        type: String
    },
    // thời gian hủy đơn
    cancelled_at: {
        type: Date
    },
    // thời gian giao hàng
    delivered_at: {
        type: Date
    }
},{ 
    timestamps: true 
})
// Tạo order_code tự động trước khi lưu
// Tạo order_code tự động trước khi lưu
orderSchema.pre('save', async function(next) {
    try {
        if (this.isNew && !this.order_code) {
            // Lấy số thứ tự đơn hàng mới nhất
            const lastOrder = await Order.findOne({}, {}, { sort: { 'createdAt': -1 } });
            let orderNumber = 1;

            if (lastOrder && lastOrder.order_code) {
                // Lấy số từ mã đơn hàng cuối cùng
                const lastNumber = parseInt(lastOrder.order_code.replace('ORD', ''));
                if (!isNaN(lastNumber)) {
                    orderNumber = lastNumber + 1;
                }
            }

            // Tạo mã đơn hàng mới
            const timestamp = new Date().getTime().toString().slice(-6);
            this.order_code = `ORD${timestamp}${String(orderNumber).padStart(4, '0')}`;

            // Kiểm tra xem mã đã tồn tại chưa
            const existingOrder = await Order.findOne({ order_code: this.order_code });
            if (existingOrder) {
                // Nếu đã tồn tại, thêm một số ngẫu nhiên
                const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
                this.order_code = `ORD${timestamp}${random}`;
            }
        }
        next();
    } catch (error) {
        next(error as Error);
    }
});
const Order = model<TypeOrder>("Order", orderSchema);
export default Order
