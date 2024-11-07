import { Check, Square, SquareCheckBig } from "lucide-react";

interface SubtaskItemProps {
  subtask: {
    id: string;
    title: string;
    status: string;
    description: string;
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
  console.log(subtask);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center flex-row h-10 gap-3">
        <button onClick={handleStatusChange}>
          {subtask.status === "completed" ? <SquareCheckBig /> : <Square />}
        </button>
        <div
          className="text-[20px]"
          style={{
            textDecoration:
              subtask.status === "completed" ? "line-through" : "none",
          }}
        >
          {subtask.title}
        </div>
      </div>
      {subtask.status === "active" && (
        <div className="text-[14px] text-primary">{subtask.description}</div>
      )}
    </div>
  );
};

export default SubtaskItem;
