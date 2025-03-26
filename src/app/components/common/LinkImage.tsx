'use client';

import * as React from 'react';
import Image from 'next/image';
import { getPublishedImageUrl } from '@/lib/util';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useNotionStore } from '@/app/stores/notion-store-provider';

const LinkImage = ({ url, blockId }: { url: string; blockId: string }) => {
  const updateClickImage = useNotionStore((state) => state.updateClickImage);
  const router = useRouter();
  const blockImage = getPublishedImageUrl(url, blockId);
  const onClickImage = useCallback(() => {
    updateClickImage(blockImage);
    router.replace('/image');
  }, [router]);

  return (
    <div
      onClick={onClickImage}
      className={'relative w-full p-5 h-auto cursor-pointer'}
    >
      <Image src={blockImage} alt="image" width={800} height={600} />
    </div>
  );
};

export default LinkImage;
