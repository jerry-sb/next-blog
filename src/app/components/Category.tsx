'use client';
import * as React from 'react';
import { NotionCategory, NotionSubcategoryModel } from '@/types/notion.model';
import { IoMdArrowDropdown } from 'react-icons/io';
import Spacer from '@/app/components/common/Spacer';
import { useCallback, useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

interface IProps {
  category: NotionCategory;
  subCategoryModel: NotionSubcategoryModel;
}

const Category = ({ category, subCategoryModel }: IProps) => {
  const [active, setActive] = useState<boolean>(false);

  const onCategoryClick = useCallback(() => setActive(!active), [active]);

  const calculateHeight = () => {
    const itemHeight = 48;
    const gap = 8;
    const itemCount = category.subCategories.length;
    return itemCount * itemHeight + (itemCount - 1) * gap;
  };

  return (
    <li className={'px-2 py-1'}>
      <div
        className={'flex items-center justify-between'}
        onClick={onCategoryClick}
      >
        <div>
          <span className={'text-lg'}>{category.title}</span>
        </div>
        <IoMdArrowDropdown
          size={23}
          className={clsx('transition-transform duration-300', {
            'rotate-180': active,
            'rotate-0': !active,
          })}
        />
      </div>
      <Spacer d={'vertical'} size={10} />
      <ul
        className={clsx(
          'flex flex-col gap-2 transition-height duration-300 ease-in-out',
          {
            'h-0 overflow-hidden': !active,
          }
        )}
        style={{
          height: active ? `${calculateHeight()}px` : '0px',
        }}
      >
        {category.subCategories.map((id) => {
          const subCategory = subCategoryModel[`${id}`];
          return (
            <li key={id}>
              <Link
                href={`/category/${id}`}
                className="flex items-center gap-1 h-[48px] bg-[var(--primary-color)] px-2"
              >
                <span>{subCategory.title}</span>
                <span className="text-sm">({subCategory.blogCount})</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export default Category;
