import { create } from 'zustand';

interface RightSidebarStore {
  state: boolean;
  content: React.ReactNode | null;
  openRightSidebar: (node: React.ReactNode | null) => void;
  closeRightSidebar: () => void;
  setState: (state: boolean) => void;
  setContent: (content: React.ReactNode | null) => void;
}

const useRightSidebarStore = create<RightSidebarStore>((set) => ({
  state: false,
  content: null,
  setContent: (content) => set({ content }),
  openRightSidebar: (node) => set({ state: true, content: node }),
  closeRightSidebar: () => set({ state: false, content: null }),
  setState: (state: boolean) => set({ state }),
}));

export function useRightSidebar() {
  const { state, content, openRightSidebar, closeRightSidebar, setState } =
    useRightSidebarStore();
  return { state, content, openRightSidebar, closeRightSidebar, setState };
}
