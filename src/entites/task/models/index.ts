export interface ITask {
  id: string;
  title: string;
  description: string;
  projectId: string;
  status: TaskStatus;
  order: number;
  priority: "1" | "2" | "3";
  importance: "1" | "2" | "3";
  complexity: "1" | "2" | "3";
  createdAt: Date;
  dueDate?: Date;
}

export enum TaskStatus {
  Open,
  InProgress,
  Done,
  OnHold,
  Canceled,
  Backlog,
}
