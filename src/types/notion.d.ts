// Main Response Type
export interface NotionResponse {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: UserObject;
  last_edited_by: UserObject;
  cover: null | any; // Adjust type if specific structure for cover is known
  icon: null | any; // Adjust type if specific structure for icon is known
  parent: ParentObject;
  archived: boolean;
  in_trash: boolean;
  properties: Properties;
  url: string;
  public_url: null | string;
  blocks: Block[];
}

// User Object Type
export interface UserObject {
  object: string;
  id: string;
}

// Parent Object Type
export interface ParentObject {
  type: string;
  database_id: string;
}

// Properties Type
export interface Properties {
  tags: MultiSelectProperty;
  category: SelectProperty;
  name: TitleProperty;
}

// MultiSelect Property Type
export interface MultiSelectProperty {
  id: string;
  type: 'multi_select';
  multi_select: MultiSelectOption[];
}

// MultiSelect Option Type
export type MultiSelectOption = any; // Define structure if options have a fixed structure

// Select Property Type
export interface SelectProperty {
  id: string;
  type: 'select';
  select: null | SelectOption;
}

// Select Option Type
export type SelectOption = any; // Define structure if options have a fixed structure

// Title Property Type
export interface TitleProperty {
  id: string;
  type: 'title';
  title: RichText[];
}

// RichText Type
export interface RichText {
  type: string;
  text: TextContent;
  annotations: Annotations;
  plain_text: string;
  href: null | string;
}

// TextContent Type
export interface TextContent {
  content: string;
  link: null | string;
}

// Annotations Type
export interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

// Block Type
export interface Block {
  object: string;
  id: string;
  parent: ParentObject;
  created_time: string;
  last_edited_time: string;
  created_by: UserObject;
  last_edited_by: UserObject;
  has_children: boolean;
  archived: boolean;
  in_trash: boolean;
  type: string;
  [key: string]: any; // For specific block types, define their structure below
}

// Paragraph Block Type
export interface ParagraphBlock extends Block {
  type: 'paragraph';
  paragraph: ParagraphContent;
}

// Paragraph Content Type
export interface ParagraphContent {
  rich_text: RichText[];
  color: string;
}

// Heading Block Types
export interface HeadingBlock extends Block {
  type: 'heading_1' | 'heading_2' | 'heading_3';
  heading_1?: HeadingContent;
  heading_2?: HeadingContent;
  heading_3?: HeadingContent;
}

// Heading Content Type
export interface HeadingContent {
  rich_text: RichText[];
  is_toggleable: boolean;
  color: string;
}

// Divider Block Type
export interface DividerBlock extends Block {
  type: 'divider';
  divider: {};
}

// Code Block Type
export interface CodeBlock extends Block {
  type: 'code';
  code: CodeContent;
}

// Code Content Type
export interface CodeContent {
  caption: any[];
  rich_text: RichText[];
  language: string;
}
