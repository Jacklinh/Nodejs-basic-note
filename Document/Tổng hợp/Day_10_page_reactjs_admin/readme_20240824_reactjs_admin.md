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



