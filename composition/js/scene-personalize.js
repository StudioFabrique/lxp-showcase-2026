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

    // Pastilles de couleur des thèmes : lues dans la palette (une seule source).
    gsap.utils.toArray(q(".pz-th")).forEach(function (b) {
      var th = THEMES[b.getAttribute("data-theme")];
      if (!th) return;
      b.querySelectorAll(".pz-sw i").forEach(function (dot, i) {
        dot.style.background = th.sw[i];
      });
    });
    // Identité : l'aperçu reprend le nom saisi.
    var orgName = el.querySelector(".pz-f-nom").textContent.trim();
    el.querySelector(".pz-idname").textContent = orgName;
    el.querySelector(".pz-idlogo").textContent = orgName.charAt(0).toUpperCase();
    el.querySelector(".pz-brand").textContent = orgName;

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
    fx.ft(tl, q(".pz-cf"), { opacity: 0, y: -140 }, { opacity: 1, y: 0, duration: 1.4, ease: "bounce.out", stagger: 0.04 }, 17.1);
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
    hover(el.querySelector(".pz-edit"), { y: -2 }, { y: 0 });
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
