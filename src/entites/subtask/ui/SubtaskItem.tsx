import { Check, Square, SquareCheckBig } from "lucide-react";

interface SubtaskItemProps {
  subtask: {
    id: string;
    title: string;
    status: string;
  };
  onStatusChange: (id: string, status: string) => void;
}

const SubtaskItem: React.FC<SubtaskItemProps> = ({
  subtask,
  onStatusChange,
}: SubtaskItemProps) => {
  const handleStatusChange = () => {
    onStatusChange(subtask.id, subtask.status);
  };

  return (
    <div>
      <button onClick={handleStatusChange}>
        {subtask.status === "completed" ? <SquareCheckBig /> : <Square />}
      </button>
      <span
        style={{
          textDecoration:
            subtask.status === "completed" ? "line-through" : "none",
        }}
      >
        {subtask.title}
      </span>
    </div>
  );
};

export default SubtaskItem;
