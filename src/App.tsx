import React from "react";
import ProjectList from "./features/project-list/ui/ProjectList";
import testProjects from "./shared/constans/project-list.data";
import { IProjectListProps } from "./features/project-list/models";

function App() {
  const onSelectProject: IProjectListProps["onSelectProject"] = (
    projectId,
    taskId
  ) => {
    console.log(projectId, taskId);
  };

  return (
    <div className="w-screen h-screen">
      <ProjectList
        projects={testProjects}
        onSelectProject={onSelectProject}
      ></ProjectList>
    </div>
  );
}

export default App;
