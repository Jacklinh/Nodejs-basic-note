import { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
// import images
import logo from '../assets/logo.png'
import '../App.css'
const LoginPage = () => {
    const [form] = Form.useForm();
    const [clientReady, setClientReady] = useState<boolean>(false);
    // To disable submit button at the beginning.
    useEffect(() => {
        setClientReady(true);
    }, []);
    const onFinish = (values: string) => {
        console.log('Received values of form: ', values);
    };
    return (
        <div className='sec_login'>
            <div className='box_login'>
                <p className="login_logo"><img className='responsive_image' src={logo} width={270} height={115} alt="rinshop" /></p>
                <p className="login_desc">Login to dashboard</p>
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    style={{ maxWidth: 360 }}
                    onFinish={onFinish}
                    form={form}
                    >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
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
                                disabled={
                                    !clientReady ||
                                    !form.isFieldsTouched(true) ||
                                    !!form.getFieldsError().filter(({ errors }) => errors.length).length
                                }
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

export default LoginPage