import { createStore } from 'zustand/vanilla';

type CategoryNavigationType = 'visible' | 'hidden';

export type NotionState = {
  imageModalUrl: string;
  modalFlag: Record<string, boolean>;
  categoryNavigation: CategoryNavigationType;
};

export type NotionActions = {
  updateImageModalUrl: (imageUrl: string) => void;
  updateModalFlag: (id: string) => void;
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
    updateCategoryNavigation: () => {
      set({
        categoryNavigation:
          get().categoryNavigation === 'visible' ? 'hidden' : 'visible',
      });
    },
  }));
};
