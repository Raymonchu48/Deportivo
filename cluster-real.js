(() => {
  'use strict';
  const modules = {
    profile:{code:'01',short:'PRF',side:'left',title:'Perfil profesional',intro:'Entrenamiento, nutrición, hábitos y gestión conectados en una misma arquitectura profesional.',items:['Más de 23 años de experiencia en actividad física y servicio','Entrenamiento personal y trabajo con grupos','Planificación, seguimiento y comunicación orientada a resultados'],actions:[['Descargar CV','CV_Deporte.pdf'],['Cartas de recomendación','Cartas_Recomendacion.pdf']]},
    method:{code:'02',short:'MTH',side:'right',title:'Metodología',intro:'Evaluar, planificar, ejecutar, medir y ajustar. El proceso se adapta a la persona y al contexto.',items:['Valoración inicial y objetivos concretos','Progresión medible y control de carga','Revisión periódica y ajustes basados en respuesta real'],actions:[['Carta profesional','Carta_presentacion_deportiva_profesional.pdf']]},
    experience:{code:'03',short:'EXP',side:'left',title:'Experiencia',intro:'Trabajo práctico con perfiles diversos, desde mejora física general hasta dirección y coordinación deportiva.',items:['Entrenamiento individual y colectivo','Adultos, tercera edad y actividad adaptada','Dirección de programas y servicios deportivos'],actions:[['Ver CV completo','CV_Deporte.pdf']]},
    skills:{code:'04',short:'SKL',side:'right',title:'Competencias',intro:'La técnica funciona mejor cuando se acompaña de liderazgo, comunicación y criterio profesional.',items:['Liderazgo y conducción de grupos','Empatía, escucha y comunicación','Organización, seguimiento y atención al detalle'],actions:[['Coaching deportivo','Master_coaching_ Psicologia_deportiva.pdf']]},
    specialties:{code:'05',short:'SPC',side:'left',title:'Especialidades',intro:'Capacidades aplicadas a fuerza, funcional, movilidad, actividades dirigidas, natación y nutrición.',items:['Entrenamiento funcional, fuerza y core','Pilates, cycling, movilidad y natación','Nutrición deportiva y hábitos saludables'],actions:[['Fitness y musculación','Monitor_ Musculacion_Fitnnes.pdf'],['Nutrición deportiva','Master_Nutrición.pdf']]},
    value:{code:'06',short:'VAL',side:'right',title:'Propuesta de valor',intro:'Un sistema integral que reduce ruido y convierte objetivos generales en decisiones concretas y sostenibles.',items:['Visión 360° del rendimiento','Programas ajustados a contexto y capacidad','Seguimiento sencillo, medible y comprensible'],actions:[['Propuesta profesional','Carta_presentacion_deportiva_profesional.pdf']]},
    impact:{code:'07',short:'IMP',side:'right',title:'Áreas de impacto',intro:'El objetivo es mejorar capacidad, bienestar y autonomía, no acumular sesiones sin dirección.',items:['Composición corporal y fuerza útil','Movilidad, postura y prevención','Bienestar, rendimiento y longevidad activa'],actions:[['Contactar','mailto:ramonalberto.curbalvega@gmail.com']]},
    management:{code:'08',short:'MGT',side:'left',title:'Gestión deportiva',intro:'Planificación de servicios, recursos y equipos con enfoque operativo y experiencia de usuario.',items:['Organización de actividades y espacios','Coordinación de equipos y recursos','Calidad de servicio y mejora continua'],actions:[['Gestión deportiva','Gestion_Entidades_deportivas.pdf']]}
  };

  const leftOrder=['profile','experience','specialties','management'];
  const rightOrder=['method','skills','value','impact'];
  const sequence=[...leftOrder,...rightOrder];
  let active='profile', autoTimer=null, lastFocus=null;

  const root=document.querySelector('[data-rc-root]');
  if(!root) return;
  const drawer=root.querySelector('.rc-drawer');
  const veil=root.querySelector('.rc-veil');
  const kicker=root.querySelector('[data-rc-kicker]');
  const title=root.querySelector('[data-rc-title]');
  const intro=root.querySelector('[data-rc-intro]');
  const details=root.querySelector('[data-rc-details]');
  const actions=root.querySelector('[data-rc-actions]');
  const coreTitle=root.querySelector('[data-rc-core-title]');
  const coreCopy=root.querySelector('[data-rc-core-copy]');
  const coreCode=root.querySelector('[data-rc-core-code]');
  const elapsed=root.querySelector('[data-rc-elapsed]');
  const viewport=root.querySelector('[data-rc-viewport]');
  const clock=root.querySelector('[data-rc-clock]');
  const start=performance.now();

  function moduleButton(key){return root.querySelector(`[data-rc-module="${key}"]`)}
  function setActive(key){
    const item=modules[key]; if(!item) return;
    active=key;
    root.querySelectorAll('[data-rc-module]').forEach(btn=>btn.classList.toggle('active',btn.dataset.rcModule===key));
    root.querySelectorAll('[data-rc-satellite]').forEach(node=>node.classList.toggle('active',node.dataset.rcSatellite===key));
    root.querySelectorAll('[data-rc-link]').forEach(link=>link.classList.toggle('active',link.dataset.rcLink===key));
    coreCode.textContent=`NODE ${item.code} // ${item.short}`;
    coreTitle.textContent=item.title;
    coreCopy.textContent=item.intro;
  }
  function openDrawer(key){
    const item=modules[key]; if(!item) return;
    setActive(key); lastFocus=document.activeElement;
    kicker.textContent=`${item.code} / ${item.short}`; title.textContent=item.title; intro.textContent=item.intro;
    details.innerHTML=item.items.map((x,i)=>`<div class="rc-detail"><b>${String(i+1).padStart(2,'0')}</b><span>${x}</span></div>`).join('');
    actions.innerHTML=item.actions.map((a,i)=>`<a class="${i?'secondary':''}" href="${a[1]}"${a[1].endsWith('.pdf')||a[1].startsWith('http')?' target="_blank" rel="noopener"':''}>${a[0]}</a>`).join('');
    drawer.classList.add('open'); veil.classList.add('on'); drawer.setAttribute('aria-hidden','false');
    root.querySelector('.rc-drawer-close').focus({preventScroll:true});
  }
  function closeDrawer(){drawer.classList.remove('open');veil.classList.remove('on');drawer.setAttribute('aria-hidden','true');if(lastFocus?.focus)lastFocus.focus({preventScroll:true})}
  function stopAuto(){if(autoTimer){clearInterval(autoTimer);autoTimer=null;}root.dataset.auto='off'}
  function startAuto(){if(autoTimer) return;root.dataset.auto='on';autoTimer=setInterval(()=>setActive(sequence[(sequence.indexOf(active)+1)%sequence.length]),2800)}

  root.querySelectorAll('[data-rc-module]').forEach(btn=>btn.addEventListener('click',()=>{stopAuto();openDrawer(btn.dataset.rcModule)}));
  root.querySelectorAll('[data-rc-satellite]').forEach(node=>node.addEventListener('click',()=>{stopAuto();openDrawer(node.dataset.rcSatellite)}));
  root.querySelector('.rc-drawer-close').addEventListener('click',closeDrawer); veil.addEventListener('click',closeDrawer);
  root.querySelector('[data-rc-auto]').addEventListener('click',()=>{autoTimer?stopAuto():startAuto()});

  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){closeDrawer();return}
    if(/INPUT|TEXTAREA/.test(e.target?.tagName||'')) return;
    const n=Number(e.key); if(n>=1&&n<=8){stopAuto();openDrawer(sequence[n-1]);return}
    if(e.key.toLowerCase()==='a'){autoTimer?stopAuto():startAuto()}
  });

  function updateTelemetry(){
    const total=Math.floor((performance.now()-start)/1000);
    elapsed.textContent=`${String(Math.floor(total/60)).padStart(2,'0')}:${String(total%60).padStart(2,'0')}`;
    viewport.textContent=`${innerWidth} × ${innerHeight}`;
    clock.textContent=new Date().toLocaleTimeString('es-ES',{hour12:false});
  }
  updateTelemetry(); setInterval(updateTelemetry,1000); addEventListener('resize',updateTelemetry,{passive:true});
  setActive(active);
})();
