import { useState } from "react";
import { Slider } from "@/components/ui/slider";

type ViewState = "idle" | "selecting_time";

interface PopupProps {
  onStartTimer: (seconds: number) => void;
}

export default function Popup({ onStartTimer }: PopupProps) {
  const [viewState, setViewState] = useState<ViewState>("idle");
  const [minutes, setMinutes] = useState([5]);

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
      className="interstitial-overlay"
      style={{
        pointerEvents: 'auto',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2147483647,
      }}
    >
      {/* Idle View - Interstitial with Breathing Orb */}
      {viewState === "idle" && (
        <div className="mindful-card">
          {/* Noise texture overlay */}
          <div className="noise"></div>

          {/* Corner labels */}
          <div className="corner-label tl">INTERSTITIAL</div>
          <div className="corner-label tr">PAUSE</div>
          <div className="corner-label bl">BREATH 01</div>
          <div className="corner-label br">NOW</div>

          {/* Header text */}
          <div className="header-text">Find Stillness. See Clearly.</div>

          {/* Oval window with breathing orb */}
          <div className="oval-window">
            <div className="breath-orb"></div>
          </div>

          {/* Quote */}
          <div className="quote-container">
            <p className="quote-text">
              "Open your eyes and take <em>heed</em>, and prepare for this journey, for you have been allotted a <em>fixed number</em> of breaths."
            </p>
          </div>

          {/* Action buttons */}
          <div className="actions">
            <button
              onClick={handleLeave}
              className="btn-artistic btn-primary-artistic"
            >
              Leave this site
            </button>
            <button
              onClick={handleStay}
              className="btn-artistic btn-secondary-artistic"
            >
              Stay for a moment
            </button>
          </div>
        </div>
      )}

      {/* Time Selector View - Artistic Styling */}
      {viewState === "selecting_time" && (
        <div className="mindful-card">
          {/* Noise texture overlay */}
          <div className="noise"></div>

          {/* Corner labels */}
          <div className="corner-label tl">FOCUS</div>
          <div className="corner-label tr">TIME</div>
          <div className="corner-label bl">DURATION</div>
          <div className="corner-label br">SELECT</div>

          {/* Title */}
          <div className="header-text" style={{ marginBottom: '40px' }}>How long?</div>

          {/* Minutes display */}
          <div style={{ marginBottom: '40px', textAlign: 'center', width: '100%' }}>
            <div
              className="quote-text"
              style={{
                fontSize: '48px',
                fontWeight: 300,
                marginBottom: '20px',
              }}
            >
              {minutes[0]} <span style={{ fontSize: '20px', opacity: 0.7 }}>min</span>
            </div>
            <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto', padding: '0 10px' }}>
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
          </div>

          {/* Action buttons */}
          <div className="actions" style={{ flexDirection: 'row', gap: '16px', justifyContent: 'center' }}>
            <button
              onClick={() => setViewState("idle")}
              className="btn-artistic btn-secondary-artistic"
              style={{ width: 'auto' }}
            >
              Cancel
            </button>
            <button
              onClick={startTimer}
              className="btn-artistic btn-primary-artistic"
              style={{ width: 'auto' }}
            >
              Begin Focus
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
