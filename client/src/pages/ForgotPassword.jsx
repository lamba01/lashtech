import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebase";
import bg from "../assets/registerimg.png";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(
        "Password reset email sent! Check your inbox and spam folder."
      );
    } catch (err) {
      console.error(err);
      setError("Failed to send reset email. Try again.");
    }
  };

  return (
    <main className="w-full flex justify-center items-center text-white overflow-hidden">
      <div className="flex w-[100vw] h-[100vh] justify-center items-center bg-[#1E1E1E] flex-col sm:flex-row">
        <div
          className="w-full h-[35%] sm:h-full bg-cover bg-no-repeat relative bg-center"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="absolute bg-black/50 w-full h-full z-0"></div>
          <div className="relative z-10 flex flex-col top-[15%] h-full sm:w-[80%] text-start px-6 sm:pl-6">
            <h3 className="text-white text-4xl">
              We show your skin, hair, and body the care and attention they
              deserve.
            </h3>
            <p className="text-white mt-4">
              Where Tranquility Meets Transformation.
            </p>
          </div>
        </div>
        <div className="w-full h-[65%] px-5 sm:px-20 py-10 sm:py-0">
          <h2 className="capitalize text-4xl">forgot password</h2>
          <p className="text-[#F4F6FC] py-5">
            Enter the email you used to register and we'll send you a link to
            reset your password.
          </p>

          {message && <p className="text-green-500 mb-4">{message}</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleReset} className="flex flex-col gap-5">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="border border-white/25 px-3 py-2"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <button
              type="submit"
              className="bg-white text-black capitalize py-3 cursor-pointer hover:bg-white/50"
            >
              Send Reset Link
            </button>
            <p className="text-center">
              <Link to="/login" className="text-[#FB7902] underline">
                Back to Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}

export default ForgotPassword;
