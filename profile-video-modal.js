(() => {
  const orbit = document.querySelector('.discipline-orbit');
  if (!orbit || document.getElementById('profileVideoModal')) return;

  orbit.removeAttribute('aria-hidden');

  const style = document.createElement('style');
  style.id = 'profileVideoStyles';
  style.textContent = `
    .discipline-orbit{overflow:visible;pointer-events:auto}
    .discipline-orbit::after{pointer-events:none}
    .profile-video-trigger{position:absolute;inset:16%;border:0;border-radius:50%;padding:0;background:transparent;cursor:pointer;pointer-events:auto;z-index:5;outline:none}
    .profile-video-trigger:focus-visible{box-shadow:0 0 0 2px rgba(234,255,223,.95),0 0 18px rgba(105,220,64,.9)}
    .profile-video-modal{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;padding:clamp(14px,3vw,36px);background:rgba(1,7,4,.9);backdrop-filter:blur(10px);opacity:0;visibility:hidden;pointer-events:none;transition:opacity .22s ease,visibility .22s ease}
    .profile-video-modal.open{opacity:1;visibility:visible;pointer-events:auto}
    .profile-video-shell{position:relative;width:min(1100px,96vw);aspect-ratio:16/9;background:#000;border:1px solid rgba(204,164,91,.46);border-radius:18px;overflow:hidden;box-shadow:0 26px 80px rgba(0,0,0,.72),0 0 38px rgba(198,157,78,.16)}
    .profile-video-player{display:block;width:100%;height:100%;object-fit:contain;background:#000}
    .profile-video-close{position:absolute;right:12px;top:12px;z-index:8;width:42px;height:42px;border:1px solid rgba(235,206,145,.6);border-radius:50%;background:rgba(2,7,5,.76);color:#fff;font-size:27px;line-height:1;cursor:pointer;backdrop-filter:blur(8px)}
    .profile-video-close:hover,.profile-video-close:focus-visible{background:rgba(90,66,25,.9);outline:none;box-shadow:0 0 0 2px rgba(225,188,113,.42)}

    .profile-video-endcard{position:absolute;inset:0;z-index:3;display:flex;align-items:center;justify-content:center;opacity:0;visibility:hidden;pointer-events:none;background:
      radial-gradient(circle at 17% 18%,rgba(255,255,255,.045),transparent 20%),
      radial-gradient(circle at 82% 28%,rgba(255,255,255,.035),transparent 22%),
      linear-gradient(125deg,rgba(255,255,255,.025),transparent 24%,rgba(255,255,255,.018) 47%,transparent 69%),
      #1a1a18;
      transition:opacity .12s linear}
    .profile-video-endcard::before{content:'';position:absolute;inset:0;opacity:.34;mix-blend-mode:soft-light;background-image:
      repeating-linear-gradient(17deg,transparent 0 9px,rgba(255,255,255,.018) 10px,transparent 11px 23px),
      repeating-linear-gradient(103deg,transparent 0 15px,rgba(0,0,0,.16) 16px,transparent 18px 31px)}
    .profile-video-endcard.active{opacity:1;visibility:visible;pointer-events:auto}
    .profile-video-endcard-inner{position:relative;z-index:1;width:min(82%,900px);text-align:center;transform:translateY(-1.5%)}
    .profile-video-name{margin:0 auto .55rem;color:#d9ae63;font-family:Georgia,'Times New Roman',serif;font-size:clamp(28px,5.2vw,70px);font-weight:500;line-height:.94;letter-spacing:.035em;text-transform:uppercase;text-shadow:0 2px 0 #77501c,0 5px 12px rgba(0,0,0,.72),0 -1px 0 #f2d397}
    .profile-video-role{margin:.8rem 0 1.1rem;color:#d7ad67;font-size:clamp(11px,1.8vw,24px);font-weight:600;letter-spacing:.28em;text-transform:uppercase;text-shadow:0 2px 6px rgba(0,0,0,.65)}
    .profile-video-tagline{margin:0 0 clamp(18px,3.2vw,36px);color:#f6f6f4;font-size:clamp(17px,2.55vw,35px);font-weight:500;line-height:1.18;text-shadow:0 2px 5px rgba(0,0,0,.75)}
    .profile-video-valuation{display:inline-flex;align-items:center;justify-content:center;min-width:min(360px,74vw);padding:clamp(11px,1.4vw,18px) clamp(20px,3vw,42px);border:2px solid #d8ad63;border-radius:14px;background:rgba(16,16,15,.7);color:#fff;text-decoration:none;font-size:clamp(17px,2.2vw,30px);font-weight:650;line-height:1;box-shadow:inset 0 0 0 1px rgba(255,225,165,.12),0 4px 14px rgba(0,0,0,.32);transition:transform .16s ease,background .16s ease,box-shadow .16s ease}
    .profile-video-valuation:hover,.profile-video-valuation:focus-visible{transform:translateY(-2px);background:rgba(86,62,23,.76);outline:none;box-shadow:0 0 0 3px rgba(216,173,99,.2),0 8px 24px rgba(0,0,0,.38)}
    @media(max-width:780px){.profile-video-modal{padding:8px}.profile-video-shell{width:100%;border-radius:12px}.profile-video-close{right:8px;top:8px;width:38px;height:38px}.profile-video-endcard-inner{width:88%}.profile-video-role{letter-spacing:.18em}.profile-video-valuation{border-radius:10px}}
    @media(prefers-reduced-motion:reduce){.profile-video-modal,.profile-video-endcard,.profile-video-valuation{transition:none}}
  `;
  document.head.appendChild(style);

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'profile-video-trigger';
  trigger.setAttribute('aria-label', 'Reproducir vídeo de perfil profesional');
  trigger.title = 'Reproducir vídeo de perfil profesional';
  orbit.appendChild(trigger);

  const modal = document.createElement('div');
  modal.id = 'profileVideoModal';
  modal.className = 'profile-video-modal';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div class="profile-video-shell" role="dialog" aria-modal="true" aria-label="Vídeo de perfil profesional">
      <video class="profile-video-player" id="profileVideoPlayer" controls playsinline preload="metadata">
        <source src="sport-performance-vision.mp4" type="video/mp4">
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
