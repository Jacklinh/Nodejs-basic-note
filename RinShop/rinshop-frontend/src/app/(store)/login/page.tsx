
'use client';
import { useEffect } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import {type FormProps } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { TCustomer } from '@/types/type';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
const Login = () => {
	const { login, isAuthenticated } = useAuth();
	const router = useRouter();
	//Neu da login roi, thi tra lại dashboard
	useEffect(() => {
		if(isAuthenticated){
			router.push('/');
		}
	},[router,isAuthenticated]);
	const onFinish: FormProps<TCustomer>["onFinish"] = async (values) => {
        //login api
        const result = await login(values.email, values.password);
        //Chuyen trang neu login thanh cong
        if (result && result.isAuthenticated) {
        	router.push('/');
        }
    };
	const onFinishFailed: FormProps<TCustomer>["onFinishFailed"] = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
	return (
		<section className="sec_login">
			<div className="container mx-auto">
				<div className="login_wrap">
					<div className="login_image">
						<p><Image loading="lazy" src='/images/log-in.png' width={550} height={465} alt='login image' /></p>
					</div>
					<div className="login_box">
						<p className="login_title">
							Chào mừng bạn tới RinKart
							<span>Đăng nhập với tài khoản của bạn</span>
						</p>
						<div className="login_form">
							<Form
								name="formLogin"
								initialValues={{ remember: true }}
								autoComplete="off"
								layout="vertical"
								onFinish={onFinish}
								onFinishFailed={onFinishFailed}
							>
								<Form.Item<TCustomer>
								label="Email"
								name="email"
								rules={[{ required: true, message: 'Vui lòng nhập email của bạn!' }]}
								>
								<Input />
								</Form.Item>

								<Form.Item<TCustomer>
								label="Mật khẩu"
								name="password"
								rules={[{ required: true, message: 'Vui lòng nhập mật khẩu của bạn!' }]}
								>
								<Input.Password />
								</Form.Item>

								<Form.Item<TCustomer>
								name="remember"
								valuePropName="checked"
								>
								<Checkbox>Ghi nhớ đăng nhập</Checkbox>
								</Form.Item>

								<Form.Item>
									<Button type="primary" htmlType="submit" className='btn_home'>
										Đăng nhập
									</Button>
								</Form.Item>
							</Form>
						</div>
						<div className="signup_box">
							<p>Bạn chưa có tài khoản? <Link href='/signup'>Đăng ký</Link></p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Login