import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';
import './ProductCard.css';

const discountPercent = (price, priceDiscount) => Math.round((1 - priceDiscount / price) * 100);

/**
 * Cartão de produto: imagem (292x321), nome, preço e preço com desconto.
 * Aceita `image` (padrão da listagem) ou `imagem` (nome citado na documentação).
 */
const ProductCard = ({ id, image, imagem, name, category, price, priceDiscount }) => {
  const src = image ?? imagem;
  const hasDiscount = priceDiscount !== undefined && priceDiscount !== null && priceDiscount < price;

  const content = (
    <>
      <div className="product-card__image">
        {hasDiscount && <span className="product-card__badge">{discountPercent(price, priceDiscount)}% OFF</span>}
        <img src={src} alt={name} width="292" height="321" loading="lazy" />
      </div>
      {category && <span className="product-card__category">{category}</span>}
      <h3 className="product-card__name">{name}</h3>
      <div className="product-card__prices">
        <span className={hasDiscount ? 'product-card__price product-card__price--old' : 'product-card__price'}>
          {hasDiscount && <span className="visually-hidden">De </span>}
          {formatPrice(price)}
        </span>
        {hasDiscount && (
          <span className="product-card__price">
            <span className="visually-hidden">Por </span>
            {formatPrice(priceDiscount)}
          </span>
        )}
      </div>
    </>
  );

  return (
    <article className="product-card">
      {id ? (
        <Link to={`/product/${id}`} className="product-card__link">
          {content}
        </Link>
      ) : (
        content
      )}
    </article>
  );
};

export default ProductCard;
