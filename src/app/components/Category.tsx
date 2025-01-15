'use client';
import * as React from 'react';
import { NotionCategory, NotionSubcategoryModel } from '@/types/notion.model';
import { IoMdArrowDropdown } from 'react-icons/io';
import Spacer from '@/app/components/common/Spacer';
import { useCallback } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useNotionStore } from '@/app/stores/notion-store-provider';

const Category = ({
  category,
  subCategoryModel,
}: {
  category: NotionCategory;
  subCategoryModel: NotionSubcategoryModel;
}) => {
  const { id } = useParams();
  const categoryActive = useNotionStore((state) => state.categoryActive)[
    category.id
  ];
  const updateCategoryActiveById = useNotionStore(
    (state) => state.updateCategoryActiveById
  );

  const onCategoryClick = useCallback(() => {
    updateCategoryActiveById(category.id);
  }, [category.id]);

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
            'rotate-180': categoryActive,
            'rotate-0': !categoryActive,
          })}
        />
      </div>
      <Spacer d={'vertical'} size={10} />
      <ul
        className={clsx(
          'flex flex-col gap-2 transition-height duration-300 ease-in-out',
          {
            'h-0 overflow-hidden': !categoryActive,
          }
        )}
        style={{
          height: categoryActive ? `${calculateHeight()}px` : '0px',
        }}
      >
        {category.subCategories.map((subcategoryId) => {
          const subCategory = subCategoryModel[`${subcategoryId}`];
          return (
            <li key={subcategoryId}>
              <Link
                href={`/category/${subcategoryId}`}
                className={clsx('flex items-center gap-1 h-[48px] px-2', {
                  'primary-box': subcategoryId === id,
                })}
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
