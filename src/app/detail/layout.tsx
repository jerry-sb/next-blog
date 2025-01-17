'use client';
import { useEffect } from 'react';
import { useNotionStore } from '@/app/stores/notion-store-provider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const updateCategoryNavigation = useNotionStore(
    (state) => state.updateCategoryNavigation
  );

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      updateCategoryNavigation();
    }

    return () => {
      if (window.innerWidth >= 1024) {
        updateCategoryNavigation();
      }
    };
  }, []);

  return <>{children}</>;
}
