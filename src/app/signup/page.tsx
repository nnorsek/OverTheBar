"use client";
import React, { useState } from "react";
import ButtonSignUpOptions from "../components/ButtonSignUpOptions";
import { useRouter } from "next/navigation";
import axios from "axios";

const Page = () => {
  const experienceLevels = ["Beginner", "Intermediate", "Advanced"];

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    experienceLevel: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLevelSelect = (level: string) => {
    setFormData((prev) => ({
      ...prev,
      experienceLevel: level,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/signup",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          experienceLevel: formData.experienceLevel,
          progression: 0,
        }
      );
      alert(response.data);
      localStorage.setItem("user", JSON.stringify(formData));
      router.push("/dashboard");
      // Optionally reset the form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        experienceLevel: "",
      });
    } catch (error: any) {
      alert(error.response?.data || "Signup failed");
    }
  };

  console.log(formData);

  return (
    <div className="border flex justify-center bg-gray-300 min-h-screen">
      <div className="border bg-white justify-center my-30 w-200 h-180 shadow-xl rounded-xl">
        <h1 className="text-3xl text-center text-orange-600 pt-10 font-bold">
          Join Now
        </h1>
        <p className="text-lg text-gray-600 text-center py-2">
          Start Your Calisthenics Journey Today.
        </p>

        {/* Social signup buttons */}
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

        <hr className="mt-5 w-150 mx-auto border-gray-300" />
        <p className="text-center text-sm text-gray-500 pt-2">
          or sign up with email
        </p>

        {/* Email Signup Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 pt-4 px-5 text-black"
        >
          <input
            name="name"
            onChange={handleChange}
            value={formData.name}
            type="text"
            placeholder="Full Name"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
          <input
            name="email"
            onChange={handleChange}
            value={formData.email}
            type="email"
            placeholder="you@example.com"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
          <input
            name="password"
            onChange={handleChange}
            value={formData.password}
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
          <input
            name="confirmPassword"
            onChange={handleChange}
            value={formData.confirmPassword}
            type="password"
            placeholder="Confirm Password"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />

          {/* Experience Level Buttons */}
          <div>
            <p className="text-sm text-gray-600 font-semibold mb-2">
              YOUR EXPERIENCE LEVEL
            </p>
            <div className="flex justify-between gap-2">
              {experienceLevels.map((level) => (
                <button
                  type="button"
                  key={level}
                  onClick={() => handleLevelSelect(level)}
                  className={`flex-1 rounded px-4 py-2 hover:bg-gray-100 transition-all border ${
                    formData.experienceLevel === level
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

        {/* Login Redirect */}
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

export default Page;
