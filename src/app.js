(function(){'use strict';
/* ============ أدوات ============ */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const E=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const LS={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}},del(k){try{localStorage.removeItem(k)}catch(e){}}};
const P={home:'M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z',receipt:'M6 2h12v20l-3-2-3 2-3-2-3 2z M9 8h6 M9 12h6 M9 16h3',wallet:'M3 7a2 2 0 0 1 2-2h12v4 M3 7v11a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H5a2 2 0 0 1-2-1z M16 14h2',box:'M21 8l-9-5-9 5 9 5z M3 8v8l9 5 9-5V8 M12 13v8',menu:'M4 7h16 M4 12h16 M4 17h16',search:'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.3-4.3',copy:'M9 9h11v11H9z M5 15V5a1 1 0 0 1 1-1h10',refresh:'M21 12a9 9 0 1 1-3-6.7 M21 4v5h-5',sun:'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z M12 1v2 M12 21v2 M4.2 4.2l1.4 1.4 M18.4 18.4l1.4 1.4 M1 12h2 M21 12h2 M4.2 19.8l1.4-1.4 M18.4 5.6l1.4-1.4',moon:'M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z',check:'M20 6L9 17l-5-5',chev:'M15 18l-6-6 6-6',alert:'M12 9v4 M12 17h.01 M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',store:'M3 9l1.5-5h15L21 9 M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0 M5 12v8h14v-8 M10 20v-5h4v5',user:'M20 21a8 8 0 0 0-16 0 M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',logout:'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9',trend:'M3 17l6-6 4 4 8-8 M15 7h6v6',cash:'M2 6h20v12H2z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',card:'M2 5h20v14H2z M2 10h20',link:'M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1 M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1',plus:'M12 5v14 M5 12h14',share:'M4 12v8h16v-8 M16 6l-4-4-4 4 M12 2v13',key:'M21 2l-9.6 9.6 M15.5 7.5l3 3L22 7l-3-3 M7.5 21a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z',eye:'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',eyeoff:'M17.9 17.9A10.4 10.4 0 0 1 12 20C6 20 2 12 2 12a18 18 0 0 1 5.1-5.9 M9.9 4.2A9.7 9.7 0 0 1 12 4c6 0 10 8 10 8a18 18 0 0 1-2.2 3.2 M1 1l22 22',users:'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.9 M16 3.1a4 4 0 0 1 0 7.8',cart:'M6 6h15l-1.5 9h-12z M6 6L5 3H2 M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M18 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',down:'M12 5v14 M19 12l-7 7-7-7',up:'M12 19V5 M5 12l7-7 7 7',clock:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2',info:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 16v-4 M12 8h.01'};
const I=(n,c='')=>`<svg class="i ${c}" viewBox="0 0 24 24">${P[n].split(' M').map((d,i)=>`<path d="${i?'M'+d:d}"/>`).join('')}</svg>`;
const ymd=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const addDays=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x};
const toast=m=>{const t=document.createElement('div');t.className='toast';t.textContent=m;document.body.appendChild(t);setTimeout(()=>t.remove(),2200)};
const copy=async t=>{try{await navigator.clipboard.writeText(t)}catch(e){const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(_){}a.remove()}toast('تم النسخ ✓')};
const nf=(v,d=3)=>v.toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d});
const n3=m=>nf((Number(m)||0)/1000);
const cur=()=>(S.store&&S.store.currency)||'د.ل';
const money=m=>`<span class="num">${n3(m)}</span> <span class="cu">${E(cur())}</span>`;
const compact=m=>{const v=Math.abs(m)/1000;const s=v>=1e6?nf(v/1e6,1)+'M':v>=1e3?nf(v/1e3,1)+'K':nf(v,0);return (m<0?'-':'')+s};
const ago=iso=>{if(!iso)return'';const s=Math.max(0,(Date.now()-new Date(iso).getTime())/1000);if(s<60)return'الآن';if(s<3600)return'منذ '+Math.floor(s/60)+' د';if(s<86400)return'منذ '+Math.floor(s/3600)+' س';return'منذ '+Math.floor(s/86400)+' يوم'};
const AR_DAYS=['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
const dayName=s=>{const d=new Date(s+'T00:00:00');const t=ymd(new Date()),y=ymd(addDays(new Date(),-1));return s===t?'اليوم':s===y?'أمس':AR_DAYS[d.getDay()]+' '+s.slice(5).replace('-','/')};
const hhmm=s=>String(s).slice(11,16);
const b64u=o=>btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');

/* ============ الحالة والإعداد ============ */
const CFG=window.OWNER_CONFIG||{};
const S={cfg:{url:(LS.get('o_url')||CFG.url||'').replace(/\/$/,''),anon:LS.get('o_anon')||CFG.anon||''},sess:LS.get('o_sess'),stores:[],store:null,daily:[],inv:[],exp:[],vou:[],snap:{},
 tab:LS.get('o_tab','home'),period:LS.get('o_period','today'),finTab:'exp',invF:'all',q:'',loading:false,loadedAt:0,offline:false,authMode:'in',err:''};
function applyTheme(){const h=document.documentElement,t=LS.get('o_theme','dark'),a=LS.get('o_accent','sky');h.dataset.theme=t;if(a==='sky')delete h.dataset.a;else h.dataset.a=a;const m=$('meta[name=theme-color]');if(m)m.content=t==='light'?'#eef2f8':'#070d1a'}
applyTheme();

/* ============ عميل Supabase مصغّر ============ */
const API={
 async raw(path,opt={},retry=true){const tok=S.sess&&S.sess.access;const r=await fetch(S.cfg.url+path,{method:opt.method||'GET',headers:Object.assign({apikey:S.cfg.anon,Authorization:'Bearer '+(tok||S.cfg.anon),'Content-Type':'application/json'},opt.headers||{}),body:opt.body?JSON.stringify(opt.body):undefined});
  if(r.status===401&&retry&&S.sess&&S.sess.refresh){if(await API.refresh())return API.raw(path,opt,false)}
  return r},
 async json(path,opt){let r;try{r=await API.raw(path,opt)}catch(e){throw Object.assign(new Error('offline'),{offline:true})}
  const t=await r.text();let j=null;try{j=t?JSON.parse(t):null}catch(e){}
  if(!r.ok)throw Object.assign(new Error((j&&(j.message||j.msg||j.error_description||j.error))||('HTTP '+r.status)),{status:r.status});return j},
 async refresh(){try{const r=await fetch(S.cfg.url+'/auth/v1/token?grant_type=refresh_token',{method:'POST',headers:{apikey:S.cfg.anon,'Content-Type':'application/json'},body:JSON.stringify({refresh_token:S.sess.refresh})});if(!r.ok){S.sess=null;LS.del('o_sess');return false}saveSess(await r.json());return true}catch(e){return false}},
 async signIn(email,password){const j=await API.json('/auth/v1/token?grant_type=password',{method:'POST',body:{email,password}});saveSess(j)},
 async signUp(email,password){const j=await API.json('/auth/v1/signup',{method:'POST',body:{email,password}});if(j&&j.access_token)saveSess(j);else throw new Error('confirm_email')},
 async all(table,q){const out=[];for(let off=0;off<5000;off+=1000){const rows=await API.json('/rest/v1/'+table+'?'+q+'&limit=1000&offset='+off);out.push(...rows);if(rows.length<1000)break}return out},
 rpc:(fn,body)=>API.json('/rest/v1/rpc/'+fn,{method:'POST',body})
};
function saveSess(j){S.sess={access:j.access_token,refresh:j.refresh_token,user:{id:j.user&&j.user.id,email:j.user&&j.user.email}};LS.set('o_sess',S.sess)}

const NEEDS_SCHEMA=m=>/create_store|schema cache|PGRST20\d|does not exist|Could not find the (function|table)|list_stores|stores/i.test(String(m||''))&&!/Invalid login|offline/i.test(String(m||''));
function setupSheet(){const ref=(S.cfg.url.match(/^https:\/\/([^.]+)\./)||[])[1]||'';
 sheet(`<div style="text-align:center"><div class="av" style="--c:var(--warn);margin:0 auto 10px;width:56px;height:56px">${I('alert')}</div><h2 style="margin:0 0 6px">قاعدة البيانات تحتاج تجهيزاً (مرة واحدة)</h2><p style="color:var(--mut);margin:0 0 12px;font-size:.9rem">لم يُجهَّز هذا المشروع بعد. الأمر يستغرق دقيقة:</p></div>
 <ol class="steps"><li>اضغط <b>نسخ ملف الإعداد</b> أدناه.</li><li>اضغط <b>فتح SQL Editor</b> (أو افتحه من موقع Supabase).</li><li>الصق ما نسخته في المحرر ثم اضغط <b>Run</b>. تظهر كلمة Success.</li><li>ارجع هنا وأعد المحاولة.</li></ol>
 <button class="btn pri full" data-act="copysql">${I('copy')} نسخ ملف الإعداد</button>
 ${ref?`<a class="btn full" style="margin-top:8px;text-align:center;display:block" target="_blank" rel="noopener" href="https://supabase.com/dashboard/project/${E(ref)}/sql/new">فتح SQL Editor</a>`:''}`)}
function arErr(m){m=String(m||'');const map=[[/Invalid login/i,'البريد أو كلمة السر غير صحيحة'],[/already registered|already been registered/i,'هذا البريد مسجّل من قبل، سجّل الدخول'],[/Password should be at least/i,'كلمة السر قصيرة (6 خانات على الأقل)'],[/valid email|invalid format|Unable to validate email/i,'اكتب بريداً إلكترونياً صحيحاً'],[/offline|Failed to fetch|NetworkError/i,'لا يوجد اتصال بالإنترنت'],[/confirm_email/,'تم إرسال رابط تأكيد إلى بريدك. افتحه ثم سجّل الدخول.'],[/rate limit/i,'محاولات كثيرة، انتظر قليلاً ثم أعد المحاولة'],[/too_many_stores/,'وصلت للحد الأقصى من المتاجر'],[/JWT|expired/i,'انتهت الجلسة، سجّل الدخول من جديد']];for(const [r,t] of map)if(r.test(m))return t;return m||'حدث خطأ غير متوقع'}

/* ============ تحميل البيانات ============ */
async function loadStores(){S.stores=await API.json('/rest/v1/stores?select=id,name,currency,last_seen,created_at&order=created_at.asc');const sel=LS.get('o_store');S.store=S.stores.find(s=>s.id===sel)||S.stores[0]||null;if(S.store)LS.set('o_store',S.store.id)}
async function loadData(silent){if(!S.store||S.loading)return;S.loading=true;if(!silent)render();spin(true);
 const id=S.store.id,d70=ymd(addDays(new Date(),-75)),d95=ymd(addDays(new Date(),-95));
 try{const [stores,daily,inv,exp,vou,snap]=await Promise.all([API.json('/rest/v1/stores?select=id,name,currency,last_seen,created_at&order=created_at.asc'),API.all('daily',`store_id=eq.${id}&day=gte.${d70}&order=day.asc&select=*`),API.all('invoices',`store_id=eq.${id}&created_at=gte.${d95}T00:00:00&order=created_at.desc&select=*`),API.all('expenses',`store_id=eq.${id}&created_at=gte.${d95}T00:00:00&order=created_at.desc&select=*`),API.all('vouchers',`store_id=eq.${id}&created_at=gte.${d95}T00:00:00&order=created_at.desc&select=*`),API.json(`/rest/v1/snapshot?store_id=eq.${id}&select=key,data,updated_at`)]);
  S.stores=stores;S.store=stores.find(s=>s.id===id)||S.store;S.daily=daily;S.inv=inv;S.exp=exp;S.vou=vou;S.snap={};snap.forEach(r=>S.snap[r.key]=r.data);S.snapAt=snap.map(r=>r.updated_at).sort().pop();S.offline=false;S.loadedAt=Date.now();
  try{LS.set('o_cache_'+id,{daily,inv:inv.slice(0,600),exp,vou,snap:S.snap,t:S.loadedAt})}catch(e){}
 }catch(e){if(e.offline||/Failed to fetch/.test(e.message)){S.offline=true;const c=LS.get('o_cache_'+id);if(c&&!S.daily.length){S.daily=c.daily;S.inv=c.inv;S.exp=c.exp;S.vou=c.vou;S.snap=c.snap;S.loadedAt=c.t}}else if(e.status===401){S.sess=null;LS.del('o_sess')}else toast(arErr(e.message))}
 S.loading=false;spin(false);render()}
function spin(on){const b=$('#rf');if(b)b.classList.toggle('spin',on)}

/* ============ الحسابات ============ */
function range(p){const t=new Date();t.setHours(0,0,0,0);let a=new Date(t),b=new Date(t);
 if(p==='yesterday'){a=addDays(t,-1);b=new Date(a)}else if(p==='7d')a=addDays(t,-6);else if(p==='30d')a=addDays(t,-29);else if(p==='month')a=new Date(t.getFullYear(),t.getMonth(),1);else if(p==='lastmonth'){a=new Date(t.getFullYear(),t.getMonth()-1,1);b=new Date(t.getFullYear(),t.getMonth(),0)}
 const len=Math.round((b-a)/864e5)+1;return{from:ymd(a),to:ymd(b),pfrom:ymd(addDays(a,-len)),pto:ymd(addDays(a,-1)),len}}
const PER=[['today','اليوم'],['yesterday','أمس'],['7d','آخر 7 أيام'],['month','هذا الشهر'],['lastmonth','الشهر الماضي'],['30d','آخر 30 يوماً']];
function agg(from,to){const r={sales:0,profit:0,expenses:0,invoices:0,collections:0,purchases:0};for(const d of S.daily)if(d.day>=from&&d.day<=to){r.sales+=+d.sales;r.profit+=+d.profit;r.expenses+=+d.expenses;r.invoices+=+d.invoices;r.collections+=+d.collections;r.purchases+=+d.purchases}r.net=r.profit-r.expenses;return r}
const pct=(c,p)=>p?((c-p)/Math.abs(p))*100:null;
function delta(c,p,inv){const v=pct(c,p);if(v==null||!isFinite(v))return'<span class="flatc">—</span>';const good=inv?v<=0:v>=0;const cl=Math.abs(v)<.5?'flatc':good?'up':'down';return`<span class="${cl}">${v>=0?'▲':'▼'} ${nf(Math.abs(v),0)}%</span>`}
const metaOf=i=>{const rem=i.total-i.returned-i.paid;if(i.status==='cancelled')return{t:'ملغاة',c:'var(--bad)'};if(rem>0)return{t:'آجل',c:'var(--warn)'};if(i.returned>0)return{t:'مرتجع',c:'var(--warn)'};return{t:({cash:'نقدي',card:'بطاقة',bank:'تحويل',transfer:'تحويل',credit:'آجل'})[i.method]||'نقدي',c:'var(--ok)'}};
const CAT_C=['#38bdf8','#34d399','#fbbf24','#a78bfa','#fb7185','#2dd4bf','#f97316','#60a5fa'];const catColor=s=>{let h=0;for(const ch of s)h=(h*31+ch.charCodeAt(0))>>>0;return CAT_C[h%CAT_C.length]};

/* ============ العرض ============ */
const root=()=>$('#root');
function render(){const el=root();if(!el)return;
 if(!S.cfg.url||!S.cfg.anon)return el.innerHTML=setupView();
 if(!S.sess)return el.innerHTML=authView();
 if(!S.store)return el.innerHTML=S.stores===null?'':linkView();
 el.innerHTML=shell(); wire()}
function skeleton(){return`<div class="sk" style="height:170px;border-radius:26px"></div><div class="kpis">${'<div class="sk" style="height:112px"></div>'.repeat(6)}</div><div class="sk" style="height:240px;margin-top:14px"></div>`}
function statusInfo(){const s=S.store;if(!s||!s.last_seen)return{c:'off',t:'بانتظار أول اتصال من المنظومة'};const sec=(Date.now()-new Date(s.last_seen).getTime())/1000;if(sec<180)return{c:'on',t:'متصل الآن'};if(sec<86400)return{c:'warn',t:'آخر اتصال '+ago(s.last_seen)};return{c:'off',t:'المنظومة غير متصلة '+ago(s.last_seen)}}
const NAV=[['home','home','الرئيسية'],['inv','receipt','الفواتير'],['fin','wallet','الحركة المالية'],['stock','box','المخزون'],['more','menu','المزيد']];
function shell(){const st=statusInfo();const low=(S.snap.low_stock||[]).length;
 const nav=NAV.map(([k,ic,l])=>`<button data-act="tab" data-v="${k}" class="${S.tab===k?'on':''}">${I(ic)}<span>${l}</span>${k==='stock'&&low?`<i class="badge">${low}</i>`:''}</button>`).join('');
 const rail=NAV.map(([k,ic,l])=>`<button data-act="tab" data-v="${k}" class="${S.tab===k?'on':''}">${I(ic)}<span>${l}</span></button>`).join('');
 return`<div id="app"><aside class="rail"><div class="brand"><div class="logo">${I('store')}</div>دلالة</div>${rail}</aside><div class="main"><header class="top"><div class="wrap"><div class="logo">${I('store')}</div><div class="grow"><h1>${E(S.store.name)}</h1><div class="sub"><i class="dot ${st.c}"></i><span>${st.t}</span></div></div><button class="ib" id="rf" data-act="refresh" aria-label="تحديث">${I('refresh')}</button></div></header><div class="wrap">${S.offline?`<div class="banner" style="margin-top:12px">${I('alert')}<span>لا يوجد اتصال بالإنترنت — تُعرض آخر بيانات محفوظة${S.loadedAt?' ('+ago(new Date(S.loadedAt).toISOString())+')':''}</span></div>`:''}<div class="page" id="page">${!S.loadedAt&&S.loading?skeleton():page()}</div></div></div><nav class="nav">${nav}</nav></div>`}
function page(){return({home:homeView,inv:invView,fin:finView,stock:stockView,more:moreView})[S.tab]()}
function periodChips(){return`<div class="chips">${PER.map(([k,l])=>`<button class="chip ${S.period===k?'on':''}" data-act="period" data-v="${k}">${l}</button>`).join('')}</div>`}
function waiting(){return`<div class="card empty">${I('clock')}<b>بانتظار أول مزامنة من المنظومة</b>تأكد أن منظومة دلالة التجارية على جهاز المتجر مفتوحة ومتصلة بالإنترنت وأن رمز الربط مُدخل في<br><b style="display:inline;color:var(--pri)">الإعدادات ← النسخ الاحتياطي ← تطبيق المالك</b></div>`}

/* ---------- الرئيسية ---------- */
function homeView(){const r=range(S.period),c=agg(r.from,r.to),p=agg(r.pfrom,r.pto);
 if(!S.daily.length&&!S.store.last_seen)return periodChips()+waiting();
 const low=(S.snap.low_stock||[]),tot=S.snap.totals||{},top=(S.snap.top30||[]).slice().sort((a,b)=>b.total-a.total);
 const lbl=PER.find(x=>x[0]===S.period)[1];
 const kp=(ic,l,v,d,col,sub)=>`<div class="kpi" style="--c:${col}"><div class="ic">${I(ic)}</div><div class="l">${l}</div><div class="v">${v}</div><div class="d">${d||sub||''}</div></div>`;
 const recent=S.inv.filter(i=>i.created_at.slice(0,10)>=r.from&&i.created_at.slice(0,10)<=r.to).slice(0,5);
 return`${periodChips()}
 <div class="hero"><div class="lbl">صافي الربح — ${lbl}</div><div class="big num">${n3(c.net)}<small>${E(cur())}</small></div><span class="delta">${delta(c.net,p.net).replace(/class="[^"]*"/,'')} عن الفترة السابقة</span><div style="margin-top:14px;display:flex;gap:18px;font-size:.84rem;opacity:.92;position:relative"><span>إجمالي الربح <b class="num">${compact(c.profit)}</b></span><span>المصروفات <b class="num">${compact(c.expenses)}</b></span></div></div>
 <div class="kpis">
 ${kp('trend','المبيعات',money(c.sales),delta(c.sales,p.sales),'var(--pri)')}
 ${kp('cash','إجمالي الربح',money(c.profit),delta(c.profit,p.profit),'var(--ok)')}
 ${kp('wallet','المصروفات',money(c.expenses),delta(c.expenses,p.expenses,true),'var(--warn)')}
 ${kp('receipt','عدد الفواتير',`<span class="num">${c.invoices}</span>`,c.invoices?`<span class="flatc">متوسط ${n3(c.sales/c.invoices)}</span>`:'<span class="flatc">—</span>','#a78bfa')}
 ${kp('down','المقبوضات',money(c.collections),delta(c.collections,p.collections),'#2dd4bf')}
 ${kp('cart','المشتريات',money(c.purchases),delta(c.purchases,p.purchases,true),'#fb7185')}</div>
 <div class="grid2 c2"><div><h2 class="sec">${I('trend')}المبيعات والأرباح اليومية<small>${r.len<=1?'آخر 7 أيام':lbl}</small></h2><div class="card" style="position:relative" id="chartbox">${chart(r)}</div></div>
 <div><h2 class="sec">${I('store')}نظرة على المتجر</h2><div class="card list" style="padding:6px 16px">
  <button class="row" data-act="tab" data-v="stock"><div class="av" style="--c:var(--ok)">${I('box')}</div><div class="grow"><div class="t">قيمة المخزون</div><div class="s">${tot.products||0} صنف</div></div><div class="amt">${money(tot.stock_value||0)}</div></button>
  <div class="row"><div class="av" style="--c:var(--warn)">${I('users')}</div><div class="grow"><div class="t">ديون على العملاء</div><div class="s">${tot.receivable_count||0} فاتورة آجلة</div></div><div class="amt">${money(tot.receivable||0)}</div></div>
  <button class="row" data-act="tab" data-v="stock"><div class="av" style="--c:${low.length?'var(--bad)':'var(--ok)'}">${I(low.length?'alert':'check')}</div><div class="grow"><div class="t">أصناف منخفضة المخزون</div><div class="s">${low.length?'تحتاج إعادة طلب':'كل شيء بخير'}</div></div><div class="amt num">${low.length}</div></button></div></div></div>
 ${top.length?`<h2 class="sec">${I('trend')}الأكثر مبيعاً<small>آخر 30 يوماً</small></h2><div class="card list" style="padding:6px 16px">${top.slice(0,6).map((t,i)=>`<div class="row"><div class="av">${i+1}</div><div class="grow"><div class="t">${E(t.name)}</div><div class="bar" style="margin-top:7px"><i style="width:${Math.max(4,t.total/top[0].total*100)}%"></i></div></div><div class="amt">${money(t.total)}<small class="num">× ${nf(t.qty,t.qty%1?2:0)}</small></div></div>`).join('')}</div>`:''}
 <h2 class="sec">${I('receipt')}آخر الفواتير<small><button data-act="tab" data-v="inv" style="color:var(--pri);font-weight:800">عرض الكل</button></small></h2>
 <div class="card list" style="padding:6px 16px">${recent.length?recent.map(invRow).join(''):`<div class="empty" style="padding:22px">لا توجد فواتير في هذه الفترة</div>`}</div>`}
function chart(r){const days=[];const end=new Date(r.to+'T00:00:00');const n=r.len<=1?7:Math.min(r.len,31);for(let i=n-1;i>=0;i--)days.push(ymd(addDays(end,-i)));
 const map={};S.daily.forEach(d=>map[d.day]=d);const rows=days.map(d=>({d,s:+(map[d]?map[d].sales:0),p:+(map[d]?map[d].profit:0),n:+(map[d]?map[d].invoices:0)}));
 const W=640,H=230,pl=10,pr=46,pt=14,pb=26,iw=W-pl-pr,ih=H-pt-pb;const max=Math.max(1,...rows.map(x=>Math.max(x.s,x.p)));const nice=(()=>{const m=max/1000;const mag=Math.pow(10,Math.floor(Math.log10(m||1)));const u=[1,2,2.5,5,10].find(k=>k*mag>=m)*mag;return u*1000})();
 const slot=iw/rows.length,bw=Math.min(22,slot*.34);const X=i=>W-pr-(i+.5)*slot;const Y=v=>pt+ih-(Math.max(0,v)/nice)*ih;
 let g='';for(let k=0;k<=3;k++){const v=nice*k/3,y=Y(v);g+=`<line x1="${pl}" x2="${W-pr}" y1="${y}" y2="${y}" stroke="var(--line)" stroke-dasharray="3 5"/><text x="${W-pr+8}" y="${y+4}">${compact(v)}</text>`}
 const lab=rows.length>16?Math.ceil(rows.length/8):1;
 const bars=rows.map((x,i)=>`<rect x="${X(i)-bw-1}" y="${Y(x.s)}" width="${bw}" height="${Math.max(0,pt+ih-Y(x.s))}" rx="5" fill="url(#gs)"/><rect x="${X(i)+1}" y="${Y(Math.max(0,x.p))}" width="${bw}" height="${Math.max(0,pt+ih-Y(Math.max(0,x.p)))}" rx="5" fill="var(--ok)" opacity=".9"/>${i%lab===0?`<text x="${X(i)}" y="${H-7}" text-anchor="middle">${x.d.slice(8)}</text>`:''}<rect data-act="bar" data-i="${i}" x="${X(i)-slot/2}" y="0" width="${slot}" height="${H}" fill="transparent"/>`).join('');
 S._chart=rows;
 return`<div class="legend"><span><i style="background:var(--pri)"></i>المبيعات</span><span><i style="background:var(--ok)"></i>الربح</span></div><svg class="chart" viewBox="0 0 ${W} ${H}" direction="ltr"><defs><linearGradient id="gs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--pri)"/><stop offset="1" stop-color="var(--pri2)"/></linearGradient></defs>${g}${bars}</svg>`}

/* ---------- الفواتير ---------- */
function invRow(i){const m=metaOf(i);return`<button class="row" data-act="inv" data-id="${i.local_id}"><div class="av" style="--c:${m.c}">${I('receipt')}</div><div class="grow"><div class="t">${E(i.customer||'عميل نقدي')}</div><div class="s"><span class="num">${E(i.no)}</span> · <span class="num">${hhmm(i.created_at)}</span></div></div><div class="amt">${money(i.total-i.returned)}<small><span class="badge2" style="--c:${m.c}">${m.t}</span></small></div></button>`}
function invView(){const r=range(S.period);let list=S.inv.filter(i=>{const d=i.created_at.slice(0,10);return d>=r.from&&d<=r.to});
 const cnt={all:list.length,cancelled:0,credit:0,ret:0};list.forEach(i=>{if(i.status==='cancelled')cnt.cancelled++;else{if(i.total-i.returned-i.paid>0)cnt.credit++;if(i.returned>0)cnt.ret++}});
 const q=S.q.trim().toLowerCase();if(q)list=list.filter(i=>(i.no+' '+i.customer).toLowerCase().includes(q));
 if(S.invF==='cancelled')list=list.filter(i=>i.status==='cancelled');else if(S.invF==='credit')list=list.filter(i=>i.status!=='cancelled'&&i.total-i.returned-i.paid>0);else if(S.invF==='ret')list=list.filter(i=>i.returned>0);else if(S.invF==='ok')list=list.filter(i=>i.status!=='cancelled');
 const ok=list.filter(i=>i.status!=='cancelled');const sum=ok.reduce((a,i)=>a+i.total-i.returned,0);
 const groups={};list.forEach(i=>{(groups[i.created_at.slice(0,10)]=groups[i.created_at.slice(0,10)]||[]).push(i)});
 const F=[['all','الكل ('+cnt.all+')'],['ok','مكتملة'],['credit','آجلة ('+cnt.credit+')'],['ret','بها مرتجع ('+cnt.ret+')'],['cancelled','ملغاة ('+cnt.cancelled+')']];
 return`${periodChips()}<div class="search">${I('search')}<input id="q" type="search" placeholder="ابحث برقم الفاتورة أو اسم العميل" value="${E(S.q)}" autocomplete="off"></div>
 <div class="chips" style="margin-top:10px">${F.map(([k,l])=>`<button class="chip ${S.invF===k?'on':''}" data-act="invf" data-v="${k}">${l}</button>`).join('')}</div>
 <div class="card flat" style="margin:6px 0 4px;display:flex;justify-content:space-between;align-items:center"><span style="color:var(--mut);font-weight:700">${ok.length} فاتورة</span><b style="font-size:1.1rem">${money(sum)}</b></div>
 ${list.length?Object.keys(groups).sort().reverse().map(d=>{const g=groups[d];const t=g.filter(i=>i.status!=='cancelled').reduce((a,i)=>a+i.total-i.returned,0);return`<div class="day"><span>${dayName(d)}</span><small class="num">${n3(t)} ${E(cur())}</small></div><div class="card list" style="padding:2px 14px">${g.map(invRow).join('')}</div>`}).join(''):`<div class="card empty" style="margin-top:12px">${I('receipt')}<b>لا توجد فواتير</b>جرّب تغيير الفترة أو الفلتر</div>`}
 <p style="text-align:center;color:var(--mut);font-size:.78rem;margin:16px 0">تُعرض فواتير آخر 45 يوماً</p>`}
function openInv(id){const i=S.inv.find(x=>String(x.local_id)===String(id));if(!i)return;const m=metaOf(i),rem=i.total-i.returned-i.paid;
 const items=(i.items||[]);sheet(`<div style="display:flex;align-items:center;gap:12px"><div class="av" style="--c:${m.c}">${I('receipt')}</div><div class="grow"><div style="font-weight:800;font-size:1.15rem" class="num">${E(i.no)}</div><div style="color:var(--mut);font-size:.85rem" class="num">${E(i.created_at.replace('T',' ').slice(0,16))}</div></div><span class="badge2" style="--c:${m.c};font-size:.8rem">${m.t}</span></div>
 <div class="card flat" style="margin-top:14px;display:flex;align-items:center;gap:10px"><div class="av" style="--c:var(--pri)">${I('user')}</div><div><div style="color:var(--mut);font-size:.78rem">العميل</div><b>${E(i.customer||'عميل نقدي')}</b></div></div>
 <h2 class="sec" style="margin-top:18px">الأصناف<small>${items.length}</small></h2>${items.length?`<table class="tbl"><thead><tr><th>الصنف</th><th>الكمية</th><th>السعر</th><th>الإجمالي</th></tr></thead><tbody>${items.map(x=>`<tr><td>${E(x.n)}</td><td class="num">${nf(+x.q,x.q%1?2:0)}</td><td class="num">${n3(x.p)}</td><td class="num"><b>${n3(x.t)}</b></td></tr>`).join('')}</tbody></table>`:'<div class="empty" style="padding:14px">لا تتوفر تفاصيل الأصناف</div>'}
 <div class="sum"><div><span>إجمالي الفاتورة</span><b>${money(i.total)}</b></div>${i.returned>0?`<div><span>المرتجع</span><b style="color:var(--warn)">- ${money(i.returned)}</b></div>`:''}<div><span>المدفوع</span><b>${money(i.paid)}</b></div><div><span>${rem>0?'المتبقي على العميل':'الصافي'}</span><b style="color:${rem>0?'var(--bad)':'var(--ok)'}">${money(rem>0?rem:i.total-i.returned)}</b></div></div>`)}

/* ---------- الحركة المالية ---------- */
function finView(){const r=range(S.period),inR=x=>{const d=x.created_at.slice(0,10);return d>=r.from&&d<=r.to};
 const ex=S.exp.filter(inR),vo=S.vou.filter(inR);const te=ex.reduce((a,x)=>a+ +x.amount,0),rc=vo.filter(v=>v.kind==='receipt').reduce((a,x)=>a+ +x.amount,0),py=vo.filter(v=>v.kind==='payment').reduce((a,x)=>a+ +x.amount,0);
 const head=`${periodChips()}<div class="kpis" style="grid-template-columns:repeat(3,1fr)"><div class="kpi" style="--c:var(--warn)"><div class="l">المصروفات</div><div class="v">${compact(te)}</div></div><div class="kpi" style="--c:var(--ok)"><div class="l">إيصالات قبض</div><div class="v">${compact(rc)}</div></div><div class="kpi" style="--c:var(--bad)"><div class="l">إيصالات صرف</div><div class="v">${compact(py)}</div></div></div><div class="seg" style="margin:16px 0 8px"><button data-act="fin" data-v="exp" class="${S.finTab==='exp'?'on':''}">المصروفات (${ex.length})</button><button data-act="fin" data-v="vou" class="${S.finTab==='vou'?'on':''}">الإيصالات (${vo.length})</button></div>`;
 if(S.finTab==='exp'){const cats={};ex.forEach(x=>cats[x.category||'أخرى']=(cats[x.category||'أخرى']||0)+ +x.amount);const cl=Object.entries(cats).sort((a,b)=>b[1]-a[1]);
  return head+(ex.length?`<div class="card" style="margin-bottom:12px"><div class="legend" style="margin-bottom:10px"><b style="color:var(--tx)">حسب التصنيف</b></div>${cl.map(([c,v])=>`<div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;font-weight:700;margin-bottom:6px"><span><i class="dot" style="background:${catColor(c)};margin-inline-end:8px"></i>${E(c)}</span><span class="num">${n3(v)}</span></div><div class="bar"><i style="width:${v/te*100}%;background:${catColor(c)}"></i></div></div>`).join('')}</div>
  <div class="card list" style="padding:2px 16px">${ex.map(x=>`<div class="row"><div class="av" style="--c:${catColor(x.category||'أخرى')}">${I('wallet')}</div><div class="grow"><div class="t">${E(x.category||'مصروف')}</div><div class="s">${E(x.description||'')} <span class="num">${E(x.created_at.slice(5,16).replace('T',' '))}</span></div></div><div class="amt" style="color:var(--bad)">- ${money(x.amount)}</div></div>`).join('')}</div>`:`<div class="card empty">${I('wallet')}<b>لا توجد مصروفات</b>في هذه الفترة</div>`)}
 return head+(vo.length?`<div class="card list" style="padding:2px 16px">${vo.map(v=>{const rcp=v.kind==='receipt';return`<div class="row"><div class="av" style="--c:${rcp?'var(--ok)':'var(--bad)'}">${I(rcp?'down':'up')}</div><div class="grow"><div class="t">${E(v.party||(rcp?'إيصال قبض':'إيصال صرف'))}</div><div class="s"><span class="num">${E(v.no)}</span> · <span class="num">${E(v.created_at.slice(5,16).replace('T',' '))}</span>${v.note?' · '+E(v.note):''}</div></div><div class="amt" style="color:${rcp?'var(--ok)':'var(--bad)'}">${rcp?'+':'-'} ${money(v.amount)}<small>${rcp?'قبض':'صرف'}</small></div></div>`}).join('')}</div>`:`<div class="card empty">${I('receipt')}<b>لا توجد إيصالات</b>في هذه الفترة</div>`)}

/* ---------- المخزون ---------- */
function stockView(){const low=S.snap.low_stock||[],tot=S.snap.totals||{},top=(S.snap.top30||[]).slice().sort((a,b)=>b.total-a.total);
 return`<div class="kpis" style="grid-template-columns:repeat(3,1fr)"><div class="kpi" style="--c:var(--ok)"><div class="l">قيمة المخزون</div><div class="v">${compact(tot.stock_value||0)}</div></div><div class="kpi" style="--c:var(--pri)"><div class="l">عدد الأصناف</div><div class="v num">${tot.products||0}</div></div><div class="kpi" style="--c:${low.length?'var(--bad)':'var(--ok)'}"><div class="l">منخفضة</div><div class="v num">${low.length}</div></div></div>
 <h2 class="sec">${I('alert')}أصناف تحتاج إعادة طلب</h2>${low.length?`<div class="card list" style="padding:2px 16px">${low.map(x=>{const p=x.min>0?Math.min(100,x.stock/x.min*100):0,out=x.stock<=0;const c=out?'var(--bad)':'var(--warn)';return`<div class="row"><div class="av" style="--c:${c}">${I('box')}</div><div class="grow"><div class="t">${E(x.name)}</div><div class="s">${E(x.sku)} · الحد الأدنى <span class="num">${nf(+x.min,x.min%1?2:0)}</span></div><div class="bar" style="margin-top:7px"><i style="width:${Math.max(3,p)}%;background:${c}"></i></div></div><div class="amt" style="color:${c}"><span class="num">${nf(+x.stock,x.stock%1?2:0)}</span><small>${out?'نفد':E(x.unit||'')}</small></div></div>`}).join('')}</div>`:`<div class="card empty">${I('check')}<b>المخزون بخير</b>لا توجد أصناف منخفضة</div>`}
 ${top.length?`<h2 class="sec">${I('trend')}الأكثر مبيعاً<small>آخر 30 يوماً</small></h2><div class="card list" style="padding:2px 16px">${top.map((t,i)=>`<div class="row"><div class="av">${i+1}</div><div class="grow"><div class="t">${E(t.name)}</div><div class="bar" style="margin-top:7px"><i style="width:${Math.max(4,t.total/top[0].total*100)}%"></i></div></div><div class="amt">${money(t.total)}<small class="num">× ${nf(t.qty,t.qty%1?2:0)}</small></div></div>`).join('')}</div>`:''}
 ${tot.at?`<p style="text-align:center;color:var(--mut);font-size:.78rem;margin:16px 0">آخر تحديث للمخزون: <span class="num">${E(String(tot.at).slice(0,16))}</span></p>`:''}`}

/* ---------- المزيد ---------- */
const ACC={sky:'#38bdf8',emerald:'#34d399',teal:'#2dd4bf',violet:'#a78bfa',rose:'#fb7185',amber:'#fbbf24'};
function moreView(){const st=statusInfo(),t=LS.get('o_theme','dark'),a=LS.get('o_accent','sky');
 return`<div class="card"><div style="display:flex;align-items:center;gap:14px"><div class="logo" style="width:56px;height:56px">${I('store')}</div><div class="grow"><b style="font-size:1.2rem">${E(S.store.name)}</b><div class="sub" style="display:flex;gap:6px;align-items:center;color:var(--mut);font-size:.85rem;margin-top:4px"><i class="dot ${st.c}"></i>${st.t}</div></div></div></div>
 ${S.stores.length>1?`<h2 class="sec">${I('store')}متاجري</h2><div class="card list" style="padding:2px 16px">${S.stores.map(s=>`<button class="row" data-act="store" data-id="${s.id}"><div class="av">${I('store')}</div><div class="grow t">${E(s.name)}</div>${s.id===S.store.id?`<span style="color:var(--pri)">${I('check')}</span>`:''}</button>`).join('')}</div>`:''}
 <h2 class="sec">${I('sun')}المظهر</h2><div class="card"><div class="seg"><button data-act="theme" data-v="dark" class="${t==='dark'?'on':''}">${I('moon')} داكن</button><button data-act="theme" data-v="light" class="${t==='light'?'on':''}">${I('sun')} فاتح</button></div><div style="display:flex;gap:12px;margin-top:16px;flex-wrap:wrap">${Object.entries(ACC).map(([k,c])=>`<button class="sw ${a===k?'on':''}" data-act="accent" data-v="${k}" style="background:${c}" aria-label="${k}"></button>`).join('')}</div></div>
 <h2 class="sec">${I('link')}ربط المنظومة</h2><div class="card list" style="padding:2px 16px">
  <button class="row" data-act="rotate"><div class="av" style="--c:var(--pri)">${I('key')}</div><div class="grow"><div class="t">رمز ربط جديد</div><div class="s">لتغيير جهاز المتجر أو عند ضياع الرمز (يُبطل الرمز القديم)</div></div>${I('chev')}</button>
  <button class="row" data-act="newstore"><div class="av" style="--c:var(--ok)">${I('plus')}</div><div class="grow"><div class="t">إضافة متجر / فرع آخر</div><div class="s">لكل متجر منظومته ورمزه</div></div>${I('chev')}</button></div>
 <h2 class="sec">${I('user')}الحساب</h2><div class="card list" style="padding:2px 16px"><div class="row"><div class="av">${I('user')}</div><div class="grow"><div class="t num" style="direction:ltr;text-align:start">${E(S.sess.user&&S.sess.user.email||'')}</div><div class="s">حساب المالك</div></div></div><button class="row" data-act="logout"><div class="av" style="--c:var(--bad)">${I('logout')}</div><div class="grow t" style="color:var(--bad)">تسجيل الخروج</div></button></div>
 <p style="text-align:center;color:var(--mut);font-size:.78rem;margin:20px 0">تطبيق مالك دلالة · للقراءة فقط — لا يمكنه تعديل بيانات المتجر</p>`}

/* ---------- شاشات الدخول والربط ---------- */
function brand(sub){return`<div class="brand"><div class="logo">${I('store')}</div><h1>دلالة</h1><p class="lead">${sub}</p></div>`}
function setupView(){return`<div class="auth"><div class="box">${brand('إعداد الاتصال بالخادم (مرة واحدة)')}<div class="card"><div class="fld" style="margin-top:0"><label>رابط المشروع (Project URL)</label><input id="su" dir="ltr" placeholder="https://xxxx.supabase.co" value="${E(S.cfg.url)}"></div><div class="fld"><label>مفتاح anon (Publishable key)</label><input id="sk" dir="ltr" placeholder="eyJ…" value="${E(S.cfg.anon)}"></div><div class="err" id="err"></div><button class="btn pri full" data-act="savecfg" style="margin-top:6px">${I('check')} حفظ ومتابعة</button></div></div></div>`}
function authView(){const up=S.authMode==='up';return`<div class="auth"><div class="box">${brand('تابع أرباحك وفواتيرك لحظة بلحظة، من أي مكان')}<div class="card"><div class="seg"><button data-act="amode" data-v="in" class="${!up?'on':''}">دخول</button><button data-act="amode" data-v="up" class="${up?'on':''}">حساب جديد</button></div>
 <div class="fld"><label>البريد الإلكتروني</label><input id="em" type="email" dir="ltr" autocomplete="email" placeholder="name@email.com"></div>
 <div class="fld"><label>كلمة السر</label><div class="pw"><input id="pw" type="password" dir="ltr" autocomplete="${up?'new-password':'current-password'}" placeholder="••••••••"><button type="button" data-act="eye" aria-label="إظهار">${I('eye')}</button></div></div>
 <div class="err" id="err">${E(S.err)}</div><button class="btn pri full" id="go" data-act="auth" style="margin-top:6px">${up?'إنشاء الحساب':'دخول'}</button></div>
 ${S.cfg.url?`<p style="text-align:center;margin-top:16px"><button data-act="resetcfg" style="color:var(--mut);font-size:.8rem">تغيير الخادم</button></p>`:''}</div></div>`}
function linkView(){return`<div class="auth"><div class="box">${brand('أهلاً بك! لنربط متجرك الأول')}<div class="card"><div class="fld" style="margin-top:0"><label>اسم المتجر</label><input id="sn" placeholder="مثال: سوبرماركت النور" maxlength="60"></div><div class="err" id="err"></div><button class="btn pri full" data-act="create" style="margin-top:6px">${I('link')} إنشاء رمز الربط</button></div><ul class="steps"><li>اكتب اسم متجرك واضغط «إنشاء رمز الربط».</li><li>انسخ الرمز الذي سيظهر لك.</li><li>في منظومة دلالة على جهاز المتجر: الإعدادات ← النسخ الاحتياطي ← تطبيق المالك، ثم الصق الرمز.</li></ul><p style="text-align:center;margin-top:10px"><button data-act="logout" style="color:var(--mut);font-size:.85rem">تسجيل الخروج</button></p></div></div>`}
function codeSheet(sid,secret,title){const code='DLALA1:'+b64u({u:S.cfg.url,k:S.cfg.anon,i:sid,s:secret});
 sheet(`<div style="text-align:center"><div class="av" style="--c:var(--ok);margin:0 auto 10px;width:56px;height:56px">${I('key')}</div><h2 style="margin:0 0 6px">${title}</h2><p style="color:var(--mut);margin:0 0 14px;font-size:.9rem">انسخ الرمز الآن — لن يُعرض مرة أخرى لأسباب أمنية</p></div><div class="code" id="codebox">${E(code)}</div><div style="display:flex;gap:10px;margin-top:12px"><button class="btn pri" style="flex:1" data-act="copycode" data-v="${E(code)}">${I('copy')} نسخ الرمز</button>${navigator.share?`<button class="btn" data-act="sharecode" data-v="${E(code)}">${I('share')}</button>`:''}</div>
 <ul class="steps"><li>افتح منظومة دلالة على جهاز المتجر.</li><li>اذهب إلى <b>الإعدادات ← النسخ الاحتياطي ← تطبيق المالك</b>.</li><li>الصق الرمز واضغط «ربط». ستظهر بياناتك هنا خلال ثوانٍ.</li></ul><button class="btn full" data-act="closesheet" style="margin-top:14px">تم</button>`,true)}
function sheet(html,sticky){closeSheet();const b=document.createElement('div');b.className='sheet-b';b.innerHTML=`<div class="sheet"><div class="grab"></div>${html}</div>`;if(!sticky)b.addEventListener('click',e=>{if(e.target===b)closeSheet()});document.body.appendChild(b);return b}
function closeSheet(){$$('.sheet-b').forEach(x=>x.remove())}

/* ============ الأحداث ============ */
function wire(){const q=$('#q');if(q)q.oninput=e=>{S.q=e.target.value;clearTimeout(wire.t);wire.t=setTimeout(()=>{const p=$('#page');if(p){p.innerHTML=page();const n=$('#q');if(n){n.focus();n.setSelectionRange(n.value.length,n.value.length)}}},180)}}
const A={
 tab(v){S.tab=v;LS.set('o_tab',v);window.scrollTo(0,0);render()},
 period(v){S.period=v;LS.set('o_period',v);render()},
 invf(v){S.invF=v;render()},fin(v){S.finTab=v;render()},
 refresh(){loadData(true)},
 inv(_,el){openInv(el.dataset.id)},
 bar(_,el){const i=+el.dataset.i,x=S._chart&&S._chart[i];if(!x)return;$$('.tip').forEach(t=>t.remove());const box=$('#chartbox');const rc=el.getBoundingClientRect(),bc=box.getBoundingClientRect();const t=document.createElement('div');t.className='tip';t.innerHTML=`${dayName(x.d)}<br>مبيعات: <span class="num">${n3(x.s)}</span><br>ربح: <span class="num">${n3(x.p)}</span><br>فواتير: ${x.n}`;box.appendChild(t);let l=rc.left+rc.width/2-bc.left-t.offsetWidth/2;l=Math.max(4,Math.min(bc.width-t.offsetWidth-4,l));t.style.left=l+'px';t.style.top='34px';setTimeout(()=>t.remove(),2600)},
 theme(v){LS.set('o_theme',v);applyTheme();render()},accent(v){LS.set('o_accent',v);applyTheme();render()},
 store(_,el){S.store=S.stores.find(s=>s.id===el.dataset.id);LS.set('o_store',S.store.id);S.daily=[];S.inv=[];S.exp=[];S.vou=[];S.snap={};S.loadedAt=0;S.tab='home';loadData()},
 logout(){S.sess=null;LS.del('o_sess');S.stores=[];S.store=null;S.daily=[];S.inv=[];S.exp=[];S.vou=[];S.snap={};render()},
 amode(v){S.authMode=v;S.err='';render()},
 eye(_,el){const i=$('#pw');i.type=i.type==='password'?'text':'password';el.innerHTML=I(i.type==='password'?'eye':'eyeoff')},
 async auth(){const em=$('#em').value.trim(),pw=$('#pw').value;const e=$('#err'),b=$('#go');if(!em||!pw){e.textContent='اكتب البريد وكلمة السر';return}b.disabled=true;b.textContent='جارٍ…';e.textContent='';
  try{if(S.authMode==='up')await API.signUp(em,pw);else await API.signIn(em,pw);await start()}catch(x){S.err=arErr(x.message);if(x.message==='confirm_email')S.authMode='in';render()}},
 async create(){const n=$('#sn').value.trim();const e=$('#err');if(!n){e.textContent='اكتب اسم المتجر';return}try{const r=await API.rpc('create_store',{p_name:n});const row=Array.isArray(r)?r[0]:r;await loadStores();render();codeSheet(row.store_id,row.secret,'تم إنشاء المتجر');loadData(true)}catch(x){if(NEEDS_SCHEMA(x.message)){e.textContent='';setupSheet()}else e.textContent=arErr(x.message)}},
 async newstore(){const n=prompt('اسم المتجر الجديد');if(!n)return;try{const r=await API.rpc('create_store',{p_name:n});const row=Array.isArray(r)?r[0]:r;await loadStores();const id=row.store_id;S.store=S.stores.find(s=>s.id===id);LS.set('o_store',id);S.daily=[];S.inv=[];S.exp=[];S.vou=[];S.snap={};render();codeSheet(id,row.secret,'تم إنشاء المتجر');loadData(true)}catch(x){if(NEEDS_SCHEMA(x.message))setupSheet();else toast(arErr(x.message))}},
 async rotate(){if(!confirm('سيُبطَل رمز الربط الحالي وتتوقف المنظومة عن الرفع حتى تُدخل الرمز الجديد. متابعة؟'))return;try{const s=await API.rpc('rotate_secret',{p_store:S.store.id});codeSheet(S.store.id,s,'رمز الربط الجديد')}catch(x){toast(arErr(x.message))}},
 copycode(v){copy(v)},copysql(){copy(window.SCHEMA_SQL||'');toast('تم نسخ ملف الإعداد')},sharecode(v){navigator.share({title:'رمز ربط دلالة',text:v}).catch(()=>{})},closesheet(){closeSheet()},
 savecfg(){const u=$('#su').value.trim().replace(/\/$/,''),k=$('#sk').value.trim();if(!/^https:\/\/.+/.test(u)||k.length<20){$('#err').textContent='تأكد من الرابط (يبدأ بـ https://) والمفتاح';return}S.cfg={url:u,anon:k};LS.set('o_url',u);LS.set('o_anon',k);render()},
 resetcfg(){LS.del('o_url');LS.del('o_anon');S.cfg={url:CFG.url||'',anon:CFG.anon||''};render()}
};
document.addEventListener('click',e=>{const el=e.target.closest('[data-act]');if(!el)return;const f=A[el.dataset.act];if(f){f(el.dataset.v,el)}});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&(e.target.id==='pw'||e.target.id==='em')&&$('#go'))A.auth()});

/* ============ التشغيل ============ */
async function start(){if(!S.sess){render();return}try{await loadStores()}catch(e){if(e.offline){S.stores=[];const id=LS.get('o_store');if(id){S.store={id,name:LS.get('o_sname','متجري'),currency:'د.ل'}}}else if(e.status===401){S.sess=null;LS.del('o_sess')}else if(NEEDS_SCHEMA(e.message)){setupSheet()}else toast(arErr(e.message))}
 if(S.store)LS.set('o_sname',S.store.name);render();if(S.store)loadData()}
setInterval(()=>{if(S.sess&&S.store&&!document.hidden&&Date.now()-S.loadedAt>20000)loadData(true)},10000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&S.sess&&S.store&&Date.now()-S.loadedAt>8000)loadData(true)});
window.addEventListener('online',()=>{if(S.sess&&S.store)loadData(true)});
S.stores=S.sess?null:[];render();start();
})();
