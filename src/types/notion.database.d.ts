export interface NotionDatabaseResponse<T> {
  object: 'list';
  results: Page<T>[];
  next_cursor: string | null;
  has_more: boolean;
  type: 'page_or_database';
  page_or_database: Record<string, unknown>;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Page<T extends Record<string, any>> {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: User;
  last_edited_by: User;
  cover: null | Cover;
  icon: null | Icon;
  parent: Parent;
  archived: boolean;
  in_trash: boolean;
  properties: T;
  url: string;
  public_url: null | string;
}

export interface User {
  object: 'user';
  id: string;
}

export interface Cover {
  type: string;
  file: File;
  external?: {
    url: string;
  };
}

export interface File {
  url: string;
  expiry_time: string;
}

export interface Icon {
  type: 'emoji';
  emoji: string;
}

export interface Parent {
  type: 'database_id';
  database_id: string;
}

export interface RelationProperty {
  id: string;
  type: 'relation';
  relation: Array<Relation>;
  has_more: boolean;
}

export interface RollupProperty {
  id: string;
  type: 'rollup';
  rollup: Rollup;
}

export interface MultiSelectProperty {
  id: string;
  type: 'select';
  multi_select: MultiSelect[];
}

export interface Relation {
  id: string;
}

export interface Rollup {
  type: 'number' | 'string';
  number: number;
  function: 'count_values' | 'count';
}

export interface MultiSelect {
  id: string;
  name: string;
  color: string;
}

export interface StatusProperty {
  id: string;
  type: 'status';
  status: {
    id: string;
    name: string;
    color: string;
  };
}

export interface DateProperty {
  id: string;
  type: 'date';
  date: {
    start: string; // ISO8601 형식의 날짜 문자열
    end: string | null;
    time_zone: string | null;
  };
}

export interface TitleProperty {
  id: string;
  type: 'title';
  title: Text[];
}

export interface RichTextProperty {
  id: string;
  type: 'rich_text';
  rich_text: Text[];
}

export interface Text {
  type: 'text';
  text: {
    content: string;
    link: string | null;
  };
  annotations: Annotations;
  plain_text: string;
  href: string | null;
}

export interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}
