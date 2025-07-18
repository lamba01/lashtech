// src/components/AutoLogoutWrapper.jsx
import { useEffect } from "react";
import { auth } from "../config/firebase";

const AutoLogoutWrapper = ({ children }) => {
  useEffect(() => {
    let timeout;

    const logout = () => {
      auth.signOut();
      window.location.href = "/login"; // Redirect to login
    };

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(logout, 120 * 60 * 1000); // 120 mins
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    resetTimer(); // Initialize timer on mount

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      clearTimeout(timeout);
    };
  }, []);

  return children;
};

export default AutoLogoutWrapper;
