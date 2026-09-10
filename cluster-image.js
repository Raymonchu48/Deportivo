(function(){
'use strict';
var cluster=document.querySelector('.ic-cluster');
var screen=document.getElementById('ic-screen');
var content=document.getElementById('ic-content');
var title=document.getElementById('ic-screen-title');
var closeButton=document.getElementById('ic-close');
var trigger=null;
var motion=window.matchMedia('(prefers-reduced-motion: reduce)');
var mobileViewport=window.matchMedia('(max-width:900px), (pointer:coarse)');
var motionVideo=document.querySelector('.ic-motion-video');
var videoResumeAfterScreen=false;
var cueTimes={training:.30,adapted:4.20,management:6.60,recovery:10.20,mind:12.70,nutrition:16.60};
var omittedVideoRanges=[[3.90,6.30],[13.90,16.40]];
var skipWatchStarted=false;
function allowClusterVideo(){return !document.hidden&&(mobileViewport.matches||!motion.matches);}
function sanitizeVideoTime(t){
for(var i=0;i<omittedVideoRanges.length;i++){var range=omittedVideoRanges[i];if(t>=range[0]&&t<range[1])return range[1]+.02;}
return t;
}
function skipOmittedVideoRange(){
if(!motionVideo)return false;
var safe=sanitizeVideoTime(motionVideo.currentTime);
if(safe!==motionVideo.currentTime){try{motionVideo.currentTime=safe;}catch(e){}return true;}
return false;
}
function watchOmittedFrames(){
if(!motionVideo)return;
skipOmittedVideoRange();
if(typeof motionVideo.requestVideoFrameCallback==='function')motionVideo.requestVideoFrameCallback(watchOmittedFrames);else window.requestAnimationFrame(watchOmittedFrames);
}
function startSkipWatch(){if(skipWatchStarted||!motionVideo)return;skipWatchStarted=true;watchOmittedFrames();}
function reflectVideoCue(){
if(!motionVideo||!screen.hidden)return;
var t=motionVideo.currentTime;var key=t>=16.40?'nutrition':t>=12.70?'mind':t>=10.00?'recovery':t>=6.30?'management':t>=3.90?'adapted':'training';
document.querySelectorAll('.ic-modules button[data-open]').forEach(function(b){var active=b.dataset.open===key;b.classList.toggle('is-active',active);if(active)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
}

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
document.querySelectorAll('[data-open]').forEach(function(b){var active=b.dataset.open===key;b.classList.toggle('is-active',active);if(b.tagName==='BUTTON')b.setAttribute('aria-expanded',String(active));if(b.closest('.ic-modules')){if(active)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');}});
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
if(motionVideo){videoResumeAfterScreen=allowClusterVideo();if(cueTimes[key]!==undefined){try{motionVideo.currentTime=sanitizeVideoTime(cueTimes[key]);}catch(e){}}motionVideo.pause();}
screen.hidden=false;cluster.classList.add('ic-screen-open');resetButtons(key);content.scrollTop=0;
title.focus({preventScroll:true});
if(scroll&&window.matchMedia('(max-width:900px)').matches)screen.scrollIntoView({behavior:motion.matches?'auto':'smooth',block:'nearest'});
return true;
}
function close(restore){
screen.hidden=true;content.replaceChildren();cluster.classList.remove('ic-screen-open');resetButtons('');
if(motionVideo&&videoResumeAfterScreen&&allowClusterVideo()){skipOmittedVideoRange();var resume=motionVideo.play();if(resume&&typeof resume.catch==='function')resume.catch(function(){});}videoResumeAfterScreen=false;reflectVideoCue();
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
if(motionVideo){
motionVideo.muted=true;
motionVideo.defaultMuted=true;
motionVideo.playsInline=true;
motionVideo.setAttribute('muted','');
motionVideo.setAttribute('playsinline','');
var syncMotion=function(){
if(!allowClusterVideo()||!screen.hidden){if(document.hidden||(!mobileViewport.matches&&motion.matches))motionVideo.pause();return;}
skipOmittedVideoRange();
motionVideo.muted=true;motionVideo.defaultMuted=true;
var play=motionVideo.play();
if(play&&typeof play.then==='function')play.then(function(){motionVideo.classList.add('is-ready');startSkipWatch();}).catch(function(){motionVideo.classList.add('needs-user-play');});
};
var kickMobilePlayback=function(){
if(!mobileViewport.matches||!screen.hidden||document.hidden)return;
skipOmittedVideoRange();
motionVideo.muted=true;motionVideo.defaultMuted=true;
var p=motionVideo.play();if(p&&typeof p.catch==='function')p.catch(function(){});
};
var syncCueAndSkip=function(){if(!skipOmittedVideoRange())reflectVideoCue();};
motionVideo.addEventListener('loadedmetadata',syncMotion);
motionVideo.addEventListener('loadeddata',syncMotion);
motionVideo.addEventListener('canplay',function(){motionVideo.classList.add('is-ready');syncMotion();reflectVideoCue();});
motionVideo.addEventListener('playing',function(){motionVideo.classList.add('is-ready');motionVideo.classList.remove('needs-user-play');startSkipWatch();});
motionVideo.addEventListener('timeupdate',syncCueAndSkip);
motionVideo.addEventListener('seeked',syncCueAndSkip);
document.addEventListener('visibilitychange',syncMotion);
window.addEventListener('pageshow',function(){setTimeout(syncMotion,60);});
window.addEventListener('orientationchange',function(){setTimeout(syncMotion,300);});
document.addEventListener('touchstart',kickMobilePlayback,{passive:true,capture:true});
document.addEventListener('pointerdown',kickMobilePlayback,{passive:true,capture:true});
if(typeof motion.addEventListener==='function')motion.addEventListener('change',syncMotion);
if(typeof mobileViewport.addEventListener==='function')mobileViewport.addEventListener('change',syncMotion);
if(motionVideo.readyState>=2){motionVideo.classList.add('is-ready');syncMotion();}
}
route();
})();
