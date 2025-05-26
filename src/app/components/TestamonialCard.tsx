import Image from "next/image";
import React from "react";
import StarRating from "./StarRating";
interface TestamonialCardProps {
  name: string;
  src: string;
  review: string;
  rating: number;
}

const TestamonialCard: React.FC<TestamonialCardProps> = ({
  name,
  src,
  review,
  rating,
}) => {
  return (
    <div className="bg-[#1f1f1f] border border-gray-700 rounded-2xl p-6 w-full max-w-md text-white shadow-lg">
      {/* Name */}
      {/* Image */}
      <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-4">
        <Image src={src} alt={name} fill className="object-cover" priority />
      </div>
      <h1 className="text-xl font-semibold mb-4">{name}</h1>
      {/* Review Text */}
      <StarRating rating={rating} />
      <p className="text-gray-300 text-base leading-relaxed py-2">{review}</p>
    </div>
  );
};

export default TestamonialCard;
