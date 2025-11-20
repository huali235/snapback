# Snapback - Browser Extension

## Project Overview
A Chrome browser extension that detects when you visit distracting websites (Twitter/X, Instagram, etc.) and displays a gentle reminder popup to help you refocus on work. This is an MVP with hardcoded distraction sites that will later evolve into a native Mac application.

## Learning Objectives
- Understand browser extension architecture and different execution contexts
- Learn Manifest V3 specification and permissions model
- Practice DOM manipulation from content scripts
- Understand Chrome extension APIs
- Learn extension development workflow and debugging

---

## Project Structure
```
├── manifest.json          # Extension configuration and permissions
├── content.js            # Runs on every webpage, detects distractions
├── styles.css            # Styling for the overlay popup
├── icons/
│   ├── icon16.png        # Extension icon (16x16)
│   ├── icon48.png        # Extension icon (48x48)
│   └── icon128.png       # Extension icon (128x128)
└── README.md             # User-facing documentation
```

---

## Technical Architecture

### Execution Contexts
This extension uses a **Content Script** architecture:
- **Content Script** (`content.js`): Injected into every webpage, checks URL and injects popup
- **No background script needed** for MVP (keeps it simple)

### How It Works
1. User navigates to any webpage
2. Chrome automatically injects `content.js` into the page
3. `content.js` checks `window.location.href` against hardcoded list
4. If URL matches a distraction site → inject styled overlay
5. Overlay shows reminder message
6. User clicks "Got it" or popup auto-dismisses after 5 seconds

### Key Concepts

**Content Script Isolation:**
- Content scripts share the DOM with the webpage but have isolated JavaScript scope
- Cannot access webpage's JavaScript variables directly
- Can read/modify the DOM freely

**Manifest V3:**
- Modern Chrome extension standard (required for new extensions)
- More secure and performant than V2
- Uses service workers instead of persistent background pages

**Permissions:**
- `activeTab`: Access current tab (minimal permission)
- No host permissions needed since we're checking URL client-side

---

## Development Phases

### Phase 1: Project Setup & Basic Structure
**Goal:** Set up extension files and understand manifest.json

**Tasks:**
1. ✅ Create `manifest.json` with basic metadata
2. ✅ Understand manifest fields:
   - ✅ `manifest_version`: Must be 3 for new extensions
   - ✅ `name`, `version`, `description`: Basic metadata
   - ✅ `icons`: Extension icon shown in Chrome
   - ✅ `content_scripts`: Declares when/where to inject scripts

**Learning Points:**
- ✅ Manifest V3 structure
- ✅ Content script injection patterns
- ✅ Permission model basics

**Deliverable:** ✅ Valid `manifest.json` that Chrome can load

---

### Phase 2: URL Detection Logic
**Goal:** Create content script that detects distracting websites

**Tasks:**
1. Create `content.js`
2. Define hardcoded array of distraction sites:
   ```javascript
   const DISTRACTION_SITES = [
     'twitter.com',
     'x.com', 
     'instagram.com',
     'facebook.com',
     'reddit.com',
     'youtube.com'
   ];
   ```
3. Write function to check if current URL matches any distraction site
4. Use `window.location.href` to get current URL
5. Add console.log() to verify detection works

**Learning Points:**
- How content scripts access page URL
- String matching with `.includes()`
- When content scripts execute (`document_idle` timing)

**Testing:**
- Load extension in Chrome
- Visit twitter.com → check console for log
- Visit google.com → no log should appear

**Deliverable:** Content script that correctly identifies distraction sites

---

### Phase 3: DOM Injection & Popup Display
**Goal:** Show a basic popup when distraction is detected

**Tasks:**
1. Create function `showDistractionPopup()`
2. Check if popup already exists (prevent duplicates)
3. Create overlay element with JavaScript:
   ```javascript
   const overlay = document.createElement('div');
   overlay.id = 'distraction-blocker-overlay';
   ```
4. Set innerHTML with message structure
5. Append to `document.body`
6. Add event listener for dismiss button

**Learning Points:**
- DOM manipulation from content scripts
- Creating elements dynamically
- Event handling in injected content
- Preventing duplicate injections

**Testing:**
- Visit twitter.com → popup should appear
- Click dismiss → popup should disappear
- Refresh page → popup should appear again

**Deliverable:** Functional but unstyled popup

---

### Phase 4: Styling & Visual Design
**Goal:** Make the popup look professional and non-intrusive

**Tasks:**
1. Create `styles.css`
2. Design overlay that:
   - Appears in top-right corner
   - Has semi-transparent backdrop (optional)
   - Uses smooth fade-in animation
   - Is clearly visible but not blocking entire screen
3. Link CSS in manifest.json content_scripts
4. Add custom styles:
   - Clean typography
   - Rounded corners
   - Drop shadow for depth
   - Responsive button styling
   - Hover states

**Learning Points:**
- CSS injection via content_scripts
- CSS specificity and `!important` usage
- Animations with CSS transitions
- Positioning overlays on existing pages

**Styling Considerations:**
- Use high z-index (e.g., 999999) to appear on top
- Use `!important` to override page styles if needed
- Prefix class names to avoid conflicts (e.g., `dbl-` for "distraction blocker")

**Testing:**
- Check popup on different websites (light/dark backgrounds)
- Verify popup doesn't break page layout
- Test on different screen sizes

**Deliverable:** Polished, professional-looking popup

---

### Phase 5: Auto-Dismiss & UX Refinement
**Goal:** Add quality-of-life features

**Tasks:**
1. Implement auto-dismiss after 5 seconds
2. Add fade-out animation before removal
3. Prevent showing popup multiple times per page session:
   - Set flag: `window.distractionPopupShown = true`
   - Check flag before showing popup
4. Add smooth entrance animation (slide-in from top)

**Learning Points:**
- `setTimeout()` for delayed actions
- CSS animation keyframes
- Session-based state management
- Cleanup and memory management

**Optional Enhancements:**
- Add sound notification (subtle beep)
- Track if user actually left the page after seeing popup
- Different messages for different sites

**Testing:**
- Popup auto-dismisses after 5 seconds
- Refreshing page shows popup again
- Navigating within site (SPA) doesn't retrigger

**Deliverable:** Smooth, polished user experience

---

### Phase 6: Icons & Polish
**Goal:** Create extension icons and prepare for distribution

**Tasks:**
1. Create three icon sizes:
   - 16x16 (toolbar)
   - 48x48 (extension management)
   - 128x128 (Chrome Web Store)
2. Design simple, recognizable icon (e.g., focus symbol, eye, timer)
3. Add icons to manifest.json
4. Create simple README.md with installation instructions

**Learning Points:**
- Extension icon requirements
- Asset organization
- Documentation basics

**Tools:**
- Figma, Canva, or even simple icon generators
- Can use emoji as placeholder (🎯)

**Deliverable:** Complete, installable extension with proper branding

---

### Phase 7: Testing & Debugging
**Goal:** Ensure extension works reliably across different scenarios

**Test Cases:**
1. Load extension in Chrome → no errors
2. Visit distraction site → popup appears
3. Visit normal site → no popup
4. Popup dismisses on button click
5. Popup auto-dismisses after 5 seconds
6. Multiple tabs with distraction sites work independently
7. Extension doesn't break existing websites

**Debugging Tools:**
- Chrome DevTools → Console (for content script logs)
- `chrome://extensions/` → Inspect views
- Error messages in extension details

**Common Issues to Check:**
- CSP (Content Security Policy) violations
- Z-index conflicts with page elements
- CSS not loading on certain sites
- Memory leaks from event listeners

**Deliverable:** Stable, bug-free extension

---

## Development Workflow

### Initial Setup
```bash
# 1. Create project folder
mkdir distraction-blocker
cd distraction-blocker

# 2. Create necessary files
touch manifest.json content.js styles.css README.md
mkdir icons

# 3. Open in code editor
code .
```

### Loading Extension in Chrome
1. Open Chrome
2. Go to `chrome://extensions/`
3. Enable "Developer mode" (top-right toggle)
4. Click "Load unpacked"
5. Select `distraction-blocker/` folder
6. Extension appears in toolbar

### Making Changes
1. Edit files in your code editor
2. Save changes
3. Go to `chrome://extensions/`
4. Click reload icon on your extension
5. Refresh any test pages
6. Check console for errors/logs

### Debugging
- **Content script**: Right-click page → Inspect → Console
- **Extension errors**: `chrome://extensions/` → Details → Errors
- **Manifest issues**: Shows error message when loading

---

## Key Files Explained

### manifest.json
The blueprint of your extension. Tells Chrome:
- What your extension is called
- What version of manifest spec you're using (V3)
- What permissions it needs
- When and where to inject scripts
- What icons to display

### content.js
JavaScript that runs on every webpage. Has access to:
- The page's DOM (can read and modify)
- `window.location` (current URL)
- Chrome extension APIs (limited set)

Cannot access:
- Page's JavaScript variables
- Most powerful Chrome APIs (those require background script)

### styles.css
CSS that gets injected alongside content.js. Styles your popup overlay.

---

## Chrome Extension APIs Used

### Minimal API Usage (MVP)
- `window.location.href` - Get current URL (standard Web API)
- DOM APIs - Create and manipulate elements
- No Chrome-specific APIs needed for basic version!

### Future APIs (For Enhancements)
- `chrome.storage` - Save user preferences
- `chrome.tabs` - Manage browser tabs
- `chrome.notifications` - Show system notifications
- `chrome.alarms` - Schedule periodic tasks

---

## Resources & Documentation

### Official Documentation
- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Migration](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [Content Scripts Guide](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)

### Helpful Tutorials
- [Getting Started Tutorial](https://developer.chrome.com/docs/extensions/mv3/getstarted/)
- [Sample Extensions](https://github.com/GoogleChrome/chrome-extensions-samples)

### Community
- Stack Overflow - [chrome-extension] tag
- Reddit - r/chrome_extensions
- Chrome Extension Discord communities

---

## Success Criteria

### MVP Complete When:
- ✅ Extension loads without errors
- ✅ Detects all hardcoded distraction sites
- ✅ Shows styled popup on detection
- ✅ Popup can be dismissed
- ✅ Popup auto-dismisses after 5 seconds
- ✅ Works across multiple tabs independently
- ✅ Doesn't break existing websites

### Ready for Next Phase:
- All MVP criteria met
- Code is clean and commented
- README explains installation
- You understand how every part works
- Ready to add settings page or move to native Mac app

---

## Next Steps After MVP

1. **User Testing:** Share with friends, get feedback
2. **Iterate:** Improve based on feedback
3. **Add Settings:** Build popup.html for customization
4. **Publish:** Submit to Chrome Web Store (optional)
5. **Native App:** Begin Swift/Mac app development

---

## Notes & Tips

### Best Practices
- Keep content scripts lightweight
- Always check if element exists before injecting
- Use unique IDs/classes to avoid conflicts
- Test on popular websites (Gmail, YouTube, etc.)
- Console.log everything during development

### Common Pitfalls
- Forgetting to reload extension after changes
- Not checking if popup already exists (duplicates)
- CSS conflicts with page styles
- Permissions errors (easy to fix in manifest)

### Debugging Tips
- Use `console.log()` liberally
- Check Network tab for CSS loading issues
- Inspect z-index if popup is hidden
- Test in Incognito mode (some extensions disabled there)

---

## Questions to Consider

As you build, think about:
1. Should the popup block interaction or just be a notification?
2. How annoying is too annoying? (Balance effectiveness vs. frustration)
3. What message tone actually motivates you?
4. Should there be different behaviors for different sites?
5. How do you handle legitimate use of "distraction" sites? (Some people need Twitter for work)

---
