import { create } from "zustand";
import type { ProjectTopologyNode } from "@/lib/types/log";

interface SheetStore {
  open: boolean;
  selectedNode: ProjectTopologyNode | null;
  openSheet: (node: ProjectTopologyNode) => void;
  closeSheet: () => void;
}

const useSheetStore = create<SheetStore>((set) => ({
  open: false,
  selectedNode: null,
  openSheet: (node) => set({ open: true, selectedNode: node }),
  closeSheet: () => set({ open: false }),
}));

export function useSheet() {
  const { open, selectedNode, openSheet, closeSheet } = useSheetStore();
  return { open, selectedNode, openSheet, closeSheet };
}
