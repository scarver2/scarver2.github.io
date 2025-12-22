#!/usr/bin/env bash
set -euo pipefail

# Optional helper: generate browser root icons to eliminate 404s:
#   /favicon.ico
#   /apple-touch-icon.png
#   /apple-touch-icon-precomposed.png
#
# Requirements: curl + ImageMagick (magick) + optionally inkscape
#
# Usage:
#   ./tools/generate-icons.sh

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

command -v magick >/dev/null 2>&1 || { echo "ERROR: ImageMagick 'magick' not found."; exit 1; }

mkdir -p assets tmp assets/sfx

echo "Downloading GitHub avatar..."
curl -fsSL "https://github.com/scarver2.png" -o "tmp/avatar.png"

echo "Creating apple touch icons (CRT-ish)..."
magick "tmp/avatar.png"   -gravity center -extent 1:1   -resize 180x180^ -gravity center -extent 180x180   \( -size 180x180 radial-gradient:rgba(255,255,255,0.06)-rgba(0,0,0,0.35) \)   -compose multiply -composite   \( -size 180x180 xc:none -draw "roundrectangle 0,0 179,179 32,32" \)   -alpha set -compose DstIn -composite   "apple-touch-icon.png"

cp -f "apple-touch-icon.png" "apple-touch-icon-precomposed.png"

echo "Creating favicon.ico from assets/favicon.svg (requires your favicon.svg)..."
if [[ ! -f "assets/favicon.svg" ]]; then
  echo "NOTE: assets/favicon.svg not found. Place your SVG there, then rerun."
  exit 0
fi

if command -v inkscape >/dev/null 2>&1; then
  inkscape "assets/favicon.svg" --export-type=png --export-filename="tmp/favicon-256.png" -w 256 -h 256 >/dev/null
else
  magick -background none "assets/favicon.svg" -resize 256x256 "tmp/favicon-256.png"
fi

magick "tmp/favicon-256.png" -filter point -resize 64x64 -filter point -resize 256x256 -filter point -resize 32x32 "assets/favicon-32.png"
magick "tmp/favicon-256.png" -filter point -resize 32x32 -filter point -resize 256x256 -filter point -resize 16x16 "assets/favicon-16.png"
magick "assets/favicon-16.png" "assets/favicon-32.png" \( "assets/favicon-32.png" -filter point -resize 48x48 \) -background none "favicon.ico"

echo "DONE"
echo "Add and commit:"
echo "  git add favicon.ico apple-touch-icon.png apple-touch-icon-precomposed.png assets/favicon-16.png assets/favicon-32.png"
