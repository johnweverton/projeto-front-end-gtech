import { useState } from 'react';
import './ProductOptions.css';

/**
 * Lista de variações do produto (tamanhos, cores...).
 * @param {{
 *   options: string[],
 *   shape?: 'square' | 'circle',
 *   radius?: string,
 *   type?: 'text' | 'color',
 *   label?: string,
 *   onChange?: (option: string) => void
 * }} props — `radius` só vale para `square`.
 */
const ProductOptions = ({ options = [], shape = 'square', radius = '4px', type = 'text', label, onChange }) => {
  const [selected, setSelected] = useState(null);
  const isCircle = shape === 'circle';
  const isColor = type === 'color';

  const handleSelect = (option) => {
    setSelected(option);
    onChange?.(option);
  };

  return (
    <div className="product-options" role="group" aria-label={label ?? 'Opções do produto'}>
      {options.map((option) => {
        const isSelected = selected === option;
        const style = {
          borderRadius: isCircle ? '50%' : radius,
          ...(isColor ? { backgroundColor: option } : {}),
        };

        return (
          <button
            key={option}
            type="button"
            className={[
              'product-options__item',
              `product-options__item--${isCircle ? 'circle' : 'square'}`,
              isColor ? 'product-options__item--color' : 'product-options__item--text',
              isSelected ? 'is-selected' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={style}
            onClick={() => handleSelect(option)}
            aria-pressed={isSelected}
            aria-label={isColor ? `Cor ${option}` : undefined}
            title={option}
          >
            {!isColor && option}
          </button>
        );
      })}
    </div>
  );
};

export default ProductOptions;
