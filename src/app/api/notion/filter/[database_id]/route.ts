import { Notion } from '@/lib/notion';
import { NotionFetchError } from '@/lib/error';
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';
import { NextRequest } from 'next/server';

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

    const filter: string[] = request.nextUrl.searchParams.has('filter')
      ? request.nextUrl.searchParams.getAll('filter')
      : ['status'];

    const property: string[] = request.nextUrl.searchParams.get('property')
      ? request.nextUrl.searchParams.getAll('property')
      : [];

    const multi_select_contains: string =
      request.nextUrl.searchParams.get('multi_select_contains') ?? '';

    const status_equals: string =
      request.nextUrl.searchParams.get('status_equals') ?? '';

    const databaseFilter: Pick<QueryDatabaseParameters, 'filter'> = {};

    if (filter.length == 1 && filter[0] === 'status') {
      databaseFilter['filter'] = {
        property: property?.[0] ?? '',
        status: {
          equals: status_equals,
        },
      };
    }

    if (filter.length == 1 && filter[0] === 'multi_select') {
      databaseFilter['filter'] = {
        property: property?.[0] ?? '',
        multi_select: {
          contains: multi_select_contains,
        },
      };
    }

    if (filter.length > 1) {
      const validFilters = filter
        .map((filterType, index) => {
          if (filterType === 'status' && status_equals && property[index]) {
            return {
              property: property[index],
              status: {
                equals: status_equals,
              },
            };
          } else if (
            filterType === 'multi_select' &&
            multi_select_contains &&
            property[index]
          ) {
            return {
              property: property[index],
              multi_select: {
                contains: multi_select_contains,
              },
            };
          }
          return null; // 유효하지 않은 경우 null 반환
        })
        .filter((item): item is Exclude<typeof item, null> => item !== null); // null 값 제거

      if (validFilters.length > 0) {
        databaseFilter['filter'] = {
          and: validFilters,
        };
      }
    }

    const notion = Notion.getInstance(database_id);
    const database = await notion.getDatabase({ ...databaseFilter });
    const pages = await Promise.all(
      database.results.map(async (page) => {
        const blocks = await notion.getPageContent(page.id);
        return {
          page,
          blocks,
        };
      })
    );

    return Response.json({
      database,
      pages,
    });
  } catch (e) {
    console.error(e);
    if (e instanceof NotionFetchError) {
      return Response.json(e, { status: e.status });
    }
    return Response.json(new NotionFetchError(), { status: 500 });
  }
}
