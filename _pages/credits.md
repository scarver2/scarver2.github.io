---
layout: default
title: Credits
description: Credits, links, and contact for Stan Carver II (scarver2).
permalink: /credits/
sitemap:
  priority: 0.7
  changefreq: monthly
---

<section class="panel">
  <header class="panel__head">
    <h1 class="glow">CREDITS</h1>
    <p class="panel__sub">Links, contact, and the places I build in public.</p>
  </header>

  <div class="twoCol">
    <div>
      <h2 id="contact">INSERT COIN (CONTACT)</h2>
      <p class="lede" style="max-width: 62ch;">
        Hiring for CTO / Principal Engineer? I'm remote in Anna, TX and can travel for key meetings.
        Best way to reach me:
      </p>

      <div class="ctaRow">
        <a class="btn primary coin-link" href="https://www.linkedin.com/in/scarver2/" target="_blank" rel="noreferrer">
  LINKEDIN (PRIMARY)
</a>
        <a class="btn" href="#email-note">
          EMAIL (ON REQUEST)
        </a>
      </div>

      <p id="email-note" class="lede" style="margin-top:10px;">
        For serious opportunities, I'm happy to share my email after an initial LinkedIn conversation.
      </p>

      <div class="meta">
        <span class="chip">Response: fast</span>
        <span class="chip">Timezone: America/Chicago</span>
        <span class="chip">Style: direct + calm</span>
      </div>
    </div>

    <div>
      <h2>PLAYER PROFILES</h2>
      <ul class="bullets">
        <li><a class="link" href="https://github.com/scarver2" target="_blank" rel="noreferrer">GitHub: github.com/scarver2</a></li>
        <li><a class="link" href="https://www.linkedin.com/in/scarver2/" target="_blank" rel="noreferrer">LinkedIn: linkedin.com/in/scarver2</a></li>
        <li><a class="link" href="https://stackoverflow.com/users/307308/scarver2" target="_blank" rel="noreferrer">Stack Overflow</a></li>
        <li><a class="link" href="https://coderwall.com/scarver2" target="_blank" rel="noreferrer">Coderwall</a></li>
        <li><a class="link" href="https://www.youtube.com/@scarver2" target="_blank" rel="noreferrer">YouTube</a></li>
      </ul>

      <div class="card" style="margin-top:12px;">
        <h3>Note</h3>
        <p>
          I keep my professional profile on LinkedIn and my personal life on Facebook.
          This site is intentionally focused on engineering craft, leadership, and shippable work.
        </p>
      </div>
    </div>
  </div>
</section>

<section class="panel">
  <header class="panel__head">
    <h2>THE CREDITS ROLL</h2>
    <p class="panel__sub">A few themes that show up in my work.</p>
  </header>

  <div class="cards">
    <article class="card">
      <h3>Ship, then iterate</h3>
      <p>High standards, but no worship of the last 10%. Deliver value and keep momentum.</p>
    </article>
    <article class="card">
      <h3>Make systems teachable</h3>
      <p>Docs, conventions, and guardrails so teams can move without fear.</p>
    </article>
    <article class="card">
      <h3>Smooth execution</h3>
      <p>Production is sacred. Fixes are measured. Decisions are recorded.</p>
    </article>
  </div>
</section>

<section class="panel credits-scroll-container">
  <header class="panel__head">
    <h2>THE CREDITS ROLL</h2>
    <p class="panel__sub">Arcade-style credits. Sit back and watch, or scroll manually.</p>
  </header>

  <div class="credits-viewport">
    <div class="credits-scroll" id="creditsScroll">
      
      <!-- Companies -->
      <div class="credits-section">
        <h3 class="credits-title">— COMPANIES HELPED —</h3>
        {% for company in site.data.credits.companies %}
        <div class="credits-item">
          <div class="credits-name">{{ company.name }}</div>
          <div class="credits-role">{{ company.role }}</div>
        </div>
        {% endfor %}
      </div>

      <!-- Projects -->
      <div class="credits-section">
        <h3 class="credits-title">— OPEN SOURCE PROJECTS —</h3>
        {% for project in site.data.credits.projects %}
        <div class="credits-item">
          <div class="credits-name">{{ project.name }}</div>
          <div class="credits-role">{{ project.type }}</div>
        </div>
        {% endfor %}
      </div>

      <!-- Publications -->
      <div class="credits-section">
        <h3 class="credits-title">— PUBLISHED WORKS —</h3>
        {% for pub in site.data.credits.publications %}
        <div class="credits-item">
          <div class="credits-name">{{ pub.title }}</div>
          <div class="credits-role">{{ pub.venue }}</div>
        </div>
        {% endfor %}
      </div>

      <!-- Achievements -->
      <div class="credits-section">
        <h3 class="credits-title">— ACHIEVEMENTS UNLOCKED —</h3>
        {% for achievement in site.data.credits.achievements %}
        <div class="credits-item">
          <div class="credits-name">{{ achievement.title }}</div>
          <div class="credits-role">{{ achievement.location }}</div>
        </div>
        {% endfor %}
      </div>

      <!-- Special Thanks (Easter Egg) -->
      <div class="credits-section credits-special">
        <h3 class="credits-title">— SPECIAL THANKS —</h3>
        <div class="credits-item credits-heart">
          <div class="credits-name">{{ site.data.credits.special_thanks.name }}</div>
          <div class="credits-role">{{ site.data.credits.special_thanks.title }}</div>
          <div class="credits-message">{{ site.data.credits.special_thanks.message }}</div>
        </div>
      </div>

      <!-- Continue Prompt -->
      <div class="credits-section credits-continue">
        <div class="credits-continue-text">CONTINUE?</div>
        <div class="credits-countdown" id="countdown">10</div>
        <a href="/" class="btn primary coin-link credits-home-btn">RETURN TO START</a>
      </div>

    </div>
  </div>

  <!-- Controls -->
  <div class="credits-controls">
    <button id="pauseBtn" class="btn">⏸ PAUSE</button>
    <button id="resetBtn" class="btn">⏮ RESET</button>
  </div>
</section>