# Icon Generation Instructions

The extension requires three PNG icon files:
- `icon16.png` (16x16 pixels)
- `icon48.png` (48x48 pixels)
- `icon128.png` (128x128 pixels)

## Quick Generation from SVG

An SVG template (`icon.svg`) is provided in this directory. Convert it to PNG using one of these methods:

### Method 1: Online Converter (Easiest)
1. Visit https://cloudconvert.com/svg-to-png
2. Upload `icon.svg`
3. Convert to PNG at three sizes: 16x16, 48x48, 128x128
4. Download and rename to `icon16.png`, `icon48.png`, `icon128.png`

### Method 2: Command Line (Linux/Mac)
```bash
# Using rsvg-convert (install with: apt-get install librsvg2-bin)
rsvg-convert -w 16 -h 16 icon.svg -o icon16.png
rsvg-convert -w 48 -h 48 icon.svg -o icon48.png
rsvg-convert -w 128 -h 128 icon.svg -o icon128.png

# OR using ImageMagick (install with: apt-get install imagemagick)
convert -background none -resize 16x16 icon.svg icon16.png
convert -background none -resize 48x48 icon.svg icon48.png
convert -background none -resize 128x128 icon.svg icon128.png
```

### Method 3: Figma/Design Tool
1. Open Figma, Canva, or similar design tool
2. Create artboards at 16x16, 48x48, and 128x128 pixels
3. Design a simple focus/target icon with purple gradient background
4. Export as PNG

## Icon Design
The icon represents "focus" and "snapback" concepts:
- Purple gradient background (#667eea to #764ba2)
- Concentric circles (target/focus symbol)
- Optional arrow pointing upward (snapback/return concept)

## Temporary Workaround
The extension will work without custom icons (Chrome shows a default icon). You can add proper icons later.

## Quick Emoji Alternative
For quick testing, you can use an emoji as the icon by creating simple PNG files with an emoji:
- Focus emoji: 🎯
- Eye emoji: 👁️
- Arrow emoji: ↩️
- Timer emoji: ⏱️
