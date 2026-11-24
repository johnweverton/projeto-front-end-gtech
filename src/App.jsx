import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductViewPage from './pages/ProductViewPage';
import InfoPage from './pages/InfoPage';

/** Volta ao topo ao trocar de página. */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/products" element={<ProductListingPage />} />
    <Route path="/produtos" element={<ProductListingPage />} />
    <Route path="/product/:id" element={<ProductViewPage />} />
    <Route path="/categories" element={<InfoPage title="Categorias" />} />
    <Route path="/orders" element={<InfoPage title="Meus Pedidos" />} />
    <Route path="/login" element={<InfoPage title="Entrar" />} />
    <Route path="/signup" element={<InfoPage title="Cadastre-se" />} />
    <Route
      path="*"
      element={<InfoPage title="Página não encontrada" message="O endereço acessado não existe." />}
    />
  </Routes>
);

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <AppRoutes />
  </BrowserRouter>
);

export default App;
