import * as React from 'react';
import { NotionBlock } from '@/types/notion.block';
import { Annotations } from '@/types/notion.database';
import clsx from 'clsx';
import Spacer from '@/app/components/common/Spacer';
import { IoDocumentTextOutline } from 'react-icons/io5';
import CodeWrapper from '@/app/components/CodeWrapper';
import { StructureBlock } from '@/types/notion.model';
import { DiCodeigniter } from 'react-icons/di';
import {
  getBlockDetail,
  getTableBlock,
} from '@/app/api/notion/database/getDatabase';
import { getPublishedImageUrl } from '@/lib/util';
import Image from 'next/image';
import ImageModalOpen from '@/app/components/modal/ImageModalOpen';

const getTextClass = (annotations: Annotations) => {
  return clsx('head-text5-normal', {
    'font-bold': annotations.bold,
    italic: annotations.italic,
    'line-through': annotations.strikethrough,
    underline: annotations.underline,
    [`text-[${annotations.color}]`]: annotations.color !== 'default',
    'bg-zinc-800/20 text-red-400 font-mono px-1 py-0.5 rounded':
      annotations.code,
  });
};

const Block = async ({ block }: { block: NotionBlock }) => {
  if (block.type === 'bulleted_list_item') {
    const texts = block.bulleted_list_item.rich_text;
    const subBullets: React.ReactNode[] = [];

    if (block.has_children) {
      const subBulletDetail = await getBlockDetail(block.id);

      if (subBulletDetail.results.length > 0) {
        subBulletDetail.results.forEach((result, index) => {
          if (result.type === 'bulleted_list_item') {
            const texts = result.bulleted_list_item.rich_text;
            subBullets.push(
              <div
                key={`p${index + 1}`}
                className={
                  "my-3 px-5 relative pl-[30px] before:content-['🔸'] before:absolute before:left-0 before:text-[16px]"
                }
              >
                {texts.map((text, index) => (
                  <span
                    key={`p${index}`}
                    className={getTextClass(text.annotations)}
                  >
                    {text.plain_text}
                  </span>
                ))}
              </div>
            );
          }

          if (result.type === 'paragraph') {
            const texts = result.paragraph.rich_text;
            subBullets.push(
              <div key={`p${index + 1}`} className={'my-3 relative'}>
                {texts.map((text, index) => (
                  <span
                    key={`p${index}`}
                    className={getTextClass(text.annotations)}
                  >
                    {text.plain_text}
                  </span>
                ))}
              </div>
            );
          }
        });
      }
    }

    return (
      <div className="my-3 px-5 relative pl-[30px] before:content-['✅'] before:absolute before:left-0 before:text-[20px]">
        {texts.map((text, index) => (
          <span key={`p${index}`} className={getTextClass(text.annotations)}>
            {text.plain_text}
          </span>
        ))}
        {subBullets}
      </div>
    );
  }

  if (block.type === 'paragraph') {
    const texts = block.paragraph.rich_text;

    if (texts.length === 0) {
      return <Spacer size={50} d="vertical" />;
    }

    return (
      <div className="mb-5">
        {texts.map((text, index) => (
          <span key={`p${index}`} className={getTextClass(text.annotations)}>
            {text.plain_text}
          </span>
        ))}
      </div>
    );
  }

  if (block.type === 'heading_1') {
    const texts = block.heading_1.rich_text;
    const headingText = texts.map((text) => text.plain_text).join(' ');

    return <h1 className="head-text2 mb-6 head-color">{headingText}</h1>;
  }

  if (block.type === 'heading_2') {
    const texts = block.heading_2.rich_text;
    const headingText = texts.map((text) => text.plain_text).join(' ');

    return <h2 className="head-text3 mb-4 head-color">{headingText}</h2>;
  }

  if (block.type === 'heading_3') {
    const texts = block.heading_3.rich_text;
    const headingText = texts.map((text) => text.plain_text).join(' ');

    return <h3 className="head-text4 mb-2 head-color">{headingText}</h3>;
  }

  if (block.type === 'quote') {
    const quoteNodes: React.ReactNode[] = [
      <span
        key={`p0`}
        className={getTextClass(block.quote.rich_text[0].annotations)}
      >
        {block.quote.rich_text[0].plain_text}
      </span>,
    ];

    if (block.has_children) {
      const quote = await getBlockDetail(block.id);

      if (quote.results.length > 0) {
        quote.results.forEach((result, index) => {
          if (result.type === 'paragraph') {
            quoteNodes.push(
              <span
                key={`p${index + 1}`}
                className={getTextClass(
                  result.paragraph.rich_text[0].annotations
                )}
              >
                {result.paragraph.rich_text[0].plain_text}
              </span>
            );
          }
        });
      }
    }

    return (
      <div className="mb-5 pl-4 border-l-4 border-heading">{quoteNodes}</div>
    );
  }

  if (block.type === 'table') {
    const tableData = await getTableBlock(block.id);

    if (tableData) {
      return (
        <div className="overflow-x-auto w-full custom-scrollbar">
          <table>
            <thead>
              <tr>
                {tableData.header.map((item, index) => (
                  <th key={`th${index}`}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.columns.map((row, rowIndex) => (
                <tr key={`tr${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <td key={`td${rowIndex}-${cellIndex}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return <></>;
  }

  if (block.type === 'image') {
    const captionText = block.image.caption;
    const { url } = block.image?.external
      ? block.image.external
      : block.image.file;
    const blockImage = getPublishedImageUrl(url, block.id);

    return (
      <div className="mb-10">
        {captionText[0]?.plain_text && (
          <div className="bg-[var(--layout-bg)] flex items-center p-6 mb-3 rounded-[10px]">
            <IoDocumentTextOutline className="min-w-[60px]" size={30} />
            <div className="grow px-3">
              {captionText.map((text, index) => (
                <span key={index} className="head-text5-normal mb-8">
                  {text.plain_text}
                </span>
              ))}
            </div>
          </div>
        )}
        <ImageModalOpen imageUrl={blockImage}>
          <div className={'relative w-full p-5 h-auto'}>
            <Image src={blockImage} alt="image" width={800} height={600} />
          </div>
        </ImageModalOpen>
      </div>
    );
  }

  if (block.type === 'divider') {
    return <hr className="my-10 border border-[var(--layout-bg)]" />;
  }

  if (block.type === 'callout') {
    const texts = block.callout.rich_text;

    return (
      <div className="mb-2">
        {texts.map((text, index) => (
          <span key={`p${index}`} className={getTextClass(text.annotations)}>
            {text.plain_text}
          </span>
        ))}
      </div>
    );
  }

  if (block.type === 'code') {
    const captions = block.code.caption;
    const { plain_text } = block.code.rich_text[0];

    return (
      <div className="mb-10">
        {captions[0]?.plain_text && (
          <div className="bg-[var(--layout-bg)] flex items-center p-6 mb-3 rounded-[10px]">
            <IoDocumentTextOutline className="min-w-[60px]" size={30} />
            <div className="grow px-3">
              {captions.map((text, index) => (
                <span key={index} className="head-text5-normal mb-8">
                  {text.plain_text}
                </span>
              ))}
            </div>
          </div>
        )}
        <CodeWrapper code={plain_text} />
      </div>
    );
  }

  return <></>;
};

const BlockList = ({
  structureBlock,
}: {
  structureBlock: StructureBlock[];
}) => {
  return (
    <>
      {structureBlock.map((block, index) => (
        <section
          className={clsx('relative', {
            'bg-[var(--secondary-color)] flex items-center p-6 mb-10  rounded-[10px] ':
              block.type === 'callout',
          })}
          {...(block.title ? { 'data-head-id': block.title.id } : {})}
          key={`section${index}`}
        >
          {block.title && block.type === 'heading' && (
            <>
              <div
                id={block.title.id}
                className="relative top-negative-header"
              />
              <Block key="title" block={block.title} />
              {block.children.map((block, index) => (
                <Block key={`children${index}`} block={block} />
              ))}
            </>
          )}

          {block.type === 'callout' && (
            <>
              <DiCodeigniter
                className="min-w-[60px] bg-transparent"
                size={30}
              />
              <div className={'flex flex-col grow px-3 bg-transparent'}>
                {block.children.map((block, index) => (
                  <Block key={`children${index}`} block={block} />
                ))}
              </div>
            </>
          )}
        </section>
      ))}
    </>
  );
};

export default BlockList;
