import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, X, ArrowRight, Minimize2 } from "lucide-react";

const meditationImage = chrome.runtime.getURL("assets/images/meditation.png");

const QUOTES = [
  "Almost everything will work again if you unplug it for a few minutes, including you.",
  "Quiet the mind, and the soul will speak.",
  "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
  "Nature does not hurry, yet everything is accomplished.",
  "The present moment is the only time over which we have dominion.",
];

type ViewState = "idle" | "selecting_time" | "timer_active";

interface PopupProps {
  onClose: () => void;
}

export default function Popup({ onClose }: PopupProps) {
  const [viewState, setViewState] = useState<ViewState>("idle");
  const [quote, setQuote] = useState(QUOTES[0]);
  const [minutes, setMinutes] = useState([5]);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (viewState === "timer_active" && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setViewState("idle");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [viewState, timeLeft]);

  const handleLeave = () => {
    // Close the current tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.remove(tabs[0].id);
      }
    });
  };

  const handleStay = () => {
    setViewState("selecting_time");
  };

  const startTimer = () => {
    setTimeLeft(minutes[0] * 60);
    setViewState("timer_active");
  };

  const handleMinimize = () => {
    onClose();
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-secondary/30 p-4 font-sans">
      <Card className="w-full max-w-[400px] min-h-[500px] overflow-hidden relative shadow-2xl border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl flex flex-col">

        {/* Header Image Area */}
        <div className="relative h-48 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/90 z-10" />
          <img
            src={meditationImage}
            alt="Meditation"
            className="w-full h-full object-cover opacity-90 transform scale-105 hover:scale-110 transition-transform duration-700 ease-out"
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 px-8 pb-8 pt-2 flex flex-col items-center text-center z-20">

          <AnimatePresence mode="wait">
            {viewState === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center h-full justify-between w-full"
              >
                <div className="space-y-6">
                  <h1 className="font-display text-4xl font-medium text-primary tracking-tight">
                    Find Stillness.<br/>See Clearly.
                  </h1>
                  <p className="text-muted-foreground text-lg leading-relaxed font-light italic">
                    "{quote}"
                  </p>
                </div>

                <div className="w-full space-y-3 mt-8">
                  <Button
                    onClick={handleLeave}
                    className="w-full h-12 text-base font-medium rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <X className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                    Leave this site
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={handleStay}
                    className="w-full h-12 text-base font-medium text-muted-foreground hover:text-primary hover:bg-secondary/50 rounded-xl transition-all"
                  >
                    Stay for a moment
                  </Button>
                </div>
              </motion.div>
            )}

            {viewState === "selecting_time" && (
              <motion.div
                key="selecting"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center w-full h-full py-4"
              >
                <div className="space-y-2 mb-8">
                  <h2 className="font-display text-3xl text-primary">How long?</h2>
                  <p className="text-muted-foreground">Choose your mindful duration</p>
                </div>

                <div className="w-full px-4 py-8 bg-secondary/30 rounded-2xl mb-8">
                  <div className="text-5xl font-light text-primary mb-6 font-mono tabular-nums">
                    {minutes[0]} <span className="text-lg text-muted-foreground font-sans">min</span>
                  </div>
                  <Slider
                    defaultValue={[5]}
                    max={60}
                    min={1}
                    step={1}
                    value={minutes}
                    onValueChange={setMinutes}
                    className="cursor-pointer"
                  />
                </div>

                <div className="flex gap-3 w-full">
                  <Button
                    variant="outline"
                    onClick={() => setViewState("idle")}
                    className="flex-1 h-12 rounded-xl border-muted-foreground/20"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={startTimer}
                    className="flex-[2] h-12 rounded-xl bg-primary text-primary-foreground shadow-lg"
                  >
                    Begin Focus <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {viewState === "timer_active" && (
              <motion.div
                key="timer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="flex flex-col items-center justify-center w-full h-full py-8"
              >
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-ping" />
                  <div className="relative bg-secondary/50 p-8 rounded-full border border-white/50 shadow-inner">
                    <Clock className="w-12 h-12 text-primary/80" />
                  </div>
                </div>

                <div className="text-6xl font-light font-mono tabular-nums text-primary mb-2 tracking-wider">
                  {formatTime(timeLeft)}
                </div>
                <p className="text-muted-foreground animate-pulse">Focus mode active</p>

                <Button
                  variant="ghost"
                  onClick={handleMinimize}
                  className="mt-12 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Minimize2 className="mr-2 h-4 w-4" />
                  Minimize Timer
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </Card>
    </div>
  );
}
