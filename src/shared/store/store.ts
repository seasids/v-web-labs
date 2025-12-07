import { createStore } from 'zustand';
import { type StoreState} from './types';

const defaultState = {
  products: [],
  cart: [],
  searchQuery: '',
};

export const createAppStore = (
  initialState: Partial<Pick<StoreState, 'products'>> = {}
) => {
  return createStore<StoreState>((set) => ({
    ...defaultState,
    ...initialState,

    setSearchQuery: (query) => set({ searchQuery: query }),

    addToCart: (product) =>
      set((state) => {
        const existingItem = state.cart.find((item) => item.id === product.id);

        if (existingItem) {
          // Если товар уже есть, увеличиваем кол-во, но не больше 10 (например)
          return {
            cart: state.cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        }

        // Если товара нет, добавляем с quantity: 1 и isSelected: true
        return {
          cart: [...state.cart, { ...product, quantity: 1, isSelected: true }],
        };
      }),

    removeSelectedItems: () =>
      set((state) => ({
        cart: state.cart.filter((item) => !item.isSelected),
      })),

    removeFromCart: (id) =>
      set((state) => ({
        cart: state.cart.filter((item) => item.id !== id),
      })),

    // Переключение галочки у одного товара
    toggleItemSelection: (id) =>
      set((state) => ({
        cart: state.cart.map((item) =>
          item.id === id ? { ...item, isSelected: !item.isSelected } : item
        ),
      })),

    // Выбрать все / Снять все
    toggleAllSelection: (isSelected) =>
      set((state) => ({
        cart: state.cart.map((item) => ({ ...item, isSelected })),
      })),

    // Изменение количества (+1 или -1)
    updateQuantity: (id, delta) =>
      set((state) => ({
        cart: state.cart.map((item) => {
          if (item.id !== id) return item;
          const newQuantity = item.quantity + delta;
          // Не даем уйти в минус или 0
          return { ...item, quantity: Math.max(1, newQuantity) };
        }),
      })),
  }));
};