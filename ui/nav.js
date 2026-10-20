/* Navigation globale : numéro de diapositive très discret et plan de la présentation (grille de miniatures).
 *
 * Vit dans la page parente (le wrapper), donc disponible sur toute la présentation, quelle que soit la scène.
 * Touche G ou clic sur le numéro : ouvre le plan ; flèches / Entrée / clic : saut direct ; Échap ou G : ferme.
 *
 * Données : <script id="nav-data"> (généré par `npm run sync`) = textes + ordre des scènes ; les miniatures
 * sont produites par `npm run thumbs` (composition/assets/thumbs/<id>.webp).
 * Le saut passe par controller.syncTo(sequence, diapositive, pause) : pas d'animation d'attente, la scène visée
 * s'affiche à son état initial.
 */
(function () {
  var deck = document.querySelector("hyperframes-slideshow");
  var dataEl = document.getElementById("nav-data");
  var root = document.getElementById("nav");
  if (!deck || !dataEl || !root) return;
  var data = JSON.parse(dataEl.textContent);
  var entries = data.entries;
  var thumbs = root.getAttribute("data-thumbs") || "";

  var counter = root.querySelector(".nav-counter");
  var overlay = root.querySelector(".nav-grid");
  var list = root.querySelector(".nav-cards");
  var cur = -1; // entrée courante (index dans `entries`)
  var sel = 0; // carte sélectionnée dans le plan
  var isOpen = false;

  counter.setAttribute("aria-label", data.ui.open);
  overlay.setAttribute("aria-label", data.ui.title);
  root.querySelector(".nav-title").textContent = data.ui.title;
  root.querySelector(".nav-close").setAttribute("aria-label", data.ui.close);

  // Cartes du plan : numéro, miniature, titre.
  var cards = entries.map(function (en, i) {
    var li = document.createElement("li");
    var b = document.createElement("button");
    b.type = "button";
    b.className = "nav-card";
    b.setAttribute("data-i", i);
    var img = document.createElement("img");
    img.alt = "";
    img.decoding = "async";
    img.src = thumbs + en.id + ".webp";
    img.addEventListener("error", function () {
      img.style.visibility = "hidden";
    });
    var num = document.createElement("span");
    num.className = "nav-num";
    num.textContent = String(i + 1);
    var label = document.createElement("span");
    label.className = "nav-label";
    label.textContent = en.label;
    b.appendChild(img);
    b.appendChild(num);
    b.appendChild(label);
    b.addEventListener("click", function () {
      jump(i);
    });
    b.addEventListener("mouseenter", function () {
      select(i, true);
    });
    li.appendChild(b);
    list.appendChild(li);
    return b;
  });

  function controller() {
    var c = deck.controller;
    return c && c.show && c.syncTo ? c : null;
  }

  // Entrée correspondant à la position du contrôleur.
  function locate(c) {
    var p = c.position;
    var id = p.sequenceId === "main" ? (c.show.slides[p.slideIndex] || {}).sceneId : p.sequenceId;
    for (var i = 0; i < entries.length; i++) if (entries[i].id === id) return i;
    return -1;
  }

  function refresh() {
    var c = controller();
    if (!c) return;
    var i = locate(c);
    if (i === cur) return;
    cur = i;
    counter.textContent = i >= 0 ? i + 1 + " / " + entries.length : "";
    // Pas de numéro sur l'écran de départ.
    counter.parentNode.classList.toggle("nav-hide", i <= 0);
    cards.forEach(function (b, k) {
      b.classList.toggle("on", k === i);
    });
  }

  function jump(i) {
    var c = controller();
    if (!c) return;
    var en = entries[i];
    close();
    if (en.kind === "main") c.syncTo("main", en.index, 0);
    else c.syncTo(en.id, 0, 0);
    cur = -1;
    refresh();
    deck.focus();
  }

  function select(i, noScroll) {
    sel = Math.max(0, Math.min(entries.length - 1, i));
    cards.forEach(function (b, k) {
      b.classList.toggle("sel", k === sel);
    });
    if (!noScroll) cards[sel].scrollIntoView({ block: "nearest" });
  }

  function columns() {
    var first = cards[0].parentNode.offsetTop;
    var n = 0;
    for (var i = 0; i < cards.length; i++) {
      if (cards[i].parentNode.offsetTop === first) n++;
      else break;
    }
    return Math.max(1, n);
  }

  function open() {
    if (isOpen) return;
    isOpen = true;
    refresh();
    overlay.hidden = false;
    root.classList.add("open");
    select(cur >= 0 ? cur : 0);
    cards[sel].focus({ preventScroll: true });
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    overlay.hidden = true;
    root.classList.remove("open");
    deck.focus();
  }

  function toggle() {
    if (isOpen) close();
    else open();
  }

  counter.addEventListener("click", toggle);
  root.querySelector(".nav-close").addEventListener("click", close);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) close();
  });

  // Clavier (page parente) : le plan capte les touches pendant qu'il est ouvert.
  document.addEventListener(
    "keydown",
    function (e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === "g" || e.key === "G") {
        e.preventDefault();
        e.stopPropagation();
        toggle();
        return;
      }
      if (!isOpen) return;
      var step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: columns(), ArrowUp: -columns() }[e.key];
      if (step !== undefined) {
        e.preventDefault();
        e.stopPropagation();
        select(sel + step);
        cards[sel].focus({ preventScroll: true });
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        e.stopPropagation();
        jump(sel);
      } else if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        close();
      }
    },
    true,
  );

  // Touches pressées dans la composition (iframe) : relayées par deck.js.
  window.addEventListener("message", function (e) {
    var d = e.data;
    if (!d || d.source !== "lxp-deck" || d.type !== "grid") return;
    if (d.action === "close") close();
    else toggle();
  });

  // Suivi de la position : le contrôleur n'émet pas d'événement, on lit sa position quelques fois par seconde.
  setInterval(refresh, 150);
  refresh();
})();
