import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/" element={<Booking />} />
      <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default App;
