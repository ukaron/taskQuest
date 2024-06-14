import React from "react";
import testProjects from "../../../shared/constans/project-list.data";
import { Avatar, AvatarImage, AvatarFallback } from "../../../shared/ui/avatar";
import { Link } from "@tanstack/react-router";

const ProjectList = () => {
  return (
    <div className="p-4 w-full flex justify-center items-center flex-col gap-9">
      <h2 className="font-bold">Список проектов</h2>
      <div className="flex flex-col gap-3">
        {testProjects.map((project) => (
          <Link key={project.id} to={project.id}>
            <div key={project.id} className="flex gap-3 items-center">
              <Avatar className="w-[50px] h-[50px]">
                <AvatarImage src="https://placehold.co/50x50" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h3>{project.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
