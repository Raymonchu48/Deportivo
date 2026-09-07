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
function setMotion(enabled){cluster.classList.toggle('ic-still',!enabled);motionButton.setAttribute('aria-pressed',String(enabled));motionButton.textContent=enabled?'Animación activada':'Animación pausada';}
setMotion(!motion.matches);
motionButton.addEventListener('click',function(){setMotion(motionButton.getAttribute('aria-pressed')!=='true');});
motion.addEventListener('change',function(e){setMotion(!e.matches);});
route();
})();

(function(){
'use strict';
var cluster=document.querySelector('.ic-cluster');
var art=document.querySelector('.ic-art');
var intro=document.querySelector('.ic-intro');
if(!cluster||!art)return;

/* Reconstruct the approved final artwork from lightweight text assets. */
var parts=[];
for(var i=1;i<=8;i++)parts.push('cluster-final-0'+i+'.txt?v=3');
Promise.all(parts.map(function(url){return fetch(url,{cache:'force-cache'}).then(function(r){if(!r.ok)throw new Error('asset '+url);return r.text();});}))
.then(function(chunks){
  art.src='data:image/webp;base64,'+chunks.join('').replace(/\s+/g,'');
  art.width=768;
  art.height=432;
  art.dataset.finalCluster='true';
})
.catch(function(){/* cluster-base.webp remains as fallback */});

/* Use the real uploaded portrait in the lower-left profile card. */
if(intro&&!intro.querySelector('.ic-profile-photo')){
  var portrait=document.createElement('img');
  portrait.className='ic-profile-photo';
  portrait.src='Mi_imagen.png';
  portrait.alt='';
  portrait.loading='eager';
  portrait.decoding='async';
  intro.appendChild(portrait);
}

var style=document.createElement('style');
style.id='ic-final-layout';
style.textContent='\
@media (min-width:901px){\
.ic-cluster{aspect-ratio:16/9!important;}\
.ic-art{object-fit:fill!important;}\
.ic-credentials,.ic-bottom{display:none!important;}\
.ic-intro{left:4.55%!important;top:auto!important;bottom:6.7%!important;width:22.2%!important;height:28.7%!important;padding:0!important;background:transparent!important;border:0!important;box-shadow:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;text-shadow:none!important;z-index:3!important;}\
.ic-intro .ic-eyebrow,.ic-intro h1,.ic-intro>p:not(.ic-eyebrow){position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip-path:inset(50%)!important;white-space:nowrap!important;border:0!important;}\
.ic-profile-photo{position:absolute!important;left:5.2%!important;top:7.5%!important;width:25.5%!important;height:39%!important;object-fit:cover!important;object-position:center 19%!important;display:block!important;z-index:2!important;border:1px solid rgba(120,231,255,.9)!important;clip-path:polygon(10% 0,90% 0,100% 10%,100% 90%,90% 100%,10% 100%,0 90%,0 10%)!important;filter:saturate(.92) contrast(1.03)!important;box-shadow:0 0 12px rgba(73,210,250,.35)!important;}\
.ic-action{position:absolute!important;left:5.3%!important;bottom:5.8%!important;width:54%!important;height:16%!important;min-height:38px!important;padding:0!important;color:transparent!important;background:transparent!important;border-color:transparent!important;box-shadow:none!important;text-shadow:none!important;z-index:4!important;}\
.ic-action span{color:transparent!important;text-shadow:none!important;}\
.ic-action:hover,.ic-action:focus-visible{border-color:#8be6fb!important;box-shadow:0 0 15px rgba(103,221,243,.48)!important;background:rgba(25,132,166,.08)!important;}\
.ic-modules{top:10.1%!important;right:1.7%!important;width:18.3%!important;max-width:none!important;padding:0!important;}\
.ic-modules .ic-eyebrow{position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;clip-path:inset(50%)!important;}\
.ic-modules button{min-height:0!important;height:6.8vh!important;max-height:64px!important;margin:0 0 .45vh!important;padding:4px 8px!important;background:rgba(2,14,25,.12)!important;backdrop-filter:blur(1px)!important;-webkit-backdrop-filter:blur(1px)!important;}\
.ic-modules strong{font-size:clamp(11px,.9vw,15px)!important;}\
.ic-modules small{font-size:clamp(9px,.69vw,12px)!important;margin-top:1px!important;}\
.ic-num{font-size:10px!important;}\
.ic-nav{min-height:6.4%!important;padding:8px 24px!important;background:rgba(2,9,18,.88)!important;}\
.ic-screen{top:24%!important;left:29%!important;right:22%!important;bottom:5%!important;}\
}\
@media (max-width:900px){\
.ic-art{aspect-ratio:16/9!important;height:auto!important;object-fit:contain!important;}\
.ic-profile-photo{display:none!important;}\
}\
';
document.head.appendChild(style);
})();