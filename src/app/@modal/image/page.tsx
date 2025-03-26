import * as React from 'react';
import { Modal } from '@/app/components/common/Modal';
import { getPublishedImageUrl } from '@/lib/util';

interface ModalProps {
  searchParams: Promise<{ imageUrl: string; blockId: string }>;
}

export default async function ModalImagePage({ searchParams }: ModalProps) {
  const { imageUrl, blockId } = await searchParams;
  const blockImage = getPublishedImageUrl(
    decodeURIComponent(imageUrl),
    blockId
  );

  return (
    <Modal>
      <div
        className="relative w-full max-w-[1000px] mx-auto
          h-[100vh] sm:h-[80vh] bg-transparent
          p-4 flex items-center justify-center"
      >
        {imageUrl && (
          <img
            src={blockImage}
            alt="image"
            className="max-w-full max-h-full object-contain rounded shadow-xl"
          />
        )}
      </div>
    </Modal>
  );
}
