import { useSettingsStore } from "@/entites/setting/store/settings.store";
import { useSound } from "@/shared/hooks/useSound";
import { Button } from "@/shared/ui/button";
import { Pause, Play, SkipForward } from "lucide-react";
import { useEffect, useRef, useState } from "react";

enum TimerStatus {
  Work,
  ShortBreak,
  LongBreak,
}

const CountdownTimer: React.FC = () => {
  const { settings } = useSettingsStore();
  const [status, setStatus] = useState(TimerStatus.Work);
  const [isPaused, setIsPaused] = useState(true);
  const [sessionsCount, setSessionsCount] = useState(0);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const { playTick, stopTick } = useSound();
  const animationFrameRef = useRef<number | null>(null);

  const calculateTimeLeft = () => {
    if (!endTime) return 0;
    const now = new Date().getTime();
    return Math.max(0, Math.floor((endTime.getTime() - now) / 1000));
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const initializeTimer = (duration: number) => {
    const now = new Date();
    const newEndTime = new Date(now.getTime() + duration * 1000);
    setEndTime(newEndTime);
    setTimeLeft(duration); // Немедленное обновление времени
    setIsPaused(true); // Устанавливаем паузу при инициализации
  };

  const handlePause = () => {
    setIsPaused((prev) => {
      if (prev) {
        // Снимаем с паузы, пересчитываем `endTime`
        const newEndTime = new Date(new Date().getTime() + timeLeft * 1000);
        setEndTime(newEndTime);
        settings.sound.on && playTick();
        startAnimation();
      } else {
        // Ставим на паузу, останавливаем анимацию
        stopTick();
        stopAnimation();
      }
      return !prev;
    });
  };

  const setNextStatus = () => {
    let nextStatus: TimerStatus;
    let nextDuration: number;

    if (status === TimerStatus.Work) {
      setSessionsCount((prev) => prev + 1);
      if ((sessionsCount + 1) % settings.tomato.longBreakInterval === 0) {
        nextStatus = TimerStatus.LongBreak;
        nextDuration = settings.tomato.longBreak * 60;
      } else {
        nextStatus = TimerStatus.ShortBreak;
        nextDuration = settings.tomato.shortBreak * 60;
      }
    } else {
      nextStatus = TimerStatus.Work;
      nextDuration = settings.tomato.time * 60;
    }

    setStatus(nextStatus);
    initializeTimer(nextDuration);
  };

  const startAnimation = () => {
    const updateTime = () => {
      const newTimeLeft = calculateTimeLeft();

      setTimeLeft(newTimeLeft);

      if (newTimeLeft > 0 && !isPaused) {
        animationFrameRef.current = requestAnimationFrame(updateTime);
      } else if (newTimeLeft === 0) {
        stopAnimation();
        setNextStatus();
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateTime);
  };

  const stopAnimation = () => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  useEffect(() => {
    initializeTimer(settings.tomato.time * 60); // Инициализация при загрузке
    return () => stopAnimation(); // Очистка при размонтировании
  }, [settings.tomato.time]);

  useEffect(() => {
    if (!isPaused) {
      startAnimation(); // Перезапуск анимации при снятии с паузы
    }
  }, [isPaused]);

  return (
    <div className="flex flex-col items-center">
      <p className="font-extrabold text-[90px]">{formatTime(timeLeft)}</p>
      <div>
        <Button size="icon" variant="outline" onClick={handlePause}>
          {isPaused ? <Play /> : <Pause />}
        </Button>
        <Button size="icon" variant="outline" onClick={setNextStatus}>
          <SkipForward />
        </Button>
      </div>
    </div>
  );
};

export default CountdownTimer;
