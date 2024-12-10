import { useProjectById } from "@/entites/project";
import { useTaskById } from "@/entites/task";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";
import { Link, useRouterState } from "@tanstack/react-router";

export const Breadcrumbs = () => {
  const selected = useRouterState({
    select: (state) => state,
  });

  const links = selected.location.pathname.split("/").filter(Boolean);

  let projectId: string | undefined;
  let taskId: string | undefined;

  if (links[0] === "projects" && links.length >= 2) {
    projectId = links[1];
    if (links.length === 3) {
      taskId = links[2];
    }
  } else if (links[0] === "task" && links.length === 2) {
    taskId = links[1];
  }

  if (links.length < 1) return null;

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild href="/">
            <Link to="/">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* Отображаем проект, если есть projectId */}
        {projectId && <ProjectLink id={projectId} current={!taskId} />}

        {/* Отображаем задачу, если есть taskId */}
        {taskId && <TaskLink id={taskId} />}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const ProjectLink = ({ id, current }: { id: string; current: boolean }) => {
  const { data: project } = useProjectById(id);

  return (
    <>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        {current ? (
          <BreadcrumbItem>
            <BreadcrumbPage>{project?.name}</BreadcrumbPage>
          </BreadcrumbItem>
        ) : (
          <BreadcrumbLink asChild href={`/projects/${project?.id}`}>
            <Link to={`/projects/${project?.id}`}>{project?.name}</Link>
          </BreadcrumbLink>
        )}
      </BreadcrumbItem>
    </>
  );
};

const TaskLink = ({ id }: { id: string }) => {
  const { data: task, isLoading } = useTaskById(id);

  return (
    !isLoading && (
      <>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{task?.title}</BreadcrumbPage>
        </BreadcrumbItem>
      </>
    )
  );
};
