// Arcade DevTools Easter Egg + "Serious Power-Up" (ALL OUT)
// - Console boot banner
// - Konami code unlocks: screen shake + POWER UP HUD + 3s COIN FOUNTAIN
// - TI-99/4A voice is the canonical "robot voice":
//    - If robot_voice.mp3 exists, use it
//    - Otherwise generate a TI-ish LPC-style speech synth fallback (WebAudio)
// - Layered SFX:
//    - Uses your mp3 library via window.playSfx(name)
//    - Falls back to procedural WebAudio pings if mp3 files are missing
// - Maintainable: animation logic is separate from SFX library (manifest.js)

(function () {
  "use strict";

  if (window.__SC_EASTER_EGG__) return;
  window.__SC_EASTER_EGG__ = true;

  const title = "SCARVER2 ARCADE BIOS v1.2";
  const subtitle = "INSERT COIN ▪ PRESS START ▪ VIEW SOURCE";

  try {
    console.log("%c" + title, "font-weight:bold; font-size:14px; letter-spacing:1px;");
    console.log("%c" + subtitle, "opacity:0.85;");
    console.log("%cTip: Konami Code unlocks a serious power-up 😉", "opacity:0.85;");
  } catch (_) {}

  const KONAMI = [
    "ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","KeyB","KeyA",
  ];

  let buffer = [];
  let unlocked = false;

  function onKeydown(e) {
    if (unlocked) return;

    buffer.push(e.code);
    if (buffer.length > KONAMI.length) buffer.shift();

    for (let i = 0; i < buffer.length; i++) {
      if (buffer[i] !== KONAMI[i]) return;
    }
    if (buffer.length !== KONAMI.length) return;

    unlocked = true;
    try { console.log("%c⭐ POWER-UP UNLOCKED ⭐", "font-weight:bold; font-size:14px;"); } catch (_) {}
    triggerPowerUp();
  }

  window.addEventListener("keydown", onKeydown, { passive: true });

  function triggerPowerUp() {
    if (document.getElementById("sc-powerup-overlay")) return;

    injectStyles();

    const overlay = document.createElement("div");
    overlay.id = "sc-powerup-overlay";
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML = `
      <div class="sc-powerup-glow"></div>
      <canvas class="sc-powerup-canvas" width="1" height="1"></canvas>
      <div class="sc-powerup-hud" role="presentation">
        <div class="sc-powerup-title">POWER&nbsp;UP!</div>
        <div class="sc-powerup-sub">CREDITS: <span class="sc-powerup-count">0</span></div>
        <div class="sc-powerup-hint">Achievement: <span class="sc-powerup-ach">READ THE SOURCE</span></div>
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.classList.add("sc-shake");
    window.setTimeout(() => overlay.classList.remove("sc-shake"), 320);

    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    // Audio stack: jackpot + powerup + optional TI speech synth voice + coin shower bed
    playLayeredSfx();

    const canvas = overlay.querySelector(".sc-powerup-canvas");
    const countEl = overlay.querySelector(".sc-powerup-count");

    runCoinFountain(canvas, countEl, 3000).finally(() => {
      overlay.classList.add("sc-powerup-fadeout");
      window.setTimeout(() => {
        overlay.remove();
        document.documentElement.style.overflow = prevOverflow;
      }, 650);
    });
  }

  function injectStyles() {
    if (document.getElementById("sc-powerup-styles")) return;

    const style = document.createElement("style");
    style.id = "sc-powerup-styles";
    style.textContent = `
      #sc-powerup-overlay{
        position:fixed;
        inset:0;
        z-index:9999;
        pointer-events:none;
        overflow:hidden;
        background:rgba(0,0,0,0.25);
        backdrop-filter: blur(2px);
        transform: translateZ(0);
      }
      #sc-powerup-overlay.sc-shake{ animation: scShake 260ms ease-in-out 1; }
      @keyframes scShake{
        0%{ transform: translate(0,0); }
        20%{ transform: translate(-6px, 3px); }
        40%{ transform: translate(5px, -4px); }
        60%{ transform: translate(-4px, -2px); }
        80%{ transform: translate(4px, 2px); }
        100%{ transform: translate(0,0); }
      }

      #sc-powerup-overlay .sc-powerup-glow{
        position:absolute;
        inset:-20%;
        background:
          radial-gradient(circle at 50% 40%, rgba(255,255,255,0.18), rgba(0,0,0,0) 55%),
          radial-gradient(circle at 50% 90%, rgba(0,255,180,0.10), rgba(0,0,0,0) 60%);
        animation: scGlowPulse 550ms infinite alternate ease-in-out;
      }
      @keyframes scGlowPulse{
        from { opacity: 0.75; filter: saturate(1.05); }
        to   { opacity: 1.0;  filter: saturate(1.25); }
      }

      #sc-powerup-overlay .sc-powerup-canvas{
        position:absolute;
        inset:0;
        width:100%;
        height:100%;
      }

      #sc-powerup-overlay .sc-powerup-hud{
        position:absolute;
        left:50%;
        top:14%;
        transform:translateX(-50%);
        text-align:center;
        padding:18px 20px;
        border-radius:14px;
        background:rgba(0,0,0,0.55);
        box-shadow: 0 12px 40px rgba(0,0,0,0.4);
        border: 1px solid rgba(255,255,255,0.08);
        color:#fff;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      }
      #sc-powerup-overlay .sc-powerup-title{
        font-size: 34px;
        font-weight: 900;
        letter-spacing: 2px;
        text-shadow: 0 0 10px rgba(255,255,255,0.15);
        animation: scTitlePop 180ms ease-out both;
      }
      @keyframes scTitlePop{
        from { transform: scale(0.92); opacity: 0.0; }
        to   { transform: scale(1.00); opacity: 1.0; }
      }
      #sc-powerup-overlay .sc-powerup-sub{ margin-top: 8px; font-size: 14px; opacity: 0.92; }
      #sc-powerup-overlay .sc-powerup-count{ font-weight: 900; letter-spacing: 1px; }
      #sc-powerup-overlay .sc-powerup-hint{ margin-top: 10px; font-size: 12px; opacity: 0.85; }
      #sc-powerup-overlay .sc-powerup-ach{ font-weight: 800; opacity: 0.95; }

      #sc-powerup-overlay.sc-powerup-fadeout{ animation: scFadeOut 600ms ease-in both; }
      @keyframes scFadeOut{ from { opacity: 1; } to { opacity: 0; } }

      @media (prefers-reduced-motion: reduce){
        #sc-powerup-overlay .sc-powerup-glow,
        #sc-powerup-overlay .sc-powerup-title{
          animation: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function runCoinFountain(canvas, countEl, durationMs) {
    return new Promise((resolve) => {
      const ctx = canvas.getContext("2d", { alpha: true });

      const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const resize = () => {
        const w = Math.floor(window.innerWidth);
        const h = Math.floor(window.innerHeight);
        canvas.width = Math.floor(w * DPR);
        canvas.height = Math.floor(h * DPR);
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      };
      resize();

      const coins = [];
      let credits = 0;

      const start = performance.now();
      const end = start + durationMs;

      const fountainX = () => window.innerWidth * (0.5 + (Math.random() - 0.5) * 0.10);
      const fountainY = () => window.innerHeight * (0.82 + (Math.random() - 0.5) * 0.02);

      function spawnCoins(now) {
        const t = (now - start) / durationMs;
        const burst = t < 0.2 ? 20 : 9;
        const count = burst + Math.floor(Math.random() * 5);

        for (let i = 0; i < count; i++) {
          const r = 6 + Math.random() * 8;
          coins.push({
            x: fountainX(),
            y: fountainY(),
            vx: (Math.random() - 0.5) * 240,
            vy: -(560 + Math.random() * 560),
            g: 980 + Math.random() * 260,
            r,
            rot: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 10,
            life: 0,
            ttl: 1200 + Math.random() * 1600,
            wobble: Math.random() * 3.5,
            hue: 42 + Math.random() * 10,
            golden: Math.random() < 0.02, // rare!
          });
        }
      }

      function drawCoin(c) {
        const t = c.life / c.ttl;
        const scale = 1.0 - Math.max(0, (t - 0.75) / 0.25) * 0.65;

        const w = c.r * (1.0 + Math.sin(c.rot) * 0.22);
        const h = c.r * (0.75 + Math.cos(c.rot * 1.2) * 0.10);

        // shadow
        ctx.globalAlpha = 0.20 * scale;
        ctx.beginPath();
        ctx.ellipse(c.x + 4, c.y + 8, w * 0.9, h * 0.55, 0, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();

        // coin
        ctx.globalAlpha = 0.95 * scale;
        ctx.beginPath();
        ctx.ellipse(c.x, c.y, w, h, 0, 0, Math.PI * 2);
        ctx.fillStyle = c.golden ? "hsl(55 95% 58%)" : `hsl(${c.hue} 92% 55%)`;
        ctx.fill();

        // rim
        ctx.globalAlpha = 0.85 * scale;
        ctx.lineWidth = 2;
        ctx.strokeStyle = c.golden ? "hsl(50 100% 40%)" : `hsl(${c.hue} 95% 40%)`;
        ctx.stroke();

        // highlight
        ctx.globalAlpha = 0.45 * scale;
        ctx.beginPath();
        ctx.ellipse(c.x - w * 0.25, c.y - h * 0.25, w * 0.35, h * 0.25, 0, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();

        // sparkle
        if (c.golden && Math.random() < 0.10) {
          ctx.globalAlpha = 0.95 * scale;
          ctx.fillStyle = "white";
          ctx.fillRect(c.x + (Math.random() - 0.5) * 14, c.y + (Math.random() - 0.5) * 14, 2, 2);
        } else if (Math.random() < 0.03) {
          ctx.globalAlpha = 0.9 * scale;
          ctx.fillStyle = "white";
          ctx.fillRect(c.x + (Math.random() - 0.5) * 10, c.y + (Math.random() - 0.5) * 10, 2, 2);
        }
      }

      function frame(now) {
        if (now >= end && coins.length === 0) {
          ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
          resolve();
          return;
        }

        // slight trail for juice
        ctx.globalAlpha = 0.18;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.globalAlpha = 1;

        if (now < end) spawnCoins(now);

        const dt = Math.min(0.033, (frame.prev ? (now - frame.prev) / 1000 : 0.016));
        frame.prev = now;

        for (let i = coins.length - 1; i >= 0; i--) {
          const c = coins[i];
          c.life += dt * 1000;
          c.rot += c.spin * dt;

          c.vy += c.g * dt;
          c.x += c.vx * dt;
          c.y += c.vy * dt;

          c.x += Math.sin((now / 1000) * 12 + c.wobble) * 0.6;

          drawCoin(c);

          // "Collect" as it falls through midline
          if (!c.counted && c.y > window.innerHeight * 0.55 && c.vy > 0) {
            c.counted = true;

            if (c.golden) {
              credits += 10;
              tryPlaySfx("goldenCoin", { volume: 0.55 }) || tryPlaySfx("golden_coin", { volume: 0.55 });
            } else {
              credits += 1;
              if (credits % 2 === 0) tryPlaySfx("coin", { volume: 0.35 });
            }

            // milestone UI blip
            if (credits % 10 === 0) tryPlaySfx("uiConfirm", { volume: 0.45 }) || tryPlaySfx("ui_confirm", { volume: 0.45 });

            if (countEl) countEl.textContent = String(credits);
          }

          if (c.life > c.ttl || c.y > window.innerHeight + 80) {
            coins.splice(i, 1);
          }
        }

        requestAnimationFrame(frame);
      }

      window.addEventListener("resize", resize, { passive: true });
      requestAnimationFrame(frame);
      window.setTimeout(() => window.removeEventListener("resize", resize), durationMs + 1500);
    });
  }

  // ---- SFX helpers ----
  function tryPlaySfx(name, opts) {
    try {
      if (typeof window.playSfx === "function") return window.playSfx(name, opts) === true;
      if (window.SFX && typeof window.SFX.play === "function") return window.SFX.play(name) === true;
    } catch (_) {}
    return false;
  }

  function playLayeredSfx() {
    // Prefer your mp3 library
    const hit = tryPlaySfx("jackpot", { volume: 0.9 }) || tryPlaySfx("powerup", { volume: 0.9 });
    tryPlaySfx("powerup", { volume: 0.9 });
    tryPlaySfx("coinShower", { volume: 0.35 }) || tryPlaySfx("coin_shower", { volume: 0.35 });

    // TI-99/4A speech synth nostalgia (MP3 first, procedural fallback if missing)
    const voiceHit =
      tryPlaySfx("robotVoice", { volume: 0.6 }) ||
      tryPlaySfx("robot_voice", { volume: 0.6 });
    if (!voiceHit) proceduralTiSpeechPowerUp();
 
    // If no mp3 hit landed, add procedural stingers so it's never silent
    if (!hit) proceduralPowerChord();
    proceduralCoinCascade(3000);
  }

  // ---- Procedural fallback audio (WebAudio) ----
  function getAudioCtx() {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    if (!window.__SC_AUDIO_CTX__) window.__SC_AUDIO_CTX__ = new Ctx();
    const ctx = window.__SC_AUDIO_CTX__;
    if (ctx.state === "suspended") ctx.resume().catch(() => {});
    return ctx;
  }

  // TI-ish “POWER UP” (LPC-ish vibe, not true TTS)
  // This approximates speech by sweeping formant-like bandpass filters
  // over a buzzy source with a choppy envelope and stepped pitch.
  function proceduralTiSpeechPowerUp() {
    const ctx = getAudioCtx();
    if (!ctx) return;

    const t0 = ctx.currentTime + 0.03;
    const out = ctx.createGain();
    out.gain.setValueAtTime(0.0001, t0);
    out.gain.exponentialRampToValueAtTime(0.55, t0 + 0.02);
    out.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.95);
    out.connect(ctx.destination);

    // Buzzy source (speech-like)
    const src = ctx.createOscillator();
    src.type = "sawtooth";
    // Stepped pitch changes feel retro/LPC-ish
    src.frequency.setValueAtTime(120, t0);
    src.frequency.setValueAtTime(130, t0 + 0.18);
    src.frequency.setValueAtTime(118, t0 + 0.40);
    src.frequency.setValueAtTime(140, t0 + 0.62);
    src.frequency.setValueAtTime(125, t0 + 0.78);

    // “Vocal tract” bandpass filters (formant approximations)
    const f1 = ctx.createBiquadFilter();
    f1.type = "bandpass";
    f1.Q.value = 6.5;

    const f2 = ctx.createBiquadFilter();
    f2.type = "bandpass";
    f2.Q.value = 8.0;

    // A little grit
    const pre = ctx.createGain();
    pre.gain.value = 0.9;

    // Choppy envelope gate (LPC cadence feel)
    const gate = ctx.createGain();
    gate.gain.setValueAtTime(0.0001, t0);

    // Sequence “POWER” (approx) then “UP”
    // We sweep formants to hint syllables: PO-WER / UP
    // Times are tuned to “POWER… UP.” with a brief pause.
    const steps = [
      // P (tight, low)
      { t: 0.00, a: 0.55, f1: 380, f2: 1200 },
      { t: 0.05, a: 0.18, f1: 420, f2: 1500 },
      // OW (open vowel)
      { t: 0.10, a: 0.65, f1: 520, f2: 980 },
      { t: 0.18, a: 0.60, f1: 600, f2: 900 },
      // ER (r-ish)
      { t: 0.28, a: 0.62, f1: 520, f2: 1300 },
      { t: 0.36, a: 0.25, f1: 480, f2: 1600 },
      // pause “...”
      { t: 0.44, a: 0.0001, f1: 420, f2: 1200 },
      // U (oo-ish)
      { t: 0.54, a: 0.70, f1: 420, f2: 850 },
      { t: 0.64, a: 0.66, f1: 460, f2: 900 },
      // P (tight stop)
      { t: 0.76, a: 0.20, f1: 360, f2: 1400 },
      { t: 0.82, a: 0.0001, f1: 340, f2: 1200 },
    ];

    // Apply step changes (hard steps feel more “retro synth” than smooth ramps)
    for (const s of steps) {
      const tt = t0 + s.t;
      gate.gain.setValueAtTime(Math.max(0.0001, s.a), tt);
      f1.frequency.setValueAtTime(s.f1, tt);
      f2.frequency.setValueAtTime(s.f2, tt);
    }

    // A tiny “robot” vibrato for character (subtle)
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 18; // fast “machine” wobble
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 6; // cents-ish on the source freq
    lfo.connect(lfoGain).connect(src.frequency);

    // Wire: src -> pre -> f1 -> f2 -> gate -> out
    src.connect(pre);
    pre.connect(f1);
    f1.connect(f2);
    f2.connect(gate);
    gate.connect(out);

    src.start(t0);
    lfo.start(t0);
    src.stop(t0 + 0.95);
    lfo.stop(t0 + 0.95);
  }

  function proceduralPowerChord() {
    const ctx = getAudioCtx();
    if (!ctx) return;

    const t0 = ctx.currentTime + 0.02;
    const freqs = [220, 277.18, 329.63, 440];

    freqs.forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "triangle";
      o.frequency.setValueAtTime(f, t0);
      o.frequency.exponentialRampToValueAtTime(f * 1.12, t0 + 0.12);

      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.12 / (i + 1), t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.35);

      o.connect(g).connect(ctx.destination);
      o.start(t0);
      o.stop(t0 + 0.45);
    });
  }

  function proceduralCoinCascade(durationMs) {
    const ctx = getAudioCtx();
    if (!ctx) return;

    const start = ctx.currentTime + 0.04;
    const end = start + durationMs / 1000;

    let i = 0;
    function scheduleOne(t) {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      const f = 880 + (Math.random() * 880);
      o.type = "sine";
      o.frequency.setValueAtTime(f, t);

      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.08, t + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);

      o.connect(g).connect(ctx.destination);
      o.start(t);
      o.stop(t + 0.11);
    }

    let t = start;
    while (t < end) {
      const dt = (i < 18) ? 0.035 : 0.06;
      scheduleOne(t);
      if (Math.random() < 0.35) scheduleOne(t + 0.012);
      t += dt;
      i += 1;
    }
  }
})();
