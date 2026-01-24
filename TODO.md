



Add Sitemap Priority (SEO Boost)
While you're updating frontmatter, add SEO hints:
markdown---
layout: default
title: Toolbox
permalink: /toolbox/
sitemap:
  priority: 0.8
  changefreq: monthly
---

**Priority guide:**
- `1.0` - Homepage (index.html)
- `0.9` - Blog listing
- `0.8` - Major pages (toolbox, boss-level, credits)
- `0.7` - Secondary pages (repos, rails)
- `0.6` - Blog posts (default)


## 📁 FINAL STRUCTURE
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


Make sure ALL pages in _pages/ have:

layout: default
title: [Page Name]
permalink: /[page-name]/

---
layout: default
title: Toolbox
permalink: /toolbox/
---

<section class="panel">
  ...
</section>
