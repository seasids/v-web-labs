import { Link } from 'react-router-dom'; // Добавляем импорт
import { SearchInput } from '@/features/search';
import { CartCounter } from '@/features/cart-counter';

export const Header = () => {
  return (
    <header className='sticky top-0 z-50 bg-black py-4 text-white'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4'>
        {/* Ссылка на Главную */}
        <Link to="/" className='hidden md:block'>
          <img src='/icon/home.jpg' alt='Главная' className='h-6 w-6' />
        </Link>

        <SearchInput className='hidden md:block' />

        <div className='hidden items-center gap-8 md:flex'>
          <button>
            <img src='/icon/favorites.jpg' alt='Избранное' className='h-6 w-6' />
          </button>

          {/* Ссылка на Корзину */}
          <Link to="/cart" className='relative'>
            <img src='/icon/cart.jpg' alt='Корзина' className='h-6 w-6' />
            <CartCounter />
          </Link>
        </div>
      </div>
    </header>
  );
};