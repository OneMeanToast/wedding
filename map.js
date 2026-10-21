(function(){
  function init(){
    if(!window.L){return setTimeout(init,100)}
    var map=L.map('leaflet',{scrollWheelZoom:false,zoomControl:false}).setView([49.9778,7.9198],14);
    L.control.zoom({position:'bottomright'}).addTo(map);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:19,className:'muted-tiles'}).addTo(map);
    var glyph={venue:'<path d="M8 21V12a6 6 0 0 1 12 0v9" fill="none" stroke="#fff" stroke-width="1.6"/><path d="M6 21h16" stroke="#fff" stroke-width="1.6"/>',
      ferry:'<path d="M6 17h16l-2.5 4h-11z" fill="#fff"/><path d="M10 17v-5h8v5M14 8v4" stroke="#fff" stroke-width="1.5" fill="none"/>',
      hotels:'<path d="M7 20v-7h14v7M7 16h14M10 13v-2h4v2" stroke="#fff" stroke-width="1.5" fill="none"/>',
      sights:'<path d="M14 7l2 4.5 4.8.4-3.7 3.1 1.2 4.7L14 17.2 9.7 19.7l1.2-4.7-3.7-3.1 4.8-.4z" fill="#fff"/>',
      transport:'<rect x="9" y="8" width="10" height="11" rx="2" fill="none" stroke="#fff" stroke-width="1.5"/><path d="M9 14h10M11 21l1-2M17 21l-1-2" stroke="#fff" stroke-width="1.5"/>'};
    function icon(cat,color){
      var svg='<svg xmlns="http://www.w3.org/2000/svg" width="34" height="44" viewBox="0 0 28 36"><path d="M14 35C14 35 2 22 2 13a12 12 0 0 1 24 0c0 9-12 22-12 22z" fill="'+color+'" stroke="#f4efe6" stroke-width="1.5"/>'+(glyph[cat]||'')+'</svg>';
      return L.divIcon({className:'pin',html:svg,iconSize:[34,44],iconAnchor:[17,43],popupAnchor:[0,-38]});
    }
    function esc(t){var d=document.createElement('div');d.textContent=t==null?'':t;return d.innerHTML}
    fetch('map/places.json',{cache:'no-cache'}).then(function(r){return r.json()}).then(function(data){
      var cats=data.categories,layers={},bounds=[];
      Object.keys(cats).forEach(function(k){layers[k]=L.layerGroup().addTo(map)});
      data.places.forEach(function(p){
        var c=cats[p.category]||{color:'#6b5a4a',label:p.category};
        if(!layers[p.category])layers[p.category]=L.layerGroup().addTo(map);
        var stars=p.rating?'<div class="pp-rating">★ '+esc(p.rating)+'</div>':'';
        var link=p.url?'<a href="'+encodeURI(p.url)+'" target="_blank" rel="noopener">Website →</a>':'';
        L.marker([p.lat,p.lng],{icon:icon(p.category,c.color),title:p.name}).bindPopup(
          '<div class="pp"><span class="pp-cat" style="color:'+c.color+'">'+esc(c.label)+'</span><h4>'+esc(p.name)+'</h4><p>'+esc(p.blurb)+'</p>'+stars+link+'</div>').addTo(layers[p.category]);
        bounds.push([p.lat,p.lng]);
      });
      map.setView([49.9787,7.912],14);
      var chips=document.getElementById('map-chips');
      Object.keys(cats).forEach(function(k){
        var b=document.createElement('button');b.className='chip on';b.type='button';b.setAttribute('aria-pressed','true');
        b.innerHTML='<i style="background:'+cats[k].color+'"></i>'+esc(cats[k].label);
        b.onclick=function(){var on=b.classList.toggle('on');b.setAttribute('aria-pressed',on);on?layers[k].addTo(map):map.removeLayer(layers[k])};
        chips.appendChild(b);
      });
    });
  }
  init();
})();
