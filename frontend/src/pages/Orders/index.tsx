import { useEffect, useState } from 'react';

import ProductsList from '../../components/ProductsList';
import StepsHeader from '../../components/StepsHeader';

import api from '../../services/api';

import './styles.css';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUri: string;
}

function Orders() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api
      .get('products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="orders-container">
      <StepsHeader />
      <ProductsList products={products} />
    </div>
  );
}

export default Orders;
