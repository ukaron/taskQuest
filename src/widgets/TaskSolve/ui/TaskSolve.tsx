import { useTaskByIdSubscription } from "@/entites/task";
import CountdownTimer from "@/features/timer-run/ui/TimerRun";
import { taskIdRoute } from "@/pages/taskPage";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { useState } from "react";
import { Settings as SettingIcon } from "lucide-react";
import { useTaskSolveStore } from "../store";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Settings } from "@/features/settings-set";
const { ipcRenderer } = window.require
  ? window.require("electron")
  : { ipcRenderer: null };

export const TaskSolve = () => {
  const [showTimer, setShowTimer] = useState(false);
  const { taskId } = taskIdRoute.useParams();
  const { data: task } = useTaskByIdSubscription(taskId);
  const stopSolve = useTaskSolveStore((state) => state.stopSolve);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>{task?.title}</CardTitle>
        <Popover>
          <PopoverTrigger>
            <SettingIcon />
          </PopoverTrigger>
          <PopoverContent>
            <Settings />
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <p>{task?.description}</p>
          </div>
          <div className="grid gap-3">{showTimer && <CountdownTimer />}</div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex items-center justify-center gap-10 ">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              stopSolve();
            }}
          >
            Назад
          </Button>
          <Button size="sm" onClick={() => setShowTimer(true)}>
            Таймер
          </Button>
          {/* <Button
            size="icon"
            onClick={() => {
              if (ipcRenderer) {
                ipcRenderer.send("make-transparent");
              } else {
                console.warn("ipcRenderer is not available");
              }
            }}
          >
            <Settings />
          </Button> */}
        </div>
      </CardFooter>
    </Card>
  );
};
