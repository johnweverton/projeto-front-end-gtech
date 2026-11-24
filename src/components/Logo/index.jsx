import { Link } from 'react-router-dom';
import logoHeader from '../../assets/logo-header.svg';
import logoFooter from '../../assets/logo-footer.svg';
import './Logo.css';

const sources = {
  header: logoHeader,
  footer: logoFooter,
};

/**
 * Logomarca da Digital Store (253x44px).
 * @param {{ variant?: 'header' | 'footer' }} props — `footer` renderiza a versão branca.
 */
const Logo = ({ variant = 'header' }) => {
  return (
    <Link to="/" className="logo" aria-label="Digital Store — página inicial">
      <img src={sources[variant] ?? logoHeader} alt="Digital Store" width="253" height="44" />
    </Link>
  );
};

export default Logo;
