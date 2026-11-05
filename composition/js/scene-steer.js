/* Scène détaillée « Piloter » (jalon 7). Quatre PAUSES :
   0 la consommation de l'IA (total de tokens, par promotion, plus gros consommateurs)
   1 le classement des cours, d'après les retours des apprenants
   2 l'import de cours Moodle et de parcours
   3 un tableau de bord par rôle (apprenant, équipe pédagogique) : barre latérale et cartes de l'application.
   Libellés repris du LXP (dashboard-ia, dashboard-admin, CourseImport). Données fictives.
   Tous les textes viennent de content/scenes/steer.json (Content.*). */
(function () {
  var Deck = (window.Deck = window.Deck || { scenes: {} });
  var P = 1800;

  Deck.scenes.steer = function (tl, el) {
    var S = Deck.Stage;
    var fx = Deck.fx;
    var q = function (s) {
      return "#scene-steer " + s;
    };
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var d = reduced ? 0 : 1;

    S.set(tl, "hidden", 0);
    tl.set(q(".ua"), { pointerEvents: "auto" }, 0);
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
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.07 },
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

    // Données lues dans le JSON : part de chaque promotion (barres), nombre d'étoiles de chaque cours.
    var parts = [0, 1].map(function (i) {
      return Content.get("steer.ia.carte.promotions.items." + i + ".part") || 0;
    });
    var courses = gsap.utils.toArray(q(".pi-course"));
    courses.forEach(function (c) {
      var note = parseFloat(c.querySelector(".pi-note b").textContent.replace(",", ".")) || 0;
      c.querySelectorAll(".pi-stars svg").forEach(function (s, i) {
        s.classList.toggle("on", i < Math.round(note));
      });
    });

    // ── Étape 0 : consommation de l'IA ────────────────────────────────────────────────────
    enter("ua", 0.9, [".pi-total", ".pi-h", ".pi-promo", ".pi-thead", ".pi-trow"]);
    fx.ft(tl, q(".pi-ico"), { scale: 0, rotation: -40 }, { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(2)" }, 1.8);
    var bars = gsap.utils.toArray(q(".pi-promo .pi-bar i"));
    parts.forEach(function (p, i) {
      fx.ft(tl, bars[i], { width: "0%" }, { width: p + "%", duration: 1.2, ease: "power3.out" }, 2.6 + i * 0.25);
    });
    // Le total monte jusqu'à sa valeur (seulement si le texte est un nombre simple).
    var totalEl = el.querySelector(".pi-total strong");
    var totalTxt = totalEl.textContent;
    var totalNum = /^[\d\s  ]+$/.test(totalTxt) ? parseInt(totalTxt.replace(/\D/g, ""), 10) : 0;
    if (totalNum) {
      var counter = { v: 0 };
      var fmt = function (n) {
        return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      };
      tl.fromTo(
        counter,
        { v: 0 },
        {
          v: totalNum,
          duration: 1.4,
          ease: "power2.out",
          immediateRender: false,
          onUpdate: function () {
            totalEl.textContent = counter.v >= totalNum ? totalTxt : fmt(counter.v);
          },
        },
        1.9,
      );
    }
    chevOn(5.0);
    tl.addLabel("step0", 5.3);

    // ── Étape 1 : classement des cours ────────────────────────────────────────────────────
    chevOff(5.5);
    leave("ua", 5.5);
    activate("ub", 6.2);
    enter("ub", 6.2, [".pi-course:not(.pi-extra)", ".rfoot"]);
    fx.ft(tl, q(".pi-course:not(.pi-extra) .pi-stars svg"), { scale: 0, rotation: -60 }, { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(2.4)", stagger: 0.04 }, 7.6);
    chevOn(9.6);
    tl.addLabel("step1", 9.9);

    // ── Étape 2 : import ──────────────────────────────────────────────────────────────────
    chevOff(10.1);
    leave("ub", 10.1);
    activate("uc", 10.8);
    enter("uc", 10.8, [".pi-imp"]);
    fx.ft(tl, q(".pi-impico"), { scale: 0, rotation: -30 }, { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(2)", stagger: 0.15 }, 12.2);
    chevOn(14.2);
    tl.addLabel("step2", 14.5);

    // ── Étape 3 : un tableau de bord par rôle ─────────────────────────────────────────────
    chevOff(14.7);
    leave("uc", 14.7);
    activate("ud", 15.4);
    enter("ud", 15.4, [".pi-tab"]);
    // Construction du tableau de bord (séquence « dashboards » du dépôt lxp) : la barre latérale arrive en verre
    // puis se solidifie, les cartes se posent l'une après l'autre ; un curseur change ensuite de rôle.
    var ud = el.querySelector(".ud");
    var tabs = gsap.utils.toArray(q(".pi-tab"));
    var faces = gsap.utils.toArray(q(".pi-face"));
    var navs = gsap.utils.toArray(q(".pi-nav"));
    var cursor = el.querySelector(".pi-cursor");
    var ring = el.querySelector(".pi-ring");
    var rs = getComputedStyle(document.documentElement);
    var CP = rs.getPropertyValue("--color-primary").trim();
    var CB = rs.getPropertyValue("--color-base-100").trim();
    var CT = rs.getPropertyValue("--color-base-content").trim();
    var CL = rs.getPropertyValue("--color-base-300").trim();
    var tabOn = { backgroundColor: CP, borderColor: CP, color: "#ffffff" };
    var tabOff = { backgroundColor: CB, borderColor: CL, color: CT };
    var pos = function (node, fx0, fy0) {
      var x = 0;
      var y = 0;
      var n = node;
      while (n && n !== ud) {
        x += n.offsetLeft;
        y += n.offsetTop;
        n = n.offsetParent;
      }
      return { x: x + node.offsetWidth * fx0, y: y + node.offsetHeight * fy0 };
    };
    // État initial : le rôle « Apprenant » est affiché.
    tl.set(tabs[0], tabOn, 0);
    tl.set(tabs[1], tabOff, 0);
    tl.set(faces[1], { opacity: 0, pointerEvents: "none" }, 0);
    tl.set(navs[1], { opacity: 0 }, 0);
    // 1. Barre latérale : verre en vol, puis solide ; les entrées apparaissent.
    fx.ft(tl, q(".pi-side"), { opacity: 0, x: -24, y: -30, z: 520, rotation: -8, transformPerspective: P }, { opacity: 1, x: 0, y: 0, z: 40, rotation: 0, duration: 1.0, ease: "back.out(1.2)" }, 16.4);
    fx.ft(tl, q(".pi-glass"), { opacity: 1 }, { opacity: 0, duration: 1.1, ease: "sine.inOut" }, 17.3);
    fx.ft(tl, q(".pi-nav.on small, .pi-nav.on li"), { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.4, ease: "sine.out", stagger: 0.07 }, 17.6);
    // 2. Cartes du tableau de bord : elles se posent en profondeur.
    fx.ft(tl, q(".pi-face:first-child .pi-head"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 17.2);
    fx.drop(tl, q(".pi-face:first-child .pi-c"), 17.5, { z0: 420, turn: 8, stagger: 0.14, dur: 0.75 });
    // 3. Un curseur clique sur « Équipe pédagogique » : la navigation et les cartes changent.
    var tip = function (pt) {
      return { x: pt.x - 3.6, y: pt.y - 2.3 };
    };
    var T1 = pos(tabs[1], 0.5, 0.55);
    var T0 = { x: T1.x + 120, y: T1.y + 150 };
    fx.ft(tl, cursor, { opacity: 0, x: tip(T0).x, y: tip(T0).y, scale: 1 }, { opacity: 1, x: tip(T1).x, y: tip(T1).y, duration: 0.8, ease: "power2.inOut" }, 19.2);
    tl.to(cursor, { scale: 0.9, duration: 0.1 }, 20.1);
    tl.to(cursor, { scale: 1, duration: 0.16 }, 20.2);
    fx.ft(tl, ring, { x: T1.x - 22, y: T1.y - 22, scale: 0.35, opacity: 0.6 }, { x: T1.x - 22, y: T1.y - 22, scale: 1.4, opacity: 0, duration: 0.45 }, 20.1);
    tl.to(cursor, { opacity: 0, duration: 0.3 }, 20.6);
    tl.to(tabs[0], Object.assign({ duration: 0.25 }, tabOff), 20.1);
    tl.to(tabs[1], Object.assign({ duration: 0.25 }, tabOn), 20.1);
    tl.to(faces[0], { opacity: 0, duration: 0.3 }, 20.1);
    tl.set(faces[0], { pointerEvents: "none" }, 20.1);
    tl.to(navs[0], { opacity: 0, duration: 0.3 }, 20.1);
    tl.to(navs[1], { opacity: 1, duration: 0.3 }, 20.35);
    tl.to(faces[1], { opacity: 1, duration: 0.2 }, 20.4);
    tl.set(faces[1], { pointerEvents: "auto" }, 20.4);
    fx.ft(tl, q(".pi-face:last-child .pi-head"), { y: 24 }, { y: 0, duration: 0.5, ease: "power3.out" }, 20.4);
    fx.drop(tl, q(".pi-face:last-child .pi-c"), 20.5, { z0: 420, turn: 8, stagger: 0.12, dur: 0.7 });
    fx.ft(tl, q(".pi-nav:last-child li"), { x: -14 }, { x: 0, duration: 0.4, ease: "sine.out", stagger: 0.06 }, 20.5);
    chevOn(22.4);
    tl.addLabel("step3", 22.7);

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

    // Promotions : un clic met une promotion en avant (l'autre s'estompe), un second clic annule.
    var promos = gsap.utils.toArray(q(".pi-promo"));
    var selPromo = -1;
    var renderPromos = function () {
      promos.forEach(function (p, i) {
        p.classList.toggle("on", i === selPromo);
        // Les enfants portent l'estompage : le conteneur est déjà animé par la timeline (apparition).
        gsap.to(p.children, { opacity: selPromo < 0 || i === selPromo ? 1 : 0.45, duration: 0.3 * d, overwrite: "auto" });
      });
    };
    promos.forEach(function (p, i) {
      activateOn(p, function () {
        selPromo = selPromo === i ? -1 : i;
        renderPromos();
      });
    });
    gsap.utils.toArray(q(".pi-trow")).forEach(function (r) {
      hover(r, { x: 8 }, { x: 0 });
    });

    // Classement : survol des lignes, « Afficher plus / moins ».
    courses.forEach(function (c) {
      hover(c, { scale: 1.02 }, { scale: 1 });
    });
    var extras = gsap.utils.toArray(q(".pi-course.pi-extra"));
    var more = el.querySelector(".pi-more");
    var expanded = false;
    var setMore = function (on) {
      expanded = on;
      more.textContent = Content.text(on ? "steer.classement.carte.moins" : "steer.classement.carte.plus");
      extras.forEach(function (c, i) {
        c.classList.toggle("open", on);
        if (on) gsap.fromTo(c, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.45 * d, delay: 0.08 * i * d, ease: "power2.out", overwrite: "auto" });
      });
    };
    activateOn(more, function () {
      setMore(!expanded);
    });

    // Import : le bouton lance une progression, puis le résultat s'affiche. Un nouveau clic recommence.
    var imps = gsap.utils.toArray(q(".pi-imp"));
    var impTl = [];
    var resetImp = function (i) {
      if (impTl[i]) impTl[i].kill();
      var imp = imps[i];
      gsap.set(imp.querySelector(".pi-prog"), { opacity: 0 });
      gsap.set(imp.querySelector(".pi-prog i"), { width: "0%" });
      var st = imp.querySelector(".pi-state");
      st.textContent = "";
      st.classList.remove("done");
    };
    imps.forEach(function (imp, i) {
      var btn = imp.querySelector(".pi-impbtn");
      activateOn(btn, function () {
        resetImp(i);
        var st = imp.querySelector(".pi-state");
        st.textContent = Content.text("steer.import.carte.options." + i + ".encours");
        var t2 = gsap.timeline();
        impTl[i] = t2;
        t2.to(imp.querySelector(".pi-prog"), { opacity: 1, duration: 0.2 * d });
        t2.to(imp.querySelector(".pi-prog i"), { width: "100%", duration: 1.6 * d, ease: "power1.inOut" });
        t2.add(function () {
          st.textContent = Content.text("steer.import.carte.options." + i + ".termine");
          st.classList.add("done");
        });
        t2.fromTo(st, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35 * d });
      });
    });

    // Rôles : un onglet affiche la navigation et les cartes du rôle.
    var cur = 0;
    var showRole = function (i, animate) {
      gsap.killTweensOf(tabs.concat(faces, navs));
      tabs.forEach(function (t, k) {
        gsap.set(t, k === i ? tabOn : tabOff);
      });
      faces.forEach(function (f, k) {
        gsap.set(f, { opacity: k === i ? 1 : 0, pointerEvents: k === i ? "auto" : "none" });
      });
      navs.forEach(function (n, k) {
        gsap.set(n, { opacity: k === i ? 1 : 0 });
      });
      if (animate && i !== cur) {
        gsap.fromTo(faces[i].querySelectorAll(".pi-head, .pi-c"), { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.5 * d, stagger: 0.08 * d, ease: "power3.out", overwrite: "auto" });
        gsap.fromTo(navs[i].querySelectorAll("li"), { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.35 * d, stagger: 0.05 * d, overwrite: "auto" });
      }
      cur = i;
    };
    tabs.forEach(function (t, i) {
      hover(t, { y: -3 }, { y: 0 });
      t.addEventListener("click", function () {
        showRole(i, true);
      });
    });
    faces.forEach(function (f) {
      f.querySelectorAll(".pi-c").forEach(function (c) {
        hover(c, { y: -6 }, { y: 0 });
      });
    });

    el.addEventListener("scene:leave", function () {
      selPromo = -1;
      renderPromos();
      setMore(false);
      imps.forEach(function (_, i) {
        resetImp(i);
      });
      showRole(0, false);
    });
  };
})();
