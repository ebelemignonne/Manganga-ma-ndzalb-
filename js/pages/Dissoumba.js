// AYEGLE - js/pages/Dissoumba.js - DISSOUMBA COMPLET : notes + categories + recherche + corbeille + rituels
window.Ayegle = window.Ayegle || {}; window.Ayegle.pages = window.Ayegle.pages || {};
window.Ayegle.pages.Dissoumba = function(props){
  var e = React.createElement;
  var notesSt = React.useState(window.Ayegle.storage.load("dissoumba_notes", [])); var notes = notesSt[0], setNotes = notesSt[1];
  var trashSt = React.useState(window.Ayegle.storage.load("dissoumba_corbeille", [])); var trash = trashSt[0], setTrash = trashSt[1];
  var catSt = React.useState("Toutes"); var cat = catSt[0], setCat = catSt[1];
  var qSt = React.useState(""); var q = qSt[0], setQ = qSt[1];
  var newSt = React.useState(""); var newText = newSt[0], setNewText = newSt[1];
  var newCatSt = React.useState("Mémoire"); var newCat = newCatSt[0], setNewCat = newCatSt[1];
  var showTrashSt = React.useState(false); var showTrash = showTrashSt[0], setShowTrash = showTrashSt[1];

  function saveNotes(n){ setNotes(n); window.Ayegle.storage.save("dissoumba_notes", n); }
  function saveTrash(n){ setTrash(n); window.Ayegle.storage.save("dissoumba_corbeille", n); }

  function addNote(){
    if(!newText.trim()) return;
    var n = { id: "ds-" + Date.now(), texte: newText.trim(), cat: newCat, date: new Date().toLocaleDateString("fr-FR") };
    saveNotes([n].concat(notes)); setNewText("");
  }
  function toTrash(id){ saveTrash(trash.concat([id])); }
  function restore(id){ saveTrash(trash.filter(function(x){ return x !== id; })); }

  if(showTrash){
    var tItems = notes.filter(function(n){ return trash.indexOf(n.id) >= 0; });
    return e("div", { className: "page" },
      e("button", { className: "back", onClick: function(){ setShowTrash(false); } }, "← Retour"),
      e("h2", null, "🗑️ Corbeille DISSOUMBA"),
      tItems.length === 0 ? e("div", { className: "card" }, e("p", { className: "hint" }, "Corbeille vide.")) : tItems.map(function(n){
        return e("div", { key: n.id, className: "card" }, e("b", null, n.cat + " • " + n.date), e("p", null, n.texte),
          e("div", { style: { display: "flex", gap: 10 } },
            e("button", { onClick: function(){ restore(n.id); } }, "Restaurer"),
            e("button", { className: "ghost", onClick: function(){ saveTrash(trash.filter(function(x){ return x !== n.id; })); saveNotes(notes.filter(function(x){ return x.id !== n.id; })); } }, "Supprimer pour de bon")
          ));
      })
    );
  }

  var visible = notes.filter(function(n){
    if(trash.indexOf(n.id) >= 0) return false;
    if(cat !== "Toutes" && n.cat !== cat) return false;
    if(q.trim() === "") return true;
    return n.texte.toLowerCase().indexOf(q.toLowerCase()) >= 0;
  });

  return e("div", { className: "page" },
    e(window.Ayegle.components.PageHeader, { go: props.go, title: "AYEGLE DISSOUMBA", emoji: "🔥", subtitle: "Notes, rituels, mémoire", color: "linear-gradient(160deg,#33180A,#1A0D05)" }),

    e("h2", null, "Rituels du jour"),
    (window.Ayegle.data.dissoumbaRituels || []).map(function(r){
      return e("div", { key: r.id, className: "card" }, e("h3", null, r.titre), e("p", { style: { color: "var(--muted)" } }, r.texte));
    }),

    e("h2", null, "Nouvelle note"),
    e("div", { className: "card" },
      e("div", { className: "tabs" }, ["Mémoire", "Rituel", "Rêve", "Leçon"].map(function(c){ return e("button", { key: c, className: newCat === c ? "tab active" : "tab", onClick: function(){ setNewCat(c); } }, c); })),
      e("textarea", { value: newText, onChange: function(ev){ setNewText(ev.target.value); }, rows: 4, placeholder: "Écris ta note ici...", style: { marginTop: 10 } }),
      e("button", { onClick: addNote, style: { marginTop: 10 } }, "Ajouter la note")
    ),

    e("div", { style: { marginTop: 14 } }, e("input", { value: q, onChange: function(ev){ setQ(ev.target.value); }, placeholder: "🔍 Rechercher dans tes notes..." })),
    e("div", { className: "tabs" }, ["Toutes", "Mémoire", "Rituel", "Rêve", "Leçon"].map(function(c){ return e("button", { key: c, className: cat === c ? "tab active" : "tab", onClick: function(){ setCat(c); } }, c); })),
    e("div", { style: { display: "flex", justifyContent: "space-between", marginTop: 12 } },
      e("span", { className: "hint", style: { textAlign: "left" } }, visible.length + " note(s)"),
      e("button", { className: "ghost", onClick: function(){ setShowTrash(true); } }, "🗑️ Corbeille (" + trash.length + ")")
    ),
    visible.length === 0 ? e("div", { className: "card" }, e("p", { className: "hint" }, "Aucune note pour le moment.")) : visible.map(function(n){
      return e("div", { key: n.id, className: "card" },
        e("p", { className: "eyebrow" }, n.cat + " • " + n.date),
        e("p", { style: { fontSize: "1.05rem" } }, n.texte),
        e("button", { className: "ghost", onClick: function(){ toTrash(n.id); } }, "🗑️ Mettre en corbeille")
      );
    })
  );
};