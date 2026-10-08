import { Button } from '@/components/ui';
import { formatCurrency } from '@/utils/format';
import type { Product } from '@/types/product';
import './ProductCard.scss';

export interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const installment = product.price / 2;

  return (
    <article className="product-card">
      <div className="product-card__image">
        <img
          src={product.photo}
          alt={product.productName}
          width={205}
          height={205}
          loading="lazy"
        />
      </div>

      <h3 className="product-card__title">
        <button type="button" className="product-card__link" onClick={() => onSelect(product)}>
          {product.productName}
        </button>
      </h3>

      <p className="product-card__price">
        <span className="visually-hidden">Preço: </span>
        {formatCurrency(product.price)}
      </p>
      <p className="product-card__installments">
        ou 2x de {formatCurrency(installment)} sem juros
      </p>
      <p className="product-card__shipping">Frete grátis</p>

      <Button className="product-card__buy" variant="blue" onClick={() => onSelect(product)}>
        Comprar
      </Button>
    </article>
  );
}
