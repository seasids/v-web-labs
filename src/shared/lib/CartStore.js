import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cartCount: 0,

  addToCart: () =>
    set((state) => ({
      cartCount: state.cartCount + 1,
    })),

  removeFromCart: () =>
    set((state) => ({
      cartCount: Math.max(0, state.cartCount - 1),
    })),
}));
