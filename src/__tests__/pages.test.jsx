import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../App';
import { filterProducts, normalize } from '../utils/filterProducts';
import { formatPrice } from '../utils/formatPrice';
import { products } from '../data/products';

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  );

describe('utils', () => {
  it('formatPrice formata em reais', () => {
    expect(formatPrice(149.9)).toBe('R$ 149,90');
    expect(formatPrice(undefined)).toBe('');
  });

  it('normalize ignora acentos e caixa', () => {
    expect(normalize('Tênis')).toBe('tenis');
  });

  it('filterProducts busca, filtra e ordena', () => {
    const nike = filterProducts(products, { search: 'nike' });
    expect(nike.length).toBeGreaterThan(0);
    expect(nike.every((p) => p.brand === 'Nike')).toBe(true);

    const used = filterProducts(products, { filters: { condition: 'Usado' } });
    expect(used.every((p) => p.condition === 'Usado')).toBe(true);

    const sorted = filterProducts(products, { sort: 'highest' });
    const prices = sorted.map((p) => p.priceDiscount ?? p.price);
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });
});

describe('Rotas', () => {
  it('Home exibe coleções e 8 produtos em alta', () => {
    renderAt('/');
    expect(screen.getByRole('heading', { name: 'Coleções em destaque' })).toBeInTheDocument();
    const trending = screen.getByRole('heading', { name: 'Produtos em alta' }).closest('section');
    expect(within(trending).getAllByRole('article')).toHaveLength(8);
  });

  it('a busca do header redireciona para /products?filter=', async () => {
    const user = userEvent.setup();
    renderAt('/');
    await user.type(screen.getByRole('searchbox'), 'Puma{Enter}');
    expect(screen.getByRole('heading', { name: /Resultados para "Puma"/ })).toBeInTheDocument();
  });

  it('a listagem atualiza o total ao aplicar filtros', async () => {
    const user = userEvent.setup();
    renderAt('/products');
    expect(screen.getByRole('heading', { name: `${products.length} produtos encontrados` })).toBeInTheDocument();
    await user.click(screen.getByLabelText('Usado'));
    const usedCount = products.filter((p) => p.condition === 'Usado').length;
    expect(screen.getByRole('heading', { name: `${usedCount} produtos encontrados` })).toBeInTheDocument();
  });

  it('marca o link ativo na navegação', () => {
    renderAt('/products');
    const nav = screen.getByRole('navigation', { name: 'Navegação principal' });
    expect(within(nav).getByRole('link', { name: 'Produtos' })).toHaveClass('is-active');
    expect(within(nav).getByRole('link', { name: 'Home' })).not.toHaveClass('is-active');
  });

  it('página do produto exibe BuyBox e recomendados', () => {
    renderAt('/product/1');
    expect(screen.getByRole('heading', { level: 1, name: products[0].name })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Produtos recomendados' })).toBeInTheDocument();
  });

  it('produto inexistente mostra aviso', () => {
    renderAt('/product/999');
    expect(screen.getByRole('heading', { name: 'Produto não encontrado' })).toBeInTheDocument();
  });
});
