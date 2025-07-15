import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Bookings from "./pages/Bookings";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Signup />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
