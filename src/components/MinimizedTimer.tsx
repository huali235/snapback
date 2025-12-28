import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface MinimizedTimerProps {
  initialSeconds: number;
  onExpire: () => void;
  onCancel: () => void;
}

export default function MinimizedTimer({
  initialSeconds,
  onExpire,
  onCancel,
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
    <div className="fixed top-6 right-6 animate-slideIn pointer-events-auto z-[100]">
      <Card className="bg-white/95 backdrop-blur-xl shadow-2xl border-white/50 rounded-2xl overflow-hidden min-w-[200px]">
        {/* Progress Bar */}
        <div className="h-1 bg-secondary relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-primary transition-all duration-300"
            style={{ width: `${getProgress()}%` }}
          />
        </div>

        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-1.5 rounded-lg">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-muted-foreground">Focus Mode</span>
            </div>
            <button
              onClick={onCancel}
              className="h-7 w-7 rounded-md hover:bg-destructive/10 hover:text-destructive transition-colors flex items-center justify-center cursor-pointer"
              title="Cancel timer"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Timer Display */}
          <div className="text-center">
            <div className="text-3xl font-light font-mono tabular-nums text-primary tracking-wide">
              {formatTime(timeLeft)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">remaining</p>
          </div>
        </div>
      </Card>
    </div>
  );
}