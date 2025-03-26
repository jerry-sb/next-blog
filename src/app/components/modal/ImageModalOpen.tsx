'use client';

import { useNotionStore } from '@/app/stores/notion-store-provider';
import { useCallback } from 'react';

export default function ImageModalOpen({
  imageUrl,
  children,
}: {
  imageUrl: string;
  children: React.ReactNode;
}) {
  const updateModalFlag = useNotionStore((state) => state.updateModalFlag);
  const updateImageModalUrl = useNotionStore(
    (state) => state.updateImageModalUrl
  );

  const onClickModalOpen = useCallback(() => {
    updateModalFlag('image');
    updateImageModalUrl(imageUrl);
  }, []);

  return (
    <div className={'cursor-pointer'} onClick={onClickModalOpen}>
      {children}
    </div>
  );
}
