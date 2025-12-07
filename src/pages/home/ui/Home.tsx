import { Header } from '@/widgets/header';
import { MobileNav } from '@/widgets/mobile-nav';
import { Footer } from '@/widgets/footer';
import { ProductCard } from '@/entities/product';
import { SearchInput } from '@/features/search';
import { useAppStore } from '@/shared/store';

export const HomePage = () => {
  // 1. Получаем данные из глобального стора через наш хук
  const products = useAppStore((state) => state.products);
  const searchQuery = useAppStore((state) => state.searchQuery);

  // 2. Реализуем глобальный поиск: фильтруем товары на основе searchQuery из стора
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 3. Разделяем отфильтрованные товары по категориям
  const visibleHoodies = filteredProducts.filter((p) => p.category === 'hoodie');
  const visibleShorts = filteredProducts.filter((p) => p.category === 'shorts');

  return (
    <>
      {/* Header теперь не требует пропсов, он сам подключен к стору */}
      <Header />
      
      <main className='mx-auto max-w-7xl px-4 pb-24 md:pb-8'>
        {/* Мобильный поиск тоже сам подключен к стору */}
        <SearchInput className='mb-8 block w-full md:hidden' />

        {/* === Худи === */}
        {visibleHoodies.length > 0 && (
          <>
            <h1 className='mt-10 mb-6 text-3xl font-bold'>Худи</h1>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
              {visibleHoodies.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

        {/* === Шорты === */}
        {visibleShorts.length > 0 && (
          <>
            <h1 className='mt-16 mb-6 text-3xl font-bold'>Шорты</h1>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
              {visibleShorts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

        {/* Если ничего не найдено */}
        {visibleHoodies.length === 0 && visibleShorts.length === 0 && (
          <p className='mt-20 text-center text-xl text-gray-500'>
            Ничего не найдено по запросу "{searchQuery}"
          </p>
        )}
      </main>

      <Footer />
      <MobileNav />
    </>
  );
};