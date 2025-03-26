import 'server-only';
import { Client } from '@notionhq/client';
import { NotionError, NotionFetchError } from '@/lib/error';
import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
  QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints';

export class Notion {
  private static instances: Map<string, Notion> = new Map();
  readonly #key: string = process.env.NEXT_PUBLIC_NOTION_KEY as string;
  readonly #database: string;

  private constructor(database: string) {
    this.#database = database;
  }

  static getInstance(database: string): Notion {
    if (!Notion.instances.has(database)) {
      Notion.instances.set(database, new Notion(database));
    }
    return Notion.instances.get(database) as Notion;
  }

  async getDatabase(props: Omit<QueryDatabaseParameters, 'database_id'>) {
    try {
      const notion = new Client({ auth: this.#key });
      return await notion.databases.query({
        database_id: this.#database,
        ...props,
        page_size: 200,
      });
    } catch (error) {
      throw new NotionFetchError(error as NotionError);
    }
  }

  async getPageContent(pageId: string) {
    try {
      const notion = new Client({ auth: this.#key });
      let results: (PartialBlockObjectResponse | BlockObjectResponse)[] = [];
      let cursor: string | null | undefined = undefined;

      do {
        const response = await notion.blocks.children.list({
          block_id: pageId,
          page_size: 100, // 최대 100개만 허용됨
          start_cursor: cursor, // 다음 페이지 커서
        });

        results = [...results, ...response.results]; // 결과 누적
        cursor = response.has_more ? response.next_cursor : undefined; // 다음 페이지 존재 여부 확인
      } while (cursor); // 다음 페이지가 있는 동안 계속 요청

      return results;
    } catch (error) {
      throw new NotionFetchError(error as NotionError);
    }
  }

  async getPage(pageId: string) {
    try {
      const notion = new Client({ auth: this.#key });
      return await notion.pages.retrieve({ page_id: pageId });
    } catch (error) {
      throw new NotionFetchError(error as NotionError);
    }
  }

  async getBlockContent(blockId: string) {
    try {
      const notion = new Client({ auth: this.#key });
      return await notion.blocks.children.list({
        block_id: blockId,
      });
    } catch (error) {
      throw new NotionFetchError(error as NotionError);
    }
  }

  async getTableContent(tableBlockId: string) {
    try {
      const notion = new Client({ auth: this.#key });
      return await notion.blocks.children.list({
        block_id: tableBlockId,
      });
    } catch (error) {
      throw new NotionFetchError(error as NotionError);
    }
  }
}
