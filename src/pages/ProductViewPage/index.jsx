import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../Layout';
import Gallery from '../../components/Gallery';
import BuyBox from '../../components/BuyBox';
import ProductOptions from '../../components/ProductOptions';
import Section from '../../components/Section';
import ProductListing from '../../components/ProductListing';
import { getProductById, products } from '../../data/products';
import './ProductViewPage.css';

const ProductViewPage = () => {
  const { id } = useParams();
  const product = getProductById(id);
  // Guarda o id junto da mensagem para não exibi-la ao navegar para outro produto.
  const [feedback, setFeedback] = useState({ productId: null, text: '' });

  if (!product) {
    return (
      <Layout>
        <div className="container product-view__not-found">
          <h1>Produto não encontrado</h1>
          <p>O produto que você procura não existe ou foi removido.</p>
          <Link to="/products">Ver todos os produtos</Link>
        </div>
      </Layout>
    );
  }

  const related = products
    .filter((item) => item.id !== product.id)
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, 4);

  return (
    <Layout>
      <div className="container product-view">
        <nav className="product-view__breadcrumb" aria-label="Trilha de navegação">
          <ol>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Produtos</Link>
            </li>
            <li>
              <Link to={`/products?filter=${encodeURIComponent(product.category)}`}>{product.category}</Link>
            </li>
            <li>
              <Link to={`/products?filter=${encodeURIComponent(product.brand)}`}>{product.brand}</Link>
            </li>
            <li aria-current="page">{product.name}</li>
          </ol>
        </nav>

        <div className="product-view__main">
          <Gallery key={product.id} images={product.images} showThumbs width="700" height="570" radius="4px" />

          <BuyBox
            key={`buybox-${product.id}`}
            name={product.name}
            reference={product.reference}
            stars={product.stars}
            rating={product.rating}
            price={product.price}
            priceDiscount={product.priceDiscount}
            description={product.description}
            onBuy={() => setFeedback({ productId: product.id, text: `${product.name} adicionado ao carrinho!` })}
          >
            <div>
              <h3>Tamanho</h3>
              <ProductOptions options={product.sizes} shape="square" radius="4px" type="text" label="Tamanhos" />
            </div>
            <div>
              <h3>Cor</h3>
              <ProductOptions options={product.colors} shape="circle" type="color" label="Cores" />
            </div>
          </BuyBox>
        </div>

        <p className="product-view__message" role="status" aria-live="polite">
          {feedback.productId === product.id ? feedback.text : ''}
        </p>

        <Section title="Produtos recomendados" titleAlign="left" link={{ text: 'Ver todos', href: '/products' }}>
          <ProductListing products={related} />
        </Section>
      </div>
    </Layout>
  );
};

export default ProductViewPage;
