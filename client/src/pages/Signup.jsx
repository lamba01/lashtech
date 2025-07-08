import React, { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import bg from "../assets/registerimg.png";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
   const [showPassword, setShowPassword] = useState(false);

   const handleChange = (e) => {
     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };

   const handleSubmit = async (e) => {
     e.preventDefault();
     setError("");
     const passwordRegex =
       /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

     if (!passwordRegex.test(formData.password)) {
       setError(
         "Password must be at least 8 characters long and include at least one number and one special character."
       );
       return;
     }

     try {
       await createUserWithEmailAndPassword(
         auth,
         formData.email,
         formData.password
       );
       navigate("/");
     } catch (err) {
       console.error(err);
       setError(err.message);
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
           <h2 className="capitalize text-4xl">register</h2>
           <p className="text-[#F4F6FC] py-5">
             Welcome to "to change later" beauty salon, we hope your stay with
             us us as bright as the morning sun
           </p>

           {error && <p className="text-red-500 mb-4">{error}</p>}

           <form onSubmit={handleSubmit} className="flex flex-col gap-5">
             <input
               type="text"
               name="name"
               placeholder="Your Name"
               className="border border-white/25 px-3 py-2"
               onChange={handleChange}
               value={formData.name}
               required
             />
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
             <button
               type="submit"
               className="bg-white text-black capitalize py-3 cursor-pointer hover:bg-white/50"
             >
               register
             </button>
             <p className="text-center">
               Already have an account?{" "}
               <Link to={`/login`} className="text-[#FB7902] underline">
                 Login
               </Link>
             </p>
           </form>
         </div>
       </div>
     </main>
   );
}

export default Signup;
