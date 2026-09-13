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
    .profile-video-modal{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;padding:clamp(14px,3vw,36px);background:rgba(1,7,4,.88);backdrop-filter:blur(10px);opacity:0;visibility:hidden;pointer-events:none;transition:opacity .22s ease,visibility .22s ease}
    .profile-video-modal.open{opacity:1;visibility:visible;pointer-events:auto}
    .profile-video-shell{position:relative;width:min(1100px,96vw);aspect-ratio:16/9;background:#000;border:1px solid rgba(166,224,138,.45);border-radius:18px;overflow:hidden;box-shadow:0 26px 80px rgba(0,0,0,.7),0 0 38px rgba(97,185,65,.18)}
    .profile-video-player{display:block;width:100%;height:100%;object-fit:contain;background:#000}
    .profile-video-close{position:absolute;right:12px;top:12px;z-index:4;width:42px;height:42px;border:1px solid rgba(225,255,211,.55);border-radius:50%;background:rgba(2,12,7,.78);color:#fff;font-size:27px;line-height:1;cursor:pointer;backdrop-filter:blur(8px)}
    .profile-video-close:hover,.profile-video-close:focus-visible{background:rgba(55,106,40,.92);outline:none;box-shadow:0 0 0 2px rgba(174,231,144,.45)}
    .profile-video-valuation{position:absolute;left:35%;top:71.5%;width:30%;height:13%;z-index:3;border-radius:12px;pointer-events:none;opacity:0;cursor:pointer}
    .profile-video-valuation.active{pointer-events:auto;opacity:1}
    @media(max-width:780px){.profile-video-modal{padding:8px}.profile-video-shell{width:100%;border-radius:12px}.profile-video-close{right:8px;top:8px;width:38px;height:38px}}
    @media(prefers-reduced-motion:reduce){.profile-video-modal{transition:none}}
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
        <source src="video-perfil-deportivo.mp4" type="video/mp4">
      </video>
      <a class="profile-video-valuation" id="profileVideoValuation" href="https://chetesaifitness.com/" target="_blank" rel="noopener noreferrer" aria-label="Solicita tu valoración en Chetesaí Fitness"></a>
      <button class="profile-video-close" id="profileVideoClose" type="button" aria-label="Cerrar vídeo">×</button>
    </div>`;
  document.body.appendChild(modal);

  const video = document.getElementById('profileVideoPlayer');
  const close = document.getElementById('profileVideoClose');
  const valuation = document.getElementById('profileVideoValuation');
  let returnFocus = null;

  const syncValuation = () => valuation.classList.toggle('active', video.currentTime >= 8);
  const openModal = () => {
    returnFocus = document.activeElement;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    video.currentTime = 0;
    video.muted = false;
    valuation.classList.remove('active');
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
    valuation.classList.remove('active');
    if (returnFocus && typeof returnFocus.focus === 'function') {
      returnFocus.focus({preventScroll: true});
    }
  };

  trigger.addEventListener('click', openModal);
  close.addEventListener('click', closeModal);
  modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
  video.addEventListener('timeupdate', syncValuation);
  video.addEventListener('seeking', syncValuation);
  video.addEventListener('ended', syncValuation);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
})();
