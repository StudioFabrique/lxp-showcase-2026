/*
 * Moteur du deck : relie le playhead de la timeline `root` (piloté par
 * <hyperframes-slideshow>) aux scènes et à leurs étapes.
 *
 * - Une scène = un `.scene-frame` avec data-composition-id / data-start / data-duration.
 * - data-fragments='[t1,t2,…]' : un temps absolu par étape (PAUSE du script).
 * - Chaque scène possède une timeline GSAP locale avec les labels step0…stepN
 *   (fin de l'étape N). Aller à l'étape suivante = tweenTo(label), revenir = tweenTo
 *   en sens inverse, ce qui rembobine l'animation.
 * - Une scène peut fournir sa propre timeline via Deck.scenes[id] = function (tl, el, api).
 *   Sinon, le constructeur par défaut révèle les éléments [data-step="n"].
 */
(function () {
  var FADE = 0.4;
  var STEP_LEN = 1; // durée locale d'une étape dans le constructeur par défaut
  var REVEAL = 0.9;

  var Deck = (window.Deck = window.Deck || { scenes: {} });
  Deck.nav = nav;
  Deck.cur = function () {
    return current;
  };
  var frames = Array.prototype.slice.call(document.querySelectorAll(".scene-frame"));
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var scenes = frames.map(function (el) {
    var start = parseFloat(el.getAttribute("data-start"));
    var frags = JSON.parse(el.getAttribute("data-fragments") || "[]");
    return {
      el: el,
      id: el.getAttribute("data-composition-id"),
      start: start,
      end: start + parseFloat(el.getAttribute("data-duration")),
      frags: frags,
      steps: Math.max(1, frags.length),
      tl: null,
      active: false,
      step: -1,
    };
  });

  function nav(action) {
    // Le parent (wrapper) traduit ce message en touche clavier sur <hyperframes-slideshow>.
    try {
      parent.postMessage({ source: "lxp-deck", type: "nav", action: action }, "*");
    } catch (e) {
      /* hors iframe : rien à faire */
    }
  }

  function buildTimeline(s) {
    var tl = gsap.timeline({ paused: true });
    var custom = Deck.scenes[s.id];
    if (custom) {
      custom(tl, s.el, { steps: s.steps });
    } else {
      // Scène sans animation dédiée : le calque persistant prend la pose indiquée (masqué par défaut).
      if (Deck.Stage) Deck.Stage.set(tl, s.el.getAttribute("data-stage") || "hidden", 0);
      for (var n = 0; n < s.steps; n++) {
        var els = Array.prototype.slice.call(s.el.querySelectorAll('[data-step="' + n + '"]'));
        // L'étape 0 révèle aussi tout ce qui n'est pas rattaché à une étape.
        if (n === 0) {
          var fixed = s.el.querySelectorAll(".scene-inner > :not([data-step])");
          els = Array.prototype.slice.call(fixed).concat(els);
        }
        if (els.length) {
          tl.fromTo(
            els,
            { opacity: 0, y: 32 },
            { opacity: 1, y: 0, duration: REVEAL, ease: "power3.out", stagger: 0.08 },
            n * STEP_LEN,
          );
        }
      }
    }
    // Un label de fin d'étape par défaut si la scène n'en a pas défini.
    var last = 0;
    for (var k = 0; k < s.steps; k++) {
      if (tl.labels["step" + k] === undefined) tl.addLabel("step" + k, k * STEP_LEN + REVEAL);
      last = Math.max(last, tl.labels["step" + k]);
    }
    // La timeline doit durer au moins jusqu'au dernier label, sinon tweenTo/pause le tronquent.
    if (tl.duration() < last) tl.set({}, {}, last);
    return tl;
  }

  Deck.list = scenes;
  Deck.timelines = { root: null };
  scenes.forEach(function (s) {
    s.tl = buildTimeline(s);
    s.tl.pause(0);
    Deck.timelines[s.id] = s.tl;
  });

  function stepAt(s, t) {
    if (!s.frags.length) return 0;
    var idx = 0;
    for (var i = 0; i < s.frags.length; i++) if (t >= s.frags[i]) idx = i;
    return idx;
  }

  function show(s, animate) {
    s.el.style.visibility = "visible";
    s.el.style.pointerEvents = "auto";
    gsap.killTweensOf(s.el);
    if (animate && !reduced) gsap.to(s.el, { opacity: 1, duration: FADE, ease: "power1.out" });
    else s.el.style.opacity = "1";
  }

  function hide(s, animate) {
    s.el.dispatchEvent(new CustomEvent("scene:leave"));
    s.el.style.pointerEvents = "none";
    gsap.killTweensOf(s.el);
    if (animate && !reduced) {
      gsap.to(s.el, {
        opacity: 0,
        duration: FADE,
        ease: "power1.in",
        onComplete: function () {
          if (!s.active) s.el.style.visibility = "hidden";
        },
      });
    } else {
      s.el.style.opacity = "0";
      s.el.style.visibility = "hidden";
    }
  }

  // Ordre de présentation d'après l'île JSON : décide du sens « avant » ou « arrière » d'un changement
  // de scène (les temps de la timeline ne suivent pas forcément cet ordre).
  var order = {};
  try {
    var island = JSON.parse(document.querySelector('script[type="application/hyperframes-slideshow+json"]').textContent);
    var n = 0;
    island.slides.forEach(function (sl) {
      order[sl.sceneId] = n++;
    });
    island.slideSequences.forEach(function (seq) {
      seq.slides.forEach(function (sl) {
        order[sl.sceneId] = 1000 + n++;
      });
    });
  } catch (e) {
    /* à défaut : ordre des temps */
  }
  function rank(s) {
    return order[s.id] !== undefined ? order[s.id] : s.start;
  }

  var current = null;
  var pending = null; // scène en cours de rembobinage (retour arrière)
  var token = 0;

  function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
  }

  // Aller à l'étape `idx` d'une scène : vers l'avant à la vitesse prévue, vers l'arrière en rembobinage.
  function moveStep(s, idx, animate, jump) {
    var target = "step" + idx;
    gsap.killTweensOf(s.tl);
    if (!animate || reduced) {
      s.tl.pause(0);
      s.tl.pause(target);
      return;
    }
    var delta = s.tl.labels[target] - s.tl.time();
    // Un saut de plusieurs étapes (clic sur la sidebar) se joue plus vite que l'enchaînement normal.
    s.tl.tweenTo(target, {
      duration: jump > 1 ? (delta >= 0 ? 1.4 : 1.0) : delta >= 0 ? clamp(delta, 0.4, 16) : clamp(-delta * 0.45, 0.5, 1.6),
      ease: delta >= 0 ? "none" : "power2.inOut",
    });
  }

  function goTo(s, t, animate) {
    var idx = stepAt(s, t);
    if (current === s) {
      if (idx !== s.step) {
        var from = s.step;
        s.step = idx;
        document.documentElement.setAttribute("data-deck-step", idx);
        moveStep(s, idx, animate, Math.abs(idx - from));
      }
      return;
    }
    // Une navigation en a interrompu une autre : on referme proprement la scène rembobinée.
    if (pending) {
      gsap.killTweensOf(pending.tl);
      hide(pending, false);
      pending = null;
    }
    var prev = current;
    var forward = !prev || rank(s) > rank(prev);
    var my = ++token;
    if (prev) prev.active = false;
    s.active = true;
    current = s;
    s.step = idx;
    document.documentElement.setAttribute("data-scene", s.id);
    document.documentElement.setAttribute("data-deck-step", idx);
    gsap.killTweensOf(s.tl);

    if (!prev) {
      show(s, false);
      s.tl.pause(0);
      s.tl.pause("step" + idx);
    } else if (forward || !animate || reduced) {
      // La scène quittée peut encore être en lecture : elle continuerait d'animer le calque persistant
      // (logo, mention de cofinancement…) par-dessus la nouvelle scène.
      gsap.killTweensOf(prev.tl);
      hide(prev, animate);
      show(s, animate);
      s.tl.pause(0);
      moveStep(s, idx, animate);
    } else {
      // Retour arrière : la scène quittée se rembobine (ses poses reviennent à celles d'avant),
      // puis la scène précédente réapparaît à l'état où on l'avait laissée.
      pending = prev;
      gsap.killTweensOf(prev.tl);
      prev.tl.tweenTo(0, {
        duration: clamp(prev.tl.time() * 0.35, 0.6, 1.5),
        ease: "power2.inOut",
        onComplete: function () {
          if (my !== token) return;
          pending = null;
          hide(prev, false);
          show(s, true);
          // Rendu complet depuis le début : le calque persistant est partagé entre scènes, il faut
          // réappliquer ses poses (une scène voisine a pu les modifier).
          s.tl.pause(0);
          s.tl.pause("step" + idx);
        },
      });
    }
  }

  function update(t, animate) {
    for (var i = 0; i < scenes.length; i++) {
      if (t >= scenes[i].start && t < scenes[i].end) {
        goTo(scenes[i], t, animate);
        return;
      }
    }
  }

  // Timeline racine : plage de lecture sur laquelle le slideshow positionne le playhead.
  var total = scenes.reduce(function (m, s) {
    return Math.max(m, s.end);
  }, 0);
  var root = gsap.timeline({ paused: true });
  root.to({}, { duration: total });
  Deck.timelines.root = root;
  root.eventCallback("onUpdate", function () {
    update(root.time(), true);
  });
  window.__hfSetTime = function (t) {
    update(t, false);
  };

  // Première scène visible immédiatement (pas d'écran blanc avant le premier seek).
  update(0, false);

  // Effets de survol (GSAP, pas de transitions CSS : le player les piloterait comme des animations).
  function cssColor(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }
  function hoverable(el, enter, leave) {
    var hot = false;
    var on = function () {
      if (!hot) enter();
      hot = true;
    };
    var off = function () {
      if (hot) leave();
      hot = false;
    };
    el.addEventListener("mouseenter", on);
    el.addEventListener("mouseleave", off);
    el.addEventListener("focus", function () {
      if (el.matches(":focus-visible")) on();
    });
    el.addEventListener("blur", off);
  }
  if (!reduced) {
    document.querySelectorAll(".chevron").forEach(function (btn) {
      var svg = btn.querySelector("svg");
      var halo = btn.querySelector(".halo");
      hoverable(
        btn,
        function () {
          gsap.to(btn, { scale: 1.25, color: cssColor("--color-secondary"), duration: 0.4, ease: "back.out(2.4)", overwrite: "auto" });
          gsap.to(halo, { opacity: 1, scale: 1, duration: 0.45, ease: "power3.out", overwrite: "auto" });
          gsap.to(svg, { filter: "drop-shadow(0 8px 10px rgba(8,47,73,0.28))", duration: 0.3, overwrite: "auto" });
        },
        function () {
          gsap.to(btn, { scale: 1, color: cssColor("--color-primary"), duration: 0.45, ease: "power3.out", overwrite: "auto" });
          gsap.to(halo, { opacity: 0, scale: 0.6, duration: 0.35, ease: "power2.in", overwrite: "auto" });
          gsap.to(svg, { filter: "drop-shadow(0 0 0 rgba(8,47,73,0))", duration: 0.3, overwrite: "auto" });
        },
      );
      gsap.set(halo, { opacity: 0, scale: 0.6 });
      btn.addEventListener("mousedown", function () {
        gsap.to(btn, { scale: 0.92, duration: 0.12, overwrite: "auto" });
      });
    });
    var msg = document.querySelector(".start-msg");
    if (msg) {
      hoverable(
        msg.parentNode,
        function () {
          gsap.to(msg, { scale: 1.04, color: cssColor("--color-secondary"), duration: 0.45, ease: "back.out(2)", overwrite: "auto" });
        },
        function () {
          gsap.to(msg, { scale: 1, color: cssColor("--color-primary"), duration: 0.45, ease: "power3.out", overwrite: "auto" });
        },
      );
    }
    document.querySelectorAll(".cmp-row").forEach(function (row) {
      var cl = row.querySelector(".c.l");
      var cr = row.querySelector(".c.r");
      var p = cssColor("--color-primary").replace("#", "");
      var rgb = [0, 2, 4].map(function (i) {
        return parseInt(p.substr(i, 2), 16);
      }).join(",");
      hoverable(
        row,
        function () {
          gsap.to(cr, { backgroundColor: "rgba(" + rgb + ",0.12)", x: 6, duration: 0.35, ease: "power3.out", overwrite: "auto" });
          gsap.to(cl, { backgroundColor: "rgba(" + rgb + ",0.05)", duration: 0.35, overwrite: "auto" });
        },
        function () {
          gsap.to(cr, { backgroundColor: "rgba(" + rgb + ",0)", x: 0, duration: 0.4, ease: "power2.out", overwrite: "auto" });
          gsap.to(cl, { backgroundColor: "rgba(" + rgb + ",0)", duration: 0.4, overwrite: "auto" });
        },
      );
    });
    document.querySelectorAll("[data-goto]").forEach(function (item) {
      var ico = item.querySelector(".ico");
      hoverable(
        item,
        function () {
          gsap.to(item, { x: 10, backgroundColor: "rgba(255,255,255,0.16)", duration: 0.3, ease: "power3.out", overwrite: "auto" });
          gsap.to(ico, { scale: 1.14, rotation: -6, duration: 0.4, ease: "back.out(2)", overwrite: "auto" });
        },
        function () {
          gsap.to(item, { x: 0, backgroundColor: "rgba(255,255,255,0)", duration: 0.35, ease: "power2.out", overwrite: "auto" });
          gsap.to(ico, { scale: 1, rotation: 0, duration: 0.35, ease: "power2.out", overwrite: "auto" });
        },
      );
    });
  }

  // Boutons des scènes détaillées : retour à la frise, ouverture de l'instance de démonstration.
  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("[data-back],[data-open]") : null;
    if (!t) return;
    var msg = t.hasAttribute("data-back")
      ? { source: "lxp-deck", type: "back" }
      : { source: "lxp-deck", type: "open", url: t.getAttribute("data-open") };
    try {
      parent.postMessage(msg, "*");
    } catch (err) {
      /* hors iframe */
    }
  });
  if (!reduced) {
    document.querySelectorAll(".btn").forEach(function (btn) {
      var primary = btn.classList.contains("primary");
      var p = cssColor("--color-primary").replace("#", "");
      var rgb = [0, 2, 4].map(function (i) {
        return parseInt(p.substr(i, 2), 16);
      }).join(",");
      hoverable(
        btn,
        function () {
          gsap.to(btn, { y: -3, scale: 1.04, duration: 0.3, ease: "back.out(2)", overwrite: "auto" });
          if (!primary) gsap.to(btn, { backgroundColor: "rgba(" + rgb + ",0.08)", duration: 0.25 });
        },
        function () {
          gsap.to(btn, { y: 0, scale: 1, duration: 0.35, ease: "power3.out", overwrite: "auto" });
          if (!primary) gsap.to(btn, { backgroundColor: "rgba(255,255,255,1)", duration: 0.25 });
        },
      );
    });
  }

  // Un clic sur une entrée de la sidebar demande au parent d'aller à la PAUSE correspondante.
  document.addEventListener("click", function (e) {
    var g = e.target.closest ? e.target.closest("[data-goto]") : null;
    if (!g) return;
    try {
      parent.postMessage({ source: "lxp-deck", type: "goto", scene: g.getAttribute("data-scene"), fragment: +g.getAttribute("data-goto") }, "*");
    } catch (err) {
      /* hors iframe */
    }
  });

  // Clignotements continus. Le player pilote les animations CSS en les figeant sur le temps de la
  // timeline : un `@keyframes` infini resterait immobile. On utilise donc des tweens GSAP autonomes.
  if (!reduced) {
    gsap.fromTo(".start-msg", { opacity: 1 }, { opacity: 0.12, duration: 0.85, ease: "sine.inOut", repeat: -1, yoyo: true });
    gsap.fromTo(".chevron:not(.side) svg", { opacity: 0.3, y: -6 }, { opacity: 1, y: 8, duration: 0.75, ease: "sine.inOut", repeat: -1, yoyo: true });
    gsap.fromTo(".chevron.side svg", { opacity: 0.3, x: -6 }, { opacity: 1, x: 8, duration: 0.75, ease: "sine.inOut", repeat: -1, yoyo: true });
  }

  // Écran de départ : n'importe quelle touche lance la présentation (les touches de navigation
  // sont déjà gérées par le contrôleur, les combinaisons avec Ctrl/Cmd/Alt sont laissées au navigateur).
  var NAV_KEYS = ["ArrowRight", "ArrowLeft", " ", "Backspace", "p", "P", "g", "G", "Escape", "Shift", "Control", "Alt", "Meta"];
  // Plan de la présentation : G (ouvrir / fermer) et Échap sont relayés à la page parente (ui/nav.js).
  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === "g" || e.key === "G") parent.postMessage({ source: "lxp-deck", type: "grid", action: "toggle" }, "*");
    else if (e.key === "Escape") parent.postMessage({ source: "lxp-deck", type: "grid", action: "close" }, "*");
  });
  document.addEventListener("keydown", function (e) {
    if (!current || current.id !== "start" || e.ctrlKey || e.metaKey || e.altKey) return;
    if (NAV_KEYS.indexOf(e.key) !== -1) return;
    nav("next");
  });

  // Éléments qui avancent d'une étape au clic : chevron, ligne de la frise…
  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("[data-next]") : null;
    if (t) nav("next");
  });

  // Manifeste des scènes pour <hyperframes-slideshow> (inclut les branches).
  function postTimeline() {
    parent.postMessage(
      {
        source: "hf-preview",
        type: "timeline",
        durationInFrames: Math.round(total * 30),
        scenes: scenes.map(function (s) {
          return { id: s.id, start: s.start, duration: s.end - s.start };
        }),
      },
      "*",
    );
  }
  if (document.readyState === "complete") setTimeout(postTimeline, 300);
  else window.addEventListener("load", function () { setTimeout(postTimeline, 300); });
})();
