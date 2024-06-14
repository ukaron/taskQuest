export interface ITask {
  id: string;
  title: string;
  status: string;
  priority?: string;
  subtasks?: ITask[];
}
