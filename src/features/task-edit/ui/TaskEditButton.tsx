import { Button } from "@/shared/ui/button";
import { Edit } from "lucide-react";
import { useTaskEditStore } from "../store/task.store";

export const TaskEditButton = () => {
  const startEdit = useTaskEditStore((state) => state.startEdit);

  const handleClick = () => {
    startEdit();
  };
  return (
    <Button
      variant="outline"
      size="icon"
      className="h-7 w-7"
      onClick={handleClick}
    >
      <Edit className="h-4 w-4" />
      <span className="sr-only">Edit</span>
    </Button>
  );
};
