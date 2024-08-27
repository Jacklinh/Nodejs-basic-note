// import react router dom
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import pages
import LayoutAdmin from "./components/layouts/LayoutAdmin";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import NoPage from "./pages/NoPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import './App.css'
const queryClient = new QueryClient();
function App() {


  return (
    <>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
            <Routes>
                <Route path="/" element={<LayoutAdmin />}>
                    <Route index element={<DashboardPage />} />
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
