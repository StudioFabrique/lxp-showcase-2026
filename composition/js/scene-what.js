/* S1 Qu'est-ce que ANDRIA ? Six étapes (une PAUSE chacune, au clic) :
   0 définition (pile de plaques 3D) - 1 à 4 sidebar de verre : Individualiser, Décrochage, Autonomie,
   Les objectifs - 5 LMS ou LXP. */
(function () {
  var Deck = (window.Deck = window.Deck || { scenes: {} });
  var P = 1800;

  Deck.scenes.what = function (tl) {
    var S = Deck.Stage;
    var fx = Deck.fx;
    var q = function (s) {
      return "#scene-what " + s;
    };
    var rise = function (target, at, dur) {
      fx.ft(
        tl,
        target,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: dur || 0.7, ease: "power3.out" },
        at,
      );
    };
    var chevron = function (inAt, outAt) {
      fx.ft(
        tl,
        q(".chevron.mini"),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
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

    // ── Passage S0 → S1 : l'identité pivote et se range en bandeau ─────────────────────────
    S.fromTo(tl, "hero", "dock", 0, 1.5, "power3.inOut");
    fx.ft(
      tl,
      "#logo",
      { rotationY: 0, z: 0, transformPerspective: P },
      { rotationY: -16, z: 140, duration: 0.7, ease: "power2.out" },
      0,
    );
    fx.ft(
      tl,
      "#logo",
      { rotationY: -16, z: 140 },
      { rotationY: 0, z: 0, duration: 0.8, ease: "power2.inOut" },
      0.7,
    );
    fx.ft(
      tl,
      "#intro-chevron",
      { opacity: 1 },
      { opacity: 0, duration: 0.2 },
      0,
    );

    // ── Étape 0 : définition ─────────────────────────────────────────────────────────────
    fx.ft(
      tl,
      q(".wa .h1"),
      {
        opacity: 0,
        y: 60,
        rotationX: -24,
        transformPerspective: P,
        transformOrigin: "50% 100%",
      },
      { opacity: 1, y: 0, rotationX: 0, duration: 0.9, ease: "power3.out" },
      0.8,
    );
    fx.ft(
      tl,
      q(".acro span"),
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.6)",
        stagger: 0.14,
      },
      1.4,
    );
    rise(q(".wa .lede"), 1.9);
    // Pile de plaques : même mise en scène que les niveaux de contenu du LXP.
    fx.ft(
      tl,
      q(".stack"),
      {
        rotationX: 70,
        rotation: -40,
        scale: 0.62,
        x: -60,
        y: 40,
        transformPerspective: P,
      },
      {
        rotationX: 54,
        rotation: -12,
        scale: 0.8,
        x: -80,
        y: 30,
        duration: 1.6,
        ease: "power3.out",
      },
      0.8,
    );
    fx.ft(
      tl,
      q(".stack"),
      { rotationX: 54, rotation: -12, scale: 0.8, x: -80, y: 30 },
      {
        rotationX: 34,
        rotation: -6,
        scale: 0.95,
        x: 0,
        y: 0,
        duration: 1.3,
        ease: "sine.inOut",
      },
      2.0,
    );
    fx.drop(tl, q(".slab"), 1.1, { z0: 520, dz: 60, turn: 24, stagger: 0.22 });
    chevron(3.3, 3.6);
    tl.addLabel("step0", 3.4);

    // ── Étape 1 : sidebar de verre et tableau ────────────────────────────────────────────
    fx.ft(
      tl,
      q(".wa-text"),
      { opacity: 1, x: 0, rotationY: 0, transformPerspective: P },
      { opacity: 0, x: -180, rotationY: 38, duration: 0.7, ease: "power2.in" },
      3.6,
    );
    // La pile s'ouvre en profondeur en tournant, puis chaque plaque quitte la pile à son tour
    // (du dessus vers la base) au lieu de s'aplatir d'un bloc.
    fx.explode(tl, q(".slab"), 3.5, 60, 150, 0.8);
    fx.ft(
      tl,
      q(".stack"),
      { rotation: -6 },
      { rotation: 8, duration: 1.6, ease: "sine.inOut" },
      3.5,
    );
    gsap.utils
      .toArray(q(".slab"))
      .reverse()
      .forEach(function (plate, k) {
        var i = 3 - k;
        fx.ft(
          tl,
          plate,
          { opacity: 1, y: 0, z: i * 150 },
          {
            opacity: 0,
            y: -140,
            z: i * 150 + 280,
            duration: 0.6,
            ease: "power2.in",
          },
          4.3 + k * 0.14,
        );
      });

    fx.ft(tl, q(".wb"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 4.3);
    tl.set(q(".wb"), { pointerEvents: "auto" }, 4.3);
    fx.ft(
      tl,
      q(".wb .tilt"),
      { rotationY: -14, rotationX: 7, transformPerspective: 2000 },
      { rotationY: 0, rotationX: 0, duration: 2.6, ease: "power3.out" },
      4.3,
    );
    // La sidebar se pose en verre, s'étend, puis prend la couleur du thème.
    fx.ft(
      tl,
      q(".sbar"),
      { opacity: 0, x: -24, y: -30, z: 620, rotation: -8 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        z: 65,
        rotation: 0,
        duration: 1.0,
        ease: "back.out(1.2)",
      },
      4.3,
    );
    fx.ft(
      tl,
      q(".sbar"),
      { width: 128 },
      { width: 430, duration: 0.8, ease: "sine.inOut" },
      5.2,
    );
    fx.ft(
      tl,
      q(".sbar .glass"),
      { opacity: 1 },
      { opacity: 0, duration: 1.1, ease: "sine.inOut" },
      5.1,
    );
    fx.ft(
      tl,
      q(".sbar li span:last-child"),
      { opacity: 0, x: -12 },
      { opacity: 1, x: 0, duration: 0.4, ease: "sine.out", stagger: 0.07 },
      5.8,
    );

    // Quatre faces du tableau, une par PAUSE : la face entre en pivotant, la précédente sort en pivotant.
    var faceAt = [5.6, 6.8, 8.0, 9.2];
    var rows = [0, 134, 268, 402];
    faceAt.forEach(function (t, i) {
      var f = q(".f" + (i + 1));
      fx.ft(
        tl,
        f,
        { opacity: 0, x: 100, rotationY: 62, transformPerspective: P },
        { opacity: 1, x: 0, rotationY: 0, duration: 0.8, ease: "power3.out" },
        t,
      );
      if (i < faceAt.length - 1) {
        fx.ft(
          tl,
          f,
          { opacity: 1, x: 0, rotationY: 0 },
          {
            opacity: 0,
            x: -100,
            rotationY: -62,
            duration: 0.5,
            ease: "power2.in",
          },
          faceAt[i + 1] - 0.05,
        );
      }
      if (i === 0)
        fx.ft(
          tl,
          q(".sbar .act"),
          { opacity: 0, y: 0 },
          { opacity: 1, y: 0, duration: 0.3 },
          t,
        );
      else
        fx.ft(
          tl,
          q(".sbar .act"),
          { y: rows[i - 1] },
          { y: rows[i], duration: 0.5, ease: "power2.inOut" },
          t - 0.1,
        );
    });
    fx.drop(tl, q(".f4 .fam"), 9.45, {
      z0: 360,
      turn: 8,
      stagger: 0.18,
      dur: 0.65,
    });
    // Une PAUSE par face : le chevron réapparaît à la fin de chacune.
    chevron(6.3, 6.55);
    chevron(7.5, 7.75);
    chevron(8.7, 8.95);
    chevron(10.4, 11.1);
    tl.addLabel("step1", 6.5);
    tl.addLabel("step2", 7.7);
    tl.addLabel("step3", 8.9);
    tl.addLabel("step4", 10.6);

    // ── Étape 5 : LMS ou LXP (tableau comparatif, la colonne LXP prend la lumière) ──────────
    fx.ft(
      tl,
      q(".wb"),
      { opacity: 1, x: 0, z: 0, rotationY: 0, transformPerspective: 2000 },
      {
        opacity: 0,
        x: -220,
        z: -520,
        rotationY: -28,
        duration: 0.8,
        ease: "power2.in",
      },
      11.1,
    );
    tl.set(q(".wb"), { pointerEvents: "none" }, 11.1);
    fx.ft(tl, q(".wc"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 11.7);
    tl.set(q(".wc"), { pointerEvents: "auto" }, 11.7);
    rise(q(".vs-title"), 11.8, 0.7);
    fx.ft(
      tl,
      q(".cmp-head .h"),
      { opacity: 0, y: -24 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.12 },
      12.1,
    );
    // LMS : les lignes se posent à plat, d'un trait régulier (rigide).
    fx.ft(
      tl,
      q(".cmp-row .c.l"),
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power1.out", stagger: 0.12 },
      12.4,
    );
    // LXP : la colonne se détache et s'allume, ses lignes arrivent en rebond.
    fx.ft(
      tl,
      q(".cmp-hl"),
      { opacity: 0, scaleY: 0.86, y: 30, transformOrigin: "50% 50%" },
      { opacity: 1, scaleY: 1, y: 0, duration: 0.9, ease: "power3.out" },
      13.1,
    );
    fx.ft(
      tl,
      q(".cmp-row .c.l"),
      { opacity: 1 },
      { opacity: 0.55, duration: 0.6 },
      13.4,
    );
    fx.ft(
      tl,
      q(".cmp-row .c.r"),
      { opacity: 0, x: -24 },
      { opacity: 1, x: 0, duration: 0.55, ease: "power3.out", stagger: 0.14 },
      13.4,
    );
    fx.ft(
      tl,
      q(".cmp-row .c.r i"),
      { scale: 0, rotation: -40 },
      {
        scale: 1,
        rotation: 0,
        duration: 0.5,
        ease: "back.out(2.4)",
        stagger: 0.14,
      },
      13.5,
    );
    fx.ft(
      tl,
      q(".quote-slab"),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      14.5,
    );
    chevron(15.5);
    tl.addLabel("step5", 15.7);
  };
})();
