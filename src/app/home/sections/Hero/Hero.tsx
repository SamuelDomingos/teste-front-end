import { Button } from '@/components/ui';
import './Hero.scss';

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__media" aria-hidden="true" />
      <div className="hero__overlay" aria-hidden="true" />

      <div className="container hero__content">
        <h1 className="hero__title" id="hero-title">
          Venha conhecer nossas promoções
          <span className="hero__highlight">50% Off nos produtos</span>
        </h1>
        <Button className="hero__cta" onClick={() => document.getElementById('vitrine')?.scrollIntoView({ behavior: 'smooth' })}>
          Ver produto
        </Button>
      </div>
    </section>
  );
}
