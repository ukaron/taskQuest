import { createRoute } from "@tanstack/react-router";
import React from "react";
import { rootRoute } from "../../app/_router";

export const projectIdRoute: any = createRoute({
  getParentRoute: () => rootRoute,
  path: "/$projectId",
  component: ProjectPage,
});

export function ProjectPage() {
  const { projectId } = projectIdRoute.useParams();

  return <>{projectId}</>;
}
