import React from "react";
import lashes from "../assets/lashes.jpg";
import manicure from "../assets/manicure.jpg";
import pedicure from "../assets/pedicure.jpg";
import facials from "../assets/facials.jpg";

function About() {
  return (
    <section>
      <h2 className="sm:text-4xl text-2xl w-11/12 md:w-1/2 text-center mx-auto font-bold mb-8 mt-14">
        Enhance your inner radiance at our{" "}
        <span className="text-[#FB7902]">beauty sanctuary</span> and let your
        true beauty shine.
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {/* Lashes */}
        <div className="flex flex-col items-center">
          <img
            src={lashes}
            alt="Lashes"
            className="sm:w-full w-11/12 h-48 object-cover rounded-lg shadow-md"
          />
          <span className="mt-2 text-lg font-semibold">Lashes</span>
        </div>
        {/* Manicure */}
        <div className="flex flex-col items-center">
          <img
            src={manicure}
            alt="Manicure"
            className="sm:w-full w-11/12 h-48 object-cover rounded-lg shadow-md"
          />
          <span className="mt-2 text-lg font-semibold">Manicure</span>
        </div>
        {/* Pedicure */}
        <div className="flex flex-col items-center">
          <img
            src={pedicure}
            alt="Pedicure"
            className="sm:w-full w-11/12 h-48 object-cover rounded-lg shadow-md"
          />
          <span className="mt-2 text-lg font-semibold">Pedicure</span>
        </div>
        {/* Facials */}
        <div className="flex flex-col items-center">
          <img
            src={facials}
            alt="Facials"
            className="sm:w-full w-11/12 h-48 object-cover rounded-lg shadow-md"
          />
          <span className="mt-2 text-lg font-semibold">Facials</span>
        </div>
      </div>
    </section>
  );
}

export default About;
