// import react router dom
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import pages
import LayoutAdmin from "./components/layouts/LayoutAdmin";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import NoPage from "./pages/NoPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import './App.css'
import ProductPage from "./pages/ProductPage";
import Staffs from "./pages/Staffs";
import Categories from "./pages/Categories";
const queryClient = new QueryClient();
function App() {


  return (
    <>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
            <Routes>
                <Route path="/" element={<LayoutAdmin />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="products" element={<ProductPage />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="staffs" element={<Staffs />} />
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
      </BrowserRouter>
    </QueryClientProvider>
    </>
  )
}

export default App
