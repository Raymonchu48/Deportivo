(function(){
  'use strict';

  var cluster=document.getElementById('cluster');
  if(!cluster||cluster.querySelector('.spf-bg-video-wrap'))return;

  var parts=[
    'cluster-video/p00.txt?v=1',
    'cluster-video/p01.txt?v=1',
    'cluster-video/p02a.txt?v=1',
    'cluster-video/p02b.txt?v=1',
    'cluster-video/p02c.txt?v=1',
    'cluster-video/p02d.txt?v=1',
    'cluster-video/p03.txt?v=1',
    'cluster-video/p04.txt?v=1',
    'cluster-video/p05.txt?v=1',
    'cluster-video/p06.txt?v=1',
    'cluster-video/p07.txt?v=1'
  ];

  var wrap=document.createElement('div');
  wrap.className='spf-bg-video-wrap';
  wrap.setAttribute('aria-hidden','true');
  wrap.innerHTML='<div class="spf-bg-video-fallback"></div><div class="spf-bg-video-shade"></div><div class="spf-bg-video-vignette"></div>';

  var system=cluster.querySelector('.spf-system');
  cluster.insertBefore(wrap,system||cluster.firstChild);

  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    cluster.classList.add('spf-bg-reduced');
    return;
  }

  Promise.all(parts.map(function(url){
    return fetch(url).then(function(response){
      if(!response.ok)throw new Error('No se pudo cargar el fragmento de vídeo');
      return response.text();
    });
  })).then(function(chunks){
    var base64=chunks.join('').replace(/\s+/g,'');
    var binary=atob(base64);
    var bytes=new Uint8Array(binary.length);
    for(var i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);

    var blob=new Blob([bytes],{type:'video/mp4'});
    var objectUrl=URL.createObjectURL(blob);
    var video=document.createElement('video');
    video.className='spf-bg-video';
    video.autoplay=true;
    video.muted=true;
    video.defaultMuted=true;
    video.loop=true;
    video.playsInline=true;
    video.preload='auto';
    video.setAttribute('muted','');
    video.setAttribute('playsinline','');
    video.setAttribute('aria-hidden','true');
    video.src=objectUrl;
    wrap.prepend(video);

    var ready=false;
    function showVideo(){
      if(ready)return;
      ready=true;
      cluster.classList.add('spf-bg-ready');
      video.play().catch(function(){});
    }
    video.addEventListener('canplay',showVideo,{once:true});
    video.addEventListener('loadeddata',showVideo,{once:true});

    document.addEventListener('visibilitychange',function(){
      if(document.hidden)video.pause();
      else video.play().catch(function(){});
    });

    window.addEventListener('pagehide',function(){
      URL.revokeObjectURL(objectUrl);
    },{once:true});
  }).catch(function(){
    cluster.classList.add('spf-bg-error');
  });
})();
