/* S0 Introduction : logo ANDRIA (révélation lente par cases, pour le suspense), logos partenaires
   à plat, années à plat, chevron. */
(function () {
  var Deck = (window.Deck = window.Deck || { scenes: {} });

  Deck.scenes.intro = function (tl) {
    var S = Deck.Stage;
    var fx = Deck.fx;
    var hero = S.poses.hero;
    S.set(tl, "hero", 0);
    tl.set("#cofin", { opacity: 0 }, 0); // elle arrive après les logos

    // Logo : les cases du masque se posent lentement, par vagues, pendant que le logo arrive du fond
    // en pivotant. Environ 4 s avant que le logo soit complet : le temps de laisser monter l'attente.
    document.querySelectorAll("#logo .logo-pixel").forEach(function (pixel, i) {
      fx.ft(
        tl,
        pixel,
        { opacity: 0, y: (i % 5) * 2 + 4 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
        0.3 + (i % 32) * 0.09,
      );
    });
    fx.ft(
      tl,
      "#logo",
      {
        rotationY: -34,
        rotationX: 18,
        z: -800,
        scale: 0.9,
        transformPerspective: 1800,
      },
      {
        rotationY: 0,
        rotationX: 0,
        z: 0,
        scale: hero.logo.scale,
        duration: 4.0,
        ease: "power2.out",
      },
      0,
    );
    // Le logo continu apparaît SOUS le masque, qui n'est retiré qu'ensuite : aucun clignotement.
    fx.ft(
      tl,
      "#logo .logo-settled",
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.inOut" },
      4.0,
    );
    fx.ft(
      tl,
      "#logo .brand-svg:not(.logo-settled)",
      { opacity: 1 },
      { opacity: 0, duration: 0.01 },
      4.55,
    );

    // Partenaires : logos à plat, simple montée en fondu, une fois le logo posé.
    fx.ft(
      tl,
      "#partners > *",
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.2 },
      5.0,
    );
    fx.ft(
      tl,
      "#cofin",
      { opacity: 0, y: hero.cofin.y + 24 },
      { opacity: 1, y: hero.cofin.y, duration: 0.8, ease: "power2.out" },
      6.0,
    );

    // Années : à plat, chaque chiffre monte dans son cadre.
    fx.ft(
      tl,
      "#years .year i",
      { yPercent: 120 },
      { yPercent: 0, duration: 0.8, ease: "power4.out", stagger: 0.07 },
      6.3,
    );
    fx.ft(
      tl,
      "#year-dash i",
      { yPercent: 120 },
      { yPercent: 0, duration: 0.6, ease: "power3.out" },
      6.7,
    );

    fx.ft(
      tl,
      "#intro-chevron",
      { opacity: 0, y: 26 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      7.5,
    );
    tl.addLabel("step0", 8.3);
  };
})();
