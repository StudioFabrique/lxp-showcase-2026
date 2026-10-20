/* Vocabulaire de mouvement 3D, repris des séquences du LXP (niveaux de contenu, sidebar). */
(function () {
  var Deck = (window.Deck = window.Deck || { scenes: {} });
  var list = function (t) {
    return gsap.utils.toArray(t);
  };

  Deck.fx = {
    /**
     * fromTo qui ne rend son état de départ qu'au premier usage d'un élément dans la timeline.
     * Les usages suivants (sorties, deuxième phase) ne doivent pas écraser l'état initial :
     * `immediateRender` est donc coupé pour eux.
     */
    ft: function (tl, target, from, to, pos) {
      var used = tl.__used || (tl.__used = new Set());
      var els = list(target);
      var seen = els.some(function (e) {
        return used.has(e);
      });
      els.forEach(function (e) {
        used.add(e);
      });
      // État de départ ré-appliqué à chaque rendu depuis 0. `immediateRender` ne le pose qu'une fois, à
      // la construction : les éléments partagés entre scènes (logo, partenaires, années) seraient
      // alors laissés dans l'état d'une autre timeline.
      if (!seen) tl.set(target, Object.assign({}, from), 0);
      return tl.fromTo(target, from, seen ? Object.assign({}, to, { immediateRender: false }) : to, pos);
    },
    /** Plaques qui se posent depuis l'avant, avec un léger tour et un rebond (séquence des niveaux). */
    drop: function (tl, targets, at, o) {
      o = Object.assign({ z0: 520, dz: 0, turn: 24, dur: 0.75, stagger: 0.2, ease: "back.out(1.3)" }, o || {});
      list(targets).forEach(function (el, i) {
        var turn = i % 2 ? o.turn : -o.turn;
        Deck.fx.ft(
          tl,
          el,
          { opacity: 0, z: i * o.dz + o.z0, rotation: turn, x: turn * 3 },
          { opacity: 1, z: i * o.dz, rotation: 0, x: 0, duration: o.dur, ease: o.ease },
          at + i * o.stagger,
        );
      });
    },
    /** Vue éclatée : les plaques passent de l'écart `from` à l'écart `to` en profondeur. */
    explode: function (tl, targets, at, from, to, dur) {
      list(targets).forEach(function (el, i) {
        Deck.fx.ft(tl, el, { z: i * from }, { z: i * to, duration: dur || 0.8, ease: "power2.inOut" }, at + i * 0.04);
      });
    },
  };
})();
