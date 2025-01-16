import { Icon, RichTextProperty, User } from '@/types/notion.database';

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

export interface ToggleBlock extends BlockBase {
  type: 'toggle';
  toggle: {
    rich_text: RichText[];
    color: string;
  };
}

export interface ParagraphBlock extends BlockBase {
  type: 'paragraph';
  paragraph: {
    rich_text: RichTextProperty[];
    color: string;
  };
}

export interface Heading2Block extends BlockBase {
  type: 'heading_2';
  heading_2: {
    rich_text: RichTextProperty[];
    is_toggleable: boolean;
    color: string;
  };
}

export interface CalloutBlock extends BlockBase {
  type: 'callout';
  callout: {
    rich_text: RichTextProperty[];
    icon: Icon;
    color: string;
  };
}

export interface ImageBlock extends BlockBase {
  type: 'image';
  image: {
    caption: RichText[];
    type: 'file';
    file: File;
  };
}

export interface BulletedListItemBlock extends BlockBase {
  type: 'bulleted_list_item';
  bulleted_list_item: {
    rich_text: RichText[];
    color: string;
  };
}

export interface NumberedListItemBlock extends BlockBase {
  type: 'numbered_list_item';
  numbered_list_item: {
    rich_text: RichText[];
    color: string;
  };
}

export interface DividerBlock extends BlockBase {
  type: 'divider';
  divider: Record<string, never>;
}

export interface Heading3Block extends BlockBase {
  type: 'heading_3';
  heading_3: {
    rich_text: RichText[];
    is_toggleable: boolean;
    color: string;
  };
}

export type NotionBlock =
  | ToggleBlock
  | ParagraphBlock
  | Heading2Block
  | CalloutBlock
  | ImageBlock
  | BulletedListItemBlock
  | NumberedListItemBlock
  | DividerBlock
  | Heading3Block;

export type NotionBlockResponse = NotionBlock[];
