export interface ISubTask {
  id: string;
  title: string;
  description: string;
  taskId: string; // связь с основной задачей
  status: string;
  createdAt: Date;
  dueDate?: Date;
}
