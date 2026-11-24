import { useState } from 'react';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import Logo from '../Logo';
import miniCart from '../../assets/mini-cart.svg';
import './Header.css';

const navLinks = [
  { text: 'Home', to: '/', end: true },
  { text: 'Produtos', to: '/products' },
  { text: 'Categorias', to: '/categories' },
  { text: 'Meus Pedidos', to: '/orders' },
];

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Header = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlFilter = searchParams.get('filter') ?? '';
  const [term, setTerm] = useState(urlFilter);
  const [syncedFilter, setSyncedFilter] = useState(urlFilter);

  // Mantém o campo sincronizado quando a URL muda por outro caminho (ex.: links do rodapé).
  if (syncedFilter !== urlFilter) {
    setSyncedFilter(urlFilter);
    setTerm(urlFilter);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = term.trim();
    navigate(value ? `/products?filter=${encodeURIComponent(value)}` : '/products');
  };

  return (
    <header className="header">
      <div className="container header__top">
        <Logo />

        <form className="header__search" role="search" onSubmit={handleSubmit}>
          <label htmlFor="header-search" className="visually-hidden">
            Pesquisar produto
          </label>
          <input
            id="header-search"
            type="search"
            placeholder="Pesquisar produto..."
            value={term}
            onChange={(event) => setTerm(event.target.value)}
          />
          <button type="submit" aria-label="Pesquisar">
            <SearchIcon />
          </button>
        </form>

        <div className="header__actions">
          <Link to="/signup" className="header__signup">
            Cadastre-se
          </Link>
          <Link to="/login" className="header__login">
            Entrar
          </Link>
          <span className="header__cart" aria-label="Carrinho com 2 itens" role="img">
            <img src={miniCart} alt="" width="20" height="21" />
            <span className="header__cart-badge" aria-hidden="true">
              2
            </span>
          </span>
        </div>
      </div>

      <nav className="container header__nav" aria-label="Navegação principal">
        <ul>
          {navLinks.map(({ text, to, end }) => (
            <li key={to}>
              <NavLink to={to} end={end} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
                {text}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
