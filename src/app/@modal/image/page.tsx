'use client';

import * as React from 'react';
import { Modal } from '@/app/components/common/Modal';
import { useNotionStore } from '@/app/stores/notion-store-provider';

export default function ModalImagePage() {
  const clickImage = useNotionStore((state) => state.clickImage);

  return (
    <Modal>
      <div
        className="relative w-full max-w-[1000px] mx-auto
          h-[100vh] sm:h-[80vh] bg-transparent
          p-4 flex items-center justify-center"
      >
        {clickImage && (
          <img
            src={clickImage}
            alt="image"
            className="max-w-full max-h-full object-contain rounded shadow-xl"
          />
        )}
      </div>
    </Modal>
  );
}
