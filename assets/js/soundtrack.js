/* =========================
   Background Music Player
   - Default: ON (autoplay)
   - If autoplay with sound is blocked, fall back to muted autoplay (YouTube-style)
   - On first user gesture, unmute (if we started muted)
   - User can toggle on/off; preference persisted in localStorage
   ========================= */
(() => {
    const MUSIC_ENABLED_KEY = 'scarver2:music';

    const bgMusic = document.getElementById('bgMusic');
    const musicPlayer = document.getElementById('musicPlayer');
    const musicToggle = document.getElementById('musicToggle');

    if (!bgMusic || !musicPlayer || !musicToggle) return;

    // iOS/Safari friendliness (also set playsinline on the <audio> tag)
    bgMusic.preload = 'auto';
    bgMusic.playsInline = true;

    // Base volume (when unmuted)
    const BASE_VOLUME = 0.15;
    bgMusic.volume = BASE_VOLUME;

    // Saved preference - DEFAULT TO ON
    const savedPref = localStorage.getItem(MUSIC_ENABLED_KEY);
    let musicEnabled = savedPref === null ? true : savedPref === 'true';

    // Optional: respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        musicEnabled = false;
    }

    // State
    let startedMuted = false;
    let unmuteArmed = false;

    // ---------- Helpers ----------
    function setPlayingUI(isPlaying) {
        musicPlayer.classList.toggle('playing', !!isPlaying);
    }

    function showNotification(message) {
        const existing = document.querySelector('.music-notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = 'music-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => notification.remove(), 3000);
    }

    async function tryPlay({ allowMutedFallback = true } = {}) {
        if (!musicEnabled) {
            setPlayingUI(false);
            return false;
        }

        // Always start from "intended" audio state
        startedMuted = false;
        bgMusic.muted = false;
        bgMusic.volume = BASE_VOLUME;

        // 1) Try normal autoplay (with sound)
        try {
            await bgMusic.play();
            setPlayingUI(true);
            return true;
        } catch (_) {
            // continue to muted fallback
        }

        // 2) Fallback: muted autoplay (more likely to be allowed)
        if (allowMutedFallback) {
            try {
                bgMusic.muted = true;
                startedMuted = true;
                await bgMusic.play();
                setPlayingUI(true);
                showNotification('TAP 🔊 TO UNMUTE');
                armUnmuteOnFirstGesture();
                return true;
            } catch (_) {
                // still blocked
            }
        }

        // 3) Fully blocked
        setPlayingUI(false);
        return false;
    }

    function armUnmuteOnFirstGesture() {
        if (unmuteArmed) return;
        unmuteArmed = true;

        const events = ['pointerdown', 'touchstart', 'keydown', 'mousedown'];
        const handler = () => {
            if (!musicEnabled) return;

            // Only unmute if we actually started muted
            if (startedMuted) {
                bgMusic.muted = false;
                bgMusic.volume = BASE_VOLUME;
                startedMuted = false;
                showNotification('SOUNDTRACK ON');
            } else if (bgMusic.paused) {
                // Safety: if paused for any reason, try to start again
                bgMusic.play().then(() => setPlayingUI(true)).catch(() => setPlayingUI(false));
            }
        };

        events.forEach(evt =>
            window.addEventListener(evt, handler, { once: true, passive: true })
        );
    }

    function pauseMusic() {
        try { bgMusic.pause(); } catch (_) { }
        setPlayingUI(false);
    }

    // ---------- Initial load ----------
    (async () => {
        if (!musicEnabled) {
            setPlayingUI(false);
            return;
        }

        const ok = await tryPlay({ allowMutedFallback: true });

        // If neither sound nor muted autoplay worked, prompt the user
        if (!ok) {
            showNotification('CLICK 🔊 TO START MUSIC');
            armStartOnFirstGesture();
        }
    })();

    // If fully blocked, start on first gesture (with sound first, then muted fallback)
    function armStartOnFirstGesture() {
        const events = ['pointerdown', 'touchstart', 'keydown', 'mousedown'];
        const handler = async () => {
            if (!musicEnabled) return;

            const ok = await tryPlay({ allowMutedFallback: true });
            if (ok && startedMuted) {
                // Unmute will happen on a subsequent gesture, or user can click toggle again
                armUnmuteOnFirstGesture();
            } else if (ok) {
                showNotification('SOUNDTRACK ON');
            } else {
                showNotification('PLAYBACK ERROR');
            }
        };

        events.forEach(evt =>
            window.addEventListener(evt, handler, { once: true, passive: true })
        );
    }

    // ---------- Toggle ----------
    musicToggle.addEventListener('click', async () => {
        musicEnabled = !musicEnabled;
        localStorage.setItem(MUSIC_ENABLED_KEY, musicEnabled.toString());

        if (musicEnabled) {
            const ok = await tryPlay({ allowMutedFallback: true });

            if (ok) {
                // If it started muted, we already showed "TAP TO UNMUTE"
                if (!startedMuted) showNotification('SOUNDTRACK ON');
            } else {
                showNotification('CLICK 🔊 TO START MUSIC');
                armStartOnFirstGesture();
            }
        } else {
            pauseMusic();
            showNotification('SOUNDTRACK OFF');
        }
    });

    // ---------- Optional: fade out on leaving page ----------
    window.addEventListener('beforeunload', () => {
        if (bgMusic && !bgMusic.paused && !bgMusic.muted) {
            let volume = bgMusic.volume;
            const fadeOut = setInterval(() => {
                if (volume > 0.05) {
                    volume -= 0.05;
                    bgMusic.volume = volume;
                } else {
                    clearInterval(fadeOut);
                }
            }, 50);
        }
    });

    // Optional: keep UI honest if playback ends/errors
    bgMusic.addEventListener('pause', () => setPlayingUI(false));
    bgMusic.addEventListener('play', () => setPlayingUI(true));
    bgMusic.addEventListener('ended', () => setPlayingUI(false));
    bgMusic.addEventListener('error', () => setPlayingUI(false));
})();
