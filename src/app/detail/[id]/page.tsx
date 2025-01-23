import {
  getBlogDetail,
  getBlogPreviewDetail,
  getBlogs,
} from '@/app/api/notion/database/getDatabase';
import Image from 'next/image';
import * as React from 'react';
import BlogDetailNavigation from '@/app/components/navigation/BlogDetailNavigation';
import BlockList from '@/app/components/BlockList';
import { StructureBlock } from '@/types/notion.model';
import getBlurImg from '@/lib/blur';

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.results.map((item) => ({
    id: item.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blogPreview = await getBlogPreviewDetail(id);
  const { Title } = blogPreview.properties;

  return {
    title: `${Title.title[0].plain_text} | SB Notes`,
    openGraph: {
      title: `${Title.title[0].plain_text} | SB Notes`,
      description: '안녕하세요. 웹 프론트엔드 개발자 심명보입니다.',
      images: [{ url: '/og-image.png' }],
      locale: 'kr_KR',
      type: 'website',
    },
  };
}

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

  const structureBlocks: StructureBlock[] = notionBlocks.reduce((pv, block) => {
    if (
      block.type === 'heading_3' ||
      block.type === 'heading_1' ||
      block.type === 'heading_2'
    ) {
      // 새로운 헤더가 등장하면 새로운 섹션을 추가
      pv.push({ type: 'heading', title: block, children: [] });
      return pv;
    }

    if (pv.length > 0) {
      pv[pv.length - 1].children.push(block);
    }

    if (pv.length === 0 && block.type === 'callout') {
      pv.push({ type: 'callout', children: [block] });
    }

    return pv;
  }, [] as StructureBlock[]);

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

const PagePreview = async ({
  title,
  coverImage,
}: {
  title: string;
  coverImage: string;
}) => {
  const blurPreview = await getBlurImg(coverImage);

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
          blurDataURL={blurPreview}
        />
      </div>
    </header>
  );
};
