import { NextRequest } from 'next/server';
import { NotionFetchError } from '@/lib/error';
import { getBlockDetail } from '@/app/api/notion/database/getDatabase';

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
    return Response.json(await getBlockDetail(id));
  } catch (e) {
    console.error(e);
    if (e instanceof NotionFetchError) {
      return Response.json(e, { status: e.status });
    }
    return Response.json(new NotionFetchError(), { status: 500 });
  }
}
