import { useState } from 'react';
import { AddToCartButton } from '@/features/add-to-cart';

type Props = {
  title?: string;
};

export const ProductCard = ({ title = 'Худи с принтом' }: Props) => {
  const [isInCart, setIsInCart] = useState(false);

  return (
    <article className='relative rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'>
      <div className='relative'>
        <img
          src='/images/placeholder.jpg'
          alt={title}
          className='h-52 w-full rounded-xl bg-gray-200 object-cover'
        />
        <button className='absolute top-3 right-3 text-3xl transition-transform hover:scale-110'>
          Heart
        </button>
      </div>

      <p className='mt-3 text-lg font-bold text-red-600'>
        999 ₽ <span className='text-sm text-gray-500 line-through'>1199 ₽</span>
      </p>
      <h2 className='mt-1 text-lg font-medium'>{title}</h2>

      {/* ← Вот сюда вставляем фичу, а не логику */}
      <AddToCartButton isInCart={isInCart} onToggle={() => setIsInCart((prev) => !prev)} />
    </article>
  );
};
