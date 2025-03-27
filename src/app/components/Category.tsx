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

  const [isOpen, setIsOpen] = React.useState(category.id === id);

  const updateCategoryNavigation = useNotionStore(
    (state) => state.updateCategoryNavigation
  );

  const handleClick = () => {
    if (window.innerWidth <= 1024) {
      updateCategoryNavigation();
    }
  };

  const toggleOpen = useCallback(() => {
    console.log('1231232');
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <li
      className={'px-2 py-1 group/category'}
      data-state={isOpen ? 'open' : 'closed'}
    >
      <div className={'flex items-center justify-between'} onClick={toggleOpen}>
        <div>
          <span className={'text-lg font-bold'}>{category.title}</span>
        </div>
        <IoMdArrowDropdown
          size={23}
          className={clsx(
            'transition-transform duration-300 group-data-[state=open]/category:rotate-180'
          )}
        />
      </div>
      <Spacer d={'vertical'} size={10} />
      <ul
        className={clsx(
          'flex flex-col gap-2 overflow-hidden transition-all duration-300 ease-in-out',
          'group-data-[state=open]/category:max-h-[1000px]',
          'group-data-[state=closed]/category:max-h-0'
        )}
      >
        {category.subCategories.map((subcategoryId) => {
          const subCategory = subCategoryModel[`${subcategoryId}`];
          return (
            <li
              className={'group/sub-category'}
              key={subcategoryId}
              onClick={handleClick}
            >
              <Link
                href={`/category/${subcategoryId}`}
                className={clsx(
                  'relative flex items-center gap-1 h-[48px] px-2',
                  {
                    'primary-box': subcategoryId === id,
                    'group-hover/sub-category:after:zig-zag-line after:absolute after:bottom-0':
                      subcategoryId !== id,
                  }
                )}
              >
                <span className={'font-semibold'}>{subCategory.title}</span>
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
