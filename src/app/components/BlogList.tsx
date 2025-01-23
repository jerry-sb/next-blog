import * as React from 'react';
import { NotionBlog, NotionBlogList } from '@/types/notion.model';
import Image from 'next/image';
import { formatDate } from '@/lib/util';
import { IoArrowForward } from 'react-icons/io5';
import Link from 'next/link';
import getBlurImg from '@/lib/blur';

interface IProps {
  blogList: NotionBlogList;
}

const BlogCard = ({ blog }: { blog: NotionBlog & { blurDataUrl: string } }) => {
  return (
    <div className="relative w-full flex items-center justify-center group">
      <div className="shadow-card rounded-[10px] overflow-hidden bg-white w-[90%] lg:w-full relative">
        {/* 이미지 섹션 */}
        <div className="relative w-full h-[200px]">
          <Image
            className="object-cover"
            src={blog.coverImage ?? ''}
            alt={blog.title ?? 'Blog Image'}
            fill
            sizes="(max-width: 1024px) 100vw, 80vw"
            priority
            blurDataURL={blog.blurDataUrl}
          />
        </div>

        {/* 블로그 정보 섹션 */}
        <div className="p-4 h-[200px] bg-[var(--layout-bg)]">
          <p className="text-sm text-gray-400 my-1">
            By <span className="font-semibold">Simba</span> •{' '}
            {formatDate(blog.insertDate)}
          </p>
          <h4 className="head-text4">{blog.title}</h4>
        </div>

        {/* Hover 효과: 투명 배경 및 텍스트 */}
        <Link
          href={`/detail/${blog.id}`}
          className="absolute cursor-pointer inset-0 bg-black bg-opacity-50 opacity-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-100"
        >
          <button className="primary-box flex items-center p-5">
            <IoArrowForward size={35} />
          </button>
        </Link>
      </div>
    </div>
  );
};

const BlogList = async ({ blogList }: IProps) => {
  const blurDataMap = await Promise.all(
    blogList.map(async (blog) => {
      if (!blog.coverImage) return '';
      return (await getBlurImg(blog.coverImage)) || '';
    })
  );

  return (
    <section className="grid grid-flow-row grid-cols-1 md:grid-cols-2 w-full lg:w-[800px] xl:w-[1000px] gap-12 lg:gap-5 my-24">
      {blogList.map((blog, index) => (
        <BlogCard
          blog={{ ...blog, blurDataUrl: blurDataMap[index] }}
          key={blog.id}
        />
      ))}
    </section>
  );
};

export default BlogList;
