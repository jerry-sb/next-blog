'use client';
import * as React from 'react';
import { SlMenu } from 'react-icons/sl';
import { useNotionStore } from '@/app/stores/notion-store-provider';

const BuggerButton = () => {
  const updateCategoryNavigation = useNotionStore(
    (state) => state.updateCategoryNavigation
  );

  return (
    <button
      onClick={updateCategoryNavigation}
      className={'p-2 border border-[var(--fg)]'}
    >
      <SlMenu size={25} />
    </button>
  );
};

export default BuggerButton;
