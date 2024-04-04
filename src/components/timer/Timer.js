import React, { useState, useEffect } from "react";

const Timer = () => {
  const [timer, setTimer] = useState(0);
  const [isTimerOn, setIsTimerOn] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isTimerOn) {
      interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isTimerOn]);

  return (
    <div className="main z-20">
      <div className="inner-main">
        <div className="p-2 heading">
          <h1>Timer</h1>
          <button>X</button>
        </div>
        <div className="h w-full bg-white p-5 grid place-content-center">
          <h2 className="text-center text-5xl mb-5">{timer}</h2>
          <div className="flex gap-3">
            <button className="p-2 px-6" onClick={() => setIsTimerOn(true)}>
              Start
            </button>
            <button className="p-2 px-6" onClick={() => setIsTimerOn(false)}>
              Pause
            </button>
            <button
              className="p-2 px-6"
              onClick={() => {
                setIsTimerOn(false);
                setTimer(0);
              }}
            >
              Stop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
