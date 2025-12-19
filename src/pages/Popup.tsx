import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, ArrowRight } from "lucide-react";

const meditationImage = chrome.runtime.getURL("assets/images/meditation.png");

const QUOTES = [
  " Open your eyes and take heed, and prepare for this journey, for you have been allotted a fixed number of breaths. This lifespan, which has been leased to you, will soon be recalled.",
];

type ViewState = "idle" | "selecting_time";

interface PopupProps {
  onStartTimer: (seconds: number) => void;
}

export default function Popup({ onStartTimer }: PopupProps) {
  const [viewState, setViewState] = useState<ViewState>("idle");
  const [quote, setQuote] = useState(QUOTES[0]);
  const [minutes, setMinutes] = useState([5]);

  useEffect(() => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  }, []);

  const handleLeave = () => {
    // Send message to background script to close the current tab
    chrome.runtime.sendMessage({ action: 'closeTab' }, (response) => {
      if (response?.success) {
        console.log('[Snapback] Tab close request sent successfully');
      } else {
        console.error('[Snapback] Failed to close tab:', response?.error);
      }
    });
  };

  const handleStay = () => {
    setViewState("selecting_time");
  };

  const startTimer = () => {
    const seconds = minutes[0] * 60;
    onStartTimer(seconds);
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-secondary/30 p-4 font-sans"
      style={{
        pointerEvents: 'auto',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2147483647,
      }}
    >
      <Card
        className="overflow-hidden relative shadow-2xl border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl flex flex-col"
        style={{
          width: '420px',
          height: '580px',
          maxWidth: '90vw',
        }}
      >

        {/* Header Image Area */}
        <div className="relative overflow-hidden" style={{ height: '192px', width: '100%' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/90 z-10" />
          <img
            src={meditationImage}
            alt="Meditation"
            className="w-full h-full object-cover opacity-90 transform scale-105 hover:scale-110 transition-transform duration-700 ease-out"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Content Area */}
        <div
          className="flex-1 px-8 pb-8 pt-2 flex flex-col items-center text-center z-20"
          style={{ padding: '0.5rem 2rem 2rem 2rem' }}
        >

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
                  <h1
                    className="font-display text-4xl font-medium text-primary tracking-tight"
                    style={{ fontSize: '2.25rem', lineHeight: '2.5rem', fontWeight: 500 }}
                  >
                    Find Stillness.<br/>See Clearly.
                  </h1>
                  <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p
                      className="text-muted-foreground text-lg leading-relaxed font-light italic"
                      style={{ fontSize: '1.125rem', lineHeight: '1.75rem', fontWeight: 300 }}
                    >
                      "{quote}"
                    </p>
                  </div>
                </div>

                <div className="w-full space-y-3 mt-8">
                  <Button
                    onClick={handleLeave}
                    className="w-full h-12 text-base font-medium rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 group"
                    style={{ height: '48px', fontSize: '1rem', fontWeight: 500 }}
                  >
                    <X className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                    Leave this site
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={handleStay}
                    className="w-full h-12 text-base font-medium text-muted-foreground hover:text-primary hover:bg-secondary/50 rounded-xl transition-all"
                    style={{ height: '48px', fontSize: '1rem', fontWeight: 500 }}
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
                  <h2
                    className="font-display text-3xl text-primary"
                    style={{ fontSize: '1.875rem', lineHeight: '2.25rem', fontWeight: 500 }}
                  >
                    How long?
                  </h2>
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: '1rem', lineHeight: '1.5rem' }}
                  >
                    Choose your mindful duration
                  </p>
                </div>

                <div className="w-full px-4 py-8 bg-secondary/30 rounded-2xl mb-8">
                  <div
                    className="text-5xl font-light text-primary mb-6 font-mono tabular-nums"
                    style={{ fontSize: '3rem', lineHeight: '1', fontWeight: 300 }}
                  >
                    {minutes[0]} <span className="text-lg text-muted-foreground font-sans" style={{ fontSize: '1.125rem' }}>min</span>
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
                    style={{ height: '48px', fontSize: '1rem', fontWeight: 500 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={startTimer}
                    className="flex-[2] h-12 rounded-xl bg-primary text-primary-foreground shadow-lg"
                    style={{ height: '48px', fontSize: '1rem', fontWeight: 500 }}
                  >
                    Begin Focus <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </Card>
    </div>
  );
}
