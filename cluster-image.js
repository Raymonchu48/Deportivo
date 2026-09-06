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
if(scroll&&window.matchMedia('(max-width:760px)').matches)screen.scrollIntoView({behavior:motion.matches?'auto':'smooth',block:'nearest'});
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