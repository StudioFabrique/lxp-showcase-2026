/* Scène détaillée « Un prototype pour valider l'idée » (jalon 1, phase 1). Trois PAUSES :
   0 de l'étude au prototype (trois cartes qui se retournent)
   1 architecture en couches (pile de plaques, survol = détail)
   2 faisabilité validée, et la suite : la phase 2. */
(function () {
  var Deck = (window.Deck = window.Deck || { scenes: {} });
  var P = 1800;

  Deck.scenes.proto = function (tl, el) {
    var S = Deck.Stage;
    var fx = Deck.fx;
    var q = function (s) {
      return "#scene-proto " + s;
    };
    var rise = function (target, at, dur) {
      fx.ft(tl, target, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: dur || 0.7, ease: "power3.out" }, at);
    };
    var cards = gsap.utils.toArray(q(".pcard"));
    var plates = gsap.utils.toArray(q(".slab.pl"));
    S.set(tl, "hidden", 0);
    tl.set(q(".pa"), { pointerEvents: "auto" }, 0);
    fx.ft(tl, q(".bar"), { opacity: 0, y: -24 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0);

    // ── Étape 0 : de l'étude au prototype ────────────────────────────────────────────────
    rise(q(".pa .badge"), 0.3);
    fx.ft(
      tl,
      q(".pa .h1"),
      { opacity: 0, y: 60, rotationX: -24, transformPerspective: P, transformOrigin: "50% 100%" },
      { opacity: 1, y: 0, rotationX: 0, duration: 0.9, ease: "power3.out" },
      0.5,
    );
    rise(q(".pa .lede"), 1.0);
    // Le fil de la phase 1 se trace (juin 2022 → février 2024) et marque chaque étape quand sa carte se pose.
    fx.ft(tl, q(".pline"), { scaleX: 0 }, { scaleX: 1, duration: 2.0, ease: "power2.inOut" }, 1.1);
    fx.ft(tl, q(".prail .pl"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 1.6 }, 1.2);
    fx.ft(tl, q(".pdot"), { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(2.2)", stagger: 0.28 }, 1.4);
    fx.ft(tl, q(".parr"), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, 2.8);
    fx.drop(tl, cards, 1.5, { z0: 420, turn: 10, stagger: 0.28, dur: 0.85 });
    fx.ft(tl, q(".chevron.mini"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, 4.3);
    tl.set(q(".chevron.mini"), { pointerEvents: "auto" }, 4.3);
    tl.addLabel("step0", 4.6);

    // ── Étape 1 : architecture en couches ────────────────────────────────────────────────
    fx.ft(tl, q(".chevron.mini"), { opacity: 1 }, { opacity: 0, duration: 0.2 }, 4.8);
    tl.set(q(".chevron.mini"), { pointerEvents: "none" }, 4.8);
    tl.set(q(".pa"), { pointerEvents: "none" }, 4.8);
    fx.ft(tl, q(".prail"), { opacity: 1, y: 0 }, { opacity: 0, y: -50, duration: 0.6, ease: "power2.in" }, 4.8);
    fx.ft(
      tl,
      q(".pa-text"),
      { opacity: 1, x: 0, rotationY: 0, transformPerspective: P },
      { opacity: 0, x: -180, rotationY: 38, duration: 0.7, ease: "power2.in" },
      4.8,
    );
    cards
      .slice()
      .reverse()
      .forEach(function (card, k) {
        fx.ft(tl, card, { opacity: 1, y: 0, z: 0 }, { opacity: 0, y: -100, z: 240, duration: 0.55, ease: "power2.in" }, 4.9 + k * 0.1);
      });
    fx.ft(tl, q(".pb"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 5.7);
    tl.set(q(".pb"), { pointerEvents: "auto" }, 5.7);
    fx.ft(
      tl,
      q(".pb .h1"),
      { opacity: 0, y: 60, rotationX: -24, transformPerspective: P, transformOrigin: "50% 100%" },
      { opacity: 1, y: 0, rotationX: 0, duration: 0.9, ease: "power3.out" },
      6.0,
    );
    fx.ft(
      tl,
      q(".stack5"),
      { rotationX: 70, rotation: -40, scale: 0.62, x: -60, y: 40, transformPerspective: P },
      { rotationX: 54, rotation: -12, scale: 0.72, x: -110, y: 30, duration: 1.6, ease: "power3.out" },
      5.9,
    );
    fx.ft(
      tl,
      q(".stack5"),
      { rotationX: 54, rotation: -12, scale: 0.72, x: -110, y: 30 },
      { rotationX: 36, rotation: -6, scale: 0.84, x: -60, y: 0, duration: 1.4, ease: "sine.inOut" },
      7.4,
    );
    fx.drop(tl, plates, 6.1, { z0: 520, dz: 70, turn: 24, stagger: 0.24 });
    rise(q(".pdetail"), 7.4, 0.7);
    fx.ft(tl, q(".chevron.mini"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, 8.6);
    tl.set(q(".chevron.mini"), { pointerEvents: "auto" }, 8.6);
    tl.addLabel("step1", 8.9);

    // ── Étape 2 : faisabilité validée, et la suite ───────────────────────────────────────
    fx.ft(tl, q(".chevron.mini"), { opacity: 1 }, { opacity: 0, duration: 0.2 }, 9.1);
    tl.set(q(".chevron.mini"), { pointerEvents: "none" }, 9.1);
    tl.set(q(".pb"), { pointerEvents: "none" }, 9.1);
    fx.ft(
      tl,
      q(".pb-text"),
      { opacity: 1, x: 0, rotationY: 0, transformPerspective: P },
      { opacity: 0, x: -180, rotationY: 38, duration: 0.7, ease: "power2.in" },
      9.1,
    );
    plates
      .slice()
      .reverse()
      .forEach(function (plate, k) {
        var i = 4 - k;
        fx.ft(tl, plate, { opacity: 1, y: 0, z: i * 70 }, { opacity: 0, y: -140, z: i * 70 + 240, duration: 0.55, ease: "power2.in" }, 9.2 + k * 0.1);
      });
    fx.ft(tl, q(".pc"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 10.0);
    tl.set(q(".pc"), { pointerEvents: "auto" }, 10.0);
    fx.ft(
      tl,
      q(".bigok"),
      { opacity: 0, scale: 0, rotation: -90 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: "back.out(2)" },
      10.1,
    );
    fx.ft(
      tl,
      q(".pc .h1"),
      { opacity: 0, y: 60, rotationX: -24, transformPerspective: P, transformOrigin: "50% 100%" },
      { opacity: 1, y: 0, rotationX: 0, duration: 0.9, ease: "power3.out" },
      10.5,
    );
    rise(q(".pc .lede"), 11.0);
    // Les trois acquis du prototype, un par étape de la pause 1.
    fx.ft(tl, q(".pc-acq li"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.3 }, 11.4);
    fx.ft(tl, q(".pc-acq .ok"), { scale: 0 }, { scale: 1, duration: 0.5, ease: "back.out(2.4)", stagger: 0.3 }, 11.6);
    // Le fil continue vers la phase 2 : la ligne se trace de la fin de la phase 1 jusqu'à 2024 – 2026.
    fx.ft(tl, q(".pr-dot"), { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2.4)" }, 12.6);
    fx.ft(tl, q(".pr-l"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 12.8);
    fx.ft(tl, q(".pr-line"), { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: "power2.inOut" }, 12.9);
    fx.ft(tl, q(".pr-arr"), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, 14.3);
    fx.ft(tl, q(".pr-r"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 14.4);
    rise(q(".pc-next"), 14.7, 0.7);
    fx.ft(tl, q(".chevron.mini"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, 15.5);
    tl.set(q(".chevron.mini"), { pointerEvents: "auto" }, 15.5);
    tl.addLabel("step2", 15.8);

    // ── Interactions (hors timeline) ──────────────────────────────────────────────────
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var hex = getComputedStyle(document.documentElement).getPropertyValue("--color-primary").trim().replace("#", "");
    var rgb = [0, 2, 4].map(function (i) {
      return parseInt(hex.substr(i, 2), 16);
    }).join(",");
    // Cartes : relief et inclinaison au survol, retournement au clic (détail issu du bilan de la phase 1).
    cards.forEach(function (card) {
      var inner = card.querySelector(".pc-in");
      var flipped = false;
      gsap.set(card.querySelector(".b"), { rotationY: 180 });
      card.addEventListener("mousemove", function (e) {
        if (reduced) return;
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(card, { rotationY: px * 14, rotationX: -py * 12, transformPerspective: P, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      });
      card.addEventListener("mouseenter", function () {
        if (!reduced) gsap.to(card, { z: 40, scale: 1.03, duration: 0.45, ease: "back.out(2)", overwrite: "auto" });
      });
      card.addEventListener("mouseleave", function () {
        gsap.to(card, { z: 0, scale: 1, rotationX: 0, rotationY: 0, duration: 0.55, ease: "power3.out", overwrite: "auto" });
      });
      card.addEventListener("click", function () {
        flipped = !flipped;
        gsap.to(inner, { rotationY: flipped ? 180 : 0, duration: reduced ? 0 : 0.8, ease: "power3.inOut", overwrite: "auto" });
      });
      el.addEventListener("scene:leave", function () {
        flipped = false;
        gsap.set(inner, { rotationY: 0 });
        gsap.set(card, { z: 0, scale: 1, rotationX: 0, rotationY: 0 });
      });
    });
    // Couches : le survol ne change que la bordure (la plaque ne bouge pas, sinon la zone de survol saute) ;
    // le clic sélectionne la couche (plaque soulevée, détail à gauche) et la sélection reste jusqu'à un nouveau clic.
    var DET = (Content.get("proto.architecture.layers") || []).map(function (l) {
      return l.detail;
    });
    var ttl = el.querySelector(".pd-t");
    var txt = el.querySelector(".pd-p");
    var D0 = [ttl.textContent, txt.textContent];
    var names = plates.map(function (p) {
      return p.querySelector("b").textContent;
    });
    var BORDER = "rgba(186,230,253,1)";
    var ON = "rgba(" + rgb + ",1)";
    var selPlate = -1;
    var hoverPlate = -1;
    var renderPlates = function () {
      plates.forEach(function (pl, i) {
        var sel = i === selPlate;
        gsap.to(pl, { y: sel && !reduced ? -22 : 0, duration: 0.4, ease: sel ? "back.out(2)" : "power3.out", overwrite: "auto" });
        gsap.to(pl, { borderColor: sel || i === hoverPlate || i === 4 ? ON : BORDER, duration: 0.3 });
      });
    };
    var show = function (i) {
      gsap.to([ttl, txt], {
        opacity: 0,
        duration: 0.12,
        overwrite: "auto",
        onComplete: function () {
          ttl.textContent = i < 0 ? D0[0] : names[i];
          txt.textContent = i < 0 ? D0[1] : DET[i];
          gsap.to([ttl, txt], { opacity: 1, duration: 0.25 });
        },
      });
    };
    plates.forEach(function (pl, i) {
      pl.addEventListener("mouseenter", function () {
        hoverPlate = i;
        renderPlates();
      });
      pl.addEventListener("mouseleave", function () {
        if (hoverPlate === i) hoverPlate = -1;
        renderPlates();
      });
      pl.addEventListener("click", function () {
        selPlate = selPlate === i ? -1 : i;
        renderPlates();
        show(selPlate);
      });
    });
    el.addEventListener("scene:leave", function () {
      selPlate = -1;
      hoverPlate = -1;
      plates.forEach(function (pl, i) {
        gsap.set(pl, { y: 0, borderColor: i === 4 ? ON : BORDER });
      });
      gsap.killTweensOf([ttl, txt]);
      ttl.textContent = D0[0];
      txt.textContent = D0[1];
      gsap.set([ttl, txt], { opacity: 1 });
    });
  };
})();
