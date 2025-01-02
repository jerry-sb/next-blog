import { Notion } from '@/lib/notion';
import { NotionFetchError } from '@/lib/error';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ database: string }> }
) {
  try {
    const database = (await params).database;
    const notion = Notion.getInstance(database);
    const data = await notion.getDatabase();
    const response = await Promise.all(
      data.results.map(async (page) => {
        const blocks = await notion.getPageContent(page.id);
        return Object.assign(page, { blocks });
      })
    );

    return Response.json(response);
  } catch (e) {
    console.error(e);
    if (e instanceof NotionFetchError) {
      return Response.json(e, { status: e.status });
    }
    return Response.json(new NotionFetchError(), { status: 500 });
  }
}
