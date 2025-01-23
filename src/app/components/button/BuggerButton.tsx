'use client';
import * as React from 'react';
import { SlMenu } from 'react-icons/sl';
import { useNotionStore } from '@/app/stores/notion-store-provider';
import { AiOutlineClose } from 'react-icons/ai';

const BuggerButton = () => {
  const categoryNavigation = useNotionStore(
    (state) => state.categoryNavigation
  );

  const updateCategoryNavigation = useNotionStore(
    (state) => state.updateCategoryNavigation
  );

  return (
    <button
      onClick={updateCategoryNavigation}
      className={'p-2 border border-[var(--fg)]'}
    >
      {categoryNavigation === 'hidden' && <SlMenu size={25} />}
      {categoryNavigation === 'visible' && <AiOutlineClose size={25} />}
    </button>
  );
};

export default BuggerButton;
