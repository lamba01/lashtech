// src/components/AutoLogoutWrapper.jsx
import { useEffect } from "react";
import { auth } from "../config/firebase";

const AutoLogoutWrapper = ({ children }) => {
  useEffect(() => {
    let timeout;

    const logout = () => {
      auth.signOut();
      alert("You’ve been logged out due to inactivity.");
      window.location.href = "/login"; // Redirect to login
    };

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(logout, 30 * 60 * 1000); // 30 mins
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
