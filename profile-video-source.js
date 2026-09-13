(() => {
  const CORRECTED_VIDEO_URL = 'https://d2jqrm6oza8nb6.cloudfront.net/datasets/2816a63a-388d-48e3-adfe-ea90dc6e90d0.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiMzE1ODdiMzMxNGQ1OGY3ZiIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTQyNzg5MX0.OtshN_uEOX54gPkgUpi2C-vS8nGL6zEDzU3MH7oGvXs';
  const apply = () => {
    const video = document.getElementById('profileVideoPlayer');
    if (!video) return false;
    const source = video.querySelector('source');
    if (source) source.src = CORRECTED_VIDEO_URL;
    else video.src = CORRECTED_VIDEO_URL;
    video.load();
    return true;
  };
  if (!apply()) {
    const observer = new MutationObserver(() => {
      if (apply()) observer.disconnect();
    });
    observer.observe(document.documentElement, {childList:true, subtree:true});
  }
})();