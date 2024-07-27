import { ITask } from "@/entites/task/models";

export interface IProject {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  createdAt: Date;
  projects: ITask[];
}
