(function(){
'use strict';

function init(){
  var nav=document.querySelector('.ic-top-actions');
  if(!nav)return;
  var buttons=Array.from(nav.querySelectorAll(':scope > button[data-open]'));
  if(!buttons.length)return;

  var panelData={
    'sobre-mi':{
      id:'ic-quick-profile',kind:'profile',label:'Perfil profesional',html:
        '<div class="ic-quick-head"><b>01 / Identidad</b><small>Perfil</small></div>'+ 
        '<div class="ic-quick-body">'+
          '<div class="ic-mini-profile">'+
            '<img src="Mi_imagen.png" alt="Ramón A. C. Vega">'+
            '<div><h3>Ramón A. C. Vega</h3><p>Coach · Sport Performance · Mallorca</p>'+ 
              '<div class="ic-mini-tags"><i>Entrenamiento</i><i>Nutrición</i><i>Psicología</i><i>Gestión</i></div>'+ 
            '</div>'+ 
          '</div>'+ 
          '<div class="ic-quick-list" style="margin-top:9px"><button class="ic-quick-action" type="button" data-ic-open="sobre-mi"><span>Ver perfil completo</span><em>ABRIR →</em></button></div>'+ 
        '</div>'
    },
    'contacto':{
      id:'ic-quick-contact',kind:'contact',label:'Hablemos',html:
        '<div class="ic-quick-head"><b>02 / Conexión</b><small>Contacto</small></div>'+ 
        '<div class="ic-quick-body"><div class="ic-quick-list">'+
          '<a class="ic-quick-link" href="mailto:ramonalberto.curbalvega@gmail.com?subject=Consulta%20profesional%20deportiva"><span>Consulta profesional</span><em>EMAIL</em></a>'+ 
          '<a class="ic-quick-link" href="mailto:ramonalberto.curbalvega@gmail.com"><span>Mensaje directo</span><em>ENVIAR</em></a>'+ 
          '<a class="ic-quick-link" href="https://www.linkedin.com/in/ramon-alberto-vega-976084417" target="_blank" rel="noopener"><span>LinkedIn</span><em>PERFIL ↗</em></a>'+ 
          '<button class="ic-quick-action" type="button" data-ic-open="contacto"><span>Ver contacto completo</span><em>ABRIR →</em></button>'+ 
        '</div></div>'
    },
    'cv':{
      id:'ic-quick-cv',kind:'cv',label:'Currículum deportivo',html:
        '<div class="ic-quick-head"><b>04 / Documento</b><small>CV</small></div>'+ 
        '<div class="ic-quick-body">'+
          '<div class="ic-doc-ready">Documento preparado</div>'+ 
          '<div class="ic-quick-list">'+
            '<a class="ic-quick-link" href="CV_Deporte.pdf" download><span>Descargar CV</span><em>PDF ↓</em></a>'+ 
            '<a class="ic-quick-link" href="CV_Deporte.pdf" target="_blank" rel="noopener"><span>Ver formato completo</span><em>ABRIR ↗</em></a>'+ 
            '<button class="ic-quick-action" type="button" data-ic-open="cv"><span>Ver dentro del clúster</span><em>VISOR →</em></button>'+ 
          '</div>'+ 
        '</div>'
    },
    'recommendation':{
      id:'ic-quick-recommendation',kind:'recommendation',label:'Carta de recomendación',html:
        '<div class="ic-quick-head"><b>05 / Referencias</b><small>Documento</small></div>'+ 
        '<div class="ic-quick-body">'+
          '<div class="ic-doc-preview"><iframe title="Vista previa de cartas de recomendación" loading="lazy" src="Cartas_Recomendacion.pdf#page=1&toolbar=0&navpanes=0&scrollbar=0&view=FitH"></iframe></div>'+ 
          '<div class="ic-quick-list">'+
            '<a class="ic-quick-link" href="Cartas_Recomendacion.pdf" target="_blank" rel="noopener"><span>Ver documento</span><em>ABRIR ↗</em></a>'+ 
            '<a class="ic-quick-link" href="Cartas_Recomendacion.pdf" download><span>Descargar</span><em>PDF ↓</em></a>'+ 
            '<button class="ic-quick-action" type="button" data-ic-open="recommendation"><span>Ver dentro del clúster</span><em>VISOR →</em></button>'+ 
          '</div>'+ 
        '</div>'
    }
  };

  var panels={};
  Object.keys(panelData).forEach(function(key){
    var data=panelData[key];
    var panel=document.createElement('section');
    panel.className='ic-quick-panel';
    panel.id=data.id;
    panel.dataset.kind=data.kind;
    panel.dataset.panelFor=key;
    panel.setAttribute('role','dialog');
    panel.setAttribute('aria-label',data.label);
    panel.setAttribute('aria-hidden','true');
    panel.innerHTML=data.html;
    nav.appendChild(panel);
    panels[key]=panel;
  });

  buttons.forEach(function(button){
    var key=button.dataset.open;
    var panel=panels[key];
    if(!panel)return;
    button.setAttribute('aria-haspopup','dialog');
    button.setAttribute('aria-controls',panel.id);
    button.setAttribute('aria-expanded','false');
  });

  var activeButton=null;
  var activePanel=null;
  var closeTimer=null;
  var hoverMode=window.matchMedia('(hover:hover) and (pointer:fine)');

  function clearTimer(){if(closeTimer){clearTimeout(closeTimer);closeTimer=null;}}

  function positionPanel(button,panel){
    if(window.matchMedia('(max-width:900px), (orientation:portrait)').matches){
      panel.style.removeProperty('--panel-left');
      return;
    }
    var nr=nav.getBoundingClientRect();
    var br=button.getBoundingClientRect();
    var desired=parseFloat(getComputedStyle(panel).getPropertyValue('--panel-width'))||Math.max(br.width,240);
    var width=Math.max(br.width,desired);
    var left=br.left-nr.left;
    if(left+width>nr.width)left=Math.max(0,nr.width-width);
    panel.style.setProperty('--panel-left',left+'px');
    panel.style.setProperty('--panel-width',width+'px');
  }

  function closePanel(){
    clearTimer();
    if(activePanel){activePanel.classList.remove('is-open');activePanel.setAttribute('aria-hidden','true');}
    if(activeButton){activeButton.classList.remove('panel-active');activeButton.setAttribute('aria-expanded','false');}
    activePanel=null;activeButton=null;
  }

  function openPanel(button){
    var key=button.dataset.open;
    var panel=panels[key];
    if(!panel)return;
    clearTimer();
    if(activeButton&&activeButton!==button)closePanel();
    positionPanel(button,panel);
    activeButton=button;activePanel=panel;
    button.classList.add('panel-active');
    button.setAttribute('aria-expanded','true');
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden','false');
  }

  function scheduleClose(){
    clearTimer();
    closeTimer=setTimeout(function(){
      if(activePanel&&!activePanel.matches(':hover')&&activeButton&&!activeButton.matches(':hover'))closePanel();
    },220);
  }

  /* Captura los botones superiores antes del manejador general del clúster. */
  document.addEventListener('click',function(e){
    var topButton=e.target.closest('.ic-top-actions > button[data-open]');
    if(topButton){
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      if(activeButton===topButton)closePanel();else openPanel(topButton);
      return;
    }

    var openFull=e.target.closest('[data-ic-open]');
    if(openFull&&nav.contains(openFull)){
      e.preventDefault();
      e.stopPropagation();
      var key=openFull.getAttribute('data-ic-open');
      closePanel();
      if(typeof window.icOpen==='function'){
        window.icOpen(key,true);
        try{history.pushState(null,'','#'+key);}catch(err){}
      }
      return;
    }

    if(activePanel&&!e.target.closest('.ic-quick-panel'))closePanel();
  },true);

  buttons.forEach(function(button){
    button.addEventListener('pointerenter',function(){if(hoverMode.matches)openPanel(button);});
    button.addEventListener('pointerleave',function(){if(hoverMode.matches)scheduleClose();});
    button.addEventListener('focus',function(){openPanel(button);});
  });

  Object.keys(panels).forEach(function(key){
    var panel=panels[key];
    panel.addEventListener('pointerenter',clearTimer);
    panel.addEventListener('pointerleave',function(){if(hoverMode.matches)scheduleClose();});
  });

  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&activePanel){e.preventDefault();var restore=activeButton;closePanel();if(restore)restore.focus({preventScroll:true});}
  });

  window.addEventListener('resize',function(){if(activeButton&&activePanel)positionPanel(activeButton,activePanel);});
  window.addEventListener('orientationchange',function(){setTimeout(function(){if(activeButton&&activePanel)positionPanel(activeButton,activePanel);},250);});
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
