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

    /* Imagen maestra limpia editada en Canva y almacenada localmente en el repositorio. */
    const masterSrc = 'cluster-canva-clean.png?v=20260919-canva-clean18';
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
      img.width = 1809;
      img.height = 990;
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
      ['master-menu-cv','Ver presentación',() => legacy.coach?.click()]
    ];
    const menuButtons = menu.map(([cls,label,action]) => addHit(cls,label,action));

    const ring = document.createElement('div');
    ring.className = 'master-ring';
    ring.setAttribute('aria-hidden','true');
    artboard.appendChild(ring);

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
