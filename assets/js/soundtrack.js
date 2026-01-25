/* =========================
   Background Music Player
   ========================= */
(() => {
    const MUSIC_ENABLED_KEY = 'scarver2:music';
    const bgMusic = document.getElementById('bgMusic');
    const musicPlayer = document.getElementById('musicPlayer');
    const musicToggle = document.getElementById('musicToggle');

    if (!bgMusic || !musicPlayer || !musicToggle) return;

    // Set volume
    bgMusic.volume = 0.15;

    // Check saved preference - DEFAULT TO ON
    let savedPref = localStorage.getItem(MUSIC_ENABLED_KEY);
    let musicEnabled = savedPref === null ? true : savedPref === 'true';

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        musicEnabled = false;
    }

    // Track if autoplay worked
    let autoplayBlocked = false;

    // Try to play on load
    if (musicEnabled) {
        musicPlayer.classList.add('playing');

        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    // Success! Music is playing
                    console.log('Music autoplay successful');
                })
                .catch(() => {
                    // Autoplay blocked - show prompt
                    autoplayBlocked = true;
                    musicPlayer.classList.remove('playing');
                    showNotification('CLICK 🔊 TO START MUSIC');
                });
        }
    }

    // Toggle music
    musicToggle.addEventListener('click', () => {
        musicEnabled = !musicEnabled;
        localStorage.setItem(MUSIC_ENABLED_KEY, musicEnabled.toString());

        if (musicEnabled) {
            musicPlayer.classList.add('playing');
            bgMusic.play()
                .then(() => {
                    showNotification('SOUNDTRACK ON');
                    autoplayBlocked = false;
                })
                .catch(err => {
                    console.error('Play failed:', err);
                    showNotification('PLAYBACK ERROR');
                });
        } else {
            musicPlayer.classList.remove('playing');
            bgMusic.pause();
            showNotification('SOUNDTRACK OFF');
        }
    });

    // Show notification
    function showNotification(message) {
        const existing = document.querySelector('.music-notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = 'music-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Fade out music when leaving page
    window.addEventListener('beforeunload', () => {
        if (bgMusic && !bgMusic.paused) {
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
})();