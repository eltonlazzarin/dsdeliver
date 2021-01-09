import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import OrderLocation from '../../components/OrderLocation';
import OrderSummary from '../../components/OrderSummary';
import ProductsList from '../../components/ProductsList';
import StepsHeader from '../../components/StepsHeader';
import Footer from '../../components/Footer';

import { checkIsSelected } from '../../utils/checkIsSelected';

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
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [orderLocation, setOrderLocation] = useState<OrderLocationData>();
  const totalPrice = selectedProducts.reduce((sum, item) => {
    return sum + item.price;
  }, 0);

  useEffect(() => {
    api
      .get('products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSelectProduct = (product: Product) => {
    const isAlreadySelected = checkIsSelected(selectedProducts, product);

    if (isAlreadySelected) {
      const selected = selectedProducts.filter(
        (item) => item.id !== product.id
      );
      setSelectedProducts(selected);
    } else {
      setSelectedProducts((previous) => [...previous, product]);
    }
  };

  const handleSubmit = () => {
    const productsIds = selectedProducts.map(({ id }) => ({ id }));
    const payload = {
      ...orderLocation!,
      products: productsIds,
    };

    api
      .post('orders', payload)
      .then((response) => {
        toast.error(`Pedido enviado com sucesso! No ${response.data.id}`);
        setSelectedProducts([]);
      })
      .catch(() => {
        toast.warning('Erro ao enviar pedido');
      });
  };

  return (
    <>
      <div className="orders-container">
        <StepsHeader />
        <ProductsList
          products={products}
          onSelectProduct={handleSelectProduct}
          selectedProducts={selectedProducts}
        />
        <OrderLocation
          onChangeLocation={(location) => setOrderLocation(location)}
        />
        <OrderSummary
          amount={selectedProducts.length}
          totalPrice={totalPrice}
          onSubmit={handleSubmit}
        />
      </div>
      <Footer />
    </>
  );
}

export default Orders;
