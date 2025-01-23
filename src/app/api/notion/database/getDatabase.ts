import { NotionDatabaseResponse, Page } from '@/types/notion.database';
import {
  BlogProperty,
  CategoryProperty,
  SubCategoryProperty,
} from '@/types/notion.page';
import { Notion } from '@/lib/notion';
import { NotionBlockResponse } from '@/types/notion.block';

export const getCategories = async (): Promise<
  NotionDatabaseResponse<CategoryProperty>
> => {
  const notion = Notion.getInstance(
    `${process.env.NEXT_PUBLIC_NOTION_CATEGORY_DATABASE}`
  );
  return (await notion.getDatabase(
    {}
  )) as unknown as NotionDatabaseResponse<CategoryProperty>;
};

export const getSubcategories = async (): Promise<
  NotionDatabaseResponse<SubCategoryProperty>
> => {
  const notion = Notion.getInstance(
    `${process.env.NEXT_PUBLIC_NOTION_SUBCATEGORY_DATABASE}`
  );
  return (await notion.getDatabase(
    {}
  )) as unknown as NotionDatabaseResponse<SubCategoryProperty>;
};

export const getBlogs = async (): Promise<
  NotionDatabaseResponse<BlogProperty>
> => {
  const notion = Notion.getInstance(
    `${process.env.NEXT_PUBLIC_NOTION_BLOG_DATABASE}`
  );

  return (await notion.getDatabase({
    filter: {
      property: 'Status',
      status: {
        equals: '완료',
      },
    },
  })) as unknown as NotionDatabaseResponse<BlogProperty>;
};

export const getBlogsBySubcategoryId = async (
  subcategory_id: string
): Promise<NotionDatabaseResponse<BlogProperty>> => {
  const notion = Notion.getInstance(
    `${process.env.NEXT_PUBLIC_NOTION_BLOG_DATABASE}`
  );
  return (await notion.getDatabase({
    filter: {
      and: [
        {
          property: 'Subcategory',
          relation: {
            contains: subcategory_id,
          },
        },
        {
          property: 'Status',
          status: {
            equals: '완료',
          },
        },
      ],
    },
  })) as unknown as NotionDatabaseResponse<BlogProperty>;
};

export const getBlogDetail = async (blogId: string) => {
  const notion = Notion.getInstance(
    `${process.env.NEXT_PUBLIC_NOTION_BLOG_DATABASE}`
  );
  return (await notion.getPageContent(
    blogId
  )) as unknown as NotionBlockResponse;
};

export const getSubcategoryDetail = async (subcategoryId: string) => {
  const notion = Notion.getInstance(
    `${process.env.NEXT_PUBLIC_NOTION_SUBCATEGORY_DATABASE}`
  );
  return await notion.getPageContent(subcategoryId);
};

export const getBlogPreviewDetail = async (blogId: string) => {
  const notion = Notion.getInstance(
    `${process.env.NEXT_PUBLIC_NOTION_BLOG_DATABASE}`
  );
  return (await notion.getPage(blogId)) as unknown as Page<BlogProperty>;
};
