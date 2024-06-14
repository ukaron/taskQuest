import { ITask } from "../../../entites/task/models";

export interface IProjectListProps {
  projects: IProject[];
  onSelectProject: (projectId: IProject["id"]) => void;
}

export interface IProject {
  id: string;
  name: string;
  tasks: ITask[];
}
