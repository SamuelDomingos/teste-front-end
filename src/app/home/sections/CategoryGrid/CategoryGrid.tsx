import './CategoryGrid.scss';

interface Category {
  label: string;
  icon: string;
  active?: boolean;
}

const CATEGORIES: Category[] = [
  { label: 'Tecnologia', icon: '/icons/tecnologias.png', active: true },
  { label: 'Supermercado', icon: '/icons/supermercado.png' },
  { label: 'Bebidas', icon: '/icons/bebidas.png' },
  { label: 'Ferramentas', icon: '/icons/ferramentas.png' },
  { label: 'Saúde', icon: '/icons/saude.png' },
  { label: 'Esportes e Fitness', icon: '/icons/esporte.png' },
  { label: 'Moda', icon: '/icons/moda.png' },
];

export function CategoryGrid() {
  return (
    <section className="categories" id="categorias" aria-labelledby="categorias-title">
      <div className="container">
        <h2 className="visually-hidden" id="categorias-title">
          Compre por categoria
        </h2>
        <ul className="categories__list">
          {CATEGORIES.map((category) => (
            <li
              key={category.label}
              className={`categories__item${category.active ? ' categories__item--active' : ''}`}
            >
              <a className="categories__link" href="#vitrine">
                <span className="categories__card">
                  <img
                    className="categories__icon"
                    src={category.icon}
                    alt=""
                    width={66}
                    height={66}
                  />
                </span>
                <span className="categories__label">{category.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
