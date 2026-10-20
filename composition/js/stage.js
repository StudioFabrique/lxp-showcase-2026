/*
 * Calque persistant (#stage) : logo ANDRIA, logos partenaires, mention de cofinancement, années.
 * Chaque scène lui donne une « pose ». Les poses sont toujours déclarées en entier (début ET fin)
 * dans la timeline de la scène, ce qui garde les retours en arrière déterministes.
 * Repère : 1920 × 1080, éléments positionnés par leur coin haut-gauche (x, y) et mis à l'échelle
 * depuis leur centre.
 */
(function () {
  var Deck = (window.Deck = window.Deck || { scenes: {} });

  var SEL = {
    logo: "#logo",
    partners: "#partners",
    cofin: "#cofin",
    ya: "#year-a",
    yd: "#year-dash",
    yb: "#year-b",
  };

  // hero  : introduction (logo et années grands, au centre)
  // dock  : bandeau réduit (logo en haut à gauche, partenaires en haut à droite, années en bas à gauche)
  // split : années écartées de chaque côté (frise)
  // hidden: tout est masqué (les scènes détaillées)
  var dock = {
    logo: { x: -158.5, y: -31, scale: 0.32, opacity: 1 },
    partners: { x: 1110, y: 34, scale: 0.5, opacity: 1 },
    cofin: { x: 460, y: 652, scale: 1, opacity: 0 },
    ya: { x: -50, y: 905, scale: 0.27, opacity: 1 },
    yd: { x: 202, y: 905, scale: 0.27, opacity: 1 },
    yb: { x: 114, y: 905, scale: 0.27, opacity: 1 },
  };
  function faded(pose) {
    var out = {};
    Object.keys(pose).forEach(function (k) {
      out[k] = Object.assign({}, pose[k], { opacity: 0 });
    });
    return out;
  }
  var POSES = {
    hero: {
      logo: { x: 565, y: 142, scale: 1, opacity: 1 },
      partners: { x: 460, y: 508, scale: 1, opacity: 1 },
      cofin: { x: 460, y: 652, scale: 1, opacity: 1 },
      ya: { x: 410, y: 725, scale: 1, opacity: 1 },
      yd: { x: 890, y: 725, scale: 1, opacity: 1 },
      yb: { x: 1030, y: 725, scale: 1, opacity: 1 },
    },
    dock: dock,
    hidden: faded(dock),
    // Années écartées de chaque côté (centres à 322 px et 1598 px), logo et partenaires effacés.
    split: Object.assign({}, faded(dock), {
      ya: { x: 82, y: 445, scale: 1.15, opacity: 1 },
      yd: { x: 890, y: 445, scale: 1, opacity: 0 },
      yb: { x: 1358, y: 445, scale: 1.15, opacity: 1 },
    }),
  };

  var logoHost = document.getElementById("logo");
  if (logoHost && window.ANDRIA_LOGO) logoHost.innerHTML = window.ANDRIA_LOGO;

  var Stage = (Deck.Stage = {
    poses: POSES,
    sel: SEL,
    /** Applique une pose instantanément à `pos` (début de scène). */
    set: function (tl, name, pos) {
      Object.keys(SEL).forEach(function (k) {
        tl.set(SEL[k], POSES[name][k], pos || 0);
      });
    },
    /** Transition d'une pose à l'autre, avec départ explicite pour rester réversible. */
    fromTo: function (tl, from, to, pos, dur, ease, stagger, only) {
      var order = only || Object.keys(SEL);
      order.forEach(function (k, i) {
        tl.fromTo(
          SEL[k],
          Object.assign({}, POSES[from][k]),
          Object.assign({}, POSES[to][k], {
            duration: dur,
            ease: ease || "power3.inOut",
            immediateRender: false,
          }),
          (pos || 0) + (stagger || 0) * i,
        );
      });
    },
  });
})();
