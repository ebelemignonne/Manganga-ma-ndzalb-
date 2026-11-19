// AYEGLE - js/components/PageHeader.js
window.Ayegle = window.Ayegle || {}; window.Ayegle.components = window.Ayegle.components || {};
window.Ayegle.components.PageHeader = function(props){
  var e = React.createElement;
  return e("div", null,
    e("button", {className:"back", onClick:function(){ props.go("home"); }}, "Retour"),
    e("header", {className:"hero", style:{background:props.color}},
      e("div", {className:"emoji-big"}, props.emoji),
      e("h1", null, props.title),
      e("p", null, props.subtitle)
    )
  );
};
