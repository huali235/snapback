// Background service worker for Snapback extension
// Handles tab management since content scripts cannot use chrome.tabs API

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'closeTab') {
    // Close the tab that sent the message
    if (sender.tab?.id) {
      chrome.tabs.remove(sender.tab.id)
        .then(() => {
          console.log('[Snapback Background] Tab closed successfully');
          sendResponse({ success: true });
        })
        .catch((error) => {
          console.error('[Snapback Background] Error closing tab:', error);
          sendResponse({ success: false, error: error.message });
        });
    } else {
      sendResponse({ success: false, error: 'No tab ID found' });
    }
    return true; // Keep the message channel open for async response
  }
});

console.log('[Snapback Background] Service worker loaded');
