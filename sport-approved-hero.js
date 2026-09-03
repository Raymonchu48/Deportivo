(function(){
  'use strict';

  var ART_PARTS=Array.from({length:8},function(_,i){
    return 'approved-hero/part-'+String(i+1).padStart(2,'0')+'.txt?v=3';
  });
  var MOTION_PARTS=Array.from({length:9},function(_,i){
    return 'cluster-motion/part-'+String(i+1).padStart(2,'0')+'.txt?v=1';
  });
  var reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FALLBACK_VIDEO='sport-performance-vision.mp4';

  var moments={
    training:{time:.35,x:'27%',y:'61%',label:'ENTRENAMIENTO // MOVIMIENTO'},
    nutrition:{time:1.65,x:'44%',y:'33%',label:'NUTRICIÓN // ENERGÍA'},
    mind:{time:3.05,x:'59%',y:'27%',label:'PSICOLOGÍA // FOCO'},
    recovery:{time:4.55,x:'69%',y:'58%',label:'RECUPERACIÓN // CONTINUIDAD'},
    adapted:{time:6.25,x:'78%',y:'62%',label:'ADAPTADA // AUTONOMÍA'},
    management:{time:8.05,x:'50%',y:'76%',label:'GESTIÓN // SISTEMA'}
  };

  function fetchText(url){
    return fetch(url,{cache:'force-cache'}).then(function(r){
      if(!r.ok)throw new Error(url+' '+r.status);
      return r.text();
    });
  }

  function decodeBase64ToBlob(base64,type){
    base64=base64.replace(/\s+/g,'');
    if(!base64 || base64.length%4!==0)throw new Error('Base64 inválido: '+base64.length);
    var binary=atob(base64),bytes=new Uint8Array(binary.length);
    for(var i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
    return new Blob([bytes],{type:type});
  }

  function openRoute(route){
    if(window.SP_OPEN_MODULE){window.SP_OPEN_MODULE(route);return;}
    location.hash='#'+route;
  }

  function buildLiveLayout(cluster){
    var deck=cluster.querySelector('.spf-command-deck');
    if(!deck)return null;

    if(!deck.querySelector('.spf-approved-profile')){
      var profile=document.createElement('article');
      profile.className='spf-approved-profile';
      profile.innerHTML='<img src="Mi_imagen.png" alt="Ramón Alberto Curbalán Vega"><div><small>SPORT PERFORMANCE PROFILE</small><h3>RAMÓN ALBERTO CURBALÁN VEGA</h3><p>Entrenamiento · nutrición · psicología · gestión deportiva</p><div class="spf-approved-profile-actions"><button type="button" data-approved-route="sobre-mi">VER PERFIL</button><button type="button" data-approved-route="contacto">CONTACTO</button></div></div>';
      deck.appendChild(profile);
      profile.querySelectorAll('[data-approved-route]').forEach(function(btn){
        btn.addEventListener('click',function(){openRoute(btn.dataset.approvedRoute);});
      });
    }

    var frame=deck.querySelector('.spf-video-frame');
    if(frame && !frame.querySelector('.spf-motion-hud')){
      var hud=document.createElement('div');
      hud.className='spf-motion-hud';
      hud.setAttribute('aria-hidden','true');
      hud.innerHTML='<span class="spf-motion-pulse"></span><span class="spf-motion-label">ENTRENAMIENTO // MOVIMIENTO</span><span class="spf-motion-index">LIVE // 01</span>';
      frame.appendChild(hud);
    }

    var openBtn=deck.querySelector('[data-spf-video-open]');
    if(openBtn){
      openBtn.innerHTML='◉ <span>AMPLIAR VÍDEO</span>';
      openBtn.setAttribute('aria-label','Abrir vídeo del cluster');
    }

    return deck;
  }

  function setPortfolioIdentity(cluster){
    var navLink=document.querySelector('.menu a[href="#cluster"]');
    if(navLink){
      navLink.textContent='portfolio';
      navLink.setAttribute('aria-label','Abrir Sport Performance Portfolio');
    }
    var h1=cluster.querySelector('.spf-intro h1');
    if(h1)h1.innerHTML='<span>Sport</span><br>Performance<br>Portfolio';
    var eyebrow=cluster.querySelector('.spf-intro .spf-eyebrow');
    if(eyebrow)eyebrow.textContent='HUMAN PERFORMANCE SYSTEM // LIVE';
  }

  function applyMoment(cluster,key,seek){
    var moment=moments[key]||moments.training;
    var pulse=cluster.querySelector('.spf-motion-pulse');
    var label=cluster.querySelector('.spf-motion-label');
    var index=cluster.querySelector('.spf-motion-index');
    var stage=cluster.querySelector('.spf-stage-video');
    var node=cluster.querySelector('[data-spf-node="'+key+'"]');
    var code=node&&node.querySelector('span')?node.querySelector('span').textContent:'01';

    if(pulse){pulse.style.left=moment.x;pulse.style.top=moment.y;}
    if(label)label.textContent=moment.label;
    if(index)index.textContent='LIVE // '+code;

    cluster.classList.remove('spf-motion-reacting');
    void cluster.offsetWidth;
    cluster.classList.add('spf-motion-reacting');
    window.setTimeout(function(){cluster.classList.remove('spf-motion-reacting');},620);

    if(seek && stage){
      var go=function(){
        try{
          var max=isFinite(stage.duration)&&stage.duration>0?Math.max(.1,stage.duration-.15):moment.time;
          stage.currentTime=Math.min(moment.time,max);
          if(!reducedMotion){
            var p=stage.play();if(p&&p.catch)p.catch(function(){});
          }
        }catch(e){}
      };
      if(stage.readyState>=1)go();else stage.addEventListener('loadedmetadata',go,{once:true});
    }
  }

  function wireNodeReactions(cluster){
    var buttons=Array.from(cluster.querySelectorAll('[data-spf-node]'));
    buttons.forEach(function(btn){
      btn.addEventListener('click',function(){applyMoment(cluster,btn.dataset.spfNode,true);});
    });

    var grid=cluster.querySelector('.spf-node-grid');
    if(grid && window.MutationObserver){
      var last='training';
      var observer=new MutationObserver(function(){
        var active=grid.querySelector('[data-spf-node].active');
        if(active && active.dataset.spfNode!==last){
          last=active.dataset.spfNode;
          applyMoment(cluster,last,false);
        }
      });
      buttons.forEach(function(btn){observer.observe(btn,{attributes:true,attributeFilter:['class']});});
    }
    applyMoment(cluster,'training',false);
  }

  function loadApprovedPoster(cluster){
    return Promise.all(ART_PARTS.map(fetchText)).then(function(chunks){
      var blob=decodeBase64ToBlob(chunks.join(''),'image/webp');
      var objectUrl=URL.createObjectURL(blob);
      cluster.style.setProperty('--spf-approved-hero','url("'+objectUrl+'")');
      cluster.classList.add('spf-approved-poster-ready');
      return objectUrl;
    }).catch(function(err){
      console.warn('Approved poster fallback:',err);
      cluster.classList.add('spf-approved-poster-error');
      return null;
    });
  }

  function configureVideo(video,src,isModal){
    if(!video)return;
    video.src=src;
    video.preload=isModal?'metadata':'auto';
    video.playsInline=true;
    video.loop=!isModal;
    if(!isModal){
      video.muted=true;
      video.defaultMuted=true;
      video.volume=0;
      video.autoplay=!reducedMotion;
      video.removeAttribute('aria-hidden');
    }
    video.load();
  }

  function loadMotion(cluster){
    var stage=cluster.querySelector('.spf-stage-video');
    var modal=cluster.querySelector('.spf-video-overlay video');
    var status=cluster.querySelector('#spfVideoStatus');
    cluster.classList.add('spf-motion-loading');

    return Promise.all(MOTION_PARTS.map(fetchText)).then(function(chunks){
      var joined=chunks.join('').replace(/\s+/g,'');
      var blob=decodeBase64ToBlob(joined,'video/mp4');
      var objectUrl=URL.createObjectURL(blob);

      configureVideo(stage,objectUrl,false);
      configureVideo(modal,objectUrl,true);

      var ready=function(){
        cluster.classList.remove('spf-motion-loading','spf-motion-fallback');
        cluster.classList.add('spf-motion-ready','spf-stage-video-ready');
        if(status)status.textContent='VIDEO CLUSTER ONLINE';
        if(stage&&!reducedMotion){var p=stage.play();if(p&&p.catch)p.catch(function(){});}
      };
      if(stage && stage.readyState>=2)ready();
      else if(stage)stage.addEventListener('loadeddata',ready,{once:true});
      else ready();
      return objectUrl;
    }).catch(function(err){
      console.warn('Interactive video fallback:',err);
      cluster.classList.remove('spf-motion-loading');
      cluster.classList.add('spf-motion-fallback');
      if(status)status.textContent='VIDEO FALLBACK ONLINE';
      if(stage){
        configureVideo(stage,FALLBACK_VIDEO,false);
        var show=function(){cluster.classList.add('spf-stage-video-ready');if(!reducedMotion){var p=stage.play();if(p&&p.catch)p.catch(function(){});}};
        if(stage.readyState>=2)show();else stage.addEventListener('loadeddata',show,{once:true});
      }
      return null;
    });
  }

  var cluster=document.getElementById('cluster');
  if(!cluster)return;
  buildLiveLayout(cluster);
  setPortfolioIdentity(cluster);
  wireNodeReactions(cluster);
  cluster.classList.add('spf-approved-hero-ready');

  var posterReady=loadApprovedPoster(cluster);
  var motionReady=loadMotion(cluster);
  window.SP_APPROVED_HERO_READY=Promise.all([posterReady,motionReady]);
})();
