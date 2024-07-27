import { IProject, useDeleteProject } from "@/entites/project";
import { ProjectNewForm } from "@/features/project-new";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/ui/alert-dialog";
import { Button } from "@/shared/ui/button";

import { useNavigate } from "@tanstack/react-router";
import React from "react";

interface IProjectEditFormProps {
  project?: IProject;
}

export const ProjectDeleteButton: React.FC<IProjectEditFormProps> = ({
  project,
}: IProjectEditFormProps) => {
  const navigator = useNavigate();
  const { mutate: deleteProject } = useDeleteProject();

  const handleClickRemove = () => {
    if (project?.id) {
      deleteProject(project.id);
      navigator({ to: "../" });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button size="sm" variant="destructiveOutline">
          Удалить
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить проект</AlertDialogTitle>
          <AlertDialogDescription>
            Вы уверены, что хотите этот удалить проект?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            variant="destructiveOutline"
            onClick={handleClickRemove}
          >
            Удалить
          </AlertDialogCancel>
          <AlertDialogAction variant="default">Отменить</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProjectNewForm;
