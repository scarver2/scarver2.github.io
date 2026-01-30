# Stan Carver II's Portfolio SitesTODO
## scarver2.github.io * stancarver.com

Updates to Stan Carver // Entreprenuer // Creative // Technologist pages

## Content & Design
### Content Tasks
[ ] Add logos cloud panel of companies engaged
[ ] Add Photos🚲 🎸 🇺🇸 📺👰‍♀️ 👨👧🏻 👨 👧, 🏔️ , 🕸️, 🩺, 🍽️ , 🐮 🪡
[ ] Add Timeline panel
[ ] Fix page titles
[ ] Fix arcade stats
[ ] DRY and merge pages and content blocks
[ ] Beef up Rails page. (use 2015 resume opener), My daily driver is Ruby and Ruby on Rails, Link to Ruby on Rails website, Identify longevity
[ ] Add credits page
[x] Add soundtrack e.g. Project X, Buckaroo Banzia, lotus, 80's arcade
[x] 80s vibe. Inspirations from Tron, Back to the Future, Saved by the Bell, Atari, Super Mario Bros.
[ ] MCP End of line cursor, link to Tron movies
[ ] Maybe create a separate creative (80's), entreprenuerial, and political me pages.
[ ] Change background to matrix tron wallpaper.
[x] Update my headshot photo. Current one is circa 2005.
[ ] Update date (Mmm D, YYYY 24:mm) in footer on every deployment
[ ]

### Blog
[ ] d|G/Pluralsight audition
  [x] Publish video on YouTube
  [ ] add description and links
[ ] Blue Eyes
[ ] Frankie
[ ] Howdy World!


### Design Tasks
[ ] On hover, animated transition from pixilated, scanlined digital to focused, clear, full color photo
[ ] Add pixelated images to cartridges


## Technology & Programming Tasks

[ ] Test that all pages in _pages/ have YAML header:
```
---
layout: default
title: [Page Name]
permalink: /[page-name]/
sitemap:
  priority: 0.8
  changefreq: monthly
---
```

[ ] Add Sitemap Priority (SEO Boost)
**Priority guide:**
- `1.0` - Homepage (index.html)
- `0.9` - Blog listing
- `0.8` - Major pages (toolbox, boss-level, credits)
- `0.7` - Secondary pages (repos, rails)
- `0.6` - Blog posts (default)


### Hosting
* Netlify for arcade portfolio website
  * rename repo
  * remove outdate Jekyll requirement from GH
* GitHub Pages for project specific
  * repos
  * data-driven pages and index page
  * keep it simple, easy to maintain
  * link to stancarver.com portfolio

## Documetation
[ ] Update README.md with folder structure, description, and links
[ ] Write styleguide
[ ] Typography
[ ] CSS Classes

```html
<section class="panel">
  ...
</section>
```

### 📁 Folder Structure
```
scarver2.github.io/
├── _config.yml
├── _layouts/
├── _includes/
├── _data/
├── _posts/
├── _pages/              # ← New!
│   ├── toolbox.md
│   ├── credits.md
│   ├── repos.md
│   ├── rails.md
│   └── boss-level.md
├── assets/
├── index.html           # Root
├── blog.html            # Root
├── 404.html             # Root
└── Gemfile
```

```
Home Page
├── tool belt page.
├── Rails page,
├── About Me
│   ├── historical timeline
````

## Content & Pages

#### Repos
[wip] Write Ruby Gems github GIST page
[ ] Write my gems github.io pages

### About Me Page
[ ] Links to some client work I'm most proud of

#### In the Beginning...
TI 99/4a - where it all began, Animation, Video Production, and Programming at the same time - animated intros to videos, speech synthesis. Comic book database.
Making Zork-style command line games on my dad's TRS 80 Model 2,
First video game on Apple II,
First 3D vector geometry modeling on Apple IIc using C language.

##### The Video Toaster Era
[ ] Exodus MM
[ ] Video Toaster page - OWN IT! - Video Toaster Reels (Revolution, T2, VT4000, Flyer)
* MaverickDVW (Walker, Time Warner, Spectrum), FirePower, FireCD
* KTEN - News, CG, Commercials, Toaster Paint, LightWave 3D
* On Video with Jeff Schum and Ron Dillard, Steve __________(link)  VT Flyer ProductRep
* Walker Texas Ranger with Jack and Deuce Bennett (links to IMDB, and portfolios), photo from Walker episode (IMDB link, DJ's BF actor)
* Jimmy Neutron with John Davis (link to IMDB)
* CAT Sleep Hollow with Shane Williams (link to IMDB)
* Glow.TV Dan Velie and Chris Bower
[ ] speech synthesis battles with cousin Howard
[ ] Amiga checkmark icon, Commodore Amiga, Storefront (photos?)
[ ] President of the Pensacola Amiga Users Group
Composite Studio 2 - VT4000 ToasterPaint, Nova Designs's ImageFX, ARexx, (whatever the amiga studio was called)
FireCD
FirePower
Possible reimergance of the Amiga with Autrailia ASISC motherboard  and Gateway Computers
2D animation Disney's AMS, DeluxePaint, Brilliance, 3D, Elastic Reality morphing
Scala MM, InfoChannel (links)
Birth of digital|GENIUS (link)
[ ] Add portfolio (on PAESS DVD, Amiga DVD backup)

#### Database Era
Window Pains (Seeing through a glass darkly)
Lennox, Aria (City of Addison), Yellow Page Autos, Etheridge Printing

#### Internet Marketing Era (Purecreate, A1Web)
Riding the Rails
Purecreate, A1 Web, HipSTU, SemiTrends, Jayroe Printing, A1 Locksmiths, Itique, WWOC, Pollo Salsa, Navini (cite jason Moran)

#### The Calling (and Texting and Email too!)
NDF Children's Pastor, Gratiattitudes (hoffmans), Gateway, MyChosenOnes,Thrive, Marriage XO, GameChangers,

#### Big Enterprise Era (MF, TDOC)
Mercury Flight, Teladoc

#### Legacy & Empowerment Era - Passing the Baton

##### Anna
First Anna Youth Pastor, Bassist
CrossPoint Church Youth Pastor, Bassist
National Day of Prayer - Anna, TX

##### The Hunger Games
Carver & Son: Capriotti's Sandwich Shops & Wing Zone franchises, 3 Strand

##### Threaded Bliss
Texas Embroidery Ranch

Stanta's Workshop
Green Thumb Gardens

### Tech Content Pages
[ ] Links to my repos and their respective GitHub pages, wikis
[ ] File Extensions section, TOML https://toml.io/en/, TOML: Tom's Obvious Minimal Language

File Formats
3D File Formats
LWO, LWS, OBJ, 3DS

Audio File Formats
MIDI, AIFF, AU, WAV, MP3

Image File Formats
PNG, GIF, MPEG, M4V, IFF TGA, JPEG, WEBP, HEIC, AVIF

Video File Formats
AVI, MPEG, QuickTime

Document File Formats
PDF, DOCX,

Print Formats
Postscript

-----------------------------
# Programming Languages & Frameworks
[ ] Create tech stack page (/toolbox?)
[ ] add links when available
[ ] Icon legend, Identify what information the icons mean: contributor, creator, ruby, circa, ... Heart emoji for items I prefer
[ ] List more languages I use
[ ] add  popup on hover: proficiency stars, version(s), years, to each tech & skill

Systems Programming: Zig
Concurrent Services: Elixir/Phoenix, Go, Node.js
Productivity Frameworks: Ruby on Rails
Object-Oriented Programming: Ruby, Mojo/Pyhton, Pascal, Java
Functional programming: Haskell, Phoenix
Machine programming: Zig, Rust, C, C++
  * Amiga: Sas/C gcc dice vbcc, ARexx, CanDo, AMOS, Blitz, Amiga Intuition, Amiga Workbench, Modula-2, 68000 assembler
  * Windows: Visual BASIC, 8088 assembler, VB.net, ASP.net, C#, .NET
  * TI 99/4a: BASIC, Extended BASIC
  * TRS 80: ZPL, CPM
  * Apple: AppleScript, Swift, Objective-C,
  * Android: Kotlin
Isoteric & Legacy: AWK, Pascal, Smalltalk, Lisp, Perl, PHP,
Uncategorized: Clojure, Dart, Erlang, Haskell, Lua, Scala,


## General/Universal
* Skills
[ ] Design Principals: SOLID (link to Wikipedia) where appropriate
[ ] Server-side Events (SSE), WebSockets, Polling
Authentication, Authorization, Session Management: Security Assertion Markup Language (SAML), Single Sign-OnSSO), Role-Based Access Control (RBAC), JSON Web Token (JWT), Session Cookie, password-based and PIN-based authentication, 2FA and multi-factor authentication (MFA), biometric authentication, and token-based authentication. passkeys, magic links, Just-in-time (JIT) access, Zero Trust and contiuous authentication, behavioral, password-less
Authententication: SAML, OAuth, JWT
API

## Ruby
Consume Ruby gems GIST, make JavaScript interactive filtering

## CSS Stylesheets
ZURB Foundation, Bootstrap, TailwindCSS Shadcn, Flowbite, SASS, SCSS
CSS, CSS ANIMATION

## JavaScript
JS Frameworks: Angular, HTMX, React, React Native, Stimulus, Svelte, Vue
JS Libraries: jQuery, Three.js, ESLint
JS Tech: AJAX, JSON, JWT
Strongly-typed JS Languages: Elm, TypeScript, CoffeeScript


## Operating Systems
AmigaOS, Omarchy, Mac OSX, Ubuntu, Windows (puke icon)

## Shell
AmigaShell, ZShell, OhMyZSH, Bash

## Other tech


## Computer & Device Development
iOS, Android, Amiga

## DEVOPS DEVSECOPS
SDLC
CI/CD Deployment & Orchestration: Docker, Kubernetes, Ansible, Chef, Knife, Jenkins, GitHub Actions, Capistrano
Code Repository: Git, GitHub, GitLab?,
Monitoring: Honeybadger, NewRelic, PagerDuty
Log Analysis: Elasticsearch, Logstash, Kibana (ELK),
Linting: Rubocop early adopter
Security Analysis: Brakeman
Multi-server High-Availability (HA) orchestration, multi-language microservices
Kubernetes for auto-scaling, HPA, multi-tenant traffic shaping, and service meshes.
Systems Architect - load balancing, redundancy, minimal servers, NGINX reverse proxy and web server
High Availibility, Five 9's and Zero-downtime rolling deployments, health checks, feature flags & toggles

### Quality Assurance (QA) & Quality Control
Cucumber, RSpec, Minitest, Capybara, PhantomJS,

## AI something, something, something
LLVM, MCP, Claude, ChatGPT, RingCentral AI Receptionist

## Data, Database & Caches
DBA PostgreSQL, Redis, replicas, migrations, warehousing, migrations, sharding, multi-tenancy, GraphQL and vectoring, key-value stores, schemas, data modeling, normalization, procedures, import strategies,obfuscation, benchmarking and optimizing
CSV, XML, XLS(X) injestion, memcached, redis

# Project Management
JIRA, Basecamp, 5PM, Todoist

# Creativity & Design
Mockups: Figma, Sketch

# Marketing

Google Search Engine Marketing, Google SEO
