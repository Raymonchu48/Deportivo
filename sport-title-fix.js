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
  title.classList.add('spf-video-title');

  section.querySelectorAll('[aria-label]').forEach(function(el){
    var label=el.getAttribute('aria-label');
    if(label&&label.indexOf('Sport Performance Cluster')!==-1){
      el.setAttribute('aria-label',label.replace('Sport Performance Cluster','Sport Performance Portfolio'));
    }
  });

  /* El mismo título vive dentro del hero en escritorio, tablet y móvil. */
  if(title.parentNode!==frame)frame.appendChild(title);
})();
