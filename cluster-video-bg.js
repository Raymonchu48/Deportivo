(function(){
  'use strict';

  var cluster=document.getElementById('cluster');
  var stage=cluster&&cluster.querySelector('.spf-stage');
  if(!cluster||!stage||stage.querySelector('.spf-bg-video-wrap'))return;

  var parts=[
    'cluster-video/p00.txt?v=2',
    'cluster-video/p01.txt?v=2',
    'cluster-video/p02a.txt?v=2',
    'cluster-video/p02b.txt?v=2',
    'cluster-video/p02c.txt?v=2',
    'cluster-video/p02d.txt?v=2',
    'cluster-video/p03.txt?v=2',
    'cluster-video/p04.txt?v=2',
    'cluster-video/p05.txt?v=2',
    'cluster-video/p06.txt?v=2',
    'cluster-video/p07.txt?v=2'
  ];

  var wrap=document.createElement('div');
  wrap.className='spf-bg-video-wrap';
  wrap.setAttribute('aria-hidden','true');
  wrap.innerHTML='<div class="spf-bg-video-fallback"></div><div class="spf-bg-video-shade"></div><div class="spf-bg-video-vignette"></div>';
  stage.insertBefore(wrap,stage.firstChild);

  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    stage.classList.add('spf-bg-reduced');
    return;
  }

  Promise.all(parts.map(function(url){
    return fetch(url,{cache:'force-cache'}).then(function(response){
      if(!response.ok)throw new Error('No se pudo cargar '+url);
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
    wrap.insertBefore(video,wrap.firstChild);

    var ready=false;
    function showVideo(){
      if(ready)return;
      ready=true;
      stage.classList.add('spf-bg-ready');
      cluster.classList.add('spf-bg-ready');
      video.play().catch(function(){});
    }
    video.addEventListener('loadedmetadata',function(){
      if(!isFinite(video.duration)||video.duration<1){
        stage.classList.add('spf-bg-error');
        return;
      }
    },{once:true});
    video.addEventListener('canplay',showVideo,{once:true});
    video.addEventListener('loadeddata',showVideo,{once:true});
    video.addEventListener('error',function(){stage.classList.add('spf-bg-error');},{once:true});

    document.addEventListener('visibilitychange',function(){
      if(document.hidden)video.pause();
      else video.play().catch(function(){});
    });
    window.addEventListener('pagehide',function(){URL.revokeObjectURL(objectUrl);},{once:true});
  }).catch(function(error){
    stage.classList.add('spf-bg-error');
    console.warn('[SPORT VIDEO]',error&&error.message?error.message:error);
  });
})();
