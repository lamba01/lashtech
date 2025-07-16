import React from "react";
// import logo from "../assets/test-logo.png";

function Topnav() {
  return (
    <menu className="bg-white flex justify-center py-4 sm:py-4 shadow-2xl fixed top-0 right-0 w-screen z-30">
      <Link to="/">
        <h1 className="sm:text-4xl text-2xl font-bold text-center w-full sm:w-1/2 capitalize text-[#2D2D2D]">
          Mcken <span className="text-black">beauty</span> place
        </h1>
      </Link>
    </menu>
  );
}

export default Topnav;
