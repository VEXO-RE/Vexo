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

  // Validar que cada desarrollo/lote tenga un campo 'tipo' valido.
  // Esto evita que los filtros 'Departamentos'/'Lotes' del navbar y del mapa
  // se rompan silenciosamente si algun registro viene sin tipo o con un
  // valor inesperado (ej. capturado mal en el TSV de origen).
  (function validarTipos(){
    var TIPOS_VALIDOS = ['departamentos', 'lotes'];
    var sinTipo = [];
    var tipoInvalido = [];
    (window.DESARROLLOS || []).forEach(function(d){
      var t = (d.tipo || '').toString().trim().toLowerCase();
      if(!t){
        sinTipo.push(d.id + ' (' + (d.nombre_corto || d.nombre || '?') + ')');
        d.tipo = 'Departamentos'; // fallback seguro: no rompe filtros existentes
        return;
      }
      var esValido = TIPOS_VALIDOS.some(function(tv){ return t.indexOf(tv) !== -1 || tv.indexOf(t) !== -1; });
      if(!esValido){
        tipoInvalido.push(d.id + ' (' + (d.nombre_corto || d.nombre || '?') + '): "' + d.tipo + '"');
      }
    });
    if(sinTipo.length) console.warn('VEXO sanity-check: desarrollos SIN campo tipo (se asigno "Departamentos" por defecto):', sinTipo);
    if(tipoInvalido.length) console.warn('VEXO sanity-check: desarrollos con tipo no reconocido (revisar dato de origen):', tipoInvalido);
  })();

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
