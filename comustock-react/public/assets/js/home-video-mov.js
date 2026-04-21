(function () {
  const v = document.querySelector("video.mob-ok");
  if (!v) return;

  // iOS: asegurate que esté muted como propiedad también
  v.muted = true;
  v.setAttribute("muted", "");
  v.setAttribute("playsinline", "");
  v.playsInline = true;

  const tryPlay = async () => {
    try {
      const p = v.play();
      if (p && typeof p.then === "function") await p;
    } catch (e) {
      // Si el navegador bloquea autoplay, lo reintentamos en el primer gesto del usuario
    }
  };

  // Intento inmediato
  tryPlay();

  // Reintentos en eventos típicos donde el browser “habilita” playback
  ["visibilitychange", "pageshow", "focus"].forEach((evt) => {
    window.addEventListener(
      evt,
      () => {
        if (!document.hidden) tryPlay();
      },
      { passive: true },
    );
  });

  // “Plan B”: primer toque/scroll/click del usuario (una sola vez)
  const unlock = () => {
    tryPlay();
    window.removeEventListener("touchstart", unlock);
    window.removeEventListener("click", unlock);
    window.removeEventListener("scroll", unlock);
  };
  window.addEventListener("touchstart", unlock, {
    passive: true,
    once: true,
  });
  window.addEventListener("click", unlock, { passive: true, once: true });
  window.addEventListener("scroll", unlock, {
    passive: true,
    once: true,
  });
})();
