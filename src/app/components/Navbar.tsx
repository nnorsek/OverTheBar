"use client";
import React, { useState, useRef } from "react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200); // Delay before closing
  };

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-gray-800 sticky top-0 z-50 text-white font-bold text-xl">
      {/* Logo */}
      <a className="flex items-center" href="/">
        <h1 className="text-4xl">Over</h1>
        <h1 className="text-4xl text-orange-500 ml-1">TheBar</h1>
      </a>

      {/* Nav Items */}
      <div className="flex items-center space-x-10 relative">
        {/* Dropdown wrapper */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button className="hover:text-orange-500">Programs</button>
          <div
            className={`absolute left-0 mt-2 w-80 bg-black text-white shadow-lg z-50 text-[15px] transform transition-all duration-200 ease-out ${
              isDropdownOpen
                ? "opacity-100 translate-y-0 visible"
                : "opacity-0 -translate-y-2 invisible"
            }`}
          >
            <a
              href="#"
              className="block font-thin tracking-wide px-4 py-5 hover:text-orange-500 border-b-[0.5px] border-gray-600 last:border-b-0"
            >
              Beginner Program
            </a>
            <a
              href="#"
              className="block font-thin px-4 py-5 hover:text-orange-500 border-b-[0.5px] border-gray-600 last:border-b-0"
            >
              Intermediate Program
            </a>
            <a
              href="#"
              className="block font-thin px-4 py-5 hover:text-orange-500 border-b-[0.5px] border-gray-600 last:border-b-0"
            >
              Advanced Program
            </a>
            <a
              href="#"
              className="block font-thin px-4 py-5 hover:text-orange-500 border-b-[0.5px] border-gray-600 last:border-b-0"
            >
              Muscle Up Program
            </a>
            <a
              href="#"
              className="block font-thin px-4 py-5 hover:text-orange-500 border-b-[0.5px] border-gray-600 last:border-b-0"
            >
              Handstand Program
            </a>
            <a
              href="#"
              className="block font-thin px-4 py-5 hover:text-orange-500 border-b-[0.5px] border-gray-600 last:border-b-0"
            >
              Weighted Calisthenics Introduction
            </a>
            <a
              href="#"
              className="block font-thin px-4 py-5 hover:text-orange-500 border-b-[0.5px] border-gray-600 last:border-b-0"
            >
              Stretching and Mobility Program
            </a>
          </div>
        </div>

        {/* Other nav links */}
        <a href="/shop" className="hover:text-orange-500">
          Shop
        </a>
        <a href="/blog" className="hover:text-orange-500">
          Blog
        </a>
        <a href="/FAQ" className="hover:text-orange-500">
          FAQ
        </a>
        <a href="/login">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300">
            Log in
          </button>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
