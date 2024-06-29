import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import PageBody from './app/PageBody';
import PageHeader from './app/PageHeader';
import { AppDispatch, RootState } from './app/store';
import { Product, setProducts } from './app/productSlice';
import productData from './stackline_frontend_assessment_data_2021.json'

function App() {
  const products = useSelector((state: RootState) => state.product.products);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setProducts(productData));
  }, [dispatch]);

  const product: Product = products[0];

  return (
    <div className="App">
      <PageHeader />
      <PageBody product={product} />
    </div>
  );
}

export default App;
