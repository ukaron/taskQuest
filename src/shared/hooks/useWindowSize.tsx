import { useState, useEffect } from "react";

function getWindowSizes() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowSizes() {
  const [windowSizes, setWindowSizes] = useState(getWindowSizes());

  useEffect(() => {
    function handleResize() {
      setWindowSizes(getWindowSizes());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSizes;
}
