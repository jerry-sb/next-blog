import {
  getBlogDetail,
  getBlogPreviewDetail,
} from '@/app/api/notion/database/getDatabase';
import Image from 'next/image';
import * as React from 'react';
import BlogDetailNavigation from '@/app/components/navigation/BlogDetailNavigation';
import { NotionBlock, NotionBlockResponse } from '@/types/notion.block';
import BlockList from '@/app/components/BlockList';

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { properties, icon, cover } = await getBlogPreviewDetail(id);
  const notionBlocks = await getBlogDetail(id);
  const headingBlocks = notionBlocks.filter((block) => {
    if (
      block.type === 'heading_3' ||
      block.type === 'heading_1' ||
      block.type === 'heading_2'
    ) {
      return true;
    }
  });

  const structureBlocks: {
    title?: NotionBlock;
    children: NotionBlockResponse;
  }[] = notionBlocks.reduce(
    (pv, block) => {
      if (
        block.type === 'heading_3' ||
        block.type === 'heading_1' ||
        block.type === 'heading_2'
      ) {
        // 새로운 헤더가 등장하면 새로운 섹션을 추가
        pv.push({ title: block, children: [] });
        return pv;
      }

      if (pv.length > 0) {
        pv[pv.length - 1].children.push(block);
      }

      if (pv.length === 0) {
        pv.push({ children: [block] });
      }

      return pv;
    },
    [] as { title?: NotionBlock; children: NotionBlockResponse }[]
  );

  const title =
    (icon ? `${icon.emoji} ` : '') + properties.Title.title[0].plain_text;
  const coverImage = cover?.file.url ?? '';

  return (
    <div className="flex w-full mt-10 justify-center mx-auto relative">
      <article
        className={
          'max-w-[900px] w-full lg:w-[900px] p-4 mr-0 lg:mr-10 animate-opacityTransX'
        }
      >
        <PagePreview
          title={title}
          coverImage={coverImage}
          // insertDate={formatDate(properties.InsertDate.date.start)}
        />
        <BlockList structureBlock={structureBlocks} />
      </article>
      <div className={'relative w-[0px] lg:w-[300px] mr-0 lg:mr-10'}>
        <BlogDetailNavigation blocks={headingBlocks} />
      </div>
    </div>
  );
}

const PagePreview = ({
  title,
  coverImage,
}: {
  title: string;
  coverImage: string;
}) => {
  return (
    <header>
      <h1 className={'head-text2 lg:head-text1 head-color'}>{title}</h1>
      <div className="relative w-full h-[450px] rounded-[15px] overflow-hidden my-14">
        <Image
          className="object-cover"
          src={coverImage}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 80vw"
          priority
        />
      </div>
    </header>
  );
};
