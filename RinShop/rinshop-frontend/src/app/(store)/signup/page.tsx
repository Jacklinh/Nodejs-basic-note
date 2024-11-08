
'use client';
import { useState } from 'react';
import { Button, Form, Input,message } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TCustomer } from '@/types/type';
const { TextArea } = Input;
// import axios
import { axiosClient } from '@/library/axiosClient';
import { globalSetting } from '@/constanst/configs';
import type {FormProps } from 'antd';
const Signup = () => {
	const router = useRouter();
	const [formAdd] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const handleSignup = async (values: TCustomer) => {
        try {
            setLoading(true);
            const url = `${globalSetting.URL_API}/customers`;
            await axiosClient.post(url, values);
            
            message.success('Đăng ký thành công!');
            formAdd.resetFields();
            router.push('/login');
        } catch (error) {
            message.error('Đăng ký thất bại!');
            console.error('Signup error:', error);
        } finally {
            setLoading(false);
        }
    };

    const onFinishAdd: FormProps<TCustomer>['onFinish'] = (values) => {
        handleSignup(values);
    };

    const onFinishFailedAdd: FormProps<TCustomer>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
	return (
		<section className="sec_login">
			<div className="container mx-auto">
				<div className="login_wrap">
					<div className="login_image">
						<p><Image src='/images/sign-up.png' loading='lazy' width='550' height='465' alt='image signup' /></p>
					</div>
					<div className="login_box">
						<p className="login_title">
							Chào mừng bạn tới RinKart
							<span>Tạo tài khoản của bạn</span>
						</p>
						<div className="login_form">
							<Form
								name="formSignUp"
								initialValues={{ remember: true }}
								autoComplete="off"
								layout="vertical"
								onFinish={onFinishAdd}
								onFinishFailed={onFinishFailedAdd}
								form={formAdd}
							>
                                <Form.Item<TCustomer>
								label="Họ và tên"
								name="fullName"
								hasFeedback
								rules={[
									{required: true, message: "Vui lòng nhập họ và tên" },
									{min: 5, message: "Tối thiểu 5 ký tự!" }
								]}
								>
								<Input />
								</Form.Item>

								<Form.Item<TCustomer>
								label="Email"
								name="email"
								hasFeedback
								rules={[
									{type: 'email', required: true, message: "Email phải đúng định dạng @" },
									]}
								>
								<Input />
								</Form.Item>

								<Form.Item<TCustomer>
								label="Mật khẩu"
								name="password"
								hasFeedback
								rules={[
									{required: true,message: 'Vui lòng nhập password!'},
									{min: 8,message: 'mật khẩu tối thiểu phải 8 ký tự',},
								]}
								>
								<Input.Password />
								</Form.Item>

								<Form.Item<TCustomer>
								label="Số điện thoại"
								name="phone"
								hasFeedback
								rules={[
									{pattern: /^[0-9]{10}$/, required: true, message: "Số điện thoại phải 10 số!" },
								]}
								>
								<Input />
								</Form.Item>

                                <Form.Item<TCustomer>
								label="Địa chỉ"
								name="address"
								>
								<TextArea rows={4} />
								</Form.Item>

								<Form.Item>
									<Button type="primary" htmlType="submit" className='btn_home' loading={loading}>
										Đăng ký
									</Button>
								</Form.Item>
							</Form>
						</div>
						<div className="signup_box">
							<p>Bạn đã có tài khoản? <Link href='/login'>Đăng nhập</Link></p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Signup