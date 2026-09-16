(() => {
  const orbit = document.querySelector('.discipline-orbit');
  if (!orbit || document.getElementById('profileVideoModal')) return;

  const trigger = document.getElementById('profileVideoTrigger') || orbit;

  const style = document.createElement('style');
  style.id = 'profileVideoStyles';
  style.textContent = `
    .discipline-orbit{overflow:visible;pointer-events:auto;touch-action:manipulation;outline:none}
    .discipline-orbit::after{pointer-events:none}
    .discipline-orbit:focus-visible{box-shadow:0 0 0 2px rgba(234,255,223,.95),0 0 18px rgba(105,220,64,.9)}
    .profile-video-modal{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;padding:clamp(14px,3vw,36px);background:rgba(1,7,4,.9);backdrop-filter:blur(10px);opacity:0;visibility:hidden;pointer-events:none;transition:opacity .22s ease,visibility .22s ease}
    .profile-video-modal.open{opacity:1;visibility:visible;pointer-events:auto}
    .profile-video-shell{position:relative;width:min(1100px,96vw);aspect-ratio:16/9;background:#000;border:1px solid rgba(204,164,91,.46);border-radius:18px;overflow:hidden;box-shadow:0 26px 80px rgba(0,0,0,.72),0 0 38px rgba(198,157,78,.16)}
    .profile-video-player{display:block;width:100%;height:100%;object-fit:contain;background:#000}
    .profile-video-close{position:absolute;right:12px;top:12px;z-index:8;width:42px;height:42px;border:1px solid rgba(235,206,145,.6);border-radius:50%;background:rgba(2,7,5,.76);color:#fff;font-size:27px;line-height:1;cursor:pointer;backdrop-filter:blur(8px)}
    .profile-video-close:hover,.profile-video-close:focus-visible{background:rgba(90,66,25,.9);outline:none;box-shadow:0 0 0 2px rgba(225,188,113,.42)}

    .profile-video-endcard{position:absolute;inset:0;z-index:3;display:flex;align-items:center;justify-content:center;opacity:0;visibility:hidden;pointer-events:none;background:radial-gradient(circle at 17% 18%,rgba(255,255,255,.045),transparent 20%),radial-gradient(circle at 82% 28%,rgba(255,255,255,.035),transparent 22%),linear-gradient(125deg,rgba(255,255,255,.025),transparent 24%,rgba(255,255,255,.018) 47%,transparent 69%),#1a1a18;transition:opacity .12s linear}
    .profile-video-endcard::before{content:'';position:absolute;inset:0;opacity:.34;mix-blend-mode:soft-light;background-image:repeating-linear-gradient(17deg,transparent 0 9px,rgba(255,255,255,.018) 10px,transparent 11px 23px),repeating-linear-gradient(103deg,transparent 0 15px,rgba(0,0,0,.16) 16px,transparent 18px 31px)}
    .profile-video-endcard.active{opacity:1;visibility:visible;pointer-events:auto}
    .profile-video-endcard-inner{position:relative;z-index:1;width:min(82%,900px);text-align:center;transform:translateY(-1.5%)}
    .profile-video-name{margin:0 auto .55rem;color:#d9ae63;font-family:Georgia,'Times New Roman',serif;font-size:clamp(28px,5.2vw,70px);font-weight:500;line-height:.94;letter-spacing:.035em;text-transform:uppercase;text-shadow:0 2px 0 #77501c,0 5px 12px rgba(0,0,0,.72),0 -1px 0 #f2d397}
    .profile-video-role{margin:.8rem 0 1.1rem;color:#d7ad67;font-size:clamp(11px,1.8vw,24px);font-weight:600;letter-spacing:.28em;text-transform:uppercase;text-shadow:0 2px 6px rgba(0,0,0,.65)}
    .profile-video-tagline{margin:0 0 clamp(18px,3.2vw,36px);color:#f6f6f4;font-size:clamp(17px,2.55vw,35px);font-weight:500;line-height:1.18;text-shadow:0 2px 5px rgba(0,0,0,.75)}
    .profile-video-valuation{display:inline-flex;align-items:center;justify-content:center;min-width:min(360px,74vw);padding:clamp(11px,1.4vw,18px) clamp(20px,3vw,42px);border:2px solid #d8ad63;border-radius:14px;background:rgba(16,16,15,.7);color:#fff;text-decoration:none;font-size:clamp(17px,2.2vw,30px);font-weight:650;line-height:1;box-shadow:inset 0 0 0 1px rgba(255,225,165,.12),0 4px 14px rgba(0,0,0,.32);transition:transform .16s ease,background .16s ease,box-shadow .16s ease}
    .profile-video-valuation:hover,.profile-video-valuation:focus-visible{transform:translateY(-2px);background:rgba(86,62,23,.76);outline:none;box-shadow:0 0 0 3px rgba(216,173,99,.2),0 8px 24px rgba(0,0,0,.38)}

    /* Coach natural: replaces the baked desktop coach with the repo motion asset. */
    .coach-natural-layer{display:none;position:absolute;left:41.18%;top:15.9%;width:24.6%;height:77.5%;z-index:2;pointer-events:none;overflow:visible;transform-origin:50% 92%;isolation:isolate}
    .coach-natural-layer::before{content:'';position:absolute;left:18%;right:22%;bottom:.3%;height:3.2%;border-radius:50%;background:rgba(3,15,10,.28);filter:blur(10px);opacity:.6;transform:scaleX(.94);z-index:-1}
    .coach-natural-layer::after{content:'';position:absolute;inset:3% 5% 2%;pointer-events:none;background:radial-gradient(ellipse at 53% 45%,rgba(208,239,207,.07),transparent 58%);mix-blend-mode:screen;opacity:.55;z-index:3}
    .coach-natural-poster,.coach-natural-video{position:absolute;inset:0;width:100%;height:100%;object-fit:fill;object-position:center;pointer-events:none;-webkit-mask-image:radial-gradient(ellipse at 50% 48%,#000 0 70%,rgba(0,0,0,.98) 79%,rgba(0,0,0,.58) 90%,transparent 100%);mask-image:radial-gradient(ellipse at 50% 48%,#000 0 70%,rgba(0,0,0,.98) 79%,rgba(0,0,0,.58) 90%,transparent 100%);filter:saturate(.91) contrast(.985) brightness(.985)}
    .coach-natural-poster{z-index:1;opacity:.98}
    .coach-natural-video{z-index:2;opacity:0;transition:opacity .7s ease;will-change:opacity}
    .coach-natural-layer.is-playing .coach-natural-video{opacity:.985}
    .coach-natural-layer.is-playing .coach-natural-poster{opacity:.18;transition:opacity .7s ease}

    /* Staged card response inspired by the reference video, without moving the card geometry. */
    .hotspot{overflow:hidden}
    .hotspot.ambient-focus{border-color:rgba(174,231,145,.78)!important;background:linear-gradient(180deg,rgba(107,190,70,.12),rgba(30,93,52,.025) 42%,transparent 78%)!important;box-shadow:inset 0 0 22px rgba(127,221,91,.075),0 0 0 1px rgba(166,230,133,.28),0 0 20px rgba(84,181,54,.22)!important}
    .hotspot.ambient-focus::before{border-color:rgba(200,246,178,.72)!important;background:linear-gradient(102deg,transparent 18%,rgba(223,255,210,.08) 34%,rgba(220,255,203,.34) 50%,rgba(174,236,146,.08) 67%,transparent 82%)!important;background-size:260% 100%!important;animation:coach-card-sweep 1.25s ease-out both!important}
    .hotspot.ambient-focus::after{background:rgba(66,124,64,.96)!important;border-color:rgba(226,252,214,.82)!important;box-shadow:0 0 16px rgba(140,224,103,.34)!important}
    .hotspot.card-open-flash::before{animation:coach-card-open .42s ease-out both!important}

    @keyframes coach-card-sweep{0%{background-position:190% 0;opacity:.25}45%{opacity:1}100%{background-position:-90% 0;opacity:.48}}
    @keyframes coach-card-open{0%{opacity:.4;transform:scaleX(.98)}45%{opacity:1;transform:scaleX(1.01)}100%{opacity:.6;transform:scaleX(1)}}

    @media(min-width:1101px) and (orientation:landscape){.coach-natural-layer{display:block}}
    @media(max-width:780px){.profile-video-modal{padding:8px}.profile-video-shell{width:100%;border-radius:12px}.profile-video-close{right:8px;top:8px;width:38px;height:38px}.profile-video-endcard-inner{width:88%}.profile-video-role{letter-spacing:.18em}.profile-video-valuation{border-radius:10px}}
    @media(prefers-reduced-motion:reduce){.profile-video-modal,.profile-video-endcard,.profile-video-valuation,.coach-natural-video{transition:none}.coach-natural-layer{display:none!important}.hotspot.ambient-focus::before,.hotspot.card-open-flash::before{animation:none!important}}
  `;
  document.head.appendChild(style);

  /* Natural coach integration. The mobile/portrait artwork remains untouched. */
  const artboard = document.querySelector('.artboard');
  const desktopSource = artboard && artboard.querySelector('picture source[media*="1101"]');
  const desktopQuery = window.matchMedia('(min-width:1101px) and (orientation:landscape)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let coachLayer = null;
  let coachVideo = null;
  let coachWasVisible = true;
  let originalDesktopSrc = desktopSource ? desktopSource.getAttribute('srcset') : '';

  const ensureCoach = () => {
    if (!artboard || !desktopSource || coachLayer || reducedMotion.matches || !desktopQuery.matches) return;

    const cleanBase = new Image();
    cleanBase.decoding = 'async';
    cleanBase.onload = () => {
      if (!desktopQuery.matches || reducedMotion.matches) return;
      desktopSource.setAttribute('srcset', 'cluster-coach-free.webp');
      const activeImg = artboard.querySelector('picture img');
      if (activeImg && activeImg.currentSrc) activeImg.decode?.().catch(() => {});
    };
    cleanBase.src = 'cluster-coach-free.webp';

    coachLayer = document.createElement('div');
    coachLayer.className = 'coach-natural-layer';
    coachLayer.setAttribute('aria-hidden', 'true');
    coachLayer.innerHTML = `
      <img class="coach-natural-poster" src="coach-motion-poster.png" alt="" aria-hidden="true">
      <video class="coach-natural-video" muted loop playsinline preload="auto" disablepictureinpicture tabindex="-1" aria-hidden="true">
        <source src="coach-motion.webm" type="video/webm">
      </video>`;

    const firstOverlay = artboard.querySelector('.mountain-mist, .scene-video, .discipline-orbit');
    artboard.insertBefore(coachLayer, firstOverlay || null);
    coachVideo = coachLayer.querySelector('.coach-natural-video');
    coachVideo.muted = true;
    coachVideo.playbackRate = .84;

    const startCoach = () => {
      if (!coachVideo || reducedMotion.matches || !desktopQuery.matches || document.hidden || !coachWasVisible || document.querySelector('.profile-video-modal.open')) return;
      coachVideo.muted = true;
      coachVideo.playbackRate = .84;
      const p = coachVideo.play();
      if (p && typeof p.then === 'function') p.then(() => coachLayer?.classList.add('is-playing')).catch(() => {});
    };
    const stopCoach = () => { if (coachVideo) coachVideo.pause(); };

    coachVideo.addEventListener('canplay', startCoach, {once:true});
    coachVideo.addEventListener('playing', () => coachLayer?.classList.add('is-playing'));

    const observer = new IntersectionObserver(entries => {
      coachWasVisible = entries.some(entry => entry.isIntersecting && entry.intersectionRatio > .12);
      if (coachWasVisible) startCoach(); else stopCoach();
    }, {threshold:[0,.12,.5]});
    observer.observe(artboard);

    document.addEventListener('visibilitychange', () => document.hidden ? stopCoach() : startCoach());
    window.addEventListener('profile-video-open', stopCoach);
    window.addEventListener('profile-video-close', startCoach);
    startCoach();
  };

  const removeCoach = () => {
    if (desktopSource && originalDesktopSrc) desktopSource.setAttribute('srcset', originalDesktopSrc);
    if (coachVideo) coachVideo.pause();
    if (coachLayer) coachLayer.remove();
    coachLayer = null;
    coachVideo = null;
  };

  const syncCoachMode = () => {
    if (desktopQuery.matches && !reducedMotion.matches) ensureCoach();
    else removeCoach();
  };
  desktopQuery.addEventListener?.('change', syncCoachMode);
  reducedMotion.addEventListener?.('change', syncCoachMode);
  syncCoachMode();

  /* Sequential card activation without shifting layout. */
  const ambientCards = [...document.querySelectorAll('.hotspot')].filter(card => !card.classList.contains('profile'));
  let ambientIndex = 0;
  let ambientTimer = 0;
  let userInteracting = false;

  const clearAmbient = () => ambientCards.forEach(card => card.classList.remove('ambient-focus'));
  const stepAmbient = () => {
    if (!ambientCards.length || userInteracting || document.hidden || document.querySelector('.drawer.open') || document.querySelector('.profile-video-modal.open')) return;
    clearAmbient();
    ambientCards[ambientIndex % ambientCards.length].classList.add('ambient-focus');
    ambientIndex = (ambientIndex + 1) % ambientCards.length;
  };
  const startAmbient = () => {
    if (ambientTimer || !ambientCards.length || reducedMotion.matches) return;
    stepAmbient();
    ambientTimer = window.setInterval(stepAmbient, 2200);
  };
  const stopAmbient = () => {
    if (ambientTimer) window.clearInterval(ambientTimer);
    ambientTimer = 0;
    clearAmbient();
  };

  ambientCards.forEach(card => {
    card.addEventListener('pointerenter', () => {userInteracting = true;clearAmbient();card.classList.add('ambient-focus');});
    card.addEventListener('pointerleave', () => {userInteracting = false;card.classList.remove('ambient-focus');});
    card.addEventListener('focus', () => {userInteracting = true;clearAmbient();card.classList.add('ambient-focus');});
    card.addEventListener('blur', () => {userInteracting = false;card.classList.remove('ambient-focus');});
    card.addEventListener('click', () => {
      card.classList.add('card-open-flash');
      window.setTimeout(() => card.classList.remove('card-open-flash'), 460);
    });
  });
  document.addEventListener('visibilitychange', () => document.hidden ? stopAmbient() : startAmbient());
  startAmbient();

  trigger.title = 'Reproducir vídeo de perfil profesional';

  const modal = document.createElement('div');
  modal.id = 'profileVideoModal';
  modal.className = 'profile-video-modal';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div class="profile-video-shell" role="dialog" aria-modal="true" aria-label="Vídeo de perfil profesional">
      <video class="profile-video-player" id="profileVideoPlayer" controls playsinline preload="metadata">
        <source src="video-perfil-deportivo-corregido.mp4?v=20260913-iphone" type="video/mp4">
      </video>
      <div class="profile-video-endcard" id="profileVideoEndcard" aria-hidden="true">
        <div class="profile-video-endcard-inner">
          <div class="profile-video-name">RAMÓN ALBERTO<br>CURBALÁN VEGA</div>
          <div class="profile-video-role">PERFIL PROFESIONAL DEPORTIVO</div>
          <div class="profile-video-tagline">Entrena con cabeza. Mejora con método.</div>
          <a class="profile-video-valuation" id="profileVideoValuation" href="https://chetesaifitness.com/" target="_blank" rel="noopener noreferrer">Solicita tu valoración</a>
        </div>
      </div>
      <button class="profile-video-close" id="profileVideoClose" type="button" aria-label="Cerrar vídeo">×</button>
    </div>`;
  document.body.appendChild(modal);

  const video = document.getElementById('profileVideoPlayer');
  const close = document.getElementById('profileVideoClose');
  const endcard = document.getElementById('profileVideoEndcard');
  let returnFocus = null;

  const closingStart = () => {
    if (Number.isFinite(video.duration) && video.duration > 2.05) return video.duration - 2.005;
    return 8;
  };
  const syncEndcard = () => {
    const active = video.currentTime >= closingStart();
    endcard.classList.toggle('active', active);
    endcard.setAttribute('aria-hidden', active ? 'false' : 'true');
  };
  const openModal = () => {
    returnFocus = document.activeElement;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    window.dispatchEvent(new Event('profile-video-open'));
    stopAmbient();
    video.currentTime = 0;
    video.muted = false;
    endcard.classList.remove('active');
    endcard.setAttribute('aria-hidden', 'true');
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  };
  const closeModal = () => {
    video.pause();
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    endcard.classList.remove('active');
    endcard.setAttribute('aria-hidden', 'true');
    window.dispatchEvent(new Event('profile-video-close'));
    startAmbient();
    if (returnFocus && typeof returnFocus.focus === 'function') returnFocus.focus({preventScroll: true});
  };

  trigger.addEventListener('click', openModal);
  close.addEventListener('click', closeModal);
  modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
  video.addEventListener('loadedmetadata', syncEndcard);
  video.addEventListener('timeupdate', syncEndcard);
  video.addEventListener('seeking', syncEndcard);
  video.addEventListener('ended', syncEndcard);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
})();
