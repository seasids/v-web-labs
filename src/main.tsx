import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/home';
import { CartPage } from '@/pages/cart'; // Импортируем новую страницу
import { StoreProvider, type Product } from '@/shared/store';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element. Check index.html');
}

// Данные (оставляем как было)
const initialProducts: Product[] = [
  ...Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    title: 'Худи с принтом',
    price: 999,
    oldPrice: 1199,
    category: 'hoodie' as const,
  })),
  ...Array.from({ length: 6 }).map((_, i) => ({
    id: i + 7,
    title: 'Шорты с принтом',
    price: 799,
    category: 'shorts' as const,
  })),
];

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <StoreProvider initialState={{ products: initialProducts }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>,
);