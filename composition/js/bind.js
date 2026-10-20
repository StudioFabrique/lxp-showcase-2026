/* Liaison des textes : remplit le HTML à partir de window.CONTENT (généré par tools/sync-content.mjs
 * depuis content/*.json). Exécuté avant les scripts de scène, qui lisent ensuite le DOM déjà rempli.
 *
 *   data-tx="what.definition.badge"          texte de l'élément (**gras** accepté)
 *   data-tx-split="deck.stage.years.from"    un <i> par caractère (années animées)
 *   data-tx-aria-label="clé", data-tx-alt, data-tx-data-label, data-tx-data-open…
 *                                           attribut du même nom
 *   clé|autre.clé                           le modèle contient {0} : remplacé par la valeur de « autre.clé »
 */
(function () {
  var C = window.CONTENT || {};

  function get(path) {
    var o = C;
    var parts = path.split(".");
    for (var i = 0; i < parts.length; i++) {
      if (o === null || o === undefined) return undefined;
      o = o[parts[i]];
    }
    return o;
  }

  function resolve(spec) {
    var parts = spec.split("|");
    var v = get(parts[0]);
    if (typeof v !== "string") {
      if (window.console) console.warn("[contenu] clé absente ou invalide :", parts[0]);
      return null;
    }
    for (var i = 1; i < parts.length; i++) v = v.replace("{" + (i - 1) + "}", String(get(parts[i]) || ""));
    return v;
  }

  // Mini-balisage : **gras**. Le reste est du texte brut (échappé).
  function rich(s) {
    var esc = s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return esc.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
  }

  var all = document.getElementsByTagName("*");
  for (var n = 0; n < all.length; n++) {
    var el = all[n];
    var attrs = el.attributes;
    var todo = [];
    for (var a = 0; a < attrs.length; a++) {
      if (attrs[a].name.indexOf("data-tx") === 0) todo.push([attrs[a].name, attrs[a].value]);
    }
    todo.forEach(function (p) {
      var name = p[0];
      var v = resolve(p[1]);
      if (v === null) return;
      if (name === "data-tx") {
        if (v.indexOf("**") >= 0) el.innerHTML = rich(v);
        else el.textContent = v;
      } else if (name === "data-tx-split") {
        el.textContent = "";
        v.split("").forEach(function (ch) {
          var i = document.createElement("i");
          i.textContent = ch;
          el.appendChild(i);
        });
      } else if (name.indexOf("data-tx-") === 0) {
        el.setAttribute(name.slice(8), v);
      }
    });
  }

  // Accès aux textes depuis les scripts de scène : Content.text("clé"), Content.get("clé.tableau").
  window.Content = {
    get: get,
    text: function (path) {
      var v = get(path);
      return typeof v === "string" ? v : "";
    },
  };
})();
