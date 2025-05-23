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
    <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg w-full flex flex-col hover:bg-[#3d3d3d] transition ease-in-out">
      {/* Image Top */}
      <div className="relative h-90 w-120 mx-auto mt-10 rounded">
        <Image
          src={imageSrc}
          alt={alt}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
        />
      </div>

      {/* Text Bottom */}
      <div className="p-6 text-white flex flex-col flex-grow items-center">
        <h2 className="text-2xl font-bold mb-4 border p-2">{title}</h2>
        <p className="text-gray-300 mb-6 max-w-md text-xl leading-10">
          {description}
        </p>
        <button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 font-medium transition duration-300 shadow-md px-6 py-3 rounded text-white font-semibold w-40 mx-auto">
          {buttonText || "Start Workout"}
        </button>
      </div>
    </div>
  );
};
export default Card;
