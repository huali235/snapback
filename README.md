# Snapback - Mindful Focus Extension

A beautiful Chrome browser extension that helps you stay focused by showing an elegant, mindful reminder when you visit distracting websites. Built with React, TypeScript, and Tailwind CSS.

## What It Does

Snapback detects when you navigate to common distraction sites (Twitter/X, Instagram, Facebook, Reddit, YouTube, TikTok) and displays an immersive full-screen overlay with:

- **Mindful Design**: Beautiful meditation-inspired UI with calming imagery
- **Inspirational Quotes**: Random mindfulness quotes to help you pause and reflect
- **Focus Timer**: Optional 1-60 minute focus sessions with countdown
- **Gentle Animations**: Smooth transitions using Framer Motion
- **Three-State Flow**:
  1. Initial reminder with option to leave or stay
  2. Time selection if you choose to stay
  3. Active timer with countdown display

## Features

- Full-screen immersive overlay (not a small popup)
- Random inspirational quotes from mindfulness philosophy
- Customizable focus timer (1-60 minutes)
- Beautiful glassmorphic card design
- Smooth animations and transitions
- Meditation imagery for calming effect
- Modern React + TypeScript architecture
- Tailwind CSS v4 styling
- Shadow DOM isolation to prevent style conflicts

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Framer Motion** - Animations
- **Radix UI** - Accessible components
- **Vite** - Build tool
- **Chrome Extension Manifest V3** - Extension platform

## Installation

### For Users (Load as Unpacked Extension)

1. **Download or Clone** this repository
   ```bash
   git clone <repository-url>
   cd snapback
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Build the Extension**
   ```bash
   npm run build
   ```
   This creates a `dist` folder with the compiled extension.

4. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right)
   - Click "Load unpacked"
   - Select the `dist` folder

5. **Verify Installation**
   - You should see "Snapback" in your extensions list
   - Visit any distraction site to see it in action!

### Test It Out

1. Visit any distraction site (e.g., https://twitter.com)
2. A beautiful full-screen overlay will appear
3. You can:
   - Click "Leave this site" to close the tab
   - Click "Stay for a moment" to set a focus timer
   - Choose your focus duration (1-60 minutes)
   - Begin your focus session

## Development

### Project Structure

```
snapback/
├── src/
│   ├── components/
│   │   └── ui/          # Reusable UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── slider.tsx
│   ├── content/
│   │   └── index.tsx    # Content script entry point
│   ├── lib/
│   │   └── utils.ts     # Utility functions
│   ├── pages/
│   │   └── Popup.tsx    # Main overlay component
│   └── index.css        # Global styles and Tailwind config
├── assets/
│   └── images/          # Images and media
│       └── meditation.png
├── icons/               # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── dist/                # Build output (generated)
├── manifest.json        # Extension manifest
├── package.json         # Dependencies
├── vite.config.ts       # Build configuration
└── tsconfig.json        # TypeScript configuration
```

### Available Scripts

- `npm run build` - Build the extension for production
- `npm run dev` - Build in watch mode for development

### Making Changes

1. Edit source files in `src/`
2. Run `npm run build` to rebuild
3. Go to `chrome://extensions/`
4. Click the reload icon on Snapback
5. Refresh any test pages

### How It Works

**Architecture:**
- **Content Script**: `src/content/index.tsx` runs on every webpage
- **Shadow DOM**: Styles are isolated to prevent conflicts with host pages
- **React Components**: Full React app rendered in shadow DOM
- **State Management**: React hooks for view states and timer
- **Build Process**: Vite bundles everything into `dist/`

**Content Script Flow:**
1. Detects if current URL matches distraction site
2. Creates shadow DOM container
3. Injects styles into shadow DOM
4. Renders React app inside shadow DOM
5. App handles all user interactions

## Customization

### Add More Distraction Sites

Edit `src/content/index.tsx` and add to the `DISTRACTION_SITES` array:

```typescript
const DISTRACTION_SITES = [
  'twitter.com',
  'x.com',
  // Add your own:
  'linkedin.com',
  'netflix.com',
];
```

### Add More Quotes

Edit `src/pages/Popup.tsx` and add to the `QUOTES` array:

```typescript
const QUOTES = [
  "Your new quote here",
  // ... existing quotes
];
```

### Change Timer Range

Edit the Slider component in `src/pages/Popup.tsx`:

```tsx
<Slider
  defaultValue={[5]}
  max={120}  // Change max to 120 minutes
  min={1}
  step={1}
  // ...
/>
```

### Change Colors and Styling

The design uses Tailwind CSS v4 with custom CSS variables. Edit `src/index.css` to modify:

- Color scheme (light/dark modes)
- Border radius
- Font families
- Spacing

## Distraction Sites Detected

Currently configured to detect:
- twitter.com / x.com
- instagram.com
- facebook.com
- reddit.com
- youtube.com
- tiktok.com

## Permissions

This extension requires:
- `activeTab` - Access current tab information
- `tabs` - Close tabs when user chooses to leave

**Privacy**:
- No data collection
- No analytics or tracking
- No network requests
- Everything runs locally
- Open source and transparent

## Troubleshooting

### Extension Won't Load

1. **Check Build Output**
   - Ensure `npm run build` completed successfully
   - Verify `dist` folder exists with all files

2. **Check Console Errors**
   - Open Chrome DevTools
   - Look for errors in Console tab
   - Check `chrome://extensions/` → Snapback → Errors

### Overlay Doesn't Appear

1. **Verify Site Detection**
   - Open DevTools Console
   - Look for `[Snapback]` log messages
   - Check if site is in distraction list

2. **Clear Session**
   - Refresh the page
   - The overlay only shows once per page session

3. **Check Extension Status**
   - Go to `chrome://extensions/`
   - Ensure Snapback is enabled
   - Try reloading the extension

### Styling Issues

- The extension uses Shadow DOM to isolate styles
- If styles aren't applying, check browser console for CSS errors
- Ensure content.css is being loaded in dist folder

## Browser Compatibility

- Chrome (Manifest V3)
- Other Chromium browsers (Edge, Brave, etc.)

## Future Enhancements

Planned improvements:
- User-configurable distraction site list (settings page)
- Custom quote input
- Usage statistics and insights
- Scheduled blocking (time-based rules)
- Export/import settings
- Multiple timer presets

## Privacy

Snapback is completely local and private:
- ✅ No data collection
- ✅ No analytics or tracking
- ✅ No network requests
- ✅ No data leaves your computer
- ✅ Open source and transparent

All processing happens locally in your browser. The extension only monitors URLs to detect distraction sites and displays the overlay - nothing is sent to external servers.

## Credits

Built with:
- UI inspiration from mindfulness and meditation apps
- Design system based on shadcn/ui components
- Meditation imagery for calming effect

## License

MIT License - Feel free to modify and use as you wish!

## Contributing

This is a personal project, but suggestions and feedback are welcome! Feel free to:
- Open issues for bugs or feature requests
- Fork and experiment
- Share your customizations

---

**Remember**: The goal isn't to block websites entirely, but to create awareness and help you make intentional choices about your time and attention. 🧘‍♀️✨
