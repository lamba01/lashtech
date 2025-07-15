import React from "react";
import {
  PiGlobeStandBold,
  PiFlowerLotusDuotone,
  PiPintGlassDuotone,
} from "react-icons/pi";

function Banner() {
  return (
    <section className="bg-[#F3E2D5] w-full py-10 sm:py-14 px-4 sm:px-10">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-8 sm:gap-4">
        {/* 1 */}
        <div className="flex flex-col justify-center items-center gap-2 text-[#1E1E1E] text-center sm:w-1/3 max-w-sm">
          <PiGlobeStandBold className="text-4xl sm:text-5xl text-[#FB7902]" />
          <h2 className="capitalize text-lg sm:text-xl font-semibold text-[#FB7902]">
            professional care
          </h2>
          <p className="text-sm sm:text-base">
            Experience the best in beauty and wellness with our expert services.
          </p>
        </div>

        {/* 2 */}
        <div className="flex flex-col justify-center items-center gap-2 text-[#1E1E1E] text-center sm:w-1/3 max-w-sm">
          <PiPintGlassDuotone className="text-4xl sm:text-5xl text-[#FB7902]" />
          <h2 className="capitalize text-lg sm:text-xl font-semibold text-[#FB7902]">
            relaxing environment
          </h2>
          <p className="text-sm sm:text-base">
            Unwind in our serene space designed for your comfort and
            rejuvenation.
          </p>
        </div>

        {/* 3 */}
        <div className="flex flex-col justify-center items-center gap-2 text-[#1E1E1E] text-center sm:w-1/3 max-w-sm">
          <PiFlowerLotusDuotone className="text-4xl sm:text-5xl text-[#FB7902]" />
          <h2 className="capitalize text-lg sm:text-xl font-semibold text-[#FB7902]">
            luxurious experience
          </h2>
          <p className="text-sm sm:text-base">
            Indulge in our premium treatments that pamper your body and soul.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Banner;
