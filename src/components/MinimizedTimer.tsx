import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={{
        top: -9999,
        left: -9999,
        right: 9999,
        bottom: 9999,
      }}
      initial={{ opacity: 0, x: 50, y: -50 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: 50, y: -50 }}
      className="fixed top-6 right-6 cursor-move"
      style={{ pointerEvents: 'auto', zIndex: 2147483647 }}
    >
      <Card className="bg-white/95 backdrop-blur-xl shadow-2xl border-white/50 rounded-2xl overflow-hidden min-w-[200px]">
        {/* Progress Bar */}
        <div className="h-1 bg-secondary relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${getProgress()}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-1.5 rounded-lg">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">Focus Mode</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onCancel}
              className="h-7 w-7 hover:bg-destructive/10 hover:text-destructive"
              title="Cancel timer"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
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
    </motion.div>
  );
}
