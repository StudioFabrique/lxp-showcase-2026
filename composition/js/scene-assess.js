/* Scène détaillée « Évaluer » (jalon 4). Trois PAUSES :
   0 les quatre types de quiz (QCM, vrai ou faux, associations, ordre) : on peut les essayer
   1 les résultats du diagnostic
   2 la remise d'un apprenant, la notation par critères et le commentaire pédagogique.
   Libellés repris du LXP (diagnostic-quiz, quiz-results, staff-assignment). Données fictives. */
(function () {
  var Deck = (window.Deck = window.Deck || { scenes: {} });
  var P = 1800;

  Deck.scenes.assess = function (tl, el) {
    var S = Deck.Stage;
    var fx = Deck.fx;
    var q = function (s) {
      return "#scene-assess " + s;
    };
    var rise = function (target, at, dur) {
      fx.ft(tl, target, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: dur || 0.7, ease: "power3.out" }, at);
    };
    var tok = function (n) {
      return getComputedStyle(document.documentElement).getPropertyValue(n).trim();
    };
    var rgbOf = function (hex) {
      hex = hex.replace("#", "");
      return [0, 2, 4].map(function (i) {
        return parseInt(hex.substr(i, 2), 16);
      }).join(",");
    };
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var C = {
      ok: tok("--color-accent"),
      ko: tok("--color-error"),
      warn: tok("--color-warning"),
      line: tok("--color-base-300"),
      base: tok("--color-base-100"),
      pri: tok("--color-primary"),
    };
    var tint = function (hex, a) {
      return "rgba(" + rgbOf(hex) + "," + a + ")";
    };
    var okBg = tint(C.ok, 0.12);
    var koBg = tint(C.ko, 0.1);

    S.set(tl, "hidden", 0);
    tl.set(q(".ea"), { pointerEvents: "auto" }, 0);
    fx.ft(tl, q(".bar"), { opacity: 0, y: -24 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0);

    // ── Étape 0 : les types de quiz ────────────────────────────────────────────────────────
    fx.ft(
      tl,
      q(".ea .h1"),
      { opacity: 0, y: 60, rotationX: -24, transformPerspective: P, transformOrigin: "50% 100%" },
      { opacity: 1, y: 0, rotationX: 0, duration: 0.9, ease: "power3.out" },
      0.5,
    );
    rise(q(".ea .lede"), 1.0);
    fx.ft(
      tl,
      q(".qz"),
      { opacity: 0, x: 140, rotationY: 26, transformPerspective: P },
      { opacity: 1, x: 0, rotationY: 0, duration: 1.0, ease: "power3.out" },
      0.9,
    );
    fx.ft(tl, q(".qz-k, .qz-t"), { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, 1.7);
    fx.ft(tl, q(".tab"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.09 }, 1.9);
    fx.ft(tl, q('.qp[data-p="mcq"] h4'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, 2.4);
    fx.ft(tl, q('.qp[data-p="mcq"] .opt'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.14 }, 2.8);
    fx.ft(tl, q(".qfoot"), { opacity: 0 }, { opacity: 1, duration: 0.4 }, 3.4);
    // Démonstration : la bonne réponse est choisie, avec le même badge que dans le LXP.
    var okOpt = q('.qp[data-p="mcq"] .opt[data-ok="1"]');
    fx.ft(tl, okOpt, { backgroundColor: C.base, borderColor: C.line }, { backgroundColor: okBg, borderColor: C.ok, duration: 0.4 }, 4.1);
    fx.ft(tl, okOpt + " .tg", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2.4)" }, 4.2);
    fx.ft(tl, q(".chevron.mini"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, 5.0);
    tl.set(q(".chevron.mini"), { pointerEvents: "auto" }, 5.0);
    tl.addLabel("step0", 5.3);

    // ── Étape 1 : résultats du diagnostic ──────────────────────────────────────────────────
    fx.ft(tl, q(".chevron.mini"), { opacity: 1 }, { opacity: 0, duration: 0.2 }, 5.5);
    tl.set(q(".chevron.mini"), { pointerEvents: "none" }, 5.5);
    tl.set(q(".ea"), { pointerEvents: "none" }, 5.5);
    fx.ft(
      tl,
      q(".ea-text"),
      { opacity: 1, x: 0, rotationY: 0, transformPerspective: P },
      { opacity: 0, x: -180, rotationY: 38, duration: 0.7, ease: "power2.in" },
      5.5,
    );
    fx.ft(tl, q(".qz"), { opacity: 1, x: 0, rotationY: 0 }, { opacity: 0, x: 180, rotationY: -30, duration: 0.7, ease: "power2.in" }, 5.5);
    fx.ft(tl, q(".eb"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 6.3);
    fx.ft(
      tl,
      q(".res"),
      { opacity: 0, x: -120, rotationY: -24, transformPerspective: P },
      { opacity: 1, x: 0, rotationY: 0, duration: 0.9, ease: "power3.out" },
      6.3,
    );
    fx.ft(tl, q(".res-t, .res-k"), { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }, 7.0);
    fx.ft(tl, q(".dgrow"), { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out", stagger: 0.16 }, 7.4);
    fx.ft(tl, q(".dgrow .tg"), { scale: 0.5 }, { scale: 1, duration: 0.4, ease: "back.out(2.4)", stagger: 0.16 }, 7.6);
    fx.ft(tl, q(".ringbox"), { opacity: 0, scale: 0.7, rotation: -20 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.9, ease: "back.out(1.5)" }, 7.0);
    fx.ft(tl, q(".rg-fg"), { strokeDashoffset: 540.35 }, { strokeDashoffset: 135.09, duration: 1.4, ease: "power2.inOut" }, 7.5);
    fx.ft(tl, q(".rg-n"), { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)" }, 8.1);
    fx.ft(tl, q(".rg-c"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5 }, 8.6);
    fx.ft(tl, q(".chevron.mini"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, 9.4);
    tl.set(q(".chevron.mini"), { pointerEvents: "auto" }, 9.4);
    tl.addLabel("step1", 9.7);

    // ── Étape 2 : remise, notation et commentaire ──────────────────────────────────────────
    fx.ft(tl, q(".chevron.mini"), { opacity: 1 }, { opacity: 0, duration: 0.2 }, 9.9);
    tl.set(q(".chevron.mini"), { pointerEvents: "none" }, 9.9);
    fx.ft(tl, q(".res"), { opacity: 1, x: 0, rotationY: 0 }, { opacity: 0, x: -160, rotationY: -28, duration: 0.7, ease: "power2.in" }, 9.9);
    fx.ft(tl, q(".ringbox"), { opacity: 1, x: 0 }, { opacity: 0, x: 200, duration: 0.6, ease: "power2.in" }, 9.9);
    tl.set(q(".eb"), { pointerEvents: "none" }, 10.0);
    fx.ft(tl, q(".ec"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 10.7);
    tl.set(q(".ec"), { pointerEvents: "auto" }, 10.7);
    fx.ft(
      tl,
      q(".rend"),
      { opacity: 0, x: -120, rotationY: -24, transformPerspective: P },
      { opacity: 1, x: 0, rotationY: 0, duration: 0.9, ease: "power3.out" },
      10.7,
    );
    fx.ft(
      tl,
      q(".grade"),
      { opacity: 0, x: 120, rotationY: 24, transformPerspective: P },
      { opacity: 1, x: 0, rotationY: 0, duration: 0.9, ease: "power3.out" },
      10.9,
    );
    fx.ft(tl, q(".rend .gh, .rend .who, .rtxt, .file, .bareme li"), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.12 }, 11.5);
    fx.ft(tl, q(".grade .gh"), { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.4 }, 11.7);
    fx.ft(tl, q(".crit"), { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.45, ease: "power3.out", stagger: 0.14 }, 12.1);
    fx.ft(tl, q(".score"), { scale: 0.6 }, { scale: 1, duration: 0.4, ease: "back.out(2.4)", stagger: 0.14 }, 12.3);
    fx.ft(tl, q(".total"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 13.0);
    fx.ft(tl, q(".cm, .cmt"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }, 13.5);
    fx.ft(tl, q(".cmt span"), { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.6, ease: "steps(46)" }, 13.9);
    fx.ft(tl, q(".grade .rfoot .btn"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.6)" }, 15.6);
    fx.ft(tl, q(".chevron.mini"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, 16.4);
    tl.set(q(".chevron.mini"), { pointerEvents: "auto" }, 16.4);
    tl.addLabel("step2", 16.7);

    // ── Interactions (hors timeline) ──────────────────────────────────────────────────────
    var d = reduced ? 0 : 1;
    var hover = function (node, on, off) {
      node.addEventListener("mouseenter", function () {
        if (!reduced) gsap.to(node, Object.assign({ duration: 0.3, ease: "power3.out", overwrite: "auto" }, on));
      });
      node.addEventListener("mouseleave", function () {
        gsap.to(node, Object.assign({ duration: 0.35, ease: "power2.out", overwrite: "auto" }, off));
      });
    };

    // Onglets : on change de type de quiz.
    var tabs = gsap.utils.toArray(q(".tab"));
    var panels = gsap.utils.toArray(q(".qp"));
    var next = el.querySelector(".qnext");
    var show = function (name) {
      // « Question suivante » passe au type de quiz suivant ; sur le dernier type, il est désactivé.
      var at = tabs.findIndex(function (t) {
        return t.getAttribute("data-p") === name;
      });
      next.disabled = at === tabs.length - 1;
      tabs.forEach(function (t) {
        t.classList.toggle("on", t.getAttribute("data-p") === name);
      });
      panels.forEach(function (p) {
        var on = p.getAttribute("data-p") === name;
        gsap.killTweensOf(p);
        p.classList.toggle("on", on); // seul le panneau affiché capte la souris, et seulement quand l'étape est active
        if (on) gsap.fromTo(p, { opacity: 0, x: 40 * d }, { opacity: 1, x: 0, duration: 0.4 * d, ease: "power3.out" });
        else gsap.set(p, { opacity: 0, x: 0 });
      });
    };
    next.addEventListener("click", function () {
      var at = tabs.findIndex(function (t) {
        return t.classList.contains("on");
      });
      if (at < tabs.length - 1) show(tabs[at + 1].getAttribute("data-p"));
    });
    tabs.forEach(function (t) {
      hover(t, { y: -3 }, { y: 0 });
      t.addEventListener("click", function () {
        show(t.getAttribute("data-p"));
      });
    });

    // QCM et vrai ou faux : « Bonne réponse » sur la bonne option, « Votre réponse » sur la mauvaise.
    var resetOpts = function (panel) {
      gsap.utils.toArray(panel.querySelectorAll(".opt")).forEach(function (o) {
        gsap.to(o, { backgroundColor: C.base, borderColor: C.line, duration: 0.2, overwrite: "auto" });
        gsap.to(o.querySelector(".tg"), { opacity: 0, duration: 0.15, overwrite: "auto" });
      });
    };
    var mark = function (o, good) {
      gsap.to(o, { backgroundColor: good ? okBg : koBg, borderColor: good ? C.ok : C.ko, duration: 0.3, overwrite: "auto" });
      gsap.fromTo(o.querySelector(".tg"), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.4 * d, ease: "back.out(2.4)", overwrite: "auto" });
    };
    ["mcq", "tf"].forEach(function (name) {
      var panel = el.querySelector('.qp[data-p="' + name + '"]');
      var opts = gsap.utils.toArray(panel.querySelectorAll(".opt"));
      opts.forEach(function (o) {
        hover(o, { x: 8 }, { x: 0 });
        o.addEventListener("click", function () {
          resetOpts(panel);
          var good = o.getAttribute("data-ok") === "1";
          mark(o, good);
          if (!good) {
            gsap.fromTo(o, { x: -10 }, { x: 0, duration: 0.5 * d, ease: "elastic.out(1, 0.3)", overwrite: "auto" });
            opts.forEach(function (x) {
              if (x.getAttribute("data-ok") === "1") mark(x, true);
            });
          }
        });
      });
    });

    // Associations et ordre : sélectionner deux réponses pour les échanger, comme dans le LXP.
    var swaps = ["match", "order"].map(function (name) {
      var panel = el.querySelector('.qp[data-p="' + name + '"]');
      var btns = gsap.utils.toArray(panel.querySelectorAll(".ans"));
      // Textes et réponses attendues viennent du JSON ; la disposition de départ est mélangée (startOrder).
      var data = Content.get("assess.types.quiz.qbody.qp." + (name === "match" ? 2 : 3));
      var answers = name === "match" ? data.pairs.map(function (p) { return p.answer; }) : data.items;
      var correct = answers;
      if (name === "match") {
        panel.querySelectorAll(".term").forEach(function (t, i) {
          t.textContent = data.pairs[i].term;
        });
      }
      btns.forEach(function (b, i) {
        b.textContent = answers[data.startOrder[i]];
      });
      var start = btns.map(function (b) {
        return b.textContent;
      });
      var verdict = panel.querySelector(".verdict");
      var sel = null;
      var check = function () {
        var ok = btns.every(function (b, i) {
          return b.textContent === correct[i];
        });
        gsap.to(verdict, { opacity: ok ? 1 : 0, y: ok ? 0 : 8, duration: 0.35 * d, overwrite: "auto" });
        btns.forEach(function (b) {
          gsap.to(b, { borderColor: ok ? C.ok : C.line, backgroundColor: ok ? okBg : C.base, duration: 0.3, overwrite: "auto" });
        });
      };
      btns.forEach(function (b) {
        hover(b, { x: 6 }, { x: 0 });
        b.addEventListener("click", function () {
          if (!sel) {
            sel = b;
            gsap.to(b, { borderColor: C.pri, duration: 0.2, overwrite: "auto" });
            return;
          }
          if (sel !== b) {
            var a = sel.textContent;
            sel.textContent = b.textContent;
            b.textContent = a;
            gsap.fromTo([sel, b], { scale: 0.94 }, { scale: 1, duration: 0.45 * d, ease: "back.out(3)", overwrite: "auto" });
          }
          gsap.to(sel, { borderColor: C.line, duration: 0.2, overwrite: "auto" });
          sel = null;
          check();
        });
      });
      return function () {
        btns.forEach(function (b, i) {
          b.textContent = start[i];
          gsap.set(b, { borderColor: C.line, backgroundColor: C.base, x: 0, scale: 1 });
        });
        gsap.set(verdict, { opacity: 0 });
        sel = null;
      };
    });

    // Notation : un clic sur une note la fait monter (puis repartir de 0) ; le total change de couleur
    // selon les mêmes seuils que le LXP (60 % et plus : vert, 40 % : orange, en dessous : rouge).
    var scores = gsap.utils.toArray(q(".score"));
    var totalEl = el.querySelector(".total");
    var totalB = totalEl.querySelector("b");
    var maxTotal = scores.reduce(function (s, b) {
      return s + Number(b.getAttribute("data-max"));
    }, 0);
    var update = function () {
      var sum = scores.reduce(function (s, b) {
        return s + Number(b.getAttribute("data-v"));
      }, 0);
      totalB.textContent = sum;
      var pc = (sum / maxTotal) * 100;
      gsap.to(totalEl, { color: pc >= 60 ? C.ok : pc >= 40 ? C.warn : C.ko, duration: 0.3, overwrite: "auto" });
    };
    scores.forEach(function (b) {
      hover(b, { y: -3 }, { y: 0 });
      b.addEventListener("click", function () {
        var max = Number(b.getAttribute("data-max"));
        var v = (Number(b.getAttribute("data-v")) + 1) % (max + 1);
        b.setAttribute("data-v", v);
        b.querySelector("b").textContent = v;
        gsap.fromTo(b.querySelector("b"), { scale: 1.4 }, { scale: 1, duration: 0.4 * d, ease: "back.out(3)", overwrite: "auto" });
        update();
      });
    });
    var scoreStart = scores.map(function (b) {
      return b.getAttribute("data-v");
    });

    // Enregistrer la note : message de confirmation, comme dans le LXP.
    var toast = el.querySelector(".toast");
    var save = el.querySelector(".save");
    var toastTl = null;
    var doSave = function () {
      if (toastTl) toastTl.kill();
      toastTl = gsap.timeline();
      toastTl.fromTo(toast, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35 * d, ease: "power3.out" });
      toastTl.to(toast, { opacity: 0, y: -8, duration: 0.4 * d }, "+=1.8");
    };
    save.addEventListener("click", doSave);
    save.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        doSave();
      }
    });

    el.addEventListener("scene:leave", function () {
      show("mcq");
      resetOpts(el.querySelector('.qp[data-p="tf"]'));
      resetOpts(el.querySelector('.qp[data-p="mcq"]'));
      swaps.forEach(function (r) {
        r();
      });
      scores.forEach(function (b, i) {
        b.setAttribute("data-v", scoreStart[i]);
        b.querySelector("b").textContent = scoreStart[i];
      });
      update();
      if (toastTl) toastTl.kill();
      gsap.set(toast, { opacity: 0 });
    });
  };
})();
