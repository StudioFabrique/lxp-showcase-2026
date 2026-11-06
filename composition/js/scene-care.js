/* Scène détaillée « Suivre et accompagner » (jalon 6). Quatre PAUSES :
   0 progression d'un apprenant (reprise, avancement, profil d'apprentissage)
   1 l'humeur du jour : un curseur règle la barre, le pictogramme météo en relief se déforme (MorphSVG, 3D),
     puis un commentaire est envoyé (séquence reprise de la présentation Hyperframes du dépôt lxp)
   2 l'alerte de décrochage et les données utilisées
   3 le retour de l'équipe sur l'analyse.
   Libellés repris du LXP (learning-profile, feeling-feedback, PredictionPanel, AnalysisFeedbackForm).
   Données fictives ; aucune amélioration causée par l'IA n'est revendiquée. */
(function () {
  if (window.MorphSVGPlugin) gsap.registerPlugin(window.MorphSVGPlugin);
  var Deck = (window.Deck = window.Deck || { scenes: {} });
  var P = 1800;

  Deck.scenes.care = function (tl, el) {
    var S = Deck.Stage;
    var fx = Deck.fx;
    var q = function (s) {
      return "#scene-care " + s;
    };
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var d = reduced ? 0 : 1;
    var LEVEL_START = 3; // niveau au début de la démonstration
    var LEVEL0 = 2; // niveau affiché à l'issue de la démonstration
    var D = 4.2; // décalage des étapes suivantes : la démonstration de l'humeur dure plus longtemps (la sortie de la carte doit suivre le label step1, 14,7 s)

    S.set(tl, "hidden", 0);
    tl.set(q(".ra"), { pointerEvents: "auto" }, 0);
    fx.ft(tl, q(".bar"), { opacity: 0, y: -24 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0);

    var enter = function (cls, t, rows) {
      var s = q("." + cls);
      fx.ft(
        tl,
        s + " .h1",
        { opacity: 0, y: 60, rotationX: -24, transformPerspective: P, transformOrigin: "50% 100%" },
        { opacity: 1, y: 0, rotationX: 0, duration: 0.9, ease: "power3.out" },
        t + 0.25,
      );
      fx.ft(tl, s + " .lede", { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, t + 0.7);
      fx.ft(
        tl,
        s + " .ogc",
        { opacity: 0, x: 140, rotationY: 26, transformPerspective: P },
        { opacity: 1, x: 0, rotationY: 0, duration: 1.0, ease: "power3.out" },
        t,
      );
      fx.ft(tl, s + " .ch", { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.4 }, t + 0.8);
      fx.ft(
        tl,
        rows
          .map(function (r) {
            return s + " " + r;
          })
          .join(", "),
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.06 },
        t + 1.2,
      );
    };
    var leave = function (cls, t) {
      var s = q("." + cls);
      tl.set(s, { pointerEvents: "none" }, t);
      fx.ft(tl, s + " .og-text", { opacity: 1, x: 0, rotationY: 0, transformPerspective: P }, { opacity: 0, x: -180, rotationY: 38, duration: 0.7, ease: "power2.in" }, t);
      fx.ft(tl, s + " .ogc", { opacity: 1, x: 0, rotationY: 0 }, { opacity: 0, x: 180, rotationY: -30, duration: 0.7, ease: "power2.in" }, t);
    };
    var chevOn = function (t) {
      fx.ft(tl, q(".chevron.mini"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, t);
      tl.set(q(".chevron.mini"), { pointerEvents: "auto" }, t);
    };
    var chevOff = function (t) {
      fx.ft(tl, q(".chevron.mini"), { opacity: 1 }, { opacity: 0, duration: 0.2 }, t);
      tl.set(q(".chevron.mini"), { pointerEvents: "none" }, t);
    };
    var activate = function (cls, t) {
      fx.ft(tl, q("." + cls), { opacity: 0 }, { opacity: 1, duration: 0.2 }, t);
      tl.set(q("." + cls), { pointerEvents: "auto" }, t);
    };

    // ── Étape 0 : progression et préférences ──────────────────────────────────────────────
    enter("ra", 0.9, [".rtitle", ".raide", ".who", ".pace", ".pdesc", ".cchip", ".rsm-row", ".avb"]);
    fx.ft(tl, q(".avb .track i"), { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "power2.out" }, 3.0);
    chevOn(5.0);
    tl.addLabel("step0", 5.3);

    // ── Étape 1 : humeur du jour ──────────────────────────────────────────────────────────
    chevOff(5.5);
    leave("ra", 5.5);
    activate("rb", 6.2);
    enter("rb", 6.2, [".mlv", ".rfoot"]);
    // Démonstration (séquence Hyperframes du dépôt lxp) : un curseur saisit la barre, la fait glisser vers la pluie,
    // le pictogramme en relief (couches empilées en profondeur) se déforme (MorphSVG) en tournant sur lui-même,
    // puis il tape un commentaire et clique sur « Envoyer ».
    var icon = el.querySelector(".feeling-3d");
    var paths = gsap.utils.toArray(q(".feeling-path"));
    var LV = [1, 2, 3, 4, 5].map(function (n) {
      return icon.getAttribute("data-level-" + n);
    });
    var rb = el.querySelector(".rb");
    var range = el.querySelector(".mslider");
    var area = el.querySelector(".mta");
    var cursor = el.querySelector(".mcursor");
    var ring = el.querySelector(".mring");
    var sendBtn = el.querySelector(".sendm");
    var typed = Content.text("care.humeur.carte.commentaire.exemple");
    var THUMB = 30; // diamètre du curseur de la barre (voir .mslider)
    // Coordonnées dans l'espace de la scène (1920 × 1080), indépendantes des transformations en cours.
    var pos = function (node, fx0, fy0) {
      var x = 0;
      var y = 0;
      var n = node;
      while (n && n !== rb) {
        x += n.offsetLeft;
        y += n.offsetTop;
        n = n.offsetParent;
      }
      return { x: x + node.offsetWidth * fx0, y: y + node.offsetHeight * fy0 };
    };
    var thumbAt = function (v) {
      var o = pos(range, 0, 0.5);
      return { x: o.x + THUMB / 2 + (range.offsetWidth - THUMB) * ((v - 1) / 4), y: o.y };
    };
    var tip = function (pt) {
      return { x: pt.x - 3.6, y: pt.y - 2.3 }; // la pointe de la flèche, pas son coin
    };
    var click = function (pt, at) {
      tl.to(cursor, { scale: 0.9, duration: 0.1 }, at);
      tl.to(cursor, { scale: 1, duration: 0.16 }, at + 0.1);
      // Positionné au moment du clic seulement : un état de départ posé à 0 (fx.ft) laisserait l'anneau visible avant.
      tl.set(ring, { x: pt.x - 22, y: pt.y - 22, scale: 0.35, opacity: 0.6 }, at);
      tl.to(ring, { scale: 1.4, opacity: 0, duration: 0.45 }, at);
    };
    // Un demi-tour complet avec un léger bond vers l'avant, pendant que le tracé se déforme.
    var spin = function (tlx, at) {
      tlx.fromTo(icon, { rotationY: 0 }, { rotationY: 360, duration: 1.05, ease: "power2.inOut", immediateRender: false }, at);
      tlx.to(icon, { scale: 1.1, z: 40, duration: 0.5, ease: "power2.out" }, at);
      tlx.to(icon, { scale: 1, z: 0, duration: 0.55, ease: "power2.in" }, at + 0.5);
    };
    var P0 = thumbAt(LEVEL_START);
    var P1 = thumbAt(LEVEL0);
    var PA = pos(area, 0.3, 0.5);
    var PS = pos(sendBtn, 0.5, 0.5);
    var typeProxy = { n: 0 };
    tl.set(paths, { attr: { d: LV[LEVEL_START - 1] } }, 0);
    tl.set(range, { value: LEVEL_START }, 0);
    tl.set(area, { value: "" }, 0);
    tl.set(cursor, { opacity: 0 }, 0);
    tl.set(ring, { opacity: 0 }, 0);
    tl.set(q(".rb .toast"), { opacity: 0 }, 0);
    fx.ft(tl, icon, { opacity: 0, rotationY: -180, scale: 0.6, transformPerspective: 1400 }, { opacity: 1, rotationY: 0, scale: 1, duration: 1.0, ease: "power3.out" }, 7.3);
    // 1. Le curseur saisit la barre et la fait glisser : le pictogramme passe à la pluie.
    fx.ft(tl, cursor, { opacity: 0, x: tip(P0).x + 70, y: tip(P0).y + 60, scale: 1 }, { opacity: 1, x: tip(P0).x, y: tip(P0).y, duration: 0.6, ease: "power2.inOut" }, 8.5);
    tl.to(cursor, { scale: 0.92, duration: 0.1 }, 9.1);
    tl.fromTo(range, { value: LEVEL_START }, { value: LEVEL0, duration: 0.8, ease: "power2.inOut", immediateRender: false }, 9.2);
    tl.to(cursor, { x: tip(P1).x, y: tip(P1).y, duration: 0.8, ease: "power2.inOut" }, 9.2);
    tl.to(cursor, { scale: 1, duration: 0.16 }, 10.0);
    tl.to(paths, { morphSVG: LV[LEVEL0 - 1], duration: 0.7, ease: "power2.inOut" }, 9.4);
    spin(tl, 9.3);
    // 2. Un commentaire, saisi lettre à lettre.
    tl.to(cursor, { x: tip(PA).x, y: tip(PA).y, duration: 0.5, ease: "power2.inOut" }, 10.3);
    click(PA, 10.9);
    tl.fromTo(
      typeProxy,
      { n: 0 },
      {
        n: typed.length,
        duration: 1.1,
        ease: "none",
        immediateRender: false,
        onUpdate: function () {
          area.value = typed.slice(0, Math.round(typeProxy.n));
        },
      },
      11.1,
    );
    // 3. « Envoyer » : une confirmation s'affiche.
    tl.to(cursor, { x: tip(PS).x, y: tip(PS).y, duration: 0.5, ease: "power2.inOut" }, 12.3);
    click(PS, 12.85);
    tl.to(cursor, { opacity: 0, duration: 0.25 }, 13.15);
    fx.ft(tl, q(".rb .toast"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, 13.05);
    tl.to(q(".rb .toast"), { opacity: 0, y: -8, duration: 0.4 }, 14.4);
    chevOn(14.4);
    tl.addLabel("step1", 14.7);

    // ── Étape 2 : alerte de décrochage ────────────────────────────────────────────────────
    chevOff(10.9 + D);
    leave("rb", 10.9 + D);
    activate("rc", 11.6 + D);
    enter("rc", 11.6 + D, [".alrow", ".sig", ".leg", ".usedbtn"]);
    fx.ft(tl, q(".alr"), { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2.4)" }, 12.9 + D);
    // Graphique : axes, puis les trois courbes se dévoilent de gauche à droite (rideau commun, donc synchrones),
    // chaque marqueur se pose au passage ; l'abandon est mis en avant à l'arrivée.
    var REVEAL0 = 13.5 + D;
    var REVEAL_LEN = 2.0;
    var W0 = 96; // abscisse du premier point ; les suivants sont espacés de 178,4 (voir le SVG)
    fx.ft(tl, q(".chart .axis"), { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, 13.0 + D);
    fx.ft(tl, q(".chart .rev"), { attr: { width: W0 - 8 } }, { attr: { width: 1028 }, duration: REVEAL_LEN, ease: "none" }, REVEAL0);
    ["wr", "ok", "ko"].forEach(function (k) {
      gsap.utils.toArray(q(".chart .pts." + k + " .pt")).forEach(function (pt, i) {
        fx.ft(tl, pt, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2.6)" }, REVEAL0 + (REVEAL_LEN * (W0 - 8 + i * 178.4)) / (1028 - (W0 - 8)));
      });
    });
    fx.ft(tl, q(".chart .call"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, REVEAL0 + REVEAL_LEN + 0.1);
    fx.ft(tl, q(".chart .pulse"), { scale: 1, opacity: 0.7 }, { scale: 2.6, opacity: 0, duration: 0.9, ease: "power2.out" }, REVEAL0 + REVEAL_LEN + 0.1);
    chevOn(16.5 + D);
    tl.addLabel("step2", 16.8 + D);

    // ── Étape 3 : retour de l'équipe ──────────────────────────────────────────────────────
    chevOff(17.1 + D);
    leave("rc", 17.1 + D);
    activate("rd", 17.8 + D);
    enter("rd", 17.8 + D, [".who", ".av", ".cchip", ".rfoot"]);
    chevOn(21.0 + D);
    tl.addLabel("step3", 21.3 + D);

    // ── Interactions (hors timeline) ──────────────────────────────────────────────────────
    var hover = function (node, on, off) {
      node.addEventListener("mouseenter", function () {
        if (!reduced) gsap.to(node, Object.assign({ duration: 0.3, ease: "power3.out", overwrite: "auto" }, on));
      });
      node.addEventListener("mouseleave", function () {
        gsap.to(node, Object.assign({ duration: 0.35, ease: "power2.out", overwrite: "auto" }, off));
      });
    };
    var swap = function (node, text) {
      gsap.to(node, {
        opacity: 0,
        y: -8,
        duration: 0.15 * d,
        overwrite: "auto",
        onComplete: function () {
          node.textContent = text;
          gsap.fromTo(node, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3 * d, overwrite: "auto" });
        },
      });
    };
    var single = function (nodes, on) {
      nodes.forEach(function (n) {
        n.classList.toggle("on", n === on);
      });
    };

    // Profil d'apprentissage : rythme (un seul), préférences (plusieurs).
    var paces = gsap.utils.toArray(q(".pace"));
    var pdesc = el.querySelector(".pdesc");
    paces.forEach(function (b) {
      hover(b, { y: -3 }, { y: 0 });
      b.addEventListener("click", function () {
        single(paces, b);
        swap(pdesc, b.getAttribute("data-d"));
      });
    });
    gsap.utils.toArray(q(".ra .cchip")).forEach(function (b) {
      hover(b, { y: -3 }, { y: 0 });
      b.addEventListener("click", function () {
        b.classList.toggle("on");
      });
    });
    // Humeur : déplacer la barre déforme le pictogramme vers le nouvel état (même morphing 3D que la démonstration).
    var level = LEVEL0;
    var morphTl = null;
    var setLevel = function (l, animate) {
      level = l;
      icon.setAttribute("aria-label", Content.text("care.humeur.carte.mlvs.mlv." + (l - 1) + ".aria"));
      if (morphTl) morphTl.kill();
      if (!animate || reduced) {
        gsap.set(paths, { attr: { d: LV[l - 1] } });
        gsap.set(icon, { opacity: 1, rotationY: 0, scale: 1, z: 0 });
        return;
      }
      morphTl = gsap.timeline();
      morphTl.to(paths, { morphSVG: LV[l - 1], duration: 0.7, ease: "power2.inOut" }, 0);
      spin(morphTl, 0);
    };
    range.addEventListener("input", function () {
      var l = Math.round(range.valueAsNumber);
      if (l !== level) setLevel(l, true);
    });
    range.addEventListener("change", function () {
      range.value = level;
    });
    var toastsOf = function (card) {
      var t = card.querySelector(".toast");
      var tt = null;
      return function () {
        if (tt) tt.kill();
        tt = gsap.timeline();
        tt.fromTo(t, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35 * d, ease: "power3.out" });
        tt.to(t, { opacity: 0, y: -8, duration: 0.4 * d }, "+=1.8");
      };
    };
    var bindBtn = function (btn, fn) {
      btn.addEventListener("click", fn);
      btn.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          fn();
        }
      });
    };
    bindBtn(el.querySelector(".sendm"), toastsOf(el.querySelector(".rb .ogc")));

    // Alerte : « Voir les données utilisées » / « Masquer les données utilisées ».
    var usedBtn = el.querySelector(".usedbtn");
    var used = el.querySelector(".used");
    var usedOn = false;
    usedBtn.addEventListener("click", function () {
      usedOn = !usedOn;
      usedBtn.firstChild.textContent = Content.text(usedOn ? "care.alerte.carte.donnees.masquer" : "care.alerte.carte.donnees.voir");
      used.classList.toggle("on", usedOn);
      if (usedOn) gsap.fromTo(used, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.4 * d, ease: "power3.out" });
    });

    // Retour : un avis, un devenir, puis « Enregistrer le retour ».
    var avs = gsap.utils.toArray(q(".av"));
    avs.forEach(function (b) {
      hover(b, { y: -3 }, { y: 0 });
      b.addEventListener("click", function () {
        single(avs, b);
      });
    });
    var outs = gsap.utils.toArray(q(".cchip.out"));
    outs.forEach(function (b) {
      hover(b, { y: -3 }, { y: 0 });
      b.addEventListener("click", function () {
        single(outs, b);
      });
    });
    bindBtn(el.querySelector(".savef"), toastsOf(el.querySelector(".rd .ogc")));

    el.addEventListener("scene:leave", function () {
      single(paces, paces[0]);
      pdesc.textContent = paces[0].getAttribute("data-d");
      gsap.utils.toArray(q(".ra .cchip")).forEach(function (b, i) {
        b.classList.toggle("on", i < 2);
      });
      setLevel(LEVEL0, false);
      range.value = LEVEL0;
      usedOn = false;
      usedBtn.firstChild.textContent = Content.text("care.alerte.carte.donnees.voir");
      used.classList.remove("on");
      single(avs, avs[0]);
      single(outs, outs[3]);
      gsap.set(el.querySelectorAll(".toast"), { opacity: 0 });
    });
  };
})();
