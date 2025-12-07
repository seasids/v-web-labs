export type Product = {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  category: 'hoodie' | 'shorts';
};

// Расширяем продукт для корзины
export type CartItem = Product & {
  quantity: number;   // Количество товара
  isSelected: boolean; // Выбрана ли галочка
};

export type StoreState = {
  products: Product[];
  searchQuery: string;
  cart: CartItem[]; // Теперь храним CartItem, а не Product

  setSearchQuery: (query: string) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  
  // Новые действия для корзины
  toggleItemSelection: (id: number) => void;
  toggleAllSelection: (isSelected: boolean) => void;
  updateQuantity: (id: number, delta: number) => void; // delta может быть +1 или -1
  removeSelectedItems: () => void;
};