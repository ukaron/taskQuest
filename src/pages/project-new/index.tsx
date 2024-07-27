import { ProjectNewForm } from "@/features/project-new";
import { createPrivateRoute } from "@/shared/lib/utils";

export const newProjectRoute = createPrivateRoute({
  path: "/project-new",
  component: NewProjectPage,
});

export function NewProjectPage() {
  return (
    <>
      <ProjectNewForm />
    </>
  );
}
