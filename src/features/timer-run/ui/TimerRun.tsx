import { useState, useEffect } from "react";
import { Button } from "@/shared/ui/button";
import { Pause, Play, SkipForward } from "lucide-react";

enum TimerStatus {
  Work,
  ShortBreak,
  LongBreak,
}

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(40 * 60);
  const settings = {
    workTime: 40 * 60,
    shortBreakTime: 5 * 60,
    longBreakTime: 20 * 60,
    longBreakSessionsCount: 4,
  };
  const [status, setStatus] = useState(TimerStatus.Work);
  const [isPaused, setIsPaused] = useState(true);
  const [sessionsCount, setSessionsCount] = useState(0);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const setNextStatus = () => {
    if (status === TimerStatus.Work) {
      setSessionsCount((state) => state + 1);
      if (sessionsCount % settings.longBreakSessionsCount === 0) {
        setStatus(TimerStatus.LongBreak);
        setIsPaused(true);
        setTimeLeft(settings.longBreakTime);
      } else {
        setStatus(TimerStatus.ShortBreak);
        setIsPaused(true);
        setTimeLeft(settings.shortBreakTime);
      }
    } else {
      setStatus(TimerStatus.Work);
      setIsPaused(true);
      setTimeLeft(settings.workTime);
    }
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // useEffect(() => {
  //   if (settings) {
  //     setTimeLeft(settings.workTime);
  //   }
  // }, [settings]);

  useEffect(() => {
    if (timeLeft === 0 && settings) {
      setNextStatus();
    }
  }, [timeLeft, status, settings]);

  return (
    <div className="">
      <p className="font-extrabold text-2xl">{formatTime(timeLeft)}</p>
      <div>
        <Button size="icon" variant="outline" onClick={handlePause}>
          {isPaused ? <Play /> : <Pause />}
        </Button>
        <Button size="icon" variant="outline" onClick={setNextStatus}>
          {<SkipForward />}
        </Button>
      </div>
    </div>
  );
};

export default CountdownTimer;
