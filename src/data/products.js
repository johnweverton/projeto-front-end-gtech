const thumbs = [
  '/product-thumb-1.jpeg',
  '/product-thumb-2.jpeg',
  '/product-thumb-3.jpeg',
  '/product-thumb-4.jpeg',
  '/product-thumb-5.jpeg',
];

export const productGalleryImages = [
  { src: '/produc-image-1.jpeg' },
  { src: '/produc-image-2.jpeg' },
  { src: '/produc-image-3.jpeg' },
  { src: '/produc-image-4.jpeg' },
  { src: '/produc-image-5.jpeg' },
];

export const homeSlides = Array.from({ length: 8 }, (_, i) => ({ src: `/home-slide-${i + 1}.jpeg` }));

export const collections = [
  { src: '/collection-1.png', alt: 'Coleção de camisetas' },
  { src: '/collection-2.png', alt: 'Coleção de bolsas' },
  { src: '/collection-3.png', alt: 'Coleção de calçados' },
];

const description =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.';

const base = [
  { name: 'K-Swiss V8 - Masculino', brand: 'K-Swiss', category: 'Tênis', gender: 'Masculino', condition: 'Novo', price: 200, priceDiscount: 149.9 },
  { name: 'Nike Air Jordan 1 Mid', brand: 'Nike', category: 'Tênis', gender: 'Unisex', condition: 'Novo', price: 899.9, priceDiscount: 749.9 },
  { name: 'Adidas Ultraboost - Feminino', brand: 'Adidas', category: 'Corrida', gender: 'Feminino', condition: 'Novo', price: 699.9 },
  { name: 'Puma Suede Classic', brand: 'Puma', category: 'Casual', gender: 'Unisex', condition: 'Usado', price: 349.9, priceDiscount: 279.9 },
  { name: 'Calenciaga Speed Runner', brand: 'Calenciaga', category: 'Tênis', gender: 'Feminino', condition: 'Novo', price: 1299.9 },
  { name: 'K-Swiss Court - Feminino', brand: 'K-Swiss', category: 'Casual', gender: 'Feminino', condition: 'Novo', price: 259.9, priceDiscount: 199.9 },
  { name: 'Nike Revolution 7', brand: 'Nike', category: 'Corrida', gender: 'Masculino', condition: 'Novo', price: 399.9 },
  { name: 'Adidas Forum Low', brand: 'Adidas', category: 'Casual', gender: 'Unisex', condition: 'Usado', price: 549.9, priceDiscount: 429.9 },
  { name: 'Puma RS-X Efekt', brand: 'Puma', category: 'Tênis', gender: 'Masculino', condition: 'Novo', price: 599.9, priceDiscount: 499.9 },
  { name: 'Nike Dunk Low Retro', brand: 'Nike', category: 'Casual', gender: 'Masculino', condition: 'Novo', price: 799.9 },
  { name: 'Adidas Runfalcon 3.0', brand: 'Adidas', category: 'Corrida', gender: 'Feminino', condition: 'Novo', price: 329.9, priceDiscount: 269.9 },
  { name: 'Calenciaga Triple S', brand: 'Calenciaga', category: 'Casual', gender: 'Unisex', condition: 'Usado', price: 1899.9, priceDiscount: 1499.9 },
  { name: 'K-Swiss Classic VN', brand: 'K-Swiss', category: 'Tênis', gender: 'Unisex', condition: 'Novo', price: 289.9 },
  { name: 'Puma Velocity Nitro 3', brand: 'Puma', category: 'Corrida', gender: 'Feminino', condition: 'Novo', price: 749.9, priceDiscount: 629.9 },
  { name: 'Nike Air Max 90', brand: 'Nike', category: 'Tênis', gender: 'Unisex', condition: 'Novo', price: 999.9, priceDiscount: 849.9 },
];

export const products = base.map((item, index) => ({
  id: String(index + 1),
  reference: String(38416711 + index * 37),
  image: thumbs[index % thumbs.length],
  images: productGalleryImages,
  stars: Number((4 + ((index * 3) % 10) / 10).toFixed(1)),
  rating: 40 + index * 7,
  description,
  sizes: ['39', '40', '41', '42', '43'],
  colors: ['#6FEEFF', '#FF6969', '#5E5E5E', '#6D70B7'],
  ...item,
}));

export function getProductById(id) {
  return products.find((product) => product.id === String(id));
}

const toOptions = (list) => list.map((text) => ({ text, value: text }));

export const filterGroups = [
  { key: 'brand', title: 'Marca', inputType: 'checkbox', options: toOptions(['Adidas', 'Calenciaga', 'K-Swiss', 'Nike', 'Puma']) },
  { key: 'category', title: 'Categoria', inputType: 'checkbox', options: toOptions(['Tênis', 'Corrida', 'Casual']) },
  { key: 'gender', title: 'Gênero', inputType: 'checkbox', options: toOptions(['Masculino', 'Feminino', 'Unisex']) },
  { key: 'condition', title: 'Estado', inputType: 'radio', options: toOptions(['Novo', 'Usado']) },
];
