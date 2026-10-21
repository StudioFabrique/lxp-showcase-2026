/* Scène détaillée « Un assistant disponible 24 h/24 » (jalon 3). Trois PAUSES :
   0 le lanceur de l'assistant (tooltip et éventail de questions, comme dans le LXP)
   1 une question sur un passage du cours : sélection, « Demander à l'IA », conversation et sources
   2 une recommandation : le quiz suggéré par l'assistant.
   Les réponses affichées sont des exemples scénarisés : aucun appel à l'IA n'est fait. */
(function () {
  var Deck = (window.Deck = window.Deck || { scenes: {} });
  var P = 1800;

  Deck.scenes.assistant = function (tl, el) {
    var S = Deck.Stage;
    var fx = Deck.fx;
    var q = function (s) {
      return "#scene-assistant " + s;
    };
    var QA = (Content.get("assistant.conversation.passages") || []).map(function (p) {
      return { sel: p.selection, q: p.question, a: p.answer };
    });
    var DEFAULT = 1;
    var rise = function (target, at, dur) {
      fx.ft(tl, target, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: dur || 0.7, ease: "power3.out" }, at);
    };
    var pills = gsap.utils.toArray(q(".q"));
    var notice = el.querySelector(".m-notice");
    var userMsg = el.querySelector(".m-user");
    var ans = el.querySelector(".m-ans");
    var src = el.querySelector(".m-src");
    var sug = el.querySelector(".m-sug");
    var quizMsg = el.querySelector(".m-quizmsg");

    // Texte de la conversation pour le passage i (textContent : les balises restent affichées telles quelles).
    var setChat = function (i) {
      var d = QA[i];
      notice.querySelector("blockquote").textContent = d.sel;
      userMsg.querySelector("span").textContent = d.q;
      var ps = ans.querySelectorAll("p");
      ps[0].textContent = d.a[0];
      ps[1].textContent = d.a[1];
    };
    setChat(DEFAULT);

    // La conversation, jouée à `at` sur la timeline `tlx` (principale ou temporaire, pour les clics).
    var playChat = function (tlx, at, main) {
      var add = main
        ? function (t, from, to, pos) {
            return fx.ft(tlx, t, from, to, pos);
          }
        : function (t, from, to, pos) {
            return tlx.fromTo(t, from, to, pos);
          };
      var ps = ans.querySelectorAll("p");
      add(notice, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, at);
      add(userMsg, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.3 }, at + 0.7);
      add(userMsg.querySelector("span"), { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "steps(22)" }, at + 0.7);
      add(ans, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.3 }, at + 1.9);
      add(ps[0], { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "steps(40)" }, at + 2.0);
      add(ps[1], { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "steps(30)" }, at + 3.3);
      add(src, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, at + 4.4);
      add(sug, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.6)" }, at + 4.9);
    };

    S.set(tl, "hidden", 0);
    tl.set(q(".aa"), { pointerEvents: "auto" }, 0);
    fx.ft(tl, q(".bar"), { opacity: 0, y: -24 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0);

    // ── Étape 0 : le lanceur ──────────────────────────────────────────────────────────────
    fx.ft(
      tl,
      q(".aa .h1"),
      { opacity: 0, y: 60, rotationX: -24, transformPerspective: P, transformOrigin: "50% 100%" },
      { opacity: 1, y: 0, rotationX: 0, duration: 0.9, ease: "power3.out" },
      0.5,
    );
    rise(q(".aa .lede"), 1.0);
    // Le lanceur arrive par la droite (translation), comme dans le LXP.
    // Entrée comme dans le LXP : il arrive de la droite et d'en bas en tournant, avec un léger dépassement.
    fx.ft(
      tl,
      q(".avatar"),
      { opacity: 0, x: 260, y: 70, scale: 0.4, rotation: -28 },
      { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0, duration: 1.0, ease: "back.out(1.7)" },
      0.8,
    );
    // « L'assistant écrit… » : trois points qui pulsent avant le message.
    fx.ft(tl, q(".typing"), { opacity: 0, x: 16 }, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }, 1.9);
    fx.ft(tl, q(".typing i"), { scale: 0.55, opacity: 0.3 }, { scale: 1, opacity: 1, duration: 0.35, ease: "sine.inOut", yoyo: true, repeat: 3, stagger: 0.15 }, 2.0);
    fx.ft(tl, q(".typing"), { opacity: 1 }, { opacity: 0, duration: 0.2 }, 3.4);
    // Le message d'accueil arrive, le lanceur salue (rotation de l'icône) puis cligne des yeux (volets).
    fx.ft(tl, q(".tip"), { opacity: 0, x: 16 }, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, 3.5);
    fx.ft(tl, q(".avatar svg"), { rotation: 0, y: 0 }, { rotation: -8, y: -2, duration: 0.4, ease: "sine.inOut" }, 3.5);
    fx.ft(tl, q(".avatar svg"), { rotation: -8, y: -2 }, { rotation: 5, y: 0, duration: 0.5, ease: "sine.inOut" }, 3.9);
    fx.ft(tl, q(".avatar svg"), { rotation: 5 }, { rotation: 0, duration: 0.4, ease: "sine.inOut" }, 4.4);
    fx.ft(tl, q("#as-sh-l, #as-sh-r"), { attr: { y: 12, height: 4 } }, { attr: { y: 13.98, height: 0.04 }, duration: 0.1, ease: "power1.inOut" }, 4.05);
    fx.ft(tl, q("#as-sh-l, #as-sh-r"), { attr: { y: 13.98, height: 0.04 } }, { attr: { y: 12, height: 4 }, duration: 0.14, ease: "power1.out" }, 4.2);
    fx.ft(tl, q(".tip"), { opacity: 1, x: 0 }, { opacity: 0, x: -10, duration: 0.4 }, 5.3);
    fx.ft(
      tl,
      pills,
      { opacity: 0, x: 200, scale: 0.85 },
      { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: "back.out(1.6)", stagger: 0.12 },
      5.5,
    );
    fx.ft(tl, q(".chevron.mini"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, 6.6);
    tl.set(q(".chevron.mini"), { pointerEvents: "auto" }, 6.6);
    tl.addLabel("step0", 6.9);

    // ── Étape 1 : une question sur un passage du cours ───────────────────────────────────
    fx.ft(tl, q(".chevron.mini"), { opacity: 1 }, { opacity: 0, duration: 0.2 }, 7.1);
    tl.set(q(".chevron.mini"), { pointerEvents: "none" }, 7.1);
    tl.set(q(".aa"), { pointerEvents: "none" }, 7.1);
    fx.ft(
      tl,
      q(".as-text"),
      { opacity: 1, x: 0, rotationY: 0, transformPerspective: P },
      { opacity: 0, x: -180, rotationY: 38, duration: 0.7, ease: "power2.in" },
      7.1,
    );
    fx.ft(tl, pills, { opacity: 1, x: 0 }, { opacity: 0, x: -140, duration: 0.45, ease: "power2.in", stagger: 0.06 }, 7.1);
    fx.ft(tl, q(".launcher"), { opacity: 1, x: 0, scale: 1 }, { opacity: 0, x: 220, scale: 0.6, duration: 0.7, ease: "power2.in" }, 7.2);
    fx.ft(tl, q(".ab"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 7.9);
    tl.set(q(".ab"), { pointerEvents: "auto" }, 7.9);
    fx.ft(tl, q(".chat"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 7.9);
    tl.set(q(".chat"), { pointerEvents: "auto" }, 7.9);
    fx.ft(
      tl,
      q(".reading"),
      { opacity: 0, x: -120, rotationY: -24, transformPerspective: P },
      { opacity: 1, x: 0, rotationY: 0, duration: 0.9, ease: "power3.out" },
      8.0,
    );
    fx.ft(
      tl,
      q(".chat"),
      { x: 120, rotationY: 24, transformPerspective: P },
      { x: 0, rotationY: 0, duration: 0.9, ease: "power3.out" },
      8.2,
    );
    fx.ft(tl, q(".cav, .chead b, .chead small, .cbtn i"), { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 }, 9.0);
    // Passage sélectionné (surlignage progressif), puis « Demander à l'IA ».
    fx.ft(tl, q('.pas[data-i="1"]'), { backgroundSize: "0% 100%" }, { backgroundSize: "100% 100%", duration: 1.0, ease: "power2.inOut" }, 9.6);
    fx.ft(tl, q(".askbtn"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.8)" }, 10.8);
    fx.ft(tl, q(".askbtn"), { scale: 1 }, { scale: 0.94, duration: 0.12 }, 11.6);
    fx.ft(tl, q(".askbtn"), { scale: 0.94 }, { scale: 1, duration: 0.2, ease: "back.out(2)" }, 11.72);
    playChat(tl, 11.8, true);
    fx.ft(tl, q(".chevron.mini"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, 17.4);
    tl.set(q(".chevron.mini"), { pointerEvents: "auto" }, 17.4);
    tl.addLabel("step1", 17.7);

    // ── Étape 2 : la recommandation, un quiz ────────────────────────────────────────────
    fx.ft(tl, q(".chevron.mini"), { opacity: 1 }, { opacity: 0, duration: 0.2 }, 17.9);
    tl.set(q(".chevron.mini"), { pointerEvents: "none" }, 17.9);
    tl.set(q(".ab"), { pointerEvents: "none" }, 17.9);
    fx.ft(
      tl,
      q(".reading"),
      { opacity: 1, x: 0, rotationY: 0 },
      { opacity: 0, x: -160, rotationY: -28, duration: 0.7, ease: "power2.in" },
      17.9,
    );
    [notice, userMsg, ans, src, sug].forEach(function (m, i) {
      fx.ft(tl, m, { opacity: 1 }, { opacity: 0, duration: 0.35 }, 18.0 + i * 0.05);
    });
    fx.ft(tl, quizMsg, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 18.6);
    fx.ft(tl, q(".ac"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 18.5);
    tl.set(q(".ac"), { pointerEvents: "auto" }, 18.5);
    fx.ft(
      tl,
      q(".quizcard"),
      { opacity: 0, x: -120, rotationY: -24, transformPerspective: P },
      { opacity: 1, x: 0, rotationY: 0, duration: 0.9, ease: "power3.out" },
      18.6,
    );
    fx.ft(tl, q(".opt"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.15 }, 19.4);
    fx.ft(tl, q(".chevron.mini"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, 20.5);
    tl.set(q(".chevron.mini"), { pointerEvents: "auto" }, 20.5);
    tl.addLabel("step2", 20.8);

    // ── Interactions (hors timeline) ──────────────────────────────────────────────────
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var hex = getComputedStyle(document.documentElement).getPropertyValue("--color-primary").trim().replace("#", "");
    var rgb = [0, 2, 4].map(function (i) {
      return parseInt(hex.substr(i, 2), 16);
    }).join(",");
    var tint = function (a) {
      return "rgba(" + rgb + "," + a + ")";
    };
    var next = function () {
      try {
        parent.postMessage({ source: "lxp-deck", type: "nav", action: "next" }, "*");
      } catch (e) {
        /* hors iframe */
      }
    };

    // Lanceur : cliquer l'avatar ferme ou rouvre l'éventail ; la bulle d'aide apparaît au survol quand il est fermé.
    var avatar = el.querySelector(".avatar");
    var tip = el.querySelector(".tip");
    var fanOpen = true;
    avatar.addEventListener("click", function () {
      fanOpen = !fanOpen;
      gsap.to(pills, {
        opacity: fanOpen ? 1 : 0,
        x: fanOpen ? 0 : 160,
        scale: fanOpen ? 1 : 0.85,
        duration: reduced ? 0 : 0.45,
        ease: fanOpen ? "back.out(1.6)" : "power2.in",
        stagger: fanOpen ? 0.08 : { each: 0.05, from: "end" },
        overwrite: "auto",
      });
      gsap.to(tip, { opacity: 0, duration: 0.2, overwrite: "auto" });
      gsap.to(avatar, { rotation: fanOpen ? 0 : 0, scale: 1, duration: 0.3 });
    });
    avatar.addEventListener("mouseenter", function () {
      if (reduced) return;
      gsap.to(avatar, { scale: 1.06, duration: 0.35, ease: "back.out(2)", overwrite: "auto" });
      if (!fanOpen) gsap.fromTo(tip, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.4, ease: "power3.out", overwrite: "auto" });
    });
    avatar.addEventListener("mouseleave", function () {
      gsap.to(avatar, { scale: 1, duration: 0.4, ease: "power3.out", overwrite: "auto" });
      if (!fanOpen) gsap.to(tip, { opacity: 0, duration: 0.25, overwrite: "auto" });
    });
    var baseBg = pills.map(function (p) {
      return getComputedStyle(p).backgroundColor;
    });
    pills.forEach(function (pill, i) {
      pill.addEventListener("mouseenter", function () {
        if (!reduced) gsap.to(pill, { x: -10, backgroundColor: tint(0.08), duration: 0.3, ease: "power3.out", overwrite: "auto" });
      });
      pill.addEventListener("mouseleave", function () {
        gsap.to(pill, { x: 0, backgroundColor: baseBg[i], duration: 0.35, overwrite: "auto" });
      });
      pill.addEventListener("click", next); // poser la question : on passe à la conversation
    });

    // Cours : cliquer un passage le sélectionne, « Demander à l'IA » lance la conversation correspondante.
    var pas = gsap.utils.toArray(q(".pas"));
    var askbtn = el.querySelector(".askbtn");
    var sel = DEFAULT;
    var chatTl = null;
    pas.forEach(function (p, i) {
      p.addEventListener("click", function () {
        sel = i;
        pas.forEach(function (o, j) {
          gsap.to(o, { backgroundSize: j === i ? "100% 100%" : "0% 100%", duration: reduced ? 0 : 0.45, ease: "power2.inOut", overwrite: "auto" });
        });
      });
    });
    var chatParts = [notice, userMsg, ans, src, sug];
    var ask = function (i) {
      if (chatTl) chatTl.kill();
      gsap.killTweensOf(chatParts);
      gsap.killTweensOf([userMsg.querySelector("span")].concat(gsap.utils.toArray(ans.querySelectorAll("p"))));
      gsap.set(quizMsg, { opacity: 0 });
      gsap.set(chatParts, { opacity: 0 });
      setChat(i);
      chatTl = gsap.timeline();
      playChat(chatTl, 0.1, false);
      gsap.to(askbtn, { scale: 0.94, duration: 0.1, yoyo: true, repeat: 1 });
    };
    askbtn.addEventListener("click", function () {
      ask(sel);
    });
    el.querySelector(".genquiz").addEventListener("click", next);

    // Quiz : bonne réponse = explication ; mauvaise réponse = la carte tremble et l'on peut réessayer.
    var opts = gsap.utils.toArray(q(".opt"));
    var qexp = el.querySelector(".qexp");
    var qbar = el.querySelector(".qbar i");
    opts.forEach(function (o) {
      o.addEventListener("mouseenter", function () {
        if (!reduced && !o.classList.contains("good")) gsap.to(o, { x: 8, duration: 0.3, ease: "power3.out", overwrite: "auto" });
      });
      o.addEventListener("mouseleave", function () {
        gsap.to(o, { x: 0, duration: 0.35, ease: "power2.out", overwrite: "auto" });
      });
      o.addEventListener("click", function () {
        var good = o.getAttribute("data-ok") === "1";
        opts.forEach(function (x) {
          x.classList.remove("bad");
        });
        if (good) {
          o.classList.add("good");
          qexp.className = "qexp good";
          qexp.textContent = Content.text("assistant.quiz.right");
          gsap.to(qbar, { width: "50%", duration: 0.6, ease: "power2.out" });
          gsap.fromTo(o, { scale: 0.97 }, { scale: 1, duration: 0.5, ease: "back.out(3)" });
        } else {
          o.classList.add("bad");
          qexp.className = "qexp bad";
          qexp.textContent = Content.text("assistant.quiz.wrong");
          gsap.fromTo(o, { x: -10 }, { x: 0, duration: 0.5, ease: "elastic.out(1, 0.3)", overwrite: "auto" });
        }
        gsap.fromTo(qexp, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35 });
      });
    });

    el.addEventListener("scene:leave", function () {
      if (chatTl) chatTl.kill();
      chatTl = null;
      sel = DEFAULT;
      fanOpen = true;
      setChat(DEFAULT);
      opts.forEach(function (o) {
        o.classList.remove("good", "bad");
        gsap.set(o, { x: 0, scale: 1 });
      });
      qexp.className = "qexp";
      qexp.textContent = "";
      gsap.set(qbar, { width: "25%" });
      pills.forEach(function (p, i) {
        gsap.set(p, { backgroundColor: baseBg[i] });
      });
    });
  };
})();
