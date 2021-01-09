import { Product } from '../../pages/Orders';
import { checkIsSelected } from '../../utils/checkIsSelected';

import ProductCard from '../ProductCard';

interface Props {
  products: Product[];
  selectedProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

function ProductsList({ products, selectedProducts, onSelectProduct }: Props) {
  return (
    <div className="orders-list-container">
      <div className="orders-list-items">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelectProduct={onSelectProduct}
            isSelected={checkIsSelected(selectedProducts, product)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductsList;
