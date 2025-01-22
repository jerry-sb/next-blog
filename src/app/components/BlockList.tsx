import * as React from 'react';
import { NotionBlock, NotionBlockResponse } from '@/types/notion.block';
import { useCallback } from 'react';
import { Annotations } from '@/types/notion.database';
import clsx from 'clsx';
import Spacer from '@/app/components/common/Spacer';
import { IoDocumentTextOutline } from 'react-icons/io5';
import Image from 'next/image';
import CodeWrapper from '@/app/components/CodeWrapper';

const Block = ({ block }: { block: NotionBlock }) => {
  const getTextClass = useCallback((annotations: Annotations) => {
    return clsx('head-text5-normal', {
      'font-bold': annotations.bold,
      italic: annotations.italic,
      'line-through': annotations.strikethrough,
      underline: annotations.underline,
      'bg-gray-200 text-black': annotations.code,
    });
  }, []);

  if (block.type === 'bulleted_list_item') {
    const texts = block.bulleted_list_item.rich_text;
    return (
      <div className="my-3 px-5 before:content-dot">
        {texts.map((text, index) => (
          <span key={`p${index}`} className={getTextClass(text.annotations)}>
            {text.plain_text}
          </span>
        ))}
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

    return <h1 className="head-text2 mb-8 head-color">{headingText}</h1>;
  }

  if (block.type === 'heading_2') {
    const texts = block.heading_2.rich_text;
    const headingText = texts.map((text) => text.plain_text).join(' ');

    return <h2 className="head-text3 mb-8 head-color">{headingText}</h2>;
  }

  if (block.type === 'heading_3') {
    const texts = block.heading_3.rich_text;
    const headingText = texts.map((text) => text.plain_text).join(' ');

    return <h3 className="head-text4 mb-8 head-color">{headingText}</h3>;
  }

  if (block.type === 'image') {
    let imageType = 'TYPE1';
    const captions = block.image.caption;
    const { url } = block.image.file;

    const captionText = captions.map((text) => {
      if (text.plain_text.includes('TYPE2')) {
        imageType = 'TYPE2';
        return text.plain_text.replace('TYPE2', '');
      }
      return text.plain_text;
    });

    return (
      <div className="mb-10">
        <div className="bg-[var(--layout-bg)] flex items-center p-6 mb-3 rounded-[10px]">
          <IoDocumentTextOutline className="min-w-[40px]" size={30} />
          <div className="grow px-3">
            {captionText.map((text, index) => (
              <span key={index} className="head-text5-normal mb-8">
                {text}
              </span>
            ))}
          </div>
        </div>
        <div
          className={clsx('relative w-full p-5', {
            'h-[400px]': imageType === 'TYPE2',
            'h-[300px]': imageType === 'TYPE1',
          })}
        >
          <Image
            className="object-contain"
            src={url}
            alt="image"
            fill
            sizes="(max-width: 1024px) 100vw, 80vw"
            priority
          />
        </div>
      </div>
    );
  }

  if (block.type === 'divider') {
    return <hr className="my-10 border border-[var(--layout-bg)]" />;
  }

  if (block.type === 'code') {
    const captions = block.code.caption;
    const { plain_text } = block.code.rich_text[0];

    return (
      <div className="mb-10">
        <div className="bg-[var(--layout-bg)] flex items-center p-6 mb-3 rounded-[10px]">
          <IoDocumentTextOutline className="min-w-[40px]" size={30} />
          <div className="grow px-3">
            {captions.map((text, index) => (
              <span key={index} className="head-text5-normal mb-8">
                {text.plain_text}
              </span>
            ))}
          </div>
        </div>
        <CodeWrapper code={plain_text} />
      </div>
    );
  }

  return <></>;
};

const BlockList = ({
  structureBlock,
}: {
  structureBlock: { title?: NotionBlock; children: NotionBlockResponse }[];
}) => {
  return (
    <>
      {structureBlock.map((block, index) => (
        <section
          className="relative"
          {...(block.title ? { 'data-head-id': block.title.id } : {})}
          key={`section${index}`}
        >
          {block.title && (
            <div id={block.title.id} className="relative top-negative-header" />
          )}
          {block.title && <Block key="title" block={block.title} />}
          {block.children.map((block, index) => (
            <Block key={`children${index}`} block={block} />
          ))}
        </section>
      ))}
    </>
  );
};

export default BlockList;
