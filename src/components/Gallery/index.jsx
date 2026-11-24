import { useState } from 'react';
import arrowLeft from '../../assets/arrow-left.svg';
import arrowRight from '../../assets/arrow-right.svg';
import './Gallery.css';

/** Converte "1440", 1440 ou "1440px" em "1440px"; mantém outras unidades. */
const toCssSize = (value) => {
  if (value === undefined || value === null || value === '') return undefined;
  return /^\d+(\.\d+)?$/.test(String(value)) ? `${value}px` : String(value);
};

const toNumber = (value) => {
  const number = parseFloat(value);
  return Number.isFinite(number) ? number : undefined;
};

/**
 * Galeria/carrossel de imagens com setas e miniaturas opcionais.
 * @param {{ images: { src: string, alt?: string }[], width?: string|number, height?: string|number, radius?: string, showThumbs?: boolean, className?: string }} props
 */
const Gallery = ({ images = [], width, height, radius = '0', showThumbs = false, className = '' }) => {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  if (total === 0) return null;

  const isFirst = current === 0;
  const isLast = current === total - 1;
  const goTo = (index) => setCurrent(Math.min(Math.max(index, 0), total - 1));

  const w = toNumber(width);
  const h = toNumber(height);
  const borderRadius = toCssSize(radius);

  // Largura fixa (até 100% do contêiner) e proporção preservada para responsividade.
  const slideStyle = {
    width: toCssSize(width) ?? '100%',
    aspectRatio: w && h ? `${w} / ${h}` : undefined,
    height: w && h ? undefined : toCssSize(height),
    borderRadius,
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') goTo(current - 1);
    if (event.key === 'ArrowRight') goTo(current + 1);
  };

  return (
    <div
      className={`gallery ${className}`.trim()}
      style={{ width: slideStyle.width }}
      role="region"
      aria-roledescription="carrossel"
      aria-label="Galeria de imagens"
      onKeyDown={handleKeyDown}
    >
      <div className="gallery__slide" style={slideStyle}>
        <div className="gallery__track" style={{ transform: `translateX(-${current * 100}%)` }}>
          {images.map((image, index) => (
            <img
              key={`${image.src}-${index}`}
              className="gallery__image"
              src={image.src}
              alt={image.alt ?? `Imagem ${index + 1} de ${total}`}
              aria-hidden={index !== current}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          ))}
        </div>

        <button
          type="button"
          className="gallery__arrow gallery__arrow--left"
          onClick={() => goTo(current - 1)}
          disabled={isFirst}
          aria-label="Imagem anterior"
        >
          <img src={arrowLeft} alt="" />
        </button>
        <button
          type="button"
          className="gallery__arrow gallery__arrow--right"
          onClick={() => goTo(current + 1)}
          disabled={isLast}
          aria-label="Próxima imagem"
        >
          <img src={arrowRight} alt="" />
        </button>

        <div className="gallery__dots" aria-hidden="true">
          {images.map((image, index) => (
            <span key={`dot-${image.src}-${index}`} className={index === current ? 'is-active' : undefined} />
          ))}
        </div>
      </div>

      {showThumbs && (
        <ul className="gallery__thumbs">
          {images.map((image, index) => (
            <li key={`thumb-${image.src}-${index}`}>
              <button
                type="button"
                className={`gallery__thumb${index === current ? ' is-selected' : ''}`}
                style={{ borderRadius }}
                onClick={() => goTo(index)}
                aria-label={`Ver imagem ${index + 1}`}
                aria-current={index === current}
              >
                <img src={image.src} alt="" style={{ borderRadius }} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Gallery;
