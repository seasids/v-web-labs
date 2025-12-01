// src/pages/home/ui/HomePage.jsx
import { useState } from 'react';
import { Header } from '@/widgets/header';
import { MobileNav } from '@/widgets/mobile-nav';
import { Footer } from '@/widgets/footer';
import { ProductCard } from '@/entities/product';
import { SearchInput } from '@/features/search';

type ProductMock = {
  title: string;
};

const mockHoodies: ProductMock[] = Array.from({ length: 6 }, () => ({ title: 'Худи с принтом' }));
const mockShorts: ProductMock[] = Array.from({ length: 6 }, () => ({ title: 'Шорты с принтом' }));

export const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterProducts = (products: ProductMock[]): ProductMock[] =>
    products.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const visibleHoodies = filterProducts(mockHoodies);
  const visibleShorts = filterProducts(mockShorts);

  return (
    <>
      
      <Header onSearch={setSearchQuery} />
      <main className='mx-auto max-w-7xl px-4 pb-24 md:pb-8'>
        {/* Поиск только на мобильных (на десктопе он в Header) */}
        <SearchInput onSearch={setSearchQuery} className='mb-8 block w-full md:hidden' />

        {/* === Худи === */}
        {visibleHoodies.length > 0 && (
          <>
            <h1 className='mt-10 mb-6 text-3xl font-bold'>Худи</h1>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
              {visibleHoodies.map((_, i) => (
                <ProductCard key={`hoodie-${i}`} title='Худи с принтом' />
              ))}
            </div>
          </>
        )}

        {/* === Шорты === */}
        {visibleShorts.length > 0 && (
          <>
            <h1 className='mt-16 mb-6 text-3xl font-bold'>Шорты</h1>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
              {visibleShorts.map((_, i) => (
                <ProductCard key={`shorts-${i}`} title='Шорты с принтом' />
              ))}
            </div>
          </>
        )}

        {/* Если ничего не найдено */}
        {visibleHoodies.length === 0 && visibleShorts.length === 0 && searchQuery && (
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
