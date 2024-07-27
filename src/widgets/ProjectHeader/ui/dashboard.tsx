import { useProjectSubscription } from "@/entites/project";
import { ProjectEditButton, ProjectEditForm } from "@/features/project-edit";
import { projectIdRoute } from "@/pages/project-read";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { useState } from "react";

export function ProjectHeader() {
  const [edit, setEdit] = useState(false);
  const { projectId } = projectIdRoute.useParams();
  const { data } = useProjectSubscription(projectId);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <ProjectEditButton edit={edit} setEdit={setEdit} />
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {data?.name}
          </h1>
          <Badge variant="outline" className="ml-auto sm:ml-0">
            In stock
          </Badge>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm">
            Discard
          </Button>
          <Button size="sm">Save Product</Button>
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
