import { type ChangeEvent } from 'react';
import { useAppStore } from '@/shared/store';

type Props = {
  className?: string;
};

export const SearchInput = ({ className = '' }: Props) => {
  // Достаем значение и экшен из стора
  const searchQuery = useAppStore((state) => state.searchQuery);
  const setSearchQuery = useAppStore((state) => state.setSearchQuery);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <input
      type='text'
      value={searchQuery}
      onChange={handleChange}
      placeholder='Поиск...'
      className={`w-full max-w-xl rounded-full bg-white px-6 py-3 text-black placeholder-gray-500 transition-all outline-none focus:ring-2 focus:ring-white/50 ${className}`}
    />
  );
};