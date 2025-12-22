# Arcade Portfolio TODO list

## scarver2.github.io — Jekyll conversion

Time to level-up this site and do some refactoring into something more maintainable.
Static HTML is bulky and cumbersome to maintain. It's defintely not DRY.
_Jekyll to the rescue._

## Deploy to GitHub Pages
GitHub recommends deploying Pages sites via GitHub Actions.  
https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll

1. Repo Settings → Pages → Build and deployment → Source: **GitHub Actions**
2. Commit `.github/workflows/pages.yml`

### Add MP3 sfx
Drop-in 8-bit chiptune MP3s in `assets/sfx/` matching `assets/sfx/manifest.js`:
- coin.mp3
- coin_shower.mp3
- golden_coin.mp3
- jackpot.mp3
- powerup.mp3
- ui_confirm.mp3
- robot_voice.mp3 (optional TI speech synth nostalgia)

The animation will still make noise without MP3s (procedural WebAudio fallback), but MP3s will sound *way* more authentic.
