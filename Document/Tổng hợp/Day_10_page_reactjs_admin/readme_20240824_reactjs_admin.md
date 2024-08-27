# Tạo page React Admin
dành cho chủ cửa hàng dùng

## cấu trúc dự án

```
react-ecommerce/
├─ node_modules/
├─ public/
├─ src/
│  ├─ components/
        ├─ layouts/
            ├─ LayoutAdmin/
                ├─ index.tsx
│  ├─ constants/
│  ├─ hooks/
│  ├─ library/
│  ├─ pages/
│       ├─ LoginPage
│       ├─ DashboardPage
│       ├─ CategoryPage
│       ├─ ProductPage
│       ├─ OrdersPage
│       ├─ BrandPage
│       ├─ CustomerPage
│       ├─ StaffPage
│       ├─ NoPage
│  ├─ App.tsx
│  ├─ App.css
│  ├─ index.css
│  ├─ main.tsx
├─ .env
├─ index.html
├─ .gitignore
├─ package.json
├─ README.md
├─ tsconfig.json
├─ vite.config.ts
```
## công nghệ sử dụng

- reactvite
- react router dom
- ant design
## tạo dự án react-admin 

- B1: tạo project với lệnh `yarn create vite` ,đặt tên project rồi chọn `reactjs` `typeScript + SWC`.
- B2: di chuyển `cd` tới project vừa tạo, chạy lệnh `yarn`, lúc nảy ta chạy `yarn dev` để hiển thị local link giao diện
- B3: remove code không cần thiết ở file `app.tsx`
- B4: tạo component cho `dashboard`, trong folder src/components/layouts/LayoutAdmin/ tạo file `index.tsx`
 dùng phím tắt `rafce` (ReactArrowsFuctionExportComponent) để export tự sinh code cho component
- B5: dùng react router dom với lệnh `yarn add -D react-router-dom` để tạo ra nhiều trang nội dung như html (top, free, login, dashboard, product...)- tạo tài liệu bên reactjs
- B6: cấu hình file `app.tsx`

```tsx
// import react router dom
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import pages
import LayoutAdmin from "./components/layouts/LayoutAdmin";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import NoPage from "./pages/NoPage";
import './App.css'

function App() {


  return (
    <>
      <BrowserRouter>
            <Routes>
                <Route path="/" element={<LayoutAdmin />}>
                    <Route index element={<DashboardPage />} />
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App

```

- B7: dùng `ant design` để tạo giao điện dashboard , tại file src/components/layouts/layoutAdmin/index.tsx

doc <https://ant.design/components/overview/>

dùng lệnh
```bash
yarn add antd
```

- B8. tạo restful api admin với mongoose 
( xem chi tiết file readme_20240824_restful_api_mongodb.md)

- B9: sau khi tạo auth bên api xong, ta thực hiện tiếp việc bên này. 

- B10: trong folder src/library tạo file `axiosClient.ts`

```ts
import axios from "axios";
import { globalConfig } from "../constants/config";
const API_URL = `${globalConfig.URL_API}/api/v1/auth`;

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST
axiosClient.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// RESPONSE

axiosClient.interceptors.response.use(
  async (response) => {
    const { access_token, refresh_token } = response.data.data;
    // LOGIN
    if (access_token) {
      window.localStorage.setItem("token", access_token);
    }
    if (refresh_token) {
      window.localStorage.setItem("refreshToken", refresh_token);
    }

    return response;
  },
  async (error) => {
    if (error?.response?.status !== 401) {
      return Promise.reject(error);
    }

    const originalConfig = error.config;

    if (error?.response?.status === 401 && !originalConfig.sent) {
      originalConfig.sent = true;
      try {
        // Trường hợp không có token thì chuyển sang trang LOGIN
        const token = window.localStorage.getItem("token");
        if (!token) {
          window.location.href = "/login";
          return Promise.reject(error);
        }

        const refreshToken = window.localStorage.getItem("refreshToken");
        if (refreshToken) {
          const response = await axiosClient.post("/refresh-token", {
            refreshToken: refreshToken,
          });

          const { access_token } = response.data;
          window.localStorage.setItem("token", access_token);

          originalConfig.headers = {
            ...originalConfig.headers,
            authorization: `Bearer ${access_token}`,
          };

          return axiosClient(originalConfig);
        } else {
          return Promise.reject(error);
        }
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }
);

export { axiosClient };
```

- b11: tạo file hook để quản lý đăng nhập
src/hooks tạo file `useAuth.ts`
```ts
import { create } from "zustand";
import { axiosClient } from "../library/axiosClient";
import { devtools, persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware"; // Import createJSONStorage

interface User {
  _id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  role: string;
}
interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ isAuthenticated: boolean; error: string }>;
  logout: () => void;
}

const useAuth = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        setUser: (user: User) => set({ user }),
        login: async (email: string, password: string) => {
          try {
            const response = await axiosClient.post(
              "http://localhost:8000/api/v1/auth/login",
              { email, password }
            );

            if (response && response.data.statusCode === 200) {
              const responseProfile = await axiosClient.get(
                "http://localhost:8000/api/v1/auth/profile"
              );

              set({
                user: responseProfile.data.data,
                isAuthenticated: true,
              });

              return { isAuthenticated: true, error: "" };
            } else {
              return {
                isAuthenticated: false,
                error: "Username or password is invalid",
              };
            }
          } catch {
            return {
              isAuthenticated: false,
              error: "Login failed",
            };
          }
        },
        logout: () => {
          set({ user: null, isAuthenticated: false });
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
        },
      }),
      {
        name: "auth-storage", // Tên của key lưu trữ
        storage: createJSONStorage(() => sessionStorage), // Lưu trữ trong sessionStorage (tuỳ chọn, mặc định là localStorage)
      }
    )
  )
);

export default useAuth;
```

- b12: dùng hook trong component dashboard nếu chưa login mà vào các page dashboard sẽ bắt login rồi mới vào được
file src/component/layout/layoutAdmin file index.tsx
```tsx
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
```



