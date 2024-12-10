import { useTaskById } from "@/entites/task";
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
import { Info, Settings as SettingIcon, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
// const { ipcRenderer } = window.require
//   ? window.require("electron")
//   : { ipcRenderer: null };

export const TaskSolve = () => {
  const [showTimer, setShowTimer] = useState(false);
  const { taskId } = taskRunIdRoute.useParams();
  const { data: task } = useTaskById(taskId);
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
        <SoundButton />
        <SettingsWrapper />
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {showTimer && <CountdownTimer />}
          <SubtaskList />
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
        </div>
      </CardFooter>
    </Card>
  );
};

const SoundButton = () => {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const tickSoundRef = useRef<HTMLAudioElement | null>(null);

  const handleClick = () => {
    if (!tickSoundRef?.current) return;

    if (isSoundOn) {
      tickSoundRef.current.play();
      tickSoundRef.current.loop = true;
    } else {
      if (tickSoundRef?.current?.pause) tickSoundRef.current?.pause?.();
    }
    setIsSoundOn((state) => !state);
  };

  useEffect(() => {
    if (tickSoundRef.current && isSoundOn) {
      tickSoundRef.current.play();
      tickSoundRef.current.loop = true;
    }
  }, [tickSoundRef.current]);
  return (
    <>
      <Button size="icon" variant="outline" onClick={handleClick}>
        {isSoundOn ? <Volume2 /> : <VolumeX />}
      </Button>
      {/* Звук тиканья */}
      <audio ref={tickSoundRef} src="/tick.mp3" preload="auto" />
    </>
  );
};

const SettingsWrapper = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <SettingIcon />
      </PopoverTrigger>
      <PopoverContent>
        <Settings />
      </PopoverContent>
    </Popover>
  );
};
