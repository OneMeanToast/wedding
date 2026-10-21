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
  n.addEventListener('click',function(e){if(e.target.tagName==='A'){n.classList.remove('open');b.setAttribute('aria-expanded',false)}});
})();
// Updates from updates.json (newest first)
fetch('updates.json',{cache:'no-cache'}).then(function(r){return r.json()}).then(function(items){
  var ul=document.getElementById('updates-list');ul.innerHTML='';
  items.sort(function(a,b){return b.date.localeCompare(a.date)}).forEach(function(u){
    var li=document.createElement('li'),t=document.createElement('time'),h=document.createElement('h3'),p=document.createElement('p');
    t.dateTime=u.date;t.textContent=new Date(u.date+'T12:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});
    h.textContent=u.title;p.textContent=u.body;li.append(t,h,p);ul.appendChild(li);
  });
}).catch(function(){document.getElementById('updates-list').innerHTML='<li class="muted">Updates could not be loaded.</li>'});
