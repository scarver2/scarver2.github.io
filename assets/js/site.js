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
  const COIN_SRC = "/assets/audio/coin.mp3";
  const POWERUP_SRC = "/assets/audio/power-up.mp3";

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

/* =========================
   Credits Scroll Controls
   ========================= */
(() => {
  const scroll = document.getElementById('creditsScroll');
  const pauseBtn = document.getElementById('pauseBtn');
  const resetBtn = document.getElementById('resetBtn');
  const countdown = document.getElementById('countdown');

  if (!scroll || !pauseBtn || !resetBtn) return;

  let isPaused = false;
  let countdownValue = 10;
  let countdownInterval;

  // Pause/Resume toggle
  pauseBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    scroll.classList.toggle('paused');
    pauseBtn.textContent = isPaused ? '▶ PLAY' : '⏸ PAUSE';
  });

  // Reset scroll
  resetBtn.addEventListener('click', () => {
    scroll.style.animation = 'none';
    setTimeout(() => {
      scroll.style.animation = '';
    }, 10);
    countdownValue = 10;
    if (countdown) countdown.textContent = countdownValue;
  });

  // Countdown timer
  if (countdown) {
    countdownInterval = setInterval(() => {
      if (!isPaused && countdownValue > 0) {
        countdownValue--;
        countdown.textContent = countdownValue;
      }
      if (countdownValue === 0) {
        clearInterval(countdownInterval);
      }
    }, 1000);
  }
})();

/* =========================
   Contact Form Validation
   ========================= */
(() => {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  // Set the redirect URL dynamically based on current domain
  const redirectInput = document.getElementById('formRedirect');
  if (redirectInput) {
    const currentOrigin = window.location.origin; // Gets http://localhost:4000 or https://stancarver.com
    redirectInput.value = `${currentOrigin}/thanks/`;
    console.log('Form redirect set to:', redirectInput.value);
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  const nameInput = form.querySelector('input[name="name"]');
  const emailInput = form.querySelector('input[name="email"]');
  const messageInput = form.querySelector('textarea[name="message"]');
  const honeypot = form.querySelector('input[name="_honey"]');

  // Disable submit button initially
  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.5';
  submitBtn.style.cursor = 'not-allowed';

  // Validate form
  function validateForm() {
    // Check if honeypot is filled (bot detected)
    if (honeypot && honeypot.value.trim() !== '') {
      console.log('Bot detected - honeypot filled');
      return false;
    }

    // Check if all required fields are valid
    const isNameValid = nameInput && nameInput.value.trim().length > 0;
    const isEmailValid = emailInput && emailInput.validity.valid && emailInput.value.trim().length > 0;
    const isMessageValid = messageInput && messageInput.value.trim().length > 0;

    return isNameValid && isEmailValid && isMessageValid;
  }

  // Update button state
  function updateButtonState() {
    const isValid = validateForm();

    if (isValid) {
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      submitBtn.style.cursor = 'pointer';
    } else {
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.5';
      submitBtn.style.cursor = 'not-allowed';
    }
  }

  // Add event listeners to all fields
  [nameInput, emailInput, messageInput].forEach(field => {
    if (field) {
      field.addEventListener('input', updateButtonState);
      field.addEventListener('blur', updateButtonState);
    }
  });

  // Watch honeypot (if bot fills it, disable form)
  if (honeypot) {
    honeypot.addEventListener('input', () => {
      if (honeypot.value.trim() !== '') {
        console.log('Bot activity detected');
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.3';
        submitBtn.style.cursor = 'not-allowed';
        // Prevent form submission
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          console.log('Submission blocked - bot detected');
          return false;
        }, { once: true });
      }
    });
  }

  // Double-check on submit
  form.addEventListener('submit', (e) => {
    if (!validateForm()) {
      e.preventDefault();
      console.log('Form submission blocked - validation failed');

      // Show notification
      showFormError('Please fill out all required fields correctly');
      return false;
    }

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'SENDING...';
    form.classList.add('submitting');
  });

  // Show error notification
  function showFormError(message) {
    // Remove existing notification
    const existing = document.querySelector('.form-error-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'form-error-notification';
    notification.textContent = message;
    form.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  // Initial validation check
  updateButtonState();
})();