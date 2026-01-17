import React from 'react';
import ReactDOM from 'react-dom/client';
import Popup from '@/pages/Popup';
import MinimizedTimer from '@/components/MinimizedTimer';
import { getDistractionSites } from '@/lib/storage';
import '@/index.css';

type ViewMode = 'popup' | 'minimized-timer' | 'none';

// Global state to manage current view
let currentViewMode: ViewMode = 'none';
let currentRoot: ReactDOM.Root | null = null;
let currentRootDiv: HTMLDivElement | null = null;
let timerSeconds: number = 0;

/**
 * Checks if the current URL matches any distraction site
 */
function isDistractionSite(sites: string[]): boolean {
  const currentUrl = window.location.href.toLowerCase();
  return sites.some(site => currentUrl.includes(site));
}

/**
 * Creates the root container and shadow DOM
 */
function createRootContainer(mode: ViewMode): { rootDiv: HTMLDivElement; shadowContainer: HTMLDivElement } {
  const rootDiv = document.createElement('div');
  rootDiv.id = 'snapback-root';
  rootDiv.style.cssText = `
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    z-index: 2147483647 !important;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif !important;
    margin: 0 !important;
    padding: 0 !important;
    border: none !important;
    background: none !important;
    pointer-events: none !important;
  `;

  document.body.appendChild(rootDiv);

  // Create shadow DOM to isolate styles
  const shadowRoot = rootDiv.attachShadow({ mode: 'open' });

  // Create a container inside shadow DOM
  const shadowContainer = document.createElement('div');
  shadowContainer.id = 'shadow-container';

  // Add mode class to container for conditional styling
  if (mode === 'minimized-timer') {
    shadowContainer.classList.add('minimized-mode');
  }

  shadowRoot.appendChild(shadowContainer);

  // Inject styles into shadow DOM
  const styleLink = document.createElement('link');
  styleLink.rel = 'stylesheet';
  styleLink.href = chrome.runtime.getURL('content.css');
  shadowRoot.appendChild(styleLink);

  return { rootDiv, shadowContainer };
}

/**
 * Removes the current overlay
 */
function removeOverlay() {
  if (currentRoot) {
    currentRoot.unmount();
    currentRoot = null;
  }
  if (currentRootDiv) {
    currentRootDiv.remove();
    currentRootDiv = null;
  }
  currentViewMode = 'none';
  console.log('[Snapback] Overlay removed');
}

/**
 * Shows the full popup overlay
 */
function showPopup() {
  // Remove existing overlay if any
  if (currentViewMode !== 'none') {
    removeOverlay();
  }

  console.log('[Snapback] Creating full popup...');
  currentViewMode = 'popup';

  const { rootDiv, shadowContainer } = createRootContainer('popup');
  currentRootDiv = rootDiv;

  // Wait a tick for styles to load
  setTimeout(() => {
    const root = ReactDOM.createRoot(shadowContainer);
    currentRoot = root;

    root.render(
      <React.StrictMode>
        <Popup
          onStartTimer={(seconds: number) => {
            timerSeconds = seconds;
            showMinimizedTimer();
          }}
        />
      </React.StrictMode>
    );

    console.log('[Snapback] Full popup displayed');
  }, 100);
}

/**
 * Shows the minimized timer
 */
function showMinimizedTimer() {
  // Remove existing overlay if any
  if (currentViewMode !== 'none') {
    removeOverlay();
  }

  console.log('[Snapback] Creating minimized timer...');
  currentViewMode = 'minimized-timer';

  const { rootDiv, shadowContainer } = createRootContainer('minimized-timer');
  currentRootDiv = rootDiv;

  // Wait a tick for styles to load
  setTimeout(() => {
    const root = ReactDOM.createRoot(shadowContainer);
    currentRoot = root;

    root.render(
      <React.StrictMode>
        <MinimizedTimer
          initialSeconds={timerSeconds}
          onExpire={() => {
            console.log('[Snapback] Timer expired, showing popup...');
            showPopup();
          }}
          onCancel={removeOverlay}
        />
      </React.StrictMode>
    );

    console.log('[Snapback] Minimized timer displayed');
  }, 100);
}

/**
 * Main initialization
 */
async function init() {
  console.log('[Snapback] Content script loaded on:', window.location.href);

  // Load distraction sites from storage
  const DISTRACTION_SITES = await getDistractionSites();

  if (isDistractionSite(DISTRACTION_SITES)) {
    console.log('[Snapback] Distraction site detected!');

    // Check if already shown this session
    if ((window as any).snapbackShown) {
      console.log('[Snapback] Already shown this session, skipping...');
      return;
    }

    (window as any).snapbackShown = true;
    showPopup();
  } else {
    console.log('[Snapback] Not a distraction site');
  }
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
