import { useState, type FormEvent } from 'react';
import { Icon, Logo } from '@/components/ui';
import './Header.scss';

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Todas Categorias', href: '#categorias' },
  { label: 'Supermercado', href: '#categorias' },
  { label: 'Livros', href: '#categorias' },
  { label: 'Moda', href: '#categorias' },
  { label: 'Lançamentos', href: '#vitrine' },
  { label: 'Ofertas do dia', href: '#vitrine', active: true },
  { label: 'Assinatura', href: '#newsletter', },
];

export function Header() {
  const [query, setQuery] = useState('');

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const term = query.trim();
    if (!term) return;
    document.getElementById('vitrine')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="header" id="topo">
      <div className="header__topbar">
        <div className="container header__benefits">
          <span className="header__benefit">
            <Icon name="shield-check" size={20} viewBox="0 0 20 20" strokeWidth={2} />
            <span>Compra <strong>100% segura</strong></span>
          </span>
          <span className="header__benefit">
            <Icon name="truck" size={20} viewBox="0 0 20 20" strokeWidth={2} />
            <span><strong>Frete grátis</strong> acima de R$ 200</span>
          </span>
          <span className="header__benefit">
            <Icon name="credit-card" size={20} viewBox="0 0 20 20" strokeWidth={2} />
            <span><strong>Parcele</strong> suas compras</span>
          </span>
        </div>
      </div>

      <div className="header__main">
        <div className="container header__main-inner">
          <a className="header__logo" href="#topo" aria-label="Econverse — página inicial">
            <Logo />
          </a>

          <form className="header__search" role="search" onSubmit={handleSearch}>
            <label className="visually-hidden" htmlFor="busca">
              Buscar produtos
            </label>
            <input
              id="busca"
              type="search"
              name="q"
              placeholder="O que você está buscando?"
              autoComplete="off"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="submit" aria-label="Buscar">
              <Icon name="search" size={28} />
            </button>
          </form>

          <div className="header__actions">
            <a href="#vitrine" aria-label="Compartilhar">
              <Icon name="share" size={24} viewBox="0 0 25 25" />
            </a>
            <a href="#vitrine" aria-label="Favoritos">
              <Icon name="heart" size={32} viewBox="0 0 32 32" strokeWidth={2} />
            </a>
            <a href="#newsletter" aria-label="Minha conta">
              <Icon name="user-circle" size={32} viewBox="0 0 32 32" strokeWidth={2} />
            </a>
            <a href="#vitrine" aria-label="Carrinho de compras">
              <Icon name="cart" size={32} viewBox="0 0 32 32" strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>

      <nav className="header__nav" aria-label="Categorias de produtos">
        <ul className="header__nav-list">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <a
                className={`header__nav-link${item.active ? ' header__nav-link--active' : ''}`}
                href={item.href}
                aria-current={item.active ? 'page' : undefined}
              >
                {item.label === 'Assinatura' && (
                  <Icon name="crown" size={20} viewBox="0 0 20 20" strokeWidth={2} />
                )}
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
