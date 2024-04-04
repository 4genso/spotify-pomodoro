import { useState } from "react";
import Timer from "./components/Timer/Timer";
import Config from "./components/Config/Config";
import SpotifyController from "./components/SpotifyController/SpotifyController";

const defaultPomodoro = {
  focus: 25,
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 3,
};

function App(): JSX.Element {
  const [isPlaying, setPlaying] = useState(true);
  const [isFocus, setIsFocus] = useState(true);
  const [inSession, setInSession] = useState(false);
  const [pomodoro, setPomodoro] = useState(defaultPomodoro);

  function handlePomodoroChange(newPomodoro): void {
    setPomodoro(newPomodoro);
  }

  function updateFocus() {
    setIsFocus(!isFocus);
  }

  return (
    <div>
      <div className="absolute top-2 right-2">
        <SpotifyController isPlaying={isPlaying} isFocus={isFocus} />
      </div>
      <section className="flex items-center justify-center py-20 sm:py-32">
        {inSession ? (
          <Timer
            isPlaying={isPlaying}
            pomodoro={pomodoro}
            isFocus={isFocus}
            updateFocus={updateFocus}
          />
        ) : (
          <Config
            pomodoro={pomodoro}
            handlePomodoroChange={handlePomodoroChange}
          />
        )}
      </section>
      <div className="flex items-center justify-center font-black">
        <button
          className="hover:bg-transparent bg-green text-white font-semibold w-24 py-2 px-4 mx-3 border hover:border-white border-transparent rounded"
          onClick={() => {
            if (inSession) {
              setInSession(false);
              setPlaying(false);
            } else {
              setInSession(true);
              setPlaying(true);
              setIsFocus(true);
            }
          }}
        >
          {inSession ? "End" : "Start"}
        </button>
        {inSession && (
          <button
            className="hover:bg-transparent bg-green text-white font-semibold w-24 py-2 px-4 mx-3 border hover:border-white border-transparent rounded"
            onClick={() => setPlaying(!isPlaying)}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
