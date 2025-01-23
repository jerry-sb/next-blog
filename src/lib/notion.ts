import 'server-only';
import { Client } from '@notionhq/client';
import { NotionError, NotionFetchError } from '@/lib/error';
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';

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
      const response = await notion.databases.query({
        database_id: this.#database,
        ...props,
        page_size: 200,
      });
      return response;
    } catch (error) {
      throw new NotionFetchError(error as NotionError);
    }
  }

  async getPageContent(pageId: string) {
    try {
      const notion = new Client({ auth: this.#key });
      const response = await notion.blocks.children.list({
        block_id: pageId,
      });
      return response.results;
    } catch (error) {
      throw new NotionFetchError(error as NotionError);
    }
  }

  async getPage(pageId: string) {
    try {
      const notion = new Client({ auth: this.#key });
      const response = await notion.pages.retrieve({ page_id: pageId });
      return response;
    } catch (error) {
      throw new NotionFetchError(error as NotionError);
    }
  }
}
