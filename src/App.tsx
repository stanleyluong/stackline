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

// MUI Imports for sections
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'; // Example icon
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

// --- Import or define new Sectional Components (will be created next) ---
// Placeholder for ProductSummarySection
const ProductSummarySection: React.FC<{ product: Product; id: string }> = ({
  product,
  id,
}) => {
  // Calculate average rating and number of reviews
  const numReviews = product.reviews.length;
  const averageRating =
    numReviews > 0
      ? product.reviews.reduce((acc, review) => acc + review.score, 0) /
        numReviews
      : 0;

  return (
    <Paper
      id={id}
      elevation={3}
      sx={{ p: { xs: 2, sm: 3 }, mb: 2 }}
      className="product-summary-section"
    >
      <div className="product-summary-layout">
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.title}
            className="product-main-image"
          />
        </div>
        <div className="product-text-info">
          <Typography variant="h4" component="h1" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" paragraph>
            {product.subtitle}
          </Typography>

          {numReviews > 0 && (
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <StarRating rating={averageRating} numRatings={numReviews} />
            </Box>
          )}

          {product.tags && product.tags.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
              {product.tags.map((tag, index) => (
                <Chip key={index} label={tag} size="small" />
              ))}
            </Box>
          )}

          <Grid container spacing={1} sx={{ mt: 1 }}>
            <Grid item xs={4} sm={3}>
              <Typography variant="body2" fontWeight="bold">
                Retailer:
              </Typography>
            </Grid>
            <Grid item xs={8} sm={9}>
              <Typography variant="body2">{product.retailer}</Typography>
            </Grid>
            <Grid item xs={4} sm={3}>
              <Typography variant="body2" fontWeight="bold">
                Brand:
              </Typography>
            </Grid>
            <Grid item xs={8} sm={9}>
              <Typography variant="body2">{product.brand}</Typography>
            </Grid>
            <Grid item xs={4} sm={3}>
              <Typography variant="body2" fontWeight="bold">
                ID:
              </Typography>
            </Grid>
            <Grid item xs={8} sm={9}>
              <Typography variant="body2">{product.id}</Typography>
            </Grid>
          </Grid>
        </div>
      </div>
    </Paper>
  );
};

// Updated SalesDataSection
const SalesDataSection: React.FC<{ product: Product; id: string }> = ({
  product,
  id,
}) => (
  <Paper
    id={id}
    elevation={3}
    sx={{ p: { xs: 2, sm: 3 }, mb: 2 }}
    className="sales-data-section"
  >
    <h2>Sales Data</h2>
    <div className="sales-data-layout">
      <div className="sales-table-container card">
        {product.sales && product.sales.length > 0 ? (
          <ProductSalesTable salesData={product.sales} />
        ) : (
          <p>No sales data available for table.</p>
        )}
      </div>
      <div className="sales-chart-container card">
        {product.sales && product.sales.length > 0 ? (
          <ProductSalesGraph salesData={product.sales} />
        ) : (
          <p>No sales data available for graph.</p>
        )}
      </div>
    </div>
  </Paper>
);

// Placeholder for ProductDetailsSection
const ProductDetailsSection: React.FC<{ product: Product; id: string }> = ({
  product,
  id,
}) => (
  <Paper
    id={id}
    elevation={3}
    sx={{ p: { xs: 2, sm: 3 }, mb: 2 }}
    className="product-details-section"
  >
    <h2>Product Details</h2>
    <List>
      {product.details.map((detail, i) => (
        <ListItem key={i} disablePadding>
          <ListItemIcon sx={{ minWidth: '30px' }}>
            <FiberManualRecordIcon sx={{ fontSize: '0.7rem' }} />
          </ListItemIcon>
          <ListItemText primary={detail} />
        </ListItem>
      ))}
    </List>
  </Paper>
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
    <Paper
      id={id}
      elevation={3}
      sx={{ p: { xs: 2, sm: 3 }, mb: 2 }}
      className="reviews-section"
    >
      <h2>Customer Reviews ({product.reviews.length})</h2>
      {product.reviews.length > 0 ? (
        <ul className="reviews-list">
          {product.reviews.map((review, index) => {
            const isExpanded = expandedReviews.includes(index);
            const displayText = isExpanded
              ? review.review
              : `${review.review.slice(0, 200)}...`;

            return (
              <Paper
                component="li"
                key={index}
                className="review-item"
                elevation={2}
                sx={{ mb: 2, p: 2 }}
              >
                <div className="review-header">
                  <Typography
                    variant="subtitle2"
                    component="span"
                    className="review-customer"
                  >
                    {review.customer}
                  </Typography>
                  <div className="review-score">
                    <StarRating rating={review.score} numRatings={null} />
                  </div>
                </div>
                <Typography variant="body2" className="review-text" paragraph>
                  {displayText}
                </Typography>
                {!isExpanded && review.review.length > 200 && (
                  <Button
                    variant="text"
                    size="small"
                    className="read-more-button"
                    onClick={() => toggleExpanded(index)}
                  >
                    Read More
                  </Button>
                )}
              </Paper>
            );
          })}
        </ul>
      ) : (
        <Typography>No reviews yet for this product.</Typography>
      )}
    </Paper>
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
