export type NotionCategory = {
  id: string;
  title: string;
  subCategories: string[];
  blogCount: number;
};

export type NotionCategoryModel = Record<string, NotionCategory>;
export type NotionCategoryList = NotionCategory[];
export type NotionSubCategory = Omit<NotionCategory, 'subCategories'>;
export type NotionSubcategoryModel = Record<string, NotionSubCategory>;
