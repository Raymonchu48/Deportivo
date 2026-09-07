(function(){
'use strict';
var cluster=document.querySelector('.ic-cluster');
var screen=document.getElementById('ic-screen');
var content=document.getElementById('ic-content');
var title=document.getElementById('ic-screen-title');
var closeButton=document.getElementById('ic-close');
var trigger=null;
var motion=window.matchMedia('(prefers-reduced-motion: reduce)');
var motionButton=document.getElementById('ic-motion');
var titles={'sobre-mi':'Sobre mí',metodo:'Mi método de trabajo',formacion:'Formación acreditada',proyectos:'Proyectos',experiencia:'Experiencia',contacto:'Contacto'};
var modules={
training:{title:'Entrenamiento',copy:'Planificación, fuerza, técnica, progresión y control de carga dentro de una visión integral.',sources:[['metodo','.method-grid'],['formacion','.cert:nth-child(1),.cert:nth-child(2)']]},
nutrition:{title:'Nutrición deportiva',copy:'Educación nutricional, hábitos y estrategia aplicada a salud, composición corporal, recuperación y rendimiento.',sources:[['formacion','.cert:nth-child(3),.cert:nth-child(4)'],['proyectos','.project-card:nth-child(2)']]},
mind:{title:'Psicología y mentalidad',copy:'Motivación, comunicación, adherencia y autoconocimiento para sostener el proceso deportivo.',sources:[['formacion','.cert:nth-child(5)'],['sobre-mi','.feature:nth-child(3)']]},
recovery:{title:'Recuperación',copy:'Movilidad, descanso y dosificación para proteger la continuidad y la capacidad funcional. La valoración, el seguimiento y los hábitos sostenibles forman parte del método de trabajo.',sources:[['metodo','.method-step:nth-child(1),.method-step:nth-child(4),.method-step:nth-child(5)'],['experiencia','.exp:nth-child(5)']]},
adapted:{title:'Deporte adaptado',copy:'Progresión ajustada a capacidades, autonomía, contexto y necesidades individuales. Experiencia en actividad física para tercera edad y colectivos especiales.',sources:[['experiencia','.exp:nth-child(3)'],['formacion','.cert:nth-child(9)']]},
management:{title:'Gestión deportiva',copy:'Organización de recursos, servicios, instalaciones y equipos con visión operativa y orientación a resultados.',sources:[['formacion','.cert:nth-child(6),.cert:nth-child(7),.cert:nth-child(8)'],['proyectos','.project-card:nth-child(1)']]}
};
function source(id){var t=document.getElementById('source-'+id);return t?t.content:null;}
function resetButtons(key){
document.querySelectorAll('[data-open]').forEach(function(b){var active=b.dataset.open===key;b.classList.toggle('is-active',active);if(b.tagName==='BUTTON')b.setAttribute('aria-expanded',String(active));});
}
function open(key,scroll){
if(!modules[key]&&!titles[key])return false;
content.replaceChildren();
var item=modules[key];
title.textContent=item?item.title:titles[key];
if(item){
var summary=document.createElement('p');summary.className='ic-summary';summary.textContent=item.copy;content.appendChild(summary);
var cards=document.createElement('div');cards.className='cert-grid';
item.sources.forEach(function(spec){var root=source(spec[0]);if(root)root.querySelectorAll(spec[1]).forEach(function(node){cards.appendChild(node.cloneNode(true));});});
content.appendChild(cards);
}else{var root=source(key);if(root)content.appendChild(root.cloneNode(true));}
if(window.vcSelectModule)window.vcSelectModule(key);
screen.hidden=false;cluster.classList.add('ic-screen-open');resetButtons(key);content.scrollTop=0;
title.focus({preventScroll:true});
if(scroll&&window.matchMedia('(max-width:900px)').matches)screen.scrollIntoView({behavior:motion.matches?'auto':'smooth',block:'nearest'});
return true;
}
function close(restore){
screen.hidden=true;content.replaceChildren();cluster.classList.remove('ic-screen-open');resetButtons('');
if(restore&&trigger&&document.contains(trigger))trigger.focus({preventScroll:true});
}
document.addEventListener('click',function(e){
var button=e.target.closest('[data-open]');
if(button){e.preventDefault();trigger=button;var key=button.dataset.open;if(open(key,true))history.pushState(null,'','#'+key);return;}
if(e.target.closest('.ic-brand')){e.preventDefault();close(false);history.pushState(null,'','#inicio');window.scrollTo({top:0,behavior:motion.matches?'auto':'smooth'});}
});
closeButton.addEventListener('click',function(){close(true);history.pushState(null,'','#inicio');});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!screen.hidden){close(true);history.pushState(null,'','#inicio');}});
function route(){var key=location.hash.slice(1);if(!open(key,false))close(false);}
window.addEventListener('popstate',route);
window.addEventListener('hashchange',route);
window.icOpen=open;
route();
})();
(function(){
'use strict';
var cluster=document.querySelector('.ic-cluster'),video=document.getElementById('vc-video');
var play=document.getElementById('ic-motion'),progress=document.getElementById('vc-progress'),status=document.getElementById('vc-status'),hotspot=document.getElementById('vc-hotspot');
var reduced=matchMedia('(prefers-reduced-motion: reduce)'),intent=!reduced.matches,visible=true,pending=null,current=-1;
// Boundaries correspond to the actual edits in the supplied ten-second film.
var stages=[
 {start:0,label:'Visión integral',route:'training',action:'Explorar entrenamiento',x:28,y:53},
 {start:2,label:'Valoración',route:'metodo',action:'Conocer mi método',x:40,y:66},
 {start:3,label:'Equipo',route:'mind',action:'Mentalidad y equipo',x:51,y:59},
 {start:5,label:'Adaptación',route:'adapted',action:'Deporte adaptado',x:55,y:63},
 {start:7,label:'Seguimiento',route:'management',action:'Gestión y seguimiento',x:38,y:59},
 {start:9,label:'Visión global',route:'sobre-mi',action:'Conocer mi perfil',x:47,y:57}
];
var routes={'sobre-mi':9,training:0,nutrition:2,mind:3,recovery:5,adapted:5,management:7,metodo:2,formacion:2,proyectos:7,experiencia:3,contacto:9};
var nav=document.getElementById('vc-stages');
stages.forEach(function(s,i){var b=document.createElement('button');b.type='button';b.textContent=String(i+1).padStart(2,'0')+' '+s.label;b.dataset.stage=i;b.addEventListener('click',function(){seek(s.start);});nav.appendChild(b);});
function sync(){
 var t=video.currentTime||0,i=0;stages.forEach(function(s,n){if(t>=s.start)i=n;});
 progress.value=t;document.getElementById('vc-time').textContent='0:'+String(Math.floor(t)).padStart(2,'0')+' / 0:10';
 if(i===current)return;current=i;var s=stages[i];
 const stageLabel=document.getElementById('vc-stage-label');if(stageLabel)stageLabel.textContent=String(i+1).padStart(2,'0')+' · '+s.label;
 nav.querySelectorAll('button').forEach(function(b,n){b.setAttribute('aria-current',n===i?'step':'false');});
 hotspot.dataset.open=s.route;hotspot.textContent=s.action+' ↗';hotspot.style.left=s.x+'%';hotspot.style.top=s.y+'%';
 document.querySelectorAll('.ic-modules [data-open]').forEach(function(b){b.classList.toggle('is-cued',b.dataset.open===s.route);});
}
function seek(t){if(video.readyState<1){pending=t;return;}video.currentTime=Math.min(t,Math.max(0,video.duration-.05));sync();}
function reflect(){var playing=!video.paused;play.textContent=playing?'Pausar vídeo':'Reproducir vídeo';play.setAttribute('aria-pressed',String(playing));cluster.classList.toggle('ic-still',!playing);}
function apply(){if(intent&&visible&&!document.hidden){video.play().catch(function(){status.textContent='Pulsa Reproducir vídeo para comenzar.';reflect();});}else video.pause();reflect();}
window.vcSelectModule=function(key){if(routes[key]!==undefined)seek(routes[key]);intent=false;apply();};
play.addEventListener('click',function(){intent=video.paused;if(video.error)video.load();apply();});
progress.addEventListener('input',function(){seek(Number(progress.value));});
document.getElementById('vc-prev').addEventListener('click',function(){seek(stages[(current+stages.length-1)%stages.length].start);});
document.getElementById('vc-next').addEventListener('click',function(){seek(stages[(current+1)%stages.length].start);});
video.addEventListener('loadedmetadata',function(){progress.max=video.duration;if(pending!==null){seek(pending);pending=null;}});
video.addEventListener('loadeddata',function(){status.textContent='Selecciona una etapa o un módulo para explorar.';apply();});
video.addEventListener('timeupdate',sync);video.addEventListener('seeked',sync);video.addEventListener('play',reflect);video.addEventListener('pause',reflect);
video.addEventListener('error',function(){status.textContent='No se ha podido cargar el vídeo. Puedes seguir abriendo todos los módulos.';reflect();});
document.addEventListener('visibilitychange',apply);
if('IntersectionObserver' in window)new IntersectionObserver(function(entries){visible=entries[0].isIntersecting;apply();},{threshold:.1}).observe(cluster);
reduced.addEventListener('change',function(e){intent=!e.matches;apply();});
var full=document.getElementById('vc-full');
if(!cluster.requestFullscreen)full.hidden=true;
full.addEventListener('click',function(){var p=document.fullscreenElement?document.exitFullscreen():cluster.requestFullscreen();if(p&&p.catch)p.catch(function(){status.textContent='No se puede ampliar en este navegador.';});});
document.addEventListener('fullscreenchange',function(){full.textContent=document.fullscreenElement?'Reducir':'Ampliar';});
sync();reflect();var key=location.hash.slice(1);if(routes[key]!==undefined)window.vcSelectModule(key);
})();
