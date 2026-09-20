(() => {
  'use strict';
  const modules = {
    profile:{code:'01',short:'PRF',title:'Perfil profesional',intro:'Entrenamiento, nutrición, hábitos y gestión conectados dentro de un mismo sistema profesional.',items:['Más de 23 años de experiencia en actividad física y servicio','Entrenamiento personal y trabajo con grupos','Planificación, seguimiento y comunicación orientada a resultados'],actions:[['Descargar CV','CV_Deporte.pdf'],['Cartas de recomendación','Cartas_Recomendacion.pdf']]},
    method:{code:'02',short:'MTH',title:'Metodología',intro:'Evaluar, planificar, ejecutar, medir y ajustar. El proceso se adapta a la persona y al contexto.',items:['Valoración inicial y objetivos concretos','Progresión medible y control de carga','Revisión periódica y ajustes según respuesta real'],actions:[['Carta profesional','Carta_presentacion_deportiva_profesional.pdf']]},
    experience:{code:'03',short:'EXP',title:'Experiencia',intro:'Trabajo práctico con perfiles diversos, desde mejora física general hasta dirección y coordinación deportiva.',items:['Entrenamiento individual y colectivo','Adultos, tercera edad y actividad adaptada','Dirección de programas y servicios deportivos'],actions:[['Ver CV completo','CV_Deporte.pdf']]},
    specialties:{code:'04',short:'SPC',title:'Especialidades',intro:'Fuerza, funcional, movilidad, actividades dirigidas, natación y nutrición aplicadas a objetivos reales.',items:['Entrenamiento funcional, fuerza y core','Pilates, cycling, movilidad y natación','Nutrición deportiva y hábitos saludables'],actions:[['Fitness y musculación','Monitor_ Musculacion_Fitnnes.pdf'],['Nutrición deportiva','Master_Nutrición.pdf']]},
    value:{code:'05',short:'VAL',title:'Propuesta de valor',intro:'Un sistema integral que convierte objetivos generales en decisiones concretas, medibles y sostenibles.',items:['Visión 360° del rendimiento','Programas ajustados a contexto y capacidad','Seguimiento sencillo, comprensible y medible'],actions:[['Propuesta profesional','Carta_presentacion_deportiva_profesional.pdf']]},
    impact:{code:'06',short:'IMP',title:'Contacto',intro:'Un punto de entrada directo para proyectos deportivos, colaboración profesional y nuevas oportunidades.',items:['Proyectos de entrenamiento y bienestar','Dirección y gestión deportiva','Colaboraciones, asesoramiento y desarrollo de servicios'],actions:[['Contactar','mailto:ramonalberto.curbalvega@gmail.com']]},
    skills:{code:'07',short:'SKL',title:'Competencias',intro:'La técnica se potencia con liderazgo, comunicación, criterio profesional y capacidad de adaptación.',items:['Liderazgo y conducción de grupos','Empatía, escucha y comunicación','Organización, seguimiento y atención al detalle'],actions:[['Coaching deportivo','Master_coaching_ Psicologia_deportiva.pdf']]},
    management:{code:'08',short:'MGT',title:'Gestión deportiva',intro:'Planificación de servicios, recursos y equipos con enfoque operativo y experiencia de usuario.',items:['Organización de actividades y espacios','Coordinación de equipos y recursos','Calidad de servicio y mejora continua'],actions:[['Gestión deportiva','Gestion_Entidades_deportivas.pdf']]}
  };
  const sequence=['profile','method','experience','specialties','value','impact','skills','management'];
  const root=document.querySelector('[data-fusion-root]'); if(!root) return;
  const drawer=root.querySelector('[data-drawer]'), veil=root.querySelector('[data-veil]');
  const stage=root.querySelector('[data-stage]');
  const stageCode=root.querySelector('[data-stage-code]'), stageTitle=root.querySelector('[data-stage-title]'), stageCopy=root.querySelector('[data-stage-copy]');
  const kicker=root.querySelector('[data-kicker]'), title=root.querySelector('[data-title]'), intro=root.querySelector('[data-intro]'), details=root.querySelector('[data-details]'), actions=root.querySelector('[data-actions]');
  const coach=root.querySelector('[data-coach-video]'), swim=root.querySelector('[data-swim-video]');
  const start=performance.now(); let active='profile', autoTimer=null, lastFocus=null;

  function setActive(key){
    const item=modules[key]; if(!item) return; active=key; root.dataset.active=key;
    root.querySelectorAll('[data-module]').forEach(el=>el.classList.toggle('active',el.dataset.module===key));
    stageCode.textContent=`${item.code} / ${item.short}`; stageTitle.textContent=item.title; stageCopy.textContent=item.intro;
  }
  function openDrawer(key){
    const item=modules[key]; if(!item) return; stopAuto(); setActive(key); lastFocus=document.activeElement;
    kicker.textContent=`${item.code} / ${item.short}`; title.textContent=item.title; intro.textContent=item.intro;
    details.innerHTML=item.items.map((x,i)=>`<div class="drawer-detail"><b>${String(i+1).padStart(2,'0')}</b><span>${x}</span></div>`).join('');
    actions.innerHTML=item.actions.map((a,i)=>`<a class="${i?'secondary':''}" href="${a[1]}"${a[1].endsWith('.pdf')?' target="_blank" rel="noopener"':''}>${a[0]}</a>`).join('');
    drawer.classList.add('open'); veil.classList.add('on'); drawer.setAttribute('aria-hidden','false'); root.querySelector('[data-close]').focus({preventScroll:true});
  }
  function closeDrawer(){drawer.classList.remove('open');veil.classList.remove('on');drawer.setAttribute('aria-hidden','true');if(lastFocus?.focus)lastFocus.focus({preventScroll:true})}
  function startAuto(){if(autoTimer)return;root.dataset.auto='on';root.querySelector('[data-mode]').textContent='AUTO';autoTimer=setInterval(()=>setActive(sequence[(sequence.indexOf(active)+1)%sequence.length]),2600)}
  function stopAuto(){if(autoTimer){clearInterval(autoTimer);autoTimer=null}root.dataset.auto='off';root.querySelector('[data-mode]').textContent='MANUAL'}
  function tryPlay(video){if(!video)return;const p=video.play();if(p?.catch)p.catch(()=>{})}
  function syncVideos(){if(!coach||!swim)return;if(Math.abs((coach.currentTime||0)-(swim.currentTime||0))>.35) swim.currentTime=coach.currentTime||0;tryPlay(coach);tryPlay(swim)}

  root.querySelectorAll('[data-module]').forEach(el=>el.addEventListener('click',()=>openDrawer(el.dataset.module)));
  root.querySelector('[data-close]').addEventListener('click',closeDrawer); veil.addEventListener('click',closeDrawer);
  root.querySelector('[data-auto]').addEventListener('click',()=>autoTimer?stopAuto():startAuto());
  coach?.addEventListener('play',syncVideos); coach?.addEventListener('seeked',syncVideos);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){coach?.pause();swim?.pause()}else{tryPlay(coach);tryPlay(swim)}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeDrawer();return}if(/INPUT|TEXTAREA/.test(e.target?.tagName||''))return;const n=Number(e.key);if(n>=1&&n<=8){openDrawer(sequence[n-1]);return}if(e.key.toLowerCase()==='a'){autoTimer?stopAuto():startAuto()}});

  if(matchMedia('(pointer:fine)').matches && stage){
    stage.addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;stage.style.setProperty('--mx',`${x*7}px`);stage.style.setProperty('--my',`${y*4}px`);const zone=root.querySelector('.coach-zone');if(zone)zone.style.transform=`translateX(calc(-50% + ${x*7}px)) translateY(${y*3}px)`});
    stage.addEventListener('pointerleave',()=>{const zone=root.querySelector('.coach-zone');if(zone)zone.style.transform='translateX(-50%)'});
  }
  function telemetry(){const s=Math.floor((performance.now()-start)/1000);root.querySelector('[data-elapsed]').textContent=`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;root.querySelector('[data-viewport]').textContent=`${innerWidth} × ${innerHeight}`;root.querySelector('[data-clock]').textContent=new Date().toLocaleTimeString('es-ES',{hour12:false})}
  telemetry();setInterval(telemetry,1000);addEventListener('resize',telemetry,{passive:true});setActive(active);setTimeout(syncVideos,450);
})();
