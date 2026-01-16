import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { runtime } from "@/lib/browser-api";

// const meditationImage = runtime.getURL("assets/images/meditation.png");

const QUOTE = "Open your eyes and take heed, and prepare for this journey, for you have been allotted a fixed number of breaths. This lifespan, which has been leased to you, will soon be recalled.";

type ViewState = "idle" | "selecting_time";

interface PopupProps {
  onStartTimer: (seconds: number) => void;
}

export default function Popup({ onStartTimer }: PopupProps) {
  const [viewState, setViewState] = useState<ViewState>("idle");
  const [minutes, setMinutes] = useState([5]);

  const handleLeave = () => {
    // Send message to background script to close the current tab
    runtime.sendMessage({ action: 'closeTab' }, (response) => {
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
    <div className="fixed inset-0 flex items-center justify-center p-4 font-sans pointer-events-auto z-[2147483647]">
      <Card className="overflow-hidden relative shadow-2xl border-white/20 bg-white backdrop-blur-xl rounded-3xl flex flex-col w-[420px] h-[580px] max-w-[90vw]">

        {/* Header Image Area */}
        {/* <div className="relative overflow-hidden" style={{ height: '192px', width: '100%' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/90 z-10" />
          <img
            src={meditationImage}
            alt="Meditation"
            className="w-full h-full object-cover opacity-90 transform scale-105 hover:scale-110 transition-transform duration-700 ease-out"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div> */}

        {/* Content Area */}
        <div className="flex-1 pt-2 px-8 pb-8 flex flex-col items-center text-center z-20">

            {viewState === "idle" && (
              <div
                className="flex flex-col items-center h-full justify-between w-full transition-opacity duration-500 animate-fadeIn"
              >
                <div className="space-y-6">
                  <h1 className="font-display text-2xl font-medium text-primary tracking-tight mt-2">
                    Find Stillness. See Clearly.
                  </h1>
                  <div className="h-[100px] flex items-center justify-center">
                    <p className="text-muted-foreground text-lg leading-relaxed font-light italic">
                      "{QUOTE}"
                    </p>
                  </div>
                </div>

                <div className="w-full space-y-3 mt-8">
                  <Button
                    onClick={handleLeave}
                    className="w-full h-12 text-base font-medium rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <svg className="inline-block mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Leave this site
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={handleStay}
                    className="w-full h-12 text-base font-medium text-muted-foreground hover:text-primary hover:bg-secondary/50 rounded-xl transition-all cursor-pointer"
                  >
                    Stay for a moment
                  </Button>
                </div>
              </div>
            )}

            {viewState === "selecting_time" && (
              <div
                className="flex flex-col items-center justify-center w-full h-full py-4 transition-opacity duration-500 animate-fadeIn"
              >
                <div className="space-y-2 mb-8">
                  <h2 className="font-display text-3xl font-medium text-primary">
                    How long?
                  </h2>
                  <p className="text-base text-muted-foreground">
                    Choose your mindful duration
                  </p>
                </div>

                <div className="w-full px-4 py-8 bg-secondary/30 rounded-2xl mb-8">
                  <div className="text-5xl font-light text-primary mb-6 font-mono tabular-nums leading-none">
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
                    className="flex-1 h-12 text-base font-medium rounded-xl border-muted-foreground/20 cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={startTimer}
                    className="flex-[2] h-12 text-base font-medium rounded-xl bg-primary text-primary-foreground shadow-lg cursor-pointer"
                  >
                    Begin Focus
                    <svg className="inline-block ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Button>
                </div>
              </div>
            )}

        </div>
      </Card>
    </div>
  );
}
