// AYEGLE - js/pages/Ombiri.js - OMBIRI COMPLET : prieres modifiables + ESSAMA + corbeille
window.Ayegle = window.Ayegle || {}; window.Ayegle.pages = window.Ayegle.pages || {};
window.Ayegle.pages.Ombiri = function(props){
  var e = React.createElement;
  var PR = window.Ayegle.data.ombiriPrieres || [];
  var ES = window.Ayegle.data.ombiriEssama || [];
  var tabSt = React.useState("Prieres"); var tab = tabSt[0], setTab = tabSt[1];
  var catSt = React.useState("Toutes"); var cat = catSt[0], setCat = catSt[1];
  var qSt = React.useState(""); var q = qSt[0], setQ = qSt[1];
  var selSt = React.useState(null); var sel = selSt[0], setSel = selSt[1];
  var editSt = React.useState({}); var edits = editSt[0], setEdits = editSt[1];
  var trashSt = React.useState(window.Ayegle.storage.load("ombiri_corbeille", [])); var trash = trashSt[0], setTrash = trashSt[1];
  var showTrashSt = React.useState(false); var showTrash = showTrashSt[0], setShowTrash = showTrashSt[1];
  var essamaSt = React.useState(window.Ayegle.storage.load("ombiri_essama_extra", [])); var extra = essamaSt[0], setExtra = essamaSt[1];
  var formSt = React.useState({ nom: "", clan: "", naissance: "", role: "Pratiquant" }); var form = formSt[0], setForm = formSt[1];

  function saveTrash(n){ setTrash(n); window.Ayegle.storage.save("ombiri_corbeille", n); }
  function saveEdits(n){ setEdits(n); window.Ayegle.storage.save("ombiri_prieres_edits", n); }
  function saveExtra(n){ setExtra(n); window.Ayegle.storage.save("ombiri_essama_extra", n); }

  function textOf(it){ return (edits[it.id] && edits[it.id].texte) || it.texte; }
  function titleOf(it){ return (edits[it.id] && edits[it.id].titre) || it.titre; }

  function updateEdit(id, field, val){
    var n = {}; Object.keys(edits).forEach(function(k){ n[k] = edits[k]; });
    n[id] = n[id] || {}; n[id][field] = val; saveEdits(n);
  }

  // DETAIL PRIERE - modifiable
  if(sel && sel.type === "priere"){
    var it = sel.item;
    return e("div", { className: "page" },
      e("button", { className: "back", onClick: function(){ setSel(null); } }, "← Retour"),
      e("div", { className: "card" },
        e("p", { className: "eyebrow" }, "OMBIRI • " + it.cat + " • Modifiable"),
        e("input", { value: titleOf(it), onChange: function(ev){ updateEdit(it.id, "titre", ev.target.value); }, style: { fontSize: "1.2rem", fontWeight: "800", marginBottom: 10 } }),
        e("textarea", { value: textOf(it), rows: 10, onChange: function(ev){ updateEdit(it.id, "texte", ev.target.value); }, style: { lineHeight: "1.8", fontSize: "1.08rem" } }),
        e("p", { className: "hint", style: { textAlign: "left" } }, "Tes modifications sont sauvegardées automatiquement sur ton téléphone."),
        e("button", { onClick: function(){ setSel(null); } }, "✓ Terminé")
      )
    );
  }
  // DETAIL ESSAMA
  if(sel && sel.type === "essama"){
    var p = sel.item;
    return e("div", { className: "page" },
      e("button", { className: "back", onClick: function(){ setSel(null); } }, "← Retour"),
      e("div", { className: "card", style: { textAlign: "center" } },
        e("div", { style: { fontSize: "3rem" } }, "👤"),
        e("h2", null, p.nom),
        e("p", { className: "author" }, p.role + " • Clan " + p.clan),
        e("div", { className: "gold-line" })
      ),
      e("div", { className: "card" },
        e("div", { className: "row" }, e("b", null, "Clan"), e("span", null, p.clan)),
        e("div", { className: "row" }, e("b", null, "Né(e)"), e("span", null, p.naissance || "—")),
        e("div", { className: "row" }, e("b", null, "Décédé(e)"), e("span", null, p.deces || "Vivant")),
        e("div", { className: "row" }, e("b", null, "Rôle"), e("span", null, p.role))
      ),
      e("div", { className: "card" }, e("h3", null, "Note"), e("p", null, p.note || "Aucune note."))
    );
  }
  // CORBEILLE
  if(showTrash){
    var tItems = PR.filter(function(x){ return trash.indexOf(x.id) >= 0; });
    return e("div", { className: "page" },
      e("button", { className: "back", onClick: function(){ setShowTrash(false); } }, "← Retour"),
      e("h2", null, "🗑️ Corbeille OMBIRI"),
      tItems.length === 0 ? e("div", { className: "card" }, e("p", { className: "hint" }, "Corbeille vide.")) : tItems.map(function(it){
        return e("div", { key: it.id, className: "card" }, e("b", null, titleOf(it)),
          e("div", { style: { display: "flex", gap: 10, marginTop: 10 } },
            e("button", { onClick: function(){ saveTrash(trash.filter(function(x){ return x !== it.id; })); } }, "Restaurer"),
            e("button", { className: "ghost", onClick: function(){ saveTrash(trash.filter(function(x){ return x !== it.id; })); } }, "Supprimer pour de bon")
          ));
      })
    );
  }

  var allEssama = ES.concat(extra);
  var prieres = PR.filter(function(it){
    if(trash.indexOf(it.id) >= 0) return false;
    if(cat !== "Toutes" && it.cat !== cat) return false;
    if(q.trim() === "") return true;
    return (titleOf(it) + " " + textOf(it)).toLowerCase().indexOf(q.toLowerCase()) >= 0;
  });

  return e("div", { className: "page" },
    e(window.Ayegle.components.PageHeader, { go: props.go, title: "AYEGLE OMBIRI", emoji: "🌊", subtitle: "Temple de la Sagesse - La Mère Sacrée", color: "linear-gradient(160deg,#0A1E33,#071426)" }),
    e("div", { className: "tabs" },
      ["Prieres", "Essama"].map(function(t){ return e("button", { key: t, className: tab === t ? "tab active" : "tab", onClick: function(){ setTab(t); } }, t === "Prieres" ? "Prières" : "Essama - Pratiquants"); })
    ),
    tab === "Prieres" ? e("div", null,
      e("div", { style: { marginTop: 14 } }, e("input", { value: q, onChange: function(ev){ setQ(ev.target.value); }, placeholder: "🔍 Rechercher une prière..." })),
      e("div", { className: "tabs" }, ["Toutes", "Matin", "Soir", "Protection"].map(function(c){ return e("button", { key: c, className: cat === c ? "tab active" : "tab", onClick: function(){ setCat(c); } }, c); })),
      e("div", { style: { display: "flex", justifyContent: "space-between", marginTop: 12 } },
        e("span", { className: "hint", style: { textAlign: "left" } }, prieres.length + " prière(s)"),
        e("button", { className: "ghost", onClick: function(){ setShowTrash(true); } }, "🗑️ Corbeille (" + trash.length + ")")
      ),
      prieres.length === 0 ? e("div", { className: "card" }, e("p", { className: "hint" }, "Aucune prière.")) : prieres.map(function(it){
        return e("div", { key: it.id, className: "card" },
          e("p", { className: "eyebrow" }, "OMBIRI • " + it.cat),
          e("h3", { onClick: function(){ setSel({ type: "priere", item: it }); }, style: { cursor: "pointer" } }, titleOf(it)),
          e("p", { onClick: function(){ setSel({ type: "priere", item: it }); }, style: { cursor: "pointer", color: "var(--muted)" } }, textOf(it).slice(0, 110) + "... Lire / Modifier →"),
          e("div", { style: { display: "flex", gap: 8, marginTop: 10 } },
            e("button", { onClick: function(){ setSel({ type: "priere", item: it }); } }, "📖 Lire / Modifier"),
            e("button", { className: "ghost", onClick: function(){ saveTrash(trash.concat([it.id])); } }, "🗑️")
          )
        );
      })
    ) : e("div", null,
      e("div", { className: "card" },
        e("h3", null, "➕ Ajouter un pratiquant"),
        e("input", { value: form.nom, onChange: function(ev){ setForm({ nom: ev.target.value, clan: form.clan, naissance: form.naissance, role: form.role }); }, placeholder: "Nom complet", style: { marginBottom: 8 } }),
        e("input", { value: form.clan, onChange: function(ev){ setForm({ nom: form.nom, clan: ev.target.value, naissance: form.naissance, role: form.role }); }, placeholder: "Clan", style: { marginBottom: 8 } }),
        e("input", { value: form.naissance, onChange: function(ev){ setForm({ nom: form.nom, clan: form.clan, naissance: ev.target.value, role: form.role }); }, placeholder: "Naissance : 1990-01-01", style: { marginBottom: 8 } }),
        e("button", { onClick: function(){
          if(!form.nom.trim()) return;
          var n = { id: "es-x-" + Date.now(), nom: form.nom, clan: form.clan || "—", naissance: form.naissance, deces: "", role: form.role, note: "" };
          saveExtra(extra.concat([n])); setForm({ nom: "", clan: "", naissance: "", role: "Pratiquant" });
        } }, "Ajouter")
      ),
      allEssama.map(function(p){
        return e("div", { key: p.id, className: "card", onClick: function(){ setSel({ type: "essama", item: p }); }, style: { cursor: "pointer" } },
          e("div", { className: "row", style: { borderBottom: 0 } }, e("b", null, p.nom), e("span", null, p.clan + " • Né(e) " + (p.naissance || "—"))),
          e("p", { className: "hint", style: { textAlign: "left", marginBottom: 0 } }, p.role + (p.deces ? " • Décédé(e) " + p.deces : "") + " — Voir la fiche →")
        );
      })
    )
  );
};