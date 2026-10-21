/* Scène détaillée « Piloter » (jalon 7). Quatre PAUSES :
   0 la consommation de l'IA (total de tokens, par promotion, plus gros consommateurs)
   1 le classement des cours, d'après les retours des apprenants
   2 l'import de cours Moodle et de parcours
   3 un tableau de bord par rôle (apprenant, équipe pédagogique, administrateur).
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
    enter("ud", 15.4, [".pi-tab", ".pi-panel.on .pi-hello", ".pi-panel.on .pi-tile"]);
    chevOn(18.6);
    tl.addLabel("step3", 18.9);

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

    // Rôles : un onglet affiche le tableau de bord du rôle.
    var tabs = gsap.utils.toArray(q(".pi-tab"));
    var panels = gsap.utils.toArray(q(".pi-panel"));
    var cur = 0;
    var showRole = function (i, animate) {
      tabs.forEach(function (t, k) {
        t.classList.toggle("on", k === i);
      });
      panels.forEach(function (p, k) {
        p.classList.toggle("on", k === i);
        if (k !== i) gsap.set(p, { clearProps: "opacity" });
      });
      if (animate && i !== cur) {
        gsap.fromTo(panels[i].querySelectorAll(".pi-hello, .pi-tile"), { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.5 * d, stagger: 0.08 * d, ease: "power3.out", overwrite: "auto" });
      }
      cur = i;
    };
    tabs.forEach(function (t, i) {
      hover(t, { y: -3 }, { y: 0 });
      t.addEventListener("click", function () {
        showRole(i, true);
      });
    });
    panels.forEach(function (p) {
      p.querySelectorAll(".pi-tile").forEach(function (t) {
        hover(t, { y: -8 }, { y: 0 });
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
      gsap.set(panels[0].querySelectorAll(".pi-hello, .pi-tile"), { clearProps: "opacity,transform" });
    });
  };
})();
