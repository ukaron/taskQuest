import { useProjectById } from "@/entites/project";
import { ProjectEditButton, ProjectEditForm } from "@/features/project-edit";
import { projectIdRoute } from "@/pages/project-read";
import { Badge } from "@/shared/ui/badge";
import { useState } from "react";

export function ProjectHeader() {
  const [edit, setEdit] = useState(false);
  const { projectId }: { projectId: string } = projectIdRoute.useParams();
  const { data } = useProjectById(projectId);

  return (
    <>
      <div className="flex items-center justify-between py-4">
        <div className="flex gap-4">
          <ProjectEditButton edit={edit} setEdit={setEdit} />
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {data?.name}
          </h1>
          <Badge variant="outline" className="ml-auto sm:ml-0">
            In stock
          </Badge>
        </div>
      </div>
      {edit && (
        <ProjectEditForm
          project={data}
          onExitEdit={() => {
            setEdit(false);
          }}
        />
      )}
    </>
  );
}
