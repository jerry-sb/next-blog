import * as React from 'react';
import { NotionDatabaseResponse } from '@/types/notion.database';
import { CategoryProperty, SubCategoryProperty } from '@/types/notion.page';
import {
  NotionCategoryList,
  NotionSubcategoryModel,
} from '@/types/notion.model';
import Category from '@/app/components/Category';

const getCategories = async (): Promise<
  NotionDatabaseResponse<CategoryProperty>
> => {
  const response = await fetch(
    `http://localhost:3000/api/notion/database/${process.env.NOTION_CATEGORY_DATABASE}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  return await response.json();
};

const getSubCategories = async (): Promise<
  NotionDatabaseResponse<SubCategoryProperty>
> => {
  const response = await fetch(
    `http://localhost:3000/api/notion/database/${process.env.NOTION_SUBCATEGORY_DATABASE}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  return await response.json();
};

const CategoryList = async () => {
  const [categories, subCategories] = await Promise.all([
    getCategories(),
    getSubCategories(),
  ]);

  const categoryList: NotionCategoryList = [];
  const subCategoryModel: NotionSubcategoryModel = {};

  if (categories.results.length > 0 && subCategories.results.length > 0) {
    categories.results.forEach((category) => {
      const { Title, SubCategories, BlogCount } = category.properties;
      categoryList.push({
        id: category.id,
        title: Title.title[0].text.content,
        subCategories: SubCategories.relation.map((item) => item.id),
        blogCount: BlogCount.rollup.number,
      });
    });

    subCategories.results.forEach((subCategory) => {
      const { Title, BlogCount } = subCategory.properties;
      subCategoryModel[`${subCategory.id}`] = {
        id: subCategory.id,
        title: Title.title[0].text.content,
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
        'fixed left-0 h-full w-full lg:w-[var(--nav-width)] pt-[var(--header-height)]'
      }
    >
      <CategoryList />
    </nav>
  );
};

export default LeftNavigationLayout;
