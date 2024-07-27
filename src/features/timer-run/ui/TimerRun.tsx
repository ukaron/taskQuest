import { useState, useEffect } from "react";
import { Button } from "@/shared/ui/button";
import { Pause, Play, SkipForward } from "lucide-react";

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(40 * 60);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="">
      <p className="font-extrabold text-2xl">{formatTime(timeLeft)}</p>
      <div>
        <Button size="icon" variant="outline" onClick={handlePause}>
          {isPaused ? <Play /> : <Pause />}
        </Button>
        <Button size="icon" variant="outline" onClick={handlePause}>
          {<SkipForward />}
        </Button>
      </div>
    </div>
  );
};

export default CountdownTimer;
