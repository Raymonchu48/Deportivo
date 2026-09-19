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

    /* Base visual aprobada por el usuario. */
    const masterSrc = 'cluster-final-aprobado.avif?v=20260919-approved30';
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
      img.width = 1881;
      img.height = 836;
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
    const presentationMenuButton = menuButtons.find(button => button.classList.contains('master-menu-cv'));
    if (presentationMenuButton) {
      presentationMenuButton.innerHTML = `
        <span class="master-menu-presentation-content" aria-hidden="true">
          <span class="master-menu-presentation-icon">▶</span>
          <span class="master-menu-presentation-copy">
            <strong>Ver presentación</strong>
            <span>Presentación profesional</span>
          </span>
        </span>
      `;
    }

    const ring = document.createElement('div');
    ring.className = 'master-ring';
    ring.setAttribute('aria-hidden','true');
    artboard.appendChild(ring);

    const bodyLive = document.createElement('div');
    bodyLive.className = 'body-live-panel';
    bodyLive.setAttribute('aria-hidden','true');
    bodyLive.innerHTML = `
      <div class="body-sport-video-wrap">
        <video class="body-sport-video"
          src="clon_sport_panel_hq.mp4?v=20260919-bodyhq26"
          autoplay muted loop playsinline preload="auto"></video>
      </div>
    `;
    artboard.appendChild(bodyLive);

    const evolutionLivePanel = document.createElement('div');
    evolutionLivePanel.className = 'evolution-live-panel';
    evolutionLivePanel.setAttribute('aria-hidden','true');
    evolutionLivePanel.innerHTML = `
      <div class="evolution-live">
        <svg viewBox="0 0 215 100" preserveAspectRatio="none">
          <path class="evolution-live-track" d="M 4 88 L 40 65 L 72 79 L 112 52 L 143 66 L 176 49 L 208 19"></path>
          <circle class="evolution-live-dot" r="4" cx="0" cy="0"></circle>
        </svg>
        <div class="evolution-score-live">+ <span>28</span>%</div>
        <div class="evolution-scan"></div>
      </div>
    `;
    artboard.appendChild(evolutionLivePanel);

    const evolutionValues = [28,29,27,30,31,29,28];
    let liveStep = 0;
    const updateLivePanels = () => {
      const evo = evolutionValues[liveStep % evolutionValues.length];
      const evoNode = evolutionLivePanel.querySelector('.evolution-score-live span');
      if (evoNode) evoNode.textContent = evo;
      liveStep += 1;
    };

    updateLivePanels();
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.setInterval(updateLivePanels, 2400);
    }

    const sceneVideos = [...artboard.querySelectorAll('.scene-video video, .body-sport-video')];


    sceneVideos.forEach(video => {
      video.muted = true;
      video.playbackRate = video.classList.contains('body-sport-video') ? 1 : 0.72;
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
