import ProductCard from './ProductCard';

const hoodies = Array(6).fill({ title: 'Худи с принтом', category: 'hoodies' });
const shorts = Array(6).fill({ title: 'Шорты с принтом', category: 'shorts' });

export default function ProductSection({ searchQuery }) {
  const filterProducts = (products) =>
    products.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const visibleHoodies = filterProducts(hoodies);
  const visibleShorts = filterProducts(shorts);

  return (
    <>
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
    </>
  );
}
