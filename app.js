'use strict';

// ── 1. ANIMACIÓN DE HERRAMIENTAS VOLANDO ──
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let tools = [];
const toolEmojis = ['🔧', '🔨', '🪛', '📏', '⚙️', '🔌', '🪚', '🧰'];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let i = 0; i < 25; i++) {
  tools.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 30 + 20,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.5,
    rot: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.02,
    emoji: toolEmojis[Math.floor(Math.random() * toolEmojis.length)],
    opacity: Math.random() * 0.4 + 0.1
  });
}

function animateTools() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  tools.forEach(t => {
    t.x += t.speedX; t.y += t.speedY; t.rot += t.rotSpeed;
    if (t.x < -50) t.x = canvas.width + 50;
    if (t.x > canvas.width + 50) t.x = -50;
    if (t.y < -50) t.y = canvas.height + 50;
    if (t.y > canvas.height + 50) t.y = -50;
    ctx.save();
    ctx.translate(t.x, t.y);
    ctx.rotate(t.rot);
    ctx.globalAlpha = t.opacity;
    ctx.font = `${t.size}px Arial`;
    ctx.fillText(t.emoji, 0, 0);
    ctx.restore();
  });
  requestAnimationFrame(animateTools);
}
animateTools();

// ── 2. LÓGICA DEL SIMULADOR ──
let playerName = localStorage.getItem("playerName") || "Usuario MGM";
const PS = { trazabilidad: 50, disponibilidad: 50, cumplimiento: 50, costo: 30 };
const MODULE_SCORES = [0,0,0,0,0];
let currentMod = 0;
const completed = new Set();
let globalScore = 0; // Puntaje total sobre 500

const MODULES = [
  { id:'entrega', name:'1. Entrega y Devolución', idx:0, colorHex:'#104C8F', icon:'📦', headline:'El ciclo de vida del activo', subtext:'La trazabilidad no empieza en el almacén, empieza cuando el trabajador recibe la herramienta.', stats:[{label:'Dificultad devolución', val:'Alta', cls:'bad'}, {label:'Impacto en costos', val:'Directo', cls:'bad'}], facts:[{icon:'📝', title:'Registro formal', body:'El formato de entrega es el único respaldo legal.'}, {icon:'🤝', title:'Compromiso', body:'Firmar el compromiso es aceptar la responsabilidad.'}], type: 'game' },
  { id:'inspeccion', name:'2. Inspección y Novedades', idx:1, colorHex:'#B5194B', icon:'📋', headline:'Reportar a tiempo salva el proyecto', subtext:'Ocultar un daño genera compras innecesarias. El reporte transparente es un valor corporativo.', stats:[{label:'Riesgo de ocultamiento', val:'Crítico', cls:'bad'}, {label:'Costo de reparación', val:'Evitable', cls:'good'}], facts:[{icon:'🔍', title:'Inspección', body:'Revisar el 100% de los activos evita daños.'}, {icon:'🚨', title:'Reporte', body:'Un daño reportado permite activar garantías.'}], type: 'game' },
  { id:'impacto', name:'3. Impacto Financiero', idx:2, colorHex:'#EAB308', icon:'💸', headline:'El costo oculto de una pérdida', subtext:'Una herramienta perdida no cuesta solo su precio. Afecta la rentabilidad y los bonos.', stats:[{label:'Costo real', val:'x3 el valor', cls:'bad'}, {label:'Impacto en bonos', val:'Directo', cls:'bad'}], facts:[{icon:'⏱️', title:'Tiempo perdido', body:'Buscar una herramienta perdida consume horas de trabajo.'}, {icon:'📉', title:'Rentabilidad', body:'Sin rentabilidad, no hay recursos para nuevos proyectos.'}], type: 'calculator' },
  { id:'cultura', name:'4. Compromiso y Cultura', idx:3, colorHex:'#5B1A96', icon:'🤝', headline:'El control es una responsabilidad compartida', subtext:'Almacén, supervisores y usuarios deben entender el impacto de sus decisiones.', stats:[{label:'Liderazgo visible', val:'Esencial', cls:'good'}, {label:'Cultura de reporte', val:'Transparencia', cls:'good'}], facts:[{icon:'🌟', title:'Reconocimiento', body:'Reconocer a quien reporta a tiempo fomenta la transparencia.'}, {icon:'⚖️', title:'Incentivos', body:'Si solo medimos avance de obra, descuidaremos las herramientas.'}], type: 'game' },
  { id:'seguridad', name:'5. Riesgo y Seguridad', idx:4, colorHex:'#E74C3C', icon:'⚠️', headline:'Un activo dañado es un riesgo para ti', subtext:'Usar herramientas en mal estado puede causar accidentes graves.', stats:[{label:'Riesgo eléctrico', val:'Alto', cls:'bad'}, {label:'Cultura de seguridad', val:'Prioridad', cls:'good'}], facts:[{icon:'⚡', title:'Seguridad', body:'Un multímetro dañado puede causar una descarga fatal.'}, {icon:'🛡️', title:'Prevención', body:'Reportar un activo en mal estado protege a todos.'}], type: 'game' }
];

function modStat(key, delta) {
  PS[key] = Math.max(0, Math.min(100, PS[key] + delta));
  renderVitals();
}

function renderVitals() {
  ['trazabilidad','disponibilidad','cumplimiento','costo'].forEach(k => {
    const fill = document.getElementById(`vf-${k}`);
    const num  = document.getElementById(`vn-${k}`);
    if (!fill || !num) return;
    fill.style.width = PS[k] + '%';
    num.textContent  = Math.round(PS[k]);
    fill.className   = 'vital-fill';
    if (k === 'costo') fill.classList.add('stress');
    else if (PS[k] < 35) fill.classList.add('warn');
  });
}

// AHORA SUMA LOS PUNTAJES (Máximo 500)
function updateGlobalScoreDisplay() {
  globalScore = MODULE_SCORES.reduce((a, b) => a + b, 0);
  const el = document.getElementById('globalScore');
  if (el) el.textContent = globalScore;
}

function showToast(type, msg) {
  const stack = document.getElementById('toastStack');
  const d = document.createElement('div');
  d.className = `toast ${type}`;
  d.innerHTML = msg;
  stack.appendChild(d);
  setTimeout(()=>{ d.style.opacity='0'; setTimeout(()=>d.remove(),400); }, 3500);
}

function showEdu(msg) {
  const bar = document.getElementById('eduBar');
  const inner = document.getElementById('eduBarInner');
  inner.innerHTML = msg;
  bar.classList.add('show');
  setTimeout(()=>bar.classList.remove('show'), 6000);
}

let decisionResolve = null;
function showDecision({stamp='DECISIÓN', scene='', title, text, context='', options}) {
  return new Promise(resolve => {
    decisionResolve = resolve;
    document.getElementById('dStamp').textContent = stamp;
    document.getElementById('dScene').innerHTML = scene;
    document.getElementById('dTitle').textContent = title;
    document.getElementById('dText').textContent  = text;
    
    const ctx = document.getElementById('dContext');
    if (context) { ctx.innerHTML = `<strong>Contexto:</strong> ${context}`; ctx.style.display='block'; }
    else ctx.style.display='none';

    const optEl = document.getElementById('dOptions');
    optEl.innerHTML = '';
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'dc-option';
      btn.innerHTML = `<span class="opt-txt">${opt.text}</span>`;
      btn.onclick = () => {
        document.getElementById('decisionModal').style.display = 'none';
        if (opt.effects) {
          Object.entries(opt.effects).forEach(([k,v]) => { if(k !== 'score') modStat(k, v); });
        }
        if (opt.edu) showEdu(`<strong>💡 Fundamento:</strong> ${opt.edu}`);
        if (decisionResolve) { decisionResolve(opt); decisionResolve=null; }
      };
      optEl.appendChild(btn);
    });
    document.getElementById('decisionModal').style.display = 'flex';
  });
}

function buildNav() {
  const inner = document.getElementById('modNavInner');
  if (!inner) return;
  inner.innerHTML = MODULES.map((m,i) => `
    <div class="mod-tab ${i===currentMod?'active':''} ${completed.has(i)?'done':''}" style="--c:${m.colorHex}" onclick="switchMod(${i})">
      <div class="mod-tab-icon">${m.icon}</div><span>${m.name}</span>
    </div>`).join('');

  const track = document.getElementById('progressTrack');
  if (!track) return;
  let html = '';
  MODULES.forEach((m,i) => {
    html += `<div class="pt-step ${i===currentMod?'active':''} ${completed.has(i)?'done':''}" style="--c:${m.colorHex}">
      <div class="pt-step-dot">${completed.has(i) ? '✓' : m.icon}</div></div>`;
    if (i < MODULES.length-1) html += `<div class="pt-connector ${completed.has(i)?'done':''}"></div>`;
  });
  track.innerHTML = html;
}

function switchMod(idx) {
  currentMod = idx;
  buildNav();
  buildModule(idx);
  window.scrollTo({top:0,behavior:'smooth'});
}

function buildModule(idx) {
  const m = MODULES[idx];
  const mc = document.getElementById('mainContent');
  mc.style.setProperty('--c', m.colorHex);
  
  let actionButton = '';
  if (idx === 2) {
    actionButton = `<button class="btn-primary" onclick="startCalculator(${idx})" style="--c:${m.colorHex}" id="btnStart_${idx}">▶ Iniciar Simulación Financiera</button>`;
  } else {
    const funcName = idx === 4 ? 'startScenario5' : 'startScenario';
    actionButton = `<button class="btn-primary" onclick="${funcName}(${idx})" style="--c:${m.colorHex}" id="btnStart_${idx}">▶ Iniciar Simulación</button>`;
  }

  mc.innerHTML = `
    <div class="mod-hero">
      <div>
        <div class="mod-badge" style="--c:${m.colorHex}"><div class="mod-badge-dot" style="background:${m.colorHex}"></div>Módulo ${idx+1} de ${MODULES.length}</div>
        <h1>${m.headline}</h1>
        <p class="mod-hero-desc">${m.subtext}</p>
        <div class="mod-hero-actions">${actionButton}</div>
      </div>
      <div class="mod-stat-panel">
        <div class="msp-header"><div class="msp-dot" style="background:${m.colorHex}"></div>Datos de Impacto</div>
        ${m.stats.map(s=>`<div class="msp-row"><span class="msp-label">${s.label}</span><span class="msp-val ${s.cls||'neu'}">${s.val}</span></div>`).join('')}
      </div>
    </div>
    <div class="section-label">Conceptos clave</div>
    <div class="facts-grid" style="--c:${m.colorHex}">
      ${m.facts.map(f=>`<div class="fact-card" style="--c:${m.colorHex}"><div class="fact-icon" style="font-size:24px">${f.icon}</div><h4>${f.title}</h4><p>${f.body}</p></div>`).join('')}
    </div>
    <div class="done-banner" id="doneBanner_${idx}">
      <div class="done-check">✓</div>
      <div class="done-text"><h3>¡Módulo superado! +${MODULE_SCORES[idx]} pts</h3><p>Tus indicadores han sido actualizados.</p></div>
    </div>`;
}

async function startScenario(idx) {
  document.getElementById(`btnStart_${idx}`).style.display = 'none';
  let score = 0;

  if (idx === 0) {
    const d1 = await showDecision({
      stamp:'18:00 — FIN DE JORNADA', scene:'⏰', title:'Devolución de herramienta', text:'Terminaste tu turno. Usaste un taladro percutora. Estás cansado y el almacén está cerrado.', context:'El activo debe ser devuelto hoy según el formato.',
      options:[
        {text:'Lo dejo en el maletero de mi carro y lo devuelvo mañana', effects:{trazabilidad:-20, costo:+15, cumplimiento:-15}, edu:'El activo queda sin custodia formal. Si se pierde o daña, la responsabilidad recae sobre ti.'},
        {text:'Lo dejo en el suelo del taller junto a otros equipos', effects:{trazabilidad:-10, costo:+10, cumplimiento:-10}, edu:'Genera desorden y riesgo de pérdida. Además, no queda registro de quién lo dejó.'},
        {text:'Me quedo 10 min, lo limpio y lo dejo registrado en el almacén', effects:{trazabilidad:+20, disponibilidad:+15, cumplimiento:+20, costo:-10}, edu:'¡Correcto! El registro y la inspección aseguran que el activo esté disponible mañana.'}
      ]
    });
    if (d1.text.includes('Me quedo')) score += 50;
    const d2 = await showDecision({
      stamp:'08:00 — DÍA SIGUIENTE', scene:'📋', title:'Recepción en almacén', text:'El encargado recibe el equipo. No hay acta de entrega previa y el taladro tiene un rayón nuevo.',
      options:[
        {text:'No reporto el rayón porque no fue mi culpa', effects:{trazabilidad:-15, costo:+20, cumplimiento:-20}, edu:'Ocultar una novedad impide activar mantenimiento y genera costos futuros mayores.'},
        {text:'Reporto la novedad, lleno el formato y firmo', effects:{trazabilidad:+15, disponibilidad:+10, cumplimiento:+15}, edu:'¡Correcto! El reporte transparente protege al trabajador y a la empresa.'}
      ]
    });
    if (d2.text.includes('Reporto')) score += 50;
  } 
  else if (idx === 1) {
    const d1 = await showDecision({
      stamp:'CAMPO — OBRA', scene:'👷', title:'Herramienta dañada en campo', text:'Un operario reporta que el multímetro no enciende. Mañana hay una entrega clave.',
      options:[
        {text:'Lo envuelvo y lo dejo en el almacén sin decir nada', effects:{trazabilidad:-20, disponibilidad:-25, costo:+20}, edu:'Perderás la oportunidad de repararlo a tiempo y mañana no tendrás el equipo.'},
        {text:'Reporto de inmediato al supervisor y solicito reemplazo', effects:{trazabilidad:+20, disponibilidad:+20, cumplimiento:+15, costo:-10}, edu:'¡Correcto! El reporte oportuno permite gestionar el reemplazo sin detener la obra.'}
      ]
    });
    if (d1.text.includes('Reporto')) score += 50;
    const d2 = await showDecision({
      stamp:'ALMACÉN — AUDITORÍA', scene:'🔍', title:'Inspección de lote', text:'Debes revisar 10 equipos devueltos ayer. Solo tienes 15 minutos.',
      options:[
        {text:'Reviso solo los que se ven sucios', effects:{cumplimiento:-20, trazabilidad:-10}, edu:'La inspección debe ser sistemática. Lo limpio también puede estar dañado internamente.'},
        {text:'Sigo la lista de chequeo y registro todo', effects:{cumplimiento:+20, trazabilidad:+15, disponibilidad:+10}, edu:'¡Correcto! La consistencia es clave para que el inventario sea confiable.'}
      ]
    });
    if (d2.text.includes('lista')) score += 50;
  } 
  else if (idx === 3) {
    const d1 = await showDecision({
      stamp:'REUNIÓN DE EQUIPO', scene:'🤝', title:'El dilema del incentivo', text:'El supervisor premia al equipo con menos "incidentes" reportados. Pero sabes que hay fallas ocultas.',
      options:[
        {text:'Sigo la corriente para no generar conflicto', effects:{cumplimiento:-20, costo:+15}, edu:'Los incentivos mal diseñados promueven el ocultamiento de daños y pérdidas.'},
        {text:'Propongo medir el reporte oportuno y la trazabilidad', effects:{trazabilidad:+20, cumplimiento:+20, costo:-10}, edu:'¡Excelente! Cambiar el incentivo cambia la cultura y mejora los indicadores reales.'}
      ]
    });
    if (d1.text.includes('Propongo')) score += 100;
  }

  finalizarModulo(idx, score);
}

async function startScenario5(idx) {
  document.getElementById(`btnStart_${idx}`).style.display = 'none';
  const d1 = await showDecision({
    stamp:'OBRA — 15:30 PM', scene:'⚡', title:'Cable de alimentación pelado', text:'Estás a punto de conectar un tablero de control. Notas que el cable de alimentación de tu herramienta tiene el aislamiento pelado y se ve cobre.', context:'Mañana hay una auditoría de seguridad y el supervisor no está.',
    options:[
      {text:'Lo uso con cuidado, total es solo un cable', effects:{cumplimiento:-20, costo:+20, trazabilidad:-15}, edu:'Un cable pelado puede generar un cortocircuito o una descarga eléctrica fatal. Tu vida vale más que terminar rápido.'},
      {text:'Dejo de usarlo, lo reporto al supervisor y pido otro', effects:{trazabilidad:+20, cumplimiento:+20, costo:-10, disponibilidad:+10}, edu:'¡Correcto! Reportar un riesgo a tiempo protege tu integridad y evita accidentes graves en la obra.'}
    ]
  });
  let score = d1.text.includes('Dejo') ? 100 : 0;
  finalizarModulo(idx, score);
}

function finalizarModulo(idx, score) {
  completed.add(idx);
  MODULE_SCORES[idx] = score;
  updateGlobalScoreDisplay(); // Actualiza la barra superior sumando el puntaje
  buildNav();
  
  const b = document.getElementById(`doneBanner_${idx}`);
  if (b) {
    b.querySelector('h3').textContent = `¡Módulo superado! +${score} pts`;
    b.classList.add('show');
  }

  if (completed.size >= MODULES.length) setTimeout(showFinalResults, 1500);
  else setTimeout(() => switchMod(currentMod + 1), 2500);
}

async function startCalculator(idx) {
  document.getElementById(`btnStart_${idx}`).style.display = 'none';
  const d1 = await showDecision({
    stamp:'ALMACÉN — 17:00 PM', scene:'💸', title:'Falta una herramienta', text:'Al hacer el inventario del día, notas que falta un taladro percutora valorado en $800.000. El operario que lo usó dice que "se lo dejó a alguien" y no sabe a quién.', context:'El proyecto avanza y el supervisor no está. Si no reportas la pérdida, el sistema lo marcará como "en uso".',
    options:[
      {text:'No reporto nada. Tal vez aparezca mañana y no quiero problemas.', effects:{trazabilidad:-25, costo:+20, cumplimiento:-15}, edu:'Ocultar una pérdida genera un "hueco" en el inventario. Cuando se necesite, no estará y habrá que comprar otra de urgencia.'},
      {text:'Reporto la novedad inmediatamente al supervisor y al almacén.', effects:{trazabilidad:+20, cumplimiento:+20, costo:-5}, edu:'¡Correcto! El reporte oportuno permite rastrear el activo, buscar responsables y evitar gastos innecesarios.'}
    ]
  });

  const esBueno = d1.text.includes('Reporto');
  const score = esBueno ? 100 : 0;
  const mc = document.getElementById('mainContent');
  const valorInicial = esBueno ? 0 : 800000;
  const horasInicial = esBueno ? 1 : 6;
  const personasInicial = esBueno ? 1 : 4;

  const calcHTML = `
    <div style="background:#fff; border:1px solid #ddd; border-radius:16px; padding:30px; box-shadow:0 10px 30px rgba(0,0,0,0.05);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
        <h3 style="color:#333;">Impacto Financiero de tu Decisión</h3>
        <span style="background:${esBueno?'#22C55E':'#E74C3C'}; color:white; padding:5px 12px; border-radius:20px; font-size:12px; font-weight:bold;">${esBueno ? 'Decisión Correcta' : 'Decisión Incorrecta'}</span>
      </div>
      <p style="color:#666; margin-bottom:20px; font-size:14px;">${esBueno ? 'Como reportaste a tiempo, el costo se minimizó.' : 'Al no reportar, la herramienta se perdió. MGM tuvo que comprar una nueva y detener la obra.'}</p>
      <div style="margin-bottom:15px;">
        <label style="font-weight:bold; font-size:14px;">Valor del activo perdido: <span id="valActivoTxt" style="color:#104C8F;">$${valorInicial.toLocaleString('es-CO')}</span></label>
        <input type="range" id="valActivo" min="0" max="2000000" step="50000" value="${valorInicial}" style="width:100%;" oninput="updateCalc()">
      </div>
      <div style="margin-bottom:15px;">
        <label style="font-weight:bold; font-size:14px;">Horas de retraso: <span id="valHorasTxt" style="color:#104C8F;">${horasInicial} horas</span></label>
        <input type="range" id="valHoras" min="0" max="24" step="1" value="${horasInicial}" style="width:100%;" oninput="updateCalc()">
      </div>
      <div style="margin-bottom:15px;">
        <label style="font-weight:bold; font-size:14px;">Personas afectadas: <span id="valPersonasTxt" style="color:#104C8F;">${personasInicial} personas</span></label>
        <input type="range" id="valPersonas" min="1" max="10" step="1" value="${personasInicial}" style="width:100%;" oninput="updateCalc()">
      </div>
      <div style="margin-top:30px; padding:20px; background:#FDF2F2; border-radius:12px; border-left:5px solid #E74C3C;">
        <div style="font-size:14px; color:#666; margin-bottom:5px;">COSTO TOTAL PARA MGM:</div>
        <div id="totalCosto" style="font-size:32px; font-weight:900; color:#E74C3C;">$0</div>
      </div>
      <button class="btn-primary" onclick="finishCalculator(${idx}, ${score})" style="margin-top:20px; width:100%; background:#EAB308;">Entendido, continuar →</button>
    </div>
  `;
  mc.innerHTML = calcHTML;
  updateCalc(); 
}

function updateCalc() {
  const valActivo = parseInt(document.getElementById('valActivo').value);
  const valHoras = parseInt(document.getElementById('valHoras').value);
  const valPersonas = parseInt(document.getElementById('valPersonas').value);
  document.getElementById('valActivoTxt').textContent = "$" + valActivo.toLocaleString('es-CO');
  document.getElementById('valHorasTxt').textContent = valHoras + " horas";
  document.getElementById('valPersonasTxt').textContent = valPersonas + " personas";
  const total = valActivo + (30000 * valHoras * valPersonas) + (valActivo * 0.20);
  document.getElementById('totalCosto').textContent = "$" + Math.round(total).toLocaleString('es-CO');
}

function finishCalculator(idx, score) {
  completed.add(idx);
  MODULE_SCORES[idx] = score;
  updateGlobalScoreDisplay();
  
  if (score > 0) {
    modStat('trazabilidad', 10);
    modStat('costo', -15);
  } else {
    modStat('trazabilidad', -15);
    modStat('costo', 20);
  }
  
  const mc = document.getElementById('mainContent');
  mc.innerHTML = `
    <div style="text-align:center; padding: 60px 20px; background: #fff; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); max-width: 600px; margin: 0 auto;">
      <div style="font-size: 60px; margin-bottom: 20px;">✅</div>
      <h2 style="color: #EAB308; margin-bottom: 10px; font-family: 'DM Sans', sans-serif;">¡Módulo Financiero completado!</h2>
      <p style="color: #666; font-size: 16px; margin-bottom: 30px;">Has entendido el impacto real de las decisiones en la operación de MGM.</p>
      <button onclick="avanzarModulo4()" style="background: #EAB308; color: white; border: none; padding: 15px 40px; font-size: 16px; font-weight: bold; border-radius: 8px; cursor: pointer; box-shadow: 0 4px 15px rgba(234, 179, 8, 0.4);">
        Continuar al Módulo 4 →
      </button>
    </div>
  `;
}

function avanzarModulo4() {
  buildNav();
  switchMod(3);
}

function showFinalResults() {
  document.getElementById('resultsScreen').style.display = 'flex';
  document.getElementById('rcScoreNum').textContent = globalScore;
  
  let rank = "Operador en Formación";
  if (globalScore >= 450) rank = "Guardián de Activos MGM";
  else if (globalScore >= 350) rank = "Supervisor Comprometido";
  else if (globalScore >= 200) rank = "Analista en Mejora";

  document.getElementById('rcRank').textContent = rank;
  document.getElementById('rcBreakdown').innerHTML = MODULES.map((m,i) => `
    <div class="rc-mod-card">
      <div class="rc-mod-left"><div class="rc-mod-icon" style="background:${m.colorHex}20; color:${m.colorHex}">${m.icon}</div><div class="rc-mod-name">${m.name}</div></div>
      <div class="rc-mod-pts" style="color:${m.colorHex}">${MODULE_SCORES[i]} <span style="font-size:12px;color:#888">/100</span></div>
    </div>
  `).join('');

  document.getElementById('rcRecs').innerHTML = `
    <div class="rc-recs-title">Recomendaciones Estratégicas para MGM</div>
    <div class="rc-rec-item"><div class="rc-rec-dot" style="background:#B5194B"></div><div>Implementar formatos digitales simples para registro de entrega/devolución.</div></div>
    <div class="rc-rec-item"><div class="rc-rec-dot" style="background:#104C8F"></div><div>Establecer un reconocimiento mensual al equipo con mayor trazabilidad.</div></div>
  `;

  document.getElementById('rcActions').innerHTML = `
    <button class="btn-restart" onclick="location.reload()">↺ Repetir</button>
    <button class="btn-share" id="btnDownload" style="background:#104C8F; padding: 15px 20px;">📥 Reporte TXT</button>
    <button class="btn-share" id="btnCertificate" style="background:#B5194B; padding: 15px 20px;">🏆 Certificado</button>
  `;

  document.getElementById('btnDownload').onclick = () => {
    const nombre = localStorage.getItem("playerName") || "Usuario";
    let texto = `=========================================\n   REPORTE DE SIMULACIÓN\n   MGM Ingeniería y Proyectos S.A.S.\n=========================================\n\n`;
    texto += `Participante: ${nombre}\nFecha: ${new Date().toLocaleString()}\nPuntuación Final: ${globalScore} / 500 pts\nNivel: ${rank}\n\n`;
    texto += `--- DESGLOSE POR MÓDULO ---\n`;
    MODULES.forEach((m, i) => {
      texto += `• ${m.name}: ${MODULE_SCORES[i]} / 100 pts\n`;
    });
    texto += `\n--- INDICADORES FINALES DE LA EMPRESA ---\n• Trazabilidad: ${Math.round(PS.trazabilidad)}%\n• Disponibilidad: ${Math.round(PS.disponibilidad)}%\n• Cumplimiento: ${Math.round(PS.cumplimiento)}%\n• Riesgo Operativo: ${Math.round(PS.costo)}%\n`;
    const blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a"); link.href = URL.createObjectURL(blob);
    link.download = `Reporte_Simulacion_${nombre.replace(/ /g, "_")}.txt`; link.click();
  };

  document.getElementById('btnCertificate').onclick = () => {
    const nombre = localStorage.getItem("playerName") || "Usuario";
    const fecha = new Date().toLocaleDateString();
    const certCanvas = document.createElement('canvas'); certCanvas.width = 1200; certCanvas.height = 850;
    const c = certCanvas.getContext('2d');
    c.fillStyle = "#FAFAFA"; c.fillRect(0, 0, 1200, 850);
    c.strokeStyle = "#B5194B"; c.lineWidth = 15; c.strokeRect(30, 30, 1140, 790);
    c.strokeStyle = "#104C8F"; c.lineWidth = 3; c.strokeRect(55, 55, 1090, 740);
    c.fillStyle = "#104C8F"; c.font = "bold 28px Arial"; c.textAlign = "center"; c.fillText("MGM INGENIERÍA Y PROYECTOS S.A.S.", 600, 130);
    c.fillStyle = "#666"; c.font = "18px Arial"; c.fillText("Gestión Humana y Calidad", 600, 165);
    c.fillStyle = "#B5194B"; c.font = "bold 60px Georgia, serif"; c.fillText("CERTIFICADO", 600, 280);
    c.fillStyle = "#333"; c.font = "24px Arial"; c.fillText("Se otorga el presente reconocimiento a:", 600, 340);
    c.fillStyle = "#000"; c.font = "bold 50px Arial"; c.fillText(nombre, 600, 430);
    c.beginPath(); c.moveTo(300, 460); c.lineTo(900, 460); c.strokeStyle = "#CCC"; c.lineWidth = 2; c.stroke();
    c.fillStyle = "#444"; c.font = "20px Arial"; c.fillText("Por haber completado con éxito el Simulador de Cultura de Cuidado y Trazabilidad,", 600, 510);
    c.fillText("demostrando compromiso con la gestión de activos de la compañía.", 600, 540);
    c.fillStyle = "#B5194B"; c.font = "bold 32px Arial"; c.fillText(`Nivel: ${rank}`, 600, 620);
    c.fillStyle = "#104C8F"; c.font = "bold 24px Arial"; c.fillText(`Puntuación: ${globalScore} / 500 pts`, 600, 660);
    c.fillStyle = "#666"; c.font = "16px Arial"; c.fillText(`Fecha de emisión: ${fecha}`, 600, 740);
    c.fillStyle = "#333"; c.font = "bold 18px Arial"; c.fillText("Dirección de Gestión Humana", 600, 780);
    const link = document.createElement("a"); link.download = `Certificado_MGM_${nombre.replace(/ /g, "_")}.png`; link.href = certCanvas.toDataURL("image/png"); link.click();
    showToast("good", "🏆 ¡Certificado descargado con éxito!");
  };
}

// ── INICIALIZACIÓN DE LA APP ──
document.getElementById('btnLaunch').onclick = () => {
  const name = document.getElementById('playerName').value.trim();
  if (name) localStorage.setItem("playerName", name);
  
  localStorage.removeItem('mgm_completed_mods');
  localStorage.removeItem('mgm_scores');
  localStorage.removeItem('mgm_global_score');
  localStorage.removeItem('mgm_vitals');

  document.getElementById('introScreen').style.display = 'none';
  document.getElementById('mainApp').style.display = 'flex';
  renderVitals();
  switchMod(0);
};

window.addEventListener('DOMContentLoaded', () => {
  localStorage.clear();
  document.getElementById('introScreen').style.display = 'flex';
  document.getElementById('mainApp').style.display = 'none';
});