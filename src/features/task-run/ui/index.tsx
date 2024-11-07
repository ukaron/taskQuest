import { useEffect, useRef, useState } from "react";
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
  const isMounted = useRef(false);

  const handleStatusChange = (id: string, status: string) => {
    if (status !== "completed") {
      const nextSubtask = subtasks?.find(
        (t) => t.id !== activeSubtask && t.status !== "completed"
      );
      nextSubtask &&
        updateSubtaskStatus({ subtaskId: nextSubtask.id, status: "active" });
      updateSubtaskStatus({ subtaskId: id, status: "completed" });
      setActiveSubtask(nextSubtask?.id || null);
    } else {
      setCurrentSubtask(id);
      setDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    if (currentSubtask) {
      updateSubtaskStatus({ subtaskId: currentSubtask, status: "incomplete" });
      setCurrentSubtask(null);
    }
    setDialogOpen(false);
  };

  const handleDialogConfirm = () => {
    if (currentSubtask) {
      setActiveSubtask(currentSubtask);
      updateSubtaskStatus({ subtaskId: currentSubtask, status: "active" });
      setCurrentSubtask(null);
    }
    setDialogOpen(false);
  };

  useEffect(() => {
    if (subtasks?.[0] && !isMounted.current) {
      const nextSubtask = subtasks
        .sort((a, b) => a.createdAt?.seconds - b.createdAt?.seconds)
        ?.find((t) => t.id !== currentSubtask && t.status !== "completed");
      const activeSubtask = subtasks?.find((t) => t.status === "active");

      setActiveSubtask(activeSubtask?.id || nextSubtask?.id || null);
      isMounted.current = true;
    }
  }, [subtasks]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {subtasks &&
        subtasks
          .filter((t) => t.status === "completed")
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

      {activeSubtask && (
        <SubtaskItem
          subtask={subtasks?.find(({ id }) => activeSubtask === id)}
          onStatusChange={handleStatusChange}
        />
      )}
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
