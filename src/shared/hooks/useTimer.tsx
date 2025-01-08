import { useState, useEffect } from "react";

const DEFAULT_SETTINGS = {
  tomatoDuration: 40 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
  sequence: ["tomato", "shortBreak", "tomato", "longBreak"], // Пример последовательности
};

export function useTimer() {
  const [timeLeft, setTimeLeft] = useState(DEFAULT_SETTINGS.tomatoDuration);
  const [isPaused, setIsPaused] = useState(true);
  const [currentPhase, setCurrentPhase] = useState("tomato");
  const [sequenceIndex, setSequenceIndex] = useState(0);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("timerState") || "{}");
    if (savedState?.timeLeft) {
      setTimeLeft(savedState.timeLeft);
      setCurrentPhase(savedState.currentPhase);
      setSequenceIndex(savedState.sequenceIndex);
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isPaused) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            skipPhase();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPaused]);

  const startTimer = () => setIsPaused(false);
  const pauseTimer = () => setIsPaused(true);

  const skipPhase = () => {
    const nextIndex = (sequenceIndex + 1) % DEFAULT_SETTINGS.sequence.length;
    setSequenceIndex(nextIndex);

    const nextPhase = DEFAULT_SETTINGS.sequence[nextIndex];
    setCurrentPhase(nextPhase);

    setTimeLeft(
      nextPhase === "tomato"
        ? DEFAULT_SETTINGS.tomatoDuration
        : nextPhase === "shortBreak"
          ? DEFAULT_SETTINGS.shortBreak
          : DEFAULT_SETTINGS.longBreak
    );

    pauseTimer();
  };

  const saveState = () => {
    localStorage.setItem(
      "timerState",
      JSON.stringify({ timeLeft, currentPhase, sequenceIndex })
    );
  };

  return {
    timeLeft,
    isPaused,
    currentPhase,
    startTimer,
    pauseTimer,
    skipPhase,
    saveState,
  };
}
