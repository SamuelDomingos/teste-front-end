import { Logo } from '@/components/ui';
import './BrandCarousel.scss';

const BRANDS = ['Nova', 'Orbit', 'Vega', 'Pulse', 'Aura'];

export function BrandCarousel() {
  return (
    <section className="brands" aria-labelledby="brands-title">
      <div className="container">
        <h2 className="brands__title" id="brands-title">
          Navegue por marcas
        </h2>
        <ul className="brands__list">
          {BRANDS.map((brand) => (
            <li key={brand}>
              <a className="brands__item" href="#vitrine" aria-label={`Marca ${brand}`}>
                <Logo size="sm" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
