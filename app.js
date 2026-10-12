const demoMembers=[
 {name:'Priya Shah',phone:'98765 11220',plan:'Performance',joined:'12 Jan 2026',renewal:'12 Oct 2026',status:'Active'},
 {name:'Arjun Rao',phone:'98201 44591',plan:'Open Gym',joined:'03 Mar 2026',renewal:'03 Oct 2026',status:'Expiring'},
 {name:'Neha Jain',phone:'98920 77651',plan:'Elite Coaching',joined:'22 Apr 2026',renewal:'22 Nov 2026',status:'Active'},
 {name:'Kabir Mehta',phone:'98191 22440',plan:'Performance',joined:'14 May 2026',renewal:'14 Oct 2026',status:'Active'},
 {name:'Riya Kulkarni',phone:'97692 88021',plan:'Open Gym',joined:'08 Dec 2025',renewal:'08 Sep 2026',status:'Expired'},
 {name:'Dev Malhotra',phone:'90041 55212',plan:'Performance',joined:'29 Jun 2026',renewal:'29 Oct 2026',status:'Active'}
];
let leads=JSON.parse(localStorage.getItem('infinityLeads')||'[]');
let members=[...demoMembers];

function qs(x){return document.querySelector(x)}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function openAdmin(){qs('#adminModal').classList.remove('hidden');setTimeout(()=>qs('#adminPass').focus(),100)}
function closeModal(id){qs('#'+id).classList.add('hidden')}
function login(){
 const u=qs('#adminUser').value.trim(),p=qs('#adminPass').value;
 if(u==='infinityadmin'&&p==='Infinity@2026'){closeModal('adminModal');qs('#customerApp').classList.add('hidden');qs('#adminApp').classList.remove('hidden');adminView('dash');window.scrollTo(0,0);}
 else qs('#loginError').classList.remove('hidden');
}
function logout(){qs('#adminApp').classList.add('hidden');qs('#customerApp').classList.remove('hidden');}
function showCustomer(){logout();window.scrollTo(0,0)}
function adminView(v){
 document.querySelectorAll('.adminview').forEach(x=>x.classList.remove('active'));
 qs('#view-'+v).classList.add('active');
 document.querySelectorAll('.side a[data-view]').forEach(x=>x.classList.toggle('active',x.dataset.view===v));
 const titles={dash:'Dashboard',members:'Members',leads:'Trial Leads',classes:'Class Schedule',payments:'Payments',reports:'Reports'};
 qs('#adminHeading').textContent=titles[v];
 if(v==='members')renderMembers();if(v==='leads')renderLeads();
 qs('#side').classList.remove('open');
}
function renderMembers(){
 const q=(qs('#memberSearch')?.value||'').toLowerCase();
 const list=members.filter(m=>(m.name+m.phone+m.plan).toLowerCase().includes(q));
 qs('#memberRows').innerHTML=list.map((m,i)=>`<tr><td><div class="mini"><span class="avatar">${m.name.split(' ').map(x=>x[0]).join('')}</span><div><b>${m.name}</b><div style="color:var(--muted);font-size:10px">${m.phone}</div></div></div></td><td>${m.plan}</td><td>${m.joined}</td><td>${m.renewal}</td><td><span class="status ${m.status==='Active'?'activeS':m.status==='Expired'?'expiredS':'pendingS'}">${m.status}</span></td><td><button class="action" onclick="toast('Member profile opened for ${m.name}')">View</button></td></tr>`).join('');
 qs('#memberCount').textContent=list.length+' records';
}
function addDemoMember(){
 const n='New Member '+(members.length+1);members.unshift({name:n,phone:'98xxx xxxxx',plan:'Open Gym',joined:'03 Oct 2026',renewal:'03 Nov 2026',status:'Active'});renderMembers();qs('#sMembers').textContent='1,285';toast('Demo member added');
}
function renderLeads(){
 const all=leads.length?leads:[{name:'Aarav Desai',phone:'99887 22110',goal:'Build strength',source:'Website',status:'New'},{name:'Maya Singh',phone:'98701 55331',goal:'Fat loss',source:'Instagram',status:'Contacted'},{name:'Kabir Mehta',phone:'98191 22440',goal:'Fat loss',source:'Website',status:'New'}];
 qs('#leadRows').innerHTML=all.map(l=>`<tr><td><b>${esc(l.name)}</b></td><td>${esc(l.phone)}</td><td>${esc(l.goal)}</td><td>${esc(l.source||'Website')}</td><td><span class="status ${l.status==='New'?'activeS':'pendingS'}">${l.status}</span></td></tr>`).join('');
 qs('#sLeads').textContent=47+leads.length;qs('#leadBadge').textContent=leads.length?' '+leads.length:'';
}
function clearLeads(){leads=[];localStorage.removeItem('infinityLeads');renderLeads();toast('Demo leads cleared')}
function calcBMI(){
 const h=parseFloat(qs('#height').value)/100,w=parseFloat(qs('#weight').value);
 if(!h||!w){qs('#bmiResult').innerHTML='Please enter height and weight.';return}
 const bmi=w/(h*h),cat=bmi<18.5?'Below recommended range':bmi<25?'General healthy range':bmi<30?'Above recommended range':'High range';
 qs('#bmiResult').innerHTML=`<strong>${bmi.toFixed(1)}</strong><br><span style="color:var(--muted)">${cat}</span>`;
}
function openJoin(plan){qs('#joinModal').classList.remove('hidden');qs('#joinPlan').value=plan;qs('#joinMsg').classList.add('hidden')}
function submitJoin(){
 const name=qs('#joinName').value.trim(),phone=qs('#joinPhone').value.trim(),plan=qs('#joinPlan').value;
 if(!name||!phone){toast('Please enter name and phone');return}
 leads.unshift({name,phone,goal:plan,source:'Website',status:'New'});localStorage.setItem('infinityLeads',JSON.stringify(leads));
 qs('#joinMsg').textContent='Request received. The INFINITY team will contact you shortly.';qs('#joinMsg').classList.remove('hidden');toast('Request submitted');
}
function submitTrial(){
 const name=qs('#trialName').value.trim(),phone=qs('#trialPhone').value.trim();
 if(!name||!phone){toast('Please enter your name and phone');return}
 leads.unshift({name,phone,goal:qs('#trialGoal').value,source:'Free Trial',status:'New'});localStorage.setItem('infinityLeads',JSON.stringify(leads));
 qs('#trialMsg').textContent='Trial request received — we will confirm your preferred slot.';qs('#trialMsg').classList.remove('hidden');toast('Trial request sent');
}
function toast(msg){const t=qs('#toast');t.textContent=msg;t.classList.remove('hidden');clearTimeout(window._toast);window._toast=setTimeout(()=>t.classList.add('hidden'),2600)}
document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelectorAll('.modal').forEach(x=>x.classList.add('hidden'))}});
document.querySelectorAll('.navlinks a').forEach(a=>a.addEventListener('click',()=>qs('.navlinks').classList.remove('show')));

