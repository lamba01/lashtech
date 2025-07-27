import React from "react";
import ownerImg from "../assets/mcken.jpg";

function Services() {
  return (
    <section className="my-14 px-4 sm:px-10">
      <h2 className="sm:text-4xl text-2xl w-11/12 md:w-1/2 text-center mx-auto font-bold mb-2 capitalize">
        our experienced specialist
      </h2>
      <p className="text-center text-sm sm:text-base text-gray-600 mb-10 max-w-4xl mx-auto">
        Our team of experienced specialists is dedicated to providing you with
        the highest level of care and attention. With years of training and
        expertise, we are here to help you achieve your beauty and wellness
        goals.
      </p>

      <div className="flex flex-col-reverse md:flex-row items-center gap-10 max-w-5xl mx-auto">
        <div className="md:w-1/2" data-aos="flip-left">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-3 text-[#E3BC9A]">
            Meet Our Founder – Anita James
          </h3>
          <p className="text-sm sm:text-base text-gray-700 mb-4">
            Anita James is the passionate soul behind our salon. With over a
            decade of hands-on experience in the beauty and wellness industry,
            she’s on a mission to help every client feel radiant, confident, and
            cared for.
          </p>
          <p className="text-sm sm:text-base text-gray-700 mb-4">
            Her journey began with a vision to create a relaxing, professional
            space where luxury meets affordability. Anita believes in
            personalized service, continuous learning, and using the
            highest-quality products to give each client the glow they deserve.
          </p>
          <p className="text-sm sm:text-base text-gray-700">
            Whether it’s skincare, haircare, or self-care — you're in good hands
            with someone who truly cares.
          </p>
        </div>

        <div className="md:w-1/2 w-full" data-aos="flip-right">
          <img
            src={ownerImg}
            alt="Anita James - Founder"
            className="rounded-xl shadow-md w-full sm:max-h-[450px] max-h-[400px] object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}

export default Services;
