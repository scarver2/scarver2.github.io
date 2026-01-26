---
layout: default
title: Insert Coin
description: Choose your game mode - hire Stan Carver II as CTO or Principal Rails Engineer.
permalink: /insert-coin/
sitemap:
  priority: 1.0
  changefreq: weekly
---
{% capture md %}
{% include talents.md %}
{% endcapture %}

<section class="panel insert-coin-hero">
  <div class="insert-coin-screen">
    <div class="insert-coin-flash">INSERT COIN</div>
    <h1 class="glow insert-coin-title">CHOOSE YOUR FIGHTER</h1>
    <p class="insert-coin-subtitle">Select your engagement model and press start.</p>
  </div>
</section>

<section class="panel">
  <div class="fighter-select">
    
    <!-- CTO Mode -->
    <div class="fighter-card fighter-card--cto">
      <div class="fighter-badge">CTO MODE</div>
      <div class="fighter-icon">🏛️</div>
      <h2 class="fighter-title">BOSS LEVEL</h2>
      <div class="fighter-subtitle">Leadership • Strategy • Delivery</div>
      
      <div class="fighter-stats">
        <div class="fighter-stat">
          <span class="stat-label">SCOPE</span>
          <span class="stat-value">Full Stack Leadership</span>
        </div>
        <div class="fighter-stat">
          <span class="stat-label">SKILLS</span>
          <span class="stat-value">Teams • Architecture • Outcomes</span>
        </div>
        <div class="fighter-stat">
          <span class="stat-label">IMPACT</span>
          <span class="stat-value">Business-Level Results</span>
        </div>
      </div>

      <div class="fighter-perks">
        <h3>What You Get:</h3>
        <ul class="bullets">
          <li>Strategic technical leadership</li>
          <li>Team building & scaling</li>
          <li>Architecture & delivery systems</li>
          <li>Executive alignment & communication</li>
          <li>Production-safe decision making</li>
        </ul>
      </div>

      <a href="/boss-level/" class="btn primary coin-link fighter-btn">SELECT CTO MODE</a>
    </div>

    <!-- Rails Engineer Mode -->
    <div class="fighter-card fighter-card--rails">
      <div class="fighter-badge fighter-badge--alt">RAILS MODE</div>
      <div class="fighter-icon">⚡</div>
      <h2 class="fighter-title">POWER-UP</h2>
      <div class="fighter-subtitle">Ruby on Rails • Technical Depth</div>
      
      <div class="fighter-stats">
        <div class="fighter-stat">
          <span class="stat-label">SCOPE</span>
          <span class="stat-value">Principal/Staff Engineering</span>
        </div>
        <div class="fighter-stat">
          <span class="stat-label">SKILLS</span>
          <span class="stat-value">Rails • Architecture • Performance</span>
        </div>
        <div class="fighter-stat">
          <span class="stat-label">IMPACT</span>
          <span class="stat-value">Code-Level Excellence</span>
        </div>
      </div>

      <div class="fighter-perks">
        <h3>What You Get:</h3>
        <ul class="bullets">
          <li>Deep Rails expertise (10+ years)</li>
          <li>Architecture & modernization</li>
          <li>Performance & scalability</li>
          <li>Testing & quality systems</li>
          <li>Mentoring & code reviews</li>
        </ul>
      </div>

      <a href="/power-up/" class="btn primary coin-link fighter-btn">SELECT RAILS MODE</a>
    </div>

  </div>
</section>

<section class="panel">
  <header class="panel__head">
    <h2>DIFFICULTY LEVEL</h2>
    <p class="panel__sub">Pick the engagement model that fits your needs.</p>
  </header>

  <div class="difficulty-grid">
    <div class="difficulty-card">
      <div class="difficulty-icon">🚀</div>
      <h3>Startup Mode</h3>
      <p>Move fast, build MVP, establish foundations. Full-time or contract CTO/Principal Engineer.</p>
      <div class="difficulty-meta">INTENSITY: HIGH • SPEED: FAST</div>
    </div>

    <div class="difficulty-card">
      <div class="difficulty-icon">📈</div>
      <h3>Scale Mode</h3>
      <p>Enterprise Rails modernization, team scaling, architecture evolution. Long-term engagement.</p>
      <div class="difficulty-meta">INTENSITY: STEADY • SPEED: SUSTAINABLE</div>
    </div>

    <div class="difficulty-card">
      <div class="difficulty-icon">🛟</div>
      <h3>Rescue Mode</h3>
      <p>Legacy system salvation, technical debt paydown, production stabilization. Crisis to calm.</p>
      <div class="difficulty-meta">INTENSITY: FOCUSED • SPEED: DELIBERATE</div>
    </div>
  </div>
</section>

<section class="panel">
  <header class="panel__head">
    <h2>STAGE SELECT</h2>
    <p class="panel__sub">Choose your engagement type.</p>
  </header>

  <div class="stage-grid">
    <div class="stage-card">
      <div class="stage-number">01</div>
      <h3>Full-Time</h3>
      <p>Join the team permanently. CTO or Principal Engineer role.</p>
    </div>

    <div class="stage-card">
      <div class="stage-number">02</div>
      <h3>Contract</h3>
      <p>Project-based mission. Defined scope, clear deliverables.</p>
    </div>

    <div class="stage-card">
      <div class="stage-number">03</div>
      <h3>Advisory</h3>
      <p>Strategic guidance. Architecture reviews, technical planning.</p>
    </div>
  </div>
</section>

<section class="panel insert-coin-cta">
  <div class="insert-coin-final">
    <div class="insert-coin-flash">READY?</div>
    <h2 class="glow">PRESS START TO CONTACT</h2>
    <div class="ctaRow" style="justify-content: center; margin-top: 2rem;">
      <a class="btn primary coin-link" href="/credits/#contact">INSERT COIN (CONTACT)</a>
      <a class="btn" href="/high-scores/">VIEW HIGH SCORES</a>
    </div>
  </div>
</section>

<section class="panel credits-scroll-container">
  <header class="panel__head">
    <h2>TALENT ROLL</h2>
    <p class="panel__sub">A history of my talents and skills.</p>
  </header>

  <div class="credits-viewport">
    <div class="credits-scroll" id="creditsScroll">
      {{ md | markdownify }}
    </div>
  </div>
</section>

{% include contact-form.html %}
