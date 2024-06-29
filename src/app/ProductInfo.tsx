import { FC, useState } from 'react';
import { Product, Review } from './productSlice';
import ImageZoom from './ImageZoom';
import StarRating from './StarRating';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: FC<ProductInfoProps> = ({ product }) => {
  const { reviews } = product;
  const averageRating =
    reviews.reduce((acc, review) => acc + review.score, 0) / reviews.length;
  const [expandedReviews, setExpandedReviews] = useState<number[]>([]);

  const toggleExpanded = (index: number) => {
    if (expandedReviews.includes(index)) {
      setExpandedReviews(expandedReviews.filter((item) => item !== index));
    } else {
      setExpandedReviews([...expandedReviews, index]);
    }
  };

  const renderReview = (review: Review, index: number) => {
    const isExpanded = expandedReviews.includes(index);
    const displayText = isExpanded
      ? review.review
      : `${review.review.slice(0, 200)}...`;

    return (
      <li key={index}>
        <div className="customer-and-score">
          <strong>{review.customer}</strong>
          <div>
            <StarRating rating={review.score} numRatings={null} />
          </div>
        </div>
        <div className="review-text">{displayText}</div>
        {!isExpanded && (
          <button
            className="read-more-button"
            onClick={() => toggleExpanded(index)}
          >
            Read More
          </button>
        )}
      </li>
    );
  };

  return (
    <div className="product-info">
      <ImageZoom src={product.image} alt={product.title} />
      <h3 className="product-title">{product.title}</h3>
      <p className="product-subtitle">{product.subtitle}</p>
      <StarRating rating={averageRating} numRatings={reviews.length} />

      <div className="product-info-table">
        <div className="table-row">
          <div className="table-label">Retailer:</div>
          <div className="table-value">{product.retailer}</div>
        </div>
        <div className="table-row">
          <div className="table-label">Brand:</div>
          <div className="table-value">{product.brand}</div>
        </div>
        <div className="table-row">
          <div className="table-label">ID:</div>
          <div className="table-value">{product.id}</div>
        </div>
      </div>

      <div className="tag-container">
        {product.tags.map((tag, index) => (
          <div className="tag" key={index}>
            {tag}
          </div>
        ))}
      </div>

      <div className="product-details-section">
        <h4>Product Details</h4>
        <ul className="product-details-list">
          {product.details.map((detail, index) => (
            <li className="detail" key={index}>
              {detail}
            </li>
          ))}
        </ul>
      </div>

      <div className="reviews-section">
        <h4>Reviews</h4>
        <ul className="reviews-list">
          {reviews.map((review, index) => renderReview(review, index))}
        </ul>
      </div>
    </div>
  );
};

export default ProductInfo;
