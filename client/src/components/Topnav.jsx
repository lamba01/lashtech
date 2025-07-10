import React from "react";
import logo from "../assets/test-logo.png";

function Topnav() {
  return (
    <menu className="bg-white flex justify-center py-6 shadow-2xl fixed top-0 right-0 w-screen z-30">
      <img src={logo} alt="Logo" />
    </menu>
  );
}

export default Topnav;
