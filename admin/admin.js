(function(){
const sb=supabase.createClient(SB_URL,SB_KEY);const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const BASE=location.origin+location.pathname.replace(/admin\/.*$/,'');let HH=[],G=[];
const show=id=>['login','denied','app'].forEach(x=>$(x).classList.toggle('hide',x!==id));
async function boot(){const {data:{session}}=await sb.auth.getSession();
 if(!session){show('login');$('out').classList.add('hide');return}
 $('out').classList.remove('hide');
 const {data:ok}=await sb.rpc('am_i_admin');if(!ok){show('denied');return}
 show('app');load()}
const redirect=location.origin+location.pathname;
$('ml').onclick=async()=>{const {error}=await sb.auth.signInWithOtp({email:$('em').value.trim(),options:{emailRedirectTo:redirect,shouldCreateUser:true}});$('lmsg').textContent=error?error.message:'Check your inbox for the sign-in link.'};
$('gg').onclick=()=>sb.auth.signInWithOAuth({provider:'google',options:{redirectTo:redirect}});
$('out').onclick=async e=>{e.preventDefault();await sb.auth.signOut();boot()};
sb.auth.onAuthStateChange((ev)=>{if(ev==='SIGNED_IN'){history.replaceState(null,'',redirect);boot()}});
async function load(){const [h,g,r]=await Promise.all([sb.from('households').select('*').order('name'),sb.from('guests').select('*'),sb.from('rsvp_responses').select('household_id,message,submitted_at').order('submitted_at',{ascending:false})]);
 HH=h.data||[];G=g.data||[];const hm=Object.fromEntries(HH.map(x=>[x.id,x]));G.forEach(x=>x._h=hm[x.household_id]);
 G.sort((a,b)=>(a._h?.name||'').localeCompare(b._h?.name||'')||a.full_name.localeCompare(b.full_name));
 const cs=[...new Set(G.map(x=>x.country).filter(Boolean))].sort();$('fc').innerHTML='<option value="">All countries</option>'+cs.map(c=>`<option>${esc(c)}</option>`).join('');
 $('msgs').innerHTML=(r.data||[]).filter(m=>m.message).map(m=>`<p><b>${esc(hm[m.household_id]?.name)}</b> <span class="small">${new Date(m.submitted_at).toLocaleString()}</span><br>${esc(m.message)}</p>`).join('')||'<p class="small">No messages yet.</p>';
 render()}
const cnt=f=>G.filter(f).length;
function render(){
 $('stats').innerHTML=[['Invited',G.length],['Households',HH.length],['Yes',cnt(g=>g.rsvp_status==='yes')],['No',cnt(g=>g.rsvp_status==='no')],['Maybe',cnt(g=>g.rsvp_status==='maybe')],['Pending',cnt(g=>g.rsvp_status==='pending')],['Kids',cnt(g=>g.is_child)],['Placeholders',cnt(g=>g.is_placeholder)]].map(([l,v])=>`<div><b>${v}</b>${l}</div>`).join('');
 const q=$('q').value.toLowerCase(),fs=$('fs').value,fc=$('fc').value,ff=$('ff').value;
 const rows=G.filter(g=>(!q||[g.full_name,g._h?.name,g.notes,g.hotel].join(' ').toLowerCase().includes(q))&&(!fs||g.rsvp_status===fs)&&(!fc||g.country===fc)&&(!ff||(ff==='ph'&&g.is_placeholder)||(ff==='child'&&g.is_child)||(ff==='diet'&&(g.diet&&g.diet!=='No restrictions'||g.allergies))));
 const ed=(g,k)=>`<td contenteditable data-id="${g.id}" data-k="${k}">${esc(g[k])}</td>`;
 $('tb').innerHTML=rows.map(g=>`<tr><td>${esc(g._h?.name)}<br><button class="btn sm" data-copy="${g.household_id}">Copy link</button> <button class="btn sm" data-addg="${g.household_id}">+ guest</button></td>${ed(g,'full_name').replace('</td>',(g.is_child?'<span class="tag">child</span>':'')+(g.is_placeholder?'<span class="tag">placeholder</span>':'')+'</td>')}
 <td><select data-id="${g.id}" data-k="rsvp_status">${['pending','yes','no','maybe'].map(s=>`<option ${g.rsvp_status===s?'selected':''}>${s}</option>`).join('')}</select></td>${['country','diet','allergies','arrival_date','departure_date','travel_mode','hotel','notes'].map(k=>ed(g,k)).join('')}<td><button class="btn sm" data-del="${g.id}">✕</button></td></tr>`).join('');
 const by=(k)=>{const m={};G.filter(g=>g[k]).forEach(g=>{m[g[k]]=(m[g[k]]||0)+1});return Object.entries(m).sort((a,b)=>b[1]-a[1]).map(([a,b])=>`${esc(a)}: <b>${b}</b>`).join('<br>')||'<span class="small">None yet</span>'};
 $('sumd').innerHTML='<p>'+by('diet')+'</p><p><b>Allergies</b><br>'+(G.filter(g=>g.allergies).map(g=>`${esc(g.full_name)}: ${esc(g.allergies)}`).join('<br>')||'<span class="small">None yet</span>')+'</p>';
 $('sumt').innerHTML='<p>'+by('travel_mode')+'</p><p><b>Arrivals</b><br>'+by('arrival_date')+'</p><p><b>Hotels</b><br>'+by('hotel')+'</p><p>Need transport: <b>'+cnt(g=>g.needs_transport)+'</b></p>';
}
['q','fs','fc','ff'].forEach(id=>$(id).addEventListener('input',render));
async function save(id,k,v){const patch={[k]:v===''?null:v};if(k==='full_name'&&v)patch.is_placeholder=false;const {error}=await sb.from('guests').update(patch).eq('id',id);if(error){alert(error.message);return}const g=G.find(x=>x.id===id);Object.assign(g,patch);render()}
$('tb').addEventListener('focusout',e=>{const c=e.target.closest('td[contenteditable]');if(!c)return;const g=G.find(x=>x.id===c.dataset.id);const v=c.childNodes[0]?.textContent?.trim()??'';if(String(g[c.dataset.k]??'')!==v)save(g.id,c.dataset.k,v)});
$('tb').addEventListener('change',e=>{const s=e.target.closest('select[data-k]');if(s)save(s.dataset.id,s.dataset.k,s.value)});
$('tb').addEventListener('click',async e=>{const b=e.target.closest('button');if(!b)return;
 if(b.dataset.copy){const h=HH.find(x=>x.id===b.dataset.copy);const url=BASE+'rsvp/?t='+h.invite_token;try{await navigator.clipboard.writeText(url);b.textContent='Copied!'}catch(_){prompt('RSVP link',url)}setTimeout(()=>b.textContent='Copy link',1500)}
 if(b.dataset.addg){const n=prompt('Guest name');if(!n)return;const {error}=await sb.from('guests').insert({household_id:b.dataset.addg,full_name:n});error?alert(error.message):load()}
 if(b.dataset.del){const g=G.find(x=>x.id===b.dataset.del);if(!confirm('Remove '+g.full_name+'?'))return;await sb.from('guests').delete().eq('id',g.id);
  if(!G.some(x=>x.id!==g.id&&x.household_id===g.household_id)&&confirm('Household is now empty. Remove household too?'))await sb.from('households').delete().eq('id',g.household_id);load()}});
$('addh').onclick=async()=>{const n=prompt('Household name (e.g. "Smith household")');if(!n)return;const first=prompt('First guest full name');const {data,error}=await sb.from('households').insert({name:n}).select().single();if(error)return alert(error.message);if(first)await sb.from('guests').insert({household_id:data.id,full_name:first});load()};
$('csv').onclick=()=>{const cols=['household','full_name','rsvp_status','is_child','is_plus_one','is_placeholder','country','meal','diet','allergies','arrival_date','departure_date','travel_mode','hotel','needs_transport','song_request','notes','rsvp_link'];
 const q=v=>'"'+String(v??'').replace(/"/g,'""')+'"';const lines=[cols.join(',')].concat(G.map(g=>cols.map(c=>q(c==='household'?g._h?.name:c==='rsvp_link'?BASE+'rsvp/?t='+g._h?.invite_token:g[c])).join(',')));
 const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([lines.join('\n')],{type:'text/csv'}));a.download='guests-export.csv';a.click()};
boot();
})();
