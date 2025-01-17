'use client';
import * as React from 'react';
import { useNotionStore } from '@/app/stores/notion-store-provider';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const CategoryNavigationLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const categoryNavigation = useNotionStore(
    (state) => state.categoryNavigation
  );

  const updateCategoryNavigation = useNotionStore(
    (state) => state.updateCategoryNavigation
  );

  useEffect(() => {
    if (pathname.includes('/detail')) {
      return;
    }

    const handleResize = () => {
      if (window.innerWidth > 1024 && categoryNavigation === 'hidden') {
        updateCategoryNavigation();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [pathname, categoryNavigation, updateCategoryNavigation]);

  return (
    <nav className="side-nav" data-category-navigation={categoryNavigation}>
      {children}
    </nav>
  );
};

export default CategoryNavigationLayout;
