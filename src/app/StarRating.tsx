import { ElementType, FC } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';

interface StarRatingProps {
  rating: number;
  numRatings: number | null;
  maxStars?: number;
}

const StarRating: FC<StarRatingProps> = ({
  rating,
  numRatings,
  maxStars = 5,
}) => {
  const filledStars = Math.round(rating);

  const stars = Array.from({ length: maxStars }, (_, index) => {
    if (index < filledStars) {
      const IconComponent = FaStar as ElementType;
      return <IconComponent key={index} className="star-filled" />;
    } else {
      const IconComponent = FaRegStar as ElementType;
      return <IconComponent key={index} className="star-empty" />;
    }
  });

  return numRatings === null ? (
    <>
      <div className="stars">{stars}</div>
    </>
  ) : (
    <>
      <div className="star-rating">
        <span className="average-rating">{rating.toFixed(1)}</span>
        <div className="stars">{stars}</div>
        <span className="num-ratings">({numRatings} ratings)</span>
      </div>
    </>
  );
};

export default StarRating;
