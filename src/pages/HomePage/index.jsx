import Layout from '../Layout';
import Gallery from '../../components/Gallery';
import Section from '../../components/Section';
import ProductListing from '../../components/ProductListing';
import { collections, homeSlides, products } from '../../data/products';
import './HomePage.css';

const HomePage = () => {
  const trendingProducts = products.slice(0, 8);

  return (
    <Layout>
      <div className="home__hero">
        <Gallery images={homeSlides} width="1440" height="681" className="home__gallery" />
      </div>

      <div className="container home__content">
        <Section title="Coleções em destaque" titleAlign="center">
          <div className="home__collections">
            {collections.map((collection) => (
              <img key={collection.src} src={collection.src} alt={collection.alt} loading="lazy" />
            ))}
          </div>
        </Section>

        <Section title="Produtos em alta" titleAlign="left" link={{ text: 'Ver todos', href: '/products' }}>
          <ProductListing products={trendingProducts} />
        </Section>
      </div>
    </Layout>
  );
};

export default HomePage;
