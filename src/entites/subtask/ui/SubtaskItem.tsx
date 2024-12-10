import { Square, SquareCheckBig } from "lucide-react";
import { ISubTask } from "../models";

interface SubtaskItemProps {
  subTask: ISubTask;
  onStatusChange: (id: string, status: string) => void;
}

const SubtaskItem: React.FC<SubtaskItemProps> = ({
  subTask,
  onStatusChange,
}: SubtaskItemProps) => {
  const handleStatusChange = () => {
    onStatusChange(subTask?.id, subTask?.status);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center flex-row h-10 gap-3">
        <button onClick={handleStatusChange}>
          {subTask?.status === "completed" ? <SquareCheckBig /> : <Square />}
        </button>
        <div
          className="text-[20px]"
          style={{
            textDecoration:
              subTask?.status === "completed" ? "line-through" : "none",
          }}
        >
          {subTask?.title}
        </div>
      </div>
      {subTask.status === "active" && (
        <div className="text-[14px] text-primary">{subTask?.description}</div>
      )}
    </div>
  );
};

export default SubtaskItem;
