import { createStore } from 'zustand/vanilla';

export type NotionState = {
  categoryActive: Record<string, boolean>;
};

export type NotionActions = {
  updateCategoryActiveById: (id: string) => void;
};

export type NotionStore = NotionState & NotionActions;

export const defaultInitState: NotionState = {
  categoryActive: {},
};

export const createNotionStore = (
  initState: NotionState = defaultInitState
) => {
  return createStore<NotionStore>()((set) => ({
    ...initState,
    updateCategoryActiveById: (id: string) => {
      set((state) => ({
        categoryActive: {
          ...state.categoryActive, // 기존 상태를 유지
          [id]: !state.categoryActive[id], // 특정 `id`의 상태를 토글
        },
      }));
    },
  }));
};
