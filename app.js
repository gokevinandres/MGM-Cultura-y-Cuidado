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

// ── 2. FRENTES Y DATOS ──
const FRENTES = [
  {
    id: 'comercial',
    name: 'Comercial',
    icon: '💼',
    colorHex: '#104C8F',
    short: 'Cotización y ofertas con información incompleta.',
    diagnostico: {
      titulo: 'Proceso de Formulación de Ofertas',
      bloques: [
        {
          titulo: 'Cuello de botella: el "trabajo invisible" (doble digitación en Excel)',
          parrafos: [
            'El proceso actual de estructuración de ofertas presenta una alta dependencia de la transferencia manual de información. El flujo operativo exige exportar los Análisis de Precios Unitarios (APUs) desde el software de estimación, para luego ser consolidados en una matriz de costos en Excel y, finalmente, trasladar dichos datos a una segunda matriz destinada al cálculo de precios de venta.',
            'Esta fragmentación genera dos problemáticas principales: primero, una limitación en la capacidad analítica del equipo, al destinar la mayor parte de su tiempo a labores de digitación y transcripción de datos (actividades de bajo valor agregado); y segundo, una alta vulnerabilidad a errores humanos en la manipulación de cifras críticas para la rentabilidad del negocio.'
          ]
        }
      ]
    }
  },
  {
    id: 'tecnico',
    name: 'Técnico',
    icon: '🛠️',
    colorHex: '#5B1A96',
    short: 'Diseño y entregables con exceso de formatos físicos.',
    diagnostico: {
      titulo: 'Proceso de Diseño',
      bloques: [
        {
          titulo: 'Cuello de botella: exceso de formatos y actas físicas',
          parrafos: [
            'El procedimiento de diseño presenta una marcada dependencia de la gestión documental física, exigiendo el diligenciamiento de más de 11 formatos y la firma presencial en "Actas de mesa de trabajo" para validar la transición entre etapas.',
            'Esta estructura genera una fricción operativa significativa, ya que el talento de ingeniería destina una proporción crítica de su jornada a tareas administrativas y logísticas (búsqueda de firmas, impresión, archivo y escaneo) en detrimento de sus funciones técnicas. Como consecuencia directa, se afecta el lead time de los entregables (planos y memorias de cálculo) y se limita la agilidad en la respuesta hacia las áreas de ejecución.'
          ]
        }
      ]
    }
  },
  {
    id: 'operativo',
    name: 'Operativo',
    icon: '⚙️',
    colorHex: '#B5194B',
    short: 'Abastecimiento, activos y trazabilidad en obra.',
    diagnostico: {
      titulo: 'Proceso de Abastecimiento y Control de Activos',
      bloques: [
        {
          titulo: 'Gestión documental de proveedores',
          parrafos: [
            'El proceso de abastecimiento comprende cuatro subprocesos: compras, contratos, control de inventarios y gestión de materiales y suministros. Su finalidad es garantizar la disponibilidad de materiales, equipos, herramientas, mano de obra y servicios requeridos para la ejecución de los proyectos.',
            'Se identifica que algunos proveedores no entregan los certificados de conformidad de producto correspondientes a los materiales suministrados. Esta situación representa una dificultad para la verificación documental de los productos recibidos y el cumplimiento de los requisitos de calidad establecidos para los suministros.'
          ]
        },
        {
          titulo: 'Gestión de maquinaria y herramientas (Cultura de Cuidado)',
          parrafos: [
            'La gestión de maquinaria y herramientas comprende las solicitudes de equipos requeridos por los proyectos y su posterior envío hacia los lugares de ejecución de las obras. Se identifican las siguientes situaciones críticas:'
          ],
          lista: [
            'Deterioro de equipos: equipos que llegan dañados a los proyectos o que sufren deterioro durante su utilización.',
            'Falta de devolución de equipos: al finalizar las obras, algunos equipos no son retornados al almacén.',
            'Control de equipos en obra: dificultades en el seguimiento de ubicación, estado y responsable de custodia.'
          ]
        }
      ]
    }
  },
  {
    id: 'reto',
    name: 'El Reto',
    icon: '🎯',
    colorHex: '#EAB308',
    short: 'La pregunta central: incertidumbre, información incompleta e inmediatez.',
    diagnostico: {
      titulo: 'Rediseño Organizacional frente a la Incertidumbre',
      bloques: [
        {
          titulo: '¿Cuál es el reto central de MGM?',
          parrafos: [
            '"¿Cómo rediseñar y optimizar nuestros procesos comerciales, técnicos y operativos para responder de manera eficiente a entornos de alta incertidumbre, información incompleta y requerimientos de mayor inmediatez por parte de los clientes?"'
          ]
        },
        {
          titulo: 'El modelo a cambiar',
          parrafos: [
            'Históricamente, MGM ha operado con un modelo secuencial de "compromiso total", asumiendo que la información siempre está completa y es estable. Sin embargo, la realidad del sector energético exige un cambio de paradigma: pasar al compromiso por etapas, gestionando la modularidad, los supuestos explícitos y las decisiones reversibles.'
          ]
        },
        {
          titulo: '¿Cómo aportan los 3 frentes a este reto?',
          lista: [
            'Comercial: Permite cotizar de forma modular y rápida, declarando supuestos claros en lugar de esperar a tener todos los planos, reduciendo el tiempo de respuesta.',
            'Técnico: Implementa el diseño por etapas y gates de revisión, permitiendo avanzar con matrices de supuestos sin que la falta de un plano detenga toda la operación.',
            'Operativo: Garantiza la ejecución mediante trazabilidad digital en tiempo real (QR y reportes), evitando que la obra se detenga por pérdida de herramientas.'
          ]
        }
      ]
    }
  }
];

// ── 3. FUNCIONES PRINCIPALES ──

// ¡ESTA ES LA FUNCIÓN QUE FALTABA Y DIBUJA LAS TARJETAS!
function buildFrentesCards() {
  const grid = document.getElementById('frentesGrid');
  if (!grid) return;
  grid.innerHTML = FRENTES.map(f => `
    <div class="frente-card" style="--c:${f.colorHex}" onclick="entrarFrente('${f.id}')">
      <div class="frente-icon">${f.icon}</div>
      <div class="frente-name">${f.name}</div>
      <div class="frente-desc">${f.short}</div>
      <div class="frente-cta">Entrar →</div>
    </div>
  `).join('');
}

function entrarFrente(id) {
  const frente = FRENTES.find(f => f.id === id);
  if (!frente) return;

  document.getElementById('introScreen').style.display = 'none';
  document.getElementById('mainApp').style.display = 'flex';

  const nav = document.getElementById('modNav');

  if (id === 'operativo') {
    nav.style.display = 'block'; 
    buildNavOperativo();
    switchModOperativo('teoria'); 
  } else {
    nav.style.display = 'block'; 
    mostrarFrenteDiagnosticoSimple(frente);
  }
}

function mostrarFrenteDiagnosticoSimple(frente) {
  const mc = document.getElementById('mainContent');
  mc.style.setProperty('--c', frente.colorHex);

  document.getElementById('modNavInner').innerHTML = `
    <div style="display:flex; align-items:center; gap:16px; width:100%;">
      <button onclick="volverAlInicio()" style="background:transparent; border:none; color:var(--muted); font-size:13px; font-weight:600; cursor:pointer; display:flex; align-items:center; gap:6px; padding:10px 0;">
        ← Volver a Frentes
      </button>
      <div class="mod-tab active" style="--c:${frente.colorHex}; margin-left:auto; border:none; padding:10px 16px;">
        <div class="mod-tab-icon" style="background:transparent;">${frente.icon}</div><span>${frente.name}</span>
      </div>
    </div>`;

  const bloquesHTML = frente.diagnostico.bloques.map(b => `
    <div class="diagnostico-block">
      <h4>${b.titulo}</h4>
      ${b.parrafos ? b.parrafos.map(p => `<p>${p}</p>`).join('') : ''}
      ${b.lista ? `<ul>${b.lista.map(li => `<li>${li}</li>`).join('')}</ul>` : ''}
    </div>
  `).join('');

  mc.innerHTML = `
    <div class="frente-hero" style="--c:${frente.colorHex}">
      <div class="frente-hero-tag">Frente ${frente.name}</div>
      <h1>${frente.diagnostico.titulo}</h1>
      ${bloquesHTML}
      <div style="margin-top:20px;">
        <button onclick="volverAlInicio()" style="background:transparent; border:1.5px solid var(--border2); color:var(--text2); padding:13px 24px; border-radius:var(--r); font-weight:700; font-size:14px; cursor:pointer;">← Volver a Frentes</button>
      </div>
    </div>
  `;
}

function volverAlInicio() {
  document.getElementById('introScreen').style.display = 'flex';
  document.getElementById('mainApp').style.display = 'none';
  buildFrentesCards();
}

// ── NAVEGACIÓN INTERNA OPERATIVO ──
function buildNavOperativo() {
  const inner = document.getElementById('modNavInner');
  if (!inner) return;
  
  let tabsHTML = `
    <div class="mod-tab active" id="tab-teoria" style="--c:#B5194B" onclick="switchModOperativo('teoria')">
      <div class="mod-tab-icon">📖</div><span>1. Teoría / Abastecimiento</span>
    </div>
    <div class="mod-tab" id="tab-documental" style="--c:#036B4C" onclick="switchModOperativo('documental')">
      <div class="mod-tab-icon">📁</div><span>2. Gestión Documental</span>
    </div>
    <div class="mod-tab" id="tab-talento" style="--c:#104C8F" onclick="switchModOperativo('talento')">
      <div class="mod-tab-icon">👥</div><span>3. Plan Talento Humano</span>
    </div>
  `;

  inner.innerHTML = `
    <div style="display:flex; align-items:center; width:100%; overflow-x:auto;">
      <button onclick="volverAlInicio()" style="background:transparent; border:none; color:var(--muted); font-size:13px; font-weight:600; cursor:pointer; display:flex; align-items:center; gap:6px; padding:12px 16px; white-space:nowrap; border-right:1px solid var(--border2); margin-right:8px;">
        ← Volver a Frentes
      </button>
      <div style="display:flex; gap:4px;">${tabsHTML}</div>
    </div>
  `;
}

function switchModOperativo(vista) {
  document.getElementById('tab-teoria').classList.remove('active');
  document.getElementById('tab-documental').classList.remove('active');
  document.getElementById('tab-talento').classList.remove('active');
  
  if (vista === 'teoria') {
    document.getElementById('tab-teoria').classList.add('active');
    mostrarTeoriaOperativo();
  } else if (vista === 'documental') {
    document.getElementById('tab-documental').classList.add('active');
    mostrarGestionDocumental();
  } else {
    document.getElementById('tab-talento').classList.add('active');
    mostrarTalentoHumano();
  }
  window.scrollTo({top:0,behavior:'smooth'});
}


function mostrarTeoriaOperativo() {
  const mc = document.getElementById('mainContent');
  const frente = FRENTES.find(f => f.id === 'operativo');
  mc.style.setProperty('--c', frente.colorHex);

  const bloquesHTML = frente.diagnostico.bloques.map(b => `
    <div class="diagnostico-block">
      <h4>${b.titulo}</h4>
      ${b.parrafos ? b.parrafos.map(p => `<p>${p}</p>`).join('') : ''}
      ${b.lista ? `<ul>${b.lista.map(li => `<li>${li}</li>`).join('')}</ul>` : ''}
    </div>
  `).join('');

  mc.innerHTML = `
    <div class="frente-hero" style="--c:${frente.colorHex}">
      <div class="frente-hero-tag">Frente Operativo</div>
      <h1>${frente.diagnostico.titulo}</h1>
      ${bloquesHTML}
      <div style="margin-top:24px;">
        <button class="btn-primary" onclick="switchModOperativo('talento')" style="--c:${frente.colorHex}">Ir a Plan Talento Humano →</button>
      </div>
    </div>
  `;
}

// ── NUEVA PESTAÑA: GESTIÓN DOCUMENTAL ──
function mostrarGestionDocumental() {
  const mc = document.getElementById('mainContent');
  mc.style.setProperty('--c', '#036B4C');

  mc.innerHTML = `
    <div class="frente-hero" style="--c:#036B4C">
      <div class="frente-hero-tag">Frente Operativo</div>
      <h1>Gestión Documental de Proveedores</h1>
      
      <div class="diagnostico-block">
        <h4>Propuesta de Estandarización</h4>
        <p>Se recomienda implementar un procedimiento estandarizado que permita establecer mecanismos sistemáticos para la solicitud, recepción, verificación, registro, seguimiento y conservación de los documentos requeridos para los materiales, equipos y servicios adquiridos por MGM.</p>
        <p>La propuesta contempla la definición de requisitos por tipo de suministro, asignación de responsabilidades (Compras y Almacén) e incorporación de controles en las etapas de adquisición y recepción.</p>
      </div>

      <div class="diagnostico-block">
        <h4>Mecanismos Preventivos</h4>
        <p>Se recomienda incorporar la verificación de requisitos en la evaluación de proveedores, así como establecer la solicitud anticipada de certificados de conformidad y fichas técnicas desde la emisión de órdenes de compra.</p>
        <p>Para los casos de documentación pendiente, se establecerán mecanismos de seguimiento y escalamiento para evitar la pérdida de trazabilidad. Finalmente, se fortalecerá la cultura de cumplimiento mediante socialización, capacitación y seguimiento de indicadores.</p>
      </div>

      <div class="section-label" style="margin-top:40px; --c:#036B4C">Caja de Herramientas Propuestas</div>
      
      <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 16px;">
        
        <!-- Herramienta 1 -->
        <div class="herramienta-card" style="--c:#036B4C">
          <div class="herramienta-info">
            <div class="herramienta-icon-box">📋</div>
            <div class="herramienta-text">
              <h4>Matriz de Requisitos Documentales</h4>
              <p>Identifica qué documentos exige cada tipo de suministro.</p>
            </div>
          </div>
          <button onclick="descargarMatrizRequisitos()" class="btn-premium">📥 Descargar Excel</button>
        </div>

        <!-- Herramienta 2 -->
        <div class="herramienta-card" style="--c:#036B4C">
          <div class="herramienta-info">
            <div class="herramienta-icon-box">✅</div>
            <div class="herramienta-text">
              <h4>Lista de Verificación Documental</h4>
              <p>Comprueba el cumplimiento de requisitos al recibir materiales.</p>
            </div>
          </div>
          <button onclick="descargarListaVerificacion()" class="btn-premium">📥 Descargar Formato</button>
        </div>

        <!-- Herramienta 3 -->
        <div class="herramienta-card" style="--c:#036B4C">
          <div class="herramienta-info">
            <div class="herramienta-icon-box">🗂️</div>
            <div class="herramienta-text">
              <h4>Registro de Proveedores y Documentos</h4>
              <p>Centraliza la información y consulta documentos pendientes.</p>
            </div>
          </div>
          <button onclick="descargarRegistroProveedores()" class="btn-premium">📥 Descargar Excel</button>
        </div>

        <!-- Herramienta 4 -->
        <div class="herramienta-card" style="--c:#036B4C">
          <div class="herramienta-info">
            <div class="herramienta-icon-box">📈</div>
            <div class="herramienta-text">
              <h4>Indicador de Cumplimiento Documental</h4>
              <p>Mide la proporción de suministros con documentación completa.</p>
            </div>
          </div>
          <button onclick="descargarIndicadorCumplimiento()" class="btn-premium">📥 Descargar Excel</button>
        </div>

      </div>

      <div style="margin-top:40px;">
        <button onclick="switchModOperativo('talento')" class="btn-primary" style="--c:#036B4C">Ir a Plan de Talento Humano →</button>
      </div>
    </div>
  `;
}

// ── FUNCIONES DE DESCARGA (GESTIÓN DOCUMENTAL) ──

function descargarMatrizRequisitos() {
  const datos = [
    ["Tipo de Suministro", "Documento Requerido", "Obligatorio (Si/No)", "Área que verifica"],
    ["Equipos eléctricos", "Certificado de conformidad de producto", "Si", "Compras / Almacén"],
    ["Equipos eléctricos", "Ficha técnica", "Si", "Almacén"],
    ["Materiales de construcción", "Ficha técnica", "Si", "Almacén"],
    ["Herramientas manuales", "Manual de usuario", "No", "Almacén"],
    ["Servicios", "Acta de recibo a satisfacción", "Si", "Compras"]
  ];
  generarExcelProfesional(datos, "Matriz_Requisitos_Documentales.xlsx", "Matriz Requisitos", "#036B4C");
  mostrarToastExito("Matriz de Requisitos (.xlsx) descargada");
}

function descargarRegistroProveedores() {
  const datos = [
    ["NIT Proveedor", "Nombre Proveedor", "Documento Pendiente", "Fecha Solicitud", "Fecha Límite", "Estado", "Responsable"],
    ["900.123.456-1", "Suministros Eléctricos S.A.", "Certificado de conformidad", "2026-11-01", "2026-11-15", "Pendiente", "Compras"],
    ["800.987.654-2", "Ferretería Central", "Ficha técnica", "2026-11-05", "2026-11-10", "Completado", "Almacén"]
  ];
  generarExcelProfesional(datos, "Registro_Proveedores_Documentos.xlsx", "Registro Proveedores", "#036B4C");
  mostrarToastExito("Registro de Proveedores (.xlsx) descargado");
}

function descargarIndicadorCumplimiento() {
  const datos = [
    ["Mes", "Total Suministros", "Doc. Completa", "Doc. Pendiente", "% Cumplimiento"],
    ["Enero", 0, 0, 0, "0%"],
    ["Febrero", 0, 0, 0, "0%"],
    ["Marzo", 0, 0, 0, "0%"],
    ["Abril", 0, 0, 0, "0%"],
    ["Mayo", 0, 0, 0, "0%"],
    ["Junio", 0, 0, 0, "0%"],
    ["Julio", 0, 0, 0, "0%"],
    ["Agosto", 0, 0, 0, "0%"],
    ["Septiembre", 0, 0, 0, "0%"],
    ["Octubre", 0, 0, 0, "0%"],
    ["Noviembre", 0, 0, 0, "0%"],
    ["Diciembre", 0, 0, 0, "0%"]
  ];
  generarExcelProfesional(datos, "Indicador_Cumplimiento_Documental.xlsx", "Indicador", "#036B4C");
  mostrarToastExito("Indicador de Cumplimiento (.xlsx) descargado");
}

// Fábrica de Excel con Estilos (Colores, Bordes, Negritas)
function generarExcelProfesional(datos, nombreArchivo, nombreHoja, colorHex) {
  const ws = XLSX.utils.aoa_to_sheet(datos);
  
  // Ancho de columnas automático (un poco más ancho para que respire)
  const wscols = datos[0].map(() => ({ wch: 25 }));
  ws['!cols'] = wscols;

  // Aplicar estilos a la primera fila (Encabezados)
  const rango = XLSX.utils.decode_range(ws['!ref']);
  for (let C = rango.s.c; C <= rango.e.c; ++C) {
    const direccion = XLSX.utils.encode_cell({ r: 0, c: C });
    if (!ws[direccion]) continue;
    
    // Color de fondo (quitando el # del hex), texto blanco, negrita
    ws[direccion].s = {
      fill: { fgColor: { rgb: colorHex.replace('#', 'FF') } }, // Ej: FF036B4C
      font: { color: { rgb: "FFFFFFFF" }, bold: true, sz: 12 },
      alignment: { vertical: "center", horizontal: "center" },
      border: {
        top: { style: "thin", color: { rgb: "FFFFFFFF" } },
        bottom: { style: "thin", color: { rgb: "FFFFFFFF" } }
      }
    };
  }

  // Crear libro y exportar
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, nombreHoja);
  
  // Escribir el archivo
  XLSX.writeFile(wb, nombreArchivo, { cellStyles: true });
}

function descargarListaVerificacion() {
  let texto = `==================================================\n`;
  texto += `   LISTA DE VERIFICACIÓN DOCUMENTAL EN RECEPCIÓN\n`;
  texto += `==================================================\n\n`;
  texto += `Proveedor: ________________________________________\n`;
  texto += `Orden de Compra No: _______________________________\n`;
  texto += `Fecha de Recepción: _______________________________\n\n`;
  texto += `INSTRUCCIONES: Marque [X] si el documento fue entregado.\n\n`;
  texto += `[ ] Certificado de conformidad de producto.\n`;
  texto += `[ ] Ficha técnica del material o equipo.\n`;
  texto += `[ ] Manual de usuario o guía rápida.\n`;
  texto += `[ ] Acta de entrega firmada por el proveedor.\n`;
  texto += `[ ] Certificado de garantía (si aplica).\n\n`;
  texto += `Resultado: \n`;
  texto += `[ ] RECIBIDO A SATISFACCIÓN (Documentación completa)\n`;
  texto += `[ ] RECIBIDO CON OBSERVACIONES (Documentación pendiente)\n\n`;
  texto += `Firma Almacenista: _________________________________\n`;
  descargarArchivo(texto, "Lista_Verificacion_Documental.txt", "text/plain");
  mostrarToastExito("Lista de Verificación descargada");
}




// ── RUTA DE IMPLEMENTACIÓN (TIMELINE) ──
function mostrarTalentoHumano() {
  const mc = document.getElementById('mainContent');
  mc.style.setProperty('--c', '#104C8F');

  const fases = [
    {
      num: 1, titulo: "Diagnóstico", semanas: "Semanas 1–2",
      actividades: "Entrevistas breves; revisión de registros; encuesta de barreras; observación de entrega/devolución; línea base.",
      responsables: "Gestión Humana, almacén, líderes de proyecto.",
      entregables: "Diagnóstico de factores humanos; línea base.",
      detalle: {
        herramientas: ["Formato de encuesta de barreras (Google Forms)", "Lista de chequeo de observación en campo", "Plantilla de Excel para Línea Base"],
        kpis: ["% de participación en encuestas", "Cantidad de pérdidas/día registradas (Línea base)"],
        consejo: "No busques culpar a nadie en esta fase. El objetivo es obtener la 'foto' real de cómo está MGM hoy. Entrevista a los operarios en su entorno (obra) y no en oficinas."
      }
    },
    {
      num: 2, titulo: "Roles y responsabilidades", semanas: "Semanas 3–4",
      actividades: "Revisar perfiles; definir responsabilidades por etapa; acordar compromisos de custodia; incorporar control en inducción.",
      responsables: "Gestión Humana, dirección, almacén, calidad.",
      entregables: "Matriz de responsabilidades; compromisos; ajustes a inducción.",
      detalle: {
        herramientas: ["Matriz RACI (Responsable, Aprobador, Consultado, Informado)", "Acta de compromiso de custodia de activos"],
        kpis: ["% de cargos con matriz de responsabilidad clara", "% de nuevos ingresos con inducción actualizada"],
        consejo: "Asegúrate de que cada activo tenga UN solo dueño. Si una herramienta tiene tres responsables, en la práctica no tiene ninguno."
      }
    },
    {
      num: 3, titulo: "Comunicación y movilización", semanas: "Semanas 5–6",
      actividades: "Lanzar mensaje de cambio; charlas cortas; comunicar impactos; recoger inquietudes; participación de líderes.",
      responsables: "Gestión Humana y líderes de proyecto.",
      entregables: "Plan de comunicación; materiales; registro de participación.",
      detalle: {
        herramientas: ["Afiches en almacén y obra", "Guion para microcharlas de 5 minutos", "Buzón de inquietudes (físico o digital)"],
        kpis: ["% de asistencia a las charlas", "Número de inquietudes recibidas y resueltas"],
        consejo: "Enfócate en el modelo ADKAR: primero genera 'Conciencia' (mostrar cuánto cuesta una pérdida) y luego 'Deseo' (involucrar a los operarios en proponer soluciones)."
      }
    },
    {
      num: 4, titulo: "Formación y competencias", semanas: "Semanas 7–8",
      actividades: "Capacitación práctica sobre recepción, uso, inspección, reporte, traslado y devolución; evaluación.",
      responsables: "Gestión Humana, almacén y supervisores.",
      entregables: "Plan de capacitación; matriz de competencias.",
      detalle: {
        herramientas: ["Simulador web interactivo (el que estamos diseñando)", "Listas de chequeo de inspección", "Formato de evaluación de competencias"],
        kpis: ["% de personas capacitadas", "% de aprobación de la evaluación", "Nivel de conocimiento demostrado"],
        consejo: "La asistencia no es igual a competencia. Usa el simulador para que tomen decisiones reales en un entorno seguro antes de ir a la obra."
      }
    },
    {
      num: 5, titulo: "Piloto", semanas: "Semanas 9–12",
      actividades: "Seleccionar proyecto; socializar reglas; aplicar rutinas de control; registrar incidencias y retroalimentación.",
      responsables: "Responsable del proyecto piloto, almacén, Gestión Humana.",
      entregables: "Informe del piloto; incidencias; ajustes.",
      detalle: {
        herramientas: ["Códigos QR en las herramientas", "App móvil para reporte de novedades", "Panel de control del piloto"],
        kpis: ["Tasa de pérdida", "Tiempo de devolución", "% de reportes de novedad oportunos", "Tasa de daño"],
        consejo: "No elijas un proyecto perfecto para el piloto. Elige uno con retos reales (mucha rotación, herramientas pesadas). Ahí es donde verás si el proceso funciona."
      }
    },
    {
      num: 6, titulo: "Evaluación y refuerzo", semanas: "Semanas 13–16",
      actividades: "Comparar línea base y resultados; auditar muestra; reconocer buenas prácticas; definir continuidad.",
      responsables: "Dirección, Gestión Humana, proyectos.",
      entregables: "Informe de evaluación; plan de sostenimiento.",
      detalle: {
        herramientas: ["Dashboard comparativo (Antes vs Después)", "Acta de cierre de proyecto con conciliación de activos", "Programa de incentivos"],
        kpis: ["Reducción de pérdidas (vs Línea Base)", "% de devoluciones a tiempo", "Índice de satisfacción del usuario"],
        consejo: "Celebra los logros públicamente. Si el equipo sintió que su esfuerzo sirvió para mejorar, la cultura de cuidado se mantendrá sin necesidad de vigilarlos."
      }
    }
  ];

  const timelineHTML = fases.map(f => `
    <div class="timeline-item">
      <div class="timeline-dot">${f.num}</div>
      <div class="timeline-card">
        <div class="timeline-header">
          <div class="timeline-title">${f.titulo}</div>
          <div class="timeline-weeks">${f.semanas}</div>
        </div>
        <div class="timeline-section">
          <strong>Actividades:</strong> ${f.actividades}
        </div>
        <div class="timeline-section">
          <strong>Responsables:</strong> ${f.responsables}
        </div>
        <div class="timeline-meta">
          <span>📦 <strong>Entregables:</strong> ${f.entregables}</span>
        </div>
        <button class="btn-timeline" onclick="abrirDetalleFase(${f.num - 1})">
          <span>🔍 Ver detalles de la fase</span>
        </button>
      </div>
    </div>
  `).join('');

  mc.innerHTML = `
    <div class="frente-hero" style="--c:#104C8F; padding-bottom: 10px;">
      <div class="frente-hero-tag">Plan de Intervención</div>
      <h1>Ruta de Implementación: Talento Humano</h1>
      <p class="mod-hero-desc" style="margin-bottom: 30px;">Cronograma de referencia de 16 semanas para el fortalecimiento de la cultura de cuidado y control de activos en MGM, basado en el modelo ADKAR.</p>
      
      <div class="timeline">
        ${timelineHTML}
      </div>

      <div style="margin-top:40px; display:flex; justify-content:center;">
        <button onclick="switchModOperativo('teoria')" style="background:transparent; border:1.5px solid var(--border2); color:var(--text2); padding:13px 24px; border-radius:var(--r); font-weight:700; font-size:14px; cursor:pointer;">← Volver a Teoría Operativa</button>
      </div>
    </div>
  `;

  window.fasesData = fases;
}

// ── MODAL DE DETALLES DEL TIMELINE ──
function abrirDetalleFase(index) {
  const fase = window.fasesData[index];
  if (!fase) return;

  const modalContent = document.getElementById('timelineModalContent');
  
  const herramientasHTML = fase.detalle.herramientas.map(h => `<li>${h}</li>`).join('');
  const kpisHTML = fase.detalle.kpis.map(k => `<li>${k}</li>`).join('');

  // Lógica especial para los botones de descarga de la Fase 1
    let botonesDescargaHTML = '';
  if (fase.num === 1) {
    botonesDescargaHTML = `
      <div style="display:flex; flex-direction:column; gap:10px; margin-top:15px; margin-bottom:20px;">
        <button onclick="descargarEncuestaBarreras()" style="background:#104C8F; color:white; border:none; padding:12px; border-radius:8px; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;">
          📥 Descargar Preguntas Encuesta (TXT)
        </button>
        <button onclick="descargarListaChequeo()" style="background:#104C8F; color:white; border:none; padding:12px; border-radius:8px; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;">
          📋 Descargar Lista de Chequeo (TXT)
        </button>
      </div>
    `;
  }
  modalContent.innerHTML = `
    <div class="modal-title">${fase.titulo}</div>
    <div class="modal-subtitle">Fase ${fase.num} · ${fase.semanas}</div>
    
    <div class="modal-body">
      <h4>🎯 ¿Qué se hace en esta fase?</h4>
      <p>${fase.actividades}</p>

      <h4>🛠️ Herramientas sugeridas</h4>
      <ul>${herramientasHTML}</ul>
      
      ${botonesDescargaHTML} <!-- Aquí inyectamos los botones de descarga -->

      <h4>📊 Indicadores (KPIs) a medir</h4>
      <ul>${kpisHTML}</ul>

      <h4>💡 Consejo Práctico</h4>
      <p style="background: var(--surface2); padding: 12px; border-radius: 8px; border-left: 3px solid var(--c);"><em>${fase.detalle.consejo}</em></p>
    </div>
    
    <button class="modal-close" onclick="cerrarDetalleFase()">Cerrar ventana</button>
  `;

  document.getElementById('timelineModal').classList.add('active');
}
// ── FUNCIONES DE DESCARGA (FASE 1) ──

function descargarEncuestaBarreras() {
  let texto = `==================================================\n`;
  texto += `   ENCUESTA DE BARRERAS - GESTIÓN DE ACTIVOS MGM\n`;
  texto += `==================================================\n\n`;
  texto += `Instrucciones: Copia estas preguntas en Google Forms.\n\n`;
  texto += `1. ¿Cuál es el mayor problema que enfrentas al devolver una herramienta al final de tu turno?\n`;
  texto += `   a) El almacén está muy lejos\n`;
  texto += `   b) El proceso de registro es muy demorado\n`;
  texto += `   c) El almacén ya está cerrado\n`;
  texto += `   d) No sé a quién entregárselo\n\n`;
  texto += `2. ¿Qué haces cuando una herramienta se daña durante su uso?\n`;
  texto += `   a) La reporto de inmediato a mi supervisor\n`;
  texto += `   b) La dejo en el almacén sin decir nada\n`;
  texto += `   c) Intento repararla yo mismo\n`;
  texto += `   d) Sigo usándola hasta que termine el turno\n\n`;
  texto += `3. ¿Sabes con claridad a quién debes reportarle una novedad?\n`;
  texto += `   a) Sí, siempre\n`;
  texto += `   b) A veces, depende de la obra\n`;
  texto += `   c) No lo tengo claro\n\n`;
  texto += `4. Del 1 al 5, ¿qué tan fácil es llenar el formato de entrega actual?\n`;
  texto += `   (1 = Muy difícil, 5 = Muy fácil)\n\n`;
  texto += `5. ¿Qué propones para que no se sigan perdiendo las herramientas en obra?\n`;
  texto += `   [Pregunta abierta]\n`;

  descargarArchivo(texto, "Encuesta_Barreras_MGM.txt", "text/plain");
  mostrarToastExito("Encuesta descargada");
}

function descargarListaChequeo() {
  let texto = `==================================================\n`;
  texto += `   LISTA DE CHEQUEO - OBSERVACIÓN EN CAMPO\n`;
  texto += `   Fase 1: Diagnóstico de Gestión de Activos\n`;
  texto += `==================================================\n\n`;
  texto += `Obra / Proyecto: ______________________________\n`;
  texto += `Fecha de observación: _________________________\n`;
  texto += `Observador: ___________________________________\n\n`;
  texto += `INSTRUCCIONES: Marque [X] si el comportamiento se cumple.\n\n`;
  texto += `--- MOMENTO DE ENTREGA ---\n`;
  texto += `[ ] El operario firma el formato de entrega.\n`;
  texto += `[ ] El almacenista verifica el estado del equipo antes de entregarlo.\n`;
  texto += `[ ] Se registra claramente el nombre de quien recibe.\n`;
  texto += `[ ] El operario inspecciona la herramienta antes de salir del almacén.\n\n`;
  texto += `--- USO EN CAMPO ---\n`;
  texto += `[ ] La herramienta se mantiene en el lugar asignado.\n`;
  texto += `[ ] Se evitan transferencias informales (pasar la herramienta a otro compañero).\n`;
  texto += `[ ] El operario usa los EPP adecuados para la herramienta.\n\n`;
  texto += `--- MOMENTO DE DEVOLUCIÓN ---\n`;
  texto += `[ ] El equipo se entrega limpio.\n`;
  texto += `[ ] El almacenista revisa el estado y firma la devolución.\n`;
  texto += `[ ] Si hay daño, se reporta inmediatamente en el formato.\n\n`;
  texto += `Observaciones adicionales:\n`;
  texto += `__________________________________________________\n`;
  texto += `__________________________________________________\n`;

  descargarArchivo(texto, "Lista_Chequeo_Campo_MGM.txt", "text/plain");
  mostrarToastExito("Lista de chequeo descargada");
}

function descargarPlantillaExcel() {
  const datos = [
    ["Mes", "Pérdidas de Herramientas ($)", "Herramientas Dañadas", "Devoluciones Tarde", "Total Equipos en Obra", "Porcentaje de Trazabilidad"],
    ["Enero", 0, 0, 0, 0, "0%"],
    ["Febrero", 0, 0, 0, 0, "0%"],
    ["Marzo", 0, 0, 0, 0, "0%"],
    ["Abril", 0, 0, 0, 0, "0%"],
    ["Mayo", 0, 0, 0, 0, "0%"],
    ["Junio", 0, 0, 0, 0, "0%"],
    ["Julio", 0, 0, 0, 0, "0%"],
    ["Agosto", 0, 0, 0, 0, "0%"],
    ["Septiembre", 0, 0, 0, 0, "0%"],
    ["Octubre", 0, 0, 0, 0, "0%"],
    ["Noviembre", 0, 0, 0, 0, "0%"],
    ["Diciembre", 0, 0, 0, 0, "0%"]
  ];
  generarExcel(datos, "Linea_Base_MGM.xlsx", "Linea Base");
  mostrarToastExito("Plantilla Excel (.xlsx) descargada");
}

function descargarMatrizRACI() {
  const datos = [
    ["Etapa del Proceso", "Almacenista", "Supervisor de Obra", "Residente de Proyecto", "Trabajador / Usuario", "Gestión Humana"],
    ["Solicitud de herramienta", "R", "A", "C", "I", "I"],
    ["Aprobación y asignación", "A", "R", "C", "I", "I"],
    ["Entrega de herramienta", "R", "C", "I", "I", "I"],
    ["Uso y custodia", "I", "C", "I", "R", "I"],
    ["Inspección antes/después", "I", "R", "C", "R", "C"],
    ["Reporte de novedad o daño", "C", "R", "I", "R", "I"],
    ["Traslado o reasignación", "R", "C", "A", "I", "I"],
    ["Devolución al almacén", "R", "C", "I", "R", "I"],
    ["Cierre de proyecto y conciliación", "C", "R", "A", "I", "C"],
    [],
    ["NOTA: R = Responsable, A = Aprobador, C = Consultado, I = Informado"]
  ];
  generarExcel(datos, "Matriz_RACI_MGM.xlsx", "Matriz RACI");
  mostrarToastExito("Matriz RACI (.xlsx) descargada");
}


function descargarMatrizRequisitos() {
  const datos = [
    ["MATRIZ DE REQUISITOS DOCUMENTALES", "", "", ""],
    ["MGM Ingeniería y Proyectos S.A.S. - Gestión de Proveedores", "", "", ""],
    ["", "", "", ""],
    ["Tipo de Suministro", "Documento Requerido", "Obligatorio", "Área que verifica"],
    ["Equipos eléctricos", "Certificado de conformidad de producto", "Sí", "Compras / Almacén"],
    ["Equipos eléctricos", "Ficha técnica", "Sí", "Almacén"],
    ["Materiales de construcción", "Ficha técnica", "Sí", "Almacén"],
    ["Herramientas manuales", "Manual de usuario", "No", "Almacén"],
    ["Servicios", "Acta de recibo a satisfacción", "Sí", "Compras"]
  ];
  
  // Configuración de columnas: { wch: ancho }
  const cols = [{ wch: 25 }, { wch: 40 }, { wch: 15 }, { wch: 20 }];
  
  // Se pasa el color corporativo verde
  generarExcelCorporativo(datos, cols, "Matriz_Requisitos_Documentales.xlsx", "Matriz Requisitos", "036B4C");
  mostrarToastExito("Matriz de Requisitos descargada");
}

function descargarRegistroProveedores() {
  const datos = [
    ["REGISTRO DE PROVEEDORES Y DOCUMENTOS", "", "", "", "", "", ""],
    ["MGM Ingeniería y Proyectos S.A.S. - Control Documental", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["NIT Proveedor", "Nombre Proveedor", "Documento Pendiente", "Fecha Solicitud", "Fecha Límite", "Estado", "Responsable"],
    ["900.123.456-1", "Suministros Eléctricos S.A.", "Certificado de conformidad", "2026-11-01", "2026-11-15", "Pendiente", "Compras"],
    ["800.987.654-2", "Ferretería Central", "Ficha técnica", "2026-11-05", "2026-11-10", "Completado", "Almacén"]
  ];
  
  const cols = [{ wch: 18 }, { wch: 30 }, { wch: 30 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }];
  
  generarExcelCorporativo(datos, cols, "Registro_Proveedores_Documentos.xlsx", "Registro", "036B4C");
  mostrarToastExito("Registro de Proveedores descargado");
}

function descargarIndicadorCumplimiento() {
  const datos = [
    ["INDICADOR DE CUMPLIMIENTO DOCUMENTAL", "", "", "", ""],
    ["MGM Ingeniería y Proyectos S.A.S. - Gestión de Proveedores", "", "", "", ""],
    ["", "", "", "", ""],
    ["Mes", "Total Suministros", "Doc. Completa", "Doc. Pendiente", "% Cumplimiento"],
    ["Enero", 0, 0, 0, "0%"],
    ["Febrero", 0, 0, 0, "0%"],
    ["Marzo", 0, 0, 0, "0%"],
    ["Abril", 0, 0, 0, "0%"],
    ["Mayo", 0, 0, 0, "0%"],
    ["Junio", 0, 0, 0, "0%"],
    ["Julio", 0, 0, 0, "0%"],
    ["Agosto", 0, 0, 0, "0%"],
    ["Septiembre", 0, 0, 0, "0%"],
    ["Octubre", 0, 0, 0, "0%"],
    ["Noviembre", 0, 0, 0, "0%"],
    ["Diciembre", 0, 0, 0, "0%"]
  ];
  
  const cols = [{ wch: 15 }, { wch: 20 }, { wch: 15 }, { wch: 15 }, { wch: 18 }];
  
  generarExcelCorporativo(datos, cols, "Indicador_Cumplimiento_Documental.xlsx", "Indicador", "036B4C");
  mostrarToastExito("Indicador descargado");
}


// ── FÁBRICA DE EXCEL CORPORATIVO ──
function generarExcelCorporativo(datos, cols, nombreArchivo, nombreHoja, colorHex) {
  const ws = XLSX.utils.aoa_to_sheet(datos);
  
  // Asignar anchos de columna
  ws['!cols'] = cols;

  // Combinar celdas para el título y subtítulo
  ws['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: datos[0].length - 1 } }, // Título (Fila 0)
    { s: { r: 1, c: 0 }, e: { r: 1, c: datos[0].length - 1 } }  // Subtítulo (Fila 1)
  ];

  const rango = XLSX.utils.decode_range(ws['!ref']);

  // Recorrer todas las celdas para aplicar estilos
  for (let R = rango.s.r; R <= rango.e.r; ++R) {
    for (let C = rango.s.c; C <= rango.e.c; ++C) {
      const dir = XLSX.utils.encode_cell({ r: R, c: C });
      const cell = ws[dir];
      
      if (!cell) continue; // Si la celda está vacía, saltar

      // ESTILO BASE PARA TODAS LAS CELDAS
      cell.s = {
        font: { name: "Arial", sz: 11, color: { rgb: "333333" } },
        alignment: { vertical: "center", wrapText: true },
        border: {
          top: { style: "thin", color: { rgb: "D3D3D3" } },
          bottom: { style: "thin", color: { rgb: "D3D3D3" } },
          left: { style: "thin", color: { rgb: "D3D3D3" } },
          right: { style: "thin", color: { rgb: "D3D3D3" } }
        }
      };

      // Fila 0: Título Principal
      if (R === 0) {
        cell.s.font = { name: "Arial", sz: 16, bold: true, color: { rgb: "FFFFFF" } };
        cell.s.fill = { fgColor: { rgb: colorHex.replace('#', 'FF') } };
        cell.s.alignment = { vertical: "center", horizontal: "center" };
        cell.s.border = {}; // Sin bordes para el título
      }
      
      // Fila 1: Subtítulo
      else if (R === 1) {
        cell.s.font = { name: "Arial", sz: 11, italic: true, color: { rgb: "FFFFFF" } };
        cell.s.fill = { fgColor: { rgb: colorHex.replace('#', 'CC') } }; // Un tono más claro
        cell.s.alignment = { vertical: "center", horizontal: "center" };
        cell.s.border = {};
      }

      // Fila 2: Espacio en blanco
      else if (R === 2) {
        cell.s.border = {};
      }

      // Fila 3: Cabeceras de la tabla
      else if (R === 3) {
        cell.s.font = { name: "Arial", sz: 11, bold: true, color: { rgb: "FFFFFF" } };
        cell.s.fill = { fgColor: { rgb: "555555" } };
        cell.s.alignment = { vertical: "center", horizontal: "center", wrapText: true };
      }

      // Filas de datos (R >= 4)
      else {
        // Zebra (rayas grises y blancas para leer mejor)
        if (R % 2 === 0) {
          cell.s.fill = { fgColor: { rgb: "F9F9F9" } };
        }
      }
    }
  }

  // Ajustar altura de las filas (Título más alto)
  ws['!rows'] = [{ hpt: 30 }, { hpt: 20 }, { hpt: 10 }, { hpt: 25 }];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, nombreHoja);
  
  // Exportar con soporte de estilos
  XLSX.writeFile(wb, nombreArchivo, { cellStyles: true });
}

// Función maestra para descargar archivos
function descargarArchivo(contenido, nombreArchivo, tipoMime) {
  const blob = new Blob([contenido], { type: tipoMime });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = nombreArchivo;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Función maestra para generar archivos Excel reales
function generarExcel(datos, nombreArchivo, nombreHoja) {
  // Crear hoja de trabajo
  const ws = XLSX.utils.aoa_to_sheet(datos);
  
  // Ajustar el ancho de las columnas (opcional, para que se vea bonito)
  ws['!cols'] = [{ wch: 25 }, { wch: 35 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }];

  // Crear libro
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, nombreHoja);

  // Descargar
  XLSX.writeFile(wb, nombreArchivo);
}

// Función para mostrar un mensaje flotante de éxito
function mostrarToastExito(mensaje) {
  const toast = document.createElement('div');
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.right = '20px';
  toast.style.background = '#22C55E';
  toast.style.color = 'white';
  toast.style.padding = '12px 24px';
  toast.style.borderRadius = '8px';
  toast.style.fontWeight = 'bold';
  toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  toast.style.zIndex = '9999';
  toast.innerText = "✅ " + mensaje;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.5s';
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}
function cerrarDetalleFase() {
  document.getElementById('timelineModal').classList.remove('active');
}

// Cerrar el modal si se hace clic fuera de la tarjeta
document.getElementById('timelineModal').addEventListener('click', (e) => {
  if (e.target.id === 'timelineModal') {
    cerrarDetalleFase();
  }
});

// Inicialización
window.addEventListener('DOMContentLoaded', () => {
  buildFrentesCards();
  document.getElementById('introScreen').style.display = 'flex';
  document.getElementById('mainApp').style.display = 'none';
});