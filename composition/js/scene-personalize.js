/* Scène détaillée « Personnaliser et encourager » (jalon 8). Quatre PAUSES :
   0 les thèmes de l'instance (clair et sombre) avec un aperçu qui change de couleurs
   1 l'identité de l'organisme (nom, site, logo)
   2 le modèle d'e-mail (six modèles, aperçu, e-mail de test)
   3 les félicitations de fin de module, les badges et l'historique d'accomplissements.
   Libellés repris du LXP (instance-general-settings, email-template-settings, module-completion-modal,
   journal). Données fictives. Les textes viennent de content/scenes/personalize.json (Content.*).
   Les palettes des thèmes sont celles de front/src/index.css (Océan, Classique, Lin, Forêt, Aurore…). */
(function () {
  var Deck = (window.Deck = window.Deck || { scenes: {} });
  var P = 1800;

  // bg : fond de l'interface, card : cartes, bd : bordures, tx : texte, pr / prc : couleur d'action et son texte.
  var THEMES = {
    classic: { bg: "#ffffff", card: "#f7f9fc", bd: "#dce4ed", tx: "#172638", pr: "#284b70", prc: "#ffffff", sw: ["#284b70", "#526b85", "#0f766e"] },
    ocean: { bg: "#f0f9ff", card: "#e0f2fe", bd: "#bae6fd", tx: "#082f49", pr: "#0369a1", prc: "#ffffff", sw: ["#0369a1", "#0891b2", "#059669"] },
    linen: { bg: "#fffdf9", card: "#f8f1e7", bd: "#eadcc9", tx: "#3b241b", pr: "#9a3412", prc: "#ffffff", sw: ["#9a3412", "#a16207", "#0f766e"] },
    sage: { bg: "#fbfef5", card: "#f1f8df", bd: "#dcebbf", tx: "#1a2e05", pr: "#166534", prc: "#ffffff", sw: ["#166534", "#4d7c0f", "#a16207"] },
    "classic-dark": { bg: "#172637", card: "#203247", bd: "#344b63", tx: "#e8eef5", pr: "#a8c8e6", prc: "#102638", sw: ["#a8c8e6", "#a2b6c9", "#65c5b6"] },
    aurora: { bg: "#1a1830", card: "#2a2750", bd: "#312e5a", tx: "#f5f3ff", pr: "#a78bfa", prc: "#1e103e", sw: ["#a78bfa", "#22d3ee", "#f472b6"] },
    ember: { bg: "#28130e", card: "#482319", bd: "#5b2e22", tx: "#fff7ed", pr: "#fb923c", prc: "#431407", sw: ["#fb923c", "#fda4af", "#facc15"] },
    abyss: { bg: "#06242c", card: "#0b3a45", bd: "#0b4654", tx: "#ecfeff", pr: "#2dd4bf", prc: "#042f2e", sw: ["#2dd4bf", "#38bdf8", "#a3e635"] },
  };
  var START_THEME = "ocean";

  // Confettis du LXP : transcription de react-confetti 6.4 (Particle, ParticleGenerator) avec les réglages de
  // module-completion-modal (recycle: false, numberOfPieces: 400, couleurs par défaut). Le hasard est remplacé par un
  // générateur à graine et le temps par des pas fixes de 1/60 s : le rendu ne dépend que de l'instant demandé,
  // ce qui garde le retour arrière et les captures exacts.
  var CONFETTI_COLORS = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548"];
  function makeConfetti(canvas, reduced) {
    var N = 400, SPAWN_MS = 5000, STEP = 1000 / 60, SCALE = 2;
    var ctx = canvas.getContext("2d");
    var W = 0, H = 0, st = null;
    var clock = { t: 0 };
    var seeded = function (seed) {
      return function () {
        seed = (seed + 0x6d2b79f5) | 0;
        var x = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
        return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
      };
    };
    var ease = function (t, b, end, d) {
      var c = end - b;
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t -= 1;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };
    var fresh = function () {
      return { frame: 0, rnd: seeded(2026), parts: [], made: 0, progress: 0 };
    };
    var between = function (r, a, b) {
      return a + r() * (b - a);
    };
    var spawn = function (r) {
      return {
        x: between(r, 0, W),
        y: 0,
        w: between(r, 5, 20),
        h: between(r, 5, 20),
        radius: between(r, 5, 10),
        vx: between(r, -4, 4),
        vy: between(r, -10, 0),
        shape: Math.floor(between(r, 0, 3)),
        angle: (between(r, 0, 360) * Math.PI) / 180,
        spin: between(r, -0.2, 0.2),
        color: CONFETTI_COLORS[Math.floor(r() * CONFETTI_COLORS.length)],
        rotY: between(r, 0, 1),
        dir: 1,
      };
    };
    var advance = function () {
      var r = st.rnd;
      st.progress = Math.min(SPAWN_MS, st.progress + STEP);
      if (st.made < N) {
        var add = Math.round(ease(st.progress, 0, N, SPAWN_MS) - st.made);
        for (var i = 0; i < add; i++) st.parts.push(spawn(r));
        st.made += add;
      }
      for (var k = st.parts.length - 1; k >= 0; k--) {
        var p = st.parts[k];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.vy *= 0.99;
        p.vx *= 0.99;
        if (p.rotY >= 1 && p.dir === 1) p.dir = -1;
        else if (p.rotY <= -1 && p.dir === -1) p.dir = 1;
        p.rotY += 0.1 * p.dir;
        p.angle += p.spin;
        if (p.y > H || p.y < -100 || p.x > W + 100 || p.x < -100) st.parts.splice(k, 1);
      }
      st.frame++;
    };
    var paint = function () {
      ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
      ctx.clearRect(0, 0, W, H);
      st.parts.forEach(function (p) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.scale(1, p.rotY);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        if (p.shape === 0) {
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, 2 * Math.PI);
          ctx.fill();
        } else if (p.shape === 1) ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        else ctx.fillRect(-p.w / 6, -p.h / 2, p.w / 3, p.h);
        ctx.restore();
      });
    };
    return {
      clock: clock,
      draw: function () {
        var w = canvas.parentNode.offsetWidth || 600;
        var h = canvas.offsetHeight || 900;
        if (w !== W || h !== H) {
          W = w;
          H = h;
          canvas.width = W * SCALE;
          canvas.height = H * SCALE;
          st = null;
        }
        var target = reduced ? 0 : Math.round((clock.t * 1000) / STEP);
        if (!st || target < st.frame) st = fresh();
        while (st.frame < target) advance();
        paint();
      },
    };
  }

  Deck.scenes.personalize = function (tl, el) {
    var S = Deck.Stage;
    var fx = Deck.fx;
    var q = function (s) {
      return "#scene-personalize " + s;
    };
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var d = reduced ? 0 : 1;

    S.set(tl, "hidden", 0);
    tl.set(q(".za"), { pointerEvents: "auto" }, 0);
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

    // Pastilles de couleur des thèmes : lues dans la palette (une seule source).
    gsap.utils.toArray(q(".pz-th")).forEach(function (b) {
      var th = THEMES[b.getAttribute("data-theme")];
      if (!th) return;
      b.querySelectorAll(".pz-sw i").forEach(function (dot, i) {
        dot.style.background = th.sw[i];
      });
    });
    // Identité : l'aperçu reprend le nom saisi ; le logo (Step) est une image du HTML.
    var orgName = el.querySelector(".pz-f-nom").textContent.trim();
    el.querySelector(".pz-idname").textContent = orgName;

    // ── Étape 0 : thèmes ──────────────────────────────────────────────────────────────────
    enter("za", 0.9, [".pz-ico", ".pz-desc", ".pz-gh", ".pz-th", ".pz-mock"]);
    chevOn(4.6);
    tl.addLabel("step0", 4.9);

    // ── Étape 1 : identité ────────────────────────────────────────────────────────────────
    chevOff(5.1);
    leave("za", 5.1);
    activate("zb", 5.8);
    enter("zb", 5.8, [".pz-desc", ".pz-lab", ".pz-field", ".pz-drop", ".pz-idprev", ".rfoot"]);
    chevOn(9.4);
    tl.addLabel("step1", 9.7);

    // ── Étape 2 : e-mails ─────────────────────────────────────────────────────────────────
    chevOff(9.9);
    leave("zb", 9.9);
    activate("zc", 10.6);
    enter("zc", 10.6, [".pz-ico", ".pz-model", ".pz-sel", ".pz-mail-prev", ".pz-acts"]);
    chevOn(14.4);
    tl.addLabel("step2", 14.7);

    // ── Étape 3 : félicitations ───────────────────────────────────────────────────────────
    chevOff(14.9);
    leave("zc", 14.9);
    activate("zd", 15.6);
    enter("zd", 15.6, [".pz-ico", ".pz-hist"]);
    fx.ft(tl, q(".pz-modal"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 16.6);
    fx.ft(tl, q(".pz-trophy"), { scale: 0, rotation: -30 }, { scale: 1, rotation: 0, duration: 0.7, ease: "back.out(2.2)" }, 16.9);
    // Confettis : même simulation que react-confetti dans la modale de fin de module (400 pièces, sans recyclage).
    var confetti = makeConfetti(el.querySelector(".pz-confetti"), reduced);
    tl.fromTo(confetti.clock, { t: 0 }, { t: 9, duration: 9, ease: "none", immediateRender: false, onUpdate: confetti.draw }, 16.9);
    fx.ft(tl, q(".pz-msg, .pz-bh, .pz-bdg"), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.09 }, 17.6);
    chevOn(20.6);
    tl.addLabel("step3", 20.9);

    // ── Interactions (hors timeline) ──────────────────────────────────────────────────────
    var hover = function (node, on, off) {
      node.addEventListener("mouseenter", function () {
        if (!reduced) gsap.to(node, Object.assign({ duration: 0.3, ease: "power3.out", overwrite: "auto" }, on));
      });
      node.addEventListener("mouseleave", function () {
        gsap.to(node, Object.assign({ duration: 0.35, ease: "power2.out", overwrite: "auto" }, off));
      });
    };
    var activateOn = function (node, fn) {
      node.addEventListener("click", fn);
      node.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          e.stopPropagation();
          fn();
        }
      });
    };
    var toast = function (node) {
      gsap.killTweensOf(node);
      gsap.fromTo(node, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.35 * d });
      gsap.to(node, { opacity: 0, duration: 0.4 * d, delay: 1.8 * d });
    };

    // Thèmes : un clic applique la palette à l'aperçu (les variables --m-* sont interpolées).
    var mock = el.querySelector(".pz-mock");
    var chips = gsap.utils.toArray(q(".pz-th"));
    var applyTheme = function (id, animate) {
      var th = THEMES[id];
      if (!th) return;
      chips.forEach(function (c) {
        c.classList.toggle("on", c.getAttribute("data-theme") === id);
      });
      var vars = { "--m-bg": th.bg, "--m-card": th.card, "--m-bd": th.bd, "--m-tx": th.tx, "--m-pr": th.pr, "--m-prc": th.prc };
      if (animate && !reduced) gsap.to(mock, Object.assign({ duration: 0.6, ease: "power2.inOut", overwrite: "auto" }, vars));
      else gsap.set(mock, vars);
    };
    applyTheme(START_THEME, false);
    chips.forEach(function (c) {
      hover(c, { y: -3 }, { y: 0 });
      c.addEventListener("click", function () {
        applyTheme(c.getAttribute("data-theme"), true);
      });
    });

    // Identité : « Sauvegarder » confirme, la zone du logo se soulève.
    var drop = el.querySelector(".pz-drop");
    hover(drop, { y: -4, borderColor: "#0369a1" }, { y: 0, borderColor: "" });
    var save = el.querySelector(".pz-save");
    hover(save, { y: -2 }, { y: 0 });
    activateOn(save, function () {
      toast(el.querySelector(".zb .pz-toast"));
    });

    // E-mails : un modèle change l'aperçu et le nom du modèle sélectionné.
    var models = gsap.utils.toArray(q(".pz-model"));
    var prev = el.querySelector(".pz-mail-prev");
    var selName = el.querySelector(".pz-selname");
    var setModel = function (i, animate) {
      models.forEach(function (m, k) {
        m.classList.toggle("on", k === i);
      });
      prev.className = "pz-mail-prev v" + i;
      selName.textContent = models[i].querySelector("span:last-child").textContent;
      if (animate) gsap.fromTo(prev, { opacity: 0.2, y: 14 }, { opacity: 1, y: 0, duration: 0.4 * d, ease: "power2.out", overwrite: "auto" });
    };
    setModel(0, false);
    models.forEach(function (m, i) {
      hover(m, { x: 6 }, { x: 0 });
      m.addEventListener("click", function () {
        setModel(i, true);
      });
    });
    var test = el.querySelector(".pz-test");
    hover(test, { y: -2 }, { y: 0 });
    activateOn(test, function () {
      toast(el.querySelector(".zc .pz-toast"));
    });

    // Félicitations : un badge « restant à obtenir » s'obtient d'un clic (retour à l'état initial à la sortie).
    var todo = el.querySelector(".pz-bdg.todo");
    var gotBox = el.querySelector(".pz-got");
    var todoBox = el.querySelector(".pz-todo-l");
    activateOn(todo, function () {
      if (todo.classList.contains("got")) return;
      todo.classList.remove("todo");
      todo.classList.add("got");
      gotBox.appendChild(todo);
      gsap.fromTo(todo, { scale: 0.4, rotation: -20 }, { scale: 1, rotation: 0, duration: 0.6 * d, ease: "back.out(2.4)" });
    });
    el.addEventListener("scene:leave", function () {
      applyTheme(START_THEME, false);
      setModel(0, false);
      gsap.set(el.querySelectorAll(".pz-toast"), { opacity: 0 });
      if (todo.classList.contains("got")) {
        todo.classList.remove("got");
        todo.classList.add("todo");
        todoBox.appendChild(todo);
        gsap.set(todo, { clearProps: "transform" });
      }
    });
  };
})();
