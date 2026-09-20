
(() => {
  const stage = document.querySelector('.stage');
  if (!stage || document.querySelector('.hybrid-editorial')) return;

  const nav = document.createElement('header');
  nav.className = 'hybrid-topnav';
  nav.innerHTML = `
    <div class="hybrid-brand">
      <div class="hybrid-brandmark">R</div>
      <div class="hybrid-brandtext">
        <strong>RAMÓN ALBERTO CURBALÁN VEGA</strong>
        <span>Acondicionamiento físico · rendimiento deportivo</span>
      </div>
    </div>
    <nav class="hybrid-navlinks" aria-label="Navegación principal">
      <a href="#inicio">Inicio</a>
      <a href="#perfil">Perfil</a>
      <a href="#experiencia">Experiencia</a>
      <a href="#metodo">Método</a>
      <a href="#formacion">Formación</a>
      <a href="#competencias">Competencias</a>
      <a href="#proyectos">Proyectos</a>
      <a href="#contacto">Contacto</a>
    </nav>
    <a class="hybrid-topcta" href="mailto:ramonalberto.curbalvega@gmail.com?subject=Valoración%20deportiva">Solicitar valoración →</a>
  `;
  document.body.insertBefore(nav, document.body.firstChild);
  stage.id = 'inicio';

  const cleaner = document.createElement('div');
  cleaner.className = 'hybrid-hero-cleaner';
  stage.querySelector('.artboard')?.appendChild(cleaner);

  const signature = document.createElement('div');
  signature.className = 'hybrid-hero-signature';
  signature.innerHTML = 'Disciplina<br>Ciencia<br>Personas<br>Resultados';
  stage.querySelector('.artboard')?.appendChild(signature);

  const heroCta = document.createElement('div');
  heroCta.className = 'hybrid-hero-cta';
  heroCta.innerHTML = `
    <a class="primary" href="mailto:ramonalberto.curbalvega@gmail.com?subject=Solicitud%20de%20valoración">Solicitar valoración →</a>
    <button class="secondary" type="button" data-hybrid-presentation>▶ Ver presentación</button>
  `;
  stage.querySelector('.artboard')?.appendChild(heroCta);

  heroCta.querySelector('[data-hybrid-presentation]')?.addEventListener('click', () => {
    const trigger = document.querySelector('#profileVideoTrigger,.profile-video-trigger,[data-profile-video]');
    if (trigger) trigger.click();
  });

  const editorial = document.createElement('div');
  editorial.className = 'hybrid-editorial';
  editorial.innerHTML = `
    <section class="hybrid-section hybrid-profile" id="perfil">
      <article class="hybrid-profile-card">
        <img src="Mi_imagen.png" alt="Ramón Alberto Curbalán Vega" loading="lazy">
        <div class="hybrid-profile-quote">“Método, seguridad y seguimiento para convertir objetivos en resultados sostenibles.”</div>
      </article>
      <div class="hybrid-profile-main">
        <span class="hybrid-kicker">Profesional del acondicionamiento físico</span>
        <h1>Ramón Alberto<br>Curbalán Vega</h1>
        <h2>Acondicionamiento físico y entrenamiento personal</h2>
        <p>Profesional del sector deportivo con experiencia en entrenamiento personal, actividades dirigidas, enseñanza de natación y formación deportiva infantil. Planificación de sesiones adaptadas a distintas edades y niveles, incluidas personas mayores y grupos reducidos, con atención a la seguridad y al seguimiento del usuario.</p>
        <div class="hybrid-profile-actions">
          <a class="hybrid-btn" href="CV_Deporte.pdf" target="_blank" rel="noopener">Descargar CV</a>
          <a class="hybrid-btn green" href="mailto:ramonalberto.curbalvega@gmail.com">Hablemos →</a>
        </div>
      </div>
      <div class="hybrid-quickgrid" aria-label="Áreas profesionales">
        <div class="hybrid-quick"><i>◎</i><strong>Entrenamiento personal</strong><span>Individual y grupos reducidos</span></div>
        <div class="hybrid-quick"><i>↗</i><strong>Rendimiento deportivo</strong><span>Planificación y seguimiento</span></div>
        <div class="hybrid-quick"><i>≈</i><strong>Natación</strong><span>Enseñanza y medio acuático</span></div>
        <div class="hybrid-quick"><i>▦</i><strong>Planificación</strong><span>Rutinas adaptadas</span></div>
        <div class="hybrid-quick"><i>⌁</i><strong>Análisis</strong><span>Progreso y control de cargas</span></div>
        <div class="hybrid-quick"><i>♡</i><strong>Prevención</strong><span>Seguridad y readaptación</span></div>
      </div>
    </section>

    <section class="hybrid-dark" id="experiencia">
      <div class="hybrid-section hybrid-experience">
        <div class="hybrid-headingrow">
          <h3>Experiencia profesional</h3>
          <p>Trayectoria · aprendizaje · servicio</p>
        </div>
        <div class="hybrid-timeline">
          <article class="hybrid-job"><time>2024 - 2025</time><h4>Monitor de Pilates, yoga y taichí</h4><p>Centros de Manacor y Petra. Sesiones dirigidas a personas mayores, adaptadas a sus necesidades y condición física.</p></article>
          <article class="hybrid-job"><time>2024</time><h4>Entrenador personal</h4><p>Estudio Progreso · Cala Millor. Entrenamiento individual y sesiones en grupos reducidos de hasta 8 personas.</p></article>
          <article class="hybrid-job"><time>2022 - 2024</time><h4>Monitor deportivo y profesor de natación</h4><p>Cap Vermell Country Club. Funcional, cycling, Pilates, Body Pump, core, GAP, socorrismo y natación.</p></article>
          <article class="hybrid-job"><time>2020/21 - 2023</time><h4>Deporte base y medio acuático</h4><p>Responsable de prebenjamines en Club Esportiu Artà y monitor de actividades acuáticas y socorrismo en Capdepera.</p></article>
        </div>
      </div>
    </section>

    <section class="hybrid-section hybrid-light" id="metodo">
      <div class="hybrid-two">
        <div>
          <h3>Mi método de trabajo</h3>
          <div class="hybrid-method-grid">
            <article class="hybrid-method-card"><div class="hybrid-method-media" style="background-image:url('sport-cluster-gym.webp')"><span class="hybrid-method-num">01</span></div><h4>Evaluación</h4><p>Estado inicial, necesidades, nivel y objetivos.</p></article>
            <article class="hybrid-method-card"><div class="hybrid-method-media" style="background-image:url('coach-motion-poster.png')"><span class="hybrid-method-num">02</span></div><h4>Planificación</h4><p>Rutinas y sesiones adaptadas a cada perfil.</p></article>
            <article class="hybrid-method-card"><div class="hybrid-method-media" style="background-image:url('cluster-performance-clean-wide.webp')"><span class="hybrid-method-num">03</span></div><h4>Seguimiento</h4><p>Supervisión técnica y evolución del progreso.</p></article>
            <article class="hybrid-method-card"><div class="hybrid-method-media" style="background-image:url('cluster-profesional-battle-rope.webp')"><span class="hybrid-method-num">04</span></div><h4>Optimización</h4><p>Ajustes según respuesta, seguridad y resultados.</p></article>
          </div>
        </div>
        <div id="competencias">
          <h3>Competencias clave</h3>
          <div class="hybrid-skill-grid">
            <div class="hybrid-skill"><i>◎</i><span>Evaluación inicial y diagnóstico del nivel</span></div>
            <div class="hybrid-skill"><i>↗</i><span>Diseño de rutinas adaptadas</span></div>
            <div class="hybrid-skill"><i>⌁</i><span>Seguimiento de progresos</span></div>
            <div class="hybrid-skill"><i>▦</i><span>Dirección de actividades dirigidas</span></div>
            <div class="hybrid-skill"><i>◇</i><span>Trabajo con grupos reducidos</span></div>
            <div class="hybrid-skill"><i>♡</i><span>Atención y motivación al usuario</span></div>
            <div class="hybrid-skill"><i>≈</i><span>Natación y actividades acuáticas</span></div>
            <div class="hybrid-skill"><i>+</i><span>Seguridad, primeros auxilios y socorrismo</span></div>
            <div class="hybrid-skill"><i>R</i><span>Prevención y readaptación deportiva</span></div>
          </div>
        </div>
      </div>
    </section>

    <section class="hybrid-section hybrid-credentials" id="formacion">
      <h3>Formación y acreditaciones</h3>
      <div class="hybrid-credential-grid">
        <article class="hybrid-credential"><b>Acondicionamiento físico en sala de entrenamiento polivalente</b><span>Certificado Profesional Nivel 3 · AFDA0210</span><em>2024</em></article>
        <article class="hybrid-credential"><b>Socorrismo en instalaciones acuáticas</b><span>Certificado de Profesionalidad Nivel 2 · AFDP0109</span><em>2022</em></article>
        <article class="hybrid-credential"><b>Acreditación de competencias</b><span>IQPIB · UC0273_3 · UC0274_3 · UC0275_3</span><em>2023</em></article>
        <article class="hybrid-credential"><b>Máster en Coaching y Psicología Deportiva</b><span>Masstercursos · 650 h</span><em>2024</em></article>
        <article class="hybrid-credential"><b>Director Deportivo</b><span>Universidad Antonio de Nebrija · 110 h · 4 ECTS</span><em>2018</em></article>
        <article class="hybrid-credential"><b>Máster Experto en Alimentación y Nutrición</b><span>INN Formación · 1.000 h</span><em>2020</em></article>
        <article class="hybrid-credential"><b>Primeros auxilios en instalaciones deportivas</b><span>Grupo Insem · AFDP015PO · 50 h</span><em>2024</em></article>
        <article class="hybrid-credential"><b>Actividad física para colectivos especiales y tercera edad</b><span>Aspasia · AFDA001PO · 100 h</span><em>2023</em></article>
      </div>
    </section>

    <section class="hybrid-section hybrid-projects" id="proyectos">
      <h3>Proyectos destacados</h3>
      <div class="hybrid-project-grid">
        <article class="hybrid-project"><div class="hybrid-project-media" style="background-image:url('cluster-profesional-battle-rope.webp')"></div><h4>Planificación integral</h4><p>Sesiones estructuradas para mejorar la condición física y la adherencia.</p></article>
        <article class="hybrid-project"><div class="hybrid-project-media" style="background-image:url('cluster-performance-clean-wide.webp')"></div><h4>Control de cargas</h4><p>Seguimiento del progreso y adaptación del entrenamiento.</p></article>
        <article class="hybrid-project"><div class="hybrid-project-media" style="background-image:url('sport-cluster-gym.webp')"></div><h4>Prevención y readaptación</h4><p>Trabajo orientado a seguridad, técnica y recuperación funcional.</p></article>
        <article class="hybrid-project"><div class="hybrid-project-media" style="background-image:url('coach-motion-poster.png')"></div><h4>Entrenamiento personal</h4><p>Programas individualizados y grupos reducidos.</p></article>
        <article class="hybrid-project video"><div class="hybrid-project-media" style="background-image:url('cluster-profesional-panoramico.webp')"></div><div class="hybrid-project-copy"><h4>El deporte como herramienta de transformación</h4><p>Disciplina, ciencia y personas para construir resultados sostenibles.</p></div></article>
      </div>
    </section>

    <section class="hybrid-contact" id="contacto">
      <div class="hybrid-section hybrid-contact-inner">
        <div class="hybrid-contact-copy"><h3>¿Hablamos?</h3><p>Conectemos para construir rendimiento con método.</p></div>
        <div class="hybrid-contact-item"><b>Email</b><a href="mailto:ramonalberto.curbalvega@gmail.com">ramonalberto.curbalvega@gmail.com</a></div>
        <div class="hybrid-contact-item"><b>Teléfono</b><a href="tel:+34640724160">640 724 160</a></div>
        <div class="hybrid-contact-item"><b>Ubicación</b>Porto Cristo · Manacor<br>Mallorca, España</div>
        <div class="hybrid-contact-item"><b>Idiomas</b>Inglés alto · Italiano medio · Portugués medio</div>
      </div>
    </section>

    <footer class="hybrid-footer">
      <div class="hybrid-section hybrid-footer-inner">
        <strong>Ramón Alberto Curbalán Vega</strong>
        <span>Personas · proceso · resultados</span>
        <span>Acondicionamiento físico · rendimiento · entrenamiento personal</span>
      </div>
    </footer>
  `;
  stage.insertAdjacentElement('afterend', editorial);

  document.querySelectorAll('.hybrid-topnav a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });
})();
