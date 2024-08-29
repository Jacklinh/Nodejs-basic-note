import React, { useEffect } from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import {
  AppstoreOutlined,
  ShopOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, Flex } from 'antd';
// import images
import logo from '../../../assets/logo.png'
import UserInfo from '../../UserInfo';

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
        label: "Main",
        type: "group",
        children: [
            {
                key: "",// router bên app.tsx
                icon: <AppstoreOutlined />,
                label: "Dashboard"
            }
          ],
       
   },
   {    
    label: "Product management",
    type: "group",
    children: [
        {
            key: "products",
            icon: <ShopOutlined />,
            label: "Products"
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
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <div>
            <Layout hasSider style={{ minHeight: "100vh" }}>
                <Sider style={siderStyle}>
                    <div className="demo-logo-vertical">
                        <p><img className='responsive_image' src={logo} width={200} height={81} alt="rinshop" /></p>
                    </div>
                    <Menu 
                        theme="light" 
                        mode="inline" 
                        items={items} 
                        onClick={({ key }) => {
                        navigate("/" + key.split("-").join("/"));
                        console.log(key);
                    }} 
                    />
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
                                <UserInfo />
                            </Flex>
                            
                        </Flex>
                        
                    </Header>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <Outlet />
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