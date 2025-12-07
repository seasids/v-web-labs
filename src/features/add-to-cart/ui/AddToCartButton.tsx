import { useAppStore, type Product } from '@/shared/store';

type Props = {
  product: Product; // Кнопке нужен весь товар, чтобы положить его в стор
};

export const AddToCartButton = ({ product }: Props) => {
  // Селектор: проверяем наличие товара в массиве cart по ID
  const isInCart = useAppStore((state) => 
    state.cart.some((p) => p.id === product.id)
  );

  const addToCart = useAppStore((state) => state.addToCart);
  const removeFromCart = useAppStore((state) => state.removeFromCart);

  const handleClick = () => {
    if (isInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
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