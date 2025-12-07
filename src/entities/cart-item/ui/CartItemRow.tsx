import { type CartItem, useAppStore } from '@/shared/store';

type Props = {
  item: CartItem;
};

export const CartItemRow = ({ item }: Props) => {
  // Достаем экшены из стора
  const toggleSelection = useAppStore((s) => s.toggleItemSelection);
  const updateQuantity = useAppStore((s) => s.updateQuantity);
  const removeFromCart = useAppStore((s) => s.removeFromCart);

  return (
    <div className='flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center'>
      {/* 2.2 Галочка выбора */}
      <div className='flex items-center gap-4'>
        <input
          type='checkbox'
          checked={item.isSelected}
          onChange={() => toggleSelection(item.id)}
          className='h-5 w-5 rounded border-gray-300 accent-black'
        />
        
        {/* 2.3 Картинка */}
        <img
          src='/images/placeholder.jpg'
          alt={item.title}
          className='h-24 w-24 rounded-lg bg-gray-200 object-cover'
        />
      </div>

      <div className='flex flex-1 flex-col gap-2 sm:flex-row sm:justify-between'>
        <div className='space-y-1'>
          <h3 className='font-medium text-lg'>{item.title}</h3>
          
          {/* 2.4 Кнопки действий */}
          <div className='flex gap-3'>
             <button className='text-gray-400 hover:text-red-500'>
               {/* Тут иконка сердца */}
               ♡
             </button>
             <button 
               onClick={() => removeFromCart(item.id)}
               className='text-gray-400 hover:text-red-500'
             >
               {/* Тут иконка мусорки */}
               🗑
             </button>
             {/* Неактивная кнопка Buy (как в описании) */}
             <button disabled className='rounded border px-3 py-1 text-xs text-gray-400 opacity-50 cursor-not-allowed'>
               Buy
             </button>
          </div>
        </div>

        <div className='flex items-center justify-between gap-6 sm:flex-col sm:items-end sm:justify-center sm:gap-2'>
            {/* 2.5 Цена */}
            <div className='text-right'>
                <p className='font-bold text-lg'>{item.price * item.quantity} ₽</p>
                {item.oldPrice && (
                    <p className='text-sm text-gray-400 line-through'>
                        {item.oldPrice * item.quantity} ₽
                    </p>
                )}
            </div>

            {/* 2.6 Количество (+ / -) */}
            <div className='flex items-center gap-3 rounded-lg border border-gray-300 px-2 py-1'>
                <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    className='px-2 text-lg font-medium hover:text-gray-600'
                >
                    −
                </button>
                <span className='w-4 text-center font-medium'>{item.quantity}</span>
                <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className='px-2 text-lg font-medium hover:text-gray-600'
                >
                    +
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};