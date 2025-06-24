"use client";
import React, { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import ProfileModal from "./ProfileModal";
import router from "next/router";

const Navbar = () => {
  const { user, setUser } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleMouseEnter = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

  const handleLogout = () => {
    setUser(null);
    router.push("/");
    // Optional: also call backend logout API or clear cookies here if needed
  };

  console.log(user);
  return (
    <div className="flex justify-between items-center px-8 py-4 bg-gray-800 sticky top-0 z-50 text-white font-bold text-xl">
      {/* Logo */}
      <a className="flex items-center" href="/">
        <h1 className="text-4xl font-serif">Over</h1>
        <h1 className="text-4xl text-orange-500 ml-1">TheBar</h1>
      </a>

      {/* Nav Items */}
      <div className="flex items-center space-x-8 relative">
        {/* Programs dropdown */}
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
              href={user ? "/programs/beginner" : "/login"}
              className="block font-thin tracking-wide px-4 py-5 hover:text-orange-500 border-b-[0.5px] border-gray-600 last:border-b-0"
            >
              Beginner Program
            </a>
            <a
              href={user ? "/programs/intermediate" : "/login"}
              className="block font-thin px-4 py-5 hover:text-orange-500 border-b-[0.5px] border-gray-600 last:border-b-0"
            >
              Intermediate Program
            </a>
            <a
              href={user ? "/programs/advanced" : "/login"}
              className="block font-thin px-4 py-5 hover:text-orange-500 border-b-[0.5px] border-gray-600 last:border-b-0"
            >
              Advanced Program
            </a>
            <a
              href={user ? "/programs/muscle-up" : "/login"}
              className="block font-thin px-4 py-5 hover:text-orange-500 border-b-[0.5px] border-gray-600 last:border-b-0"
            >
              Muscle Up Program
            </a>
            <a
              href={user ? "/programs/handstand" : "/login"}
              className="block font-thin px-4 py-5 hover:text-orange-500 border-b-[0.5px] border-gray-600 last:border-b-0"
            >
              Handstand Program
            </a>
            <a
              href={user ? "/programs/weighted-calisthenics" : "/login"}
              className="block font-thin px-4 py-5 hover:text-orange-500 border-b-[0.5px] border-gray-600 last:border-b-0"
            >
              Weighted Calisthenics Introduction
            </a>
            <a
              href={user ? "/programs/stretching-and-mobility" : "/login"}
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

        {/* Conditionally render Log in button or user profile circle */}
        {!user ? (
          <a href="/login">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300">
              Log in
            </button>
          </a>
        ) : (
          <div className="flex items-center space-x-5">
            <div
              title={user.email}
              onClick={() => setIsProfileOpen(true)}
              className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center text-lg font-bold cursor-pointer select-none hover:cursor-pointer"
            >
              {user.name
                ? user.name
                    .split(" ")
                    .filter((word) => word.length > 0)
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()
                : "?"}
            </div>
            <a href="/">
              <button
                onClick={handleLogout}
                className="text-base underline hover:text-orange-500"
              >
                Logout
              </button>
            </a>
          </div>
        )}
      </div>
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onLogout={() => {
          setIsProfileOpen(false);
          handleLogout();
        }}
      />
    </div>
  );
};

export default Navbar;
