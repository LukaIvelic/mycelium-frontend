import { create } from 'zustand';

interface SheetStore {
  open: boolean;
  data: unknown;
  openSheet: (data: unknown) => void;
  closeSheet: () => void;
}

const useSheetStore = create<SheetStore>((set) => ({
  open: false,
  data: null,
  openSheet: (data) => set({ open: true, data }),
  closeSheet: () => set({ open: false }),
}));

export function useSheet() {
  const { open, data, openSheet, closeSheet } = useSheetStore();
  return { open, data, openSheet, closeSheet };
}
