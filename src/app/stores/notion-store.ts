import { createStore } from 'zustand/vanilla';

type NotionCategory = Record<
  string,
  {
    title: string;
    subCategories: { id: string; name: string }[];
    blogCount: number;
  }
>;

type NotionSubcategory = Record<
  string,
  {
    title: string;
    blogCount: number;
  }
>;

export type NotionState = {
  categories: NotionCategory;
  subCategories: NotionSubcategory;
};

export type NotionActions = {
  setCategories: () => void;
  addSubCategories: () => void;
  setSubcategories: () => void;
};

export type NotionStore = NotionState & NotionActions;

export const defaultInitState: NotionState = {
  categories: {},
  subCategories: {},
};

export const createNotionStore = (
  initState: NotionState = defaultInitState
) => {
  return createStore<NotionStore>()(() => ({
    ...initState,
    setCategories: () => {},
    addSubCategories: () => {},
    setSubcategories: () => {},
  }));
};
