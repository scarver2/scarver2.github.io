(() => {
  /* =========================
     Year
     ========================= */
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* =========================
     Accessibility
     ========================= */
  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =========================
     SFX Toggle (optional)
     ========================= */
  const SFX_ENABLED_KEY = "scarver2:sfx";
  let sfxEnabled = localStorage.getItem(SFX_ENABLED_KEY);
  if (sfxEnabled === null) sfxEnabled = "on";
  const isSfxOn = () => sfxEnabled === "on";

  /* =========================
     Audio sources
     ========================= */
  const COIN_SRC = "/assets/sfx/coin.mp3";
  const POWERUP_SRC = "/assets/sfx/power-up.mp3";

  /* =========================
     Audio pools (overlap-safe)
     ========================= */
  function makePool(src, volume = 0.6, size = 4) {
    return Array.from({ length: size }, () => {
      const a = new Audio(src);
      a.preload = "auto";
      a.volume = volume;
      return a;
    });
  }

  const coinPool = makePool(COIN_SRC, 0.55);
  const powerPool = makePool(POWERUP_SRC, 0.65);
  let coinIndex = 0;
  let powerIndex = 0;

  function playFromPool(pool, indexRef) {
    if (!isSfxOn()) return;

    const a = pool[indexRef.value];
    indexRef.value = (indexRef.value + 1) % pool.length;

    try {
      a.currentTime = 0;
      const p = a.play();
      if (p && typeof p.catch === "function") p.catch(() => { });
    } catch {
      /* ignore */
    }
  }

  const coinRef = { value: 0 };
  const powerRef = { value: 0 };

  /* =========================
     Coin pop visual
     ========================= */
  function coinPopAt(x, y) {
    if (prefersReducedMotion) return;

    const el = document.createElement("span");
    const alt = Math.random() < 0.25;
    el.className = "coinPop" + (alt ? " coinPop--alt" : "");
    el.textContent = alt ? "+1UP" : "🪙 +1";
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;

    document.body.appendChild(el);
    el.addEventListener("animationend", () => el.remove(), { once: true });
  }

  /* =========================
     Link classification
     ========================= */
  function isExternalLink(anchor) {
    if (!anchor || !anchor.href) return false;

    try {
      const url = new URL(anchor.href, window.location.href);

      // mailto:, tel:, javascript:, etc. = treat as internal (no power-up)
      if (url.protocol !== "http:" && url.protocol !== "https:") return false;

      return url.origin !== window.location.origin;
    } catch {
      return false;
    }
  }

  /* =========================
     Click handler
     ========================= */
  document.addEventListener("click", (ev) => {
    const target = ev.target?.closest?.("a, button");
    if (!target) return;

    // Per-element opt-out
    if (target.dataset?.sfx === "off") return;

    // Only normal left-clicks
    if (ev.button !== 0) return;
    if (ev.metaKey || ev.ctrlKey || ev.altKey || ev.shiftKey) return;

    // Visual
    coinPopAt(ev.clientX, ev.clientY);

    // Audio routing
    const isAnchor = target.tagName === "A" && target.href;
    const isExternal = isAnchor && isExternalLink(target);

    // Always show visual immediately
    coinPopAt(ev.clientX, ev.clientY);

    // Play appropriate sound
    if (isExternal) {
      playFromPool(powerPool, powerRef);
    } else {
      playFromPool(coinPool, coinRef);
    }

    // INTERNAL NAV: delay navigation so effect can play
    if (isAnchor && !isExternal && !target.hash) {
      ev.preventDefault();

      const href = target.href;
      const delayMs = 1000; // matches coinPop animation duration

      setTimeout(() => {
        window.location.href = href;
      }, delayMs);
    }
  });

  /* =========================
     Warm audio on first gesture
     ========================= */
  document.addEventListener(
    "pointerdown",
    () => {
      if (!isSfxOn()) return;
      [...coinPool, ...powerPool].forEach((a) => {
        if (a.readyState === 0) a.load();
      });
    },
    { once: true }
  );

  /* =========================
     Optional global toggle
     ========================= */
  window.ScarverSfx = {
    on() {
      sfxEnabled = "on";
      localStorage.setItem(SFX_ENABLED_KEY, "on");
    },
    off() {
      sfxEnabled = "off";
      localStorage.setItem(SFX_ENABLED_KEY, "off");
    },
    status() {
      return isSfxOn() ? "on" : "off";
    },
  };
})();
