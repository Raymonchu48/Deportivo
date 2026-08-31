(function () {
  'use strict';

  var main = document.querySelector('main#inicio');
  var menu = document.querySelector('.menu');
  if (!main || !menu || document.getElementById('cluster')) return;

  var clusterLink = document.createElement('a');
  clusterLink.href = '#cluster';
  clusterLink.textContent = 'cluster';
  clusterLink.setAttribute('aria-label', 'Abrir Sport Performance Cluster');
  menu.appendChild(clusterLink);

  var section = document.createElement('section');
  section.id = 'cluster';
  section.className = 'fit-cluster-shell';
  section.hidden = true;
  section.innerHTML = [
    '<div class="fit-grid-bg" aria-hidden="true"></div>',
    '<div class="fit-scanline" aria-hidden="true"></div>',
    '<div class="fit-system">',
      '<header class="fit-command-bar">',
        '<div class="fit-command-brand"><b>RACV://FITNESS VISION</b><span>SPORT · HEALTH · PERFORMANCE</span></div>',
        '<div class="fit-online"><i></i><span>SYSTEM ONLINE</span><time id="fitClock">--:--:--</time></div>',
        '<div class="fit-docs"><a href="CV_Deporte.pdf" target="_blank" rel="noopener">CV.PDF ↗</a><a href="Cartas_Recomendacion.pdf" target="_blank" rel="noopener">RECOMENDACIONES ↗</a></div>',
      '</header>',
      '<div class="fit-main-grid">',
        '<aside class="fit-panel fit-profile-panel" data-fit-hud>',
          '<div class="fit-panel-title"><span>01</span>PROFILE TELEMETRY</div>',
          '<div class="fit-identity">',
            '<div class="fit-identity-dial"><span>RC</span><i></i><i></i></div>',
            '<div><small>IDENTITY // SPORT-2026</small><h2>RAMÓN ALBERTO<br>CURBALÁN VEGA</h2><p>Entrenamiento · nutrición · psicología · gestión</p></div>',
          '</div>',
          '<div class="fit-tags"><span>ENTRENADOR</span><span>NUTRICIÓN</span><span>FITNESS</span><span>COACHING</span><span>GESTIÓN</span></div>',
          '<p class="fit-profile-copy"><strong>Visión integral del rendimiento:</strong> conectar cuerpo, mente, hábitos y organización dentro de un mismo sistema profesional.</p>',
          '<div class="fit-data-lines" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>',
          '<div class="fit-profile-actions"><button type="button" data-fit-route="sobre-mi">OPEN PROFILE <b>→</b></button><button type="button" data-fit-route="formacion">OPEN TRAINING <b>→</b></button><button type="button" data-fit-route="proyectos">OPEN PROJECTS <b>→</b></button></div>',
        '</aside>',
        '<section class="fit-core-panel" aria-label="Núcleo audiovisual Fitness Vision">',
          '<div class="fit-core-header"><span>HUMAN PERFORMANCE SYSTEM</span><span>MEDIA CORE // 26 SEC</span></div>',
          '<div class="fit-core-layout">',
            '<nav class="fit-node-rail fit-node-rail-left" aria-label="Módulos deportivos, lado izquierdo">',
              '<button type="button" class="is-active" data-fit-node="training"><span>01</span><b>TRAINING</b><small>FUERZA · TÉCNICA</small></button>',
              '<button type="button" data-fit-node="adapted"><span>04</span><b>ADAPTED</b><small>CAPACIDAD · AUTONOMÍA</small></button>',
              '<button type="button" data-fit-node="recovery"><span>05</span><b>RECOVERY</b><small>MOVILIDAD · DESCANSO</small></button>',
            '</nav>',
            '<div class="fit-video-frame">',
              '<video class="fit-core-video" autoplay muted loop playsinline preload="metadata" poster="fitness-vision-poster.jpg" src="fitness-vision-cluster.mp4" aria-label="Fitness Vision, núcleo audiovisual del cluster"></video>',
              '<div class="fit-video-corners" aria-hidden="true"><i></i><i></i><i></i><i></i></div>',
              '<div class="fit-video-title"><small>WELCOME TO</small><h1>SPORT<br>PERFORMANCE<br><span>CLUSTER</span></h1><p>Ciencia, método y experiencia conectados.</p></div>',
              '<button type="button" class="fit-video-open" data-fit-video><span><i></i>MEDIA STREAM // LIVE</span><b>ABRIR CON SONIDO</b></button>',
            '</div>',
            '<nav class="fit-node-rail fit-node-rail-right" aria-label="Módulos deportivos, lado derecho">',
              '<button type="button" data-fit-node="nutrition"><span>02</span><b>NUTRITION</b><small>HÁBITOS · ENERGÍA</small></button>',
              '<button type="button" data-fit-node="mind"><span>03</span><b>MIND</b><small>FOCUS · ADHERENCIA</small></button>',
              '<button type="button" data-fit-node="management"><span>06</span><b>MANAGEMENT</b><small>EQUIPOS · RECURSOS</small></button>',
            '</nav>',
          '</div>',
          '<div class="fit-signal-bar" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>',
        '</section>',
        '<aside class="fit-panel fit-active-panel" data-fit-hud>',
          '<div class="fit-panel-title"><span>02</span>ACTIVE MODULE</div>',
          '<dl class="fit-runtime"><div><dt>SESSION</dt><dd id="fitElapsed">00:00:00</dd></div><div><dt>FRAME RATE</dt><dd><span id="fitFps">60</span> FPS</dd></div><div><dt>VIEWPORT</dt><dd id="fitViewport">-- × --</dd></div><div><dt>MODE</dt><dd id="fitMode">EXPLORE</dd></div></dl>',
          '<div class="fit-active-module"><small id="fitActiveCode">MODULE 01 // ACTIVE</small><h2 id="fitActiveTitle">Entrenamiento y rendimiento</h2><p id="fitActiveCopy">Planificación, fuerza, técnica, progresión y control de carga dentro de una visión integral.</p><button type="button" class="fit-open-module">OPEN MODULE <b>→</b></button></div>',
          '<div class="fit-module-index"><span>01</span><span>02</span><span>03</span><span>04</span><span>05</span><span>06</span></div>',
          '<div class="fit-keymap">1–6 FOCUS · ENTER OPEN<br>A AUTO · T CONSOLE · H HUD · ESC CLOSE</div>',
        '</aside>',
      '</div>',
      '<section class="fit-workflow" aria-label="Flujo profesional"><div class="fit-workflow-lead"><small>PERFORMANCE LOOP</small><strong>Del análisis a la mejora continua</strong></div><ol><li><span>01</span><b>Evaluar</b><small>Punto de partida</small></li><li><span>02</span><b>Planificar</b><small>Estrategia individual</small></li><li><span>03</span><b>Ejecutar</b><small>Acción con método</small></li><li><span>04</span><b>Medir</b><small>Datos y evolución</small></li><li><span>05</span><b>Ajustar</b><small>Mejora continua</small></li></ol></section>',
      '<section class="fit-metrics" aria-label="Métricas profesionales"><article><span>◉</span><div><b>1000 h</b><small>Máster en alimentación y nutrición</small></div></article><article><span>III</span><div><b>Nivel 3</b><small>Certificado profesional SEP</small></div></article><article><span>↔</span><div><b>300 h</b><small>Musculación, fitness y dietética</small></div></article><article><span>360°</span><div><b>Visión integral</b><small>Salud, rendimiento, mente y gestión</small></div></article></section>',
      '<div class="fit-controls"><span>SYSTEM CONTROL</span><button type="button" data-fit-action="auto">◉ AUTO</button><button type="button" class="is-active" data-fit-action="explore">⌁ EXPLORE</button><button type="button" data-fit-action="console">&gt;_ CONSOLE</button><button type="button" data-fit-action="hud">⌗ HUD</button></div>',
    '</div>',
    '<div class="fit-module-overlay" aria-hidden="true"><div class="fit-module-shell"><header><span class="fit-module-code">MODULE // 00</span><strong class="fit-module-title">SYSTEM MODULE</strong><button type="button" class="fit-module-close">CLOSE ×</button></header><div class="fit-module-content"></div></div></div>',
    '<div class="fit-console-overlay" aria-hidden="true"><div class="fit-console" role="dialog" aria-modal="true" aria-label="Fitness Vision Console"><header><span>FITNESS VISION CONSOLE // READY</span><button type="button" data-fit-console-close>ESC ×</button></header><div class="fit-console-output"><p><b>system:</b> Sport Performance Cluster online.</p><p>Escribe <strong>help</strong> para ver los comandos.</p></div><label><span>fitness@vision:~$</span><input type="text" autocomplete="off" spellcheck="false" aria-label="Comando"></label></div></div>',
    '<div class="fit-video-overlay" aria-hidden="true"><div class="fit-video-shell"><header><span>MEDIA CORE // FITNESS VISION</span><button type="button" data-fit-video-close>CLOSE ×</button></header><video controls playsinline preload="metadata" poster="fitness-vision-poster.jpg" src="fitness-vision-cluster.mp4"></video></div></div>'
  ].join('');

  var footer = main.querySelector('footer');
  if (footer) main.insertBefore(section, footer);
  else main.appendChild(section);

  var system = section.querySelector('.fit-system');
  var topbar = document.querySelector('.topbar');
  var nav = topbar && topbar.querySelector('.nav');
  if (system && nav) {
    nav.classList.add('fit-integrated-nav');
    system.insertBefore(nav, system.firstChild);
    var oldActions = nav.querySelector('.nav-actions');
    if (oldActions) oldActions.remove();
    var brandText = nav.querySelector('.brand > span:not(.brand-mark)');
    if (brandText) brandText.classList.add('fit-brand-text');
    if (topbar.parentNode) topbar.parentNode.removeChild(topbar);
  }

  var modules = {
    training: { code: '01', label: 'TRAINING', title: 'Entrenamiento y rendimiento', copy: 'Planificación, fuerza, técnica, progresión y control de carga dentro de una visión integral.', route: 'metodo' },
    nutrition: { code: '02', label: 'NUTRITION', title: 'Nutrición deportiva', copy: 'Educación nutricional, hábitos y estrategia aplicada a salud, composición corporal, recuperación y rendimiento.', route: 'formacion' },
    mind: { code: '03', label: 'MIND', title: 'Psicología y mentalidad', copy: 'Motivación, comunicación, adherencia y autoconocimiento para sostener el proceso deportivo.', route: 'sobre-mi' },
    adapted: { code: '04', label: 'ADAPTED', title: 'Actividad física adaptada', copy: 'Progresión segura y ajustada a capacidades, autonomía, contexto y necesidades individuales.', route: 'experiencia' },
    recovery: { code: '05', label: 'RECOVERY', title: 'Recuperación y continuidad', copy: 'Movilidad, descanso, prevención y dosificación para proteger la continuidad y la capacidad funcional.', route: 'metodo' },
    management: { code: '06', label: 'MANAGEMENT', title: 'Gestión deportiva', copy: 'Organización de recursos, servicios, instalaciones y equipos con visión operativa y orientación a resultados.', route: 'proyectos' }
  };
  var routeMeta = {
    'sobre-mi': ['01 / PROFILE', 'Perfil profesional'],
    'metodo': ['02 / METHOD', 'Metodología'],
    'formacion': ['03 / TRAINING', 'Formación'],
    'proyectos': ['04 / PROJECTS', 'Proyectos'],
    'experiencia': ['05 / PATH', 'Experiencia'],
    'contacto': ['06 / CONTACT', 'Contacto']
  };
  var order = ['training', 'nutrition', 'mind', 'adapted', 'recovery', 'management'];
  var active = 'training';
  var autoTimer = null;
  var startedAt = performance.now();

  function setActive(key) {
    var item = modules[key];
    if (!item) return;
    active = key;
    section.querySelectorAll('[data-fit-node]').forEach(function (button) {
      button.classList.toggle('is-active', button.dataset.fitNode === key);
    });
    section.querySelector('#fitActiveCode').textContent = 'MODULE ' + item.code + ' // ACTIVE';
    section.querySelector('#fitActiveTitle').textContent = item.title;
    section.querySelector('#fitActiveCopy').textContent = item.copy;
  }
  section.querySelectorAll('[data-fit-node]').forEach(function (button) {
    button.addEventListener('click', function () { setActive(button.dataset.fitNode); });
  });

  var moduleOverlay = section.querySelector('.fit-module-overlay');
  var moduleContent = section.querySelector('.fit-module-content');
  var moduleCode = section.querySelector('.fit-module-code');
  var moduleTitle = section.querySelector('.fit-module-title');

  function cleanClone(node) {
    node.removeAttribute('id');
    node.hidden = false;
    node.classList.remove('section-view');
    node.classList.add('fit-integrated-source');
    node.querySelectorAll('[id]').forEach(function (element) { element.removeAttribute('id'); });
    node.querySelectorAll('.section-back').forEach(function (element) { element.remove(); });
    return node;
  }
  function openModule(route) {
    var source = document.getElementById(route);
    if (!source) return;
    var meta = routeMeta[route] || ['MODULE', route.toUpperCase()];
    moduleCode.textContent = meta[0];
    moduleTitle.textContent = meta[1];
    moduleContent.innerHTML = '';
    moduleContent.appendChild(cleanClone(source.cloneNode(true)));
    moduleOverlay.classList.add('is-open');
    moduleOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeModule() {
    moduleOverlay.classList.remove('is-open');
    moduleOverlay.setAttribute('aria-hidden', 'true');
    moduleContent.innerHTML = '';
    document.body.style.overflow = '';
  }
  window.SP_OPEN_MODULE = openModule;
  window.SP_CLOSE_MODULE = closeModule;
  section.querySelector('.fit-module-close').addEventListener('click', closeModule);
  moduleOverlay.addEventListener('click', function (event) { if (event.target === moduleOverlay) closeModule(); });
  section.querySelectorAll('[data-fit-route]').forEach(function (button) {
    button.addEventListener('click', function () { openModule(button.dataset.fitRoute); });
  });
  section.querySelector('.fit-open-module').addEventListener('click', function () { openModule(modules[active].route); });

  var coreVideo = section.querySelector('.fit-core-video');
  var videoOverlay = section.querySelector('.fit-video-overlay');
  var videoPlayer = videoOverlay.querySelector('video');
  function playCoreVideo() {
    if (!coreVideo) return;
    coreVideo.muted = true;
    coreVideo.defaultMuted = true;
    coreVideo.volume = 0;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      coreVideo.pause();
      return;
    }
    coreVideo.play().catch(function () {});
  }
  function openVideo() {
    if (coreVideo) coreVideo.pause();
    try { videoPlayer.currentTime = coreVideo ? coreVideo.currentTime : 0; } catch (error) {}
    videoOverlay.classList.add('is-open');
    videoOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    videoPlayer.muted = false;
    videoPlayer.volume = 1;
    setTimeout(function () { videoPlayer.play().catch(function () {}); }, 70);
  }
  function closeVideo() {
    videoPlayer.pause();
    if (coreVideo) {
      try { coreVideo.currentTime = videoPlayer.currentTime; } catch (error) {}
    }
    videoOverlay.classList.remove('is-open');
    videoOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    playCoreVideo();
  }
  section.querySelector('[data-fit-video]').addEventListener('click', openVideo);
  section.querySelector('[data-fit-video-close]').addEventListener('click', closeVideo);
  videoOverlay.addEventListener('click', function (event) { if (event.target === videoOverlay) closeVideo(); });
  document.addEventListener('visibilitychange', function () {
    if (!coreVideo) return;
    if (document.hidden) coreVideo.pause();
    else playCoreVideo();
  });
  playCoreVideo();

  function setMode(mode) {
    section.querySelector('#fitMode').textContent = mode;
    section.querySelectorAll('[data-fit-action]').forEach(function (button) {
      button.classList.toggle('is-active', button.dataset.fitAction === mode.toLowerCase());
    });
  }
  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = null;
    setMode('EXPLORE');
  }
  function startAuto() {
    if (autoTimer) return;
    setMode('AUTO');
    autoTimer = setInterval(function () {
      setActive(order[(order.indexOf(active) + 1) % order.length]);
    }, 3600);
  }

  var consoleOverlay = section.querySelector('.fit-console-overlay');
  var consoleInput = consoleOverlay.querySelector('input');
  var consoleOutput = consoleOverlay.querySelector('.fit-console-output');
  function openConsole() {
    consoleOverlay.classList.add('is-open');
    consoleOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { consoleInput.focus(); }, 50);
  }
  function closeConsole() {
    consoleOverlay.classList.remove('is-open');
    consoleOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  var commands = {
    help: function () { return 'Commands: profile, method, training, projects, experience, contact, cv, video, home, clear'; },
    profile: function () { openModule('sobre-mi'); return 'Opening profile...'; },
    method: function () { openModule('metodo'); return 'Opening method...'; },
    training: function () { openModule('formacion'); return 'Opening training...'; },
    projects: function () { openModule('proyectos'); return 'Opening projects...'; },
    experience: function () { openModule('experiencia'); return 'Opening experience...'; },
    contact: function () { openModule('contacto'); return 'Opening contact...'; },
    cv: function () { window.open('CV_Deporte.pdf', '_blank', 'noopener'); return 'Opening CV...'; },
    video: function () { openVideo(); return 'Opening media core...'; },
    home: function () { closeConsole(); closeModule(); return 'Core restored.'; },
    clear: function () { consoleOutput.innerHTML = ''; return ''; }
  };
  consoleInput.addEventListener('keydown', function (event) {
    if (event.key !== 'Enter') return;
    var command = consoleInput.value.trim().toLowerCase();
    if (!command) return;
    var request = document.createElement('p');
    request.innerHTML = '<span>fitness@vision:~$</span> ' + command.replace(/[<>]/g, '');
    consoleOutput.appendChild(request);
    var response = commands[command] ? commands[command]() : 'Command not found. Type help.';
    if (response) {
      var row = document.createElement('p');
      row.innerHTML = '<b>system:</b> ' + response;
      consoleOutput.appendChild(row);
    }
    consoleInput.value = '';
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
  });
  section.querySelector('[data-fit-console-close]').addEventListener('click', closeConsole);
  consoleOverlay.addEventListener('click', function (event) { if (event.target === consoleOverlay) closeConsole(); });

  section.querySelectorAll('[data-fit-action]').forEach(function (button) {
    button.addEventListener('click', function () {
      var action = button.dataset.fitAction;
      if (action === 'auto') startAuto();
      if (action === 'explore') stopAuto();
      if (action === 'console') openConsole();
      if (action === 'hud') document.body.classList.toggle('fit-hud-off');
    });
  });

  function updateTelemetry() {
    var now = new Date();
    section.querySelector('#fitClock').textContent = now.toLocaleTimeString('es-ES', { hour12: false });
    var elapsed = Math.floor((performance.now() - startedAt) / 1000);
    var hours = String(Math.floor(elapsed / 3600)).padStart(2, '0');
    var minutes = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
    var seconds = String(elapsed % 60).padStart(2, '0');
    section.querySelector('#fitElapsed').textContent = hours + ':' + minutes + ':' + seconds;
  }
  setInterval(updateTelemetry, 1000);
  updateTelemetry();
  function updateViewport() {
    section.querySelector('#fitViewport').textContent = innerWidth + ' × ' + innerHeight;
  }
  addEventListener('resize', updateViewport);
  updateViewport();

  var frames = 0;
  var fpsStart = performance.now();
  function fpsLoop(now) {
    frames += 1;
    if (now - fpsStart >= 1000) {
      section.querySelector('#fitFps').textContent = String(Math.round(frames * 1000 / (now - fpsStart)));
      frames = 0;
      fpsStart = now;
    }
    requestAnimationFrame(fpsLoop);
  }
  requestAnimationFrame(fpsLoop);

  document.addEventListener('keydown', function (event) {
    var tag = document.activeElement && document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (/^[1-6]$/.test(event.key)) setActive(order[Number(event.key) - 1]);
    if (event.key === 'Enter' && !moduleOverlay.classList.contains('is-open') && !videoOverlay.classList.contains('is-open')) openModule(modules[active].route);
    if (event.key.toLowerCase() === 'a') startAuto();
    if (event.key.toLowerCase() === 't') openConsole();
    if (event.key.toLowerCase() === 'h') document.body.classList.toggle('fit-hud-off');
    if (event.key === 'Escape') {
      closeModule();
      closeConsole();
      closeVideo();
    }
  });
})();
