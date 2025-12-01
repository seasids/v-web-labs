import React from 'react';
import ReactDOM from 'react-dom/client';
import { HomePage } from '@/pages/home';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element. Check index.html');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>,
);
