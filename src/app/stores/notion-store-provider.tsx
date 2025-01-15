'use client';

import { createNotionStore, NotionStore } from '@/app/stores/notion-store';
import { createContext, ReactNode, useContext, useRef } from 'react';
import { useStore } from 'zustand/react';

export type NotionStoreApi = ReturnType<typeof createNotionStore>;

export const NotionStoreContext = createContext<NotionStoreApi | undefined>(
  undefined
);

export interface NotionStoreProviderProps {
  children: ReactNode;
}

export const NotionStoreProvider = ({ children }: NotionStoreProviderProps) => {
  const storeRef = useRef<NotionStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createNotionStore();
  }

  return (
    <NotionStoreContext.Provider value={storeRef.current}>
      {children}
    </NotionStoreContext.Provider>
  );
};

export const useNotionStore = <T,>(selector: (store: NotionStore) => T): T => {
  const notionStoreContext = useContext(NotionStoreContext);

  if (!notionStoreContext) {
    throw new Error(`useNotionStore must be used within NotionStoreProvider`);
  }

  return useStore(notionStoreContext, selector);
};
