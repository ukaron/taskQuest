import create from "zustand";

interface TaskSolveState {
  isSolve: boolean;
  startSolve: () => void;
  stopSolve: () => void;
}

export const useTaskSolveStore = create<TaskSolveState>((set) => ({
  isSolve: false,
  startSolve: () => set({ isSolve: true }),
  stopSolve: () => set({ isSolve: false }),
}));
