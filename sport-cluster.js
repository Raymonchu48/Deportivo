(function(){
  var main=document.querySelector('main#inicio');
  var menu=document.querySelector('.menu');
  if(!main || !menu || document.getElementById('cluster')) return;

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
    <div class="cluster-terminal" aria-label="Sport Performance Cluster">
      <div class="cluster-topline">
        <div class="cluster-brandline">
          <span class="cluster-kicker">RACV://SPORT SYSTEM</span>
          <h2 class="cluster-title">Sport Performance Cluster</h2>
        </div>
        <div class="cluster-status">
          <span class="cluster-status-dot" aria-hidden="true"></span>
          <span class="cluster-status-label">SYSTEM READY</span>
          <span class="cluster-clock" aria-hidden="true">--:--:--</span>
        </div>
      </div>

      <div class="cluster-tape" aria-hidden="true">
        <div class="cluster-tape-track">
          <div class="cluster-tape-set">
            <div class="cluster-tape-item"><b>STRENGTH</b><span>FUERZA</span></div>
            <div class="cluster-tape-item"><b>MOBILITY</b><span>MOVILIDAD</span></div>
            <div class="cluster-tape-item"><b>NUTRITION</b><span>NUTRICIÓN</span></div>
            <div class="cluster-tape-item"><b>MINDSET</b><span>PSICOLOGÍA</span></div>
            <div class="cluster-tape-item"><b>ADAPTED</b><span>ACTIVIDAD FÍSICA</span></div>
            <div class="cluster-tape-item"><b>MANAGEMENT</b><span>GESTIÓN</span></div>
          </div>
          <div class="cluster-tape-set">
            <div class="cluster-tape-item"><b>STRENGTH</b><span>FUERZA</span></div>
            <div class="cluster-tape-item"><b>MOBILITY</b><span>MOVILIDAD</span></div>
            <div class="cluster-tape-item"><b>NUTRITION</b><span>NUTRICIÓN</span></div>
            <div class="cluster-tape-item"><b>MINDSET</b><span>PSICOLOGÍA</span></div>
            <div class="cluster-tape-item"><b>ADAPTED</b><span>ACTIVIDAD FÍSICA</span></div>
            <div class="cluster-tape-item"><b>MANAGEMENT</b><span>GESTIÓN</span></div>
          </div>
        </div>
      </div>

      <div class="cluster-body">
        <div class="cluster-grid">
          <figure class="cluster-stage">
            <img src="sport-cluster-gym.webp" alt="Sala de entrenamiento oscura con equipamiento de fuerza e iluminación cálida" loading="eager" decoding="async">
            <figcaption class="cluster-hud">
              <div class="cluster-hud-top">
                <span class="cluster-hud-code">PERFORMANCE LAB / 01</span>
                <h3>Human<br>Performance <span>Body · Mind · Method</span></h3>
                <p class="cluster-hud-copy">Un entorno visual para conectar entrenamiento, nutrición, psicología deportiva, actividad física adaptada y gestión. La idea no es acumular disciplinas: es integrarlas en un único sistema de rendimiento.</p>
              </div>
              <div class="cluster-hud-bottom">
                <div class="cluster-hud-chip"><small>Approach</small><strong>Integral</strong></div>
                <div class="cluster-hud-chip"><small>Focus</small><strong>Performance</strong></div>
                <div class="cluster-hud-chip"><small>Method</small><strong>Evaluate → Adjust</strong></div>
              </div>
            </figcaption>
          </figure>

          <aside class="cluster-console">
            <div class="cluster-panel">
              <div class="cluster-panel-head"><span>01 · Discipline matrix</span><span>SELECT MODULE</span></div>
              <div class="cluster-module-list" role="group" aria-label="Módulos del cluster deportivo">
                <button class="cluster-module" type="button" data-cluster-module="training" aria-pressed="true">
                  <span class="cluster-module-code">01</span><span class="cluster-module-label"><strong>Entrenamiento</strong><small>Fuerza · acondicionamiento</small></span><span class="cluster-module-arrow">↗</span>
                </button>
                <button class="cluster-module" type="button" data-cluster-module="nutrition" aria-pressed="false">
                  <span class="cluster-module-code">02</span><span class="cluster-module-label"><strong>Nutrición</strong><small>Estrategia · hábitos</small></span><span class="cluster-module-arrow">↗</span>
                </button>
                <button class="cluster-module" type="button" data-cluster-module="mind" aria-pressed="false">
                  <span class="cluster-module-code">03</span><span class="cluster-module-label"><strong>Psicología</strong><small>Coaching · adherencia</small></span><span class="cluster-module-arrow">↗</span>
                </button>
                <button class="cluster-module" type="button" data-cluster-module="adapted" aria-pressed="false">
                  <span class="cluster-module-code">04</span><span class="cluster-module-label"><strong>Adaptado</strong><small>Capacidad · autonomía</small></span><span class="cluster-module-arrow">↗</span>
                </button>
                <button class="cluster-module" type="button" data-cluster-module="management" aria-pressed="false">
                  <span class="cluster-module-code">05</span><span class="cluster-module-label"><strong>Gestión</strong><small>Instalaciones · equipos</small></span><span class="cluster-module-arrow">↗</span>
                </button>
                <button class="cluster-module" type="button" data-cluster-module="recovery" aria-pressed="false">
                  <span class="cluster-module-code">06</span><span class="cluster-module-label"><strong>Recuperación</strong><small>Movilidad · continuidad</small></span><span class="cluster-module-arrow">↗</span>
                </button>
              </div>
            </div>

            <div class="cluster-panel cluster-detail" aria-live="polite">
              <div class="cluster-detail-kicker">MODULE 01 · ACTIVE</div>
              <h4 class="cluster-detail-title">Entrenamiento y rendimiento</h4>
              <p class="cluster-detail-copy">Planificación del estímulo, progresión, técnica y control de la carga con una visión práctica del rendimiento físico.</p>
              <div class="cluster-detail-tags"><span class="cluster-detail-tag">Fuerza</span><span class="cluster-detail-tag">Fitness</span><span class="cluster-detail-tag">Planificación</span></div>
              <button class="cluster-route" type="button" data-cluster-route="metodo">Abrir metodología →</button>
            </div>
          </aside>
        </div>

        <div class="cluster-flow" aria-label="Flujo de trabajo deportivo">
          <div class="cluster-flow-step"><small>01 / INPUT</small><strong>Evaluar</strong><span>Contexto, objetivo y punto de partida.</span></div>
          <div class="cluster-flow-step"><small>02 / DESIGN</small><strong>Planificar</strong><span>Prioridades, progresión y recursos.</span></div>
          <div class="cluster-flow-step"><small>03 / ACTION</small><strong>Ejecutar</strong><span>Técnica, adherencia y consistencia.</span></div>
          <div class="cluster-flow-step"><small>04 / FEEDBACK</small><strong>Medir</strong><span>Seguimiento y respuesta al proceso.</span></div>
          <div class="cluster-flow-step"><small>05 / LOOP</small><strong>Ajustar</strong><span>Decisiones y evolución sostenible.</span></div>
        </div>
      </div>

      <div class="cluster-footerline"><span><b>SPORT · HEALTH · PERFORMANCE</b></span><span>TRAIN SMARTER · BUILD CAPACITY · SUSTAIN PERFORMANCE</span></div>
    </div>`;

  var footer=main.querySelector('footer');
  if(footer) main.insertBefore(section,footer); else main.appendChild(section);

  var modules={
    training:{code:'01',title:'Entrenamiento y rendimiento',copy:'Planificación del estímulo, progresión, técnica y control de la carga con una visión práctica del rendimiento físico.',tags:['Fuerza','Fitness','Planificación'],route:'metodo',action:'Abrir metodología →'},
    nutrition:{code:'02',title:'Nutrición deportiva',copy:'Educación nutricional, organización de hábitos y estrategia aplicada al objetivo deportivo y al contexto de la persona.',tags:['Nutrición','Hábitos','Adherencia'],route:'formacion',action:'Ver formación →'},
    mind:{code:'03',title:'Psicología y coaching',copy:'Motivación, autoconocimiento, comunicación y adherencia como variables que condicionan el rendimiento y la continuidad.',tags:['Motivación','Coaching','Conducta'],route:'formacion',action:'Ver formación →'},
    adapted:{code:'04',title:'Actividad física adaptada',copy:'Trabajo orientado a capacidad funcional, seguridad, autonomía y progresión en diferentes perfiles y etapas de vida.',tags:['Adaptación','Autonomía','Seguridad'],route:'experiencia',action:'Ver experiencia →'},
    management:{code:'05',title:'Gestión deportiva',copy:'Organización de recursos, instalaciones y servicios deportivos con enfoque operativo, humano y orientado a objetivos.',tags:['Dirección','Operaciones','Equipos'],route:'proyectos',action:'Ver proyectos →'},
    recovery:{code:'06',title:'Recuperación y continuidad',copy:'Movilidad, descanso, dosificación y hábitos como parte del proceso para sostener el rendimiento a medio y largo plazo.',tags:['Movilidad','Recuperación','Continuidad'],route:'metodo',action:'Abrir metodología →'}
  };

  var detailKicker=section.querySelector('.cluster-detail-kicker');
  var detailTitle=section.querySelector('.cluster-detail-title');
  var detailCopy=section.querySelector('.cluster-detail-copy');
  var detailTags=section.querySelector('.cluster-detail-tags');
  var routeButton=section.querySelector('.cluster-route');

  function renderModule(key){
    var item=modules[key];
    if(!item) return;
    section.querySelectorAll('[data-cluster-module]').forEach(function(button){
      button.setAttribute('aria-pressed',String(button.getAttribute('data-cluster-module')===key));
    });
    detailKicker.textContent='MODULE '+item.code+' · ACTIVE';
    detailTitle.textContent=item.title;
    detailCopy.textContent=item.copy;
    detailTags.innerHTML=item.tags.map(function(tag){return '<span class="cluster-detail-tag">'+tag+'</span>';}).join('');
    routeButton.setAttribute('data-cluster-route',item.route);
    routeButton.textContent=item.action;
  }

  section.querySelectorAll('[data-cluster-module]').forEach(function(button){
    button.addEventListener('click',function(){renderModule(button.getAttribute('data-cluster-module'));});
  });

  section.addEventListener('click',function(event){
    var target=event.target.closest('[data-cluster-route]');
    if(!target) return;
    var route=target.getAttribute('data-cluster-route');
    var routeLink=document.querySelector('.menu a[href="#'+route+'"]');
    if(routeLink) routeLink.click();
  });

  var clock=section.querySelector('.cluster-clock');
  function tick(){
    if(!clock) return;
    clock.textContent=new Intl.DateTimeFormat('es-ES',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(new Date());
  }
  tick();
  window.setInterval(tick,1000);
})();
