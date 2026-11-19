// AYEGLE - js/pages/Kengue.js - BIBLIOTHEQUE + CALENDRIER + REGLAGES (regroupes, sans toucher MBOKA)
window.Ayegle = window.Ayegle || {}; window.Ayegle.pages = window.Ayegle.pages || {};
window.Ayegle.pages.Kengue = function(props){
  var e = React.createElement;
  var tabSt = React.useState("Bibliotheque"); var tab = tabSt[0], setTab = tabSt[1];
  var themeSt = React.useState(window.Ayegle.storage.load("ayegle_theme", "Forêt sacrée")); var theme = themeSt[0], setTheme = themeSt[1];
  var notifSt = React.useState(window.Ayegle.storage.load("ayegle_notif", true)); var notif = notifSt[0], setNotif = notifSt[1];
  var books = [
    { id: "k1", titre: "Les Fondations d'ÉBOGA", auteur: "Enseignement AYEGLE", pages: 42 },
    { id: "k2", titre: "Les Prières d'OMBIRI", auteur: "Temple de la Sagesse", pages: 28 },
    { id: "k3", titre: "Mémoire de DISSOUMBA", auteur: "Carnets sacrés", pages: 35 }
  ];
  var events = [
    { id: "ev1", date: "Dimanche", titre: "Cérémonie hebdomadaire", lieu: "Temple" },
    { id: "ev2", date: "1er du mois", titre: "Rituel de nouvelle lune", lieu: "En famille" },
    { id: "ev3", date: "Chaque matin", titre: "Prière du matin — 5 min", lieu: "Chez toi" }
  ];
  return e("div", { className: "page" },
    e("button", { className: "back", onClick: function(){ props.go("home"); } }, "← Accueil"),
    e("h2", null, "📚 KÉNGUÉ — Bibliothèque & Vie"),
    e("div", { className: "tabs" }, ["Bibliotheque", "Calendrier", "Reglages"].map(function(t){
      return e("button", { key: t, className: tab === t ? "tab active" : "tab", onClick: function(){ setTab(t); } }, t === "Bibliotheque" ? "Bibliothèque" : t === "Calendrier" ? "Calendrier" : "Réglages");
    })),
    tab === "Bibliotheque" ? e("div", null, books.map(function(b){
      return e("div", { key: b.id, className: "card" }, e("h3", null, "📖 " + b.titre), e("p", { className: "hint", style: { textAlign: "left" } }, b.auteur + " • " + b.pages + " pages"), e("button", { className: "ghost" }, "Ouvrir"));
    })) : null,
    tab === "Calendrier" ? e("div", null, events.map(function(ev){
      return e("div", { key: ev.id, className: "card" }, e("p", { className: "eyebrow" }, ev.date), e("h3", null, ev.titre), e("p", { className: "hint", style: { textAlign: "left" } }, "📍 " + ev.lieu));
    })) : null,
    tab === "Reglages" ? e("div", null,
      e("div", { className: "card" },
        e("h3", null, "🎨 Thème"),
        e("div", { className: "tabs" }, ["Forêt sacrée", "Nuit bleue", "Terre"].map(function(t){ return e("button", { key: t, className: theme === t ? "tab active" : "tab", onClick: function(){ setTheme(t); window.Ayegle.storage.save("ayegle_theme", t); } }, t); })),
        e("p", { className: "hint", style: { textAlign: "left" } }, "Thème actuel : " + theme)
      ),
      e("div", { className: "card" },
        e("h3", null, "🔔 Notifications"),
        e("p", null, notif ? "Activées — rappel du rituel du jour" : "Désactivées"),
        e("button", { onClick: function(){ var n = !notif; setNotif(n); window.Ayegle.storage.save("ayegle_notif", n); } }, notif ? "Désactiver" : "Activer")
      ),
      e("div", { className: "card" },
        e("h3", null, "📖 Guide"),
        e("p", { style: { color: "var(--muted)" } }, "1. Va sur ÉBOGA pour apprendre. 2. Va sur OMBIRI pour prier. 3. Va sur DISSOUMBA pour noter. 4. Reviens chaque jour, même 5 minutes.")
      )
    ) : null
  );
};