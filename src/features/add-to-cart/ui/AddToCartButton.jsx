import { useCartStore } from '@/shared/lib/CartStore';

export const AddToCartButton = ({ isInCart, onToggle }) => {
  const { addToCart, removeFromCart } = useCartStore();

  const handleClick = () => {
    if (isInCart) {
      removeFromCart();
    } else {
      addToCart();
    }
    onToggle();
  };

  return (
    <button
      onClick={handleClick}
      className={`mt-4 w-full rounded-lg py-3 font-medium transition-all duration-300 ${
        isInCart ? 'bg-black text-white' : 'bg-gray-300 text-black hover:bg-gray-400'
      }`}
    >
      {isInCart ? 'В корзине' : 'В корзину'}
    </button>
  );
};
