import { ISubTask } from "@/entites/subtask";
import { useSubTaskByTaskId } from "@/entites/subtask/hooks";
import { SubTaskNew } from "@/features/subtask-new";
import { taskIdRoute } from "@/pages/taskPage";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

export const SubtaskManger = () => {
  const { taskId } = taskIdRoute?.useParams?.<{ taskId: string }>();

  const { data: subTasks } = useSubTaskByTaskId(taskId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Подзадачи</CardTitle>
        <CardDescription>
          Если задача достаточно крупная вы можете разбить ее на подзадачи
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Название</TableHead>
              <TableHead className="w-full text-center">Описание</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subTasks?.map(({ title, id, description }: ISubTask) => (
              <TableRow key={id}>
                <TableCell className="font-semibold">{title}</TableCell>
                <TableCell>{description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        <SubTaskNew taskId={taskId} />
      </CardFooter>
    </Card>
  );
};
