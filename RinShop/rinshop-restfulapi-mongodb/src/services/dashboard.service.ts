import Order from '../models/orders.model';
import Product from '../models/products.model';
import Customer from '../models/customers.model';

const getStatistics = async () => {
    try {
        // tổng số đơn hàng
        const totalOrders = await Order.countDocuments();
        // tổng số sản phẩm
        const totalProducts = await Product.countDocuments();
        // tổng số khách hàng
        const totalCustomers = await Customer.countDocuments();

        return {
            totalOrders,
            totalProducts,
            totalCustomers
        }
    } catch (error) {
        throw error;
    }
}

export default {
    getStatistics
}
