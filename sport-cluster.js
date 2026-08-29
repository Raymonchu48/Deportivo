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
    <div class="spc-board" aria-label="Sport Performance Cluster">
      <div class="spc-hero">
        <div class="spc-runner">
          <img src="presentacion.gif" alt="Atleta en movimiento, imagen principal del portfolio deportivo" loading="eager" decoding="async">
          <div class="spc-runner-copy">
            <span class="spc-eyebrow">Portfolio deportivo</span>
            <h2 class="spc-runner-title"><span>Sport</span>Performance<br>Cluster</h2>
            <p class="spc-runner-sub">Ciencia, método y pasión aplicados al rendimiento humano.</p>
          </div>
        </div>

        <div class="spc-profile">
          <span class="spc-eyebrow">Atleta & performance</span>
          <h1>Ramón Alberto<br>Curbalán Vega</h1>
          <p class="spc-profile-lead">Entrenamiento, nutrición y psicología deportiva integrados para construir salud, rendimiento y hábitos sostenibles.</p>

          <div class="spc-identity-row">
            <img class="spc-avatar" src="Mi_imagen.png" alt="Retrato profesional de Ramón Alberto Curbalán Vega" loading="eager" decoding="async">
            <div class="spc-pills" aria-label="Áreas clave">
              <span class="spc-pill">Salud integral</span>
              <span class="spc-pill">Rendimiento</span>
              <span class="spc-pill">Fitness</span>
              <span class="spc-pill">Nutrición</span>
              <span class="spc-pill">Psicología deportiva</span>
              <span class="spc-pill">Gestión deportiva</span>
            </div>
          </div>

          <div class="spc-video-card">
            <span class="spc-video-label">Potencial aplicado</span>
            <a class="spc-video-launch" href="Potencial_al_Máximo__Cuerpo_y_Mente.mp4" target="_blank" rel="noopener" aria-label="Abrir vídeo Potencial al máximo: cuerpo y mente">
              <span class="spc-play" aria-hidden="true"></span>
            </a>
            <div class="spc-video-meta">
              <strong>Potencial al máximo: cuerpo y mente</strong>
              <span>Una muestra visual de conocimientos, capacidad de entrenamiento, motivación y enfoque integral del rendimiento.</span>
            </div>
          </div>
        </div>
      </div>

      <div class="spc-dashboard">
        <div class="spc-modulebar" role="group" aria-label="Módulos del cluster">
          <span class="spc-module-title">Módulos del clúster</span>
          <button class="spc-module-btn" type="button" data-spc-module="performance" aria-pressed="true">Performance Lab</button>
          <button class="spc-module-btn" type="button" data-spc-module="nutrition" aria-pressed="false">Nutrición</button>
          <button class="spc-module-btn" type="button" data-spc-module="recovery" aria-pressed="false">Fisio & recovery</button>
          <button class="spc-module-btn" type="button" data-spc-module="data" aria-pressed="false">Análisis</button>
          <button class="spc-module-btn" type="button" data-spc-module="adapted" aria-pressed="false">Adaptación</button>
          <button class="spc-module-btn" type="button" data-spc-module="mind" aria-pressed="false">Mentalidad</button>
          <button class="spc-module-btn" type="button" data-spc-module="method" aria-pressed="false">Metodología</button>
        </div>

        <div class="spc-focus">
          <span class="spc-section-label">Disciplinas & enfoque</span>
          <div class="spc-chiprow">
            <span class="spc-focus-chip">Entrenamiento físico</span>
            <span class="spc-focus-chip">Nutrición deportiva</span>
            <span class="spc-focus-chip">Fisiología</span>
            <span class="spc-focus-chip">Prevención</span>
            <span class="spc-focus-chip">Actividad adaptada</span>
            <span class="spc-focus-chip">Psicología</span>
            <span class="spc-focus-chip">Monitorización</span>
            <span class="spc-focus-chip">Gestión</span>
          </div>
          <div class="spc-module-summary" aria-live="polite">
            <strong class="spc-summary-title">Performance Lab</strong>
            <p class="spc-summary-copy">Planificación del estímulo, técnica, progresión y control de la carga dentro de una visión integral del rendimiento.</p>
          </div>
        </div>

        <div class="spc-impact">
          <div class="spc-impact-left">
            <span class="spc-section-label">Panorama de impacto</span>
            <div class="spc-metrics">
              <article class="spc-metric">
                <span class="spc-metric-icon">◷</span>
                <strong>1000 h</strong>
                <b>Alimentación y nutrición</b>
                <span>Formación avanzada aplicada a salud y rendimiento.</span>
              </article>
              <article class="spc-metric">
                <span class="spc-metric-icon">III</span>
                <strong>Nivel 3</strong>
                <b>Certificado profesional SEP</b>
                <span>Cualificación profesional y actualización continua.</span>
              </article>
              <article class="spc-metric">
                <span class="spc-metric-icon">↔</span>
                <strong>300 h</strong>
                <b>Musculación, fitness y dietética</b>
                <span>Fuerza, acondicionamiento y control del proceso.</span>
              </article>
              <article class="spc-metric">
                <span class="spc-metric-icon">◎</span>
                <strong>360°</strong>
                <b>Salud, rendimiento, mente y gestión</b>
                <span>Visión global de la persona y su entorno deportivo.</span>
              </article>
            </div>
          </div>

          <aside class="spc-radar-card">
            <span class="spc-section-label">Visión 360° del atleta</span>
            <div class="spc-radar" aria-label="Visión integral del rendimiento">
              <span class="r1">Físico</span>
              <span class="r2">Nutrición</span>
              <span class="r3">Mental</span>
              <span class="r4">Recuperación</span>
              <span class="r5">Adaptación</span>
              <span class="r6">Rendimiento</span>
            </div>
          </aside>
        </div>

        <div class="spc-workflow">
          <span class="spc-section-label">Workflow de rendimiento</span>
          <div class="spc-flow">
            <div class="spc-step"><small>01</small><strong>Evaluación</strong><span>Datos, contexto y objetivo.</span></div>
            <div class="spc-step"><small>02</small><strong>Análisis</strong><span>Interpretación y prioridades.</span></div>
            <div class="spc-step"><small>03</small><strong>Planificación</strong><span>Estrategia y progresión.</span></div>
            <div class="spc-step"><small>04</small><strong>Ejecución</strong><span>Aplicación y seguimiento.</span></div>
            <div class="spc-step"><small>05</small><strong>Monitorización</strong><span>Control y ajuste continuo.</span></div>
            <div class="spc-step"><small>06</small><strong>Resultados</strong><span>Mejora medible y sostenible.</span></div>
          </div>
        </div>
      </div>

      <div class="spc-footer">
        <span>Sport · Health · Performance</span>
        <span>Portfolio deportivo profesional · Salud · Rendimiento · Gestión</span>
      </div>
    </div>`;

  var footer=main.querySelector('footer');
  if(footer) main.insertBefore(section,footer); else main.appendChild(section);

  var modules={
    performance:{title:'Performance Lab',copy:'Planificación del estímulo, técnica, progresión y control de la carga dentro de una visión integral del rendimiento.'},
    nutrition:{title:'Nutrición deportiva',copy:'Educación nutricional, hábitos, estrategia y contexto para sostener salud, composición corporal y rendimiento.'},
    recovery:{title:'Fisio & recovery',copy:'Movilidad, recuperación, prevención y dosificación como parte del proceso para mantener continuidad y capacidad funcional.'},
    data:{title:'Análisis del rendimiento',copy:'Observación, seguimiento y lectura de indicadores para convertir información en decisiones de entrenamiento más precisas.'},
    adapted:{title:'Actividad física adaptada',copy:'Progresión segura y ajustada a capacidades, autonomía y necesidades de distintos perfiles y etapas de vida.'},
    mind:{title:'Psicología y mentalidad',copy:'Motivación, comunicación, adherencia y autoconocimiento como variables decisivas para la continuidad del proceso.'},
    method:{title:'Metodología integral',copy:'Evaluar, analizar, planificar, ejecutar, monitorizar y ajustar: un sistema de trabajo orientado a resultados sostenibles.'}
  };

  var summaryTitle=section.querySelector('.spc-summary-title');
  var summaryCopy=section.querySelector('.spc-summary-copy');
  section.querySelectorAll('[data-spc-module]').forEach(function(button){
    button.addEventListener('click',function(){
      var key=button.getAttribute('data-spc-module');
      var item=modules[key];
      if(!item) return;
      section.querySelectorAll('[data-spc-module]').forEach(function(other){
        other.setAttribute('aria-pressed',String(other===button));
      });
      summaryTitle.textContent=item.title;
      summaryCopy.textContent=item.copy;
    });
  });
})();
