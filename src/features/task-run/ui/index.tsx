import { useEffect, useState } from "react";
import {
  useSubTaskByTaskIdSubscription,
  useUpdateSubtaskStatus,
} from "@/entites/subtask/hooks";
import SubtaskItem from "@/entites/subtask/ui/SubtaskItem";
import { taskRunIdRoute } from "@/pages/task-run";

const SubtaskList: React.FC = () => {
  const { taskId } = taskRunIdRoute.useParams();
  const { data: subtasks, isLoading } = useSubTaskByTaskIdSubscription(taskId);
  const { mutate: updateSubtaskStatus } = useUpdateSubtaskStatus();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeSubtask, setActiveSubtask] = useState<string | null>(null);
  const [currentSubtask, setCurrentSubtask] = useState<string | null>(null);

  const handleStatusChange = (id: string, status: string) => {
    if (status === "active") {
      updateSubtaskStatus({ subtaskId: id, status: "completed" });
      const nextSubtask = subtasks?.find(
        (t) => t.id !== currentSubtask && t.status === "incompleted"
      );
      if (!nextSubtask) {
        setActiveSubtask(null);
        return;
      }
      setActiveSubtask(nextSubtask.id);
      updateSubtaskStatus({ subtaskId: nextSubtask.id, status: "active" });
    } else {
      setCurrentSubtask(id);
      updateSubtaskStatus({ subtaskId: id, status: "incompleted" });
      setDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogConfirm = () => {
    if (currentSubtask) {
      const prevSubtask = activeSubtask;
      setActiveSubtask(currentSubtask);
      updateSubtaskStatus({ subtaskId: currentSubtask, status: "active" });
      if (prevSubtask)
        updateSubtaskStatus({
          subtaskId: prevSubtask,
          status: "incompleted",
        });
    }
    handleDialogClose();
  };

  useEffect(() => {
    if (activeSubtask === null && subtasks?.[0]) {
      const nextSubtask = subtasks?.find(
        (t) => t.id !== currentSubtask && t.status === "incompleted"
      );
      if (!nextSubtask) {
        setActiveSubtask(null);
        return;
      }
      updateSubtaskStatus({ subtaskId: subtasks?.[0].id, status: "active" });
      setActiveSubtask(subtasks[0].id);
    }
  }, [subtasks]);

  if (isLoading) return <div>Loading...</div>;
  console.log(subtasks);

  return (
    <div>
      {subtasks &&
        subtasks
          .filter((t) => t.id === activeSubtask || t.status === "completed")
          .map((subtask) => (
            <SubtaskItem
              key={subtask.id}
              subtask={subtask}
              onStatusChange={handleStatusChange}
            />
          ))}
      <ConfirmationDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onConfirm={handleDialogConfirm}
      />
    </div>
  );
};

export default SubtaskList;
interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  if (!open) return null;

  return (
    <div className="dialog">
      <div className={"dialog-content"}>
        <h3>Сделать подзадачу активной?</h3>
        <button onClick={onConfirm}>Да</button>
        <button onClick={onClose}>Нет</button>
      </div>
    </div>
  );
};
