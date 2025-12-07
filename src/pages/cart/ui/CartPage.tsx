import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { MobileNav } from '@/widgets/mobile-nav';
import { CartItemRow } from '@/entities/cart-item';
import { useAppStore } from '@/shared/store';

export const CartPage = () => {
  const cart = useAppStore((state) => state.cart);
  const toggleAll = useAppStore((state) => state.toggleAllSelection);
  
  // Вычисляем данные для "Summary" (правая колонка)
  const selectedItems = cart.filter((item) => item.isSelected);
  
  // Сумма без скидки (считаем по oldPrice, если есть, иначе по price)
  const totalOriginalPrice = selectedItems.reduce(
    (acc, item) => acc + (item.oldPrice || item.price) * item.quantity, 
    0
  );
  
  // Реальная сумма к оплате
  const totalPrice = selectedItems.reduce(
    (acc, item) => acc + item.price * item.quantity, 
    0
  );

  const totalDiscount = totalOriginalPrice - totalPrice;
  const isAllSelected = cart.length > 0 && cart.every((item) => item.isSelected);

  const removeSelected = useAppStore((state) => state.removeSelectedItems); 

  return (
    <>
      <Header />
      <main className='mx-auto max-w-7xl px-4 py-8 pb-24 md:pb-8'>
        <h1 className='mb-8 text-3xl font-bold font-handwritten'>Cart</h1>

        {cart.length === 0 ? (
          <p className='text-xl text-gray-500'>Ваша корзина пуста</p>
        ) : (
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
            {/* === Левая колонка (Список) === */}
            <div className='lg:col-span-2 space-y-4'>
              
              {/* 1. Панель "Выбрать все" */}
              <div className='flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
                <label className='flex cursor-pointer items-center gap-3 font-medium'>
                  <input
                    type='checkbox'
                    checked={isAllSelected}
                    onChange={(e) => toggleAll(e.target.checked)}
                    className='h-5 w-5 rounded border-gray-300 accent-black'
                  />
                  Select all
                </label>
                <button 
                  onClick={removeSelected}
                  className='text-gray-400 hover:text-red-500'
                  title="Удалить выбранные"
                >
                  🗑
                </button>
              </div>

              {/* 2. Список товаров */}
              <div className='space-y-4'>
                {cart.map((item) => (
                  <CartItemRow key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* === Правая колонка (Итоги) === */}
            <div className='h-fit rounded-2xl border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
              <div className='mb-6 flex items-center justify-between'>
                <h2 className='text-xl font-bold'>Your Cart</h2>
                <span className='text-sm text-gray-500'>{selectedItems.length} Products</span>
              </div>

              <div className='space-y-3 border-b border-gray-200 pb-6 text-sm'>
                <div className='flex justify-between'>
                  <span>Products ({selectedItems.length})</span>
                  <span className='font-medium'>{totalOriginalPrice} ₽</span>
                </div>
                <div className='flex justify-between text-red-500'>
                  <span>Discount</span>
                  <span>- {totalDiscount} ₽</span>
                </div>
              </div>

              <div className='mt-6 flex justify-between text-xl font-bold'>
                <span>Total</span>
                <span>{totalPrice} ₽</span>
              </div>

              <button className='mt-6 w-full rounded border-2 border-black bg-gray-100 py-3 font-bold transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-y-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'>
                Proceed to checkout
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
      <MobileNav />
    </>
  );
};