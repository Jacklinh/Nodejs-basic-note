'use client';
import { useEffect, useState } from 'react';
import { Form, Input, Button, Radio, Space, message, Result, RadioChangeEvent } from 'antd';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BiHomeCircle } from 'react-icons/bi';
import { axiosClient } from '@/library/axiosClient';
import { globalSetting } from '@/constanst/configs';
import useAuth from '@/hooks/useAuth';
import {useCart} from '@/hooks/useCart';

const { TextArea } = Input;

interface CheckoutFormValues {
  fullName: string;
  email: string;
  phone: string;
  password?: string;
  address?: string;
  shipping_address?: string;
  payment_type: number;
  note?: string;
}
const CheckOut = () => {
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();
    const { products, totalAmount, clearCart, shippingFee, setShippingFee } = useCart();
    const [form] = Form.useForm<CheckoutFormValues>();
    const [loading, setLoading] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const defaultPassword = 'testdemo@2024'; // Mật khẩu mặc định cho khách hàng mới

    // Kiểm tra giỏ hàng và điền form
    useEffect(() => {
      if (products.length === 0 && !orderSuccess) {
          //message.warning('Giỏ hàng trống!');
          //router.push('/');
          return;
      }

      if (isAuthenticated && user) {
          form.setFieldsValue({
              fullName: user.fullName,
              email: user.email,
              phone: user.phone,
              address: user.address,
              password: user?.password
          });
      }
    }, [products.length, orderSuccess, isAuthenticated, user, form, router]);

    const onFinish = async (values: CheckoutFormValues) => {
        setLoading(true);
        // Chuẩn bị dữ liệu đơn hàng
        const orderItems = products.map(item => ({
            product: {
                _id: item._id || '',
                thumbnail: item.thumbnail
            },
            product_name: item.product_name || '',
            quantity: item.quantity,
            price: item.price,
            discount: item.discount || 0
        }));
        // Tạo object đơn hàng
        const orderData = {
            payment_type: values.payment_type,
            shipping_address: values.shipping_address || values.address,
            shipping_fee: shippingFee,
            note: values.note,
            status: 1,
            payment_status: 1,
            order_items: orderItems,
            total_amount: totalAmount + shippingFee,
            // Xử lý customer dựa vào trạng thái đăng nhập
            customer: isAuthenticated && user?._id 
                ? user._id  // Nếu đã đăng nhập, gửi ID
                : {         // Nếu chưa đăng nhập, gửi thông tin mới
                    fullName: values.fullName,
                    email: values.email,
                    phone: values.phone,
                    password: defaultPassword,
                    address: values.shipping_address
            }
        };
        const response = await axiosClient.post(`${globalSetting.URL_API}/orders`, orderData);
        if (response.data.statusCode === 200) {
            message.success('Đặt hàng thành công!');
            setOrderSuccess(true);
            clearCart();

            //router.push('/order-success');
        }
    };
    // Thêm hàm xử lý thay đổi phí vận chuyển
    const handleShippingFeeChange = (e: RadioChangeEvent) => {
        setShippingFee(e.target.value);
    };
    if (orderSuccess) {
        return (
            <Result
                status="success"
                title="Đặt hàng thành công!"
                subTitle="Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn sớm nhất!"
                extra={[
                    <Link href="/" key="home">
                        <Button type="primary" icon={<BiHomeCircle />}>
                            Về trang chủ
                        </Button>
                    </Link>
                ]}
            />
        );
    }


    return (
        <section className="sec_checkout">
            <div className="container mx-auto py-8">
                <div className="box_checkout">
                    <div className="article_use">
                        {/* Form đặt hàng */}
                        <div className="article_form">
                            <h2 className="sec_heading">Thông tin đặt hàng</h2>
                                <Form
                                form={form}
                                layout="vertical"
                                onFinish={onFinish}
                                initialValues={{ payment_type: 1 }}
                                className="form_order"
                            >
                                {user && isAuthenticated? (
                                <>
                                    <p>{user._id}</p>
                                    <p>{user.fullName}</p>
                                    <p>{user.email}</p>
                                    <p>{user.phone}</p>
                                    <p>{user.address}</p>
                                    <p>{user.password}</p>
                                </>
                                ) : (
                                    <>
                                <Form.Item
                                    name="fullName"
                                    label="Họ Tên"
                                    rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                                >
                                    <Input placeholder='Họ và tên của bạn' />
                                </Form.Item>

                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập email!' },
                                        { type: 'email', message: 'Email không hợp lệ!' }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    name="phone"
                                    label="Số điện thoại"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập số điện thoại!' },
                                        { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ!' }
                                    ]}
                                >
                                    <Input placeholder='số điện thoại nhận hàng của bạn'  />
                                </Form.Item>
                                </>
                                )}
                                <Form.Item
                                    name="shipping_address"
                                    label="Địa chỉ giao hàng"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập địa chỉ nhận hàng chi tiết(số nhà, phường, tỉnh thành)' },
                                    ]}
                                >
                                    <TextArea rows={4}  placeholder="gồm số nhà, phường, tỉnh thành" />
                                </Form.Item>
                                <div className="flex gap-x-6">
                                    <Form.Item
                                        name="payment_type"
                                        label="Phương thức thanh toán"
                                    >
                                        <Radio.Group>
                                            <Space direction="vertical">
                                                <Radio value={1}>Thanh toán khi nhận hàng (COD)</Radio>
                                                <Radio value={2}>Chuyển khoản ngân hàng</Radio>
                                                <Radio value={3}>Thanh toán qua ví điện tử</Radio>
                                            </Space>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item
                                        name="shipping_fee"
                                        label="Hình thức vận chuyển"
                                    >
                                        <Radio.Group 
                                            onChange={handleShippingFeeChange} 
                                            defaultValue={shippingFee}
                                        >
                                        
                                            <Space direction="vertical">
                                                <Radio value={0}>Miễn phí vận chuyển trong nội thành</Radio>
                                                <Radio value={15000}>Vận chuyển tiết kiệm</Radio>
                                                <Radio value={30000}>Vận chuyển nhanh</Radio>
                                            </Space>
                                        </Radio.Group>
                                    </Form.Item>
                                </div>
                                <Form.Item name="note" label="Ghi chú (nếu có)">
                                    <TextArea rows={4} placeholder="Ghi chú về đơn hàng" />
                                </Form.Item>
                                <Form.Item name="password" label="mật khẩu" hidden >
                                    <Input value={defaultPassword} type='hidden'/>
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading}
                                        className="btn_home"
                                    >
                                        Đặt hàng
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                    {/* Thông tin đơn hàng */}
                    <div className="article_cart">
                        <h2 className="sec_heading">Thông tin đơn hàng</h2>
                        <div className="box_cart">
                            <ul className="cart_list">
                                {products.map((item) => (
                                    <li key={item._id} className="cart_item cart_item_checkout">
                                        <div className="cart_image">
                                            <Image
                                                src={item.thumbnail ? `${globalSetting.UPLOAD_DIRECTORY}/${item.thumbnail}` : '/images/no-image.jpg'}
                                                alt={item.product_name || ''}
                                                width={50}
                                                height={50}
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="cart_info">
                                            <p className="cart_name">{item.product_name}</p>
                                            <p className="cart_quantity">x {item.quantity}</p> = 
                                            <p className="cart_price"> 
                                                {new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                }).format(item.price * item.quantity * (1 - (item.discount || 0) / 100))}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <table className="table_result">
                                <tbody>
                                    <tr>
                                        <th>Tạm tính:</th>
                                        <td>{new Intl.NumberFormat('vi-VN',{style: 'currency',currency: 'VND'}).format(totalAmount)}</td>
                                    </tr>
                                    <tr>
                                        <th>Phí vận chuyển:</th>
                                        <td>{new Intl.NumberFormat('vi-VN',{style: 'currency',currency: 'VND'}).format(shippingFee)}</td>
                                    </tr>
                                    <tr>
                                        <th>Tổng cộng:</th>
                                        <td>{new Intl.NumberFormat('vi-VN',{style: 'currency',currency: 'VND'}).format(totalAmount + shippingFee)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CheckOut;