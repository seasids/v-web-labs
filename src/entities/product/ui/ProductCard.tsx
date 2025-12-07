import { AddToCartButton } from '@/features/add-to-cart';
import { type Product } from '@/shared/store';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  return (
    <article className='relative rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'>
      <div className='relative'>
        <img
          src='/images/placeholder.jpg'
          alt={product.title}
          className='h-52 w-full rounded-xl bg-gray-200 object-cover'
        />
        <button className='absolute top-3 right-3 text-3xl transition-transform hover:scale-110'>
          Heart
        </button>
      </div>

      <p className='mt-3 text-lg font-bold text-red-600'>
        {product.price} ₽{' '}
        {product.oldPrice && (
          <span className='ml-2 text-sm text-gray-500 line-through'>
            {product.oldPrice} ₽
          </span>
        )}
      </p>
      <h2 className='mt-1 text-lg font-medium'>{product.title}</h2>

      {/* Передаем объект продукта в "умную" кнопку */}
      <AddToCartButton product={product} />
    </article>
  );
};