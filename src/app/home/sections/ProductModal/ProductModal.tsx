import { useEffect, useState } from 'react';
import { Button, Icon, Modal } from '@/components/ui';
import { formatCurrency } from '@/utils/format';
import type { Product } from '@/types/product';
import './ProductModal.scss';

export interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [lastProduct, setLastProduct] = useState(product);

  useEffect(() => {
    if (product) setLastProduct(product);
  }, [product]);

  useEffect(() => {
    setQuantity(1);
  }, [product]);

  const shown = product ?? lastProduct;

  return (
    <Modal open={product !== null} onClose={onClose} label="Detalhes do produto">
      {shown && (
        <div className="product-modal">
          <div className="product-modal__image">
            <img src={shown.photo} alt={shown.productName} />
          </div>

          <div className="product-modal__info">
            <div className="product-modal__titles">
              <h2 className="product-modal__title">{shown.productName}</h2>
              <p className="product-modal__price">{formatCurrency(shown.price)}</p>
            </div>

            <div className="product-modal__copy">
              <p className="product-modal__description">{shown.descriptionShort}</p>
              <a className="product-modal__link" href="#vitrine" onClick={onClose}>
                Veja mais detalhes do produto &gt;
              </a>
            </div>

            <div className="product-modal__actions">
              <div className="product-modal__stepper">
                <button
                  type="button"
                  aria-label="Diminuir quantidade"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  disabled={quantity <= 1}
                >
                  <Icon name="minus" size={20} strokeWidth={2} />
                </button>
                <span className="product-modal__quantity">
                  {String(quantity).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  aria-label="Aumentar quantidade"
                  onClick={() => setQuantity((current) => Math.min(99, current + 1))}
                >
                  <Icon name="plus" size={20} strokeWidth={2} />
                </button>
              </div>

              <Button variant="yellow" className="product-modal__buy" onClick={onClose}>
                Comprar
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
