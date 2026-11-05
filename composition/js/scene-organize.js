/* Scène détaillée « Organiser » (jalon 5). Quatre PAUSES, une par outil :
   0 le calendrier d'un parcours (cours, devoirs, modules)
   1 la médiathèque (images, vidéos, audios, ressources)
   2 les groupes, rattachés à un parcours et à ses formateurs
   3 les tags.
   Libellés repris du LXP (calendar, mediatheque, group, tags). Données fictives. */
(function () {
  var Deck = (window.Deck = window.Deck || { scenes: {} });
  var P = 1800;

  Deck.scenes.organize = function (tl, el) {
    var S = Deck.Stage;
    var fx = Deck.fx;
    var q = function (s) {
      return "#scene-organize " + s;
    };
    var reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var d = reduced ? 0 : 1;
    var tok = function (n) {
      return getComputedStyle(document.documentElement)
        .getPropertyValue(n)
        .trim();
    };
    var C = {
      line: tok("--color-base-300"),
      base: tok("--color-base-100"),
      pri: tok("--color-primary"),
    };
    var rgb = [1, 3, 5]
      .map(function (i) {
        return parseInt(C.pri.substr(i, 2), 16);
      })
      .join(",");

    S.set(tl, "hidden", 0);
    tl.set(q(".oa"), { pointerEvents: "auto" }, 0);
    fx.ft(
      tl,
      q(".bar"),
      { opacity: 0, y: -24 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      0,
    );

    // Entrée d'un outil : le texte monte, la carte arrive en pivotant, puis le contenu se pose ligne à ligne.
    var enter = function (cls, t, rows) {
      var s = q("." + cls);
      fx.ft(
        tl,
        s + " .h1",
        {
          opacity: 0,
          y: 60,
          rotationX: -24,
          transformPerspective: P,
          transformOrigin: "50% 100%",
        },
        { opacity: 1, y: 0, rotationX: 0, duration: 0.9, ease: "power3.out" },
        t + 0.25,
      );
      fx.ft(
        tl,
        s + " .lede",
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        t + 0.7,
      );
      fx.ft(
        tl,
        s + " .ogc",
        { opacity: 0, x: 140, rotationY: 26, transformPerspective: P },
        { opacity: 1, x: 0, rotationY: 0, duration: 1.0, ease: "power3.out" },
        t,
      );
      fx.ft(
        tl,
        s + " .ch, " + s + " .mtabs",
        { opacity: 0, y: -14 },
        { opacity: 1, y: 0, duration: 0.4 },
        t + 0.8,
      );
      fx.ft(
        tl,
        rows
          .map(function (r) {
            return s + " " + r;
          })
          .join(", "),
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
          stagger: 0.045,
        },
        t + 1.2,
      );
    };
    var leave = function (cls, t) {
      var s = q("." + cls);
      tl.set(s, { pointerEvents: "none" }, t);
      fx.ft(
        tl,
        s + " .og-text",
        { opacity: 1, x: 0, rotationY: 0, transformPerspective: P },
        {
          opacity: 0,
          x: -180,
          rotationY: 38,
          duration: 0.7,
          ease: "power2.in",
        },
        t,
      );
      fx.ft(
        tl,
        s + " .ogc",
        { opacity: 1, x: 0, rotationY: 0 },
        {
          opacity: 0,
          x: 180,
          rotationY: -30,
          duration: 0.7,
          ease: "power2.in",
        },
        t,
      );
    };
    var chevOn = function (t) {
      fx.ft(
        tl,
        q(".chevron.mini"),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4 },
        t,
      );
      tl.set(q(".chevron.mini"), { pointerEvents: "auto" }, t);
    };
    var chevOff = function (t) {
      fx.ft(
        tl,
        q(".chevron.mini"),
        { opacity: 1 },
        { opacity: 0, duration: 0.2 },
        t,
      );
      tl.set(q(".chevron.mini"), { pointerEvents: "none" }, t);
    };
    var activate = function (cls, t) {
      fx.ft(tl, q("." + cls), { opacity: 0 }, { opacity: 1, duration: 0.2 }, t);
      tl.set(q("." + cls), { pointerEvents: "auto" }, t);
    };

    // ── Étape 0 : calendrier ──────────────────────────────────────────────────────────────
    enter("oa", 0.9, [".wk", ".day"]);
    fx.ft(
      tl,
      q(".lg"),
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(2)",
        stagger: 0.08,
      },
      1.9,
    );
    fx.ft(
      tl,
      q(".ev"),
      { scale: 0.6, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(2.4)",
        stagger: 0.12,
      },
      3.0,
    );
    // La journée du jour prend la lumière.
    fx.ft(
      tl,
      q(".day.today"),
      { scale: 1 },
      {
        scale: 1.06,
        duration: 0.35,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1,
      },
      4.1,
    );
    chevOn(5.0);
    tl.addLabel("step0", 5.3);

    // ── Étape 1 : médiathèque ─────────────────────────────────────────────────────────────
    chevOff(5.5);
    leave("oa", 5.5);
    activate("ob", 6.2);
    enter("ob", 6.2, [".sorts", ".mhead", ".mlist.on .mrow2"]);
    fx.ft(
      tl,
      q(".tab"),
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
      7.0,
    );
    chevOn(10.4);
    tl.addLabel("step1", 10.7);

    // ── Étape 2 : groupes et formateurs ───────────────────────────────────────────────────
    chevOff(10.9);
    leave("ob", 10.9);
    activate("oc", 11.6);
    enter("oc", 11.6, [".ghead", ".grow"]);
    fx.ft(
      tl,
      q(".ginfo"),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      13.2,
    );
    chevOn(15.8);
    tl.addLabel("step2", 16.1);

    // ── Étape 3 : tags ────────────────────────────────────────────────────────────────────
    chevOff(16.3);
    leave("oc", 16.3);
    activate("od", 17.0);
    enter("od", 17.0, [".thead", ".trow"]);
    fx.ft(tl, q(".thint"), { opacity: 0 }, { opacity: 1, duration: 0.5 }, 18.6);
    chevOn(20.2);
    tl.addLabel("step3", 20.5);

    // ── Interactions (hors timeline) ──────────────────────────────────────────────────────
    var hover = function (node, on, off) {
      node.addEventListener("mouseenter", function () {
        if (!reduced)
          gsap.to(
            node,
            Object.assign(
              { duration: 0.3, ease: "power3.out", overwrite: "auto" },
              on,
            ),
          );
      });
      node.addEventListener("mouseleave", function () {
        gsap.to(
          node,
          Object.assign(
            { duration: 0.35, ease: "power2.out", overwrite: "auto" },
            off,
          ),
        );
      });
    };

    // Calendrier : la légende filtre les types d'événement ; un événement ouvre ses détails.
    var evs = gsap.utils.toArray(q(".ev"));
    var lgs = gsap.utils.toArray(q(".lg"));
    var off = {};
    lgs.forEach(function (b) {
      hover(b, { y: -3 }, { y: 0 });
      b.addEventListener("click", function () {
        var k = b.getAttribute("data-k");
        off[k] = !off[k];
        gsap.to(b, {
          opacity: off[k] ? 0.45 : 1,
          duration: 0.25,
          overwrite: "auto",
        });
        evs.forEach(function (e) {
          if (e.getAttribute("data-k") === k)
            gsap.to(e, {
              opacity: off[k] ? 0 : 1,
              scale: off[k] ? 0.6 : 1,
              duration: 0.3 * d,
              ease: "power2.out",
              overwrite: "auto",
            });
        });
      });
    });
    var evd = el.querySelector(".evd");
    var sel = null;
    evs.forEach(function (e) {
      hover(e, { scale: 1.06 }, { scale: 1 });
      e.addEventListener("click", function () {
        sel = e;
        evd.querySelector("small").textContent =
          e.getAttribute("data-t") + " - " + e.getAttribute("data-d");
        evd.querySelector("b").textContent = e.getAttribute("data-n");
        gsap.fromTo(
          evd,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4 * d,
            ease: "power3.out",
            overwrite: "auto",
          },
        );
      });
    });

    // Médiathèque : onglets par type de média, tri des fichiers.
    var tabs = gsap.utils.toArray(q(".tab"));
    var lists = gsap.utils.toArray(q(".mlist"));
    var sorts = gsap.utils.toArray(q(".sort"));
    var sortKey = "date";
    var sortList = function (list, animate) {
      var rows = gsap.utils.toArray(list.querySelectorAll(".mrow2"));
      rows.sort(function (a, b) {
        var ka = Number(a.getAttribute("data-" + sortKey));
        var kb = Number(b.getAttribute("data-" + sortKey));
        // Date : la plus récente d'abord (valeur la plus grande) ; taille et usage : du plus grand au plus petit.
        return kb - ka;
      });
      rows.forEach(function (r) {
        list.appendChild(r);
      });
      if (animate)
        gsap.fromTo(
          rows,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35 * d,
            stagger: 0.05 * d,
            overwrite: "auto",
          },
        );
    };
    var showList = function (name) {
      tabs.forEach(function (t) {
        t.classList.toggle("on", t.getAttribute("data-p") === name);
      });
      lists.forEach(function (l) {
        var on = l.getAttribute("data-p") === name;
        gsap.killTweensOf(l);
        l.classList.toggle("on", on);
        if (on) {
          sortList(l, false);
          gsap.fromTo(
            l,
            { opacity: 0, x: 40 * d },
            { opacity: 1, x: 0, duration: 0.4 * d, ease: "power3.out" },
          );
        } else gsap.set(l, { opacity: 0, x: 0 });
      });
    };
    tabs.forEach(function (t) {
      hover(t, { y: -3 }, { y: 0 });
      t.addEventListener("click", function () {
        showList(t.getAttribute("data-p"));
      });
    });
    sorts.forEach(function (s) {
      hover(s, { y: -3 }, { y: 0 });
      s.addEventListener("click", function () {
        sortKey = s.getAttribute("data-k");
        sorts.forEach(function (o) {
          o.classList.toggle("on", o === s);
        });
        sortList(el.querySelector(".mlist.on"), true);
      });
    });

    // Groupes : un clic sur un groupe affiche son parcours et ses formateurs.
    var rowsG = gsap.utils.toArray(q(".grow"));
    var ginfo = el.querySelector(".ginfo");
    var showGroup = function (r, animate) {
      rowsG.forEach(function (o) {
        o.classList.toggle("on", o === r);
      });
      ginfo.querySelector(".gp").textContent = r.getAttribute("data-p");
      ginfo.querySelector(".gt").innerHTML = r
        .getAttribute("data-t")
        .split(", ")
        .map(function (t) {
          return "<span>" + t + "</span>";
        })
        .join("");
      if (animate)
        gsap.fromTo(
          ginfo.querySelectorAll("p, em"),
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35 * d,
            stagger: 0.08 * d,
            overwrite: "auto",
          },
        );
    };
    showGroup(rowsG[0], false);
    rowsG.forEach(function (r) {
      hover(r, { x: 6 }, { x: 0 });
      r.addEventListener("click", function () {
        showGroup(r, true);
      });
    });

    // Tags : « Ajouter un tag » crée le tag suivant (exemples du LXP) ; × le supprime.
    var tbody = el.querySelector(".tbody");
    var queue = Content.get("organize.tags.carte.suggestions").map(
      function (t) {
        return [t.nom, t.usage, t.parcours];
      },
    );
    var esc = function (t) {
      return String(t)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    };
    var queueStart = queue.slice();
    var tagStart = tbody.innerHTML;
    var bindDel = function (btn) {
      hover(btn, { scale: 1.2, color: "#ef4444" }, { scale: 1, color: "" });
      btn.addEventListener("click", function () {
        var row = btn.parentNode;
        gsap.to(row, {
          opacity: 0,
          x: 60 * d,
          duration: 0.3 * d,
          onComplete: function () {
            if (row.parentNode) row.parentNode.removeChild(row);
          },
        });
      });
    };
    gsap.utils.toArray(q(".tdel")).forEach(bindDel);
    var addBtn = el.querySelector(".addtag");
    addBtn.addEventListener("click", function () {
      if (!queue.length) return;
      var t = queue.shift();
      var row = document.createElement("div");
      row.className = "trow";
      row.innerHTML =
        '<span class="tt"><i></i></span><span>' +
        esc(t[1]) +
        "</span><span>" +
        esc(t[2]) +
        '</span><button type="button" class="tdel" aria-label="' +
        esc(Content.text("organize.tags.carte.supprimer")) +
        '">×</button>';
      row.querySelector(".tt").appendChild(document.createTextNode(t[0]));
      tbody.insertBefore(row, tbody.firstChild);
      bindDel(row.querySelector(".tdel"));
      gsap.fromTo(
        row,
        { opacity: 0, y: -24, backgroundColor: "rgba(" + rgb + ",0.16)" },
        {
          opacity: 1,
          y: 0,
          backgroundColor: C.base,
          duration: 0.6 * d,
          ease: "back.out(1.6)",
        },
      );
      if (!queue.length) gsap.to(addBtn, { opacity: 0.5, duration: 0.3 });
    });

    el.addEventListener("scene:leave", function () {
      off = {};
      lgs.forEach(function (b) {
        gsap.set(b, { opacity: 1 });
      });
      evs.forEach(function (e) {
        gsap.set(e, { opacity: 1, scale: 1 });
      });
      gsap.set(evd, { opacity: 0 });
      sortKey = "date";
      sorts.forEach(function (o) {
        o.classList.toggle("on", o.getAttribute("data-k") === "date");
      });
      showList("images");
      showGroup(rowsG[0], false);
      queue = queueStart.slice();
      tbody.innerHTML = tagStart;
      gsap.utils.toArray(q(".tdel")).forEach(bindDel);
      gsap.set(addBtn, { opacity: 1 });
    });
    showList("images");
  };
})();
