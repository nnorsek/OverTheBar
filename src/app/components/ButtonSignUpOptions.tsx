"use client";

import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface ButtonSignUpOptionsProps {
  backgroundColor: string;
  hoverBackgroundColor: string;
  signInType: string;
  textColor: string;
  text: string;
  logoSrc: string;
}

const ButtonSignUpOptions: React.FC<ButtonSignUpOptionsProps> = ({
  backgroundColor,
  signInType,
  text,
  textColor,
  hoverBackgroundColor,
  logoSrc,
}) => {
  return (
    <button
      onClick={() => signIn(signInType)}
      className={`flex font-bold gap-2 px-6 py-2 text-sm ${backgroundColor} ${textColor} border rounded-lg ${hoverBackgroundColor} hover:cursor-pointer`}
    >
      <Image
        src={logoSrc}
        alt={`${signInType} logo`}
        width={26}
        height={26}
        className="rounded-full"
      />
      <span className="my-auto">{text}</span>
    </button>
  );
};

export default ButtonSignUpOptions;
