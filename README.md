# Ready Player One

My portfolio website showcasing my work in software engineering and creative problem-solving, with subtle nods to my interests in astronomy, music, and classic gaming.

## Sound Effects

Click events trigger chip-tune sound effects. Procedural fallback for WebAudio if MP3s are unavailable.

## Power-Up (DevTools Easter Egg)
Konami Code: `↑ ↑ ↓ ↓ ← → ← → B A`

It triggers:
- screen shake
- POWER UP HUD
- 3s coin fountain (canvas)
- layered 8-bit SFX

## Credits

- [Jekyll](https://jekyllrb.com/)
- [Guard](https://github.com/guard/guard)
- [Foreman](https://github.com/ddollar/foreman)
- [Bootstrap](https://getbootstrap.com/)
- [jQuery](https://jquery.com/)
- [WebAudio](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Konami Code](https://en.wikipedia.org/wiki/Konami_Code)

## Developer Notes

### Local Development
```bash
bundle install
foreman s -f Procfile.dev
```

### Folder Structure
```bash
mr-hyde/
├─ _includes/
│  ├─ header.html
│  ├─ nav.html
│  └─ footer.html
│
├─ _layouts/
│  ├─ default.html
│  └─ home.html              # TODO: data-driven cartridges
│
├─ _data/
│  └─ cartridges.yml         # TODO: cartridges of title/description/links
│
├─ _sass/                    # TODO: Sass, it's still relevant
│
├─ assets/
│  ├─ css/
│  ├─ img/
│  └─ js/
├─ _config.yml
├─ Gemfile
├─ Gemfile.lock
└─ README.md
```

## About Me

&copy;2025 
Stan Carver II [Portfolio](http://scarver2.github.io/) [LinkedIn](https://www.linkedin.com/in/scarver2/)
