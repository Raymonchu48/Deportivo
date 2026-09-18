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

  const loadMasterCluster = () => {
    const loadScript = () => {
      if (document.querySelector('script[data-cluster-master]')) return;
      const script = document.createElement('script');
      script.src = 'cluster-master-v2.js?v=20260918-presentmenu17';
      script.async = false;
      script.dataset.clusterMaster = 'true';
      document.head.appendChild(script);
    };

    let css = document.querySelector('link[data-cluster-master]');
    if (css) {
      loadScript();
      return;
    }
    css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'cluster-master-v2.css?v=20260918-presentmenu17';
    css.dataset.clusterMaster = 'true';
    css.onload = loadScript;
    css.onerror = () => { console.error('[cluster-master] No se pudo cargar la hoja de estilos'); document.documentElement.classList.remove('cluster-master-loading'); };
    document.head.appendChild(css);
  };

  const core = document.createElement('script');
  core.src = 'profile-video-modal-core.js?v=20260916-handfix1';
  core.async = false;
  core.onload = () => {
    applyHandFix();
    loadMasterCluster();
  };
  document.head.appendChild(core);
})();
