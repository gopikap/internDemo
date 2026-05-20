import { useEffect, useRef, useState } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus(); // auto-focus on mount
    if (inputRef.current) {
      inputRef.current.value = "Some value"; // set initial value
    }
  }, []);

  function handleClear() {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }
  function start() {
    intervalRef.current = window.setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  }

  function stop() {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  return (
    <>
      <div>
        <input ref={inputRef} type="text" placeholder="Search..." />
        <button onClick={handleClear}>Clear</button>
      </div>
      <div>
        <p>{seconds}s</p>
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
      </div>
    </>
  );
}

export default Timer;
