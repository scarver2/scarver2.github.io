/*
  Tiny SFX player (layer-friendly).

  - Clones Audio nodes so overlapping plays don't cut off each other
  - Keeps it dead-simple for maintainability
*/
(function () {
  "use strict";

  function clamp01(n) { return Math.max(0, Math.min(1, n)); }

  window.playSfx = (name, { volume = 1.0 } = {}) => {
    const src = window.SC_SFX?.[name];
    if (!src) return false;

    try {
      const a = new Audio(src);
      a.preload = "auto";
      a.volume = clamp01(volume);
      a.play().catch(() => {});
      return true;
    } catch (_) {
      return false;
    }
  };
})();
