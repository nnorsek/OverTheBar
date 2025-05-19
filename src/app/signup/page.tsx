import React from "react";
import ButtonSignUpOptions from "../components/ButtonSignUpOptions";

const page = () => {
  return (
    <div className="border flex justify-center bg-gray-300 min-h-screen">
      <div className="border bg-white justify-center mt-50 w-200 h-100 shadow-xl rounded-xl">
        <h1 className="text-3xl text-center text-orange-600 pt-10 font-bold">
          Join Now
        </h1>
        <p className="texl-lg text-gray-600 text-center py-2">
          Start Your Calisthenics Journey Today.
        </p>
        <ButtonSignUpOptions
          text="Sign Up with Google"
          textColor="text-black"
          logoSrc="/images/google-logo.webp"
          backgroundColor="bg-white"
          hoverBackgroundColor="bg-gray-500"
          signInType="google"
        />
      </div>
    </div>
  );
};

export default page;
