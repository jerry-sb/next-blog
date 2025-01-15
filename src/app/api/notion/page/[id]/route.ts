import { NextRequest } from 'next/server';
import { Notion } from '@/lib/notion';
import { NotionFetchError } from '@/lib/error';

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const { id } = await params;
    const notion = Notion.getInstance(
      `${process.env.NEXT_PUBLIC_NOTION_BLOG_DATABASE}`
    );
    const page = await notion.getPageContent(id);

    return Response.json(page);
  } catch (e) {
    console.error(e);
    if (e instanceof NotionFetchError) {
      return Response.json(e, { status: e.status });
    }
    return Response.json(new NotionFetchError(), { status: 500 });
  }
}
