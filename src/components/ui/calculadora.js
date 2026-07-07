
// Calculadora hipotecaria reutilizable
window.renderCalculadora = function(containerId, desarrolloId){
  var dev = (window.DESARROLLOS || []).find(d => d.id == desarrolloId);
  var container = document.getElementById(containerId);
  if(!container || !dev) return;

  container.innerHTML = `
    <div class="calc-box">
      <h3>Calculadora Hipotecaria</h3>
      <label>Monto del crédito:</label>
      <input type="number" id="credito-${desarrolloId}" value="${dev.precio || 1000000}" />
      <label>Plazo (años):</label>
      <select id="plazo-${desarrolloId}">
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
      <label>Tasa de interés (%):</label>
      <input type="number" id="tasa-${desarrolloId}" value="10" />
      <button onclick="calcularHipoteca('${desarrolloId}')">Calcular</button>
      <div id="resultado-${desarrolloId}" class="calc-result"></div>
    </div>
  `;
};

window.calcularHipoteca = function(devId){
  var monto = parseFloat(document.getElementById(`credito-${devId}`).value);
  var plazo = parseInt(document.getElementById(`plazo-${devId}`).value);
  var tasa = parseFloat(document.getElementById(`tasa-${devId}`).value) / 100;

  var meses = plazo * 12;
  var mensualidad = (monto * tasa/12) / (1 - Math.pow(1 + tasa/12, -meses));

  document.getElementById(`resultado-${devId}`).innerHTML =
    `Pago mensual aproximado: $${mensualidad.toFixed(2)}`;
};
