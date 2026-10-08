import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Button, Icon, IconButton, Tag } from '@/components/ui';
import type { Product } from '@/types/product';
import { ProductCard } from './ProductCard';
import './ProductShelf.scss';

export type ShelfStatus = 'loading' | 'success' | 'error';

export interface ProductShelfProps {
  id?: string;
  title: string;
  tags?: string[];
  products: Product[];
  status: ShelfStatus;
  error?: string | null;
  onRetry?: () => void;
  onSelect: (product: Product) => void;
}

const SKELETONS = [0, 1, 2, 3];

export function ProductShelf({
  id,
  title,
  tags,
  products,
  status,
  error,
  onRetry,
  onSelect,
}: ProductShelfProps) {
  const headingId = useId();
  const trackRef = useRef<HTMLUListElement>(null);
  const [activeTag, setActiveTag] = useState<string | undefined>(tags?.[0]);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateArrows();
    track.addEventListener('scroll', updateArrows, { passive: true });

    const observer = new ResizeObserver(updateArrows);
    observer.observe(track);

    return () => {
      track.removeEventListener('scroll', updateArrows);
      observer.disconnect();
    };
  }, [updateArrows, status, products.length]);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('.product-card');
    const step = (card?.offsetWidth ?? 304) + 18;
    track.scrollBy({ left: step * direction, behavior: 'smooth' });
  };

  const showLoading = status === 'loading';
  const showError = status === 'error';

  return (
    <section className="shelf" id={id} aria-labelledby={headingId}>
      <div className="container container--wide">
        <div className="section-title">
          <h2 id={headingId}>{title}</h2>
        </div>

        <p className="shelf__see-all">
          <a href="#vitrine">Ver todos</a>
        </p>

        {tags && tags.length > 0 && (
          <div className="shelf__tags" role="group" aria-label="Filtrar por categoria">
            {tags.map((tag) => (
              <Tag
                key={tag}
                active={activeTag === tag}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </Tag>
            ))}
          </div>
        )}

        <div className="shelf__carousel">
          <IconButton
            className="shelf__arrow shelf__arrow--prev"
            label="Ver produtos anteriores"
            onClick={() => scrollByCard(-1)}
            disabled={!canPrev || showLoading}
          >
            <Icon name="chevron-left" size={14} strokeWidth={2.2} />
          </IconButton>

          <ul className="shelf__track" ref={trackRef}>
            {showLoading &&
              SKELETONS.map((index) => (
                <li className="shelf__skeleton" key={index} aria-hidden="true" />
              ))}

            {showError && (
              <li className="shelf__status">
                <p>{error ?? 'Não foi possível carregar os produtos.'}</p>
                {onRetry && (
                  <Button variant="outline" size="sm" onClick={onRetry}>
                    Tentar novamente
                  </Button>
                )}
              </li>
            )}

            {!showLoading &&
              !showError &&
              products.map((product) => (
                <li className="shelf__item" key={product.productName}>
                  <ProductCard product={product} onSelect={onSelect} />
                </li>
              ))}
          </ul>

          <IconButton
            className="shelf__arrow shelf__arrow--next"
            label="Ver próximos produtos"
            onClick={() => scrollByCard(1)}
            disabled={!canNext || showLoading}
          >
            <Icon name="chevron-right" size={14} strokeWidth={2.2} />
          </IconButton>
        </div>
      </div>
    </section>
  );
}
