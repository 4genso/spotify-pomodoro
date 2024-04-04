function LengthController({
  length,
  range,
  steps,
  label,
  unit,
  handleChange,
}): JSX.Element {
  function handleIncrease() {
    if (length - steps >= range.min) {
      handleChange(length - steps);
    }
  }

  function handleDecrease() {
    if (length + steps <= range.max) {
      handleChange(length + steps);
    }
  }
  return (
    <div>
      <span className="font-black uppercase tracking-wide text-green">
        {label}
      </span>
      <div className="flex items-center justify-center">
        <button
          className="bg-white hover:bg-green text-black hover:text-white font-semibold py-1 px-3 border border-black rounded shadow"
          onClick={handleIncrease}
          disabled={length <= range.min}
        >
          -
        </button>
        <span className="p-5 w-20 text-center text-white">
          {length}
          {unit}
        </span>
        <button
          className="bg-white hover:bg-green text-black hover:text-white font-semibold py-1 px-3 border border-black rounded shadow"
          onClick={handleDecrease}
          disabled={length >= range.max}
        >
          +
        </button>
      </div>
    </div>
  );
}

function Config({ pomodoro, handlePomodoroChange }): JSX.Element {
  return (
    <div className="mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 content-between">
      <LengthController
        length={pomodoro.focus}
        range={{ min: 10, max: 60 }}
        steps={5}
        label={"Focus"}
        unit={":00"}
        handleChange={(newLength: number) =>
          handlePomodoroChange({ ...pomodoro, focus: newLength })
        }
      />
      <LengthController
        length={pomodoro.shortBreak}
        range={{ min: 1, max: 30 }}
        steps={1}
        label={"Normal Break"}
        unit={":00"}
        handleChange={(newLength: number) =>
          handlePomodoroChange({ ...pomodoro, shortBreak: newLength })
        }
      />
      <LengthController
        length={pomodoro.longBreak}
        range={{ min: 1, max: 60 }}
        steps={5}
        label={"Long Break"}
        unit={":00"}
        handleChange={(newLength: number) =>
          handlePomodoroChange({ ...pomodoro, longBreak: newLength })
        }
      />
      <LengthController
        length={pomodoro.longBreakInterval}
        range={{ min: 1, max: 10 }}
        steps={1}
        label={"Long Break Interval"}
        unit={""}
        handleChange={(newLength: number) =>
          handlePomodoroChange({ ...pomodoro, longBreakInterval: newLength })
        }
      />
    </div>
  );
}

export default Config;
