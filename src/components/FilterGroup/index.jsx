import { useId } from 'react';
import './FilterGroup.css';

/**
 * Grupo de filtros (checkbox ou radio).
 * @param {{
 *   title: string,
 *   inputType?: 'checkbox' | 'radio',
 *   options: { text: string, value?: string }[],
 *   name?: string,
 *   selected?: string[] | string,
 *   onChange?: (value: string, checked: boolean) => void
 * }} props — `name`, `selected` e `onChange` são opcionais e permitem uso controlado.
 */
const FilterGroup = ({ title, inputType = 'checkbox', options = [], name, selected, onChange }) => {
  const id = useId();
  const type = inputType === 'radio' ? 'radio' : 'checkbox';
  const groupName = name ?? `filter-${id}`;

  const isChecked = (value) => {
    if (selected === undefined) return undefined;
    return Array.isArray(selected) ? selected.includes(value) : selected === value;
  };

  return (
    <fieldset className="filter-group">
      <legend className="filter-group__title">{title}</legend>
      {options.map((option, index) => {
        const value = option.value ?? option.text;
        const inputId = `${groupName}-${index}`;
        const checked = isChecked(value);

        return (
          <label key={inputId} htmlFor={inputId} className="filter-group__option">
            <input
              id={inputId}
              type={type}
              name={groupName}
              value={value}
              {...(checked !== undefined ? { checked } : {})}
              onChange={(event) => onChange?.(value, event.target.checked)}
            />
            <span>{option.text}</span>
          </label>
        );
      })}
    </fieldset>
  );
};

export default FilterGroup;
