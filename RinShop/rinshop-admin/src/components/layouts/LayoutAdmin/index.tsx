import React, { useEffect } from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import {
  AppstoreOutlined,
  ShopOutlined
} from '@ant-design/icons';
import { TbUsersGroup,TbCategory } from "react-icons/tb"
import type { MenuProps } from 'antd';
import { Layout, Menu} from 'antd';
// import images
import logo from '../../../assets/logo5.png'
import HeaderAdmin from './HeaderAdmin';
import styles from './LayoutAdmin.module.css'
const { Content, Footer, Sider } = Layout;
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
        label: "MAIN",
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
label: "QUẢN LÝ SẢN PHẨM",
    type: "group",
    children: [
        {
            key: "products",
            icon: <ShopOutlined />,
            label: "SẢN PHẨM"
        },
        {
            key: "categories",
            icon: <TbCategory />,
            label: "DANH MỤC"
        }
      ],
   
    },
    {    
        label: "NGƯỜI DÙNG",
        type: "group",
        children: [
            {
                key: "staffs",
                icon: <TbUsersGroup />,
                label: "NHÂN VIÊN"
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
    return (
        <div>
            <Layout hasSider style={{ minHeight: "100vh" }}>
                <Sider style={siderStyle} className={styles.box_siderbar}>
                    <div className="demo-logo-vertical">
                        <p><img className='responsive_image' src={logo} width={220} height={220} alt="rinshop" /></p>
                    </div>
                    <Menu 
                        theme="light" 
                        mode="inline" 
                        items={items} 
                        onClick={({ key }) => {
                        navigate("/" + key.split("-").join("/"));
                    }} 
                    />
                </Sider>
                <Layout style={{ marginInlineStart: 200 }}>
                    <HeaderAdmin />
                    <Content style={{ margin: '24px 16px', overflow: 'initial' }}>
                        <Outlet />
                    </Content>
                    <Footer className='sec_footer'>
                        Rin vegetables - fruits ©{new Date().getFullYear()} Created by Le Van Linh
                    </Footer>
                </Layout>
            </Layout>
        </div>
    )
}

export default LayoutAdmin