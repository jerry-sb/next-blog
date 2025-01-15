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
    <ul className={'flex flex-col gap-3 w-full h-full p-4'}>
      {categoryList.map((category) => (
        <Category
          key={category.id}
          category={category}
          subCategoryModel={subCategoryModel}
        />
      ))}
    </ul>
  );
};

const LeftNavigationLayout = () => {
  return (
    <nav
      className={
        'fixed left-0 h-full w-full lg:w-[var(--nav-width)] pt-[var(--header-height)] z-10 overflow-hidden overflow-y-auto'
      }
    >
      <CategoryNavigation />
    </nav>
  );
};

export default LeftNavigationLayout;
