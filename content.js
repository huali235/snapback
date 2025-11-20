// Snapback - Content Script
// This script runs on every webpage and detects if the current site is a distraction

// List of distraction sites to detect
const DISTRACTION_SITES = [
  'twitter.com',
  'x.com',
  'instagram.com',
  'facebook.com',
  'reddit.com',
  'youtube.com'
];

/**
 * Checks if the current URL matches any distraction site
 * @returns {boolean} True if current site is a distraction site
 */
function isDistractionSite() {
  const currentUrl = window.location.href.toLowerCase();

  // Check if any distraction site is present in the current URL
  for (const site of DISTRACTION_SITES) {
    if (currentUrl.includes(site)) {
      return true;
    }
  }

  return false;
}

/**
 * Dismisses the popup with a smooth fade-out animation
 * @param {HTMLElement} overlay - The overlay element to dismiss
 */
function dismissPopup(overlay) {
  if (!overlay) return;

  console.log('[Snapback] Dismissing popup with fade-out animation...');

  // Add fade-out class to trigger CSS animation
  overlay.classList.add('distraction-blocker-fadeout');

  // Remove element after animation completes (300ms)
  setTimeout(() => {
    overlay.remove();
    console.log('[Snapback] Popup removed from DOM');
  }, 300);
}

/**
 * Shows a popup overlay when a distraction site is detected
 * Includes duplicate prevention, auto-dismiss, and smooth animations
 */
function showDistractionPopup() {
  // Check if popup already exists to prevent duplicates
  const existingOverlay = document.getElementById('distraction-blocker-overlay');
  if (existingOverlay) {
    console.log('[Snapback] Popup already exists, skipping...');
    return;
  }

  // Check if popup was already shown this session
  if (window.distractionPopupShown) {
    console.log('[Snapback] Popup already shown this session, skipping...');
    return;
  }

  console.log('[Snapback] Creating distraction popup...');

  // Mark popup as shown for this session
  window.distractionPopupShown = true;

  // Create the overlay element
  const overlay = document.createElement('div');
  overlay.id = 'distraction-blocker-overlay';

  // Set the inner HTML with message structure
  overlay.innerHTML = `
    <div class="distraction-blocker-content">
      <h2>Hey there! 👋</h2>
      <p>You've landed on a distraction site.</p>
      <p>Is this what you really want to be doing right now?</p>
      <button id="distraction-blocker-dismiss">Got it, thanks!</button>
    </div>
  `;

  // Append to document body (entrance animation handled by CSS)
  document.body.appendChild(overlay);

  console.log('[Snapback] Popup displayed successfully');

  // Add event listener for dismiss button
  const dismissButton = document.getElementById('distraction-blocker-dismiss');
  if (dismissButton) {
    dismissButton.addEventListener('click', () => {
      console.log('[Snapback] User clicked dismiss button');
      dismissPopup(overlay);
    });
  }

  // Auto-dismiss after 5 seconds
  setTimeout(() => {
    console.log('[Snapback] Auto-dismissing popup after 5 seconds');
    dismissPopup(overlay);
  }, 5000);
}

/**
 * Main execution - runs when content script is injected
 */
function init() {
  console.log('[Snapback] Content script loaded on:', window.location.href);

  if (isDistractionSite()) {
    console.log('[Snapback] 🎯 Distraction site detected!');
    console.log('[Snapback] Current URL:', window.location.href);
    // Show the distraction popup
    showDistractionPopup();
  } else {
    console.log('[Snapback] ✓ Not a distraction site - you\'re all good!');
  }
}

// Run the initialization when the script loads
init();
