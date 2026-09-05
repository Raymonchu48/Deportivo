(function(){
  'use strict';

  var cluster=document.getElementById('cluster');
  if(!cluster)return;

  var reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var desktopHQ=window.matchMedia('(min-width:1181px)').matches;
  var DESKTOP_HQ='cluster-desktop-hd.mp4?v=1';
  var MOTION_PARTS=Array.from({length:9},function(_,i){
    return 'cluster-motion/part-'+String(i+1).padStart(2,'0')+'.txt?v=3';
  });

  var moments={
    training:{time:.7,x:'18%',y:'67%',label:'ENTRENAMIENTO // MOVIMIENTO'},
    nutrition:{time:2.2,x:'38%',y:'30%',label:'NUTRICIÓN // ENERGÍA'},
    mind:{time:3.8,x:'52%',y:'25%',label:'PSICOLOGÍA // FOCO'},
    recovery:{time:5.4,x:'66%',y:'61%',label:'RECUPERACIÓN // CONTINUIDAD'},
    adapted:{time:7.0,x:'78%',y:'63%',label:'ADAPTADA // AUTONOMÍA'},
    management:{time:8.6,x:'50%',y:'75%',label:'GESTIÓN // SISTEMA'}
  };
  var order=['training','nutrition','mind','recovery','adapted','management'];
  var objectUrl=null;

  function fetchText(url){
    return fetch(url,{cache:'force-cache'}).then(function(r){
      if(!r.ok)throw new Error(url+' '+r.status);
      return r.text();
    });
  }

  function chunksToBlob(chunks,type){
    var parts=chunks.map(function(chunk){
      var clean=chunk.replace(/\s+/g,'');
      if(!clean || clean.length%4!==0)throw new Error('Fragmento Base64 inválido');
      var binary=atob(clean);
      var bytes=new Uint8Array(binary.length);
      for(var i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
      return bytes;
    });
    return new Blob(parts,{type:type});
  }

  function openRoute(route){
    if(window.SP_OPEN_MODULE){window.SP_OPEN_MODULE(route);return;}
    location.hash='#'+route;
  }

  function setIdentity(){
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

  function buildProfile(deck){
    var old=deck.querySelector('.spf-approved-profile');
    if(old)old.remove();
    var profile=document.createElement('article');
    profile.className='spf-approved-profile';
    profile.innerHTML='<img src="Mi_imagen.png" alt="Ramón Alberto Curbalán Vega"><div><small>SPORT PERFORMANCE PROFILE</small><h3>RAMÓN ALBERTO CURBALÁN VEGA</h3><p>Entrenamiento · nutrición · psicología · gestión deportiva</p><div class="spf-approved-profile-actions"><button type="button" data-v3-route="sobre-mi">VER PERFIL</button><button type="button" data-v3-route="contacto">CONTACTO</button></div></div>';
    deck.appendChild(profile);
    profile.querySelectorAll('[data-v3-route]').forEach(function(btn){
      btn.addEventListener('click',function(){openRoute(btn.dataset.v3Route);});
    });
  }

  function buildVideoHud(frame){
    frame.querySelectorAll('.spf-motion-hud,.spf-v3-hotspots').forEach(function(el){el.remove();});

    var hud=document.createElement('div');
    hud.className='spf-motion-hud';
    hud.setAttribute('aria-hidden','true');
    hud.innerHTML='<span class="spf-motion-pulse"></span><span class="spf-motion-label">ENTRENAMIENTO // MOVIMIENTO</span><span class="spf-motion-index">LIVE // 01</span>';
    frame.appendChild(hud);

    var hotspots=document.createElement('div');
    hotspots.className='spf-v3-hotspots';
    hotspots.setAttribute('aria-label','Control interactivo del vídeo');
    hotspots.innerHTML=order.map(function(key,i){return '<button type="button" data-v3-hotspot="'+key+'" aria-label="Activar '+key+'">0'+(i+1)+'</button>';}).join('');
    frame.appendChild(hotspots);

    hotspots.querySelectorAll('[data-v3-hotspot]').forEach(function(btn){
      btn.addEventListener('click',function(){
        var node=cluster.querySelector('[data-spf-node="'+btn.dataset.v3Hotspot+'"]');
        if(node)node.click();
      });
    });
  }

  function markActive(key){
    cluster.querySelectorAll('[data-v3-hotspot]').forEach(function(btn){
      btn.classList.toggle('active',btn.dataset.v3Hotspot===key);
    });
  }

  function seekTo(key,shouldSeek){
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
    markActive(key);

    cluster.classList.remove('spf-motion-reacting');
    void cluster.offsetWidth;
    cluster.classList.add('spf-motion-reacting');
    setTimeout(function(){cluster.classList.remove('spf-motion-reacting');},600);

    if(shouldSeek && stage){
      var go=function(){
        try{
          var max=isFinite(stage.duration)&&stage.duration>0?Math.max(.1,stage.duration-.12):moment.time;
          stage.currentTime=Math.min(moment.time,max);
          if(!reducedMotion){
            var p=stage.play();
            if(p&&p.catch)p.catch(function(){});
          }
        }catch(e){}
      };
      if(stage.readyState>=1)go();
      else stage.addEventListener('loadedmetadata',go,{once:true});
    }
  }

  function wireNodes(){
    var buttons=Array.from(cluster.querySelectorAll('[data-spf-node]'));
    buttons.forEach(function(btn){
      btn.addEventListener('click',function(){seekTo(btn.dataset.spfNode,true);});
    });

    if(window.MutationObserver){
      var last='training';
      var observer=new MutationObserver(function(){
        var active=cluster.querySelector('[data-spf-node].active');
        if(active && active.dataset.spfNode!==last){
          last=active.dataset.spfNode;
          seekTo(last,true);
        }
      });
      buttons.forEach(function(btn){observer.observe(btn,{attributes:true,attributeFilter:['class']});});
    }
    seekTo('training',false);
  }

  function configureVideo(video,src,isModal){
    if(!video)return;
    video.removeAttribute('poster');
    video.src=src;
    video.preload=isModal?'metadata':'auto';
    video.playsInline=true;
    video.loop=!isModal;
    if(!isModal){
      video.muted=true;
      video.defaultMuted=true;
      video.volume=0;
      video.autoplay=!reducedMotion;
      video.setAttribute('aria-label','Vídeo multi-deporte interactivo del Sport Performance Portfolio');
    }
    video.load();
  }

  function markReady(stage,status,label,src){
    return new Promise(function(resolve,reject){
      if(!stage){resolve(src);return;}
      var settled=false;
      var cleanup=function(){
        stage.removeEventListener('loadeddata',done);
        stage.removeEventListener('error',fail);
      };
      var done=function(){
        if(settled)return;settled=true;cleanup();
        cluster.classList.remove('spf-motion-loading','spf-motion-error');
        cluster.classList.add('spf-motion-ready','spf-stage-video-ready');
        if(status)status.textContent=label;
        if(!reducedMotion){
          var p=stage.play();
          if(p&&p.catch)p.catch(function(){});
        }
        resolve(src);
      };
      var fail=function(){
        if(settled)return;settled=true;cleanup();
        reject(new Error('No se pudo decodificar '+src));
      };
      if(stage.readyState>=2)done();
      else{
        stage.addEventListener('loadeddata',done);
        stage.addEventListener('error',fail);
      }
    });
  }

  function loadMotionParts(stage,modal,status){
    return Promise.all(MOTION_PARTS.map(fetchText)).then(function(chunks){
      var blob=chunksToBlob(chunks,'video/mp4');
      objectUrl=URL.createObjectURL(blob);
      configureVideo(stage,objectUrl,false);
      configureVideo(modal,objectUrl,true);
      return markReady(stage,status,'VIDEO CLUSTER MULTISPORT ONLINE',objectUrl);
    });
  }

  function loadMotion(){
    var stage=cluster.querySelector('.spf-stage-video');
    var modal=cluster.querySelector('.spf-video-overlay video');
    var status=cluster.querySelector('#spfVideoStatus');
    if(stage)stage.removeAttribute('poster');
    if(modal)modal.removeAttribute('poster');
    if(status)status.textContent=desktopHQ?'VIDEO CLUSTER HD LOADING':'VIDEO CLUSTER LOADING';
    cluster.classList.add('spf-motion-loading');

    if(desktopHQ){
      configureVideo(stage,DESKTOP_HQ,false);
      configureVideo(modal,DESKTOP_HQ,true);
      return markReady(stage,status,'VIDEO CLUSTER HD ONLINE',DESKTOP_HQ).catch(function(err){
        console.warn('Desktop HD fallback:',err);
        cluster.classList.remove('spf-motion-ready','spf-stage-video-ready');
        cluster.classList.add('spf-motion-loading');
        return loadMotionParts(stage,modal,status);
      });
    }

    return loadMotionParts(stage,modal,status).catch(function(err){
      console.warn('Sport Cluster v3:',err);
      cluster.classList.remove('spf-motion-loading');
      cluster.classList.add('spf-motion-error');
      if(status)status.textContent='VIDEO CLUSTER ERROR';
      throw err;
    });
  }

  function init(){
    var deck=cluster.querySelector('.spf-command-deck');
    var frame=cluster.querySelector('.spf-video-frame');
    if(!deck||!frame)return Promise.reject(new Error('Estructura del cluster no disponible'));

    cluster.classList.add('spf-cluster-v3');
    setIdentity();
    buildProfile(deck);
    buildVideoHud(frame);
    wireNodes();

    var openBtn=cluster.querySelector('[data-spf-video-open]');
    if(openBtn)openBtn.hidden=true;

    return loadMotion();
  }

  window.SP_CLUSTER_V3_READY=init();
  window.SP_APPROVED_HERO_READY=window.SP_CLUSTER_V3_READY;

  window.addEventListener('beforeunload',function(){
    if(objectUrl)URL.revokeObjectURL(objectUrl);
  });
})();
