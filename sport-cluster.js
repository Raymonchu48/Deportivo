(function(){
  'use strict';
  var main=document.querySelector('main#inicio');
  var menu=document.querySelector('.menu');
  if(!main || !menu || document.getElementById('cluster')) return;

  var clusterLink=document.createElement('a');
  clusterLink.href='#cluster';
  clusterLink.textContent='cluster';
  clusterLink.setAttribute('aria-label','Abrir Sport Performance System');
  menu.appendChild(clusterLink);

  var section=document.createElement('section');
  section.id='cluster';
  section.className='sport-cluster-shell';
  section.hidden=true;
  section.innerHTML=`
    <div class="sp-boot" aria-hidden="true">
      <div class="sp-boot-inner">
        <div class="sp-boot-mark">RACV<span>//</span>SPORT</div>
        <p>INITIALIZING HUMAN PERFORMANCE SYSTEM</p>
        <div class="sp-boot-line"><span></span></div>
      </div>
    </div>
    <canvas class="sp-network" aria-hidden="true"></canvas>
    <div class="sp-noise" aria-hidden="true"></div>
    <div class="sp-scan" aria-hidden="true"></div>

    <div class="sp-system">
      <aside class="sp-rail" aria-label="Navegación del sistema deportivo">
        <button type="button" class="active" data-sp-home><span>00</span><b>CORE</b></button>
        <button type="button" data-sp-route="sobre-mi"><span>01</span><b>PROFILE</b></button>
        <button type="button" data-sp-route="metodo"><span>02</span><b>METHOD</b></button>
        <button type="button" data-sp-route="formacion"><span>03</span><b>TRAINING</b></button>
        <button type="button" data-sp-route="proyectos"><span>04</span><b>PROJECTS</b></button>
        <button type="button" data-sp-route="experiencia"><span>05</span><b>PATH</b></button>
        <button type="button" data-sp-route="contacto"><span>06</span><b>CONTACT</b></button>
      </aside>

      <aside class="sp-hud sp-hud-left" data-sp-hud>
        <div class="sp-hud-head"><span>ATHLETE PROFILE</span><i></i></div>
        <dl>
          <div><dt>IDENTITY</dt><dd>R. A. CURBALÁN</dd></div>
          <div><dt>SYSTEM</dt><dd>SPORT / HEALTH</dd></div>
          <div><dt>FOCUS</dt><dd id="spHudFocus">TRAINING</dd></div>
          <div><dt>NUTRITION</dt><dd>1000 H</dd></div>
          <div><dt>SEP</dt><dd>LEVEL 3</dd></div>
          <div><dt>FITNESS</dt><dd>300 H</dd></div>
        </dl>
        <div class="sp-signal" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
        <div class="sp-avatar-mini"><img src="Mi_imagen.png" alt="Retrato profesional de Ramón Alberto Curbalán Vega"><div><strong>RAMÓN ALBERTO</strong><small>Health · performance · management</small></div></div>
      </aside>

      <div class="sp-center">
        <div class="sp-eyebrow">RAMÓN ALBERTO CURBALÁN VEGA // SPORT SYSTEM</div>
        <h1>HUMAN PERFORMANCE<span>AS A SYSTEM.</span></h1>
        <p class="sp-lede">Entrenamiento, nutrición, psicología, recuperación, adaptación y gestión conectados como un único sistema de rendimiento humano.</p>

        <div class="sp-core-stage" aria-label="Núcleo deportivo interactivo">
          <div class="sp-orbit sp-orbit-a"></div>
          <div class="sp-orbit sp-orbit-b"></div>
          <div class="sp-orbit sp-orbit-c"></div>
          <div class="sp-core-glow"></div>
          <div class="sp-core"><img src="presentacion.gif" alt="Atleta en movimiento"></div>

          <button class="sp-node sp-node-training active" type="button" data-sp-node="training"><span>TRAINING</span></button>
          <button class="sp-node sp-node-nutrition" type="button" data-sp-node="nutrition"><span>NUTRITION</span></button>
          <button class="sp-node sp-node-mind" type="button" data-sp-node="mind"><span>MIND</span></button>
          <button class="sp-node sp-node-recovery" type="button" data-sp-node="recovery"><span>RECOVERY</span></button>
          <button class="sp-node sp-node-adapted" type="button" data-sp-node="adapted"><span>ADAPTED</span></button>
          <button class="sp-node sp-node-management" type="button" data-sp-node="management"><span>MANAGE</span></button>
        </div>
      </div>

      <aside class="sp-hud sp-hud-right" data-sp-hud>
        <div class="sp-hud-head"><span>RUNTIME</span><i></i></div>
        <dl>
          <div><dt>SESSION</dt><dd id="spElapsed">00:00:00</dd></div>
          <div><dt>FRAME RATE</dt><dd><span id="spFps">60</span> FPS</dd></div>
          <div><dt>VIEWPORT</dt><dd id="spViewport">-- × --</dd></div>
          <div><dt>MODE</dt><dd id="spMode">EXPLORE</dd></div>
          <div><dt>ACTIVE NODE</dt><dd id="spActiveNode">TRAINING</dd></div>
          <div><dt>INTERFACE</dt><dd>HUD / CONSOLE</dd></div>
        </dl>
        <div class="sp-keymap">1–6 FOCUS · ENTER OPEN · A AUTO · T CONSOLE · H HUD · ESC CLOSE</div>
      </aside>

      <div class="sp-focus-card" aria-live="polite">
        <div><small id="spFocusCode">MODULE 01 · ACTIVE</small><strong id="spFocusTitle">Entrenamiento y rendimiento</strong><p id="spFocusCopy">Planificación, fuerza, técnica, progresión y control de carga dentro de una visión integral del rendimiento.</p></div>
        <button class="sp-open-module" type="button">OPEN MODULE →</button>
      </div>

      <div class="sp-controls">
        <div class="sp-control-label">SYSTEM CONTROL</div>
        <div class="sp-mode" role="group" aria-label="Controles de experiencia">
          <button type="button" data-sp-action="auto"><span>◉</span>AUTO</button>
          <button type="button" data-sp-action="explore"><span>⌁</span>EXPLORE</button>
          <button type="button" data-sp-action="console"><span>&gt;_</span>CONSOLE</button>
          <button type="button" data-sp-action="hud"><span>⌗</span>HUD</button>
        </div>
        <p>DRAG CORE · 1–6 MODULES · ENTER OPEN · T CONSOLE · H HUD</p>
      </div>
    </div>

    <div class="sp-console-overlay" aria-hidden="true">
      <div class="sp-console" role="dialog" aria-modal="true" aria-label="Sport Performance Console">
        <div class="sp-console-head"><span>SPORT PERFORMANCE CONSOLE // READY</span><button type="button" data-sp-close>ESC ×</button></div>
        <div class="sp-console-output"><p><span class="sp-term-accent">system:</span> Human Performance System online.</p><p>Escribe <b>help</b> para ver los comandos.</p></div>
        <div class="sp-console-inputrow"><span>sport@performance:~$</span><input type="text" autocomplete="off" spellcheck="false" aria-label="Comando"></div>
      </div>
    </div>`;

  var footer=main.querySelector('footer');
  if(footer) main.insertBefore(section,footer); else main.appendChild(section);

  var nodes={
    training:{code:'01',label:'TRAINING',title:'Entrenamiento y rendimiento',copy:'Planificación, fuerza, técnica, progresión y control de carga dentro de una visión integral del rendimiento.',route:'metodo'},
    nutrition:{code:'02',label:'NUTRITION',title:'Nutrición deportiva',copy:'Educación nutricional, hábitos y estrategia aplicada a salud, composición corporal, recuperación y rendimiento.',route:'formacion'},
    mind:{code:'03',label:'MIND',title:'Psicología y mentalidad',copy:'Motivación, comunicación, adherencia y autoconocimiento como variables decisivas para sostener el proceso.',route:'sobre-mi'},
    recovery:{code:'04',label:'RECOVERY',title:'Recuperación y continuidad',copy:'Movilidad, descanso, prevención y dosificación para proteger la continuidad y la capacidad funcional.',route:'metodo'},
    adapted:{code:'05',label:'ADAPTED',title:'Actividad física adaptada',copy:'Progresión segura y ajustada a capacidades, autonomía, contexto y necesidades de distintos perfiles.',route:'experiencia'},
    management:{code:'06',label:'MANAGEMENT',title:'Gestión deportiva',copy:'Organización de recursos, servicios, instalaciones y equipos con visión operativa y orientación a resultados.',route:'proyectos'}
  };
  var order=['training','nutrition','mind','recovery','adapted','management'];
  var activeKey='training';
  var autoTimer=null;
  var startTime=performance.now();

  function menuNavigate(route){
    var link=document.querySelector('.menu a[href="#'+route+'"]');
    if(link) link.click();
  }

  function setActive(key){
    var item=nodes[key];
    if(!item) return;
    activeKey=key;
    section.querySelectorAll('[data-sp-node]').forEach(function(btn){btn.classList.toggle('active',btn.getAttribute('data-sp-node')===key);});
    var title=section.querySelector('#spFocusTitle');
    var copy=section.querySelector('#spFocusCopy');
    var code=section.querySelector('#spFocusCode');
    var hudFocus=section.querySelector('#spHudFocus');
    var active=section.querySelector('#spActiveNode');
    if(title) title.textContent=item.title;
    if(copy) copy.textContent=item.copy;
    if(code) code.textContent='MODULE '+item.code+' · ACTIVE';
    if(hudFocus) hudFocus.textContent=item.label;
    if(active) active.textContent=item.label;
  }

  section.querySelectorAll('[data-sp-node]').forEach(function(btn){btn.addEventListener('click',function(){setActive(btn.getAttribute('data-sp-node'));});});
  section.querySelector('.sp-open-module')?.addEventListener('click',function(){menuNavigate(nodes[activeKey].route);});
  section.querySelectorAll('[data-sp-route]').forEach(function(btn){btn.addEventListener('click',function(){menuNavigate(btn.getAttribute('data-sp-route'));});});
  section.querySelector('[data-sp-home]')?.addEventListener('click',function(){setActive('training');});

  var boot=section.querySelector('.sp-boot');
  setTimeout(function(){boot?.classList.add('done');},850);

  var canvas=section.querySelector('.sp-network');
  if(canvas){
    var ctx=canvas.getContext('2d'),w=0,h=0,dpr=1,pts=[];
    function resizeCanvas(){
      var r=section.getBoundingClientRect();w=Math.max(1,r.width);h=Math.max(1,r.height);dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);
      var count=Math.max(26,Math.min(74,Math.round((w*h)/26000)));
      pts=Array.from({length:count},function(){return{x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.17,vy:(Math.random()-.5)*.17,r:Math.random()*1.1+.4};});
    }
    function draw(){
      ctx.clearRect(0,0,w,h);
      for(var i=0;i<pts.length;i++){
        var p=pts[i];p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;
        for(var j=i+1;j<pts.length;j++){
          var q=pts[j],dx=p.x-q.x,dy=p.y-q.y,dist=Math.hypot(dx,dy);
          if(dist<125){ctx.strokeStyle='rgba(89,201,255,'+((1-dist/125)*.11)+')';ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}
        }
        ctx.fillStyle='rgba(89,201,255,.42)';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    resizeCanvas();draw();window.addEventListener('resize',resizeCanvas);
  }

  var stage=section.querySelector('.sp-core-stage');
  if(stage && matchMedia('(pointer:fine)').matches){
    var dragging=false,rx=0,ry=0,lastX=0,lastY=0;
    function apply(){stage.style.transform='rotateX('+ry+'deg) rotateY('+rx+'deg)';}
    stage.addEventListener('pointerdown',function(e){dragging=true;lastX=e.clientX;lastY=e.clientY;stage.setPointerCapture(e.pointerId);});
    stage.addEventListener('pointermove',function(e){if(!dragging)return;rx+=(e.clientX-lastX)*.14;ry-=(e.clientY-lastY)*.11;ry=Math.max(-12,Math.min(12,ry));lastX=e.clientX;lastY=e.clientY;apply();});
    stage.addEventListener('pointerup',function(){dragging=false;});stage.addEventListener('pointercancel',function(){dragging=false;});
    stage.addEventListener('mousemove',function(e){if(dragging)return;var r=stage.getBoundingClientRect();rx=((e.clientX-r.left)/r.width-.5)*7;ry=-((e.clientY-r.top)/r.height-.5)*7;apply();});
    stage.addEventListener('mouseleave',function(){if(!dragging){rx=0;ry=0;apply();}});
  }

  function tick(){
    var elapsed=Math.floor((performance.now()-startTime)/1000),h=String(Math.floor(elapsed/3600)).padStart(2,'0'),m=String(Math.floor((elapsed%3600)/60)).padStart(2,'0'),s=String(elapsed%60).padStart(2,'0');
    var el=section.querySelector('#spElapsed');if(el)el.textContent=h+':'+m+':'+s;
  }
  setInterval(tick,1000);tick();
  function updateViewport(){var el=section.querySelector('#spViewport');if(el)el.textContent=innerWidth+' × '+innerHeight;}window.addEventListener('resize',updateViewport);updateViewport();
  var frames=0,fpsStart=performance.now();
  function fpsLoop(now){frames++;if(now-fpsStart>=1000){var fps=Math.round(frames*1000/(now-fpsStart));var el=section.querySelector('#spFps');if(el)el.textContent=String(fps);frames=0;fpsStart=now;}requestAnimationFrame(fpsLoop);}requestAnimationFrame(fpsLoop);

  var overlay=section.querySelector('.sp-console-overlay'),input=section.querySelector('.sp-console-inputrow input'),output=section.querySelector('.sp-console-output');
  function openConsole(){overlay?.classList.add('open');overlay?.setAttribute('aria-hidden','false');setTimeout(function(){input?.focus();},20);}
  function closeConsole(){overlay?.classList.remove('open');overlay?.setAttribute('aria-hidden','true');}
  section.querySelector('[data-sp-close]')?.addEventListener('click',closeConsole);overlay?.addEventListener('click',function(e){if(e.target===overlay)closeConsole();});

  var commands={
    help:function(){return 'Commands: <span class="sp-term-accent">profile, method, training, projects, experience, contact, cv, video, home, clear</span>';},
    profile:function(){menuNavigate('sobre-mi');closeConsole();return 'Opening profile...';},
    method:function(){menuNavigate('metodo');closeConsole();return 'Opening method...';},
    training:function(){menuNavigate('formacion');closeConsole();return 'Opening training registry...';},
    projects:function(){menuNavigate('proyectos');closeConsole();return 'Opening projects...';},
    experience:function(){menuNavigate('experiencia');closeConsole();return 'Opening path...';},
    contact:function(){menuNavigate('contacto');closeConsole();return 'Opening contact...';},
    cv:function(){window.open('cv.pdf','_blank','noopener');return 'Opening CV...';},
    video:function(){window.open('Potencial_al_Máximo__Cuerpo_y_Mente.mp4','_blank','noopener');return 'Opening performance video...';},
    home:function(){closeConsole();setActive('training');return 'Returning to performance core...';},
    clear:function(){if(output)output.innerHTML='';return '';}
  };
  input?.addEventListener('keydown',function(e){
    if(e.key!=='Enter')return;var value=input.value.trim().toLowerCase();if(!value)return;
    var line=document.createElement('p');line.innerHTML='<span class="sp-term-accent">sport@performance:~$</span> '+value;output?.appendChild(line);
    var result=commands[value]?commands[value]():'Command not found: <b>'+value+'</b>. Type <b>help</b>.';
    if(result){var reply=document.createElement('p');reply.innerHTML=result;output?.appendChild(reply);}input.value='';if(output)output.scrollTop=output.scrollHeight;
  });

  function stopAuto(){if(autoTimer){clearInterval(autoTimer);autoTimer=null;}section.querySelector('[data-sp-action="auto"]')?.classList.remove('active');var mode=section.querySelector('#spMode');if(mode)mode.textContent='EXPLORE';}
  function startAuto(){
    if(autoTimer){stopAuto();return;}var i=order.indexOf(activeKey);section.querySelector('[data-sp-action="auto"]')?.classList.add('active');var mode=section.querySelector('#spMode');if(mode)mode.textContent='AUTO';
    autoTimer=setInterval(function(){i=(i+1)%order.length;setActive(order[i]);},2400);
  }
  function nextNode(){var i=order.indexOf(activeKey);setActive(order[(i+1)%order.length]);}
  function toggleHud(){document.body.classList.toggle('sp-hud-off');section.querySelector('[data-sp-action="hud"]')?.classList.toggle('active',!document.body.classList.contains('sp-hud-off'));}
  section.querySelectorAll('[data-sp-action]').forEach(function(btn){btn.addEventListener('click',function(){var a=btn.getAttribute('data-sp-action');if(a==='auto')startAuto();if(a==='explore')nextNode();if(a==='console')openConsole();if(a==='hud')toggleHud();});});

  window.addEventListener('keydown',function(e){
    if(section.hidden)return;
    if(e.key==='Escape'){closeConsole();stopAuto();return;}
    if(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)return;
    var key=e.key.toLowerCase();if(key==='t'){e.preventDefault();openConsole();}if(key==='h'){e.preventDefault();toggleHud();}if(key==='a'){e.preventDefault();startAuto();}
    var map={'1':'training','2':'nutrition','3':'mind','4':'recovery','5':'adapted','6':'management'};if(map[e.key])setActive(map[e.key]);if(e.key==='Enter')menuNavigate(nodes[activeKey].route);
  });

  setActive('training');
})();
