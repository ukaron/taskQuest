import { useTimer } from "@/shared/hooks/useTimer";
import { useSound } from "@/shared/hooks/useSound";

export const Timer = () => {
  const {
    timeLeft,
    isPaused,
    currentPhase,
    startTimer,
    pauseTimer,
    skipPhase,
  } = useTimer();

  const { playTick, stopTick } = useSound();

  return (
    <div className="timer flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">{timeLeft}</h1>
      <div className="buttons flex gap-4 mt-4">
        <button
          onClick={() => {
            isPaused ? startTimer() : pauseTimer();
            isPaused ? playTick() : stopTick();
          }}
          className="btn-primary"
        >
          {isPaused ? "Старт" : "Пауза"}
        </button>
        <button onClick={skipPhase} className="btn-secondary">
          Следующее действие
        </button>
      </div>
      <p className="mt-2">Текущая фаза: {currentPhase}</p>
    </div>
  );
};
