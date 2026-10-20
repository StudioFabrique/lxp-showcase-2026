/* Scène détaillée « Suivre et accompagner » (jalon 6). Quatre PAUSES :
   0 progression et préférences d'un apprenant
   1 l'humeur du jour (les cinq pictogrammes météo du LXP se transforment l'un en l'autre)
   2 l'alerte de décrochage et les données utilisées
   3 le retour de l'équipe sur l'analyse.
   Libellés repris du LXP (learning-profile, feeling-feedback, PredictionPanel, AnalysisFeedbackForm).
   Données fictives ; aucune amélioration causée par l'IA n'est revendiquée. */
(function () {
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
    var LEVEL0 = 4; // niveau affiché à l'issue de la démonstration

    S.set(tl, "hidden", 0);
    tl.set(q(".ra"), { pointerEvents: "auto" }, 0);
    fx.ft(tl, q(".bar"), { opacity: 0, y: -24 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0);

    var enter = function (cls, t, rows) {
      var s = q("." + cls);
      fx.ft(tl, s + " .badge", { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, t + 0.1);
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
    enter("ra", 0.9, [".who", ".pace", ".pdesc", ".cchip", ".pinfo"]);
    fx.ft(tl, q(".wkb"), { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: 0.08 }, 2.4);
    fx.ft(tl, q(".wkb i"), { scaleY: 0 }, { scaleY: 1, duration: 0.7, ease: "back.out(1.4)", stagger: 0.12 }, 2.6);
    chevOn(5.0);
    tl.addLabel("step0", 5.3);

    // ── Étape 1 : humeur du jour ──────────────────────────────────────────────────────────
    chevOff(5.5);
    leave("ra", 5.5);
    activate("rb", 6.2);
    enter("rb", 6.2, [".mlv", ".rfoot"]);
    // Démonstration : le pictogramme se transforme de l'orage au soleil voilé, comme l'humeur change.
    var bw = gsap.utils.toArray(q(".bw"));
    var demo = [
      [0, 7.6, 8.3],
      [1, 8.3, 8.9],
      [2, 8.9, 9.5],
      [3, 9.5, null],
    ];
    demo.forEach(function (st) {
      var node = bw[st[0]];
      fx.ft(tl, node, { opacity: 0, rotation: 40, scale: 0.5 }, { opacity: 1, rotation: 0, scale: 1, duration: 0.55, ease: "back.out(1.6)" }, st[1]);
      if (st[2]) fx.ft(tl, node, { opacity: 1, rotation: 0, scale: 1 }, { opacity: 0, rotation: -40, scale: 0.5, duration: 0.4, ease: "power2.in" }, st[2] - 0.05);
    });
    chevOn(10.4);
    tl.addLabel("step1", 10.7);

    // ── Étape 2 : alerte de décrochage ────────────────────────────────────────────────────
    chevOff(10.9);
    leave("rb", 10.9);
    activate("rc", 11.6);
    enter("rc", 11.6, [".alrow", ".sig", ".leg", ".usedbtn"]);
    fx.ft(tl, q(".alr"), { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2.4)" }, 12.9);
    fx.ft(tl, q(".gl"), { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.1 }, 13.2);
    fx.ft(tl, q(".ln"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut", stagger: 0.3 }, 13.6);
    chevOn(15.8);
    tl.addLabel("step2", 16.1);

    // ── Étape 3 : retour de l'équipe ──────────────────────────────────────────────────────
    chevOff(16.3);
    leave("rc", 16.3);
    activate("rd", 17.0);
    enter("rd", 17.0, [".who", ".av", ".cchip", ".rfoot"]);
    chevOn(20.2);
    tl.addLabel("step3", 20.5);

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

    // Préférences : rythme (un seul), préférences (plusieurs), semaine de progression.
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
    var pbs = gsap.utils.toArray(q(".wkb"));
    var pinfo = el.querySelector(".pinfo");
    var PINFO0 = pinfo.innerHTML;
    var esc = function (t) {
      return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    };
    pbs[pbs.length - 1].classList.add("on");
    pbs.forEach(function (b) {
      hover(b, { y: -6 }, { y: 0 });
      b.addEventListener("click", function () {
        single(pbs, b);
        pinfo.innerHTML = "<b>" + esc(b.getAttribute("data-w")) + "</b> · " + esc(b.getAttribute("data-m"));
        gsap.fromTo(pinfo, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3 * d, overwrite: "auto" });
      });
    });

    // Humeur : un clic sur un niveau transforme le pictogramme.
    var lvs = gsap.utils.toArray(q(".mlv"));
    var level = LEVEL0;
    var setLevel = function (l, animate) {
      var prev = level;
      level = l;
      single(lvs, lvs[l - 1]);
      bw.forEach(function (n, i) {
        var idx = i + 1;
        if (idx === l) {
          if (animate) gsap.fromTo(n, { opacity: 0, rotation: l > prev ? 40 : -40, scale: 0.5 }, { opacity: 1, rotation: 0, scale: 1, duration: 0.5 * d, ease: "back.out(1.6)", overwrite: "auto" });
          else gsap.set(n, { opacity: 1, rotation: 0, scale: 1 });
        } else if (idx === prev && animate) {
          gsap.to(n, { opacity: 0, rotation: l > prev ? -40 : 40, scale: 0.5, duration: 0.3 * d, ease: "power2.in", overwrite: "auto" });
        } else gsap.set(n, { opacity: 0 });
      });
    };
    lvs.forEach(function (b, i) {
      hover(b, { y: -4 }, { y: 0 });
      b.addEventListener("click", function () {
        if (i + 1 !== level) setLevel(i + 1, true);
      });
    });
    lvs[LEVEL0 - 1].classList.add("on");
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
      single(pbs, pbs[pbs.length - 1]);
      pinfo.innerHTML = PINFO0;
      setLevel(LEVEL0, false);
      usedOn = false;
      usedBtn.firstChild.textContent = Content.text("care.alerte.carte.donnees.voir");
      used.classList.remove("on");
      single(avs, avs[0]);
      single(outs, outs[3]);
      gsap.set(el.querySelectorAll(".toast"), { opacity: 0 });
    });
  };
})();
