/* S1bis Pour qui, pour quoi : trois cartes (apprenant, formateur, organisme) se posent sous le titre.
   Une seule étape : le chevron enchaîne sur les caractéristiques. */
(function () {
  var Deck = (window.Deck = window.Deck || { scenes: {} });

  Deck.scenes.who = function (tl) {
    var S = Deck.Stage;
    var fx = Deck.fx;
    var q = function (s) {
      return "#scene-who " + s;
    };
    S.set(tl, "dock", 0);

    fx.ft(
      tl,
      q(".wo-title"),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      0.3,
    );
    fx.ft(
      tl,
      q(".wo-lede"),
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      0.8,
    );
    fx.ft(
      tl,
      q(".wo-cards"),
      {
        rotationX: 34,
        y: 80,
        transformPerspective: 2000,
        transformOrigin: "50% 100%",
      },
      { rotationX: 0, y: 0, duration: 1.6, ease: "power3.out" },
      1.0,
    );
    fx.drop(tl, q(".wo-card"), 1.1, {
      z0: 420,
      turn: 10,
      stagger: 0.2,
      dur: 0.85,
    });
    fx.ft(
      tl,
      q(".chevron.mini"),
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      2.6,
    );
    tl.set(q(".chevron.mini"), { pointerEvents: "auto" }, 2.6);
    tl.addLabel("step0", 3.0);
  };
})();
