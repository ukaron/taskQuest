import { useTaskByIdSubscription } from "@/entites/task";
import { Settings } from "@/features/settings-set";
import SubtaskList from "@/features/task-run/ui";
import CountdownTimer from "@/features/timer-run/ui/TimerRun";
import { taskRunIdRoute } from "@/pages/task-run";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";
import { useRouter } from "@tanstack/react-router";
import { Info, Settings as SettingIcon } from "lucide-react";
import { useState } from "react";
// const { ipcRenderer } = window.require
//   ? window.require("electron")
//   : { ipcRenderer: null };

export const TaskSolve = () => {
  const [showTimer, setShowTimer] = useState(false);
  const { taskId } = taskRunIdRoute.useParams();
  const { data: task } = useTaskByIdSubscription(taskId);
  const router = useRouter();
  const onBack = () => router.history.back();

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle className="gap-3 flex">
          {task?.title}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info />
              </TooltipTrigger>
              <TooltipContent>
                <p>{task?.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
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
          <SubtaskList />
          <div className="grid gap-3">{showTimer && <CountdownTimer />}</div>
          {/* <div className="grid gap-3">
            {showTimer && (
              <TimerControls isPaused={isPaused} togglePause={togglePause} />
            )}
          </div> */}
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex items-center justify-center gap-10 ">
          <Button variant="outline" size="sm" onClick={onBack}>
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
