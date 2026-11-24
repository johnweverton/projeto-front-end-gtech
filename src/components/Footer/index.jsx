import Logo from '../Logo';
import Informations from '../Informations';
import facebook from '../../assets/facebook.svg';
import instagram from '../../assets/instagram.svg';
import twitter from '../../assets/twitter.svg';
import './Footer.css';

const socials = [
  { name: 'Facebook', href: 'https://www.facebook.com', icon: facebook },
  { name: 'Instagram', href: 'https://www.instagram.com', icon: instagram },
  { name: 'Twitter', href: 'https://www.twitter.com', icon: twitter },
];

const footerColumns = [
  {
    title: 'Informação',
    informations: [
      { text: 'Sobre Drip Store', link: '/about' },
      { text: 'Segurança', link: '/security' },
      { text: 'Wishlist', link: '/wishlist' },
      { text: 'Blog', link: '/blog' },
      { text: 'Trabalhe conosco', link: '/careers' },
      { text: 'Meus Pedidos', link: '/orders' },
    ],
  },
  {
    title: 'Categorias',
    informations: [
      { text: 'Camisetas', link: '/products?filter=Camisetas' },
      { text: 'Calças', link: '/products?filter=Calças' },
      { text: 'Bonés', link: '/products?filter=Bonés' },
      { text: 'Headphones', link: '/products?filter=Headphones' },
      { text: 'Tênis', link: '/products?filter=Tênis' },
    ],
  },
  {
    title: 'Contato',
    informations: [
      { text: 'Av. Santos Dumont, 1510 - 1 andar - Aldeota, Fortaleza - CE, 60150-161', link: '/contact' },
      { text: '(85) 3051-3411', link: 'tel:+558530513411' },
    ],
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__content">
        <div className="footer__brand">
          <Logo variant="footer" />
          <p className="footer__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
          <ul className="footer__socials">
            {socials.map(({ name, href, icon }) => (
              <li key={name}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={name}>
                  <img src={icon} alt="" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {footerColumns.map((column) => (
          <Informations key={column.title} title={column.title} informations={column.informations} />
        ))}
      </div>

      <div className="container">
        <hr className="footer__divider" />
        <p className="footer__copy">© {year} Digital Store</p>
      </div>
    </footer>
  );
};

export default Footer;
