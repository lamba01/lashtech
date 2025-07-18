import React, { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import bg from "../assets/registerimg.png";
import { FcGoogle } from "react-icons/fc";
const ADMIN_UID = import.meta.env.VITE_ADMIN_UID;

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const uid = userCredential.user.uid;
      if (uid === ADMIN_UID) {
        navigate("/admin");
      } else {
        navigate("/"); // or user dashboard
      }
      // navigate("/");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Logged in with Google!");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Google sign-in failed");
    }
  };

  return (
    <main className="w-full flex justify-center items-center text-white sm:overflow-hidden overflow-y-auto  min-h-screen">
      <div className="flex w-[100vw] sm:h-screen min-h-screen justify-center items-center bg-[#1E1E1E] flex-col sm:flex-row">
        <div
          className="w-full min-h-[30vh] h-fit sm:h-full bg-cover bg-no-repeat relative bg-center"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="absolute bg-black/60 w-full h-full z-0"></div>
          <div className="relative z-10 flex flex-col top-[20%] sm:top-[15%] h-full sm:w-[80%] text-start px-6 sm:pl-6">
            <h3 className="text-white sm:text-4xl text-2xl font-semibold">
              We show your skin, hair, and body the care and attention they
              deserve.
            </h3>
            <p className="text-[#FB7902] mt-4 text">
              Where Tranquility Meets Transformation.
            </p>
          </div>
        </div>

        <div className="w-full sm:h-[65%] min-h-[70vh] h-fit px-5 sm:px-20 py-10 sm:py-0">
          <h2 className="capitalize text-4xl">login</h2>
          <p className="text-[#F4F6FC] py-5">
            Welcome back! Please log in to continue your experience with us.
          </p>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border border-white/25 px-3 py-2"
              onChange={handleChange}
              value={formData.email}
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="border border-white/25 px-3 py-2 w-full"
                onChange={handleChange}
                value={formData.password}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-white"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="flex justify-between">
              <div>
                <input type="checkbox" name="rememberMe" id="" />
                <label htmlFor="rememberMe" className="capitalize ml-2">
                  remember me
                </label>
              </div>
              <p>
                <Link
                  to="/forgot-password"
                  className="capitalize text-[#FB7902] underline"
                >
                  forgot password
                </Link>
              </p>
            </div>

            <button
              type="submit"
              className="bg-white text-black py-3 cursor-pointer hover:bg-white/50 capitalize"
            >
              login
            </button>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="border border-white text-white py-2 hover:bg-white/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </button>

            <p className="text-center">
              Don’t have an account?{" "}
              <Link to="/register" className="text-[#FB7902] underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Login;
