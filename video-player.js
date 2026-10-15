/* Keep a visible way to start the original film when autoplay is blocked. */
(() => {
  const video = document.getElementById('impact-video-main');
  if (!video) return;
  const english = document.documentElement.lang.startsWith('en');
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'video-start';
  button.textContent = english ? '▶ Play video' : '▶ Reproducir vídeo';
  video.after(button);
  const show = () => { button.hidden = false; };
  video.addEventListener('playing', () => { button.hidden = true; });
  video.addEventListener('pause', show);
  video.addEventListener('error', show);
  button.addEventListener('click', () => {
    video.muted = true;
    video.playsInline = true;
    video.controls = true;
    if (video.error) video.load();
    video.play().catch(show);
  });
  button.hidden = !video.paused && video.readyState >= 3;
})();
