import { useTasksByProjectId } from "@/entites/task/hooks";
import { projectIdRoute } from "@/pages/project-read";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Loader } from "@/shared/ui/loader";
import { TaskTable } from "./TaskTable";
import { columns } from "./colums";

export const TaskList = ({ children }: { children: React.ReactNode }) => {
  const { projectId } = projectIdRoute.useParams();
  const { data: tasks, error, isLoading } = useTasksByProjectId(projectId);

  return (
    <Card x-chunk="dashboard-07-chunk-1">
      <CardHeader className="flex-row gap-5">
        <CardTitle>Задачи </CardTitle>
        {isLoading && <Loader />}
      </CardHeader>
      <CardContent>
        {tasks && <TaskTable data={tasks} columns={columns} />}
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        {children}
      </CardFooter>
    </Card>
  );
};
