// components/StarRating.tsx
import { Star, StarHalf, Star as StarOutline } from "lucide-react";
import React from "react";

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const totalStars = 5;

  return (
    <div className="flex items-center gap-1 text-yellow-400">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={i} fill="currentColor" stroke="currentColor" size={20} />
      ))}
      {hasHalfStar && (
        <StarHalf fill="currentColor" stroke="currentColor" size={20} />
      )}
      {Array.from({
        length: totalStars - fullStars - (hasHalfStar ? 1 : 0),
      }).map((_, i) => (
        <StarOutline
          key={`empty-${i}`}
          fill="none"
          stroke="currentColor"
          size={20}
          className="opacity-40"
        />
      ))}
    </div>
  );
};

export default StarRating;
