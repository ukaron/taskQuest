import { useRef } from "react";

export function useSound() {
  const tickAudio = useRef(new Audio("/sounds/tick.mp3"));
  const endAudio = new Audio("/sounds/end.mp3");

  const playTick = () => {
    tickAudio.current.loop = true;
    tickAudio.current.play();
  };

  const stopTick = () => {
    tickAudio.current.pause();
  };

  const playEnd = () => {
    endAudio.play();
  };

  return { playTick, stopTick, playEnd };
}
