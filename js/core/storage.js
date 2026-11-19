// AYEGLE - js/core/storage.js - SEUL endroit qui touche localStorage
// Regle anti-regression : aucun autre fichier ne doit appeler localStorage directement, il passe par ici.
window.Ayegle = window.Ayegle || {};
(function(){
  var PREFIX = "ayegle_";
  function key(k){ return k.indexOf(PREFIX)===0 ? k : PREFIX+k; }
  function load(k, fallback){
    try{ var raw = localStorage.getItem(key(k)); if(!raw) return fallback; return JSON.parse(raw); }
    catch(e){ console.error("[ayegle/storage] load "+k, e); return fallback; }
  }
  function save(k, value){
    try{ localStorage.setItem(key(k), JSON.stringify(value)); return true; }
    catch(e){ console.error("[ayegle/storage] save "+k, e); return false; }
  }
  function migrate(){
    // Anciennes cles sans prefixe -> vers ayegle_
    var legacy = ["ombiri_tabs_v2","ombiri_trash_ultimate","ombiri_temple_state","media_playlists","quote_id"];
    try{
      legacy.forEach(function(old){
        var v = localStorage.getItem(old);
        if(v!==null && localStorage.getItem(key(old))===null){ localStorage.setItem(key(old), v); localStorage.removeItem(old); }
      });
    }catch(e){ console.error("[ayegle/storage] migrate", e); }
  }
  window.Ayegle.storage = { load: load, save: save, migrate: migrate };
})();
