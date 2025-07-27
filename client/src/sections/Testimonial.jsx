import React, { useState } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import profile from "../assets/profile.jpg";

// Dummy testimonials
const testimonials = [
  {
    id: 1,
    name: "Adeola Adebuwa",
    message:
      "Absolutely wonderful experience! The staff are so kind and the environment is serene. I’ll definitely return.",
    image: profile,
  },
  {
    id: 2,
    name: "Amaka Obi",
    message:
      "This salon exceeded my expectations! My skin feels amazing. Highly recommended for all beauty needs.",
    image: profile,
  },
  {
    id: 3,
    name: "Zainab Bello",
    message:
      "Professionalism at its peak. From the reception to the treatment, everything was perfect.",
    image: profile,
  },
];

function Testimonial() {
  const [selected, setSelected] = useState(testimonials[0]);

  return (
    <section className=" relative mb-[200px]" data-aos="fade-up">
      <div className="bg-[#F3E2D5] py-14 rounded-b-xl h-[300px]">
        <h2 className="text-2xl sm:text-4xl font-bold text-center mb-2 capitalize">
          testimonial
        </h2>
        <p className="text-center text-gray-700 text-sm sm:text-base mb-6">
          what our clients say about us
        </p>

        <div className="relative bg-white rounded-xl shadow-md flex flex-col md:flex-row items-center justify-center sm:max-w-10/12 max-w-11/12 mx-auto px-6 sm:px-7 py-10 overflow-visible">
          {/* Outside quote icons */}
          <FaQuoteLeft className="absolute -top-6 sm:-left-10 -left-4 text-6xl text-[#E3BC9A] z-0" />
          <FaQuoteRight className="absolute -bottom-6 sm:-right-10 -right-4 text-6xl text-[#E3BC9A] z-0" />

          {/* Client image list */}
          <div className="relative flex md:flex-col gap-4 mb-6 md:mb-0 md:mr-10 items-center">
            {testimonials.map((client, index) => (
              <div
                key={client.id}
                className={`relative transition-transform duration-300 ${
                  index === 0
                    ? "md:translate-x-4"
                    : index === 2
                    ? "md:-translate-x-4"
                    : ""
                }`}
              >
                <img
                  src={client.image}
                  alt={client.name}
                  onClick={() => setSelected(client)}
                  className={`w-16 h-16 object-cover rounded-full cursor-pointer border-2 transition-all duration-200 ${
                    selected.id === client.id
                      ? "border-[#FB7902]"
                      : "border-transparent"
                  }`}
                />

                {/* Arrow pointing to selected image */}
                {selected.id === client.id && (
                  <BsArrowRight className="hidden md:block absolute top-1/2 -right-5 -translate-y-1/2 text-[#FB7902] text-xl" />
                )}
              </div>
            ))}
          </div>

          {/* Testimonial display */}
          <div className="text-center md:text-left max-w-xl space-y-4 relative z-10">
            <p className="italic text-gray-800 text-lg leading-relaxed">
              "{selected.message}"
            </p>
            <p className="text-[#FB7902] font-semibold">{selected.name}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;

