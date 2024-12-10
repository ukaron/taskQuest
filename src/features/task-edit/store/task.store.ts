import { create } from "zustand";

interface TaskEditState {
  isEdit: boolean;
  startEdit: () => void;
  stopEdit: () => void;
}

export const useTaskEditStore = create<TaskEditState>((set) => ({
  isEdit: false,
  startEdit: () => set({ isEdit: true }),
  stopEdit: () => set({ isEdit: false }),
}));
