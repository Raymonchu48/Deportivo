(function () {
  'use strict';

  var main=document.querySelector('main#inicio');
  var menu=document.querySelector('.menu');
  if(!main||!menu||document.getElementById('cluster'))return;

  var VIDEO_SRC='sport-performance-vision.mp4';
  var VIDEO_POSTER='sport-performance-vision-poster.jpg';
  var reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var clusterLink=document.createElement('a');
  clusterLink.href='#cluster';
  clusterLink.textContent='cluster';
  clusterLink.setAttribute('aria-label','Abrir Sport Performance Cluster');
  menu.appendChild(clusterLink);

  var section=document.createElement('section');
  section.id='cluster';
  section.className='sport-cluster-shell';
  section.hidden=true;
  section.innerHTML=`
    <div class="spf-boot" aria-hidden="true"><div class="spf-boot-inner"><div class="spf-boot-mark">RACV<span>//</span>SPORT</div><p>LOADING PERFORMANCE VISION</p><div class="spf-boot-line"><span></span></div></div></div>
    <canvas class="spf-network" aria-hidden="true"></canvas><div class="spf-atmosphere" aria-hidden="true"></div>
    <div class="spf-system">
      <aside class="spf-rail" aria-label="Navegación del sistema">
        <button type="button" class="active" data-spf-home><span>00</span><b>CORE</b></button>
        <button type="button" data-spf-route="sobre-mi"><span>01</span><b>PROFILE</b></button>
        <button type="button" data-spf-route="metodo"><span>02</span><b>METHOD</b></button>
        <button type="button" data-spf-route="formacion"><span>03</span><b>TRAINING</b></button>
        <button type="button" data-spf-route="proyectos"><span>04</span><b>PROJECTS</b></button>
        <button type="button" data-spf-route="experiencia"><span>05</span><b>PATH</b></button>
        <button type="button" data-spf-route="contacto"><span>06</span><b>CONTACT</b></button>
      </aside>

      <div class="spf-topline">
        <div class="spf-brandline"><strong>RACV://PERFORMANCE VISION</strong><span>SPORT · HEALTH · PERFORMANCE</span></div>
        <div class="spf-system-status"><span class="spf-status-dot"></span><span id="spfVideoStatus">VIDEO CORE CONNECTING</span><time id="spfClock">--:--:--</time></div>
        <div class="spf-top-actions"><a href="CV_Deporte.pdf" target="_blank" rel="noopener">CV.PDF ↗</a><a href="Cartas_Recomendacion.pdf" target="_blank" rel="noopener">RECOMENDACIONES ↗</a></div>
      </div>

      <div class="spf-command-deck">
        <header class="spf-intro">
          <span class="spf-eyebrow">HUMAN PERFORMANCE SYSTEM // 2026</span>
          <h1><span>Sport</span><br>Performance<br>Cluster</h1>
          <p>Ciencia, método y experiencia conectados en una única arquitectura de rendimiento.</p>
          <div class="spf-identity"><span>RACV</span><div><strong>RAMÓN ALBERTO CURBALÁN VEGA</strong><small>Entrenamiento · nutrición · psicología · gestión</small></div></div>
          <div class="spf-intro-actions"><button type="button" data-spf-route="sobre-mi">VER PERFIL</button><button type="button" data-spf-route="contacto">CONTACTO</button></div>
        </header>

        <div class="spf-video-core" aria-label="Núcleo audiovisual Fitness Vision">
          <div class="spf-video-aura" aria-hidden="true"></div>
          <div class="spf-video-frame">
            <video class="spf-stage-video" autoplay muted loop playsinline preload="metadata" poster="${VIDEO_POSTER}" aria-label="Fitness Vision, núcleo visual del Sport Performance Cluster" src="${VIDEO_SRC}"></video>
            <div class="spf-video-scan" aria-hidden="true"></div><div class="spf-video-corners" aria-hidden="true"></div>
            <span class="spf-live"><i></i>VISION STREAM</span><span class="spf-core-id">CORE // 360°</span>
          </div>
          <div class="spf-video-controls"><button type="button" data-spf-video-toggle aria-label="Pausar vídeo">Ⅱ <span>PAUSAR</span></button><button type="button" data-spf-video-open>◉ <span>ABRIR CON SONIDO</span></button></div>
        </div>

        <div class="spf-module-console">
          <div class="spf-console-label"><span>PERFORMANCE NODES</span><small>SELECT MODULE / 01–06</small></div>
          <div class="spf-node-grid" role="list" aria-label="Áreas del rendimiento deportivo">
            <button type="button" class="active" data-spf-node="training" role="listitem"><span>01</span><i>STR</i><strong>Entrenamiento</strong><small>Fuerza · técnica</small></button>
            <button type="button" data-spf-node="nutrition" role="listitem"><span>02</span><i>NTR</i><strong>Nutrición</strong><small>Hábitos · energía</small></button>
            <button type="button" data-spf-node="mind" role="listitem"><span>03</span><i>MND</i><strong>Psicología</strong><small>Mente · adherencia</small></button>
            <button type="button" data-spf-node="recovery" role="listitem"><span>04</span><i>RCV</i><strong>Recuperación</strong><small>Movilidad · descanso</small></button>
            <button type="button" data-spf-node="adapted" role="listitem"><span>05</span><i>ADP</i><strong>Adaptada</strong><small>Capacidad · autonomía</small></button>
            <button type="button" data-spf-node="management" role="listitem"><span>06</span><i>MGT</i><strong>Gestión</strong><small>Equipos · servicios</small></button>
          </div>
          <article class="spf-focus" aria-live="polite"><div class="spf-focus-number" id="spfFocusNumber">01</div><div><small id="spfFocusCode">NODE ACTIVE // TRAINING</small><h2 id="spfFocusTitle">Entrenamiento y rendimiento</h2><p id="spfFocusCopy">Planificación, fuerza, técnica, progresión y control de carga dentro de una visión integral.</p></div><button type="button" class="spf-open-module">ABRIR MÓDULO →</button></article>
        </div>
      </div>

      <div class="spf-lower-deck">
        <div class="spf-workflow" aria-label="Flujo profesional de trabajo"><div class="spf-workflow-title"><small>PERFORMANCE LOOP</small><strong>Evaluar para evolucionar</strong></div><ol><li><span>01</span><strong>Evaluar</strong></li><li><span>02</span><strong>Planificar</strong></li><li><span>03</span><strong>Ejecutar</strong></li><li><span>04</span><strong>Medir</strong></li><li><span>05</span><strong>Ajustar</strong></li></ol></div>
        <div class="spf-telemetry" aria-label="Métricas profesionales"><div><small>FORMACIÓN</small><strong>1000 h</strong><span>Nutrición aplicada</span></div><div><small>CERTIFICACIÓN</small><strong>Nivel 3</strong><span>Acondicionamiento físico</span></div><div><small>SISTEMA</small><strong>360°</strong><span>Cuerpo, mente y gestión</span></div><div><small>SESSION</small><strong id="spfElapsed">00:00</strong><span id="spfViewport">-- × --</span></div></div>
      </div>

      <div class="spf-controls"><span>SYSTEM CONTROL</span><button type="button" data-spf-action="auto">◉ AUTO</button><button type="button" class="active" data-spf-action="explore">⌁ EXPLORE</button><button type="button" data-spf-action="console">&gt;_ CONSOLE</button><button type="button" data-spf-action="hud">⌗ HUD</button></div>
    </div>

    <div class="spf-module-overlay" aria-hidden="true"><div class="spf-module-shell" role="dialog" aria-modal="true" aria-label="Módulo del portfolio"><div class="spf-module-head"><span class="spf-module-code">MODULE // 00</span><span class="spf-module-title">SYSTEM MODULE</span><button type="button" class="spf-module-close">CERRAR ×</button></div><div class="spf-module-content"></div></div></div>
    <div class="spf-console-overlay" aria-hidden="true"><div class="spf-console" role="dialog" aria-modal="true" aria-label="Sport Performance Console"><div class="spf-console-head"><span>SPORT PERFORMANCE CONSOLE // READY</span><button type="button" data-spf-console-close>ESC ×</button></div><div class="spf-console-output"><p><span class="spf-term-accent">system:</span> Performance Vision online.</p><p>Escribe <b>help</b> para ver los comandos.</p></div><div class="spf-console-inputrow"><span>sport@performance:~$</span><input type="text" autocomplete="off" spellcheck="false" aria-label="Comando"></div></div></div>
    <div class="spf-video-overlay" aria-hidden="true"><div class="spf-video-shell" role="dialog" aria-modal="true" aria-label="Fitness Vision con sonido"><div class="spf-video-head"><span>PERFORMANCE VISION // FULL STREAM</span><button type="button" data-spf-video-close>CERRAR ×</button></div><video controls playsinline preload="metadata" poster="${VIDEO_POSTER}" src="${VIDEO_SRC}"></video></div></div>`;

  var footer=main.querySelector('footer');if(footer)main.insertBefore(section,footer);else main.appendChild(section);

  var modules={
    training:{code:'01',label:'TRAINING',title:'Entrenamiento y rendimiento',copy:'Planificación, fuerza, técnica, progresión y control de carga dentro de una visión integral.',route:'metodo'},
    nutrition:{code:'02',label:'NUTRITION',title:'Nutrición deportiva',copy:'Educación nutricional, hábitos y estrategia aplicada a salud, composición corporal, recuperación y rendimiento.',route:'formacion'},
    mind:{code:'03',label:'MIND',title:'Psicología y mentalidad',copy:'Motivación, comunicación, adherencia y autoconocimiento para sostener el proceso deportivo.',route:'sobre-mi'},
    recovery:{code:'04',label:'RECOVERY',title:'Recuperación y continuidad',copy:'Movilidad, descanso, prevención y dosificación para proteger la continuidad y la capacidad funcional.',route:'metodo'},
    adapted:{code:'05',label:'ADAPTED',title:'Actividad física adaptada',copy:'Progresión segura y ajustada a capacidades, autonomía, contexto y necesidades individuales.',route:'experiencia'},
    management:{code:'06',label:'MANAGEMENT',title:'Gestión deportiva',copy:'Organización de recursos, servicios, instalaciones y equipos con visión operativa y orientación a resultados.',route:'proyectos'}
  };
  var routeMeta={'sobre-mi':['01 / PROFILE','Perfil profesional'],'metodo':['02 / METHOD','Metodología'],'formacion':['03 / TRAINING','Formación'],'proyectos':['04 / PROJECTS','Proyectos'],'experiencia':['05 / PATH','Experiencia'],'contacto':['06 / CONTACT','Contacto']};
  var order=['training','nutrition','mind','recovery','adapted','management'];
  var active='training',autoTimer=null,startTime=performance.now(),lastFocus=null;

  function setActive(key){var item=modules[key];if(!item)return;active=key;section.querySelectorAll('[data-spf-node]').forEach(function(btn){var isActive=btn.dataset.spfNode===key;btn.classList.toggle('active',isActive);btn.setAttribute('aria-pressed',isActive?'true':'false');});section.querySelector('#spfFocusNumber').textContent=item.code;section.querySelector('#spfFocusCode').textContent='NODE ACTIVE // '+item.label;section.querySelector('#spfFocusTitle').textContent=item.title;section.querySelector('#spfFocusCopy').textContent=item.copy;}
  section.querySelectorAll('[data-spf-node]').forEach(function(btn){btn.addEventListener('click',function(){stopAuto();setActive(btn.dataset.spfNode);});});

  var moduleOverlay=section.querySelector('.spf-module-overlay'),moduleContent=section.querySelector('.spf-module-content'),moduleCode=section.querySelector('.spf-module-code'),moduleTitle=section.querySelector('.spf-module-title');
  function cleanClone(node){node.removeAttribute('id');node.hidden=false;node.classList.remove('section-view');node.classList.add('spf-integrated-source');node.querySelectorAll('[id]').forEach(function(el){el.removeAttribute('id');});node.querySelectorAll('.section-back').forEach(function(el){el.remove();});return node;}
  function openModule(route){var source=document.getElementById(route);if(!source)return;lastFocus=document.activeElement;var meta=routeMeta[route]||['MODULE',route.toUpperCase()];moduleCode.textContent=meta[0];moduleTitle.textContent=meta[1];moduleContent.innerHTML='';moduleContent.appendChild(cleanClone(source.cloneNode(true)));moduleOverlay.classList.add('open');moduleOverlay.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';section.querySelector('.spf-module-close').focus();}
  function closeModule(){moduleOverlay.classList.remove('open');moduleOverlay.setAttribute('aria-hidden','true');moduleContent.innerHTML='';document.body.style.overflow='';if(lastFocus&&lastFocus.focus)lastFocus.focus();}
  window.SP_OPEN_MODULE=openModule;window.SP_CLOSE_MODULE=closeModule;
  section.querySelector('.spf-module-close').addEventListener('click',closeModule);moduleOverlay.addEventListener('click',function(e){if(e.target===moduleOverlay)closeModule();});section.querySelector('.spf-open-module').addEventListener('click',function(){openModule(modules[active].route);});section.querySelectorAll('[data-spf-route]').forEach(function(btn){btn.addEventListener('click',function(){openModule(btn.dataset.spfRoute);});});section.querySelector('[data-spf-home]').addEventListener('click',function(){closeModule();window.scrollTo({top:0,behavior:'smooth'});});

  var stageVideo=section.querySelector('.spf-stage-video'),videoToggle=section.querySelector('[data-spf-video-toggle]'),videoStatus=section.querySelector('#spfVideoStatus');
  if(reducedMotion){stageVideo.autoplay=false;stageVideo.removeAttribute('autoplay');stageVideo.pause();}
  function updateVideoToggle(){var paused=stageVideo.paused;videoToggle.innerHTML=(paused?'▶':'Ⅱ')+' <span>'+(paused?'REPRODUCIR':'PAUSAR')+'</span>';videoToggle.setAttribute('aria-label',paused?'Reproducir vídeo':'Pausar vídeo');}
  function playStage(){stageVideo.muted=true;stageVideo.defaultMuted=true;stageVideo.volume=0;var promise=stageVideo.play();if(promise)promise.catch(function(){});}
  function markVideoReady(){section.classList.add('spf-stage-video-ready');videoStatus.textContent='VIDEO CORE ONLINE';if(!reducedMotion)playStage();updateVideoToggle();}
  if(stageVideo.readyState>=2)markVideoReady();else stageVideo.addEventListener('loadeddata',markVideoReady,{once:true});stageVideo.addEventListener('play',updateVideoToggle);stageVideo.addEventListener('pause',updateVideoToggle);stageVideo.addEventListener('error',function(){section.classList.add('spf-stage-video-error');videoStatus.textContent='POSTER MODE';},{once:true});videoToggle.addEventListener('click',function(){if(stageVideo.paused)playStage();else stageVideo.pause();});document.addEventListener('visibilitychange',function(){if(document.hidden)stageVideo.pause();else if(!reducedMotion)playStage();});

  var videoOverlay=section.querySelector('.spf-video-overlay'),modalVideo=videoOverlay.querySelector('video');
  function openVideo(){lastFocus=document.activeElement;stageVideo.pause();modalVideo.currentTime=stageVideo.currentTime||0;modalVideo.muted=false;modalVideo.volume=1;videoOverlay.classList.add('open');videoOverlay.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';setTimeout(function(){modalVideo.play().catch(function(){});},80);}
  function closeVideo(){modalVideo.pause();if(isFinite(modalVideo.currentTime))stageVideo.currentTime=modalVideo.currentTime;videoOverlay.classList.remove('open');videoOverlay.setAttribute('aria-hidden','true');document.body.style.overflow='';if(!reducedMotion)playStage();if(lastFocus&&lastFocus.focus)lastFocus.focus();}
  section.querySelector('[data-spf-video-open]').addEventListener('click',openVideo);section.querySelector('[data-spf-video-close]').addEventListener('click',closeVideo);videoOverlay.addEventListener('click',function(e){if(e.target===videoOverlay)closeVideo();});

  var consoleOverlay=section.querySelector('.spf-console-overlay'),consoleInput=section.querySelector('.spf-console-inputrow input'),consoleOutput=section.querySelector('.spf-console-output');
  function openConsole(){lastFocus=document.activeElement;consoleOverlay.classList.add('open');consoleOverlay.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';setTimeout(function(){consoleInput.focus();},50);}
  function closeConsole(){consoleOverlay.classList.remove('open');consoleOverlay.setAttribute('aria-hidden','true');document.body.style.overflow='';if(lastFocus&&lastFocus.focus)lastFocus.focus();}
  section.querySelector('[data-spf-console-close]').addEventListener('click',closeConsole);consoleOverlay.addEventListener('click',function(e){if(e.target===consoleOverlay)closeConsole();});
  var commands={help:function(){return 'Commands: <span class="spf-term-accent">profile, method, training, projects, experience, contact, cv, video, home, clear</span>';},profile:function(){openModule('sobre-mi');closeConsole();return 'Opening profile...';},method:function(){openModule('metodo');closeConsole();return 'Opening method...';},training:function(){openModule('formacion');closeConsole();return 'Opening training...';},projects:function(){openModule('proyectos');closeConsole();return 'Opening projects...';},experience:function(){openModule('experiencia');closeConsole();return 'Opening path...';},contact:function(){openModule('contacto');closeConsole();return 'Opening contact...';},cv:function(){window.open('CV_Deporte.pdf','_blank','noopener');return 'Opening CV...';},video:function(){closeConsole();openVideo();return 'Opening Performance Vision...';},home:function(){closeConsole();closeModule();return 'Returning to core...';},clear:function(){consoleOutput.innerHTML='';return '';}};
  consoleInput.addEventListener('keydown',function(e){if(e.key!=='Enter')return;var value=consoleInput.value.trim().toLowerCase();consoleInput.value='';if(!value)return;var row=document.createElement('p');row.textContent='sport@performance:~$ '+value;consoleOutput.appendChild(row);var result=commands[value]?commands[value]():'Command not found. Try help.';if(result){var answer=document.createElement('p');answer.innerHTML='<span class="spf-term-accent">system:</span> '+result;consoleOutput.appendChild(answer);}consoleOutput.scrollTop=consoleOutput.scrollHeight;});

  var controls=section.querySelectorAll('[data-spf-action]');
  function markControl(name){controls.forEach(function(btn){btn.classList.toggle('active',btn.dataset.spfAction===name);});}
  function stopAuto(){if(autoTimer){clearInterval(autoTimer);autoTimer=null;}markControl('explore');}
  function startAuto(){if(autoTimer)return;markControl('auto');autoTimer=setInterval(function(){setActive(order[(order.indexOf(active)+1)%order.length]);},3200);}
  controls.forEach(function(btn){btn.addEventListener('click',function(){var action=btn.dataset.spfAction;if(action==='auto')startAuto();if(action==='explore')stopAuto();if(action==='console')openConsole();if(action==='hud')document.body.classList.toggle('sp-hud-off');});});

  function updateTelemetry(){var elapsed=Math.max(0,Math.floor((performance.now()-startTime)/1000));section.querySelector('#spfElapsed').textContent=String(Math.floor(elapsed/60)).padStart(2,'0')+':'+String(elapsed%60).padStart(2,'0');section.querySelector('#spfViewport').textContent=window.innerWidth+' × '+window.innerHeight;section.querySelector('#spfClock').textContent=new Date().toLocaleTimeString('es-ES',{hour12:false});}
  updateTelemetry();setInterval(updateTelemetry,1000);window.addEventListener('resize',updateTelemetry,{passive:true});

  document.addEventListener('keydown',function(e){if(e.target&&/input|textarea/i.test(e.target.tagName))return;if(e.key==='Escape'){closeVideo();closeConsole();closeModule();return;}var number=parseInt(e.key,10);if(number>=1&&number<=6){stopAuto();setActive(order[number-1]);return;}if(e.key.toLowerCase()==='a')startAuto();if(e.key.toLowerCase()==='t')openConsole();if(e.key.toLowerCase()==='h')document.body.classList.toggle('sp-hud-off');if(e.key==='Enter'&&document.activeElement&&document.activeElement.dataset&&document.activeElement.dataset.spfNode)openModule(modules[active].route);});

  var canvas=section.querySelector('.spf-network'),ctx=canvas.getContext&&canvas.getContext('2d');
  if(ctx){var points=[],raf=0;function resizeCanvas(){var ratio=Math.min(window.devicePixelRatio||1,1.5),rect=section.getBoundingClientRect();canvas.width=Math.max(1,Math.floor(rect.width*ratio));canvas.height=Math.max(1,Math.floor(rect.height*ratio));canvas.style.width=rect.width+'px';canvas.style.height=rect.height+'px';ctx.setTransform(ratio,0,0,ratio,0,0);points=Array.from({length:window.innerWidth<700?16:28},function(){return{x:Math.random()*rect.width,y:Math.random()*rect.height,vx:(Math.random()-.5)*.16,vy:(Math.random()-.5)*.16};});}function drawNetwork(){var w=canvas.clientWidth,h=canvas.clientHeight;ctx.clearRect(0,0,w,h);ctx.fillStyle='rgba(82,255,224,.30)';ctx.strokeStyle='rgba(82,255,224,.075)';points.forEach(function(p,i){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,1.05,0,Math.PI*2);ctx.fill();for(var j=i+1;j<points.length;j++){var q=points[j],dx=p.x-q.x,dy=p.y-q.y,d=Math.sqrt(dx*dx+dy*dy);if(d<150){ctx.globalAlpha=1-d/150;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();ctx.globalAlpha=1;}}});raf=requestAnimationFrame(drawNetwork);}resizeCanvas();window.addEventListener('resize',resizeCanvas,{passive:true});if(!reducedMotion)drawNetwork();document.addEventListener('visibilitychange',function(){if(document.hidden&&raf)cancelAnimationFrame(raf);else if(!document.hidden&&!reducedMotion)drawNetwork();});}

  setActive(active);window.setTimeout(function(){section.classList.add('spf-loaded');},620);
})();
