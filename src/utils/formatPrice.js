const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

/** Formata um número como moeda brasileira (ex.: 149.9 → "R$ 149,90"). */
export function formatPrice(value) {
  const number = Number(value);
  if (value === null || value === undefined || !Number.isFinite(number)) return '';
  return formatter.format(number).replace(/\s/g, ' ');
}

/** Preço efetivo do produto: o preço com desconto, quando existir. */
export function finalPrice(product) {
  return product.priceDiscount ?? product.price;
}
