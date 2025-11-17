import { useState } from 'react';
import Header from '../components/Header';
import ProductSection from '../components/ProductSection';
import MobileNav from '../components/MobileNav';
import Footer from '../components/Footer';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Header onSearch={setSearchQuery} />
      <main className='mx-auto max-w-7xl px-4 pb-24 md:pb-8'>
        <ProductSection searchQuery={searchQuery} />
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
