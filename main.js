/* ==========================================================================
   SITE CONFIG — fill these in when the details are ready.
   Empty strings show a "coming soon" placeholder on the site.
   ========================================================================== */
var RSVP_URL = 'https://forms.gle/JcXzVapjL1VgZuBfA';        // Google Forms link, e.g. 'https://forms.gle/...'
var GIFT_IBAN = '';       // Oona Karls, euro account, e.g. 'FI00 0000 0000 0000 00'
var GIFT_USD = '';        // Weston Karls, how to send dollars (e.g. 'Zelle: ...')
/* ======================================================================== */

// Language: ?lang=fi|en > saved choice > English
(function(){
  var META={
    en:{title:'Oona & Wes · 24 July 2027 · Rüdesheim am Rhein',
        desc:'Wedding celebration of Oona & Wes, Saturday 24 July 2027, VILLArue 1891, Rüdesheim am Rhein, Germany.'},
    fi:{title:'Oona & Wes · 24.7.2027 · Rüdesheim am Rhein',
        desc:'Oona ja Wes juhlivat häitään lauantaina 24.7.2027 Rüdesheim am Rheinissa Reininlaaksossa. Täältä löydätte aikataulun, majoitusvinkit ja ilmoittautumisen.'}
  };
  function setLang(l,save){
    l=(l==='fi')?'fi':'en';
    document.documentElement.lang=l;
    document.title=META[l].title;
    var m=document.querySelector('meta[name=description]');if(m)m.content=META[l].desc;
    document.querySelectorAll('[data-set-lang]').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.setLang===l)});
    document.querySelectorAll('img[data-alt-'+l+']').forEach(function(i){i.alt=i.getAttribute('data-alt-'+l)});
    if(save){try{localStorage.setItem('lang',l)}catch(e){}
      try{var u=new URL(location.href);if(u.searchParams.has('lang')){u.searchParams.set('lang',l);history.replaceState(null,'',u)}}catch(e){}}
    document.dispatchEvent(new CustomEvent('langchange',{detail:l}));
  }
  var q=null;try{q=new URLSearchParams(location.search).get('lang')}catch(e){}
  var saved=null;try{saved=localStorage.getItem('lang')}catch(e){}
  if(q==='fi'||q==='en'){setLang(q,true)}else{setLang(saved,false)}
  document.querySelectorAll('[data-set-lang]').forEach(function(b){b.addEventListener('click',function(){setLang(b.dataset.setLang,true)})});
  window.siteLang=function(){return document.documentElement.lang==='fi'?'fi':'en'};
})();

// Fill config placeholders (RSVP link, gift details)
(function(){
  function fill(key,val){if(!val)return;document.querySelectorAll('[data-fill="'+key+'"]').forEach(function(e){e.textContent=val;e.classList.remove('placeholder')})}
  fill('iban',GIFT_IBAN);fill('usd',GIFT_USD);
  if(RSVP_URL){
    document.querySelectorAll('.rsvp-link').forEach(function(a){a.href=RSVP_URL});
    document.querySelectorAll('.rsvp-open').forEach(function(e){e.hidden=false});
    document.querySelectorAll('.rsvp-soon').forEach(function(e){e.hidden=true});
  }else{document.querySelectorAll('.rsvp-link').forEach(function(x){x.removeAttribute('target')})}
})();

// Countdown to 24 July 2027, 14:00 Berlin time (CEST, UTC+2)
(function(){
  var target=new Date('2027-07-24T14:00:00+02:00').getTime();
  var el=document.getElementById('countdown');
  function tick(){
    var d=Math.max(0,target-Date.now()),s=Math.floor(d/1000);
    var v={d:Math.floor(s/86400),h:Math.floor(s%86400/3600),m:Math.floor(s%3600/60),s:s%60};
    el.querySelectorAll('b').forEach(function(b){b.textContent=v[b.dataset.k]});
  }
  tick();setInterval(tick,1000);
})();

// Mobile menu
(function(){
  var b=document.querySelector('.menu'),n=document.getElementById('links');
  b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
  n.addEventListener('click',function(e){if(e.target.closest('a')){n.classList.remove('open');b.setAttribute('aria-expanded',false)}});
})();

// Links to a FAQ group open the question in the current language
document.addEventListener('click',function(e){
  var a=e.target.closest('a[href^="#faq-"]');if(!a)return;
  var g=document.querySelector(a.getAttribute('href'));if(!g)return;
  var d=g.querySelector('details[lang="'+window.siteLang()+'"]');if(d)d.open=true;
});

// Updates from updates.json (newest first). title/body may be {en,fi} or a plain string.
(function(){
  var items=null,ul=document.getElementById('updates-list');
  function pick(v,l){return (v&&typeof v==='object')?(v[l]||v.en||''):(v||'')}
  function render(){
    if(!items)return;var l=window.siteLang();ul.innerHTML='';
    items.slice().sort(function(a,b){return b.date.localeCompare(a.date)}).forEach(function(u){
      var li=document.createElement('li'),t=document.createElement('time'),h=document.createElement('h3'),p=document.createElement('p');
      t.dateTime=u.date;t.textContent=new Date(u.date+'T12:00:00').toLocaleDateString(l==='fi'?'fi-FI':'en-GB',{day:'numeric',month:'long',year:'numeric'});
      h.textContent=pick(u.title,l);p.textContent=pick(u.body,l);li.append(t,h,p);ul.appendChild(li);
    });
  }
  document.addEventListener('langchange',render);
  fetch('updates.json',{cache:'no-cache'}).then(function(r){return r.json()}).then(function(d){items=d;render()})
  .catch(function(){ul.innerHTML='<li class="muted"><span lang="en">Updates could not be loaded.</span><span lang="fi">Uutisia ei saatu ladattua.</span></li>'});
})();
