import { Link } from 'react-router-dom';
import Layout from '../Layout';
import './InfoPage.css';

/** Página simples para rotas fora do escopo mínimo (Categorias, Meus Pedidos, 404...). */
const InfoPage = ({ title, message = 'Esta página estará disponível em breve.' }) => {
  return (
    <Layout>
      <div className="container info-page">
        <h1>{title}</h1>
        <p>{message}</p>
        <Link to="/products" className="info-page__cta">
          Ver produtos
        </Link>
      </div>
    </Layout>
  );
};

export default InfoPage;
