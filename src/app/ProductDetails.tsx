import { FC } from 'react';
import { Product } from './productSlice';

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: FC<ProductDetailsProps> = ({ product }) => {
  return (
    <div className="product-details">
      <img src={product.image} alt={product.title} className="product-image" />

      <h3 className="product-title">{product.title}</h3>
      <p className="product-subtitle">{product.subtitle}</p>
      <div className="tag-container">
        {product.tags.map((tag, index) => (
          <div className="tag" key={index}>
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
