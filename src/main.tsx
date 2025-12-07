import React from 'react';
import ReactDOM from 'react-dom/client';
import { HomePage } from '@/pages/home';
import { StoreProvider, type Product } from '@/shared/store';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element. Check index.html');
}

// Генерируем данные для глобального стора с правильными ID и категориями
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
    {/* Инициализируем провайдер с начальными продуктами */}
    <StoreProvider initialState={{ products: initialProducts }}>
      <HomePage />
    </StoreProvider>
  </React.StrictMode>,
);