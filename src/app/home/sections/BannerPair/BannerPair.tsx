import { Button } from '@/components/ui';
import './BannerPair.scss';

export type BannerVariant = 'a' | 'b' | 'c' | 'd';

export interface BannerPairProps {
  items: Array<{
    title: string;
    text: string;
    variant: BannerVariant;
  }>;
}

export function BannerPair({ items }: BannerPairProps) {
  return (
    <div className="container banners">
      {items.map((item) => (
        <article className={`banner banner--${item.variant}`} key={item.variant}>
          <div className="banner__media" aria-hidden="true" />
          <div className="banner__overlay" aria-hidden="true" />
          <h2 className="banner__title">{item.title}</h2>
          <p className="banner__text">{item.text}</p>
          <Button className="banner__cta" onClick={() => document.getElementById('vitrine')?.scrollIntoView({ behavior: 'smooth' })}>
            Confira
          </Button>
        </article>
      ))}
    </div>
  );
}
