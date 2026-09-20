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


    // Reference sequence: outline, light sweep, then a long quiet reading phase.
    // Only transparent overlays move; the original artwork and lettering stay fixed.
    const motionStyle = document.createElement('style');
    motionStyle.textContent = `
      .scene-panel-action{position:absolute;z-index:9;display:block;padding:0;border:0;
        background:transparent;cursor:pointer;border-radius:18px;overflow:hidden;
        -webkit-tap-highlight-color:transparent;touch-action:manipulation}
      .scene-panel-action::before,.scene-panel-action::after{content:'';position:absolute;
        inset:0;pointer-events:none;border-radius:inherit;opacity:0}
      .scene-panel-action::before{border:1px solid rgba(163,255,218,.7);
        box-shadow:inset 0 0 16px rgba(110,255,203,.12);
        animation:panel-outline-phase 18s ease-in-out infinite;
        animation-delay:var(--phase);animation-play-state:paused}
      .scene-panel-action::after{background:linear-gradient(105deg,transparent 35%,rgba(170,255,226,.14) 50%,transparent 65%);
        animation:panel-sweep-phase 18s ease-in-out infinite;
        animation-delay:var(--phase);animation-play-state:paused}
      .panel-motion-running .scene-panel-action::before,
      .panel-motion-running .scene-panel-action::after{animation-play-state:running}
      .scene-panel-action:hover,.scene-panel-action:focus-visible{
        outline:2px solid #afffdb;outline-offset:-3px;
        box-shadow:inset 0 0 22px rgba(99,255,186,.12)}
      .scene-panel-action:hover::after,.scene-panel-action:focus-visible::after{
        animation:none;opacity:.55;transform:translateX(0)}
      .scene-panel-gym{left:16.6%;top:7.2%;width:25.2%;height:43%;--phase:0s;
        clip-path:polygon(0 0,100% 24%,100% 100%,0 100%)}
      .scene-panel-evolution{left:16.6%;top:52%;width:21.8%;height:23%;--phase:3s}
      .scene-panel-body{left:70.4%;top:9%;width:22.7%;height:41.5%;--phase:1.5s}
      .scene-panel-swimmer{left:55.4%;top:53%;width:37%;height:30%;--phase:4.5s}
      @keyframes panel-outline-phase{
        0%{opacity:0}5%,14%{opacity:.7}23%,100%{opacity:0}}
      @keyframes panel-sweep-phase{
        0%,6%{opacity:0;transform:translateX(-105%)}
        9%,19%{opacity:1}25%,100%{opacity:0;transform:translateX(105%)}}
      @media(prefers-reduced-motion:reduce){
        .scene-panel-action::before,.scene-panel-action::after{animation:none!important}}
    `;
    document.head.appendChild(motionStyle);
    const panelActions = [
      ['gym','Ver entrenamiento y especialidades','proyectos','specialties'],
      ['evolution','Ver el método y seguimiento','metodo','method'],
      ['body','Ver competencias profesionales','competencias','skills'],
      ['swimmer','Ver experiencia en natación','experiencia','experience']
    ];
    panelActions.forEach(([name,label,targetId,fallback]) => {
      const action = document.createElement('button');
      action.type = 'button';
      action.className = `scene-panel-action scene-panel-${name}`;
      action.setAttribute('aria-label', label);
      action.addEventListener('click', () => {
        const target = document.getElementById(targetId);
        if (!target) { activate(fallback); return; }
        target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
        // Move keyboard focus with the navigation, without adding a tab stop.
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex','-1');
        target.focus({preventScroll:true});
      });
      artboard.appendChild(action);
    });
    const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
    let panelsVisible = false;
    const syncPanelMotion = () => artboard.classList.toggle('panel-motion-running',
      panelsVisible && !document.hidden && !motionPreference.matches &&
      !document.querySelector('.profile-video-modal.open') && !document.getElementById('drawer')?.classList.contains('open'));
    new IntersectionObserver(entries => {
      panelsVisible = entries[0].isIntersecting;
      syncPanelMotion();
    },{threshold:.1}).observe(artboard);
    document.addEventListener('visibilitychange',syncPanelMotion);
    motionPreference.addEventListener('change',syncPanelMotion);
    new MutationObserver(syncPanelMotion).observe(document.body,{subtree:true,attributes:true,attributeFilter:['class']});

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
