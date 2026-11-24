import { finalPrice } from './formatPrice';

/** Remove acentos e caixa para comparar textos (ex.: "Tênis" ≈ "tenis"). */
export const normalize = (text = '') =>
  String(text)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();

/**
 * Aplica busca textual, filtros e ordenação sobre a lista de produtos.
 * @param {object[]} products
 * @param {{ search?: string, filters?: Record<string, string[] | string>, sort?: 'lowest' | 'highest' | '' }} params
 */
export function filterProducts(products, { search = '', filters = {}, sort = '' } = {}) {
  const term = normalize(search);

  const result = products.filter((product) => {
    if (term) {
      const haystack = normalize(`${product.name} ${product.brand ?? ''} ${product.category ?? ''}`);
      if (!haystack.includes(term)) return false;
    }

    return Object.entries(filters).every(([key, value]) => {
      if (Array.isArray(value)) return value.length === 0 || value.includes(product[key]);
      return !value || product[key] === value;
    });
  });

  if (sort === 'lowest') return [...result].sort((a, b) => finalPrice(a) - finalPrice(b));
  if (sort === 'highest') return [...result].sort((a, b) => finalPrice(b) - finalPrice(a));
  return result;
}
