import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Navbar, { SECTION_IDS } from './app/Navbar';
import ProductSalesGraph from './app/ProductSalesGraph';
import ProductSalesTable from './app/ProductSalesTable';
import { Product, setProducts } from './app/productSlice';
import StarRating from './app/StarRating';
import { AppDispatch, RootState } from './app/store';
import productData from './stackline_frontend_assessment_data_2021.json';

// --- Import or define new Sectional Components (will be created next) ---
// Placeholder for ProductSummarySection
const ProductSummarySection: React.FC<{ product: Product; id: string }> = ({
  product,
  id,
}) => (
  <section id={id} className="content-section product-summary-section">
    <h2>Product Summary</h2>
    {/* Content will be moved here from ProductInfo.tsx */}
    <div className="product-summary-layout">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.title}
          className="product-main-image"
        />
      </div>
      <div className="product-text-info">
        <h1>{product.title}</h1>
        <p className="product-subtitle">{product.subtitle}</p>
        {/* StarRating and Tags will go here */}
        <div className="key-value-table">
          <div className="row">
            <span className="key">Retailer:</span>{' '}
            <span className="value">{product.retailer}</span>
          </div>
          <div className="row">
            <span className="key">Brand:</span>{' '}
            <span className="value">{product.brand}</span>
          </div>
          <div className="row">
            <span className="key">ID:</span>{' '}
            <span className="value">{product.id}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Updated SalesDataSection
const SalesDataSection: React.FC<{ product: Product; id: string }> = ({
  product,
  id,
}) => (
  <section id={id} className="content-section sales-data-section">
    <h2>Sales Data</h2>
    <div className="sales-data-layout">
      <div className="sales-chart-container card">
        {product.sales && product.sales.length > 0 ? (
          <ProductSalesGraph salesData={product.sales} />
        ) : (
          <p>No sales data available for graph.</p>
        )}
      </div>
      <div className="sales-table-container card">
        {product.sales && product.sales.length > 0 ? (
          <ProductSalesTable salesData={product.sales} />
        ) : (
          <p>No sales data available for table.</p>
        )}
      </div>
    </div>
  </section>
);

// Placeholder for ProductDetailsSection
const ProductDetailsSection: React.FC<{ product: Product; id: string }> = ({
  product,
  id,
}) => (
  <section id={id} className="content-section product-details-section">
    <h2>Product Details</h2>
    <ul>
      {product.details.map((detail, i) => (
        <li key={i}>{detail}</li>
      ))}
    </ul>
  </section>
);

// Updated ReviewsSection
const ReviewsSection: React.FC<{ product: Product; id: string }> = ({
  product,
  id,
}) => {
  const [expandedReviews, setExpandedReviews] = useState<number[]>([]);

  const toggleExpanded = (index: number) => {
    if (expandedReviews.includes(index)) {
      setExpandedReviews(expandedReviews.filter((item) => item !== index));
    } else {
      setExpandedReviews([...expandedReviews, index]);
    }
  };

  return (
    <section id={id} className="content-section reviews-section">
      <h2>Customer Reviews ({product.reviews.length})</h2>
      {product.reviews.length > 0 ? (
        <ul className="reviews-list">
          {product.reviews.map((review, index) => {
            const isExpanded = expandedReviews.includes(index);
            const displayText = isExpanded
              ? review.review
              : `${review.review.slice(0, 200)}...`;

            return (
              <li key={index} className="review-item">
                <div className="review-header">
                  <span className="review-customer">{review.customer}</span>
                  <div className="review-score">
                    <StarRating rating={review.score} numRatings={null} />
                  </div>
                </div>
                <p className="review-text">{displayText}</p>
                {!isExpanded && review.review.length > 200 && (
                  <button
                    className="read-more-button"
                    onClick={() => toggleExpanded(index)}
                  >
                    Read More
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No reviews yet for this product.</p>
      )}
    </section>
  );
};
// --- End Sectional Component Placeholders ---

function App() {
  const products = useSelector((state: RootState) => state.product.products);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setProducts(productData as Product[]));
  }, [dispatch]);

  const currentProduct = products[0];

  if (!currentProduct) {
    return <div>Loading product data...</div>;
  }

  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <ProductSummarySection
          product={currentProduct}
          id={SECTION_IDS.PRODUCT_SUMMARY}
        />
        <SalesDataSection
          product={currentProduct}
          id={SECTION_IDS.SALES_DATA}
        />
        <ProductDetailsSection
          product={currentProduct}
          id={SECTION_IDS.PRODUCT_DETAILS}
        />
        <ReviewsSection product={currentProduct} id={SECTION_IDS.REVIEWS} />
      </main>
    </div>
  );
}

export default App;
