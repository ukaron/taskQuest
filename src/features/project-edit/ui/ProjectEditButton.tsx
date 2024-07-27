import { Button } from "@/shared/ui/button";
import { Edit } from "lucide-react";

export const ProjectEditButton = ({
  setEdit,
  edit,
}: {
  setEdit: (state: boolean) => void;
  edit: boolean;
}) => {
  return (
    <Button
      variant="outline"
      size="icon"
      className="h-7 w-7"
      onClick={() => {
        setEdit(!edit);
      }}
    >
      <Edit className="h-4 w-4" />
      <span className="sr-only">Edit</span>
    </Button>
  );
};
