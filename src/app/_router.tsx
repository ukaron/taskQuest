import {
  Outlet,
  createRouter,
  createRootRoute,
  createHashHistory,
} from "@tanstack/react-router";
import { indexRoute } from "../pages/home";
import { projectIdRoute } from "../pages/project-read";
import { authRoute } from "../pages/auth";
import { Header } from "@/widgets/header";
import { taskIdRoute } from "@/pages/taskPage";
import { useTaskSolveStore } from "@/widgets/TaskSolve";
import { projectsRoute } from "@/pages/projects";
import { taskRunIdRoute } from "@/pages/task-run";
import { telegramRoute } from "@/pages/telegram";
import { Toaster } from "@/shared/ui/sonner";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const rootRoute = createRootRoute({
  component: () => {
    const isSolveTask = useTaskSolveStore((state) => state.isSolve);
    return (
      <div className="w-full h-screen flex items-center flex-col">
        {!isSolveTask && <Header />}
        <Outlet />
        <Toaster />
      </div>
    );
  },
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  projectsRoute.addChildren([projectIdRoute.addChildren([taskIdRoute])]),
  taskRunIdRoute,
  authRoute,
  telegramRoute,
]);

const hashHistory = createHashHistory();
export const router = createRouter({ routeTree, history: hashHistory });
