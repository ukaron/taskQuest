import React from "react";
import ProjectList from "../../features/project-list/ui/ProjectList";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../app/_router";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

function HomePage() {
  return (
    <div className="p-2">
      <ProjectList />
    </div>
  );
}

export default HomePage;
