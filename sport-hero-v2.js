(function(){
  'use strict';
  var system=document.querySelector('.spf-system');
  var topbar=document.querySelector('.topbar');
  var nav=topbar&&topbar.querySelector('.nav');
  if(!system||!nav)return;

  nav.classList.add('spf-integrated-nav');
  var topline=system.querySelector('.spf-topline');
  system.insertBefore(nav,topline||system.firstChild);
  if(topbar.parentNode)topbar.parentNode.removeChild(topbar);

  var brandText=nav.querySelector('.brand > span:not(.brand-mark)');
  if(brandText)brandText.classList.add('spf-brand-text');
  var oldActions=nav.querySelector('.nav-actions');
  if(oldActions)oldActions.remove();
})();
