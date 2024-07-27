import { Outlet, createRouter, createRootRoute } from "@tanstack/react-router";
import { indexRoute } from "../pages/home";
import { projectIdRoute } from "../pages/project-read";
import { authRoute } from "../pages/auth";
import { newProjectRoute } from "../pages/project-new";
import { Header } from "@/widgets/header";
import { taskIdRoute } from "@/pages/taskPage";
import { useTaskSolveStore } from "@/widgets/TaskSolve";
import { projectsRoute } from "@/pages/projects";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const rootRoute = createRootRoute({
  component: () => {
    const isSolveTask = useTaskSolveStore((state) => state.isSolve);
    return (
      <div className="w-full h-full flex justify-center items-center flex-col">
        {!isSolveTask && <Header />}
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    );
  },
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  projectsRoute.addChildren([projectIdRoute.addChildren([taskIdRoute])]),
  authRoute,
  newProjectRoute,
]);

export const router = createRouter({ routeTree });
