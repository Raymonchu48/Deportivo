(() => {
  const boot = async () => {
    const artboard = document.querySelector('.artboard');
    const cluster = document.querySelector('.cluster');
    if (!artboard || !cluster || document.documentElement.classList.contains('cluster-master-active')) return;

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

    /* La imagen maestra se almacena en fragmentos de texto para conservarla exacta en GitHub Pages. */
    const files = [
      'cluster-master-img/part-00.txt','cluster-master-img/part-01.txt',
      'cluster-master-img/part-02.txt','cluster-master-img/part-03.txt',
      'cluster-master-img/p04-00.txt','cluster-master-img/p04-01.txt',
      'cluster-master-img/p04-02.txt','cluster-master-img/p04-03.txt',
      'cluster-master-img/p05-00.txt','cluster-master-img/p05-01.txt',
      'cluster-master-img/p05-02.txt','cluster-master-img/p05-03.txt'
    ];

    const parts = await Promise.all(files.map(async file => {
      const response = await fetch(`${file}?v=20260917-master3`, { cache: 'force-cache' });
      if (!response.ok) throw new Error(`No se pudo cargar ${file}`);
      return (await response.text()).trim();
    }));

    const masterSrc = `data:image/avif;base64,${parts.join('')}`;
    const probe = new Image();
    probe.src = masterSrc;
    try {
      await probe.decode();
    } catch (_) {
      await new Promise((resolve, reject) => {
        if (probe.complete && probe.naturalWidth) return resolve();
        probe.onload = resolve;
        probe.onerror = reject;
      });
    }
    if (!probe.naturalWidth) throw new Error('La imagen maestra no se pudo decodificar');

    /* No dejamos dos coaches activos: la figura animada antigua se detiene antes de retirar su capa. */
    artboard.querySelectorAll('.coach-natural-video').forEach(video => video.pause());
    artboard.querySelectorAll('.coach-natural-layer,.gym-foreground,.mountain-mist').forEach(el => el.remove());

    const picture = artboard.querySelector('picture');
    if (picture) {
      const img = document.createElement('img');
      img.src = masterSrc;
      img.alt = 'Clúster deportivo interactivo de Ramón Alberto Curbalán Vega';
      img.width = 1672;
      img.height = 941;
      img.decoding = 'async';
      img.fetchPriority = 'high';
      picture.replaceChildren(img);
    }
    cluster.style.setProperty('--cluster-master-bg', `url("${masterSrc}")`);
    document.documentElement.classList.add('cluster-master-active');
    document.documentElement.classList.remove('cluster-master-loading');

    const activate = key => {
      const button = legacy[key];
      if (button) button.click();
    };

    const addHit = (cls, label, action) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `master-hotspot ${cls}`;
      button.setAttribute('aria-label', label);
      button.addEventListener('click', action);
      artboard.appendChild(button);
      return button;
    };

    const menu = [
      ['master-menu-profile','Perfil',() => activate('profile')],
      ['master-menu-method','Método',() => activate('method')],
      ['master-menu-experience','Experiencia',() => activate('experience')],
      ['master-menu-specialties','Especialidades',() => activate('specialties')],
      ['master-menu-talk','Hablemos',() => activate('value')],
      ['master-menu-contact','Contacto',() => activate('impact')],
      ['master-menu-cv','Descargar CV',() => window.open('CV_Deporte.pdf','_blank','noopener')]
    ];
    const menuButtons = menu.map(([cls,label,action]) => addHit(cls,label,action));

    const presentationCover = document.createElement('div');
    presentationCover.className = 'master-presentation-cover';
    presentationCover.setAttribute('aria-hidden','true');
    artboard.appendChild(presentationCover);

    const presentationButton = document.createElement('button');
    presentationButton.type = 'button';
    presentationButton.className = 'master-presentation-button';
    presentationButton.textContent = 'Ver presentación';
    presentationButton.setAttribute('aria-label','Ver presentación profesional');
    presentationButton.addEventListener('click', () => legacy.coach?.click());
    artboard.appendChild(presentationButton);

    const ring = document.createElement('div');
    ring.className = 'master-ring';
    ring.setAttribute('aria-hidden','true');
    artboard.appendChild(ring);

    /* Ritmo deliberadamente más natural que la primera prueba. */
    const gymZone = artboard.querySelector('.scene-gym');
    if (gymZone && !gymZone.querySelector('.gym-metrics-overlay')) {
      const metrics = document.createElement('div');
      metrics.className = 'gym-metrics-overlay';
      metrics.setAttribute('aria-hidden','true');
      metrics.innerHTML = `
        <div class="gym-metric">FC MEDIA<strong>142</strong><em>lpm</em><span class="gym-metric-bar"></span></div>
        <div class="gym-metric">POTENCIA<strong>892</strong><em>W</em><span class="gym-metric-bar"></span></div>
        <div class="gym-metric">ZONA<strong>4</strong><span class="gym-metric-bar"></span></div>
      `;
      gymZone.appendChild(metrics);
    }


    const sceneVideos = [...artboard.querySelectorAll('.scene-video video')];


    sceneVideos.forEach(video => {
      video.muted = true;
      video.playbackRate = 0.72;
      video.playsInline = true;
    });

    const syncMedia = () => {
      const drawerOpen = document.getElementById('drawer')?.classList.contains('open');
      const modalOpen = Boolean(document.querySelector('.profile-video-modal.open'));
      const pause = document.hidden || drawerOpen || modalOpen || matchMedia('(prefers-reduced-motion: reduce)').matches;
      sceneVideos.forEach(video => {
        if (pause) video.pause();
        else video.play().catch(() => {});
      });
    };
    document.addEventListener('visibilitychange', syncMedia);
    new MutationObserver(syncMedia).observe(document.body,{subtree:true,attributes:true,attributeFilter:['class']});
    syncMedia();
  };

  const start = () => boot().catch(error => {
    console.error('[cluster-master]', error);
    document.documentElement.classList.remove('cluster-master-active');
    document.documentElement.classList.remove('cluster-master-loading');
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once:true });
  else start();
})();
