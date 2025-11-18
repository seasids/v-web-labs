// src/widgets/mobile-nav/ui/MobileNav.jsx
import { CartCounter } from '@/features/cart-counter';

export const MobileNav = () => {
  return (
    <nav className='fixed right-0 bottom-0 left-0 z-50 bg-black py-3 text-white md:hidden'>
      <div className='flex items-center justify-around'>
        <button className='flex flex-col items-center'>
          <img src='/icon/home.jpg' alt='Главная' className='h-6 w-6' />
          <span className='mt-1 text-xs'>Главная</span>
        </button>

        <button className='flex flex-col items-center'>
          <img src='/icon/favorites.jpg' alt='Избранное' className='h-6 w-6' />
          <span className='mt-1 text-xs'>Избранное</span>
        </button>

        <button className='relative flex flex-col items-center'>
          <img src='/icon/cart.jpg' alt='Корзина' className='h-6 w-6' />
          <CartCounter />
          <span className='mt-1 text-xs'>Корзина</span>
        </button>
      </div>
    </nav>
  );
};
