import { useEffect, useState } from 'react';
import './App.css';

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (value) => String(value).padStart(2, '0');

  return hours > 0
    ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    : `${pad(minutes)}:${pad(seconds)}`;
}

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  const status = isRunning ? 'In focus' : seconds > 0 ? 'Paused' : 'Ready when you are';

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="wordmark">
          <span className="wordmark-mark" aria-hidden="true">✳</span>
          <span></span>
        </div>
      
      </header>

      <main className="timer-layout">
        <section className="intro" aria-labelledby="page-title">
          
          <h1 id="page-title">Interactive <br /> <em>Timer.</em></h1>
        
          <p className="gentle-reminder">
            <span className="reminder-spark" aria-hidden="true">✳</span>
            Shannel Igana BSCS 3A
          </p>
        </section>

        <section className="timer-panel" aria-label="Focus timer">
          <div className="panel-heading">
            <p className="timer-kicker">FOCUS TIMER</p>
            <span className="status-pill" data-running={isRunning}>
              <span className="status-dot" aria-hidden="true" />
              {status}
            </span>
          </div>

          <div className="timer-face">
            <div className="timer-readout">
              <p className="time-caption"></p>
              <p className="time-display" role="timer" aria-live="off">
                {formatTime(seconds)}
              </p>
              <p className="time-units">HOURS : MINUTES : SECONDS</p>
            </div>
          </div>

          <div className="controls" aria-label="Timer controls">
            <button
              className="control-button control-button--primary"
              onClick={handleStart}
              disabled={isRunning}
            >
              <span className="control-icon" aria-hidden="true" />
              {seconds > 0 ? 'Resume focus' : 'Start focus'}
            </button>
            <button className="control-button" onClick={handlePause} disabled={!isRunning}>
              <span className="control-icon control-icon--pause" aria-hidden="true" />
              Pause
            </button>
            <button
              className="control-button"
              onClick={handleReset}
              disabled={seconds === 0 && !isRunning}
              aria-label="Reset timer"
            >
              <span className="control-icon control-icon--reset" aria-hidden="true" />
              Reset
            </button>
          </div>
          <p className="panel-footnote"></p>
        </section>
      </main>
    </div>
  );
}

export default Timer;