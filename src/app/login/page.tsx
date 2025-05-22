"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ButtonSignUpOptions from "../components/ButtonSignUpOptions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const router = useRouter();
  const { setUser } = useAuth();

  const [viewPassword, setViewPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const togglePassword = () => setViewPassword((prev) => !prev);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser({
          name: data.name,
          email: data.email,
          progression: data.progression,
        });
        localStorage.setItem("user", JSON.stringify(data));
        router.push("/");
      } else {
        setErrorMsg(data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg("Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-300 min-h-screen px-4">
      <div className="bg-white w-full max-w-md shadow-xl rounded-3xl p-6 sm:p-8">
        <h1 className="text-center text-3xl text-black">Log in</h1>
        <p className="text-gray-600 text-sm text-center pt-2">
          Don't have an account?{" "}
          <a className="underline" href="/signup">
            Sign up
          </a>
        </p>

        <div className="flex flex-col gap-4 pt-6">
          <ButtonSignUpOptions
            text="Continue with Google"
            textColor="text-black"
            logoSrc="/images/google-logo.webp"
            backgroundColor="bg-white"
            hoverBackgroundColor="hover:bg-gray-200"
            signInType="google"
          />
          <ButtonSignUpOptions
            text="Continue with Facebook"
            textColor="text-white"
            logoSrc="/images/facebook-logo.png"
            backgroundColor="bg-blue-600"
            hoverBackgroundColor="hover:bg-blue-800"
            signInType="facebook"
          />
        </div>

        <div className="w-full flex justify-center my-6">
          <div className="flex items-center w-full gap-4 px-2">
            <hr className="flex-grow border-t-2 border-gray-300" />
            <span className="text-gray-400 text-sm">OR</span>
            <hr className="flex-grow border-t-2 border-gray-300" />
          </div>
        </div>

        <form className="flex flex-col gap-4 text-black" onSubmit={handleLogin}>
          <label className="text-sm text-gray-500">Your email</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-500">Your password</label>
            <p
              className="text-gray-500 text-xs flex items-center hover:cursor-pointer"
              onClick={togglePassword}
            >
              <FontAwesomeIcon
                icon={viewPassword ? faEyeSlash : faEye}
                className="mr-1"
                width={15}
                height={15}
              />
              {viewPassword ? "Hide" : "Show"}
            </p>
          </div>
          <input
            type={viewPassword ? "text" : "password"}
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <a
            className="underline text-sm text-gray-600 text-right"
            href="/forgotpassword"
          >
            Forgot your password?
          </a>

          {errorMsg && (
            <p className="text-red-500 text-sm text-center">{errorMsg}</p>
          )}

          <button
            type="submit"
            className="py-3 px-5 text-white bg-orange-500 rounded-full hover:bg-orange-600 transition w-full"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
