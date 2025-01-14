import { NextRequest } from 'next/server';
import { Notion } from '@/lib/notion';
import { NotionFetchError } from '@/lib/error';

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      database_id: string;
    }>;
  }
) {
  try {
    const { database_id } = await params;

    const notion = Notion.getInstance(database_id);
    const database = await notion.getDatabase({});

    return Response.json({
      ...database,
    });
  } catch (e) {
    console.error(e);
    if (e instanceof NotionFetchError) {
      return Response.json(e, { status: e.status });
    }
    return Response.json(new NotionFetchError(), { status: 500 });
  }
}
