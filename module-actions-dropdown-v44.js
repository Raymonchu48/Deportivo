(function(){
'use strict';

var stage=document.querySelector('.ic-stage');
var nav=document.getElementById('ic-modules');
if(!stage||!nav)return;

var finePointer=window.matchMedia('(hover:hover) and (pointer:fine)');
var buttons=[].slice.call(nav.querySelectorAll('button[data-open]'));
if(!buttons.length)return;

var labels={
  training:{title:'Entrenamiento',items:['Plan de cargas','Sesiones de fuerza','Resumen semanal']},
  nutrition:{title:'Nutrición',items:['Balance nutricional','Macros','Recetas','Hidratación']},
  mind:{title:'Psicología',items:['Foco y adherencia','Gestión del estrés','Motivación y objetivos']},
  recovery:{title:'Recuperación',items:['Descanso y movilidad','Sueño','Estiramientos']},
  management:{title:'Gestión',items:['Planificación y control','Objetivos','Seguimiento']}
};

var flyout=document.createElement('section');
flyout.className='ic-module-flyout';
flyout.hidden=true;
flyout.setAttribute('aria-live','polite');
stage.appendChild(flyout);

var currentButton=null;
var pinned=false;
var closeTimer=0;

function clearTimer(){if(closeTimer){clearTimeout(closeTimer);closeTimer=0;}}

function build(key){
  var data=labels[key];
  if(!data)return;
  flyout.dataset.module=key;
  flyout.replaceChildren();

  var h=document.createElement('h3');
  h.textContent=data.title;
  flyout.appendChild(h);

  var ul=document.createElement('ul');
  data.items.forEach(function(label){
    var li=document.createElement('li');
    var action=document.createElement('button');
    action.type='button';
    action.dataset.moduleAction=key;
    action.textContent=label;
    li.appendChild(action);
    ul.appendChild(li);
  });
  flyout.appendChild(ul);

  var full=document.createElement('button');
  full.type='button';
  full.className='ic-flyout-open';
  full.dataset.moduleAction=key;
  full.textContent='Ver módulo completo';
  flyout.appendChild(full);
}

function position(){
  if(!currentButton||flyout.hidden)return;

  var sr=stage.getBoundingClientRect();
  var br=currentButton.getBoundingClientRect();
  var mobile=window.matchMedia('(max-width:900px)').matches;
  var width;
  var left;

  if(mobile){
    width=Math.min(sr.width*.86,360);
    left=Math.max(8,(sr.width-width)/2);
  }else{
    width=Math.max(176,Math.min(br.width,260));
    left=br.left-sr.left+(br.width-width)/2;
    left=Math.max(8,Math.min(left,sr.width-width-8));
  }

  flyout.style.width=Math.round(width)+'px';
  flyout.style.left=Math.round(left)+'px';

  var h=flyout.offsetHeight||120;
  var top=br.top-sr.top-h-9;
  top=Math.max(8,top);
  flyout.style.top=Math.round(top)+'px';

  var cardCenter=br.left-sr.left+br.width/2;
  var notch=cardCenter-left;
  notch=Math.max(18,Math.min(notch,width-18));
  flyout.style.setProperty('--notch-x',Math.round(notch)+'px');
}

function show(btn,shouldPin){
  var key=btn&&btn.dataset.open;
  if(!labels[key])return;
  clearTimer();

  if(currentButton&&currentButton!==btn){
    currentButton.classList.remove('ic-menu-active');
    currentButton.setAttribute('aria-expanded','false');
  }

  currentButton=btn;
  pinned=!!shouldPin;
  build(key);
  flyout.hidden=false;
  requestAnimationFrame(function(){
    position();
    flyout.classList.add('is-open');
  });
  btn.classList.add('ic-menu-active');
  btn.setAttribute('aria-expanded','true');
}

function hide(immediate){
  clearTimer();
  pinned=false;
  if(currentButton){
    currentButton.classList.remove('ic-menu-active');
    currentButton.setAttribute('aria-expanded','false');
  }
  currentButton=null;
  flyout.classList.remove('is-open');
  if(immediate){flyout.hidden=true;return;}
  window.setTimeout(function(){if(!flyout.classList.contains('is-open'))flyout.hidden=true;},190);
}

function scheduleHide(){
  clearTimer();
  if(pinned)return;
  closeTimer=window.setTimeout(function(){hide(false);},150);
}

buttons.forEach(function(btn){
  btn.addEventListener('pointerenter',function(){if(finePointer.matches)show(btn,false);});
  btn.addEventListener('pointerleave',function(){if(finePointer.matches)scheduleHide();});
  btn.addEventListener('focus',function(){show(btn,false);});
});

flyout.addEventListener('pointerenter',clearTimer);
flyout.addEventListener('pointerleave',scheduleHide);

/* Captura el clic antes que cluster-image.js para que el primer clic despliegue el menú,
   no la pantalla completa. */
document.addEventListener('click',function(e){
  var action=e.target.closest('.ic-module-flyout [data-module-action]');
  if(action){
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    var key=action.dataset.moduleAction;
    hide(true);
    if(window.icOpen){
      window.icOpen(key,true);
      try{history.pushState(null,'','#'+key);}catch(err){}
    }
    return;
  }

  var btn=e.target.closest('#ic-modules button[data-open]');
  if(btn){
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    if(currentButton===btn&&pinned){hide(false);}else{show(btn,true);}
    return;
  }

  if(pinned&&!e.target.closest('.ic-module-flyout'))hide(false);
},true);

flyout.addEventListener('keydown',function(e){
  if(e.key==='Escape'){
    e.preventDefault();
    var restore=currentButton;
    hide(false);
    if(restore)restore.focus({preventScroll:true});
  }
});

window.addEventListener('resize',function(){if(!flyout.hidden)position();},{passive:true});
window.addEventListener('orientationchange',function(){window.setTimeout(function(){if(!flyout.hidden)position();},260);});

})();
