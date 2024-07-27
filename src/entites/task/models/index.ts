export interface ITask {
  id: string;
  title: string;
  description: string;
  projectId: string;
  status: string;
  priority: "1" | "2" | "3";
  importance: "1" | "2" | "3";
  complexity: "1" | "2" | "3";
  createdAt: Date;
  dueDate?: Date;
}
export const testTasks: ITask[] = [
  {
    id: "1",
    title: "Setup project repository",
    description: "Initialize git repository and setup project structure",
    projectId: "proj1",
    status: "completed",
    priority: "2", // Средний приоритет
    importance: "3", // Высокая важность
    complexity: "1", // Малый объем
    createdAt: new Date("2024-01-10T10:00:00Z"),
    dueDate: new Date("2024-01-15T10:00:00Z"),
  },
  {
    id: "2",
    title: "Design project logo",
    description: "Create a logo for the project",
    projectId: "proj1",
    status: "in-progress",
    priority: "3", // Высокий приоритет
    importance: "2", // Средняя важность
    complexity: "2", // Средний объем
    createdAt: new Date("2024-01-12T09:00:00Z"),
  },
  {
    id: "3",
    title: "Implement user authentication",
    description: "Develop and integrate user authentication system",
    projectId: "proj2",
    status: "not-started",
    priority: "1", // Низкий приоритет
    importance: "3", // Высокая важность
    complexity: "3", // Большой объем
    createdAt: new Date("2024-01-15T08:00:00Z"),
    dueDate: new Date("2024-01-20T08:00:00Z"),
  },
  {
    id: "4",
    title: "Write project documentation",
    description: "Prepare and write detailed project documentation",
    projectId: "proj2",
    status: "in-progress",
    priority: "2", // Средний приоритет
    importance: "2", // Средняя важность
    complexity: "2", // Средний объем
    createdAt: new Date("2024-01-16T11:00:00Z"),
  },
  {
    id: "5",
    title: "Conduct user testing",
    description: "Plan and conduct user testing sessions",
    projectId: "proj3",
    status: "not-started",
    priority: "3", // Высокий приоритет
    importance: "3", // Высокая важность
    complexity: "3", // Большой объем
    createdAt: new Date("2024-01-17T14:00:00Z"),
    dueDate: new Date("2024-01-25T14:00:00Z"),
  },
];
