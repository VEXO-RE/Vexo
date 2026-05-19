(function(){
  // Basic runtime sanity checks to avoid site-breaking undefined globals
  function ensureArray(name){
    if(typeof window[name] === 'undefined' || !Array.isArray(window[name])){
      console.warn('VEXO: '+name+' missing or invalid, creating empty array');
      window[name] = window[name] || [];
    }
  }
  ensureArray('DESARROLLOS');
  ensureArray('CIUDADES');
  ensureArray('BLOG_POSTS');

  // Lightweight fallback for missing functions used by embedded map or external scripts
  if(typeof window.showPage !== 'function'){
    window.showPage = function(name){
      try{
        document.querySelectorAll('.page').forEach(function(p){p.classList.remove('active')});
        var pg = document.getElementById('page-'+name);
        if(pg) pg.classList.add('active');
        console.warn('VEXO: fallback showPage executed for', name);
      }catch(e){ console.warn('VEXO: showPage fallback failed', e); }
    };
  }

  if(typeof window.verificaDesarrollos !== 'function'){
    // placeholder API so other scripts can call it safely
    window.verificaDesarrollos = function(){ return Array.isArray(window.DESARROLLOS) ? window.DESARROLLOS.length : 0 };
  }
})();
