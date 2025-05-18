import React from "react";

const Navbar = () => {
  return (
    <div className="flex p-10 bg-gray-800 items-center sticky top-0 z-50">
      <a className="flex mr-100" href="/">
        <h1 className="text-5xl font-bold">Over</h1>
        <h1 className=" text-5xl text-orange-500 font-bold">TheBar</h1>
      </a>
      <div className="space-x-7 font-bold text-2xl">
        <a href="/" className="hover:text-orange-500">
          Home
        </a>
        <a href="/workouts" className="hover:text-orange-500">
          Workouts
        </a>
        <a href="/progressions" className="hover:text-orange-500">
          Progressions
        </a>
        <a href="/about" className="hover:text-orange-500">
          About
        </a>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300">
          Join Now
        </button>
      </div>
    </div>
  );
};

export default Navbar;
