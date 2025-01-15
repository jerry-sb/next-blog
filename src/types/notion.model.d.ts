export type NotionCategory = {
  id: string;
  title: string;
  subCategories: string[];
  blogCount: number;
};

export type NotionBlog = {
  id: string;
  title: string;
  coverImage?: string;
  insertDate: string;
};

export type NotionCategoryModel = Record<string, NotionCategory>;
export type NotionCategoryList = NotionCategory[];
export type NotionSubCategory = Omit<NotionCategory, 'subCategories'>;
export type NotionSubcategoryModel = Record<string, NotionSubCategory>;
export type NotionBlogModel = Record<string, NotionBlog>;
export type NotionBlogList = NotionBlog[];
