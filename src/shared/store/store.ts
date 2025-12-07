import { createStore } from 'zustand';
import { type StoreState, type Product } from './types';

// Значения по умолчанию
const defaultState = {
  products: [],
  cart: [],
  searchQuery: '',
};

// Функция-фабрика для создания стора (как populateStore из методички)
export const createAppStore = (
  initialState: Partial<Pick<StoreState, 'products' | 'cart'>> = {}
) => {
  return createStore<StoreState>((set) => ({
    ...defaultState,
    ...initialState,

    // Actions
    setSearchQuery: (query: string) =>
      set(() => ({ searchQuery: query })),

    addToCart: (product: Product) =>
      set((state) => {
        // Избегаем дубликатов, если нужно (по желанию, но пока просто добавляем)
        const exists = state.cart.find((p) => p.id === product.id);
        if (exists) return state; // Или увеличить счетчик, если бы он был
        return { cart: [...state.cart, product] };
      }),

    removeFromCart: (productId: number) =>
      set((state) => ({
        cart: state.cart.filter((p) => p.id !== productId),
      })),
  }));
};