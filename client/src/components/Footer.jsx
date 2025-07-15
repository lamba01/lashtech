import React from "react";
import {
  FaTiktok,
  FaInstagram,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaSnapchat } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6 sm:px-16 mt-[200px]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-2 capitalize">
            Mcken <span className="text-[#FB7902]">beauty</span> place
          </h2>
          <p className="text-gray-300 text-sm mb-4">
            Where tranquility meets transformation. Pampering your skin, hair,
            and soul — the way it should be.
          </p>
          <div className="flex gap-5 text-white text-lg">
            <a
              href="https://www.snapchat.com/add/lashnbrowsby.mb"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Snapchat"
              className="hover:text-[#FB7902]"
            >
              <FaSnapchat className="text-2xl" />
            </a>
            <a
              href="https://www.instagram.com/lashes.brows.beautyy"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Instagram"
              className="hover:text-[#FB7902]"
            >
              <FaInstagram className="text-2xl" />
            </a>
            <a
              href="https://www.tiktok.com/@lashes.Brows.Beautyy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="hover:text-[#FB7902]"
            >
              <FaTiktok className="text-2xl" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Working Hours</h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>Mon - Fri: 8:00am - 6:00pm</li>
            <li>Saturday: 9:00am - 4:00pm</li>
            <li>Sunday: Closed</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1" />
              93, St Finbarrs College road, Beside Fidelity bank, Akoka, Lagos
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt /> +234 818 369 8673
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom text */}
      <p className="text-center text-gray-500 text-sm mt-10 capitalize">
        &copy; {new Date().getFullYear()} Mcken beauty place. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
