import React from "react";
import heroimg from "../assets/hero.png";

function Hero() {
  return (
    <section className="w-full h-screen pt-14 md:pt-12 flex flex-col sm:gap-2 gap-10 overflow-hidden">
      <div className="flex flex-col justify-center items-center text-center text-md h-[25%] sm:h-[40%] px-4 sm:px-0">
        <p className="capitalize mt-7 font-semibold text-sm sm:text-lg text-[#9d7450]">
          where tranquility meets tranformation.
        </p>
        <h1 className="sm:text-4xl text-2xl w-full sm:w-1/2 font-bold">
          We show your <span className="text-black font-bold">skin, hair</span>,
          and <span className="font-bold text-black">body</span> the care and
          attention they deserve.
        </h1>
        <button
          onClick={() =>
            document
              .getElementById("booking")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="bg-black text-white py-2 px-10 mt-5 sm:mt-5 capitalize cursor-pointer hover:bg-[#BFA2DB] transition-all duration-300"
        >
          book now
        </button>
      </div>
      <div className=" flex justify-center items-center w-full h-[70%] sm:h-[60%]">
        <img src={heroimg} alt="" className="h-full w-[100%] object-cover " />
      </div>
    </section>
  );
}

export default Hero;
