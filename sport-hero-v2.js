(function(){
  'use strict';

  var system=document.querySelector('.spf-system');
  var topbar=document.querySelector('.topbar');
  var nav=topbar&&topbar.querySelector('.nav');

  if(system&&nav){
    nav.classList.add('spf-integrated-nav');
    var topline=system.querySelector('.spf-topline');
    system.insertBefore(nav,topline||system.firstChild);
    if(topbar.parentNode)topbar.parentNode.removeChild(topbar);

    var brandText=nav.querySelector('.brand > span:not(.brand-mark)');
    if(brandText)brandText.classList.add('spf-brand-text');

    var oldActions=nav.querySelector('.nav-actions');
    if(oldActions)oldActions.remove();
  }

  document.querySelectorAll('.spf-video-card video,.spf-video-overlay video').forEach(function(video){
    try{video.pause();}catch(e){}
    video.removeAttribute('src');
    video.load();
  });

  document.querySelectorAll('.spf-video-card,.spf-video-overlay,.hero-video-card').forEach(function(el){el.remove();});

  var mediaPanel=document.querySelector('.spf-media');
  if(mediaPanel){
    mediaPanel.classList.add('spf-runtime-only');
    var head=mediaPanel.querySelector('.spf-panel-head');
    if(head)head.textContent='Runtime telemetry';
  }

  var consoleInput=document.querySelector('.spf-console-inputrow input');
  var consoleOutput=document.querySelector('.spf-console-output');
  if(consoleInput){
    consoleInput.addEventListener('keydown',function(event){
      if(event.key!=='Enter')return;
      if(consoleInput.value.trim().toLowerCase()!=='video')return;
      event.preventDefault();
      event.stopImmediatePropagation();
      consoleInput.value='';
      if(consoleOutput){
        var row=document.createElement('p');
        row.innerHTML='<span class="spf-term-accent">system:</span> media module disabled in this portfolio version.';
        consoleOutput.appendChild(row);
        consoleOutput.scrollTop=consoleOutput.scrollHeight;
      }
    },true);
  }
})();
