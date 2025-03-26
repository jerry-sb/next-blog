'use client';
import * as React from 'react';
import { useNotionStore } from '@/app/stores/notion-store-provider';
import ImageModal from '@/app/components/modal/ImageModal';

const ModalFlag = () => {
  const imageFlag = useNotionStore((state) => state.modalFlag)['image'];

  return <>{imageFlag && <ImageModal />}</>;
};

export default ModalFlag;
