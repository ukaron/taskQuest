import { Timestamp } from "firebase/firestore";

export interface ISubTask {
  id: string;
  title: string;
  description: string;
  taskId: string; // связь с основной задачей
  status: string;
  createdAt: Timestamp;
  dueDate?: Date;
}
