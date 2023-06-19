import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import About from "./pages/About/About";
import AccountManagement from "./pages/Admin/AccountManagement/AccountManagement";
import AdminHome from "./pages/Admin/AdminHome/AdminHome";
import CatalogManagement from "./pages/Admin/CatalogManagement/CatalogManagement";
import OrderManagement from "./pages/Admin/OrderManagement/OrderManagement";
import PaymentManagement from "./pages/Admin/PaymentManagement/PaymentManagement";
import Statistical from "./pages/Admin/StatisticalManagement/Statistical";
import Cart from "./pages/Cart/Cart";
import History from "./pages/History/History";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import ForgotPassword from "./pages/Password/ForgotPassword";
import NewPassword from "./pages/Password/NewPassword";
import OTPConfirm from "./pages/Password/OTPConfirm";
import Payment from "./pages/Payment/Payment";
import PaymentOrders from "./pages/PaymentOrders/PaymentOrders";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Register from "./pages/Register/Register";
import SaleProduct from "./pages/SaleProduct/SaleProduct";
import Sizecheck from "./pages/Sizecheck/Sizecheck";
import Thankyou from "./pages/Thankyou/Thankyou";

function App() {
  const admin = localStorage.getItem("admin");

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/size-check" element={<Sizecheck />} />
          <Route path="/productDetail/:id" element={<ProductDetail />} />
          <Route path="/productDetail/payment/:id" element={<Payment />} />
          <Route
            path="/productDetail/order/payment/:id"
            element={<PaymentOrders />}
          />
          <Route path="/page/thank-customer" element={<Thankyou />} />
          <Route path="/sale-product" element={<SaleProduct />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/account" element={<AccountManagement />} />
          <Route path="/admin/order" element={<OrderManagement />} />
          <Route path="/admin/payment" element={<PaymentManagement />} />
          <Route path="/admin/catalog" element={<CatalogManagement />} />
          <Route path="/admin/statistical" element={<Statistical />} />
          <Route path="/history" element={<History />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp-confirm/:id" element={<OTPConfirm />} />
          <Route path="/new-password/:id" element={<NewPassword />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
