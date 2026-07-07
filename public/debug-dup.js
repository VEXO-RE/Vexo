<script>
(function() {
  const logFilePath = "C:\\Users\\HP-Home\\Downloads\\logs\\duplicaciones-runtime.log";

  // Función para escribir en archivo vía fetch a servidor local (ejemplo Node/Express)
  function writeLog(message) {
    console.log(message); // siempre en consola
    // Si tienes backend local, envía log:
    fetch("http://localhost:3000/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ log: message })
    }).catch(err => console.warn("No se pudo guardar log:", err));
  }

  // Hook para innerHTML
  const originalInnerHTML = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
  Object.defineProperty(Element.prototype, 'innerHTML', {
    set: function(value) {
      const msg = `[VALIDACIÓN] innerHTML en: ${this.tagName}#${this.id||""}.${this.className||""} con contenido: ${String(value).substring(0,120)}`;
      writeLog(msg);
      return originalInnerHTML.set.call(this, value);
    },
    get: function() {
      return originalInnerHTML.get.call(this);
    }
  });

  // Hook para appendChild
  const originalAppendChild = Element.prototype.appendChild;
  Element.prototype.appendChild = function(child) {
    const msg = `[VALIDACIÓN] appendChild en: ${this.tagName}#${this.id||""}.${this.className||""} añadiendo: ${child.tagName||child.nodeName}`;
    writeLog(msg);
    return originalAppendChild.call(this, child);
  };
})();
</script>
