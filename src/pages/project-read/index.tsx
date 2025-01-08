import { TaskList } from "@/features/task-list";
import { TaskNew } from "@/features/task-new";
import { createPrivateRoute } from "@/shared/lib/utils";
import { ProjectHeader } from "@/widgets/ProjectHeader";

export const projectIdRoute = createPrivateRoute({
  path: "projects/$projectId",
  component: ProjectPage,
});

export function ProjectPage() {
  return (
    <div className="flex min-h-[calc(100dvh - 72px)] flex-1 w-full flex-col bg-muted/40 overflow-hidden">
      <main className="flex flex-col flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 overflow-hidden">
        <ProjectHeader />
        <TaskList>
          <TaskNew />
        </TaskList>
      </main>
    </div>
  );
}
