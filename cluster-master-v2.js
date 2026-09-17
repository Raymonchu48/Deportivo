(() => {
  const artboard = document.querySelector('.artboard');
  if (!artboard || document.documentElement.classList.contains('cluster-master-active')) return;

  const legacy = {
    profile: document.querySelector('.hotspot.identity'),
    method: document.querySelector('.hotspot.method'),
    experience: document.querySelector('.hotspot.experience'),
    specialties: document.querySelector('.hotspot.specialties'),
    value: document.querySelector('.hotspot.value'),
    impact: document.querySelector('.hotspot.impact'),
    skills: document.querySelector('.hotspot.skills'),
    coach: document.getElementById('profileVideoTrigger')
  };

  document.documentElement.classList.add('cluster-master-active');

  const picture = artboard.querySelector('picture');
  if (picture) {
    picture.innerHTML = '<img src="cluster-sport-performance-master.webp" alt="Clúster deportivo interactivo de Ramón Alberto Curbalán Vega" width="1672" height="941" decoding="async" fetchpriority="high">';
  }

  artboard.querySelectorAll('.coach-natural-layer,.gym-foreground,.mountain-mist').forEach(el => el.remove());

  const existingGym = artboard.querySelector('.scene-gym');
  const existingSwimmer = artboard.querySelector('.scene-swimmer');
  [existingGym, existingSwimmer].forEach(zone => {
    if (!zone) return;
    zone.removeAttribute('aria-hidden');
    zone.setAttribute('role','button');
    zone.setAttribute('tabindex','0');
  });

  const activateLegacy = key => {
    const el = legacy[key];
    if (el) el.click();
  };

  const addHit = (cls, label, action) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `master-hotspot ${cls}`;
    btn.setAttribute('aria-label', label);
    btn.addEventListener('click', action);
    btn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); action(); } });
    artboard.appendChild(btn);
    return btn;
  };

  addHit('master-gym-hit','Abrir especialidades de fuerza y entrenamiento',() => activateLegacy('specialties'));
  addHit('master-swimmer-hit','Abrir especialidades de natación y rendimiento',() => activateLegacy('value'));
  addHit('master-body-hit','Abrir competencias de rendimiento y seguimiento',() => activateLegacy('skills'));
  addHit('master-evolution-hit','Abrir experiencia y evolución profesional',() => activateLegacy('experience'));

  const downloadHit = addHit('master-download-hit','Descargar CV deportivo',() => {
    const a = document.createElement('a');
    a.href = 'CV_Deporte.pdf';
    a.target = '_blank';
    a.rel = 'noopener';
    document.body.appendChild(a); a.click(); a.remove();
  });

  const ring = document.createElement('div');
  ring.className = 'master-ring';
  ring.setAttribute('aria-hidden','true');
  artboard.appendChild(ring);

  const coachTrigger = artboard.querySelector('.discipline-orbit');
  if (coachTrigger) {
    coachTrigger.title = 'Ver presentación';
    coachTrigger.setAttribute('aria-label','Ver presentación profesional');
    coachTrigger.addEventListener('click', e => {
      if (legacy.coach && legacy.coach !== coachTrigger) {
        e.stopImmediatePropagation();
        legacy.coach.click();
      }
    }, true);
  }

  const mapMenu = [
    ['identity','profile'],
    ['method','method'],
    ['experience','experience'],
    ['specialties','specialties'],
    ['value','value'],
    ['impact','impact'],
    ['skills','profile']
  ];
  mapMenu.forEach(([cls,key]) => {
    const btn = artboard.querySelector(`.hotspot.${cls}`);
    if (!btn) return;
    btn.style.display = 'block';
    btn.innerHTML = '';
    btn.setAttribute('aria-label', cls === 'skills' ? 'Descargar CV' : `Abrir ${key}`);
    if (cls === 'skills') {
      btn.onclick = e => { e.preventDefault(); downloadHit.click(); };
    }
  });

  const syncMedia = () => {
    const paused = document.hidden || document.querySelector('.drawer.open') || document.querySelector('.profile-video-modal.open');
    artboard.querySelectorAll('.scene-video video').forEach(v => {
      v.muted = true;
      v.playbackRate = .82;
      if (paused) v.pause(); else v.play().catch(() => {});
    });
  };

  document.addEventListener('visibilitychange', syncMedia);
  new MutationObserver(syncMedia).observe(document.body,{subtree:true,attributes:true,attributeFilter:['class']});
  syncMedia();
})();