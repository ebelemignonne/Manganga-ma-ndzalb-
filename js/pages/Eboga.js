// AYEGLE - js/pages/Eboga.js - PAGE EBOGA COMPLETE
// Fonctionnalites : recherche + onglets + statut + favoris + corbeille + detail plein ecran
// Ce fichier ne touche JAMAIS Ombiri ni Dissoumba.
window.Ayegle = window.Ayegle || {}; window.Ayegle.pages = window.Ayegle.pages || {};
window.Ayegle.pages.Eboga = function(props){
  var e = React.createElement;
  var ALL = window.Ayegle.data.ebogaContent || [];

  var tabSt = React.useState("Enseignements"); var tab = tabSt[0], setTab = tabSt[1];
  var qSt = React.useState(""); var q = qSt[0], setQ = qSt[1];
  var selSt = React.useState(null); var selected = selSt[0], setSelected = selSt[1];
  var favSt = React.useState(window.Ayegle.storage.load("eboga_favoris", [])); var fav = favSt[0], setFav = favSt[1];
  var statSt = React.useState(window.Ayegle.storage.load("eboga_statuts", {})); var statuts = statSt[0], setStatuts = statSt[1];
  var trashSt = React.useState(window.Ayegle.storage.load("eboga_corbeille", [])); var trash = trashSt[0], setTrash = trashSt[1];
  var showTrashSt = React.useState(false); var showTrash = showTrashSt[0], setShowTrash = showTrashSt[1];

  function saveFav(next){ setFav(next); window.Ayegle.storage.save("eboga_favoris", next); }
  function saveStat(next){ setStatuts(next); window.Ayegle.storage.save("eboga_statuts", next); }
  function saveTrash(next){ setTrash(next); window.Ayegle.storage.save("eboga_corbeille", next); }

  function toggleFav(id){
    var next = fav.indexOf(id) >= 0 ? fav.filter(function(x){ return x !== id; }) : fav.concat([id]);
    saveFav(next);
  }
  function cycleStatut(id){
    var ordre = ["À apprendre", "En cours", "Appris"];
    var cur = statuts[id] || "À apprendre";
    var nextIdx = (ordre.indexOf(cur) + 1) % ordre.length;
    var next = {}; Object.keys(statuts).forEach(function(k){ next[k] = statuts[k]; }); next[id] = ordre[nextIdx];
    saveStat(next);
  }
  function toTrash(id){ saveTrash(trash.concat([id])); }
  function restore(id){ saveTrash(trash.filter(function(x){ return x !== id; })); }
  function deleteForever(id){ saveTrash(trash.filter(function(x){ return x !== id; })); }

  var visible = ALL.filter(function(it){
    if(trash.indexOf(it.id) >= 0) return false;
    if(tab === "Favoris" && fav.indexOf(it.id) < 0) return false;
    if(tab !== "Favoris" && it.cat !== tab) return false;
    if(q.trim() === "") return true;
    var hay = (it.titre + " " + it.texte).toLowerCase();
    return hay.indexOf(q.toLowerCase()) >= 0;
  });

  var countAppris = ALL.filter(function(it){ return statuts[it.id] === "Appris"; }).length;

  // --- DETAIL PLEIN ECRAN ---
  if(selected){
    return e("div", { className: "page" },
      e("button", { className: "back", onClick: function(){ setSelected(null); } }, "← Retour à la liste"),
      e("div", { className: "card" },
        e("p", { className: "eyebrow" }, selected.cat + " • " + selected.duree + " • " + selected.niveau),
        e("h2", { style: { marginTop: 6, fontSize: "1.7rem" } }, selected.titre),
        e("div", { className: "gold-line", style: { marginLeft: 0 } }),
        e("p", { style: { fontSize: "1.12rem", lineHeight: "1.8", marginTop: 16 } }, selected.texte),
        e("div", { style: { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 } },
          e("button", { onClick: function(){ cycleStatut(selected.id); } }, "Statut : " + (statuts[selected.id] || "À apprendre") + " →"),
          e("button", { className: "ghost", onClick: function(){ toggleFav(selected.id); } }, fav.indexOf(selected.id) >= 0 ? "⭐ En favoris" : "☆ Ajouter aux favoris")
        )
      )
    );
  }

  // --- CORBEILLE ---
  if(showTrash){
    var trashItems = ALL.filter(function(it){ return trash.indexOf(it.id) >= 0; });
    return e("div", { className: "page" },
      e("button", { className: "back", onClick: function(){ setShowTrash(false); } }, "← Retour"),
      e("h2", null, "🗑️ Corbeille ÉBOGA"),
      e("p", { className: "hint", style: { textAlign: "left" } }, "Tu peux restaurer un contenu, ou le supprimer pour de bon."),
      trashItems.length === 0
        ? e("div", { className: "card" }, e("p", { className: "hint" }, "Corbeille vide. Rien à restaurer."))
        : trashItems.map(function(it){
            return e("div", { key: it.id, className: "card" },
              e("b", null, it.titre),
              e("p", { className: "hint", style: { textAlign: "left" } }, it.cat),
              e("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } },
                e("button", { onClick: function(){ restore(it.id); } }, "Restaurer"),
                e("button", { className: "ghost", onClick: function(){ deleteForever(it.id); } }, "Supprimer pour de bon")
              )
            );
          })
    );
  }

  // --- LISTE PRINCIPALE ---
  return e("div", { className: "page" },
    e(window.Ayegle.components.PageHeader, { go: props.go, title: "AYEGLE ÉBOGA", emoji: "🌿", subtitle: "Enseignements, prières, pratique", color: "linear-gradient(160deg,#0E3B2E,#071F16)" }),

    e("div", { className: "progress-row" },
      e("div", { className: "progress-card" }, e("b", null, countAppris + " / " + ALL.length), e("span", null, "Contenus appris"), e("div", { className: "progress-bar" }, e("i", { style: { width: Math.round(countAppris / Math.max(1, ALL.length) * 100) + "%" } }))),
      e("div", { className: "progress-card" }, e("b", null, fav.length), e("span", null, "Favoris"), e("div", { className: "progress-bar" }, e("i", { style: { width: Math.min(100, fav.length * 20) + "%" } })))
    ),

    e("div", { style: { marginTop: 14 } },
      e("input", { value: q, onChange: function(ev){ setQ(ev.target.value); }, placeholder: "🔍 Rechercher un enseignement, une prière..." })
    ),

    e("div", { className: "tabs" },
      ["Enseignements", "Prières", "Pratique", "Favoris"].map(function(t){
        return e("button", { key: t, className: tab === t ? "tab active" : "tab", onClick: function(){ setTab(t); } }, t);
      })
    ),

    e("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 } },
      e("span", { className: "hint", style: { textAlign: "left" } }, visible.length + " contenu(s)"),
      e("button", { className: "ghost", onClick: function(){ setShowTrash(true); } }, "🗑️ Corbeille (" + trash.length + ")")
    ),

    visible.length === 0
      ? e("div", { className: "card" }, e("p", { className: "hint" }, tab === "Favoris" ? "Aucun favori pour le moment. Mets une étoile ⭐ sur un contenu." : "Aucun résultat. Essaie un autre mot."))
      : visible.map(function(it){
          var st = statuts[it.id] || "À apprendre";
          var isFav = fav.indexOf(it.id) >= 0;
          return e("div", { key: it.id, className: "card" },
            e("p", { className: "eyebrow" }, it.cat + " • " + it.duree + " • " + it.niveau),
            e("h3", { onClick: function(){ setSelected(it); }, style: { cursor: "pointer" } }, it.titre),
            e("p", { onClick: function(){ setSelected(it); }, style: { cursor: "pointer", color: "var(--muted)" } }, it.texte.length > 110 ? it.texte.slice(0, 110) + "... Lire la suite →" : it.texte),
            e("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 } },
              e("button", { onClick: function(){ setSelected(it); } }, "📖 Lire"),
              e("button", { className: "ghost", onClick: function(){ cycleStatut(it.id); } }, "✓ " + st),
              e("button", { className: "ghost", onClick: function(){ toggleFav(it.id); } }, isFav ? "⭐" : "☆"),
              e("button", { className: "ghost", onClick: function(){ toTrash(it.id); } }, "🗑️")
            )
          );
        })
  );
};