'use client';
import * as React from 'react';
import { Modal } from '@/app/components/modal/Modal';
import { useNotionStore } from '@/app/stores/notion-store-provider';

const ImageModal = () => {
  const modalFlag = useNotionStore((state) => state.modalFlag)['image'];
  const imageModalUrl = useNotionStore((state) => state.imageModalUrl);
  const updateModalFlag = useNotionStore((state) => state.updateModalFlag);

  return (
    <Modal
      isVisible={modalFlag}
      setIsVisible={() => {
        updateModalFlag('image');
      }}
    >
      <div
        className="relative w-full max-w-[1000px] mx-auto
          h-[100vh] sm:h-[80vh] bg-transparent
          p-4 flex items-center justify-center"
      >
        {imageModalUrl && (
          <img
            src={imageModalUrl}
            alt="image"
            className="max-w-full max-h-full object-contain rounded shadow-xl"
          />
        )}
      </div>
    </Modal>
  );
};

export default ImageModal;
