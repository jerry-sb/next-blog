import { createStore } from 'zustand/vanilla';

type CategoryNavigationType = 'visible' | 'hidden';

export type NotionState = {
  imageModalUrl: string;
  modalFlag: Record<string, boolean>;
  categoryNavigation: CategoryNavigationType;
  categoryActive: Record<string, boolean>;
};

export type NotionActions = {
  updateImageModalUrl: (imageUrl: string) => void;
  updateModalFlag: (id: string) => void;
  updateCategoryActiveById: (id: string) => void;
  updateCategoryNavigation: () => void;
};

export type NotionStore = NotionState & NotionActions;

export const defaultInitState: NotionState = {
  imageModalUrl: '',
  modalFlag: {},
  categoryNavigation:
    typeof window !== 'undefined' && window.innerWidth < 1025
      ? 'hidden'
      : 'visible',
  categoryActive: {},
};

export const createNotionStore = (
  initState: NotionState = defaultInitState
) => {
  return createStore<NotionStore>()((set, get) => ({
    ...initState,
    updateImageModalUrl: (imageUrl: string) => {
      set({ imageModalUrl: imageUrl });
    },
    updateModalFlag: (id: string) => {
      set((state) => ({
        modalFlag: {
          ...state.modalFlag,
          [id]: !state.modalFlag[id], // toggle
        },
      }));
    },
    updateCategoryActiveById: (id) => {
      set((state) => ({
        categoryActive: {
          ...state.categoryActive, // 기존 상태를 유지
          [id]: !state.categoryActive[id], // 특정 `id`의 상태를 토글
        },
      }));
    },
    updateCategoryNavigation: () => {
      set({
        categoryNavigation:
          get().categoryNavigation === 'visible' ? 'hidden' : 'visible',
      });
    },
  }));
};
