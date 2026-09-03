(function(){
  'use strict';

  var parts=Array.from({length:8},function(_,i){return 'approved-hero/part-'+String(i+1).padStart(2,'0')+'.txt?v=2';});

  function decodeBase64ToBlob(base64,type){
    base64=base64.replace(/\s+/g,'');
    var binary=atob(base64),bytes=new Uint8Array(binary.length);
    for(var i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
    return new Blob([bytes],{type:type});
  }

  function openRoute(route){
    if(window.SP_OPEN_MODULE){window.SP_OPEN_MODULE(route);return;}
    location.hash='#'+route;
  }

  function buildApprovedLayer(cluster){
    var deck=cluster.querySelector('.spf-command-deck');
    if(!deck)return;

    if(!deck.querySelector('.spf-approved-artboard')){
      var art=document.createElement('div');
      art.className='spf-approved-artboard';
      art.setAttribute('aria-hidden','true');
      deck.prepend(art);
    }

    if(!deck.querySelector('.spf-approved-profile')){
      var profile=document.createElement('article');
      profile.className='spf-approved-profile';
      profile.innerHTML='<img src="Mi_imagen.png" alt="Ramón Alberto Curbalán Vega"><div><small>SPORT PERFORMANCE PROFILE</small><h3>RAMÓN ALBERTO CURBALÁN VEGA</h3><p>Entrenamiento · nutrición · psicología · gestión deportiva</p><div class="spf-approved-profile-actions"><button type="button" data-approved-route="sobre-mi">VER PERFIL</button><button type="button" data-approved-route="contacto">CONTACTO</button></div></div>';
      deck.appendChild(profile);
      profile.querySelectorAll('[data-approved-route]').forEach(function(btn){btn.addEventListener('click',function(){openRoute(btn.dataset.approvedRoute);});});
    }
  }

  var ready=Promise.all(parts.map(function(url){
    return fetch(url,{cache:'force-cache'}).then(function(r){if(!r.ok)throw new Error('Hero asset '+r.status);return r.text();});
  })).then(function(chunks){
    var blob=decodeBase64ToBlob(chunks.join(''),'image/webp');
    var objectUrl=URL.createObjectURL(blob);
    var cluster=document.getElementById('cluster');
    if(cluster){
      buildApprovedLayer(cluster);
      cluster.style.setProperty('--spf-approved-hero','url("'+objectUrl+'")');
      cluster.classList.add('spf-approved-hero-ready');
    }

    var navLink=document.querySelector('.menu a[href="#cluster"]');
    if(navLink){navLink.textContent='portfolio';navLink.setAttribute('aria-label','Abrir Sport Performance Portfolio');}

    var h1=document.querySelector('#cluster .spf-intro h1');
    if(h1)h1.innerHTML='<span>Sport</span><br>Performance<br>Portfolio';

    var video=document.querySelector('#cluster .spf-stage-video');
    if(video){video.pause();video.removeAttribute('autoplay');video.setAttribute('aria-hidden','true');}
    return objectUrl;
  }).catch(function(err){console.warn('Approved hero fallback:',err);var cluster=document.getElementById('cluster');if(cluster){cluster.classList.add('spf-approved-hero-ready');}return null;});

  window.SP_APPROVED_HERO_READY=ready;
})();
