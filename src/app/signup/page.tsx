"use client";
import React, { useState } from "react";
import ButtonSignUpOptions from "../components/ButtonSignUpOptions";

const page = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>("");

  const experienceLevels = ["Beginner", "Intermediate", "Advanced"];
  return (
    <div className="border flex justify-center bg-gray-300 min-h-screen">
      <div className="border bg-white justify-center my-30 w-200 h-180 shadow-xl rounded-xl">
        <h1 className="text-3xl text-center text-orange-600 pt-10 font-bold">
          Join Now
        </h1>
        <p className="texl-lg text-gray-600 text-center py-2">
          Start Your Calisthenics Journey Today.
        </p>
        <div className="grid grid-cols-2 justify-self-center gap-x-2 pt-5">
          <ButtonSignUpOptions
            text="Continue with Google"
            textColor="text-black"
            logoSrc="/images/google-logo.webp"
            backgroundColor="bg-white"
            hoverBackgroundColor="hover:bg-gray-200"
            signInType="google"
          />
          <ButtonSignUpOptions
            text="Continue with FaceBook"
            textColor="text-white"
            logoSrc="/images/facebook-logo.png"
            backgroundColor="bg-blue-600"
            hoverBackgroundColor="hover:bg-blue-800"
            signInType="google"
          />
        </div>
        <hr className="mt-5 w-150 mx-auto border-gray-300"></hr>
        <p className="justify-self-center text-sm text-gray-500 pt-2">
          or sign up with email
        </p>
        <form className="flex flex-col gap-4 pt-4 px-5 text-black">
          <input
            type="text"
            placeholder="Full Name"
            className="border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="email"
            placeholder="you@exmaple.com"
            className="border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="border border-gray-300 rounded px-4 py-2"
          />

          {/* Experience Level */}
          <div>
            <p className="text-sm text-gray-600 font-semibold mb-2">
              YOUR EXPERIENCE LEVEL
            </p>
            <div className="flex justify-between gap-2">
              {experienceLevels.map((level) => (
                <button
                  type="button"
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`flex-1 rounded px-4 py-2 hover:bg-gray-100 transition-all border ${
                    selectedLevel === level
                      ? "border-orange-500"
                      : "border-gray-300"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 font-semibold"
          >
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-orange-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default page;
