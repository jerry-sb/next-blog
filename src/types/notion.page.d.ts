import {
  DateProperty,
  RelationProperty,
  RichTextProperty,
  RollupProperty,
  StatusProperty,
  TitleProperty,
} from '@/types/notion.database';

export interface CategoryProperty {
  Title: TitleProperty;
  SubCategories: RelationProperty;
  BlogCount: RollupProperty;
}

export interface SubCategoryProperty {
  Title: TitleProperty;
  Category: RelationProperty;
  Blogs: RelationProperty;
  BlogCount: RollupProperty;
}

export interface BlogProperty {
  Title: TitleProperty;
  SubCategory: RelationProperty;
  SubcategoryName: RichTextProperty;
  Status: StatusProperty;
  InsertDate: DateProperty;
}
