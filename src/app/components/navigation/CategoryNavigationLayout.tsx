'use client';
import * as React from 'react';
import { useNotionStore } from '@/app/stores/notion-store-provider';

const CategoryNavigationLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const categoryNavigation = useNotionStore(
    (state) => state.categoryNavigation
  );

  return <nav className={'side-nav'}>{children}</nav>;
};

export default CategoryNavigationLayout;
