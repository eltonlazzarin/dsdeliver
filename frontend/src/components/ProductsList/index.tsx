import { Product } from '../../pages/Orders';

import ProductCard from '../ProductCard';

interface Props {
  products: Product[];
}

function ProductsList({ products }: Props) {
  return (
    <div className="orders-list-container">
      <div className="orders-list-items">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductsList;
