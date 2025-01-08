import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface TaskEditState {
  isEdit: boolean;
  startEdit: () => void;
  stopEdit: () => void;
}

export const useTaskEditStore = create<TaskEditState>()(
  devtools(
    (set) => ({
      isEdit: false,
      startEdit: () => set({ isEdit: true }),
      stopEdit: () => set({ isEdit: false }),
    }),
    { name: "TaskEditState" }
  )
);
