import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import {
  AppstoreOutlined,
  UserOutlined 
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme,Avatar, Space, Flex } from 'antd';
// import images
import logo from '../../../assets/logo.png'

const { Header, Content, Footer, Sider } = Layout;
const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'fixed',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarColor: 'unset',
  background: '#ffffff',
};

const items: MenuProps['items'] = [
   {    
        key: "Main",
        label: "Main",
        type: "group",
        children: [
            {
                key: "",
                icon: <AppstoreOutlined />,
                label: "Dashboard"
            }
          ],
       
   }
];
const LayoutAdmin = () => {
    const navigate = useNavigate();

    const { isAuthenticated } = useAuth();

    //check login
    useEffect(() => {
        if (!isAuthenticated) {
        navigate("/login");
        }
    }, [navigate, isAuthenticated]);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <div>
            <Layout hasSider style={{ minHeight: "100vh" }}>
                <Sider style={siderStyle}>
                    <div className="demo-logo-vertical">
                        <p><img className='responsive_image' src={logo} width={200} height={81} alt="rinshop" /></p>
                    </div>
                    <Menu theme="light" mode="inline" items={items} />
                </Sider>
                <Layout style={{ marginInlineStart: 200 }}>
                    <Header
                        style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        background: colorBgContainer,
                        }}
                    >   
                        <Flex style={{ width: '100%', justifyContent: 'space-between' }}>
                            <p>search & avatar</p>
                            <Flex>
                                <Space wrap size={16}>
                                    <Avatar shape="square" size={64} icon={<UserOutlined />} />
                                    <p>name</p>
                                </Space>
                            </Flex>
                            
                        </Flex>
                        
                    </Header>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div
                        style={{
                        padding: 24,
                        textAlign: 'center',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        }}
                    >
                        <p>long content</p>
                        {
                        // indicates very long content
                        Array.from({ length: 100 }, (_, index) => (
                            <React.Fragment key={index}>
                            {index % 20 === 0 && index ? 'more' : '...'}
                            <br />
                            </React.Fragment>
                        ))
                        }
                    </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        </div>
    )
}

export default LayoutAdmin