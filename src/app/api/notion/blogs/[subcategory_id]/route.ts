import { NextRequest } from 'next/server';
import { Notion } from '@/lib/notion';

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      subcategory_id: string;
    }>;
  }
) {
  const { subcategory_id } = await params;
  const notion = Notion.getInstance(`${process.env.NOTION_BLOG_DATABASE}`);
  const database = await notion.getDatabase({
    filter: {
      property: 'Subcategory',
      relation: {
        contains: subcategory_id,
      },
    },
  });

  return Response.json(database);
}
