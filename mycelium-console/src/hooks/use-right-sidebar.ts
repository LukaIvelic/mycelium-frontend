import { create } from 'zustand';

export const RIGHT_SIDEBAR_DEFAULT_WIDTH = 320;
export const RIGHT_SIDEBAR_MAX_WIDTH = 520;
export const RIGHT_SIDEBAR_MIN_WIDTH = 280;

interface RightSidebarStore {
  content: React.ReactNode | null;
  state: boolean;
  width: number;
  openRightSidebar: (node: React.ReactNode | null) => void;
  closeRightSidebar: () => void;
  setState: (state: boolean) => void;
  setContent: (content: React.ReactNode | null) => void;
  setWidth: (width: number) => void;
}

const useRightSidebarStore = create<RightSidebarStore>((set) => ({
  content: null,
  state: false,
  width: RIGHT_SIDEBAR_DEFAULT_WIDTH,
  setContent: (content) => set({ content }),
  openRightSidebar: (node) => set({ state: true, content: node }),
  closeRightSidebar: () => set({ state: false, content: null }),
  setState: (state: boolean) => set({ state }),
  setWidth: (width: number) =>
    set({
      width: Math.min(
        RIGHT_SIDEBAR_MAX_WIDTH,
        Math.max(RIGHT_SIDEBAR_MIN_WIDTH, width),
      ),
    }),
}));

export function useRightSidebar() {
  const {
    state,
    content,
    width,
    openRightSidebar,
    closeRightSidebar,
    setState,
    setWidth,
  } = useRightSidebarStore();
  return {
    state,
    content,
    width,
    openRightSidebar,
    closeRightSidebar,
    setState,
    setWidth,
  };
}
