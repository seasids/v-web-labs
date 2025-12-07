import { useAppStore } from '@/shared/store';

export const CartCounter = () => {
  // Селектор: достаем длину массива корзины
  const count = useAppStore((state) => state.cart.length);

  if (count === 0) return null;

  return (
    <span className='absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs text-white'>
      {count}
    </span>
  );
};