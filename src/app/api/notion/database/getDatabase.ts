import { NotionDatabaseResponse, Page } from '@/types/notion.database';
import {
  BlogProperty,
  CategoryProperty,
  SubCategoryProperty,
} from '@/types/notion.page';
import { Notion } from '@/lib/notion';
import { NotionBlockResponse } from '@/types/notion.block';
import { NotionTableResponse } from '@/types/notion.table';

export const getCategories = async (): Promise<
  NotionDatabaseResponse<CategoryProperty>
> => {
  const notion = Notion.getInstance(
    `${process.env.NEXT_PUBLIC_NOTION_CATEGORY_DATABASE}`
  );
  return (await notion.getDatabase({
    sorts: [
      {
        property: 'Order',
        direction: 'ascending',
      },
    ],
  })) as unknown as NotionDatabaseResponse<CategoryProperty>;
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
    sorts: [
      {
        property: 'InsertDate',
        direction: 'descending',
      },
    ],
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
    sorts: [
      {
        property: 'InsertDate',
        direction: 'descending',
      },
    ],
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
  return (await notion.getPage(
    subcategoryId
  )) as unknown as Page<SubCategoryProperty>;
};

export const getBlogPreviewDetail = async (blogId: string) => {
  const notion = Notion.getInstance(
    `${process.env.NEXT_PUBLIC_NOTION_BLOG_DATABASE}`
  );
  return (await notion.getPage(blogId)) as unknown as Page<BlogProperty>;
};

export const getTableBlock = async (
  tableBlockId: string
): Promise<{ header: string[]; columns: string[][] } | undefined> => {
  const notion = Notion.getInstance(
    `${process.env.NEXT_PUBLIC_NOTION_BLOG_DATABASE}`
  );

  const result = (await notion.getTableContent(
    tableBlockId
  )) as unknown as NotionTableResponse;

  if (!result?.results || result?.results.length === 0) {
    return undefined;
  }

  const transform: { header: string[]; columns: string[][] } = {
    header: [],
    columns: [],
  };

  result.results.forEach((row, rowIndex) => {
    const nextArray: string[] = [];
    row.table_row.cells.forEach((cell) => {
      nextArray.push(cell[0].plain_text);
    });

    if (rowIndex === 0) {
      transform.header = nextArray;
    } else {
      transform.columns.push(nextArray);
    }
  });

  return transform;
};
