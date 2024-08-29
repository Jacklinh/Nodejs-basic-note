import { useEffect } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex, type FormProps } from 'antd';
import { useNavigate } from "react-router-dom";

import useAuth from '../../hooks/useAuth';
// import images
import logo from '../../assets/logo.png'
import styles from './LoginAPI.module.css'
import '../../App.css'
type FieldType = {
	email: string;
	password: string;
	remember?: string;
};
const LoginAPI = () => {
	const { login, isAuthenticated } = useAuth();
	const navigate = useNavigate();
	//Neu da login roi, thi tra lại dashboard
	useEffect(() => {
		if(isAuthenticated){
			navigate("/")
		}
	},[navigate,isAuthenticated]);
	const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        //login api
        const result = await login(values.email, values.password);
        //Chuyen trang neu login thanh cong
        if (result && result.isAuthenticated) {
        navigate("/");
        }
    };
	const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
	return (
		<div className={styles.sec_login}>
            <div className={styles.box_login}>
                <p className="login_logo"><img className='responsive_image' src={logo} width={270} height={115} alt="rinshop" /></p>
                <p className="login_desc">Login to dashboard</p>
                <Form
                    name="form_login_api"
                    layout="vertical"
                    initialValues={{ remember: true }}
                    style={{ maxWidth: 360 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Flex justify="space-between" align="center">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <a href="">Forgot password</a>
                        </Flex>
                    </Form.Item>

                    <Form.Item shouldUpdate>
                        {() => (
                            <Button 
                                block type="primary"
                                htmlType="submit"
                            >
                                Login
                            </Button>
                        )}
                        
                    </Form.Item>
                    <Form.Item>
                        or <a href="">Register now!</a>
                    </Form.Item>
                </Form>
            </div>
           
        </div>
	)
}

export default LoginAPI