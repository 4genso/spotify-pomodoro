import { useState, useRef, useEffect, useMemo } from "react";

function Timer({ isPlaying, pomodoro, isFocus, updateFocus }): JSX.Element {
  const [remainingTime, setRemainingTime] = useState(pomodoro.focus * 60);
  const focusCount = useRef(0);
  const minutes: string = useMemo(
    () => String(Math.floor(remainingTime / 60)).padStart(2, "0"),
    [remainingTime],
  );
  const seconds: string = useMemo(
    () => String(remainingTime % 60).padStart(2, "0"),
    [remainingTime],
  );

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);

      if (remainingTime == 0) {
        if (isFocus) {
          if (focusCount.current % pomodoro.longBreakInterval == 0) {
            setRemainingTime(pomodoro.longBreak * 60);
          } else {
            setRemainingTime(pomodoro.shortBreak * 60);
          }
        } else {
          setRemainingTime(pomodoro.focus * 60);
        }

        updateFocus();
      }

      return () => clearInterval(interval);
    }

    return;
  }, [remainingTime, isPlaying]);

  return (
    <div className="mx-auto grid grid-cols-1 gap-4 content-between">
      <span className="font-black uppercase tracking-wide text-sm text-white">
        {isFocus ? "Focus" : "Break"}
      </span>
      <span className="font-black uppercase tracking-wide text-6xl text-white">
        {minutes}:{seconds}
      </span>
    </div>
  );
}

export default Timer;
