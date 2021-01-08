import { useEffect, useState } from 'react';

import OrderLocation from '../../components/OrderLocation';
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

export interface OrderLocationData {
  latitude: number;
  longitude: number;
  address: string;
}

function Orders() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orderLocation, setOrderLocation] = useState<OrderLocationData>();

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
      <OrderLocation
        onChangeLocation={(location) => setOrderLocation(location)}
      />
    </div>
  );
}

export default Orders;
