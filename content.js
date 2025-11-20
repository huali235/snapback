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
 * Main execution - runs when content script is injected
 */
function init() {
  console.log('[Snapback] Content script loaded on:', window.location.href);

  if (isDistractionSite()) {
    console.log('[Snapback] 🎯 Distraction site detected!');
    console.log('[Snapback] Current URL:', window.location.href);
    // TODO: In Phase 3, we'll show the popup here
  } else {
    console.log('[Snapback] ✓ Not a distraction site - you\'re all good!');
  }
}

// Run the initialization when the script loads
init();
