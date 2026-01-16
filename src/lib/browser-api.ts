/**
 * Cross-browser API compatibility layer
 * Supports both Chrome and Safari web extensions
 *
 * Safari uses 'browser' namespace (WebExtensions standard)
 * Chrome supports both 'chrome' and 'browser' namespaces
 */

// Use Chrome types as they're compatible with Safari
type BrowserAPI = typeof chrome;

declare const browser: BrowserAPI | undefined;

export const browserAPI: BrowserAPI = (() => {
  // Check for browser namespace first (Safari, Firefox, and modern Chrome)
  if (typeof browser !== 'undefined' && browser?.runtime) {
    return browser;
  }
  // Fallback to chrome namespace (older Chrome versions)
  if (typeof chrome !== 'undefined' && chrome?.runtime) {
    return chrome;
  }
  throw new Error('No browser extension API available');
})();

// Re-export commonly used APIs for convenience with proper types
export const runtime = browserAPI.runtime;
export const tabs = browserAPI.tabs;
