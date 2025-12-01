import { useState, type ChangeEvent } from 'react';

type Props = {
  onSearch?: (query: string) => void;
  className?: string;
};

export const SearchInput = ({ onSearch = () => {}, className = ''}: Props) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // передаём наверх (в HomePage)
  };

  return (
    <input
      type='text'
      value={query}
      onChange={handleChange}
      placeholder='Поиск...'
      className={`w-full max-w-xl rounded-full bg-white px-6 py-3 text-black placeholder-gray-500 transition-all outline-none focus:ring-2 focus:ring-white/50 ${className}`}
    />
  );
};
