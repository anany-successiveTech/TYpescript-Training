import { useState, useRef, useEffect } from "react";

function useTimer(initialTime: number): {
  time: number;
  start: () => void;
  pause: () => void;
  reset: () => void;
} {
  const [time, setTime] = useState<number>(initialTime);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const start = (): void => {
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current as NodeJS.Timeout);
          timerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pause = (): void => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const reset = (): void => {
    pause();
    setTime(initialTime);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return { time, start, pause, reset };
}

export default useTimer;
