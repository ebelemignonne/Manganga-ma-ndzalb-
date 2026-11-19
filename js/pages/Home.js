// AYEGLE - js/pages/Home.js - ACCUEIL PREMIUM SACRE
// Ce fichier ne contient QUE l'accueil. Il ne touche pas aux autres pages.
window.Ayegle = window.Ayegle || {}; window.Ayegle.pages = window.Ayegle.pages || {};
window.Ayegle.pages.Home = function(props){
  var e = React.createElement;
  var st = React.useState(window.Ayegle.data.quotes[0]);
  var quote = st[0], setQuote = st[1];

  React.useEffect(function(){
    var saved = window.Ayegle.storage.load("quote_id", null);
    if(saved !== null){
      var f = null;
      window.Ayegle.data.quotes.forEach(function(q){ if(String(q.id) === String(saved)) f = q; });
      if(f) setQuote(f);
    }
  },[]);

  function newQuote(){
    var next = window.Ayegle.data.quotes[Math.floor(Math.random() * window.Ayegle.data.quotes.length)];
    setQuote(next);
    window.Ayegle.storage.save("quote_id", next.id);
  }

  function todayLabel(){
    try { return new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }); }
    catch(err){ return "Aujourd'hui"; }
  }

  function pathCard(emoji, title, desc, page, color){
    return e("button", { className: "big-card", onClick: function(){ props.go(page); } },
      e("span", { className: "icon-circle", style: { borderColor: color } }, emoji),
      e("span", null, e("b", null, title), e("small", null, desc)),
      e("span", { className: "arrow" }, "›")
    );
  }

  return e("div", { className: "page" },
    // BARRE DU HAUT
    e("div", { className: "topbar" },
      e("div", { className: "brand" },
        e("span", { className: "logo-circle" }, "🌿"),
        e("span", null, e("b", null, "AYEGLE"), e("small", null, "Ecole spirituelle"))
      ),
      e("span", { className: "streak" }, "🔥 Jour 1")
    ),

    // HERO
    e("header", { className: "hero" },
      e("p", { className: "eyebrow" }, todayLabel()),
      e("h1", null, "AYEGLE"),
      e("p", null, "Apprendre — Pratiquer — Transmettre"),
      e("div", { className: "gold-line" })
    ),

    // CITATION DU JOUR - PIECE CENTRALE
    e("div", { className: "quote-card" },
      e("p", { className: "eyebrow" }, "Parole du jour"),
      e("p", { className: "quote" }, "“" + quote.texte + "”"),
      e("p", { className: "author" }, "— " + quote.auteur),
      e("button", { onClick: newQuote }, "✨ Nouvelle parole"),
      e("div", { style: { marginTop: 10 } },
        e("button", { className: "ghost", onClick: function(){ props.go("eboga"); } }, "Commencer le rituel du jour →")
      )
    ),

    // PROGRESSION
    e("div", { className: "progress-row" },
      e("div", { className: "progress-card" },
        e("b", null, "1 / 7"),
        e("span", null, "Jours de pratique"),
        e("div", { className: "progress-bar" }, e("i", { style: { width: "14%" } }))
      ),
      e("div", { className: "progress-card" },
        e("b", null, "3"),
        e("span", null, "Citations lues"),
        e("div", { className: "progress-bar" }, e("i", { style: { width: "42%" } }))
      )
    ),

    // CHEMINS
    e("h2", null, "Choisis ton chemin"),
    e("p", { className: "hint", style: { textAlign: "left", marginTop: 0 } }, "Trois voies, une même sagesse. Avance à ton rythme."),
    e("div", { className: "grid" },
      pathCard("🌿", "AYEGLE ÉBOGA", "Enseignements, prières, pratique", "eboga", "#00E68A"),
      pathCard("🌊", "AYEGLE OMBIRI", "Temple de la Sagesse", "ombiri", "#00A8FF"),
      pathCard("🔥", "AYEGLE DISSOUMBA", "Notes, rituels, mémoire", "dissoumba", "#FF7A1A")
    ),
    e("p", { className: "hint" }, "MBOKA MENGANGA — disponible plus tard, dans un espace séparé.")
  );
};