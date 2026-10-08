import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './app/home/HomePage';
import './styles/global.scss';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Elemento #root não encontrado no index.html.');
}

createRoot(rootElement).render(
  <StrictMode>
    <HomePage />
  </StrictMode>,
);
