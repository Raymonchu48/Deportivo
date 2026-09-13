(() => {
  const CORRECTED_VIDEO_URL = 'https://d2jqrm6oza8nb6.cloudfront.net/datasets/0b0e58ed-a93a-4382-b786-c7f4359759d2.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiMWQ5OThhMGVkMjY4ZThiOCIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTQ5MTIxNH0.qNI3kbyNggNtQngh5Z99I9d5JR2hGHIedbZYG6TPCfg';
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
