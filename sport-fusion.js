(function(){
  'use strict';
  var main=document.querySelector('main#inicio');
  var menu=document.querySelector('.menu');
  if(!main||!menu||document.getElementById('cluster'))return;

  var clusterLink=document.createElement('a');
  clusterLink.href='#cluster';clusterLink.textContent='cluster';clusterLink.setAttribute('aria-label','Abrir Human Performance System');menu.appendChild(clusterLink);

  var section=document.createElement('section');
  section.id='cluster';section.className='sport-cluster-shell';section.hidden=true;
  section.innerHTML=`
    <div class="spf-boot" aria-hidden="true"><div class="spf-boot-inner"><div class="spf-boot-mark">RACV<span>//</span>SPORT</div><p>INITIALIZING HUMAN PERFORMANCE SYSTEM</p><div class="spf-boot-line"><span></span></div></div></div>
    <canvas class="spf-network" aria-hidden="true"></canvas><div class="spf-noise" aria-hidden="true"></div><div class="spf-scan" aria-hidden="true"></div>
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
        <div class="spf-brandline"><strong>RACV://SPORT SYSTEM</strong> · SPORT · HEALTH · PERFORMANCE</div>
        <div class="spf-system-status"><span class="spf-status-dot"></span><span>SYSTEM ONLINE</span><span id="spfClock">--:--:--</span></div>
        <div class="spf-top-actions"><a href="CV_Deporte.pdf" target="_blank" rel="noopener">CV.PDF ↗</a><a href="Cartas_Recomendacion.pdf" target="_blank" rel="noopener">RECOMENDACIONES ↗</a></div>
      </div>

      <div class="spf-viewport">
        <aside class="spf-panel spf-profile" data-spf-hud>
          <div class="spf-panel-head">Profile telemetry</div>
          <div class="spf-profile-card"><img src="Mi_imagen.png" alt="Retrato profesional de Ramón Alberto Curbalán Vega"><div><small>IDENTITY // SPORT-2026</small><strong>RAMÓN ALBERTO<br>CURBALÁN VEGA</strong><p>Entrenamiento · nutrición · psicología · gestión</p></div></div>
          <div class="spf-tags"><span>ENTRENADOR</span><span>NUTRICIÓN</span><span>FITNESS</span><span>COACHING</span><span>GESTIÓN</span></div>
          <p class="spf-profile-copy"><strong>Visión integral del rendimiento:</strong> conectar cuerpo, mente, hábitos y organización dentro de un mismo sistema profesional.</p>
          <div class="spf-profile-links"><button type="button" data-spf-route="sobre-mi">OPEN PROFILE →</button><button type="button" data-spf-route="formacion">OPEN TRAINING →</button><button type="button" data-spf-route="proyectos">OPEN PROJECTS →</button></div>
        </aside>

        <div class="spf-stage" aria-label="Núcleo deportivo interactivo">
          <video class="spf-stage-video" autoplay muted loop playsinline preload="metadata" aria-hidden="true" src="Potencial_al_Máximo__Cuerpo_y_Mente.mp4"></video>
          <div class="spf-stage-grid" aria-hidden="true"></div>
          <div class="spf-stage-copy"><span class="spf-eyebrow">Human performance system</span><h1><span>Sport</span>Performance<br>Cluster</h1><p>Ciencia, método y experiencia conectados en una única arquitectura de rendimiento.</p><small>RAMÓN ALBERTO CURBALÁN VEGA</small></div>
          <div class="spf-core-stage">
            <div class="spf-orbit spf-orbit-a"></div><div class="spf-orbit spf-orbit-b"></div><div class="spf-orbit spf-orbit-c"></div><div class="spf-core-glow"></div>
            <div class="spf-core"><strong>360°</strong><small>PERFORMANCE</small></div>
            <button class="spf-node spf-node-training active" type="button" data-spf-node="training"><span>TRAINING</span></button>
            <button class="spf-node spf-node-nutrition" type="button" data-spf-node="nutrition"><span>NUTRITION</span></button>
            <button class="spf-node spf-node-mind" type="button" data-spf-node="mind"><span>MIND</span></button>
            <button class="spf-node spf-node-recovery" type="button" data-spf-node="recovery"><span>RECOVERY</span></button>
            <button class="spf-node spf-node-adapted" type="button" data-spf-node="adapted"><span>ADAPTED</span></button>
            <button class="spf-node spf-node-management" type="button" data-spf-node="management"><span>MANAGE</span></button>
          </div>
          <div class="spf-focus" aria-live="polite"><div><small id="spfFocusCode">MODULE 01 · ACTIVE</small><strong id="spfFocusTitle">Entrenamiento y rendimiento</strong><p id="spfFocusCopy">Planificación, fuerza, técnica, progresión y control de carga dentro de una visión integral.</p></div><button type="button" class="spf-open-module">OPEN MODULE →</button></div>
        </div>

        <aside class="spf-panel spf-media" data-spf-hud>
          <div class="spf-panel-head">Runtime + media</div>
          <dl class="spf-runtime"><div><dt>SESSION</dt><dd id="spfElapsed">00:00:00</dd></div><div><dt>FRAME RATE</dt><dd><span id="spfFps">60</span> FPS</dd></div><div><dt>VIEWPORT</dt><dd id="spfViewport">-- × --</dd></div><div><dt>MODE</dt><dd id="spfMode">EXPLORE</dd></div><div><dt>ACTIVE NODE</dt><dd id="spfActiveNode">TRAINING</dd></div></dl>
          <button type="button" class="spf-video-console" data-spf-video><span><i aria-hidden="true"></i>MEDIA STREAM // LIVE</span><strong>Potencial al máximo:<br>cuerpo y mente</strong><small>ABRIR CON SONIDO ↗</small></button>
          <div class="spf-keymap">1–6 FOCUS · ENTER OPEN · A AUTO · T CONSOLE · H HUD · ESC CLOSE</div>
        </aside>
      </div>

      <div class="spf-workflow" aria-label="Flujo profesional de trabajo">
        <div class="spf-workflow-title"><small>PERFORMANCE LOOP</small><strong>Del análisis a la mejora continua</strong></div>
        <ol>
          <li><span>01</span><strong>Evaluar</strong><small>Punto de partida</small></li>
          <li><span>02</span><strong>Planificar</strong><small>Estrategia individual</small></li>
          <li><span>03</span><strong>Ejecutar</strong><small>Acción con método</small></li>
          <li><span>04</span><strong>Medir</strong><small>Datos y evolución</small></li>
          <li><span>05</span><strong>Ajustar</strong><small>Mejora continua</small></li>
        </ol>
      </div>

      <div class="spf-metrics" aria-label="Métricas de formación y enfoque">
        <article class="spf-metric"><span class="spf-metric-icon">◷</span><strong>1000 h</strong><span>Máster en alimentación y nutrición</span></article>
        <article class="spf-metric"><span class="spf-metric-icon">III</span><strong>Nivel 3</strong><span>Certificado profesional SEP</span></article>
        <article class="spf-metric"><span class="spf-metric-icon">↔</span><strong>300 h</strong><span>Musculación, fitness y dietética</span></article>
        <article class="spf-metric"><span class="spf-metric-icon">◎</span><strong>360°</strong><span>Salud, rendimiento, mente y gestión</span></article>
      </div>

      <div class="spf-controls"><span class="spf-control-label">SYSTEM CONTROL</span><button type="button" data-spf-action="auto"><span>◉</span>AUTO</button><button type="button" data-spf-action="explore"><span>⌁</span>EXPLORE</button><button type="button" data-spf-action="console"><span>&gt;_</span>CONSOLE</button><button type="button" data-spf-action="hud"><span>⌗</span>HUD</button></div>
    </div>

    <div class="spf-module-overlay" aria-hidden="true"><div class="spf-module-shell"><div class="spf-module-head"><span class="spf-module-code">MODULE // 00</span><span class="spf-module-title">SYSTEM MODULE</span><button type="button" class="spf-module-close">CLOSE ×</button></div><div class="spf-module-content"></div></div></div>
    <div class="spf-console-overlay" aria-hidden="true"><div class="spf-console" role="dialog" aria-modal="true" aria-label="Sport Performance Console"><div class="spf-console-head"><span>SPORT PERFORMANCE CONSOLE // READY</span><button type="button" data-spf-console-close>ESC ×</button></div><div class="spf-console-output"><p><span class="spf-term-accent">system:</span> Human Performance System online.</p><p>Escribe <b>help</b> para ver los comandos.</p></div><div class="spf-console-inputrow"><span>sport@performance:~$</span><input type="text" autocomplete="off" spellcheck="false" aria-label="Comando"></div></div></div>
    <div class="spf-video-overlay" aria-hidden="true"><div class="spf-video-shell"><div class="spf-video-head"><span>PRESENTATION // POTENCIAL AL MÁXIMO</span><button type="button" data-spf-video-close>CLOSE ×</button></div><video controls playsinline preload="metadata" src="Potencial_al_Máximo__Cuerpo_y_Mente.mp4"></video></div></div>`;

  var footer=main.querySelector('footer');if(footer)main.insertBefore(section,footer);else main.appendChild(section);

  var stageVideo=section.querySelector('.spf-stage-video');
  function playStageVideo(){if(!stageVideo)return;stageVideo.muted=true;stageVideo.defaultMuted=true;stageVideo.volume=0;if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){stageVideo.pause();return;}stageVideo.play().catch(function(){});}
  function markStageVideoReady(){section.classList.add('spf-stage-video-ready');playStageVideo();}
  if(stageVideo){if(stageVideo.readyState>=2)markStageVideoReady();else stageVideo.addEventListener('loadeddata',markStageVideoReady,{once:true});stageVideo.addEventListener('error',function(){section.classList.add('spf-stage-video-error');},{once:true});document.addEventListener('visibilitychange',function(){if(document.hidden)stageVideo.pause();else playStageVideo();});playStageVideo();}

  var modules={
    training:{code:'01',label:'TRAINING',title:'Entrenamiento y rendimiento',copy:'Planificación, fuerza, técnica, progresión y control de carga dentro de una visión integral.',route:'metodo'},
    nutrition:{code:'02',label:'NUTRITION',title:'Nutrición deportiva',copy:'Educación nutricional, hábitos y estrategia aplicada a salud, composición corporal, recuperación y rendimiento.',route:'formacion'},
    mind:{code:'03',label:'MIND',title:'Psicología y mentalidad',copy:'Motivación, comunicación, adherencia y autoconocimiento para sostener el proceso deportivo.',route:'sobre-mi'},
    recovery:{code:'04',label:'RECOVERY',title:'Recuperación y continuidad',copy:'Movilidad, descanso, prevención y dosificación para proteger la continuidad y la capacidad funcional.',route:'metodo'},
    adapted:{code:'05',label:'ADAPTED',title:'Actividad física adaptada',copy:'Progresión segura y ajustada a capacidades, autonomía, contexto y necesidades individuales.',route:'experiencia'},
    management:{code:'06',label:'MANAGEMENT',title:'Gestión deportiva',copy:'Organización de recursos, servicios, instalaciones y equipos con visión operativa y orientación a resultados.',route:'proyectos'}
  };
  var routeMeta={'sobre-mi':['01 / PROFILE','Perfil profesional'],'metodo':['02 / METHOD','Metodología'],'formacion':['03 / TRAINING','Formación'],'proyectos':['04 / PROJECTS','Proyectos'],'experiencia':['05 / PATH','Experiencia'],'contacto':['06 / CONTACT','Contacto']};
  var order=['training','nutrition','mind','recovery','adapted','management'];var active='training',autoTimer=null,startTime=performance.now();

  function setActive(key){var item=modules[key];if(!item)return;active=key;section.querySelectorAll('[data-spf-node]').forEach(function(btn){btn.classList.toggle('active',btn.dataset.spfNode===key);});section.querySelector('#spfFocusCode').textContent='MODULE '+item.code+' · ACTIVE';section.querySelector('#spfFocusTitle').textContent=item.title;section.querySelector('#spfFocusCopy').textContent=item.copy;section.querySelector('#spfActiveNode').textContent=item.label;}
  section.querySelectorAll('[data-spf-node]').forEach(function(btn){btn.addEventListener('click',function(){setActive(btn.dataset.spfNode);});});

  var moduleOverlay=section.querySelector('.spf-module-overlay'),moduleContent=section.querySelector('.spf-module-content'),moduleCode=section.querySelector('.spf-module-code'),moduleTitle=section.querySelector('.spf-module-title');
  function cleanClone(node){node.removeAttribute('id');node.hidden=false;node.classList.remove('section-view');node.classList.add('spf-integrated-source');node.querySelectorAll('[id]').forEach(function(el){el.removeAttribute('id');});node.querySelectorAll('.section-back').forEach(function(el){el.remove();});return node;}
  function openModule(route){var source=document.getElementById(route);if(!source)return;var meta=routeMeta[route]||['MODULE',route.toUpperCase()];moduleCode.textContent=meta[0];moduleTitle.textContent=meta[1];moduleContent.innerHTML='';moduleContent.appendChild(cleanClone(source.cloneNode(true)));moduleOverlay.classList.add('open');moduleOverlay.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';section.querySelectorAll('.spf-rail button').forEach(function(b){b.classList.toggle('active',b.dataset.spfRoute===route);});}
  function closeModule(){moduleOverlay.classList.remove('open');moduleOverlay.setAttribute('aria-hidden','true');moduleContent.innerHTML='';document.body.style.overflow='';section.querySelectorAll('.spf-rail button').forEach(function(b){b.classList.remove('active');});section.querySelector('[data-spf-home]')?.classList.add('active');}
  window.SP_OPEN_MODULE=openModule;window.SP_CLOSE_MODULE=closeModule;
  section.querySelector('.spf-module-close').addEventListener('click',closeModule);moduleOverlay.addEventListener('click',function(e){if(e.target===moduleOverlay)closeModule();});
  section.querySelectorAll('[data-spf-route]').forEach(function(btn){btn.addEventListener('click',function(){openModule(btn.dataset.spfRoute);});});
  section.querySelector('.spf-open-module').addEventListener('click',function(){openModule(modules[active].route);});
  section.querySelector('[data-spf-home]').addEventListener('click',function(){closeModule();setActive('training');});

  var videoOverlay=section.querySelector('.spf-video-overlay'),videoPlayer=videoOverlay.querySelector('video');
  function openVideo(){if(stageVideo)stageVideo.pause();videoOverlay.classList.add('open');videoOverlay.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';setTimeout(function(){videoPlayer.play().catch(function(){});},80);}
  function closeVideo(){videoPlayer.pause();videoOverlay.classList.remove('open');videoOverlay.setAttribute('aria-hidden','true');document.body.style.overflow='';playStageVideo();}
  section.querySelector('[data-spf-video]').addEventListener('click',openVideo);section.querySelector('[data-spf-video-close]').addEventListener('click',closeVideo);videoOverlay.addEventListener('click',function(e){if(e.target===videoOverlay)closeVideo();});

  var canvas=section.querySelector('.spf-network');if(canvas){var ctx=canvas.getContext('2d'),w=0,h=0,dpr=1,pts=[];function resizeCanvas(){var r=section.getBoundingClientRect();w=Math.max(1,r.width);h=Math.max(1,r.height);dpr=Math.min(devicePixelRatio||1,2);canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);var count=Math.max(24,Math.min(72,Math.round((w*h)/26000)));pts=Array.from({length:count},function(){return{x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.16,vy:(Math.random()-.5)*.16,r:Math.random()*1.1+.4};});}function draw(){ctx.clearRect(0,0,w,h);for(var i=0;i<pts.length;i++){var p=pts[i];p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;for(var j=i+1;j<pts.length;j++){var q=pts[j],dx=p.x-q.x,dy=p.y-q.y,dist=Math.hypot(dx,dy);if(dist<125){ctx.strokeStyle='rgba(91,205,255,'+((1-dist/125)*.10)+')';ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}}ctx.fillStyle='rgba(91,205,255,.38)';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();}requestAnimationFrame(draw);}resizeCanvas();draw();addEventListener('resize',resizeCanvas);}

  var stage=section.querySelector('.spf-core-stage');if(stage&&matchMedia('(pointer:fine)').matches){var dragging=false,rx=0,ry=0,lastX=0,lastY=0;function apply(){stage.style.transform='translateY(-50%) rotateX('+ry+'deg) rotateY('+rx+'deg)';}stage.addEventListener('pointerdown',function(e){dragging=true;lastX=e.clientX;lastY=e.clientY;stage.setPointerCapture(e.pointerId);});stage.addEventListener('pointermove',function(e){if(!dragging)return;rx+=(e.clientX-lastX)*.14;ry-=(e.clientY-lastY)*.11;ry=Math.max(-12,Math.min(12,ry));lastX=e.clientX;lastY=e.clientY;apply();});stage.addEventListener('pointerup',function(){dragging=false;});stage.addEventListener('pointercancel',function(){dragging=false;});stage.addEventListener('mousemove',function(e){if(dragging)return;var r=stage.getBoundingClientRect();rx=((e.clientX-r.left)/r.width-.5)*7;ry=-((e.clientY-r.top)/r.height-.5)*7;apply();});stage.addEventListener('mouseleave',function(){if(!dragging){rx=0;ry=0;apply();}});}

  function tick(){var now=new Date(),clock=section.querySelector('#spfClock');if(clock)clock.textContent=now.toLocaleTimeString('es-ES',{hour12:false});var elapsed=Math.floor((performance.now()-startTime)/1000),hh=String(Math.floor(elapsed/3600)).padStart(2,'0'),mm=String(Math.floor((elapsed%3600)/60)).padStart(2,'0'),ss=String(elapsed%60).padStart(2,'0');section.querySelector('#spfElapsed').textContent=hh+':'+mm+':'+ss;}setInterval(tick,1000);tick();
  function viewport(){section.querySelector('#spfViewport').textContent=innerWidth+' × '+innerHeight;}addEventListener('resize',viewport);viewport();var frames=0,fpsStart=performance.now();function fpsLoop(now){frames++;if(now-fpsStart>=1000){section.querySelector('#spfFps').textContent=String(Math.round(frames*1000/(now-fpsStart)));frames=0;fpsStart=now;}requestAnimationFrame(fpsLoop);}requestAnimationFrame(fpsLoop);

  var consoleOverlay=section.querySelector('.spf-console-overlay'),consoleInput=section.querySelector('.spf-console-inputrow input'),consoleOutput=section.querySelector('.spf-console-output');
  function openConsole(){consoleOverlay.classList.add('open');consoleOverlay.setAttribute('aria-hidden','false');setTimeout(function(){consoleInput.focus();},30);}function closeConsole(){consoleOverlay.classList.remove('open');consoleOverlay.setAttribute('aria-hidden','true');}
  section.querySelector('[data-spf-console-close]').addEventListener('click',closeConsole);consoleOverlay.addEventListener('click',function(e){if(e.target===consoleOverlay)closeConsole();});
  var commands={help:function(){return 'Commands: <span class="spf-term-accent">profile, method, training, projects, experience, contact, cv, video, home, clear</span>';},profile:function(){openModule('sobre-mi');closeConsole();return 'Opening profile...';},method:function(){openModule('metodo');closeConsole();return 'Opening method...';},training:function(){openModule('formacion');closeConsole();return 'Opening training...';},projects:function(){openModule('proyectos');closeConsole();return 'Opening projects...';},experience:function(){openModule('experiencia');closeConsole();return 'Opening path...';},contact:function(){openModule('contacto');closeConsole();return 'Opening contact...';},cv:function(){window.open('CV_Deporte.pdf','_blank','noopener');return 'Opening CV...';},video:function(){closeConsole();openVideo();return 'Opening presentation...';},home:function(){closeConsole();closeModule();return 'Returning to core...';},clear:function(){consoleOutput.innerHTML='';return '';}};
  consoleInput.addEventListener('keydown',function(e){if(e.key!=='Enter')return;var value=consoleInput.value.trim().toLowerCase();if(!value)return;var line=document.createElement('p');line.innerHTML='<span class="spf-term-accent">sport@performance:~$</span> '+value;consoleOutput.appendChild(line);var result=commands[value]?commands[value]():'Command not found: <b>'+value+'</b>. Type <b>help</b>.';if(result){var reply=document.createElement('p');reply.innerHTML=result;consoleOutput.appendChild(reply);}consoleInput.value='';consoleOutput.scrollTop=consoleOutput.scrollHeight;});

  function stopAuto(){if(autoTimer){clearInterval(autoTimer);autoTimer=null;}section.querySelector('[data-spf-action="auto"]')?.classList.remove('active');section.querySelector('#spfMode').textContent='EXPLORE';}
  function startAuto(){if(autoTimer){stopAuto();return;}section.querySelector('[data-spf-action="auto"]')?.classList.add('active');section.querySelector('#spfMode').textContent='AUTO';var idx=0;setActive(order[idx]);autoTimer=setInterval(function(){idx=(idx+1)%order.length;setActive(order[idx]);},2500);}
  section.querySelectorAll('[data-spf-action]').forEach(function(btn){btn.addEventListener('click',function(){var a=btn.dataset.spfAction;if(a==='auto')startAuto();if(a==='explore'){stopAuto();setActive('training');}if(a==='console')openConsole();if(a==='hud'){document.body.classList.toggle('sp-hud-off');btn.classList.toggle('active',!document.body.classList.contains('sp-hud-off'));}});});

  addEventListener('keydown',function(e){if(!document.body.classList.contains('sport-system-home'))return;if(e.key==='Escape'){closeConsole();closeVideo();closeModule();stopAuto();return;}if(e.target instanceof HTMLInputElement||e.target instanceof HTMLTextAreaElement)return;var map={'1':'training','2':'nutrition','3':'mind','4':'recovery','5':'adapted','6':'management'};if(map[e.key]){setActive(map[e.key]);return;}var k=e.key.toLowerCase();if(k==='t'){e.preventDefault();openConsole();}if(k==='h'){e.preventDefault();document.body.classList.toggle('sp-hud-off');}if(k==='a'){e.preventDefault();startAuto();}if(e.key==='Enter'){openModule(modules[active].route);}});

  setTimeout(function(){section.querySelector('.spf-boot')?.classList.add('done');},850);
})();
