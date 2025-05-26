import Image from "next/image";
import React from "react";
import useInViewAnimation from "../hooks/useInViewAnimation";

type Level = "Easy" | "Intermediate" | "Advanced" | "Expert";

const levelColor = (level: Level): string => {
  const colors: Record<Level, string> = {
    Easy: "bg-green-500",
    Intermediate: "bg-yellow-400",
    Advanced: "bg-blue-600",
    Expert: "bg-red-700",
  };

  return colors[level];
};

interface CardProps {
  imageSrc: string;
  alt: string;
  title: string;
  description: string;
  buttonText: string;
  index: number;
  level: Level;
}

const Card: React.FC<CardProps> = ({
  imageSrc,
  alt,
  title,
  description,
  index,
  level,
}) => {
  const staggerDelay = index * 150; // 150ms between cards
  const { ref, isVisible } = useInViewAnimation(staggerDelay);

  console.log(levelColor);
  return (
    <div
      ref={ref}
      className={`group bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg w-full flex flex-col transition-all duration-700 ease-out hover:cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      } hover:bg-[#3d3d3d]`}
    >
      {/* Image */}
      <div className="relative w-4/5 max-w-md mx-auto aspect-[4/3] sm:aspect-[3/2] md:aspect-[5/3] xl:aspect-[16/9] mt-10 overflow-hidden rounded-2xl">
        <div className="w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105">
          <Image
            src={imageSrc}
            alt={alt}
            fill
            className="object-cover rounded-2xl"
            priority
          />
        </div>
      </div>

      {/* Text */}
      <div className="p-6 text-white flex flex-col flex-grow items-center">
        <div
          className={`rounded px-10 py-1 ${levelColor(
            level
          )} text-gray-800 border font-secondaryfont`}
        >
          {level}
        </div>
        <h2 className="text-2xl font-bold mb-4 pt-5 p-2">{title}</h2>
        <p className="text-gray-300 mb-6 max-w-md text-xl leading-10">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
