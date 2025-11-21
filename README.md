# Snapback - Focus Reminder Extension

A gentle Chrome browser extension that helps you stay focused by showing a friendly reminder when you visit distracting websites.

## What It Does

Snapback detects when you navigate to common distraction sites (Twitter/X, Instagram, Facebook, Reddit, YouTube) and displays a non-intrusive popup asking: *"Is this what you really want to be doing right now?"*

The reminder helps you become aware of mindless browsing and make intentional choices about how you spend your time.

## Features

- **Smart Detection**: Automatically recognizes major distraction sites
- **Gentle Reminders**: Beautiful, non-blocking popup in the top-right corner
- **Auto-Dismiss**: Popup automatically disappears after 5 seconds
- **One Reminder Per Session**: Won't nag you repeatedly on the same page
- **Smooth Animations**: Polished slide-in and fade-out effects
- **Minimal Permissions**: Only requires activeTab permission

## Installation

### Load as Unpacked Extension (Development)

1. **Download or Clone** this repository to your computer

2. **Open Chrome Extensions Page**
   - Navigate to `chrome://extensions/`
   - Or click the three-dot menu → More tools → Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner

4. **Load the Extension**
   - Click "Load unpacked" button
   - Select the `snapback` folder (the one containing `manifest.json`)

5. **Verify Installation**
   - You should see "Snapback" appear in your extensions list
   - The extension is now active!

### Test It Out

1. Visit any distraction site (e.g., https://twitter.com)
2. You should see a purple popup appear in the top-right corner
3. Click "Got it, thanks!" or wait 5 seconds for auto-dismiss
4. Refresh the page to see the popup again

## How It Works

### Technical Overview

- **Content Script**: Runs on every webpage to check the URL
- **URL Detection**: Compares current URL against hardcoded list of distraction sites
- **DOM Injection**: Dynamically creates and injects the popup overlay
- **Session Memory**: Uses `window` flag to prevent multiple popups per page session
- **CSS Animations**: Smooth entrance and exit transitions

### Distraction Sites Detected

Currently hardcoded to detect:
- twitter.com / x.com
- instagram.com
- facebook.com
- reddit.com
- youtube.com

## Customization

### Add More Distraction Sites

Edit `content.js` and add to the `DISTRACTION_SITES` array:

```javascript
const DISTRACTION_SITES = [
  'twitter.com',
  'x.com',
  // Add your own:
  'tiktok.com',
  'linkedin.com',
  'netflix.com'
];
```

### Change Auto-Dismiss Time

Edit the timeout value in `content.js` (line ~102):

```javascript
// Change 5000 to desired milliseconds (e.g., 10000 = 10 seconds)
setTimeout(() => {
  dismissPopup(overlay);
}, 5000);
```

### Customize Message

Edit the HTML in `content.js` (line ~78-85):

```javascript
overlay.innerHTML = `
  <div class="distraction-blocker-content">
    <h2>Your custom heading</h2>
    <p>Your custom message</p>
    <button id="distraction-blocker-dismiss">Your button text</button>
  </div>
`;
```

### Change Colors

Edit `styles.css` to customize the gradient and colors:

```css
/* Change the gradient background */
background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
```

## Troubleshooting

### Popup Doesn't Appear

1. **Check Extension Is Enabled**
   - Go to `chrome://extensions/`
   - Ensure Snapback has the toggle switched on

2. **Reload the Extension**
   - Click the refresh icon on the extension card
   - Refresh the webpage you're testing

3. **Check Console for Errors**
   - Right-click on the page → Inspect
   - Open the Console tab
   - Look for `[Snapback]` log messages

### Extension Won't Load

1. **Verify File Structure**
   ```
   snapback/
   ├── manifest.json
   ├── content.js
   ├── styles.css
   └── icons/
       ├── icon16.png
       ├── icon48.png
       └── icon128.png
   ```

2. **Check manifest.json**
   - Ensure it's valid JSON (no trailing commas)
   - Verify all file paths are correct

3. **Check Console Errors**
   - `chrome://extensions/` → Details → Errors
   - Fix any reported issues

## Limitations (MVP)

This is a minimal viable product with:
- Hardcoded list of distraction sites (no user customization UI)
- No settings page
- No website whitelisting
- No time-based controls (e.g., only block during work hours)
- Desktop Chrome only (not mobile)

## Future Enhancements

Planned improvements:
- ⚙️ Settings page for customizing sites and messages
- 📊 Usage tracking and statistics
- ⏰ Time-based blocking schedules
- ✅ Whitelist for legitimate use cases
- 🖥️ Native Mac application version

## Privacy

Snapback is completely local and private:
- ✅ No data collection
- ✅ No analytics or tracking
- ✅ No network requests
- ✅ No data leaves your computer
- ✅ Open source and transparent

## Project Structure

```
├── manifest.json          # Extension configuration
├── content.js            # Main logic (URL detection + popup)
├── styles.css            # Popup styling
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   ├── icon128.png
│   └── icon.svg          # Source SVG
├── README.md             # This file
└── CLAUDE.md             # Development guide
```

## Development

See `CLAUDE.md` for detailed development phases, learning objectives, and technical architecture.

### Making Changes

1. Edit files in your code editor
2. Save changes
3. Go to `chrome://extensions/`
4. Click reload icon on Snapback extension
5. Refresh any test pages
6. Check console for errors

### Debugging

- **Content Script Logs**: Right-click page → Inspect → Console
- **Extension Errors**: `chrome://extensions/` → Snapback → Errors
- **Manifest Issues**: Shows error when loading unpacked

## Credits

Built as a learning project to understand:
- Chrome Extension Manifest V3
- Content script architecture
- DOM manipulation and injection
- Browser extension permissions model

## License

MIT License - Feel free to modify and use as you wish!

## Feedback

Found a bug or have a suggestion? This is a personal learning project, but feedback is welcome!

---

**Remember**: The goal isn't to block websites entirely, but to create awareness and help you make intentional choices about your time. 🎯
