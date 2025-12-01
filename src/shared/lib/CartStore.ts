import { create } from 'zustand';

type CartStore = {
  cartCount: number;
 addToCart: () => void;
 removeFromCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cartCount: 0,
  addToCart: () => set((state) => ({ cartCount: state.cartCount + 1 })),
  removeFromCart: () =>
    set((state) => ({ cartCount: Math.max(0, state.cartCount - 1) })),
}));
