export type Product = {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  category: 'hoodie' | 'shorts';
};

export type StoreState = {
  // === Состояние (Data) ===
  products: Product[];
  searchQuery: string;
  cart: Product[]; // Храним список товаров в корзине, чтобы считать сумму и количество

  // === Действия (Actions) ===
  // Установить строку поиска (для глобального поиска)
  setSearchQuery: (query: string) => void;
  
  // Добавить товар в корзину
  addToCart: (product: Product) => void;
  
  // Удалить товар из корзины по ID
  removeFromCart: (productId: number) => void;
};