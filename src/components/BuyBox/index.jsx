import starIcon from '../../assets/star-icon.svg';
import { formatPrice } from '../../utils/formatPrice';
import './BuyBox.css';

/**
 * Caixa de compra com informações do produto e call to action "Comprar".
 * Variações (ex.: `<ProductOptions />`) são passadas como `children`.
 */
const BuyBox = ({ name, reference, stars, rating, price, priceDiscount, description, children, onBuy }) => {
  const hasDiscount = priceDiscount !== undefined && priceDiscount !== null && priceDiscount < price;

  return (
    <div className="buy-box">
      <h1 className="buy-box__name">{name}</h1>
      {reference && <p className="buy-box__reference">REF: {reference}</p>}

      {(stars !== undefined || rating !== undefined) && (
        <div className="buy-box__rating">
          {stars !== undefined && (
            <span className="buy-box__stars" aria-label={`${stars} estrelas`}>
              {stars}
              <img src={starIcon} alt="" width="12" height="12" />
            </span>
          )}
          {rating !== undefined && <span className="buy-box__reviews">({rating} avaliações)</span>}
        </div>
      )}

      <div className="buy-box__prices">
        {hasDiscount ? (
          <>
            <span className="buy-box__price-discount">
              <span className="visually-hidden">Por </span>
              {formatPrice(priceDiscount)}
            </span>
            <span className="buy-box__price buy-box__price--old">
              <span className="visually-hidden">De </span>
              {formatPrice(price)}
            </span>
          </>
        ) : (
          <span className="buy-box__price">{formatPrice(price)}</span>
        )}
      </div>

      {description && (
        <div className="buy-box__description">
          <h2>Descrição do produto</h2>
          <p>{description}</p>
        </div>
      )}

      {children && <div className="buy-box__options">{children}</div>}

      <button type="button" className="buy-box__cta" onClick={onBuy}>
        COMPRAR
      </button>
    </div>
  );
};

export default BuyBox;
