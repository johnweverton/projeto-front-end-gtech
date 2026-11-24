import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Section from '../components/Section';
import ProductCard from '../components/ProductCard';
import ProductListing from '../components/ProductListing';
import Gallery from '../components/Gallery';
import FilterGroup from '../components/FilterGroup';
import ProductOptions from '../components/ProductOptions';
import BuyBox from '../components/BuyBox';
import Informations from '../components/Informations';

const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe('<Section />', () => {
  it('renderiza título alinhado à esquerda por padrão, link e filhos', () => {
    const { container } = renderWithRouter(
      <Section title="Produtos em alta" link={{ text: 'Ver todos', href: '/products' }}>
        <p>conteúdo</p>
      </Section>,
    );
    expect(screen.getByRole('heading', { name: 'Produtos em alta' })).toBeInTheDocument();
    expect(container.querySelector('.section__header--left')).not.toBeNull();
    expect(screen.getByRole('link', { name: /ver todos/i })).toHaveAttribute('href', '/products');
    expect(screen.getByText('conteúdo')).toBeInTheDocument();
  });

  it('aceita titleAlign="center"', () => {
    const { container } = renderWithRouter(<Section title="Coleções" titleAlign="center" />);
    expect(container.querySelector('.section__header--center')).not.toBeNull();
  });
});

describe('<ProductCard />', () => {
  it('exibe somente o preço quando não há desconto', () => {
    renderWithRouter(<ProductCard name="Tênis" image="/a.jpeg" price={49.9} />);
    expect(screen.getByText('R$ 49,90')).not.toHaveClass('product-card__price--old');
    expect(screen.getByRole('img', { name: 'Tênis' })).toHaveAttribute('src', '/a.jpeg');
  });

  it('risca o preço original quando há priceDiscount', () => {
    renderWithRouter(<ProductCard name="Tênis" image="/a.jpeg" price={200} priceDiscount={149.9} />);
    expect(screen.getByText(/R\$ 200,00/).closest('span')).toHaveClass('product-card__price--old');
    expect(screen.getByText(/R\$ 149,90/)).toBeInTheDocument();
  });
});

describe('<ProductListing />', () => {
  it('renderiza um card para cada produto', () => {
    const products = [
      { name: 'Produto 1', image: '/1.jpeg', price: 200, priceDiscount: 149.9 },
      { name: 'Produto 2', image: '/2.jpeg', price: 49.9 },
    ];
    renderWithRouter(<ProductListing products={products} />);
    expect(screen.getAllByRole('article')).toHaveLength(2);
  });

  it('mostra mensagem quando a lista está vazia', () => {
    renderWithRouter(<ProductListing products={[]} />);
    expect(screen.getByText('Nenhum produto encontrado.')).toBeInTheDocument();
  });
});

describe('<Gallery />', () => {
  const images = [{ src: '/1.jpeg' }, { src: '/2.jpeg' }, { src: '/3.jpeg' }];

  it('desabilita as setas nos extremos e navega entre imagens', async () => {
    const user = userEvent.setup();
    render(<Gallery images={images} />);
    const prev = screen.getByRole('button', { name: 'Imagem anterior' });
    const next = screen.getByRole('button', { name: 'Próxima imagem' });

    expect(prev).toBeDisabled();
    expect(next).toBeEnabled();

    await user.click(next);
    await user.click(next);
    expect(next).toBeDisabled();
    expect(prev).toBeEnabled();
  });

  it('exibe miniaturas apenas com showThumbs e marca a selecionada', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Gallery images={images} />);
    expect(screen.queryByRole('button', { name: 'Ver imagem 2' })).not.toBeInTheDocument();

    rerender(<Gallery images={images} showThumbs radius="4px" />);
    const thumb = screen.getByRole('button', { name: 'Ver imagem 2' });
    await user.click(thumb);
    expect(thumb).toHaveClass('is-selected');
  });
});

describe('<FilterGroup />', () => {
  it('usa value quando informado e text como fallback', () => {
    render(
      <FilterGroup
        title="Marca"
        inputType="radio"
        options={[{ text: 'Adidas', value: 'adidas' }, { text: 'Nike' }]}
      />,
    );
    expect(screen.getByText('Marca')).toBeInTheDocument();
    expect(screen.getByLabelText('Adidas')).toHaveAttribute('value', 'adidas');
    expect(screen.getByLabelText('Nike')).toHaveAttribute('value', 'Nike');
    expect(screen.getByLabelText('Nike')).toHaveAttribute('type', 'radio');
  });
});

describe('<ProductOptions />', () => {
  it('marca a opção selecionada', async () => {
    const user = userEvent.setup();
    render(<ProductOptions options={['39', '40']} shape="square" type="text" />);
    await user.click(screen.getByRole('button', { name: '40' }));
    expect(screen.getByRole('button', { name: '40' })).toHaveClass('is-selected');
    expect(screen.getByRole('button', { name: '39' })).not.toHaveClass('is-selected');
  });

  it('usa as opções como cor de preenchimento quando type="color"', () => {
    render(<ProductOptions options={['#000000']} shape="circle" type="color" />);
    expect(screen.getByRole('button', { name: 'Cor #000000' })).toHaveStyle({ backgroundColor: '#000000' });
  });
});

describe('<BuyBox />', () => {
  it('renderiza informações do produto, filhos e o botão comprar', () => {
    render(
      <BuyBox name="Tênis X" reference="123" stars={4.7} rating={90} price={219} priceDiscount={199} description="Desc">
        <span>opções</span>
      </BuyBox>,
    );
    expect(screen.getByRole('heading', { name: 'Tênis X' })).toBeInTheDocument();
    expect(screen.getByText('REF: 123')).toBeInTheDocument();
    expect(screen.getByText('(90 avaliações)')).toBeInTheDocument();
    expect(screen.getByText(/R\$ 219,00/).closest('span')).toHaveClass('buy-box__price--old');
    expect(screen.getByText('opções')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'COMPRAR' })).toBeInTheDocument();
  });
});

describe('<Informations />', () => {
  it('renderiza os links dinamicamente', () => {
    renderWithRouter(
      <Informations
        title="Informação"
        informations={[
          { text: 'Sobre Drip Store', link: '/about' },
          { text: 'Blog', link: '/blog' },
        ]}
      />,
    );
    expect(screen.getByRole('heading', { name: 'Informação' })).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });
});
