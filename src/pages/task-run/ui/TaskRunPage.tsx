import { createPrivateRoute } from "@/shared/lib/utils";
import { TaskSolve } from "@/widgets/TaskSolve";

export const taskRunIdRoute = createPrivateRoute({
  path: "task/$taskId",
  component: TaskRunPage,
});

export function TaskRunPage() {
  return (
    <div className="flex flex-1 py-8 w-full flex-col bg-muted/40">
      <main className="grid max-w-[1200px] container flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <TaskSolve />
      </main>
    </div>
  );
}
