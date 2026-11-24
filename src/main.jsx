import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Estilos globais primeiro, para que os estilos dos componentes possam sobrescrevê-los.
import './styles/global.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
