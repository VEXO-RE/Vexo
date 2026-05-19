(function(){
  // Theme helper: apply saved theme or system preference
  var root = document.documentElement;
  function applyTheme(t){
    if(t==='dark') root.setAttribute('data-theme','dark');
    else root.removeAttribute('data-theme');
    try{ localStorage.setItem('vexo_theme', t||'auto'); }catch(e){}
  }
  var saved = null;
  try{ saved = localStorage.getItem('vexo_theme'); }catch(e){}
  if(saved && saved!=='auto') applyTheme(saved);
  else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) applyTheme('dark');
  // Expose setter
  window.setVexoTheme = applyTheme;
})();
