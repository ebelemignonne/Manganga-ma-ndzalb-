// AYEGLE - js/components/BottomNav.js - Navigation unique, utilisee par toutes les pages
window.Ayegle = window.Ayegle || {}; window.Ayegle.components = window.Ayegle.components || {};
window.Ayegle.components.BottomNav = function(props){
  var e = React.createElement;
  function btn(label, page){ return e("button", {className: props.page===page ? "active" : "", onClick:function(){ props.go(page); }}, label); }
  return e("nav", {className:"bottom-nav"}, btn("Accueil","home"), btn("Eboga","eboga"), btn("Ombiri","ombiri"), btn("Dissoumba","dissoumba"));
};
