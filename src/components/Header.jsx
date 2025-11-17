import { useCartStore } from '../store/cartStore';
import { useState } from 'react';

export default function Header({ onSearch }) {
  const cartCount = useCartStore((s) => s.cartCount);
  const [query, setQuery] = useState('');

  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <header className="bg-black text-white py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <button className="hidden md:block">
          <img src="/icon/home.jpg" alt="Home" className="w-6 h-6" />
        </button>

        <input
          type="text"
          value={query}
          onChange={handleInput}
          placeholder="Поиск..."
          className="flex-1 max-w-xl mx-4 px-6 py-3 rounded-full bg-white text-black placeholder-gray-500 outline-none focus:ring-2 focus:ring-white/50 transition-all md:flex hidden"
        />

        <div className="hidden md:flex items-center gap-6">
          <button>
            <img src="/icon/favorites.jpg" alt="Favorites" className="w-6 h-6" />
          </button>
          <button className="relative">
            <img src="/icon/cart.jpg" alt="Cart" className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}