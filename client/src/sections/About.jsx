import React from "react";
import { Link } from "react-router-dom";
// import lashes from "../assets/lashes.jpg";
import lashes from "../assets/lash.jpg";
import brows from "../assets/brow.jpg";
import pedicure from "../assets/pedicure.jpg";
import facials from "../assets/facials.jpg";

function About() {
  return (
    <section>
      <div className="flex flex-col justify-between items-center py-2 mb-8">
        <h2 className="sm:text-4xl text-2xl w-11/12 sm:w-1/2 text-center mx-auto font-bold  mt-14">
          Enhance your inner radiance at our{" "}
          <span className="text-[#FB7902]">beauty sanctuary</span> and let your
          true beauty shine.
        </h2>
        <button className="bg-black text-white py-2 px-10 mt-5 sm:mt-5 h-fit capitalize cursor-pointer hover:bg-gray-800 transition-all duration-300">
          <Link to="/bookings">view my bookings</Link>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {/* Lashes */}
        <div className="flex flex-col items-center" data-aos="fade-up">
          <img
            src={lashes}
            alt="Lashes"
            className="sm:w-full w-11/12 h-48 object-cover rounded-lg shadow-md"
          />
          <span className="mt-2 text-lg font-semibold">Lashes Extension</span>
        </div>
        {/* brows */}
        <div className="flex flex-col items-center" data-aos="fade-up">
          <img
            src={brows}
            alt="Brow Treatment"
            className="sm:w-full w-11/12 h-48 object-cover rounded-lg shadow-md"
          />
          <span className="mt-2 text-lg font-semibold">Brows Treatment</span>
        </div>
        {/* Pedicure */}
        <div className="flex flex-col items-center" data-aos="fade-up">
          <img
            src={pedicure}
            alt="Pedicure"
            className="sm:w-full w-11/12 h-48 object-cover rounded-lg shadow-md"
          />
          <span className="mt-2 text-lg font-semibold">Pedicure</span>
        </div>
        {/* Facials */}
        <div className="flex flex-col items-center" data-aos="fade-up">
          <img
            src={facials}
            alt="Facials"
            className="sm:w-full w-11/12 h-48 object-cover rounded-lg shadow-md"
          />
          <span className="mt-2 text-lg font-semibold">Facial Treatment</span>
        </div>
      </div>
    </section>
  );
}

export default About;
