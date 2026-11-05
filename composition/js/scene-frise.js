/* S3 Frise du projet. Étapes :
   0 la ligne « Projet LXP » entre les deux années (cliquable)
   1 la ligne s'étend de juin 2022 à novembre 2026, puis retour (rewind) sur la première étape
   2 à 8 la caméra passe d'une étape à la suivante (clic sur une carte voisine = y aller ;
         clic sur la carte active = ouvrir sa scène). */
(function () {
  var Deck = (window.Deck = window.Deck || { scenes: {} });
  var P = 2400;
  var X0 = 640; // juin 2022 (coordonnée du monde)
  var L = 5830; // jusqu'à novembre 2026
  var XS = [1500, 3300, 3780, 4260, 4740, 5220, 5700, 6180]; // abscisse de chaque étape
  var PAN = 6.6; // durée de l'extension (lente : on laisse lire les étapes)
  var T1 = 2.6; // début de l'extension
  var EASE = "power2.inOut";
  // Inclinaison de la caméra : positive quand la frise défile vers l'avant (vers 2026), négative au retour
  // (vers 2022). Le sens choisi présente les cartes de face plutôt que de biais.
  var TILT_FWD = 8;
  var TILT_STEP = 4;
  var TILT_BACK = -9;
  // La caméra suit le bout de la ligne en le gardant à environ 1250 px du bord gauche de l'écran : les cartes
  // arrivent par la droite, se posent, puis défilent vers la gauche à la vitesse de la caméra.
  var FRONT = 1250;
  var END_X = X0 + L; // bout de la ligne (novembre 2026)
  var cam = function (k) {
    return XS[k - 1] - 960;
  };

  // Instant (dans l'extension) où le bout de la ligne atteint l'abscisse xw, en inversant l'easing.
  function arrival(xw) {
    var ease = gsap.parseEase(EASE);
    var target = (xw - X0) / L;
    var lo = 0;
    var hi = 1;
    for (var n = 0; n < 24; n++) {
      var mid = (lo + hi) / 2;
      if (ease(mid) < target) lo = mid;
      else hi = mid;
    }
    return T1 + PAN * hi;
  }

  Deck.scenes.frise = function (tl, el) {
    var S = Deck.Stage;
    var fx = Deck.fx;
    var q = function (s) {
      return "#scene-frise " + s;
    };
    var cards = gsap.utils.toArray(q(".sc"));
    var dots = gsap.utils.toArray(q(".dot"));
    var stems = gsap.utils.toArray(q(".stem"));
    var chevron = function (inAt, outAt) {
      fx.ft(
        tl,
        q(".chevron.mini"),
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.4 },
        inAt,
      );
      tl.set(q(".chevron.mini"), { pointerEvents: "auto" }, inAt);
      if (outAt !== undefined) {
        fx.ft(
          tl,
          q(".chevron.mini"),
          { opacity: 1 },
          { opacity: 0, duration: 0.2 },
          outAt,
        );
        tl.set(q(".chevron.mini"), { pointerEvents: "none" }, outAt);
      }
    };
    S.set(tl, "split", 0);
    // Les années du monde prennent la place des années du calque persistant (même position à l'écran).
    gsap.set(q("#w2022"), { x: 82, y: 445, scale: 1.15, opacity: 0 });
    gsap.set(q("#w2026"), { x: 6548, y: 445, scale: 1.15, opacity: 0 });

    // ── Étape 0 : la ligne « Projet LXP » ───────────────────────────────────────────────
    fx.ft(
      tl,
      q(".line"),
      { scaleX: 0 },
      { scaleX: ((960 - X0) * 2) / L, duration: 1.0, ease: "power3.out" },
      0.3,
    );
    // Flèche au bout de la ligne : elle accompagne le trait (même courbe) et indique qu'il se prolonge.
    var A0 = (960 - X0) * 2 - 22; // abscisse de la flèche quand la ligne atteint 1280
    fx.ft(
      tl,
      q(".line-arrow"),
      { opacity: 0, x: 0 },
      { opacity: 1, x: A0, duration: 1.0, ease: "power3.out" },
      0.3,
    );
    fx.ft(
      tl,
      q(".proj"),
      { opacity: 0, y: 30, rotationX: -40, transformPerspective: P },
      { opacity: 1, y: 0, rotationX: 0, duration: 0.9, ease: "back.out(1.6)" },
      0.9,
    );
    tl.set(q(".proj"), { pointerEvents: "auto" }, 1.2);
    chevron(1.9, 2.5);
    tl.addLabel("step0", 2.2);

    // ── Étape 1 : la frise s'étend, puis rembobine sur la première étape ──────────────────
    fx.ft(
      tl,
      q(".proj"),
      { opacity: 1, y: 0 },
      { opacity: 0, y: -60, duration: 0.5, ease: "power2.in" },
      T1,
    );
    tl.set(q(".proj"), { pointerEvents: "none" }, T1);
    // Les années du calque passent au monde : l'année 2022 reste au début de la ligne, 2026 arrive au bout.
    fx.ft(
      tl,
      "#year-a",
      { opacity: 1 },
      { opacity: 0, duration: 0.01 },
      T1 + 0.1,
    );
    fx.ft(
      tl,
      "#year-b",
      { opacity: 1 },
      { opacity: 0, duration: 0.4 },
      T1 + 0.1,
    );
    fx.ft(
      tl,
      q("#w2022"),
      { opacity: 0 },
      { opacity: 1, duration: 0.01 },
      T1 + 0.1,
    );
    fx.ft(
      tl,
      q("#w2022"),
      { opacity: 1 },
      { opacity: 0, duration: 0.5 },
      T1 + 1.2,
    ); // sort de l'écran avec la caméra
    fx.ft(
      tl,
      q("#w2026"),
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      T1 + PAN - 1.0,
    );
    fx.ft(
      tl,
      q(".line"),
      { scaleX: ((960 - X0) * 2) / L },
      { scaleX: 1, duration: PAN, ease: EASE },
      T1,
    );
    fx.ft(
      tl,
      q(".line-arrow"),
      { x: A0 },
      { x: L - 22, duration: PAN, ease: EASE },
      T1,
    );

    // Caméra : immobile tant que la ligne n'a pas atteint FRONT, puis elle suit le bout de la ligne.
    var E = gsap.parseEase(EASE);
    var e0 = (FRONT - X0) / L;
    var follow = function (p) {
      return Math.max(0, E(p) - e0) / (1 - e0);
    };
    fx.ft(
      tl,
      q(".world"),
      { x: 0 },
      { x: -(END_X - FRONT), duration: PAN, ease: follow },
      T1,
    );
    // L'axe de la caméra s'incline pendant le déplacement (profondeur), puis se redresse.
    fx.ft(
      tl,
      q(".tiltwrap"),
      { rotationY: 0 },
      { rotationY: TILT_FWD, duration: 1.4, ease: "power2.out" },
      T1 + 0.1,
    );
    fx.ft(
      tl,
      q(".tiltwrap"),
      { rotationY: TILT_FWD },
      { rotationY: 0, duration: 1.2, ease: "power2.inOut" },
      T1 + PAN - 1.0,
    );
    fx.ft(
      tl,
      q(".tick"),
      { opacity: 0 },
      { opacity: 1, duration: 0.5, stagger: 0.2 },
      T1 + 0.4,
    );
    // Les deux phases : deux bandes séparées par un jour (février 2024), qui apparaissent avec la caméra.
    fx.ft(
      tl,
      q(".pband.p1"),
      { opacity: 0, scaleY: 0.92, y: 24 },
      { opacity: 1, scaleY: 1, y: 0, duration: 0.8, ease: "power3.out" },
      T1 + 0.3,
    );
    fx.ft(
      tl,
      q(".pband.p2"),
      { opacity: 0, scaleY: 0.92, y: 24 },
      { opacity: 1, scaleY: 1, y: 0, duration: 0.8, ease: "power3.out" },
      arrival(2856) - 0.4,
    );
    fx.ft(
      tl,
      q(".endcap"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.6)" },
      T1 + PAN - 0.6,
    );
    // Chaque étape apparaît quand le bout de la ligne l'atteint.
    cards.forEach(function (card, i) {
      var at = arrival(XS[i]); // le point apparaît exactement quand le bout de la ligne l'atteint
      var up = card.classList.contains("up");
      fx.ft(
        tl,
        dots[i],
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" },
        at,
      );
      fx.ft(
        tl,
        stems[i],
        { opacity: 0, scaleY: 0, transformOrigin: up ? "50% 100%" : "50% 0%" },
        { opacity: 1, scaleY: 1, duration: 0.4 },
        at + 0.1,
      );
      fx.ft(
        tl,
        card,
        { opacity: 0, scale: 1.3, y: up ? -50 : 50, rotation: up ? -6 : 6 },
        {
          opacity: 0.55,
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 1.0,
          ease: "back.out(1.4)",
        },
        at + 0.15,
      );
      tl.set(card, { pointerEvents: "auto" }, at + 0.4);
    });
    // Rewind : retour en arrière jusqu'à la première étape (le prototype).
    var R = T1 + PAN + 0.5;
    // Rewind : retour en arrière jusqu'à la première étape (le prototype).
    fx.ft(
      tl,
      q(".world"),
      { x: -(END_X - FRONT) },
      { x: -cam(1), duration: 3.2, ease: "power3.inOut" },
      R,
    );
    fx.ft(
      tl,
      q(".tiltwrap"),
      { rotationY: 0 },
      { rotationY: TILT_BACK, duration: 1.6, ease: "power2.out" },
      R,
    );
    fx.ft(
      tl,
      q(".tiltwrap"),
      { rotationY: TILT_BACK },
      { rotationY: 0, duration: 1.6, ease: "power2.inOut" },
      R + 1.6,
    );
    var focus = function (k, at) {
      var card = cards[k - 1];
      fx.ft(
        tl,
        card,
        { opacity: 0.55, scale: 1 },
        { opacity: 1, scale: 1.12, duration: 0.6, ease: "back.out(1.6)" },
        at,
      );
      fx.ft(
        tl,
        card.querySelector(".open"),
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        at + 0.2,
      );
    };
    var blur = function (k, at) {
      var card = cards[k - 1];
      fx.ft(
        tl,
        card,
        { opacity: 1, scale: 1.12 },
        { opacity: 0.55, scale: 1, duration: 0.5 },
        at,
      );
      fx.ft(
        tl,
        card.querySelector(".open"),
        { opacity: 1 },
        { opacity: 0, duration: 0.3 },
        at,
      );
    };
    focus(1, R + 2.4);
    chevron(R + 3.2, R + 3.9);
    tl.addLabel("step1", R + 3.5);

    // ── Étapes 2 à 8 : la caméra passe d'une étape à la suivante ───────────────────────────
    var T = R + 3.9;
    for (var k = 2; k <= 8; k++) {
      (function (k) {
        var at = T + (k - 2) * 2.4;
        fx.ft(
          tl,
          q(".world"),
          { x: -cam(k - 1) },
          { x: -cam(k), duration: 1.6, ease: "power3.inOut" },
          at,
        );
        fx.ft(
          tl,
          q(".tiltwrap"),
          { rotationY: 0 },
          { rotationY: TILT_STEP, duration: 0.8, ease: "power2.out" },
          at,
        );
        fx.ft(
          tl,
          q(".tiltwrap"),
          { rotationY: TILT_STEP },
          { rotationY: 0, duration: 0.8, ease: "power2.inOut" },
          at + 0.8,
        );
        blur(k - 1, at);
        focus(k, at + 0.9);
        chevron(at + 1.6, at + 2.4);
        tl.addLabel("step" + k, at + 1.7);
      })(k);
    }

    // ── Interactions (hors timeline) ──────────────────────────────────────────────────
    var reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var proj = q(".proj");
    var projEl = document.querySelector(proj);
    // Survol : le bouton se soulève et son ombre s'approfondit (une seule ombre, sans halo).
    var hex = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-primary")
      .trim()
      .replace("#", "");
    var rgb = [0, 2, 4]
      .map(function (i) {
        return parseInt(hex.substr(i, 2), 16);
      })
      .join(", ");
    var SHADOW_REST =
      "rgba(" +
      rgb +
      ", 0.25) 0px 2px 4px 0px, rgba(" +
      rgb +
      ", 0.4) 0px 16px 36px -6px";
    var SHADOW_HOT =
      "rgba(" +
      rgb +
      ", 0.3) 0px 4px 8px 0px, rgba(" +
      rgb +
      ", 0.5) 0px 26px 44px -8px";
    gsap.set(projEl, { boxShadow: SHADOW_REST });
    projEl.addEventListener("mouseenter", function () {
      if (reduced) return;
      gsap.to(projEl, {
        scale: 1.05,
        boxShadow: SHADOW_HOT,
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
    });
    projEl.addEventListener("mouseleave", function () {
      gsap.to(projEl, {
        scale: 1,
        boxShadow: SHADOW_REST,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
    projEl.addEventListener("mousedown", function () {
      gsap.to(projEl, { scale: 0.97, duration: 0.12, overwrite: "auto" });
    });

    var scene = Deck.list.filter(function (s) {
      return s.id === "frise";
    });
    cards.forEach(function (card) {
      var k = +card.getAttribute("data-k");
      var inner = card.querySelector(".sc-in");
      card.addEventListener("mouseenter", function () {
        if (!reduced)
          gsap.to(inner, {
            y: -10,
            scale: 1.03,
            duration: 0.4,
            ease: "back.out(2)",
            overwrite: "auto",
          });
      });
      card.addEventListener("mouseleave", function () {
        gsap.to(inner, {
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: "power3.out",
          overwrite: "auto",
        });
      });
      card.addEventListener("click", function () {
        var s =
          scene[0] ||
          Deck.list.filter(function (x) {
            return x.id === "frise";
          })[0];
        if (!s || s.step < 1) return;
        var msg =
          s.step === k
            ? {
                source: "lxp-deck",
                type: "branch",
                id: card.getAttribute("data-branch"),
              }
            : { source: "lxp-deck", type: "goto", scene: "frise", fragment: k };
        try {
          parent.postMessage(msg, "*");
        } catch (e) {
          /* hors iframe */
        }
      });
    });
  };
})();
