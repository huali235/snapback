# Snapback Extension - Testing Checklist

## Pre-Installation Checks

- [x] All required files present:
  - [x] manifest.json
  - [x] content.js
  - [x] styles.css
  - [x] icons/icon16.png
  - [x] icons/icon48.png
  - [x] icons/icon128.png
  - [x] README.md
  - [x] CLAUDE.md

- [x] manifest.json validation:
  - [x] Valid JSON syntax
  - [x] Correct file paths referenced
  - [x] Manifest version 3
  - [x] Appropriate permissions

- [x] JavaScript syntax:
  - [x] content.js has no syntax errors
  - [x] All functions properly defined

## Installation Testing

### Step 1: Load Extension
- [ ] Navigate to `chrome://extensions/`
- [ ] Enable "Developer mode"
- [ ] Click "Load unpacked"
- [ ] Select snapback directory
- [ ] Extension loads without errors
- [ ] Extension appears in extensions list
- [ ] Icon displays (or default icon if placeholders used)

### Step 2: Check for Errors
- [ ] No errors shown in extension details
- [ ] No console errors on extensions page

## Functional Testing

### Test Case 1: Distraction Site Detection
**Test URL**: https://twitter.com

Expected behavior:
- [ ] Page loads normally
- [ ] Console shows: `[Snapback] Content script loaded on: https://twitter.com`
- [ ] Console shows: `[Snapback] 🎯 Distraction site detected!`
- [ ] Console shows: `[Snapback] Creating distraction popup...`
- [ ] Console shows: `[Snapback] Popup displayed successfully`

### Test Case 2: Popup Display
**Test URL**: https://twitter.com

Expected behavior:
- [ ] Popup appears in top-right corner
- [ ] Popup has purple gradient background
- [ ] Heading shows: "Hey there! 👋"
- [ ] Message is clearly visible
- [ ] Button shows: "Got it, thanks!"
- [ ] Popup slides in smoothly from top
- [ ] Popup doesn't block entire page
- [ ] Can still interact with page underneath

### Test Case 3: Manual Dismiss
**Test URL**: https://twitter.com

Expected behavior:
- [ ] Click "Got it, thanks!" button
- [ ] Console shows: `[Snapback] User clicked dismiss button`
- [ ] Console shows: `[Snapback] Dismissing popup with fade-out animation...`
- [ ] Popup fades out smoothly
- [ ] Console shows: `[Snapback] Popup removed from DOM`
- [ ] Popup completely disappears after ~300ms

### Test Case 4: Auto-Dismiss
**Test URL**: https://twitter.com (don't click dismiss button)

Expected behavior:
- [ ] Popup appears
- [ ] Wait 5 seconds without clicking
- [ ] Console shows: `[Snapback] Auto-dismissing popup after 5 seconds`
- [ ] Popup fades out automatically
- [ ] Popup disappears after animation

### Test Case 5: Session Prevention
**Test URL**: https://twitter.com

Expected behavior:
- [ ] First load: popup appears
- [ ] Dismiss popup (click button or wait 5s)
- [ ] Navigate within site (e.g., click a tweet, go to profile)
- [ ] Popup does NOT appear again
- [ ] Console shows: `[Snapback] Popup already shown this session, skipping...`

### Test Case 6: Page Refresh
**Test URL**: https://twitter.com

Expected behavior:
- [ ] Load page, see popup
- [ ] Dismiss popup
- [ ] Refresh page (F5 or Ctrl+R)
- [ ] Popup appears again (new session)
- [ ] Functions normally

### Test Case 7: Multiple Distraction Sites
Test each site:
- [ ] https://twitter.com - popup appears
- [ ] https://x.com - popup appears
- [ ] https://instagram.com - popup appears
- [ ] https://facebook.com - popup appears
- [ ] https://reddit.com - popup appears
- [ ] https://youtube.com - popup appears

### Test Case 8: Non-Distraction Site
**Test URL**: https://google.com

Expected behavior:
- [ ] Page loads normally
- [ ] Console shows: `[Snapback] Content script loaded on: https://google.com`
- [ ] Console shows: `[Snapback] ✓ Not a distraction site - you're all good!`
- [ ] NO popup appears
- [ ] Page functions completely normally

### Test Case 9: Multiple Tabs
Expected behavior:
- [ ] Open twitter.com in Tab 1 - popup appears
- [ ] Open facebook.com in Tab 2 - popup appears
- [ ] Both popups work independently
- [ ] Dismissing one doesn't affect the other
- [ ] No interference between tabs

### Test Case 10: Duplicate Prevention
**Test URL**: https://twitter.com

Expected behavior:
- [ ] Load page, popup appears
- [ ] While popup is still visible, refresh page quickly
- [ ] Console shows: `[Snapback] Popup already exists, skipping...`
- [ ] Only ONE popup visible at a time

## Visual/Styling Testing

### Popup Appearance
- [ ] Positioned in top-right corner (20px from edges)
- [ ] Purple gradient background visible
- [ ] Text is white and readable
- [ ] Heading is larger and bold
- [ ] Paragraphs have good line height
- [ ] Button is white with purple text
- [ ] Button has rounded corners
- [ ] Drop shadow visible

### Animations
- [ ] Entrance: smooth slide-in from top (0.4s)
- [ ] Exit: smooth fade-out (0.3s)
- [ ] No janky or abrupt movements
- [ ] Animations feel polished

### Responsive Behavior
- [ ] Button hover: background changes to lighter color
- [ ] Button hover: slight upward movement
- [ ] Button hover: shadow increases
- [ ] Button active (click): returns to normal position
- [ ] All interactions feel smooth

### Cross-Site Compatibility
Test popup appearance on different sites:
- [ ] Twitter (dark background) - popup visible
- [ ] Reddit (light background) - popup visible
- [ ] YouTube (varied backgrounds) - popup visible
- [ ] Popup appears on top of all page content
- [ ] No z-index conflicts

## Error Handling

### Edge Cases
- [ ] Load extension on page that's already open (reload extension)
- [ ] Navigate from non-distraction to distraction site
- [ ] Navigate from distraction to distraction site
- [ ] Open distraction site in new tab
- [ ] Open distraction site in new window
- [ ] Open distraction site in incognito mode (if extension enabled)

### Console Verification
- [ ] No JavaScript errors
- [ ] No CSS loading errors
- [ ] All `[Snapback]` log messages are clear and helpful
- [ ] No memory leaks (check after many page loads)

## Documentation Testing

### README.md
- [ ] Installation instructions are clear
- [ ] All links work (if any)
- [ ] Customization examples are correct
- [ ] Troubleshooting steps are helpful

### Code Quality
- [ ] Code is well-commented
- [ ] Function names are descriptive
- [ ] No unused variables or functions
- [ ] Console logs are helpful for debugging

## Performance Testing

- [ ] Extension loads quickly
- [ ] No noticeable page load delay
- [ ] Popup appears instantly when triggered
- [ ] Animations are smooth (60fps)
- [ ] No impact on normal browsing

## Success Criteria

All of the following must be true:
- [x] Extension loads without errors
- [ ] Detects all 6 hardcoded distraction sites
- [ ] Shows styled popup on detection
- [ ] Popup can be dismissed manually
- [ ] Popup auto-dismisses after 5 seconds
- [ ] Only shows once per page session
- [ ] Works across multiple tabs independently
- [ ] Doesn't break any existing websites
- [ ] No console errors
- [ ] Professional appearance

## Known Issues / Limitations

Document any issues found during testing:
- Placeholder icons (1x1 pixel) - user should replace with proper icons
- No customization UI (must edit code to change sites/messages)
- Desktop Chrome only (not tested on other browsers)

## Final Verification

- [x] All code committed to git
- [x] All phases completed (1-7)
- [x] README.md complete
- [x] CLAUDE.md reflects current state
- [x] Ready for user testing

---

**Testing Date**: _______________
**Tester**: _______________
**Chrome Version**: _______________
**Result**: PASS / FAIL
**Notes**:
