import {
  File,
  Icon,
  RichTextProperty,
  Text,
  User,
} from '@/types/notion.database';

export interface BlockBase {
  object: 'block';
  id: string;
  parent: {
    type: string;
    page_id: string;
  };
  created_time: string;
  last_edited_time: string;
  created_by: User;
  last_edited_by: User;
  has_children: boolean;
  archived: boolean;
  in_trash: boolean;
}

export interface Toggle extends BlockBase {
  type: 'toggle';
  toggle: {
    rich_text: RichTextProperty;
    color: string;
  };
}

export interface Paragraph extends BlockBase {
  type: 'paragraph';
  paragraph: {
    rich_text: Text[];
    color: string;
  };
}

export interface Heading1 extends BlockBase {
  type: 'heading_1';
  heading_1: {
    rich_text: Text[];
    is_toggleable: boolean;
    color: string;
  };
}

export interface Heading2 extends BlockBase {
  type: 'heading_2';
  heading_2: {
    rich_text: Text[];
    is_toggleable: boolean;
    color: string;
  };
}

export interface Callout extends BlockBase {
  type: 'callout';
  callout: {
    rich_text: Text[];
    icon: Icon;
    color: string;
  };
}

export interface Image extends BlockBase {
  type: 'image';
  image: {
    caption: Text[];
    type: 'file';
    file: File;
  };
}

export interface Code extends BlockBase {
  type: 'code';
  code: {
    caption: Text[];
    rich_text: Text[];
    language: string;
  };
}

export interface BulletedListItem extends BlockBase {
  type: 'bulleted_list_item';
  bulleted_list_item: {
    rich_text: Text[];
    color: string;
  };
}

export interface NumberedListItem extends BlockBase {
  type: 'numbered_list_item';
  numbered_list_item: {
    rich_text: RichTextProperty;
    color: string;
  };
}

export interface Divider extends BlockBase {
  type: 'divider';
  divider: Record<string, never>;
}

export interface Heading3 extends BlockBase {
  type: 'heading_3';
  heading_3: {
    rich_text: Text[];
    is_toggleable: boolean;
    color: string;
  };
}

export interface Table extends BlockBase {
  type: 'table';
  table: {
    table_width: number;
    has_column_header: boolean;
    has_row_header: boolean;
  };
}

export type NotionBlock =
  | Toggle
  | Paragraph
  | Heading1
  | Heading2
  | Callout
  | Image
  | BulletedListItem
  | NumberedListItem
  | Divider
  | Heading3
  | Code
  | Table;

export type NotionBlockResponse = NotionBlock[];
