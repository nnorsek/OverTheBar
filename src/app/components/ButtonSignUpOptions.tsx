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
      className={`flex items-center gap-2 px-6 py-2 ${backgroundColor} ${textColor} border rounded-lg hover:${hoverBackgroundColor} hover:cursor-pointer`}
    >
      <Image src={logoSrc} alt={`${signInType} logo`} width={24} height={24} />
      <span>{text}</span>
    </button>
  );
};

export default ButtonSignUpOptions;
