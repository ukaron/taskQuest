import { SubtaskManger } from "@/widgets/SubtaskList/ui/SubtaskList";
import { createPrivateRoute } from "@/shared/lib/utils";
import { TaskDetails } from "@/widgets/TaskDetails/ui/TaskDetails";
import { TaskHeader } from "@/widgets/TaskHeader/ui/TaskHeader";
import { TaskSolve, useTaskSolveStore } from "@/widgets/TaskSolve";

export const taskIdRoute = createPrivateRoute({
  path: "projects/$projectId/$taskId",
  component: TaskPage,
});

export function TaskPage() {
  const isSolve = useTaskSolveStore((state) => state.isSolve);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="grid max-w-[1200px] container flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        {isSolve ? (
          <TaskSolve />
        ) : (
          <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4 pt-4">
            <TaskHeader />
            <div className="grid max-w-[1024px] w-full mx-auto gap-4   lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <TaskDetails />
                <SubtaskManger />
                {/* <TaskList>
                <TaskNew />
              </TaskList> */}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
