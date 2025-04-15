import * as React from 'react';
import {
  NotionCategoryList,
  NotionSubcategoryModel,
} from '@/types/notion.model';
import {
  getCategories,
  getSubcategories,
} from '@/app/api/notion/database/getDatabase';
import Category from '@/app/components/Category';
import Link from 'next/link';
import ThemeToggleButton from '@/app/components/button/ThemeToggleButton';

const CategoryNavigation = async () => {
  const [categories, subCategories] = await Promise.all([
    getCategories(),
    getSubcategories(),
  ]);

  const categoryList: NotionCategoryList = [];
  const subCategoryModel: NotionSubcategoryModel = {};

  if (categories.results.length > 0 && subCategories.results.length > 0) {
    categories.results.forEach((category) => {
      const { Title, SubCategories, BlogCount } = category.properties;
      categoryList.push({
        id: category.id,
        title: Title.title[0].plain_text,
        subCategories: SubCategories.relation.map((item) => item.id),
        blogCount: BlogCount.rollup.number,
      });
    });

    subCategories.results.forEach((subCategory) => {
      const { Title, BlogCount } = subCategory.properties;
      subCategoryModel[`${subCategory.id}`] = {
        id: subCategory.id,
        title: Title.title[0].plain_text,
        blogCount: BlogCount.rollup.number,
      };
    });
  }

  return (
    <div className={'flex flex-col w-full h-full'}>
      <ul className={'category-nav'}>
        {categoryList.map((category) => (
          <Category
            key={category.id}
            category={category}
            subCategoryModel={subCategoryModel}
          />
        ))}
      </ul>
      <ul className={'etc-nav'}>
        <Link
          className={'relative'}
          href={'/detail/1d3817e60e4680fc86e5fcdff8526c26'}
        >
          <p className={'font-bold italic text-lg'}>About me.</p>
        </Link>
        <ThemeToggleButton />
      </ul>
    </div>
  );
};

export default CategoryNavigation;
