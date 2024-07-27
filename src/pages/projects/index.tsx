import { createPrivateRoute } from "@/shared/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "../../shared/ui/button";
import { ProjectListWidjet } from "@/widgets/ProjectList";

export const projectsRoute = createPrivateRoute({
  path: "/projects",
  component: ProjectsPage,
});

function ProjectsPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate({ to: "/project-new" });
  };

  return (
    <div className="p-2">
      <ProjectListWidjet />
      <Button onClick={handleClick}>Create new</Button>
    </div>
  );
}

export default ProjectsPage;
