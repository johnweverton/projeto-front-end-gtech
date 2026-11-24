import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Layout.css';

/** Layout base: renderiza as páginas entre o `<Header />` e o `<Footer />`. */
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="layout__main">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
