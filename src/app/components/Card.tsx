import Image from "next/image";
import React from "react";
import useInViewAnimation from "../hooks/useInViewAnimation";

interface CardProps {
  imageSrc: string;
  alt: string;
  title: string;
  description: string;
  buttonText: string;
  index: number;
}

const Card: React.FC<CardProps> = ({
  imageSrc,
  alt,
  title,
  description,
  buttonText,
  index,
}) => {
  const staggerDelay = index * 150; // 150ms between cards
  const { ref, isVisible } = useInViewAnimation(staggerDelay);

  return (
    <div
      ref={ref}
      className={`bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg w-full flex flex-col transition-all duration-700 ease-out
      ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      } hover:bg-[#3d3d3d]`}
    >
      {/* Image */}
      <div className="relative w-4/5 max-w-md mx-auto aspect-[4/3] sm:aspect-[3/2] md:aspect-[5/3] xl:aspect-[16/9] mt-10">
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className="rounded-2xl object-cover"
          priority
        />
      </div>

      {/* Text */}
      <div className="p-6 text-white flex flex-col flex-grow items-center">
        <h2 className="text-2xl font-bold mb-4 p-2">{title}</h2>
        <p className="text-gray-300 mb-6 max-w-md text-xl leading-10">
          {description}
        </p>
        <button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transition duration-300 shadow-md px-6 py-3 rounded text-white font-semibold w-40 mx-auto">
          {buttonText || "Start Workout"}
        </button>
      </div>
    </div>
  );
};

export default Card;
