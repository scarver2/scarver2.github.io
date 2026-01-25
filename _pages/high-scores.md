---
layout: default
title: High Scores
description: Achievement leaderboard for Stan Carver II - civic honors, technical excellence, and production wins.
permalink: /high-scores/
sitemap:
  priority: 0.7
  changefreq: monthly
---

<section class="panel">
  <header class="panel__head">
    <div class="tag">HALL OF FAME</div>
    <h1 class="glow">HIGH SCORES</h1>
    <p class="panel__sub">
      Achievement leaderboard. Real outcomes, measured impact, and a few maxed-out counters.
    </p>
  </header>

  <div class="meta" style="margin-top:12px;">
    <span class="chip">Civic Leadership</span>
    <span class="chip">Technical Excellence</span>
    <span class="chip">Production Wins</span>
    <span class="chip">Community Impact</span>
  </div>
</section>

<section class="panel">
  <header class="panel__head">
    <h2>LEADERBOARD</h2>
    <p class="panel__sub">Ranked achievements that define the player.</p>
  </header>

  <div class="highscore-table">
    <div class="highscore-header">
      <div class="highscore-rank">RANK</div>
      <div class="highscore-achievement">ACHIEVEMENT</div>
      <div class="highscore-score">SCORE</div>
    </div>
    
    {% for score in site.data.highscores.scores %}
    <div class="highscore-row {% if score.rank <= 2 %}highscore-row--gold{% endif %}">
      <div class="highscore-rank">
        <span class="highscore-icon">{{ score.icon }}</span>
        <span class="highscore-number">{{ score.rank }}</span>
      </div>
      <div class="highscore-achievement">
        <div class="highscore-name">{{ score.achievement }}</div>
        <div class="highscore-location">{{ score.location }}</div>
      </div>
      <div class="highscore-score">{{ score.score }}</div>
    </div>
    {% endfor %}
  </div>
</section>

<section class="panel">
  <header class="panel__head">
    <h2>ARCADE STATS</h2>
    <p class="panel__sub">Lifetime counters and career metrics.</p>
  </header>

  <div class="arcade-stats">
    {% for stat in site.data.highscores.stats %}
    <div class="stat-counter">
      <div class="stat-value">{{ stat.value }}</div>
      <div class="stat-label">{{ stat.label }}</div>
    </div>
    {% endfor %}
  </div>
</section>

<section class="panel">
  <div class="ctaRow" style="justify-content: center;">
    <a class="btn primary coin-link" href="/credits/#contact">INSERT COIN TO CONTINUE</a>
    <a class="btn" href="/">RETURN TO START</a>
  </div>
</section>