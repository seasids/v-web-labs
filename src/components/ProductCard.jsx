import { useState } from 'react';
import { useCartStore } from '../store/cartStore';

export default function ProductCard({ title }) {
  const [isInCart, setIsInCart] = useState(false);
  const { addToCart, removeFromCart } = useCartStore();

  const handleCartClick = () => {
    if (isInCart) {
      removeFromCart();
    } else {
      addToCart();
    }
    setIsInCart(!isInCart);
  };

  return (
    <article className='relative rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'>
      <div className='relative'>
        <img
          src='/images/placeholder.jpg'
          alt={title}
          className='h-52 w-full rounded-xl bg-gray-200 object-cover'
        />
        <button className='absolute top-3 right-3 text-3xl transition-transform hover:scale-110'>
          ♡
        </button>
      </div>

      <p className='mt-3 text-lg font-bold text-red-600'>
        999 ₽ <span className='text-sm text-gray-500 line-through'>1199 ₽</span>
      </p>
      <h2 className='mt-1 text-lg font-medium'>{title}</h2>

      <button
        onClick={handleCartClick}
        className={`mt-4 w-full rounded-lg py-3 font-medium transition-all duration-300 ${
          isInCart ? 'bg-black text-white' : 'bg-gray-300 text-black hover:bg-gray-400'
        }`}
      >
        {isInCart ? 'В корзине' : 'В корзину'}
      </button>
    </article>
  );
}
