import { useTasksByProjectIdSubscription } from "@/entites/task/hooks";
import { projectIdRoute } from "@/pages/project-read";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Loader } from "@/shared/ui/loader";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { TaskRow } from "./TaskRow";

export const TaskList = ({ children }: { children: React.ReactNode }) => {
  const { projectId } = projectIdRoute.useParams();
  const {
    data: tasks,
    error,
    isLoading,
  } = useTasksByProjectIdSubscription(projectId);

  return (
    <Card x-chunk="dashboard-07-chunk-1">
      <CardHeader className="flex-row gap-5">
        <CardTitle>Задачи </CardTitle>
        {isLoading && <Loader />}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-full">Название</TableHead>
              <TableHead className="w-[50px]">Важность</TableHead>
              <TableHead className="w-[50px]">Срочность</TableHead>
              <TableHead className="w-[50px]">Объем</TableHead>
            </TableRow>
          </TableHeader>
          {!!tasks?.length && (
            <TableBody>
              {tasks?.map((task) => <TaskRow isEdit={false} task={task} />)}
            </TableBody>
          )}
        </Table>
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        {children}
      </CardFooter>
    </Card>
  );
};
