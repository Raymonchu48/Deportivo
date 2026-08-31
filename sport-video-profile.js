(function(){
  'use strict';

  var section=document.getElementById('cluster');
  if(!section)return;

  var intro=section.querySelector('.spf-intro');
  var frame=section.querySelector('.spf-video-frame');
  if(!intro||!frame)return;

  var eyebrow=intro.querySelector('.spf-eyebrow');
  var copy=null;
  for(var i=0;i<intro.children.length;i++){
    if(intro.children[i].tagName==='P'){copy=intro.children[i];break;}
  }
  var identity=intro.querySelector('.spf-identity');
  var actions=intro.querySelector('.spf-intro-actions');
  if(!eyebrow||!copy||!identity||!actions)return;

  var profile=document.createElement('div');
  profile.className='spf-video-profile';
  profile.setAttribute('aria-label','Resumen profesional');

  /* El resumen profesional forma parte del hero en todos los breakpoints. */
  if(profile.parentNode!==frame)frame.appendChild(profile);
  [eyebrow,copy,identity,actions].forEach(function(node){profile.appendChild(node);});
})();
