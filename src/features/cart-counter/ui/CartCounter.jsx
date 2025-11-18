import { useCartStore } from '@/shared/lib/CartStore';

export const CartCounter = () => {
  const count = useCartStore((s) => s.cartCount);
  if (!count) return null;
  return (
    <span className='absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs text-white'>
      {count}
    </span>
  );
};
