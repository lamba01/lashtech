import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Bookings from "./pages/Bookings";
import Footer from "./components/Footer";
import Topnav from "./components/Topnav";
import AutoLogoutWrapper from "./components/AutoLogoutWrapper";

function App() {
  const location = useLocation();
  const hideNavAndFooter = ["/login", "/register", "/forgot-password"].includes(
    location.pathname
  );
  return (
    <AutoLogoutWrapper>
      {!hideNavAndFooter && <Topnav />}
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {!hideNavAndFooter && <Footer />}
        <Route path="/" element={<Home />} />
      </Routes>
      {!hideNavAndFooter && <Footer />}
    </AutoLogoutWrapper>
  );
}

export default App;
