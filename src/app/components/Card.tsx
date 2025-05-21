import Image from "next/image";
import React from "react";

interface CardProps {
  imageSrc: string;
  alt: string;
  title: string;
  description: string;
  buttonText: string;
}

const Card: React.FC<CardProps> = ({
  imageSrc,
  alt,
  title,
  description,
  buttonText,
}) => {
  return (
    <div className="rounded-2xl shadow-xl w-100 bg-white">
      <div className="w-full h-48 relative mb-4 rounded-t-lg overflow-hidden">
        <Image src={imageSrc} alt={alt} layout="fill" objectFit="cover" />
      </div>
      <div className="p-4">
        <h1 className="text-xl font-semibold mb-2 text-black">{title}</h1>
        <p className="text-gray-600">{description}</p>
        <button className="bg-blue-600 text-white px-4 py-2 mt-5 rounded hover:bg-blue-700 transition">
          {buttonText || "Start Workout"}
        </button>
      </div>
    </div>
  );
};

export default Card;
