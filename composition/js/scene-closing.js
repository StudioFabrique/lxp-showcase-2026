/* S5 Clôture : « L'interface au fil des mois ». Une PAUSE par capture (date, fonctionnalités marquantes),
   puis une dernière PAUSE : la frise monte au centre, se prolonge d'une flèche (« le projet continue
   d'évoluer ») et le bandeau d'identité revient avec le lien vers la démonstration.
   Tout le contenu vient de content/scenes/closing.json : captures (chemin d'image), dates, fonctionnalités.
   Les captures manquantes affichent un texte de repli au lieu d'une image cassée. */
(function () {
  var Deck = (window.Deck = window.Deck || { scenes: {} });
  var P = 1800;

  Deck.scenes.closing = function (tl, el) {
    var S = Deck.Stage;
    var fx = Deck.fx;
    var q = function (s) {
      return "#scene-closing " + s;
    };
    var reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var shots = gsap.utils.toArray(q(".cl-shot"));
    var cards = gsap.utils.toArray(q(".cl-card"));
    var dots = gsap.utils.toArray(q(".cl-dot"));
    var N = cards.length;
    var CMP = 7.3; // durée du dernier écran (comparatif de la connexion) : quatre photos Unsplash se succèdent
    var T = function (k) {
      // instant d'entrée de la capture k ; k = N : dernier plan
      return k < N ? 1.0 + k * 2.4 : 1.0 + (N - 1) * 2.4 + CMP;
    };
    var RAIL_W = 1480; // longueur de la frise entre la première et la dernière capture
    var dotX = function (k) {
      return N > 1 ? (k * RAIL_W) / (N - 1) : 0;
    };
    var C = {
      line:
        getComputedStyle(document.documentElement)
          .getPropertyValue("--color-base-300")
          .trim() || "#bae6fd",
      base:
        getComputedStyle(document.documentElement)
          .getPropertyValue("--color-base-100")
          .trim() || "#ffffff",
      pri:
        getComputedStyle(document.documentElement)
          .getPropertyValue("--color-primary")
          .trim() || "#0369a1",
    };

    // Mise en place : positions des repères, date de chaque capture sous la frise, captures manquantes.
    dots.forEach(function (d, i) {
      d.style.left = dotX(i) + "px";
      d.querySelector(".cl-yr").textContent = (
        cards[i].querySelector(".cl-date").textContent || ""
      ).trim();
    });
    shots.forEach(function (sh) {
      var img = sh.querySelector("img");
      var miss = function () {
        sh.classList.add("none");
      };
      img.addEventListener("error", miss);
      if (img.complete && !img.naturalWidth && img.getAttribute("src")) miss();
    });

    S.set(tl, "hidden", 0);
    tl.set(q(".cam"), { pointerEvents: "auto" }, 0);

    // Entrée.
    fx.ft(
      tl,
      q(".cl-title"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      0.1,
    );
    fx.ft(
      tl,
      q(".cl-browser"),
      {
        opacity: 0,
        y: 70,
        rotationX: -14,
        transformPerspective: P,
        transformOrigin: "50% 100%",
      },
      { opacity: 1, y: 0, rotationX: 0, duration: 0.9, ease: "power3.out" },
      0.3,
    );
    fx.ft(
      tl,
      q(".cl-line"),
      { scaleX: 0, transformOrigin: "0 50%" },
      { scaleX: 1, duration: 0.9, ease: "power2.inOut" },
      0.5,
    );
    fx.ft(
      tl,
      dots,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(2)",
        stagger: 0.04,
      },
      0.7,
    );
    fx.ft(
      tl,
      q(".chevron.mini"),
      { opacity: 0, x: -16 },
      { opacity: 1, x: 0, duration: 0.4 },
      1.2,
    );
    tl.set(q(".chevron.mini"), { pointerEvents: "auto" }, 1.2);

    // Une capture à la fois : fondu enchaîné, fiche de date, repère actif sur la frise.
    for (var k = 0; k < N; k++) {
      var t = T(k);
      var out = T(k + 1);
      var feats = cards[k].querySelectorAll("li");
      fx.ft(
        tl,
        shots[k],
        { opacity: 0, scale: 1.035 },
        { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" },
        t,
      );
      fx.ft(tl, shots[k], { opacity: 1 }, { opacity: 0, duration: 0.7 }, out);
      fx.ft(
        tl,
        cards[k],
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
        t + 0.15,
      );
      fx.ft(tl, cards[k], { opacity: 1 }, { opacity: 0, duration: 0.5 }, out);
      fx.ft(
        tl,
        cards[k].querySelectorAll(".cl-name, li"),
        { y: 24 },
        { y: 0, duration: 0.5, ease: "power2.out", stagger: 0.12 },
        t + 0.3,
      );
      fx.ft(
        tl,
        dots[k].querySelector("i"),
        { scale: 1, backgroundColor: C.base, borderColor: C.line },
        {
          scale: 1.3,
          backgroundColor: C.pri,
          borderColor: C.pri,
          duration: 0.4,
          ease: "back.out(2)",
        },
        t,
      );
      fx.ft(
        tl,
        dots[k].querySelector("i"),
        { scale: 1.3 },
        { scale: 1, duration: 0.3 },
        out,
      );
      fx.ft(
        tl,
        q(".cl-done"),
        { width: dotX(k > 0 ? k - 1 : 0) },
        { width: dotX(k), duration: 0.8, ease: "power2.inOut" },
        t,
      );
      if (k === N - 1) compare(t);
      tl.addLabel("step" + k, t + (k === N - 1 ? CMP - 0.8 : 1.5));
      void feats;
    }

    // Dernier écran : la connexion de 2023 (visuel fixe) face à celle de 2026, dont le fond change de photo Unsplash.
    // La bande du bas montre d'où vient l'image : la recherche, les photos proposées, celle qui est affichée.
    function compare(t) {
      var now = gsap.utils.toArray(q(".cmp-now-img"));
      var thumbs = gsap.utils.toArray(q(".cmp-ph"));
      var off = { opacity: 0.45, scale: 0.94, borderColor: C.line };
      var on = { opacity: 1, scale: 1, borderColor: C.pri };
      fx.ft(
        tl,
        q(".cmp-then"),
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" },
        t + 0.3,
      );
      fx.ft(
        tl,
        q(".cmp-arrow"),
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
        t + 0.7,
      );
      fx.ft(
        tl,
        q(".cmp-now"),
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" },
        t + 0.8,
      );
      fx.ft(
        tl,
        q(".cmp-badge"),
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" },
        t + 1.3,
      );
      fx.ft(
        tl,
        q(".cmp-query"),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        t + 0.9,
      );
      fx.ft(tl, thumbs[0], off, on, t + 1.1); // première photo : active dès l'entrée
      for (var j = 1; j < now.length; j++) {
        var tj = t + 1.7 + (j - 1) * 1.7;
        fx.ft(
          tl,
          now[j],
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power1.inOut" },
          tj,
        );
        fx.ft(tl, thumbs[j - 1], on, off, tj);
        fx.ft(tl, thumbs[j], off, on, tj);
      }
    }

    // Dernier plan : la frise monte au centre et se prolonge ; le bandeau d'identité revient.
    var tf = T(N);
    fx.ft(
      tl,
      q(".cl-title, .cl-browser"),
      { opacity: 1, y: 0 },
      { opacity: 0, y: -50, duration: 0.7, ease: "power2.in" },
      tf,
    );
    fx.ft(
      tl,
      q(".chevron.mini"),
      { opacity: 1 },
      { opacity: 0, duration: 0.3 },
      tf,
    );
    tl.set(q(".chevron.mini"), { pointerEvents: "none" }, tf);
    fx.ft(
      tl,
      q(".cl-rail"),
      { y: 0 },
      { y: -380, duration: 1.0, ease: "power3.inOut" },
      tf + 0.2,
    );
    fx.ft(
      tl,
      q(".cl-ext"),
      { opacity: 0, scaleX: 0 },
      { opacity: 1, scaleX: 1, duration: 1.0, ease: "power2.out" },
      tf + 1.1,
    );
    Deck.Stage.fromTo(
      tl,
      "hidden",
      "dock",
      tf + 0.4,
      1.0,
      "power3.inOut",
      0.05,
    );
    // Partenaires et années : l'apparition est déclarée ici (leurs états dépendent sinon de l'introduction).
    fx.ft(
      tl,
      "#partners > *",
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.15 },
      tf + 1.2,
    );
    fx.ft(
      tl,
      "#years .year i, #year-dash i",
      { yPercent: 120 },
      { yPercent: 0, duration: 0.7, ease: "power4.out", stagger: 0.05 },
      tf + 1.2,
    );
    fx.ft(
      tl,
      q(".cl-msg"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      tf + 1.4,
    );
    fx.ft(
      tl,
      q(".cl-demo"),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      tf + 1.9,
    );
    tl.set(q(".cl-demo"), { pointerEvents: "auto" }, tf + 1.9);
    tl.addLabel("step" + N, tf + 3.0);

    // Interactions : le survol d'un repère le met en relief.
    dots.forEach(function (d) {
      d.addEventListener("mouseenter", function () {
        if (!reduced)
          gsap.to(d, { scale: 1.25, duration: 0.25, overwrite: "auto" });
      });
      d.addEventListener("mouseleave", function () {
        gsap.to(d, { scale: 1, duration: 0.3, overwrite: "auto" });
      });
    });
  };
})();
