import { useState, useRef, useEffect, type ChangeEvent } from 'react';
import { useAppStore } from '@/shared/store';

type Props = {
  className?: string;
};

export const SearchInput = ({ className = '' }: Props) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Достаем товары и методы из стора
  const products = useAppStore((s) => s.products);
  const addToCart = useAppStore((s) => s.addToCart);
  
  // Локальная фильтрация для выпадающего списка
  const filteredProducts = query
    ? products.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
    : [];

  // Обработчик ввода
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
    
    // Если нужно сохранить глобальную фильтрацию на Главной странице, 
    // можно оставить и этот вызов, но по новому ТЗ поиск работает как dropdown.
    // Если уберешь эту строку — главная страница перестанет фильтроваться.
    // useAppStore.getState().setSearchQuery(e.target.value); 
  };

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full max-w-xl ${className}`}>
      <input
        type='text'
        value={query}
        onChange={handleChange}
        onFocus={() => setIsOpen(true)}
        placeholder='Поиск...'
        className='w-full rounded-full bg-white px-6 py-3 text-black placeholder-gray-500 transition-all outline-none focus:ring-2 focus:ring-white/50 border border-transparent focus:border-gray-300'
      />

      {/* Выпадающий список */}
      {isOpen && query && filteredProducts.length > 0 && (
        <div className='absolute top-full left-0 right-0 mt-2 max-h-96 overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-xl z-50'>
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className='flex items-center gap-4 border-b border-gray-100 last:border-0 p-3 hover:bg-gray-50'
            >
              {/* Картинка */}
              <img 
                src='/images/placeholder.jpg' 
                alt={product.title} 
                className='h-12 w-12 rounded bg-gray-200 object-cover'
              />
              
              {/* Инфо */}
              <div className='flex-1 min-w-0'>
                <h4 className='truncate text-sm font-medium text-black'>{product.title}</h4>
                <div className='flex items-center gap-2'>
                  <span className='font-bold text-red-500'>{product.price} ₽</span>
                  {product.oldPrice && (
                    <span className='text-xs text-gray-400 line-through'>
                      {product.oldPrice} ₽
                    </span>
                  )}
                </div>
              </div>

              {/* Кнопки действий (иконками) */}
              <div className='flex gap-2'>
                <button 
                  className='rounded-full p-2 hover:bg-gray-200 text-gray-500'
                  title="В избранное"
                >
                  ♡
                </button>
                <button 
                  onClick={() => addToCart(product)}
                  className='rounded-full p-2 hover:bg-gray-200 text-black'
                  title="В корзину"
                >
                  <img src='/icon/cart.jpg' alt='Buy' className='w-5 h-5' />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isOpen && query && filteredProducts.length === 0 && (
        <div className='absolute top-full left-0 right-0 mt-2 rounded-2xl border border-gray-200 bg-white p-4 text-center text-gray-500 shadow-xl z-50'>
          Товары не найдены
        </div>
      )}
    </div>
  );
};