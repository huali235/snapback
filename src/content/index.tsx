import React from 'react';
import ReactDOM from 'react-dom/client';
import Popup from '@/pages/Popup';
import '@/index.css';

// List of distraction sites to detect
const DISTRACTION_SITES = [
  'twitter.com',
  'x.com',
  'instagram.com',
  'facebook.com',
  'reddit.com',
  'youtube.com',
  'tiktok.com',
];

/**
 * Checks if the current URL matches any distraction site
 */
function isDistractionSite(): boolean {
  const currentUrl = window.location.href.toLowerCase();
  return DISTRACTION_SITES.some(site => currentUrl.includes(site));
}

/**
 * Shows the Snapback overlay with React app
 */
function showSnapbackOverlay() {
  // Check if overlay already exists
  const existingOverlay = document.getElementById('snapback-root');
  if (existingOverlay) {
    console.log('[Snapback] Overlay already exists, skipping...');
    return;
  }

  // Check if already shown this session
  if ((window as any).snapbackShown) {
    console.log('[Snapback] Already shown this session, skipping...');
    return;
  }

  console.log('[Snapback] Creating overlay...');
  (window as any).snapbackShown = true;

  // Create root container
  const rootDiv = document.createElement('div');
  rootDiv.id = 'snapback-root';
  rootDiv.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  `;

  document.body.appendChild(rootDiv);

  // Create shadow DOM to isolate styles
  const shadowRoot = rootDiv.attachShadow({ mode: 'open' });

  // Create a container inside shadow DOM
  const shadowContainer = document.createElement('div');
  shadowContainer.id = 'shadow-container';
  shadowRoot.appendChild(shadowContainer);

  // Inject styles into shadow DOM
  const styleLink = document.createElement('link');
  styleLink.rel = 'stylesheet';
  styleLink.href = chrome.runtime.getURL('content.css');
  shadowRoot.appendChild(styleLink);

  // Function to close the overlay
  const closeOverlay = () => {
    rootDiv.remove();
    console.log('[Snapback] Overlay closed');
  };

  // Render React app into shadow DOM
  const root = ReactDOM.createRoot(shadowContainer);
  root.render(
    <React.StrictMode>
      <Popup onClose={closeOverlay} />
    </React.StrictMode>
  );

  console.log('[Snapback] Overlay displayed successfully');
}

/**
 * Main initialization
 */
function init() {
  console.log('[Snapback] Content script loaded on:', window.location.href);

  if (isDistractionSite()) {
    console.log('[Snapback] Distraction site detected!');
    showSnapbackOverlay();
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
