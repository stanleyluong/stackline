import { FC } from 'react';
import { Product } from './productSlice';
import ProductDetails from './ProductDetails';
import ProductSalesGraph from './ProductSalesGraph';
import ProductSalesTable from './ProductSalesTable';

interface PageBodyProps {
  product: Product;
}

const PageBody: FC<PageBodyProps> = ({ product }) => {
  if (!product) {
    return null;
  }

  return (
    <div className="page-body">
      <div className="page-body-details">
        <ProductDetails product={product} />
      </div>
      <div className="page-body-graph-and-table">
        <ProductSalesGraph salesData={product.sales} />
        <ProductSalesTable salesData={product.sales} />
      </div>
    </div>
  );
};

export default PageBody;
