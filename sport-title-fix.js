(function(){
  'use strict';

  var section=document.getElementById('cluster');
  if(!section)return;

  var navLink=document.querySelector('.menu a[href="#cluster"]');
  if(navLink){
    navLink.textContent='portfolio';
    navLink.setAttribute('aria-label','Abrir Sport Performance Portfolio');
  }

  var intro=section.querySelector('.spf-intro');
  var title=intro&&intro.querySelector('h1');
  var frame=section.querySelector('.spf-video-frame');
  if(!intro||!title||!frame)return;

  title.innerHTML='<span>Sport</span><br>Performance<br>Portfolio';
  title.setAttribute('aria-label','Sport Performance Portfolio');

  section.querySelectorAll('[aria-label]').forEach(function(el){
    var label=el.getAttribute('aria-label');
    if(label&&label.indexOf('Sport Performance Cluster')!==-1){
      el.setAttribute('aria-label',label.replace('Sport Performance Cluster','Sport Performance Portfolio'));
    }
  });

  var desktop=window.matchMedia('(min-width:1100px)');
  var introCopy=intro.querySelector('p');

  function syncTitlePosition(){
    if(desktop.matches){
      if(title.parentNode!==frame){
        title.classList.add('spf-video-title');
        frame.appendChild(title);
      }
    }else{
      if(title.parentNode!==intro){
        title.classList.remove('spf-video-title');
        if(introCopy)intro.insertBefore(title,introCopy);
        else intro.appendChild(title);
      }
    }
  }

  syncTitlePosition();
  if(desktop.addEventListener)desktop.addEventListener('change',syncTitlePosition);
  else if(desktop.addListener)desktop.addListener(syncTitlePosition);
})();
