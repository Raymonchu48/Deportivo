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

  var desktop=window.matchMedia('(min-width:1100px)');
  var profile=document.createElement('div');
  profile.className='spf-video-profile';
  profile.setAttribute('aria-label','Resumen profesional');

  function moveIntoVideo(){
    if(profile.parentNode!==frame)frame.appendChild(profile);
    [eyebrow,copy,identity,actions].forEach(function(node){profile.appendChild(node);});
  }

  function restoreIntro(){
    if(eyebrow.parentNode===intro)return;
    var title=intro.querySelector('h1');
    intro.insertBefore(eyebrow,intro.firstChild);
    if(title&&title.parentNode===intro){
      intro.insertBefore(copy,title.nextSibling);
    }else{
      intro.appendChild(copy);
    }
    intro.appendChild(identity);
    intro.appendChild(actions);
    if(profile.parentNode)profile.parentNode.removeChild(profile);
  }

  function sync(){
    if(desktop.matches)moveIntoVideo();
    else restoreIntro();
  }

  sync();
  if(desktop.addEventListener)desktop.addEventListener('change',sync);
  else if(desktop.addListener)desktop.addListener(sync);
})();
