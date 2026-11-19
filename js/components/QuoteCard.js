// AYEGLE - js/components/QuoteCard.js - Composant reutilisable
window.Ayegle = window.Ayegle || {}; window.Ayegle.components = window.Ayegle.components || {};
window.Ayegle.components.QuoteCard = function(props){
  var e = React.createElement;
  return e("div", {className:"card"},
    e("p", {className:"quote"}, "\u201C"+props.quote.texte+"\u201D"),
    e("p", {className:"author"}, "- "+props.quote.auteur),
    e("button", {onClick:props.onNew}, "Nouvelle citation")
  );
};
