import { useTaskByIdSubscription } from "@/entites/task/hooks";
import { TaskEditButton } from "@/features/task-edit/ui/TaskEditButton";
import { taskIdRoute } from "@/pages/taskPage";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Link } from "@tanstack/react-router";

export function TaskHeader() {
  const { taskId } = taskIdRoute.useParams();
  const { data: task } = useTaskByIdSubscription(taskId);

  return (
    <>
      <div className="w-full max-w-[1020px] mx-auto flex items-center justify-between">
        <div className="flex gap-4">
          <TaskEditButton />
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {task?.title}
          </h1>
          <Badge variant="default" className="ml-auto sm:ml-0">
            Cрочная
          </Badge>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm">
            Discard
          </Button>
          <Link to={`/task/${taskId}`}>
            <Button size="sm">Выполнить</Button>
          </Link>
        </div>
      </div>
      {/* {edit && (
        <ProjectEditForm
          project={task}
          onExitEdit={() => {
            setEdit(false);
          }}
        />
      )} */}
    </>
  );
}
