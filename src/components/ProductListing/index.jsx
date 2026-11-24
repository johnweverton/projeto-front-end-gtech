import ProductCard from '../ProductCard';
import './ProductListing.css';

/**
 * Wrapper que renderiza uma lista de `<ProductCard />`.
 * @param {{ products: object[], columns?: number }} props — `columns` define quantos cards por linha no desktop.
 */
const ProductListing = ({ products = [], columns = 4 }) => {
  if (products.length === 0) {
    return <p className="product-listing__empty">Nenhum produto encontrado.</p>;
  }

  return (
    <div className="product-listing" style={{ '--columns': columns }}>
      {products.map((product, index) => (
        <ProductCard key={product.id ?? `${product.name}-${index}`} {...product} />
      ))}
    </div>
  );
};

export default ProductListing;
