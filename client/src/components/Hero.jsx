import React from "react";
import heroimg from "../assets/hero.png";

function Hero() {
  return (
    <section className="w-full h-[100vh] mt-14 flex flex-col sm:gap-2 gap-10">
      <div className="flex flex-col justify-center items-center text-center text-md">
        <p className="capitalize mt-7">
          where tranquility meets tranformation.
        </p>
        <h1 className="text-4xl w-full sm:w-1/2 font-bold ">
          We show your{" "}
          <span className="text-[#FB7902] font-bold">skin, hair</span>, and{" "}
          <span className="font-bold text-[#FB7902]">body</span> the care and
          attention they deserve.
        </h1>
        <button className="bg-black text-white py-2 px-10 mt-5 capitalize cursor-pointer hover:bg-[#FB7902] transition-all duration-300">
          book now
        </button>
      </div>
      <div className=" flex justify-center items-center w-full h-[45%] sm:h-[60%]">
        <img src={heroimg} alt="" className="h-full w-[100%] object-cover" />
      </div>
    </section>
  );
}

export default Hero;
