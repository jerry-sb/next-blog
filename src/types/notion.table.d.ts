import { Text } from '@/types/notion.database';
import { BlockBase, NotionBlock } from '@/types/notion.block';

export interface NotionTableResponse {
  object: 'list';
  results: NotionTableRow[];
  next_cursor: string | null;
  has_more: boolean;
  type: 'block';
  requestId: string;
}

export interface NotionBlockDetailResponse {
  object: 'list';
  results: NotionBlock[];
  next_cursor: string | null;
  has_more: boolean;
  type: 'block';
  requestId: string;
}

export interface NotionTableRow extends BlockBase {
  type: 'table_row';
  table_row: {
    cells: Text[][];
  };
}
