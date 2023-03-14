import { DataProvider } from "./context/DataContext";
import MarketHeader from "./MarketHeader";

import { Route, Routes } from "react-router-dom"; // get router

import RegistrationPage from "./pages/authentication/RegistrationPage";
import LoginPage from "./pages/authentication/LoginPage";
import "./styles/App.css";
import RequireAuth from "./RequireAuth";
import Admin from "./components/Admin";
import { AuthProvider } from "./context/AuthProvider";
// import { Home } from "@mui/icons-material";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/dashboard/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Header from "./components/dashboard/navbar/header/Header";
import Brands from "./components/dashboard/brand/Brands";
import ProductDemo from "./components/dashboard/product/ProductDemo";
import Categories from "./components/dashboard/category/Categories";
import Unauthorized from "./Unauthorized";
import HomePage from "./pages/homepage/HomePage";
import NavigationBar from "./navigation/NavigationBar";
import Footer from "./components/footer/Footer";
import ProductPage from "./pages/product/ProductPage";
import { CartProvider } from "./context/CartConntext";
import { Cart } from "./pages/cart/Cart";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <DataProvider>
          <CartProvider>
            
            <Routes>
              <Route path="/" element={<LayoutsWithNavbar />}>
                <Route path="/product/:productId" element={<ProductPage />} />
                <Route path="/signin" element={<LoginPage />} />
                <Route path="/signup" element={<RegistrationPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/" element={<HomePage />} />
              </Route>

              <Route path="/manage" element={<LayoutsWithAdmin />}>
                {/* wrap routes need authentication to protect routes */}
                <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
                  {/* <Route path="/admin" element={<Admin />} /> */}
                  <Route path="products" element={<ProductDemo />} />
                  <Route path="categories" element={<Categories />} />
                  <Route path="brands" element={<Brands />} />
                </Route>
              </Route>

              <Route path="/unauthorized" element={<Unauthorized />}></Route>
            </Routes>
          </CartProvider>
        </DataProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

function LayoutsWithNavbar() {
  return (
    <>
      {/* các component chung - trang chủ, singin, signup */}
      <MarketHeader />
      <NavigationBar />

      {/* hiển thị các element con */}
      <Outlet />

      <Footer />

      {/* common footer  */}
    </>
  );
}

function LayoutsWithAdmin() {
  return (
    <>
      {/* Your navbar component */}
      <Header />
      <Navbar />

      {/* This Outlet is the place in which react-router will render your components that you need with the navbar */}
      <Outlet />

      {/* You can add a footer to get fancy in here :) */}
    </>
  );
}

export default App;
