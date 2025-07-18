import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Bookings from "./pages/Bookings";
import Footer from "./components/Footer";
import Topnav from "./components/Topnav";
import Admin from "./pages/AdminDashboard";
import AutoLogoutWrapper from "./components/AutoLogoutWrapper";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const location = useLocation();
  const hideNavAndFooter = ["/login", "/register", "/forgot-password"].includes(
    location.pathname
  );
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);
  return (
    <AutoLogoutWrapper>
      {!hideNavAndFooter && <Topnav />}
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      {!hideNavAndFooter && <Footer />}
    </AutoLogoutWrapper>
  );
}

export default App;
