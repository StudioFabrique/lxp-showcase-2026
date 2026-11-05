/* S2 Caractéristiques : neuf tuiles interactives (survol : relief, inclinaison, lueur qui suit le
   curseur ; clic : la tuile se retourne). Étape 1 : transition de sortie (le logo se désassemble,
   les partenaires s'effacent, les années s'écartent de chaque côté). */
(function () {
  var Deck = (window.Deck = window.Deck || { scenes: {} });
  var P = 1800;

  Deck.scenes.traits = function (tl, el) {
    var S = Deck.Stage;
    var fx = Deck.fx;
    var q = function (s) {
      return "#scene-traits " + s;
    };
    var tiles = gsap.utils.toArray(q(".tile"));
    S.set(tl, "dock", 0);

    // ── Étape 0 : les tuiles se posent ───────────────────────────────────────────────────
    fx.ft(
      tl,
      q(".tiles-title"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      0.3,
    );
    fx.ft(
      tl,
      q(".tiles"),
      {
        rotationX: 42,
        y: 120,
        transformPerspective: 2000,
        transformOrigin: "50% 100%",
      },
      { rotationX: 0, y: 0, duration: 2.0, ease: "power3.out" },
      0.4,
    );
    fx.drop(tl, tiles, 0.5, { z0: 520, turn: 14, stagger: 0.1, dur: 0.85 });
    fx.ft(
      tl,
      q(".chevron.mini"),
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4 },
      2.5,
    );
    tl.set(q(".chevron.mini"), { pointerEvents: "auto" }, 2.5);
    tl.addLabel("step0", 2.8);

    // ── Étape 1 : transition de sortie ───────────────────────────────────────────────────
    fx.ft(
      tl,
      q(".chevron.mini"),
      { opacity: 1 },
      { opacity: 0, duration: 0.2 },
      3.0,
    );
    tl.set(q(".chevron.mini"), { pointerEvents: "none" }, 3.0);
    fx.ft(
      tl,
      q(".tiles-title"),
      { opacity: 1, y: 0 },
      { opacity: 0, y: -50, duration: 0.5, ease: "power2.in" },
      3.1,
    );
    tiles
      .slice()
      .reverse()
      .forEach(function (tile, k) {
        fx.ft(
          tl,
          tile,
          { opacity: 1, y: 0, z: 0 },
          { opacity: 0, y: -110, z: 280, duration: 0.55, ease: "power2.in" },
          3.2 + k * 0.07,
        );
      });
    // Le logo se désassemble : on repasse sur le masque de cases, qui s'efface dans l'ordre inverse.
    fx.ft(
      tl,
      "#logo .brand-svg:not(.logo-settled)",
      { opacity: 0 },
      { opacity: 1, duration: 0.01 },
      4.0,
    );
    fx.ft(
      tl,
      "#logo .logo-settled",
      { opacity: 1 },
      { opacity: 0, duration: 0.01 },
      4.0,
    );
    var pixels = gsap.utils.toArray("#logo .logo-pixel");
    pixels.forEach(function (pixel, i) {
      fx.ft(
        tl,
        pixel,
        { opacity: 1, y: 0 },
        { opacity: 0, y: (i % 5) * 2 + 4, duration: 0.5, ease: "power2.in" },
        4.05 + ((pixels.length - 1 - i) % 32) * 0.03,
      );
    });
    fx.ft(tl, "#logo", { opacity: 1 }, { opacity: 0, duration: 0.01 }, 5.5);
    // Partenaires effacés, puis les années vont de chaque côté de l'écran, sans toucher les bords.
    S.fromTo(tl, "dock", "split", 4.6, 1.5, "power3.inOut", 0, [
      "partners",
      "cofin",
      "ya",
      "yd",
      "yb",
    ]);
    // Pas d'écran d'attente avec les deux années seules : la frise enchaîne dès la fin de la transition.
    // (Les rappels ne se déclenchent qu'à la lecture, pas lors d'un retour arrière ou d'un seek.)
    tl.call(
      function () {
        var cur = Deck.cur && Deck.cur();
        if (cur && cur.id === "traits" && cur.step === 1) Deck.nav("next");
      },
      null,
      6.3,
    );
    tl.addLabel("step1", 6.4);

    // ── Interactions des tuiles (hors timeline) ─────────────────────────────────────────
    var reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    tiles.forEach(function (tile) {
      var inner = tile.querySelector(".tile-in");
      var glow = tile.querySelector(".glow");
      var flipped = false;
      gsap.set(tile.querySelector(".b"), { rotationY: 180 });
      tile.addEventListener("mousemove", function (e) {
        if (reduced) return;
        var r = tile.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        glow.style.setProperty("--mx", (px + 0.5) * 100 + "%");
        glow.style.setProperty("--my", (py + 0.5) * 100 + "%");
        gsap.to(tile, {
          rotationY: px * 16,
          rotationX: -py * 14,
          transformPerspective: P,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
      tile.addEventListener("mouseenter", function () {
        if (reduced) return;
        gsap.to(tile, {
          z: 50,
          scale: 1.04,
          duration: 0.45,
          ease: "back.out(2)",
          overwrite: "auto",
        });
        gsap.to(glow, { opacity: flipped ? 0 : 1, duration: 0.3 });
      });
      tile.addEventListener("mouseleave", function () {
        gsap.to(tile, {
          z: 0,
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          duration: 0.55,
          ease: "power3.out",
          overwrite: "auto",
        });
        gsap.to(glow, { opacity: 0, duration: 0.3 });
      });
      tile.addEventListener("click", function () {
        flipped = !flipped;
        gsap.to(inner, {
          rotationY: flipped ? 180 : 0,
          duration: reduced ? 0 : 0.8,
          ease: "power3.inOut",
          overwrite: "auto",
        });
        gsap.to(glow, { opacity: 0, duration: 0.2 });
      });
      el.addEventListener("scene:leave", function () {
        flipped = false;
        gsap.set(inner, { rotationY: 0 });
        gsap.set(tile, { z: 0, scale: 1, rotationX: 0, rotationY: 0 });
      });
    });
  };
})();
