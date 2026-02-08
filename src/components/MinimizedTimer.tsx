import { useEffect, useState } from "react";

interface MinimizedTimerProps {
  initialSeconds: number;
  onExpire: () => void;
  onCancel: () => void;
}

export default function MinimizedTimer({
  initialSeconds,
  onExpire,
}: MinimizedTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onExpire]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const getProgress = () => {
    return ((initialSeconds - timeLeft) / initialSeconds) * 100;
  };

  return (
    <div
      className="minimized-timer"
      style={{ pointerEvents: 'auto', zIndex: 2147483647 }}
    >
      {/* Progress bar */}
      <div className="timer-progress-track">
        <div
          className="timer-progress-bar"
          style={{ width: `${getProgress()}%` }}
        />
      </div>

      <div className="timer-content">
        <span className="timer-label">Focus Mode</span>
        <div className="timer-display">
          {formatTime(timeLeft)}
        </div>
        <span className="timer-sublabel">remaining</span>
      </div>
    </div>
  );
}
