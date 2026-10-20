/* Scène détaillée « Créer du contenu » (jalon 2). Deux PAUSES :
   0 un parcours en six niveaux (pile de plaques 3D, comme les niveaux du LXP)
   1 un éditeur riche et six types d'activité. */
(function () {
  var Deck = (window.Deck = window.Deck || { scenes: {} });
  var P = 1800;

  Deck.scenes.content = function (tl, el) {
    var S = Deck.Stage;
    var fx = Deck.fx;
    var q = function (s) {
      return "#scene-content " + s;
    };
    var rise = function (target, at, dur) {
      fx.ft(tl, target, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: dur || 0.7, ease: "power3.out" }, at);
    };
    var plates = gsap.utils.toArray(q(".slab.lv"));
    var rails = gsap.utils.toArray(q(".rail li"));
    var rows = gsap.utils.toArray(q(".pal"));
    S.set(tl, "hidden", 0);
    tl.set(q(".ca"), { pointerEvents: "auto" }, 0);

    fx.ft(tl, q(".bar"), { opacity: 0, y: -24 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0);

    // ── Étape 0 : six niveaux ─────────────────────────────────────────────────────────────
    rise(q(".ca .badge"), 0.3);
    fx.ft(
      tl,
      q(".ca .h1"),
      { opacity: 0, y: 60, rotationX: -24, transformPerspective: P, transformOrigin: "50% 100%" },
      { opacity: 1, y: 0, rotationX: 0, duration: 0.9, ease: "power3.out" },
      0.5,
    );
    rise(q(".ca .lede"), 1.0);
    fx.ft(
      tl,
      q(".stack6"),
      { rotationX: 70, rotation: -40, scale: 0.62, x: -60, y: 40, transformPerspective: P },
      { rotationX: 54, rotation: -12, scale: 0.8, x: -80, y: 30, duration: 1.6, ease: "power3.out" },
      0.6,
    );
    fx.ft(
      tl,
      q(".stack6"),
      { rotationX: 54, rotation: -12, scale: 0.8, x: -80, y: 30 },
      { rotationX: 36, rotation: -6, scale: 0.95, x: 0, y: 0, duration: 1.5, ease: "sine.inOut" },
      2.2,
    );
    fx.drop(tl, plates, 0.9, { z0: 520, dz: 56, turn: 24, stagger: 0.22 });
    // L'escalier de la liste se retourne en même temps que chaque plaque se pose.
    rails.forEach(function (li, i) {
      fx.ft(
        tl,
        li,
        { opacity: 0, rotationY: -75, x: 0, transformPerspective: 900 },
        { opacity: 1, rotationY: 0, x: i * 22, duration: 0.7, ease: "back.out(1.5)" },
        0.9 + i * 0.22,
      );
    });
    fx.ft(tl, q(".chevron.mini"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, 3.7);
    tl.set(q(".chevron.mini"), { pointerEvents: "auto" }, 3.7);
    tl.addLabel("step0", 4.0);

    // ── Étape 1 : l'éditeur, un aperçu par type d'activité ───────────────────────────────
    fx.ft(tl, q(".chevron.mini"), { opacity: 1 }, { opacity: 0, duration: 0.2 }, 4.2);
    tl.set(q(".chevron.mini"), { pointerEvents: "none" }, 4.2);
    tl.set(q(".ca"), { pointerEvents: "none" }, 4.2);
    fx.ft(
      tl,
      q(".ca-text"),
      { opacity: 1, x: 0, rotationY: 0, transformPerspective: P },
      { opacity: 0, x: -180, rotationY: 38, duration: 0.7, ease: "power2.in" },
      4.2,
    );
    rails.forEach(function (li, i) {
      fx.ft(tl, li, { opacity: 1, x: i * 22 }, { opacity: 0, x: -140, duration: 0.5, ease: "power2.in" }, 4.3 + i * 0.05);
    });
    fx.explode(tl, plates, 4.2, 56, 90, 0.8);
    fx.ft(tl, q(".stack6"), { rotation: -6 }, { rotation: 8, duration: 1.6, ease: "sine.inOut" }, 4.2);
    plates
      .slice()
      .reverse()
      .forEach(function (plate, k) {
        var i = 5 - k;
        fx.ft(
          tl,
          plate,
          { opacity: 1, y: 0, z: i * 90 },
          { opacity: 0, y: -140, z: i * 90 + 240, duration: 0.55, ease: "power2.in" },
          5.0 + k * 0.1,
        );
      });

    fx.ft(tl, q(".cb"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 5.4);
    tl.set(q(".cb"), { pointerEvents: "auto" }, 5.4);
    rise(q(".cb-title"), 5.5, 0.7);
    // La palette atterrit depuis l'avant (même mouvement que la sidebar du LXP), l'éditeur pivote en entrant.
    fx.ft(
      tl,
      q(".palette"),
      { opacity: 0, x: -24, y: -30, z: 520, rotation: -6 },
      { opacity: 1, x: 0, y: 0, z: 0, rotation: 0, duration: 1.0, ease: "back.out(1.2)" },
      5.7,
    );
    fx.ft(tl, q(".pal"), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out", stagger: 0.07 }, 6.4);
    fx.ft(
      tl,
      q(".editor"),
      { opacity: 0, x: 120, rotationY: 24, transformPerspective: P },
      { opacity: 1, x: 0, rotationY: 0, duration: 0.9, ease: "power3.out" },
      6.0,
    );
    fx.ft(tl, q(".tb"), { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.06 }, 6.8);
    // L'aperçu « texte » s'écrit : titre « tapé », puis les blocs arrivent un à un.
    fx.ft(
      tl,
      q(".d-title"),
      { opacity: 1, clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "steps(26)" },
      7.2,
    );
    rise(q(".d-p"), 8.2, 0.5);
    fx.ft(tl, q(".d-check li"), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out", stagger: 0.22 }, 8.7);
    fx.ft(tl, q(".d-table"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 9.6);
    fx.ft(tl, q(".d-code"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 10.1);
    fx.ft(tl, q(".palette .act"), { opacity: 0, y: 0 }, { opacity: 1, y: 0, duration: 0.3 }, 7.0);
    fx.ft(tl, q(".chevron.mini"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, 10.9);
    tl.set(q(".chevron.mini"), { pointerEvents: "auto" }, 10.9);
    tl.addLabel("step1", 11.2);

    // ── Interactions (hors timeline) ──────────────────────────────────────────────────
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var hex = getComputedStyle(document.documentElement).getPropertyValue("--color-primary").trim().replace("#", "");
    var rgb = [0, 2, 4].map(function (i) {
      return parseInt(hex.substr(i, 2), 16);
    }).join(",");
    var tint = function (a) {
      return "rgba(" + rgb + "," + a + ")";
    };
    // Niveaux : survol = la plaque se soulève ; clic = on sélectionne le niveau (plaque soulevée, niveaux parents
    // soulignés pour montrer l'emboîtement) et le texte de gauche devient la fiche de ce niveau.
    var LEVELS = Content.get("content.levels.items").map(function (name, i) {
      var d = Content.get("content.levels.details." + i);
      return { n: name, role: d.role, ex: d.example };
    });    var tBadge = el.querySelector(".ca .badge");
    var tH1 = el.querySelector(".ca .h1");
    var tLede = el.querySelector(".ca .lede");
    var T0 = [tBadge.textContent, tH1.innerHTML, tLede.textContent];
    var selLevel = -1;
    var hoverLevel = -1;
    var BORDER = "rgba(186,230,253,1)";
    var renderLevels = function () {
      plates.forEach(function (pl, i) {
        var on = i === selLevel || i === hoverLevel;
        var parent = selLevel >= 0 && i < selLevel;
        gsap.to(pl, { y: on && !reduced ? (i === selLevel ? -30 : -22) : 0, duration: 0.4, ease: on ? "back.out(2)" : "power3.out", overwrite: "auto" });
        gsap.to(pl, { borderColor: on ? "rgba(" + rgb + ",1)" : parent ? "rgba(" + rgb + ",0.5)" : BORDER, duration: 0.3, overwrite: "auto" });
        gsap.to(rails[i], { backgroundColor: i === selLevel ? tint(0.16) : on ? tint(0.1) : parent ? tint(0.05) : tint(0), duration: 0.3, overwrite: "auto" });
      });
    };
    var swapText = function (badge, h1Html, lede, ledeHtml) {
      var parts = [tBadge, tH1, tLede];
      gsap.to(parts, {
        opacity: 0,
        y: -14,
        duration: reduced ? 0 : 0.18,
        onComplete: function () {
          tBadge.textContent = badge;
          tH1.innerHTML = h1Html;
          if (ledeHtml) tLede.innerHTML = lede;
          else tLede.textContent = lede;
          gsap.fromTo(parts, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: reduced ? 0 : 0.35, ease: "power3.out", stagger: 0.06 });
        },
      });
    };
    var selectLevel = function (i) {
      if (i === selLevel) {
        selLevel = -1;
        swapText(T0[0], T0[1], T0[2], false);
      } else {
        selLevel = i;
        var d = LEVELS[i];
        swapText(Content.text("content.levels.levelBadge").replace("{0}", i + 1).replace("{1}", LEVELS.length), esc(d.n), esc(d.role) + " <b>" + esc(Content.text("content.levels.exampleLabel")) + " " + esc(d.ex) + "</b>", true);
      }
      renderLevels();
    };
    plates.forEach(function (pl, i) {
      pl.addEventListener("mouseenter", function () {
        hoverLevel = i;
        renderLevels();
      });
      pl.addEventListener("mouseleave", function () {
        hoverLevel = -1;
        renderLevels();
      });
      pl.addEventListener("click", function () {
        selectLevel(i);
      });
    });
    rails.forEach(function (li, i) {
      li.addEventListener("mouseenter", function () {
        hoverLevel = i;
        renderLevels();
      });
      li.addEventListener("mouseleave", function () {
        hoverLevel = -1;
        renderLevels();
      });
      li.addEventListener("click", function () {
        selectLevel(i);
      });
    });

    // Cinq types d'activité, comme dans le LXP (texte, image, vidéo, contenu interactif, ressources) :
    // chaque clic ouvre l'aperçu de l'éditeur dédié.
    var ICONS = [
      '<path d="M17 6.1H3"/><path d="M21 12.1H3"/><path d="M15.1 18H3"/>',
      '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
      '<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
      '<path d="M10 7.75a.75.75 0 0 1 1.142-.638l3.664 2.249a.75.75 0 0 1 0 1.277l-3.664 2.249A.75.75 0 0 1 10 12.249z"/><path d="M12 17v4"/><path d="M8 21h8"/><rect x="2" y="3" width="20" height="14" rx="2"/>',
      '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
    ];
    var TITLES = Content.get("content.editor.headings");
    var pvs = gsap.utils.toArray(q(".pv"));
    var act = el.querySelector(".palette .act");
    var ehText = el.querySelector(".eh-text");
    var ehHead = el.querySelector(".eh-head");
    var ehIco = el.querySelector(".eh-ico");
    var ehIn = el.querySelector(".eh-input");
    var cur = 0;
    var micro = function (i) {
      var pv = pvs[i];
      if (i === 1) gsap.fromTo(pv.querySelectorAll(".wire rect"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, delay: 0.5 });
      if (i === 2) {
        gsap.fromTo(pv.querySelector(".pbar i"), { width: "0%" }, { width: "35%", duration: 1.4, ease: "power2.out", delay: 0.5 });
        gsap.fromTo(pv.querySelector(".bigplay"), { scale: 0.7 }, { scale: 1, duration: 0.6, ease: "back.out(2)", delay: 0.5 });
      }
      if (i === 3) {
        gsap.fromTo(pv.querySelector(".frame"), { opacity: 0, y: 24, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.4)", delay: 0.5 });
      }
      if (i === 4) gsap.fromTo(pv.querySelectorAll(".rrow"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, delay: 0.5 });
    };
    var select = function (i, instant) {
      if (i === cur) return;
      var from = pvs[cur];
      var to = pvs[i];
      cur = i;
      gsap.killTweensOf([from, to]);
      gsap.to(from, {
        opacity: 0,
        x: -60,
        rotationY: -18,
        transformPerspective: P,
        duration: instant ? 0 : 0.28,
        ease: "power2.in",
        onComplete: function () {
          gsap.set(from, { pointerEvents: "none" });
        },
      });
      gsap.set(to, { pointerEvents: "auto" });
      gsap.fromTo(
        to,
        { opacity: 0, x: 60, rotationY: 18, transformPerspective: P },
        { opacity: 1, x: 0, rotationY: 0, duration: instant ? 0 : 0.55, delay: instant ? 0 : 0.2, ease: "power3.out" },
      );
      if (i === 0) {
        gsap.to(ehText, { opacity: 1, pointerEvents: "auto", duration: 0.3 });
        gsap.to(ehHead, { opacity: 0, pointerEvents: "none", duration: 0.2 });
      } else {
        ehIco.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS[i] + "</svg>";
        ehIn.textContent = TITLES[i];
        gsap.to(ehText, { opacity: 0, pointerEvents: "none", duration: 0.2 });
        gsap.fromTo(ehHead, { opacity: 0, y: -10 }, { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.35, delay: 0.15 });
        micro(i);
      }
    };
    rows.forEach(function (row, i) {
      row.addEventListener("mouseenter", function () {
        if (!reduced) gsap.to(row, { x: 8, backgroundColor: tint(0.07), duration: 0.3, ease: "power3.out", overwrite: "auto" });
      });
      row.addEventListener("mouseleave", function () {
        gsap.to(row, { x: 0, backgroundColor: tint(0), duration: 0.35, ease: "power2.out", overwrite: "auto" });
      });
      row.addEventListener("click", function () {
        gsap.to(act, { opacity: 1, y: i * 96, duration: reduced ? 0 : 0.45, ease: "power2.inOut", overwrite: "auto" });
        select(i);
      });
    });
    // « Annuler » (en-tête d'activité du LXP) : retour à l'aperçu texte.
    el.querySelector(".btn.warn").addEventListener("click", function () {
      gsap.to(act, { y: 0, duration: 0.4, ease: "power2.inOut", overwrite: "auto" });
      select(0);
    });

    // Texte : gras et italique de la barre d'outils agissent sur le paragraphe.
    var para = el.querySelector(".d-p");
    el.querySelectorAll(".tb").forEach(function (btn, i) {
      btn.addEventListener("mouseenter", function () {
        if (!reduced && !btn.classList.contains("on")) gsap.to(btn, { backgroundColor: tint(0.08), duration: 0.2, overwrite: "auto" });
      });
      btn.addEventListener("mouseleave", function () {
        if (!btn.classList.contains("on")) gsap.to(btn, { backgroundColor: tint(0), duration: 0.25, overwrite: "auto" });
      });
      btn.addEventListener("click", function () {
        var on = btn.classList.toggle("on");
        gsap.set(btn, { clearProps: "backgroundColor" });
        if (i === 0) para.style.fontWeight = on ? "700" : "";
        if (i === 1) para.style.fontStyle = on ? "italic" : "";
      });
    });

    // Vidéo : cliquer le lecteur lance la lecture (la barre avance), un second clic la remet au début.
    var player = el.querySelector(".player");
    var pbar = el.querySelector(".pbar i");
    var bigplay = el.querySelector(".bigplay");
    var playing = false;
    player.style.cursor = "pointer";
    player.addEventListener("click", function () {
      playing = !playing;
      gsap.killTweensOf(pbar);
      gsap.to(bigplay, { opacity: playing ? 0 : 1, scale: playing ? 0.6 : 1, duration: 0.3 });
      gsap.to(pbar, { width: playing ? "100%" : "35%", duration: playing ? 3.2 : 0.4, ease: playing ? "none" : "power2.out", onComplete: function () { if (playing) { playing = false; gsap.to(bigplay, { opacity: 1, scale: 1, duration: 0.3 }); } } });
    });

    // Contenu interactif : effacer l'URL fait apparaître le message du LXP, cliquer le champ la remet.
    var urlField = el.querySelector(".field.url");
    var urltxt = el.querySelector(".urltxt");
    var clr = el.querySelector(".clr");
    var embed = el.querySelector(".embed");
    var empty = el.querySelector(".empty");
    var URL_TXT = urltxt.textContent;
    var setUrl = function (on, quiet) {
      urltxt.textContent = on ? URL_TXT : Content.text("content.editor.interactive.urlEmpty");
      urltxt.style.color = on ? "" : "var(--soft)";
      clr.style.visibility = on ? "visible" : "hidden";
      embed.style.display = on ? "flex" : "none";
      empty.style.display = on ? "none" : "block";
      if (!quiet) gsap.fromTo(on ? embed : empty, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
    };
    clr.addEventListener("click", function (e) {
      e.stopPropagation();
      setUrl(false);
    });
    urlField.addEventListener("click", function () {
      if (urltxt.textContent !== URL_TXT) setUrl(true);
    });

    // Ressources : la corbeille retire une ligne, « Ajouter une ressource » en ajoute une.
    var rlist = el.querySelector(".rlist");
    var RLIST0 = rlist.innerHTML;
    var NEW = Content.get("content.editor.resources.added").map(function (r) {
      return [r.name, r.file, r.size];
    });
    var esc = function (t) {
      return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    };
    var nIdx = 0;
    var trash = rlist.querySelector(".rdel").innerHTML;
    rlist.addEventListener("click", function (e) {
      var del = e.target.closest ? e.target.closest(".rdel") : null;
      if (!del) return;
      var row = del.closest(".rrow");
      gsap.to(row, { opacity: 0, x: 40, height: 0, paddingTop: 0, paddingBottom: 0, duration: reduced ? 0 : 0.35, onComplete: function () { row.remove(); } });
    });
    el.querySelector(".addres").addEventListener("click", function () {
      if (rlist.children.length >= 5) return;
      var d = NEW[nIdx++ % NEW.length].map(esc);
      var row = document.createElement("div");
      row.className = "rrow";
      row.innerHTML =
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/></svg><span class="rn">' +
        d[0] + '</span><span class="rf">' + d[1] + '</span><span class="rs">' + d[2] + '</span><button type="button" class="rdel" aria-label="' + esc(Content.text("content.editor.resources.removeAria")) + '">' + trash + "</button>";
      rlist.appendChild(row);
      gsap.fromTo(row, { opacity: 0, y: 24, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: reduced ? 0 : 0.5, ease: "back.out(1.6)" });
    });

    el.addEventListener("scene:leave", function () {
      selLevel = -1;
      hoverLevel = -1;
      tBadge.textContent = T0[0];
      tH1.innerHTML = T0[1];
      tLede.textContent = T0[2];
      gsap.set([tBadge, tH1, tLede], { opacity: 1, y: 0 });
      plates.forEach(function (_, i) {
        gsap.set(plates[i], { borderColor: BORDER, y: 0 });
        gsap.set(rails[i], { backgroundColor: tint(0) });
      });
      rows.forEach(function (r) {
        gsap.set(r, { x: 0, backgroundColor: tint(0) });
      });
      // Éditeur remis à zéro : aperçu texte, mise en forme, URL et ressources d'origine.
      cur = 0;
      pvs.forEach(function (pv, i) {
        gsap.set(pv, { opacity: i === 0 ? 1 : 0, x: 0, rotationY: 0, pointerEvents: i === 0 ? "auto" : "none" });
      });
      gsap.set(ehText, { opacity: 1, pointerEvents: "auto" });
      gsap.set(ehHead, { opacity: 0, pointerEvents: "none" });
      gsap.set(act, { y: 0 });
      para.style.fontWeight = "";
      para.style.fontStyle = "";
      el.querySelectorAll(".tb.on").forEach(function (b) {
        b.classList.remove("on");
      });
      setUrl(true, true);
      rlist.innerHTML = RLIST0;
      playing = false;
      gsap.set(pbar, { width: "35%" });
      gsap.set(bigplay, { opacity: 1, scale: 1 });
    });
  };
})();
