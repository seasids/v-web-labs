import { createContext, useContext, useState, type ReactNode } from 'react';
import { useStore as useZustandStore, type StoreApi } from 'zustand';
import { type StoreState } from './types';
import { createAppStore } from './store';

// 1. Создаем контекст для хранения самого экземпляра стора
export const StoreContext = createContext<StoreApi<StoreState> | null>(null);

type ProviderProps = {
  children: ReactNode;
  initialState?: Partial<Pick<StoreState, 'products' | 'cart'>>;
};

// 2. Провайдер, который инициализирует стор
export const StoreProvider = ({ children, initialState }: ProviderProps) => {
  // Используем useState с инициализатором, чтобы стор создался ровно один раз
  // (Методичка, стр. 5)
  const [store] = useState(() => createAppStore(initialState));

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

// 3. Кастомный хук для использования стора в компонентах
// Реализуем вариант с callback-селектором (Методичка, стр. 8)
export const useAppStore = <T,>(selector: (state: StoreState) => T): T => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error('useAppStore must be used within a StoreProvider');
  }

  // useZustandStore связывает ванильный стор с React-реактивностью
  return useZustandStore(store, selector);
};