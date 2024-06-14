import React from "react";
import { IProjectListProps } from "../models";

const ProjectList = ({ projects, onSelectProject }: IProjectListProps) => {
  return (
    <div className="project-list">
      <h2>Список проектов</h2>
      {projects.map((project) => (
        <div key={project.id} className="project-item">
          <h3>{project.name}</h3>
          <ul>
            {project.tasks.map((task) => (
              <li key={task.id}>
                <span>{task.title}</span>
                <button onClick={() => onSelectProject(project.id, task.id)}>
                  Выбрать задачу
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
