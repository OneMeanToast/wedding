(function(){
const sb=supabase.createClient(SB_URL,SB_KEY,{auth:{persistSession:false}});
const t=new URLSearchParams(location.search).get('t');const $=id=>document.getElementById(id);
const st=$('status');let H=null;
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function fail(m){st.textContent=m;st.className='msg err'}
if(!t){fail('This page needs your personal RSVP link. Please use the link from your invitation.');return}
sb.rpc('get_household',{p_token:t}).then(({data,error})=>{
 if(error||!data){fail("We couldn't find that invitation. Please check your link or contact Oona & Wes.");return}
 H=data;st.classList.add('hide');$('f').classList.remove('hide');$('hh').textContent=data.name.replace(/ household$/,' family');
 const g0=data.guests.find(g=>g.arrival_date||g.travel_mode)||{};
 $('arr').value=g0.arrival_date||'';$('dep').value=g0.departure_date||'';$('mode').value=g0.travel_mode||'';$('hotel').value=g0.hotel||'';$('tr').value=g0.needs_transport==null?'':String(g0.needs_transport);$('song').value=g0.song_request||'';
 $('people').innerHTML=data.guests.map((g,i)=>{const editable=g.is_placeholder||g.is_plus_one;return `<div class="panel" data-i="${i}">
 <h3>${editable?'Guest '+(i+1):esc(g.full_name)}${g.is_child?'<span class="tag">child</span>':''}${g.is_plus_one?'<span class="tag">plus-one</span>':''}</h3>
 ${editable?`<label>Name</label><input class="nm" value="${g.is_placeholder?'':esc(g.full_name)}" placeholder="Full name">`:''}
 <label>Will ${editable?'this guest':esc(g.full_name.split(' ')[0])} join us?</label>
 <div class="seg">${[['yes','Joyfully yes'],['no','Sadly no'],['maybe','Not sure yet']].map(([v,l])=>`<button type="button" data-v="${v}" class="${g.rsvp_status===v?'on':''}">${l}</button>`).join('')}</div>
 <div class="row"><div><label>Dietary preference</label><select class="diet">${['','No restrictions','Vegetarian','Vegan','Pescatarian','Gluten-free','Other'].map(o=>`<option ${g.diet===o?'selected':''} value="${o}">${o||'Choose…'}</option>`).join('')}</select></div>
 <div><label>Allergies</label><input class="all" value="${esc(g.allergies)}" placeholder="e.g. nuts, shellfish"></div></div>
 ${g.is_child?`<label>Child's meal</label><select class="meal">${['','Kids menu','Adult buffet','Not needed (baby)'].map(o=>`<option ${g.meal===o?'selected':''} value="${o}">${o||'Choose…'}</option>`).join('')}</select>`:''}
 </div>`}).join('');
 document.querySelectorAll('.seg').forEach(s=>s.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;s.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b))}));
});
$('f').addEventListener('submit',async e=>{e.preventDefault();
 const common={arrival_date:$('arr').value,departure_date:$('dep').value,travel_mode:$('mode').value,hotel:$('hotel').value,needs_transport:$('tr').value===''?null:$('tr').value==='true',song_request:$('song').value};
 const guests=[...document.querySelectorAll('#people .panel')].map(p=>{const g=H.guests[p.dataset.i];const on=p.querySelector('.seg .on');
  return Object.assign({id:g.id,rsvp_status:on?on.dataset.v:'pending',full_name:p.querySelector('.nm')?.value||'',diet:p.querySelector('.diet').value,allergies:p.querySelector('.all').value,meal:p.querySelector('.meal')?.value||null},common)});
 if(guests.every(g=>g.rsvp_status==='pending')){alert('Please let us know yes / no / not sure for at least one guest.');return}
 const btn=e.submitter;btn.disabled=true;btn.textContent='Sending…';
 const {data,error}=await sb.rpc('submit_rsvp',{p_token:t,p_payload:{guests,message:$('note').value}});
 btn.disabled=false;btn.textContent='Send RSVP';
 if(error){alert('Sorry, something went wrong. Please try again.');return}
 const yes=guests.filter(g=>g.rsvp_status==='yes').length;
 $('f').classList.add('hide');$('done').classList.remove('hide');$('donemsg').textContent=yes?`We can't wait to celebrate with you. ${yes} guest${yes>1?'s':''} confirmed.`:"We'll miss you, thank you for letting us know.";scrollTo(0,0);
});
})();
