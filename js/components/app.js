// AYEGLE - js/app.js - POINT D'ENTREE UNIQUE
// Ce fichier ne contient QUE le routage. Il ne contient aucune logique metier.
// Regle anti-regression : pour ajouter une page, ajouter 1 fichier dans js/pages/ + 1 ligne ici.
window.Ayegle = window.Ayegle || {};
(function(){
  var e = React.createElement;
  window.Ayegle.storage.migrate();
  function App(){
    var st = React.useState("home"); var page = st[0], setPage = st[1];
    var content = null;
    if(page==="home") content = e(window.Ayegle.pages.Home, {go:setPage});
    if(page==="eboga") content = e(window.Ayegle.pages.Eboga, {go:setPage});
    if(page==="ombiri") content = e(window.Ayegle.pages.Ombiri, {go:setPage});
    if(page==="dissoumba") content = e(window.Ayegle.pages.Dissoumba, {go:setPage});
    return e("div", {className:"app"}, content, e(window.Ayegle.components.BottomNav, {page:page, go:setPage}));
  }
  ReactDOM.createRoot(document.getElementById("root")).render(e(App));
})();
