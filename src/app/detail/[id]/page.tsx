import {
  getBlogDetail,
  getBlogPreviewDetail,
} from '@/app/api/notion/database/getDatabase';
import { formatDate } from '@/lib/util';
import Image from 'next/image';
import * as React from 'react';

export default async function BlogDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const { properties, icon, cover } = await getBlogPreviewDetail(id);
  const notionBlocks = await getBlogDetail(id);

  const title =
    (icon ? `${icon.emoji} ` : '') + properties.Title.title[0].plain_text;
  const coverImage = cover?.file.url ?? '';

  return (
    <div className="flex w-full mt-20  justify-center mx-auto relative">
      <article className={'max-w-[850px] w-full lg:w-[850px] min-h-[8000px]'}>
        <PagePreview
          title={title}
          coverImage={coverImage}
          insertDate={formatDate(properties.InsertDate.date.start)}
        />
      </article>
      <div className={'relative w-[0px] lg:w-[200px]'}>
        <nav
          className={'top-[100px] w-[0px] lg:w-[200px] h-[500px] sticky'}
        ></nav>
      </div>
    </div>
  );
}

const PagePreview = ({
  title,
  coverImage,
  insertDate,
}: {
  title: string;
  coverImage: string;
  insertDate: string;
}) => {
  return (
    <>
      <h1 className={'head-text1'}>{title}</h1>
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
    </>
  );
};
