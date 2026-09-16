(() => {
  const applyHandFix = () => {
    if (document.getElementById('coachHandMaskFix')) return;
    const style = document.createElement('style');
    style.id = 'coachHandMaskFix';
    style.textContent = `
      .coach-natural-poster,.coach-natural-video{
        -webkit-mask-image:radial-gradient(ellipse at 50% 48%,#000 0 96%,rgba(0,0,0,.96) 98%,transparent 100%)!important;
        mask-image:radial-gradient(ellipse at 50% 48%,#000 0 96%,rgba(0,0,0,.96) 98%,transparent 100%)!important;
        -webkit-mask-repeat:no-repeat!important;
        mask-repeat:no-repeat!important;
        -webkit-mask-size:100% 100%!important;
        mask-size:100% 100%!important;
      }
    `;
    document.head.appendChild(style);
  };

  const core = document.createElement('script');
  core.src = 'profile-video-modal-core.js?v=20260916-handfix1';
  core.async = false;
  core.onload = applyHandFix;
  document.head.appendChild(core);
})();