import Image from "next/image";
import Link from "next/link";
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
  slug: string;
  imageSrc: string;
  alt: string;
  title: string;
  description: string;
  buttonText: string;
  index: number;
  level: Level;
}

const Card: React.FC<CardProps> = ({
  slug,
  imageSrc,
  alt,
  title,
  description,
  index,
  level,
}) => {
  const staggerDelay = index * 150;
  const { ref, isVisible } = useInViewAnimation(staggerDelay);

  return (
    <Link href={`/programs/${slug}`} className="block h-full">
      <div
        ref={ref}
        className={`group bg-[#1a1a1a] rounded-2xl shadow-lg w-full h-full flex flex-col transition-all duration-700 ease-out hover:cursor-pointer ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        } hover:bg-[#3d3d3d]`}
      >
        {/* Image */}
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-2xl">
          <Image
            src={imageSrc}
            alt={alt}
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            priority
          />
        </div>

        {/* Text */}
        <div className="flex flex-col flex-grow p-6 text-white">
          <div className="flex flex-col items-center">
            <div
              className={`rounded px-4 py-1 ${levelColor(
                level
              )} text-gray-800 text-sm font-semibold mb-3`}
            >
              {level}
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">{title}</h2>
          </div>

          <p className="text-gray-300 text-center text-base leading-relaxed mt-2 line-clamp-4">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
