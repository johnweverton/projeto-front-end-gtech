# Digital Store — Projeto Final de Front-end

Loja virtual **Digital Store (Drip Store)** desenvolvida em **React** como projeto final do curso de Front-end, seguindo a [documentação oficial](https://github.com/digitalcollegebr/projeto-digital-store) e o [design do Figma](https://www.figma.com/design/nUk0ihM3x4u8JQtxUoAEJf/DRIP-STORE---DIGITAL-COLLEGE--Copy-?node-id=22-30).

## Tecnologias

- [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- [React Router DOM 7](https://reactrouter.com/) (rotas e `NavLink`)
- CSS puro com variáveis (paleta oficial do projeto) e layout responsivo
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) (testes)
- ESLint

## Como rodar

Pré-requisito: **Node.js 20+**.

```bash
npm install        # instala as dependências
npm run dev        # ambiente de desenvolvimento → http://localhost:5173
npm test           # roda os testes
npm run lint       # verifica o código
npm run build      # gera a versão de produção em /dist
npm run preview    # serve o build localmente
```

## Páginas e rotas

| Rota | Página | Conteúdo |
|------|--------|----------|
| `/` | `HomePage` | Galeria (1440×681), Coleções em destaque e 8 Produtos em alta |
| `/products` (e `/produtos`) | `ProductListingPage` | Ordenar por, Filtrar por (`FilterGroup`) e listagem com total de resultados |
| `/products?filter=termo` | `ProductListingPage` | Resultado da busca do cabeçalho |
| `/product/:id` | `ProductViewPage` | Galeria com miniaturas (700×570), `BuyBox` com opções e Produtos recomendados |
| `/categories`, `/orders`, `/login`, `/signup` | `InfoPage` | Páginas informativas (fora do escopo mínimo) |

## Estrutura

```
src/
├── assets/                 # SVGs (logos, setas, ícones sociais, carrinho, estrela)
├── components/
│   ├── BuyBox/             # Nome, referência, estrelas, avaliações, preços, descrição, COMPRAR
│   ├── FilterGroup/        # title, inputType (checkbox|radio), options [{text, value?}]
│   ├── Footer/             # Logo branca, descrição, redes sociais, Informations, copyright
│   ├── Gallery/            # images, width, height, radius, showThumbs, className
│   ├── Header/             # Logo, busca (Enter/lupa → /products?filter=), links, carrinho, navegação
│   ├── Informations/       # title, informations [{text, link}]
│   ├── Logo/               # 253×44 (variant header|footer)
│   ├── ProductCard/        # image, name, price, priceDiscount
│   ├── ProductListing/     # products [] → ProductCard
│   ├── ProductOptions/     # options, shape (square|circle), radius, type (text|color)
│   └── Section/            # title, titleAlign (left|center), link {text, href}, children
├── data/products.js        # Produtos mockados (sem API)
├── pages/
│   ├── Layout/             # Header + children + Footer
│   ├── HomePage/
│   ├── ProductListingPage/
│   ├── ProductViewPage/
│   └── InfoPage/
├── utils/                  # formatPrice (R$) e filterProducts (busca/filtros/ordenação)
├── styles/global.css       # Paleta de cores e estilos base
├── App.jsx                 # Rotas
└── main.jsx
```

## Requisitos atendidos

- **Layout** com `children` entre `<Header />` e `<Footer />`.
- **Header**: logo 253×44, busca com lupa que redireciona para `/products?filter=...` ao clicar ou pressionar Enter, link *Cadastre-se* sublinhado, botão *Entrar* (114×40, `primary`), carrinho e navegação com link ativo destacado e sublinhado (`NavLink`).
- **Footer**: fundo `dark-gray`, logo branca, descrição, redes sociais, componente de informações renderizado dinamicamente, `<hr />` e copyright com o ano atual.
- **Section**, **ProductCard**, **ProductListing**, **Gallery** (setas desabilitadas nos extremos, transição deslizante, miniaturas 117×95 com borda `primary` na selecionada), **FilterGroup** (inputs 22×22 em `primary`), **ProductOptions** e **BuyBox** conforme as propriedades da documentação.
- **Listagem**: ordenação por menor/maior preço e filtros **funcionais** (marca, categoria, gênero e estado), com o título exibindo o total de produtos encontrados.

## Deploy

O projeto já inclui `vercel.json` e `public/_redirects` para que as rotas do React Router funcionem em produção na **Vercel** ou na **Netlify**:

```bash
npm i -g vercel
vercel --prod
```
