const $=id=>document.getElementById(id);
const e=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const TALL=()=>matchMedia('(max-width:720px)').matches;
const N='#0A2947',C='#F3E4C9',B='#8B5E3C',SG='#D3D4C0';
/* ===== Suara & confetti ===== */
let AC=null,SND=true,LX=innerWidth/2,LY=innerHeight/3;
addEventListener('pointerdown',ev=>{LX=ev.clientX;LY=ev.clientY},true);
function ac(){if(!SND)return null;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state=='suspended')AC.resume();return AC}catch(x){return null}}
function tone(f,t0,d,type,v){const a=ac();if(!a)return;const o=a.createOscillator(),g=a.createGain(),s=a.currentTime+t0;o.type=type||'sine';o.frequency.value=f;g.gain.setValueAtTime(0,s);g.gain.linearRampToValueAtTime(v||.12,s+.01);g.gain.exponentialRampToValueAtTime(.0001,s+d);o.connect(g);g.connect(a.destination);o.start(s);o.stop(s+d+.03)}
const SFX={tap(){tone(520,0,.06,'triangle',.08)},ok(){tone(660,0,.13);tone(880,.1,.2)},bad(){tone(220,0,.18,'sawtooth',.08);tone(165,.14,.26,'sawtooth',.08)},found(){tone(440,0,.09,'square',.06);tone(587,.09,.09,'square',.06);tone(784,.18,.2,'square',.06)},win(){[523,659,784,1047,1319].forEach((f,i)=>tone(f,i*.11,.32,'triangle',.13))}};
const play=n=>{if(SND)try{SFX[n]()}catch(x){}};
function toggleS(){SND=!SND;document.querySelectorAll('.snb').forEach(b=>{b.textContent='♪ Suara: '+(SND?'On':'Off');b.setAttribute('aria-pressed',SND)});if(SND)play('tap')}
const CF=$('cf'),cx=CF.getContext('2d');let PA=[],raf=0;
function confetti(n,ox,oy,sp){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;CF.width=innerWidth;CF.height=innerHeight;
const col=[N,B,'#2E9D5B','#E0A030','#FFFFFF','#B3372F'];sp=sp||1;ox=ox==null?LX:ox;oy=oy==null?LY:oy;
for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,s=(Math.random()*7+3)*sp;PA.push({x:ox,y:oy,vx:Math.cos(a)*s,vy:Math.sin(a)*s-5,w:Math.random()*7+5,h:Math.random()*4+3,r:Math.random()*6,vr:(Math.random()-.5)*.4,c:col[i%col.length],l:0})}
if(!raf)raf=requestAnimationFrame(tick)}
function tick(){cx.clearRect(0,0,CF.width,CF.height);PA=PA.filter(p=>p.y<CF.height+30&&p.l<220);
PA.forEach(p=>{p.vy+=.28;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;p.l++;cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.globalAlpha=Math.min(1,(220-p.l)/60);cx.fillRect(-p.w/2,-p.h/2,p.w,p.h);cx.restore()});
raf=PA.length?requestAnimationFrame(tick):0;if(!raf)cx.clearRect(0,0,CF.width,CF.height)}
function finale(){confetti(130,innerWidth*.2,innerHeight*.75,1.3);confetti(130,innerWidth*.8,innerHeight*.75,1.3);setTimeout(()=>confetti(110,innerWidth/2,innerHeight*.3,1.1),350)}
/* ===== Komponen (ikon perangkat) ===== */
const IC={
cloud:`<path d="M-30 14h56a17 17 0 0 0 3-33 24 24 0 0 0-45-7 20 20 0 0 0-14 40z" fill="${C}" stroke="${N}" stroke-width="2.5" stroke-linejoin="round"/>`,
router:`<g stroke="${N}" stroke-linecap="round"><line x1="-26" y1="4" x2="-32" y2="-30" stroke-width="5"/><line x1="26" y1="4" x2="32" y2="-30" stroke-width="5"/></g><rect x="-42" y="2" width="84" height="26" rx="6" fill="${N}"/><g fill="${C}"><circle cx="-28" cy="15" r="3"/><circle cx="-17" cy="15" r="3"/><circle cx="-6" cy="15" r="3"/></g><g fill="${B}"><rect x="10" y="10" width="8" height="10" rx="1"/><rect x="21" y="10" width="8" height="10" rx="1"/><rect x="32" y="10" width="6" height="10" rx="1"/></g>`,
ap:`<path d="M-16-22a22 22 0 0 1 32 0M-9-14a12 12 0 0 1 18 0" fill="none" stroke="${B}" stroke-width="4" stroke-linecap="round"/><ellipse cx="0" cy="12" rx="34" ry="12" fill="${C}" stroke="${N}" stroke-width="2.5"/><ellipse cx="0" cy="7" rx="34" ry="12" fill="${C}" stroke="${N}" stroke-width="2.5"/><circle cx="0" cy="7" r="3.5" fill="${B}"/>`,
pc:`<rect x="-34" y="-30" width="68" height="46" rx="4" fill="${N}"/><rect x="-29" y="-25" width="58" height="36" fill="${C}"/><rect x="-22" y="-18" width="30" height="4" fill="${B}"/><rect x="-22" y="-10" width="42" height="3" fill="${N}" opacity=".4"/><rect x="-22" y="-4" width="36" height="3" fill="${N}" opacity=".4"/><rect x="-5" y="16" width="10" height="9" fill="${N}"/><rect x="-20" y="25" width="40" height="5" rx="2" fill="${N}"/>`,
phone:`<rect x="-19" y="-32" width="38" height="64" rx="8" fill="${N}"/><rect x="-15" y="-25" width="30" height="46" rx="2" fill="${C}"/><path d="M-10-4a14 14 0 0 1 20 0M-6 2a8 8 0 0 1 12 0" fill="none" stroke="${B}" stroke-width="3" stroke-linecap="round"/><circle cx="0" cy="26" r="2.5" fill="${C}"/>`,
unk:`<rect x="-34" y="-30" width="68" height="44" rx="4" fill="${N}" stroke="${B}" stroke-width="3" stroke-dasharray="6 3"/><rect x="-29" y="-25" width="58" height="34" fill="${C}"/><text x="0" y="4" font-size="30" font-weight="700" style="fill:${B}">?</text><path d="M-42 16h84l-7 11h-70z" fill="${C}" stroke="${N}" stroke-width="2.5" stroke-linejoin="round"/>`,
note:`<path d="M-38-32h76v54l-18 14h-58z" fill="${C}" stroke="${N}" stroke-width="2.5" stroke-linejoin="round"/><path d="M20 36v-14h18z" fill="${B}"/><path d="M-13-17a15 15 0 0 1 26 0M-7-10a8 8 0 0 1 14 0" fill="none" stroke="${B}" stroke-width="3.5" stroke-linecap="round"/><circle cx="0" cy="-4" r="2.5" fill="${B}"/><text x="0" y="9" font-size="8" font-weight="700" style="fill:${N}">Password:</text><text x="0" y="21" font-size="9.5" font-weight="700" style="fill:${B}">sekolah123</text>`,
sign:`<rect x="-3" y="8" width="6" height="26" fill="${N}"/><rect x="-14" y="32" width="28" height="4" rx="2" fill="${N}"/><rect x="-37" y="-32" width="74" height="42" rx="6" fill="${C}" stroke="${N}" stroke-width="2.5"/><path d="M-27-13a17 17 0 0 1 24 0M-23-7a10 10 0 0 1 16 0" fill="none" stroke="${B}" stroke-width="3.5" stroke-linecap="round"/><circle cx="-15" cy="0" r="2.6" fill="${B}"/><rect x="8" y="-11" width="18" height="15" rx="2" fill="${B}"/><path d="M12-11v-6a5.5 5.5 0 0 1 10-3" fill="none" stroke="${N}" stroke-width="3" stroke-linecap="round"/>`};
const ico=(n,s)=>`<span class="tile"><svg viewBox="-50 -45 100 90" width="${s||60}" height="${(s||60)*.9}" aria-hidden="true">${IC[n]}</svg></span>`;
/* ===== Data ===== */
const OBJ=[
{id:'pw',ic:'note',n:'Password Wi-Fi',t:1,x:130,y:196,tx:60,ty:144,d:'SSID: SMANSA_WIFI. Password: sekolah123, sudah diketahui banyak orang.',w:'Password sederhana mudah ditebak sehingga meningkatkan risiko akses tidak sah.'},
{id:'open',ic:'sign',n:'Wi-Fi Tamu',t:1,x:630,y:196,tx:300,ty:144,d:'Jaringan "SMANSA_TAMU" bisa dipakai siapa pun tanpa password.',w:'Jaringan terbuka lebih mudah ditemukan dan disambungi siapa saja.'},
{id:'rt',ic:'router',n:'Router',t:0,x:380,y:196,tx:180,ty:144,d:'Router sekolah tersambung ke internet dan bekerja normal.',w:'Perangkat resmi sekolah, bukan masalah.'},
{id:'pc',ic:'pc',n:'PC Lab',t:0,x:200,y:468,tx:60,ty:348,d:'Komputer lab milik sekolah, terdaftar dan dikenal.',w:'Perangkat resmi sekolah, bukan masalah.'},
{id:'hp',ic:'phone',n:'HP Guru',t:0,x:380,y:468,tx:180,ty:348,d:'Ponsel guru Informatika, dikenal oleh tim jaringan.',w:'Perangkat dikenal, bukan masalah.'},
{id:'dev',ic:'unk',n:'Unknown Device',t:1,x:560,y:468,tx:300,ty:348,d:'Sebuah perangkat bernama "UNKNOWN" terhubung ke Wi-Fi sekolah. Tidak ada guru atau murid yang mengenalinya.',w:'Perangkat tidak dikenal berpotensi memperoleh akses tidak sah ke jaringan.'}];
const RK=[{t:'Akses tidak sah ke jaringan',ok:1},{t:'Data berpotensi disalahgunakan',ok:1},{t:'Gangguan konektivitas',ok:1},{t:'Komputer otomatis menjadi lebih cepat',ok:0}];
const RD='Komputer otomatis menjadi lebih cepat';
const P=[
{n:'Perangkat tidak dikenal',ic:'unk',r:'Potensi akses ke jaringan oleh pihak tidak berwenang',
c:[{t:'Password Wi-Fi mudah diketahui sehingga siapa saja bisa menyambung',ok:1,f:'Jalan masuknya adalah password yang lemah dan tersebar.'},{t:'Router sekolah mengalami kerusakan',f:'Router tetap bekerja. Masalahnya ada pada kontrol akses.'},{t:'Jumlah komputer lab terlalu banyak',f:'Komputer resmi tidak menyebabkan perangkat asing masuk.'}],
a:[{t:'Mengeluarkan perangkat lalu memeriksa daftar perangkat terhubung',ok:1,f:'Perangkat asing dikeluarkan dan diperiksa, perangkat sah tetap bisa bekerja.'},{t:'Membiarkan terhubung karena hanya satu perangkat',f:'Satu perangkat asing pun bisa menjadi jalan masuk akses tidak sah.'},{t:'Membagikan password ke lebih banyak orang',f:'Ini memperbesar risiko, bukan menguranginya.'},{t:'Mematikan semua komputer lab',f:'Berlebihan dan menghentikan pembelajaran. Masalah bisa ditangani lebih terarah.'}],
y:'Perangkat asing dikeluarkan dan diperiksa karena berpotensi mengakses jaringan tanpa izin, sehingga risiko akses tidak sah berkurang.',
m:{a:'Mengeluarkan dan memeriksa perangkat asing',b:'Akses tidak sah ke jaringan',c:'Perangkat yang dikeluarkan tidak bisa lagi mengakses jaringan, sehingga risiko berkurang'}},
{n:'Password Wi-Fi sederhana',ic:'note',r:'Akses tidak sah karena password mudah ditebak',
c:[{t:'Password dibuat sederhana dan tidak pernah diganti',ok:1,f:'Password mudah ditebak dan sudah tersebar.'},{t:'Kabel jaringan terlalu panjang',f:'Panjang kabel tidak berkaitan dengan password.'},{t:'Kecepatan internet sekolah terlalu tinggi',f:'Kecepatan tidak menentukan siapa yang boleh terhubung.'}],
a:[{t:'Mengganti dengan password yang lebih kuat',ok:1,f:'Password kuat lebih sulit ditebak.'},{t:'Membagikan password ke lebih banyak orang',f:'Semakin banyak yang tahu, semakin mudah bocor.'},{t:'Menonaktifkan Wi-Fi selamanya',f:'Menghilangkan layanan, bukan mengamankannya.'},{t:'Membiarkan password tetap sama',f:'Password lama sudah diketahui banyak orang.'}],
y:'Password diganti dengan yang lebih kuat karena lebih sulit ditebak, sehingga risiko akses tidak sah berkurang.',
m:{a:'Mengganti dengan password yang lebih kuat',b:'Akses tidak sah ke jaringan',c:'Password kuat lebih sulit ditebak, sehingga risiko berkurang'}},
{n:'Wi-Fi tamu terbuka',ic:'sign',r:'Jaringan mudah ditemukan dan disambungi siapa saja',
c:[{t:'Jaringan tamu tidak diberi password atau pembatasan akses',ok:1,f:'Tanpa kontrol, siapa pun bisa menyambung.'},{t:'Nama Wi-Fi terlalu panjang',f:'Panjang nama tidak memengaruhi keamanan akses.'},{t:'Access point dipasang terlalu banyak',f:'Jumlah access point bukan penyebab akses bebas.'}],
a:[{t:'Memasang password dan membatasi akses jaringan tamu',ok:1,f:'Hanya pengguna yang berhak yang bisa terhubung.'},{t:'Membiarkan terbuka agar praktis',f:'Praktis, tetapi membuka peluang akses tidak sah.'},{t:'Menyebarkan nama Wi-Fi sampai ke luar sekolah',f:'Membuat jaringan makin mudah ditemukan.'},{t:'Menghapus router',f:'Semua koneksi ikut mati.'}],
y:'Jaringan tamu diberi password dan dibatasi karena jaringan terbuka mudah disambungi siapa saja, sehingga risiko akses tidak sah berkurang.',
m:{a:'Memasang password dan membatasi akses',b:'Jaringan bisa disambungi siapa saja (akses tidak sah)',c:'Password dan pembatasan membuat hanya pengguna berhak yang bisa terhubung'}}];
const STEPS=['Briefing','Mission 01 · Detect','Mission 02 · Analyze','Mission 03 · Secure','Final Report'];
const RA=/ganti|ubah|kuat|keluar|blokir|periksa|cek|batas|password|kata sandi|kunci|amankan|enkripsi|nonaktif|hapus|putus|daftar/i;
const RB=/tidak sah|tidak berwenang|orang asing|pihak (luar|asing|lain)|disalahgunakan|dicuri|bocor|diretas|dibobol|disusupi|risiko|bahaya|ancaman|dampak|gangguan|serangan|mengakses|masuk (ke )?jaringan|sembarang/i;
const RC1=/karena|sebab|sehingga|supaya|agar|maka|akibatnya|jadi/i,RC2=/sulit|susah|tidak (mudah|bisa|dapat)|mencegah|menghindari|mengurangi|menutup|membatasi|menghalangi|memperkecil|lebih aman|terlindungi/i;
function ev(t){const a=RA.test(t),b=RB.test(t),c=RC1.test(t)&&RC2.test(t);let l=(a?1:0)+(b?1:0)+(c?1:0);if(t.trim().length<12)l=Math.min(l,1);return{a,b,c,l:Math.max(l,1)}}
const lv=i=>S.rs[i]?S.rs[i].l:0;
const fresh=()=>({v:0,ph:0,i:0,done:{},sel:null,pickK:null,shake:null,A:{},sc:{t:0,r:0,c:0,s:0},rk:[],rkD:false,m2:{},shuf:{},ch:{},ok:{},fbk:{},rs:[],cmp:{},name:'',kelas:'',shufR:null});
let S=fresh(),DR=null;
function side(){$('steps').innerHTML=STEPS.map((s,i)=>`<div class="step ${i<S.v?'ok':i==S.v?'on':''}" ${i==S.v?'aria-current="step"':''}>${i<S.v?'✓ ':i==S.v?'▶ ':'○ '}${s}</div>`).join('');$('pb').style.width=S.v*25+'%'}
function go(v,ph){closeReg();document.body.dataset.v=v;S.v=v;S.ph=ph||0;S.i=0;side();R();$('m').focus();window.scrollTo(0,0);if(v>0)play(v==4?'win':'tap');if(v==4)setTimeout(finale,150)}
function R(){[start,m1,m2,m3,rep][S.v]()}
function sh(key,arr){return S.shuf[key]||(S.shuf[key]=arr.map((x,i)=>i).sort(()=>Math.random()-.5))}
const fmt=x=>(Math.round(x*10)/10).toString();
function start(){
const M=[['Mission 01','Temukan masalah','Periksa diagram jaringan dan tandai komponen yang berisiko.'],['Mission 02','Analisis risiko','Hubungkan masalah dengan risikonya, lalu cari penyebabnya.'],['Mission 03','Amankan jaringan','Pilih tindakan yang tepat dan jelaskan alasannya.'],['Final Report','Laporan hasil','Lihat skor, tinjau alasanmu, dan unduh hasilnya sebagai PDF.']];
$('m').innerHTML=`<div class="dash">
<section class="hero"><div class="hero-t"><span class="tag">⚠ Insiden keamanan terdeteksi</span><h1>Network Security Mission</h1><p class="lead">Ada perangkat asing di Wi-Fi sekolah. Temukan masalahnya, analisis risikonya, lalu amankan jaringan.</p><button id="sb" class="pri big" onclick="openReg()">▶ Mulai Simulasi</button></div>
<div class="hero-art" aria-hidden="true">${['router','note','unk','sign'].map(n=>ico(n,84)).join('')}</div></section>
<section class="mcards" aria-label="Alur simulasi">${M.map((x,i)=>`<div class="mc"><span class="mn">${i+1}</span><div><b>${x[1]}</b><div class="mut sm">${x[2]}</div></div></div>`).join('')}</section>
<section class="case"><b>Case file #01</b><br>08.15, Laboratorium Komputer SMAN 1 Bandung. Beberapa komputer mengalami koneksi internet lambat. Guru menemukan perangkat yang tidak dikenal terhubung ke Wi-Fi sekolah. Password Wi-Fi sederhana dan sudah diketahui banyak orang. Tim jaringan diminta melakukan pemeriksaan.</section>
<div class="dfoot"><span class="mut sm">Data murid tidak disimpan. Hasil hanya lewat unduhan PDF.</span><button class="sb snb" aria-pressed="${SND}" onclick="toggleS()">♪ Suara: ${SND?'On':'Off'}</button></div></div>`}
function openReg(){closeReg();play('tap');const o=document.createElement('div');o.id='reg';o.className='ov';
o.innerHTML=`<div class="dlg" role="dialog" aria-modal="true" aria-labelledby="rgt"><h2 id="rgt">Siapa yang bertugas?</h2><p class="mut" style="margin:0 0 12px">Isi nama dan kelas sebelum memulai simulasi.</p>
<label>Nama<input id="rgn" type="text" autocomplete="off" autocapitalize="words" enterkeyhint="next" maxlength="60" value="${e(S.name)}"></label><label style="margin-top:10px">Kelas<input id="rgk" type="text" autocomplete="off" autocapitalize="characters" enterkeyhint="go" maxlength="20" placeholder="contoh: XI-3" value="${e(S.kelas)}"></label>
<div class="acts"><button onclick="closeReg()">Batal</button><button id="rgo" class="pri" onclick="begin()">Mulai misi</button></div></div>`;
o.addEventListener('input',regOK);
o.addEventListener('keydown',ev=>{if(ev.key=='Escape'){closeReg();return}
if(ev.key=='Enter'&&ev.target.tagName=='INPUT'){ev.preventDefault();if(ev.target.id=='rgn'&&!$('rgk').value.trim())$('rgk').focus();else begin()}
if(ev.key=='Tab'){const f=[...o.querySelectorAll('input,button:not(:disabled)')],a=f[0],z=f[f.length-1];if(ev.shiftKey&&document.activeElement===a){ev.preventDefault();z.focus()}else if(!ev.shiftKey&&document.activeElement===z){ev.preventDefault();a.focus()}}});
o.addEventListener('pointerdown',ev=>{if(ev.target===o)closeReg()});
document.body.appendChild(o);regOK();$(S.name.trim()?'rgk':'rgn').focus()}
function regOK(){const n=$('rgn').value.trim(),k=$('rgk').value.trim();S.name=n;S.kelas=k;$('rgo').disabled=!(n&&k);return !!(n&&k)}
function begin(){if(regOK())go(1)}
function closeReg(){const o=$('reg');if(o){o.remove();const b=$('sb');if(b)b.focus()}}
function m1(){const T=TALL(),f=OBJ.filter(o=>o.t&&S.done[o.id]).length;
const stat=o=>S.done[o.id]?(o.t?'⚠ MASALAH':'✓ AMAN'):(T?'ketuk untuk cek':'ketuk untuk periksa');
const G=T?{vb:'0 0 360 390',w:108,h:84,is:.58,iy:-13,ny:24,sy:37,bx:46,by:-34,br:9,bs:12,bt:-29}:{vb:'0 0 760 528',w:140,h:108,is:.85,iy:-14,ny:34,sy:48,bx:62,by:-46,br:11,bs:14,bt:-41};
const NET=T?[180,42]:[380,60],AP=T?[180,246]:[380,332];
const wired=T?[[180,42,180,144],[180,144,180,246]]:[[380,114,380,142],[380,250,380,278]];
const wl=T?[[60,144,300,144],[180,246,60,348],[180,246,180,348],[180,246,300,348]]:[[200,196,310,196],[450,196,560,196],[380,386,380,400],[200,400,560,400],[200,400,200,414],[380,400,380,414],[560,400,560,414]];
const body=(cls,ic,n,sub)=>`<rect class="${cls}" x="${-G.w/2}" y="${-G.h/2}" width="${G.w}" height="${G.h}" rx="12"/><g transform="translate(0,${G.iy}) scale(${G.is})">${IC[ic]}</g><text class="nm" y="${G.ny}">${n}</text><text class="st" y="${G.sy}">${sub}</text>`;
const stc=(p,ic,n,sub)=>`<g transform="translate(${p[0]},${p[1]})">${body('card0',ic,n,sub)}</g>`;
$('m').innerHTML=`<div class="m1"><div class="m1h"><span class="tag">MISSION 01 · DETECT</span><h2>Temukan minimal dua masalah keamanan</h2><p class="mut">${T?'Ketuk komponen pada diagram, lalu nilai: masalah atau aman?':'Pilih komponen pada diagram (bisa dengan Tab + Enter), lalu nilai: masalah atau aman?'}</p></div>
<div class="m1b"><div class="m1d"><svg class="net ${T?'tall':''}" viewBox="${G.vb}" role="group" aria-label="Diagram jaringan sekolah">${wired.map(l=>`<line x1="${l[0]}" y1="${l[1]}" x2="${l[2]}" y2="${l[3]}" stroke="${N}" stroke-width="3.5"/>`).join('')}${wl.map(l=>`<line x1="${l[0]}" y1="${l[1]}" x2="${l[2]}" y2="${l[3]}" stroke="${B}" stroke-width="3" stroke-dasharray="7 6"/>`).join('')}
${stc(NET,'cloud','INTERNET','jaringan luar')}${stc(AP,'ap','Access Point','titik akses Wi-Fi')}
${OBJ.map(o=>{const d=S.done[o.id],cl=d?(o.t?'t':'s'):'',p=T?[o.tx,o.ty]:[o.x,o.y];return`<g class="c ${cl} ${S.sel==o.id?'sel':''}" transform="translate(${p[0]},${p[1]})" data-id="${o.id}" tabindex="0" role="button" aria-label="${o.n}, status: ${stat(o)}" onclick="pickO('${o.id}')" onkeydown="if(event.key=='Enter'||event.key==' '){event.preventDefault();pickO('${o.id}')}">${body('hit',o.ic,o.n,stat(o))}${d?`<circle cx="${G.bx}" cy="${G.by}" r="${G.br}" fill="${o.t?'#B3372F':'#1F6E3E'}"/><text x="${G.bx}" y="${G.bt}" style="fill:#fff;font-size:${G.bs}px;font-weight:700">${o.t?'!':'✓'}</text>`:''}</g>`}).join('')}</svg></div>
<div class="m1p"><div class="alert" role="status">⚠ ${T?f+'/3 masalah ditemukan':f+' dari 3 masalah keamanan ditemukan'}</div>
<div id="pn" class="fb ${S.sel?'':'empty'}" role="status" aria-live="polite">${S.sel?panel(S.sel):'Pilih komponen pada diagram untuk memeriksanya.'}</div>
<button class="pri" ${f<2?'disabled':''} onclick="go(2)">${f<2?(T?'Temukan 2 dulu':'Temukan minimal 2 masalah dulu'):(T?'Lanjut →':'Lanjut ke Mission 02 →')}</button></div></div></div>`}
function panel(id){const o=OBJ.find(x=>x.id==id),X='<button class="pclose" onclick="closeP()" aria-label="Tutup panel">✕ Tutup</button>';
if(S.done[id])return `${X}<b>${o.n}</b><br>${o.d}<br><br>${o.t?'<span class="x">⚠ Potential security risk.</span> ':'<span class="y">✓ Aman.</span> '}${o.w}`;
return `${X}<b>${o.n}</b><br>${o.d}<br><br>Apakah ini masalah keamanan?<div class="jrow"><button onclick="judge('${id}',1)"><span class="x">⚠ Masalah</span></button><button onclick="judge('${id}',0)"><span class="y">✓ Aman</span></button></div>${S.fbk['o'+id]||''}`}
function closeP(){S.sel=null;play('tap');m1()}
function pickO(id){S.sel=id;play('tap');m1();document.querySelector(`[data-id="${id}"]`).focus({preventScroll:true})}
function judge(id,v){const o=OBJ.find(x=>x.id==id),k='o'+id;S.A[k]=(S.A[k]||0)+1;
if(!!o.t==!!v){S.done[id]=1;if(o.t)S.sc.t+=1/S.A[k];S.fbk[k]='';m1();$('pn').insertAdjacentHTML('afterbegin','<b class="y">✓ Tepat!</b> ');document.querySelector(`[data-id="${id}"]`).focus({preventScroll:true});play(o.t?'found':'ok');confetti(o.t?60:30)}
else{S.fbk[k]='<div class="fb no"><span class="x">✗ Belum tepat.</span> Baca lagi deskripsinya dan pikirkan dampaknya bagi jaringan.</div>';$('pn').innerHTML=panel(id);play('bad')}}
function m2(){const h=[['2A · RISIKO','Pilih semua risiko dari perangkat asing yang terhubung'],['2B · HUBUNGKAN','Hubungkan MASALAH dengan RISIKO'],['2C · PENYEBAB','Apa penyebab tiap masalah?']][S.ph];let b='';const same=S._p===S.ph,y0=scrollY;S._p=S.ph;
if(S.ph==0){const hit=S.rk.filter(i=>RK[i].ok).length,bad=S.rk.filter(i=>!RK[i].ok).length;
b=`<div class="scene">${ico('unk',64)}<div><b>Perangkat asing terhubung ke jaringan</b><br><span class="mut">Boleh pilih lebih dari satu risiko.</span></div></div>`+RK.map((r,i)=>`<button class="opt" aria-pressed="${S.rk.includes(i)}" ${S.rkD?'disabled':''} onclick="tg(${i})">${S.rk.includes(i)?'☑':'☐'} ${r.t}${S.rkD?(r.ok?' — <span class="y">✓ risiko</span>':' — <span class="x">✗ bukan risiko</span>'):''}</button>`).join('')+
(S.rkD?`<div class="fb ${hit==3&&!bad?'ok':'no'}" role="status"><b>${hit}/3 risks identified</b>${bad?'<br>Ada pilihan yang bukan risiko.':''}${hit<3?'<br>Risiko yang terlewat ditandai "✓ risiko" di atas.':''}</div><p><button class="pri" onclick="S.ph=1;m2()">Lanjut →</button></p>`:`<p><button class="pri" ${S.rk.length?'':'disabled'} onclick="subR()">Submit</button></p>`)}
if(S.ph==1){const rs=S.shufR||(S.shufR=[...P.map(p=>p.r),RD].sort(()=>Math.random()-.5));const used=Object.values(S.m2),all=P.every((p,i)=>S.m2[i]!==undefined);
b=`<p class="mut">Ketuk satu kartu risiko di bagian bawah, lalu ketuk kotak masalah yang cocok. Kartu juga bisa diseret.</p>
${P.map((p,i)=>{const f=S.m2[i]!==undefined;return`<div class="pcard"><div class="pc-h">${ico(p.ic,58)}<span>${p.n}</span></div><div class="slot ${f?'full':''} ${!f&&S.pickK!==null?'ready':''} ${S.shake===i?'shake':''}" data-i="${i}" tabindex="0" role="button" aria-label="Kotak risiko untuk ${p.n}" onclick="slotClick(${i})" onkeydown="if(event.key=='Enter'||event.key==' '){event.preventDefault();slotClick(${i})}">${f?'✓ '+rs[S.m2[i]]:(S.pickK!==null?'Ketuk di sini untuk menaruh kartu':'⬇ Taruh kartu risiko di sini')}</div></div>`}).join('')}
<div class="dock"><div class="fb" role="status" aria-live="polite">${S.fbk.m2||'Setiap masalah punya dampak sebab-akibat yang berbeda.'}</div><div class="mut dkh"><b>Kartu risiko</b>${S.pickK!==null?' · satu kartu dipilih':''}</div><div class="pool">${rs.map((r,k)=>used.includes(k)?'':`<button class="chip ${S.pickK===k?'sel':''}" onpointerdown="dstart(event,${k})" onclick="if(event.detail===0){S.pickK=${k};m2()}"><span class="grip">⠿</span>${r}</button>`).join('')||'<span class="mut">Semua kartu sudah terpasang.</span>'}</div></div><p><button class="pri" ${all?'':'disabled'} onclick="S.ph=2;play('tap');m2()">Lanjut →</button></p>`}
if(S.ph==2){const all=P.every((p,i)=>S.ok['c'+i]);
b=P.map((p,i)=>`<div class="pcard col"><div class="pc-h">${ico(p.ic,52)}<span>${p.n}: apa penyebabnya?</span></div><div>${mcq('c'+i)}</div></div>`).join('')+`<p><button class="pri" ${all?'':'disabled'} onclick="go(3)">Lanjut ke Mission 03 →</button></p>`}
$('m').innerHTML=`<span class="tag">MISSION 02 · ${h[0]}</span><h2>${h[1]}</h2>`+b;S.shake=null;same?scrollTo(0,y0):scrollTo(0,0)}
function tg(i){const k=S.rk.indexOf(i);k<0?S.rk.push(i):S.rk.splice(k,1);play('tap');m2()}
function subR(){S.rkD=true;const hit=S.rk.filter(i=>RK[i].ok).length,bad=S.rk.filter(i=>!RK[i].ok).length;m2();if(hit==3&&!bad){play('ok');confetti(50)}else play('bad')}
function slotClick(i){if(S.pickK!==null&&S.m2[i]===undefined)drop(i,S.pickK);else if(S.pickK===null){S.fbk.m2='Pilih dulu satu kartu risiko di bawah.';m2()}}
function drop(i,k){const key='r'+i;S.A[key]=(S.A[key]||0)+1;S.pickK=null;let good=false;
if(S.shufR[k]==P[i].r){good=true;S.m2[i]=k;S.sc.r+=1/S.A[key];S.fbk.m2='<span class="y">✓ Tepat!</span> Risikonya: '+P[i].r+'.'}
else{S.shake=i;S.fbk.m2='<span class="x">✗ '+(S.shufR[k]==RD?'Perangkat asing atau password lemah tidak membuat komputer lebih cepat.':'Belum sesuai. Pikirkan dampak langsung dari masalah tersebut.')+'</span> Kartu kembali ke bawah.'}
m2();play(good?'ok':'bad');if(good)confetti(45)}
function dstart(ev,k){ev.preventDefault();const el=ev.currentTarget,r=el.getBoundingClientRect(),g=el.cloneNode(true);g.className='chip ghost';g.style.width=r.width+'px';document.body.appendChild(g);
DR={k,el,g,ox:ev.clientX-r.left,oy:ev.clientY-r.top,sx:ev.clientX,sy:ev.clientY,mv:false,up:ev.pointerType=='touch'?56:0,x:ev.clientX,y:ev.clientY};el.classList.add('lift');dmove(ev);play('tap');
addEventListener('pointermove',dmove);addEventListener('pointerup',dend);addEventListener('pointercancel',dend);
DR.t=setInterval(()=>{if(DR&&DR.y<110&&scrollY>0){scrollBy(0,-14);dmove({clientX:DR.x,clientY:DR.y})}},16)}
function under(ev){DR.g.style.display='none';const t=document.elementFromPoint(ev.clientX,ev.clientY-DR.up);DR.g.style.display='';return t&&t.closest('.slot:not(.full)')}
function dmove(ev){DR.g.style.left=ev.clientX-DR.ox+'px';DR.g.style.top=ev.clientY-DR.oy-DR.up+'px';DR.x=ev.clientX;DR.y=ev.clientY;if(Math.abs(ev.clientX-DR.sx)+Math.abs(ev.clientY-DR.sy)>6)DR.mv=true;
document.querySelectorAll('.slot').forEach(s=>s.classList.remove('over'));const t=under(ev);if(t)t.classList.add('over')}
function dend(ev){removeEventListener('pointermove',dmove);removeEventListener('pointerup',dend);removeEventListener('pointercancel',dend);
const t=ev.type=='pointerup'?under(ev):null,k=DR.k,mv=DR.mv;DR.g.remove();clearInterval(DR.t);DR=null;
if(t)drop(+t.dataset.i,k);else if(!mv){S.pickK=S.pickK===k?null:k;S.fbk.m2=S.pickK===null?'':'Kartu dipilih. Sekarang ketuk kotak masalah yang cocok.';m2()}else m2()}
function O(key){return P[+key[1]][key[0]]}
function mcq(key){const os=O(key);return sh(key,os).map((k,n)=>{const c=S.ch[key+k];return`<button class="opt ${c||''}" ${S.ok[key]?'disabled':''} onclick="po('${key}',${k})"><b>${'ABCD'[n]}.</b> ${os[k].t}${c=='ok'?' ✓':c=='no'?' ✗':''}</button>`}).join('')+`<div role="status" aria-live="polite">${S.fbk[key]?`<div class="fb ${S.ok[key]?'ok':'no'}">${S.fbk[key]}</div>`:''}</div>`}
function po(key,k){const o=O(key)[k];S.A[key]=(S.A[key]||0)+1;S.ch[key+k]=o.ok?'ok':'no';
if(o.ok){S.ok[key]=1;S.sc[key[0]=='c'?'c':'s']+=1/S.A[key];S.fbk[key]='<b class="y">✓ Tepat.</b> '+o.f}else S.fbk[key]='<b class="x">✗ Belum tepat.</b> '+o.f;
const y=window.scrollY;R();window.scrollTo(0,y);play(o.ok?'ok':'bad');if(o.ok)confetti(40)}
function ckl(r){const f=(v,t)=>`<li><span class="${v?'y':'x'}">${v?'✓':'✗'}</span> ${t}</li>`;return`<ul class="ck">${f(r.a,'Menyebut tindakan')}${f(r.b,'Menyebut risiko atau dampak')}${f(r.c,'Menjelaskan sebab-akibat (mengapa tindakan itu mengurangi risiko)')}</ul>`}
function cmp(){S.cmp[S.i]=!S.cmp[S.i];play('tap');m3()}
function cmpBox(i){const p=P[i],r=S.rs[i],m=p.m,c=v=>v?'<span class="y">✓ ada</span>':'<span class="x">✗ belum</span>';
return`<div class="fb"><div class="cols"><div><b>Jawabanmu</b><p style="margin:4px 0">${e(r.t)}</p></div><div><b>Contoh jawaban</b><p style="margin:4px 0">${p.y}</p></div></div>
<table><tr><th>Kriteria</th><th>Di jawabanmu</th><th>Di contoh jawaban</th></tr><tr><td>Tindakan</td><td>${c(r.a)}</td><td>${m.a}</td></tr><tr><td>Risiko/dampak</td><td>${c(r.b)}</td><td>${m.b}</td></tr><tr><td>Sebab-akibat</td><td>${c(r.c)}</td><td>${m.c}</td></tr></table>
<div class="mut" style="margin-top:6px">Jawabanmu tidak harus sama persis. Yang penting ketiga kriteria terpenuhi.</div></div>`}
function m3(){const y0=scrollY,p=P[S.i],k='a'+S.i,ok=S.ok[k],rs=S.rs[S.i];let b='';
if(ok&&!rs)b=`<p><b>Mengapa tindakan tersebut meningkatkan keamanan jaringan?</b></p><textarea id="why" aria-label="Alasan" placeholder="Tulis alasanmu: apa tindakannya, apa risikonya, dan mengapa tindakan itu efektif..."></textarea><p><button class="pri" onclick="sub()">Kirim alasan</button></p><p id="wm" class="mut" role="status"></p>`;
if(rs){b=`<div class="fb"><b>Alasanmu:</b> ${e(rs.t)}<br><b>Level alasan: ${lv(S.i)}/3</b>${ckl(rs)}${lv(S.i)<3?'<span class="mut">Naikkan levelnya dengan melengkapi poin yang bertanda ✗.</span>':''}</div>
<p class="sec"><button aria-expanded="${!!S.cmp[S.i]}" onclick="cmp()">${S.cmp[S.i]?'Sembunyikan perbandingan':'Bandingkan dengan contoh jawaban'}</button></p>${S.cmp[S.i]?cmpBox(S.i):''}
<p><button class="pri" onclick="nx()">${S.i<2?'Kasus berikutnya →':'Lihat Final Report →'}</button></p>`}
$('m').innerHTML=`<span class="tag">MISSION 03 · SECURE · ${S.i+1}/3</span><div class="pc-h" style="margin-bottom:8px">${ico(p.ic,64)}<h2 style="margin:0">${p.n}</h2></div><p>Kamu tim keamanan jaringan. Apa tindakan yang akan kamu ambil?</p>${mcq(k)}${b}`;scrollTo(0,y0)}
function sub(){const t=$('why').value;if(t.trim().length<12){$('wm').textContent='Tulis alasan minimal satu kalimat.';return}S.rs[S.i]=Object.assign({t:t.trim()},ev(t));m3();if(S.rs[S.i].l==3){play('win');confetti(110,innerWidth/2,innerHeight*.4,1.2)}else play('ok')}
function nx(){play('tap');if(S.i<2){S.i++;m3();window.scrollTo(0,0)}else go(4)}
function rep(){const s=S.sc,pct=Math.round((s.t+s.r+s.c+s.s)/12*100),q=[0,1,2].reduce((a,i)=>a+lv(i),0);
$('m').innerHTML=`<div class="center"><span class="tag">MISSION COMPLETE</span><p class="mut" style="margin:0">${e(S.name)} ${e(S.kelas)}</p></div>
<div class="rep"><div class="grid5">${[['THREATS FOUND',fmt(s.t)+'/3'],['RISKS ANALYZED',fmt(s.r)+'/3'],['CAUSES IDENTIFIED',fmt(s.c)+'/3'],['SOLUTIONS CHOSEN',fmt(s.s)+'/3'],['KUALITAS ALASAN',q+'/9']].map(x=>`<div class="sc"><small>${x[0]}</small><b>${x[1]}</b></div>`).join('')}</div>
<div class="scorebar"><span>SECURITY SCORE</span><div class="track"><i style="width:${pct}%"></i></div><b>${pct}%</b></div></div>
<p class="center">You successfully analyzed the network security problem.</p><p class="mut center">Skor hanya gamifikasi, bukan nilai akademik. Percobaan ulang mengurangi poin sebagian.</p>
<h2>Alasanmu</h2>${P.map((p,i)=>`<div class="fb"><div class="pc-h" style="margin-bottom:6px">${ico(p.ic,40)}<span>${p.n}</span></div>${S.rs[i]?e(S.rs[i].t)+'<br><b>Level '+lv(i)+'/3</b>'+ckl(S.rs[i]):'-'}</div>`).join('')}
<p class="btnrow"><button class="pri" id="dl" onclick="pdf()">⬇ Unduh hasil (PDF)</button> <button onclick="S=fresh();go(0)">Ulangi misi</button></p><p id="cm" class="mut" role="status"></p>`;
}
/*PDF_START*/
function buildPDF(J,D){
const d=new J({unit:'pt',format:'a4'}),W=595.28,H=841.89,M=42,CW=W-2*M;
const N=[10,41,71],CR=[243,228,201],SG=[211,212,192],BR=[139,94,60],OK=[31,110,62],BD=[179,55,47],WH=[255,255,255];
const cl=x=>String(x==null?'':x).replace(/[^\u0020-\u007E\u00A0-\u00FF\n]/g,'');
let y=0;
const fill=c=>d.setFillColor(c[0],c[1],c[2]),ink=c=>d.setTextColor(c[0],c[1],c[2]),strk=c=>d.setDrawColor(c[0],c[1],c[2]);
const font=(sz,b)=>{d.setFont('helvetica',b?'bold':'normal');d.setFontSize(sz)};
const lines=(t,w,sz,b)=>{font(sz,b);return d.splitTextToSize(cl(t),w)};
const page=()=>{fill(CR);d.rect(0,0,W,H,'F')};
const need=h=>{if(y+h>H-46){d.addPage();page();y=M}};
const put=(t,x,yy,sz,b,c,o)=>{font(sz,b);ink(c||N);d.text(cl(t),x,yy,Object.assign({baseline:'top'},o||{}))};
const para=(ls,x,yy,sz,lh,c,b)=>{font(sz,b);ink(c||N);ls.forEach((l,k)=>d.text(l,x,yy+k*lh,{baseline:'top'}))};
const mark=(cx,cy,ok)=>{fill(ok?OK:BD);d.circle(cx,cy,6,'F');strk(WH);d.setLineWidth(1.6);if(ok){d.line(cx-2.8,cy,cx-.7,cy+2.5);d.line(cx-.7,cy+2.5,cx+3.1,cy-2.4)}else{d.line(cx-2.5,cy-2.5,cx+2.5,cy+2.5);d.line(cx-2.5,cy+2.5,cx+2.5,cy-2.5)}d.setLineWidth(.5)};
page();fill(BR);d.rect(0,0,W,80,'F');
put('NETWORK SECURITY MISSION',M,22,20,1,CR);put('Secure the School Network  |  Laporan Hasil Belajar',M,50,10,0,CR);put('ATP 10.5.7',W-M,26,9,1,CR,{align:'right'});
y=80+16;
fill(SG);d.roundedRect(M,y,CW,46,8,8,'F');
[['NAMA',D.name||'-'],['KELAS',D.kelas||'-'],['TANGGAL',D.date]].forEach((f,k)=>{const x=M+14+k*(CW/3);put(f[0],x,y+9,7.5,1,N);put(lines(f[1],CW/3-24,11.5,1)[0],x,y+22,11.5,1,N)});
y+=46+10;
const cw=(CW-32)/5;
[['THREATS','t'],['RISKS','r'],['CAUSES','c'],['SOLUTIONS','s']].map(x=>[x[0],D.fmt(D.sc[x[1]])+'/3']).concat([['ALASAN',D.q+'/9']]).forEach((c,k)=>{const x=M+k*(cw+8);fill(SG);d.roundedRect(x,y,cw,48,8,8,'F');put(c[0],x+11,y+9,7.5,1,N);put(c[1],x+11,y+22,18,1,N)});
y+=48+10;
fill(SG);d.roundedRect(M,y,CW,40,8,8,'F');put('SECURITY SCORE',M+14,y+9,7.5,1,N);put('Gamifikasi, bukan nilai akademik',M+14,y+22,8,0,N);
const bx=M+160,bw=CW-160-74;fill(CR);d.roundedRect(bx,y+15,bw,11,5.5,5.5,'F');fill(N);if(D.pct>0)d.roundedRect(bx,y+15,Math.max(11,bw*D.pct/100),11,5.5,5.5,'F');
put(D.pct+'%',W-M-14,y+9,20,1,N,{align:'right'});
y+=40+16;
put('Rincian per masalah',M,y,12,1,N);y+=17;strk(BR);d.setLineWidth(1);d.line(M,y,W-M,y);d.setLineWidth(.5);y+=10;
D.items.forEach((it,i)=>{
const lx=M+14,lw=64,vx=lx+lw+6,vw=CW*.62-lw-6-8,rx=M+CW*.68,LH=12.5;
const A=lines(it.action,vw,9.5,0),Cs=lines(it.cause,vw,9.5,0),RS=lines(it.reason||'Belum diisi.',vw-14,9.5,0);
const hA=A.length*LH+5,hC=Cs.length*LH+5,hR=RS.length*LH+12;
const left=hA+hC+hR,right=14+3*19;
const h=24+8+Math.max(left,right)+6;
need(h);
fill(SG);d.roundedRect(M,y,CW,h,9,9,'F');fill(BR);d.roundedRect(M,y,CW,24,9,9,'F');
put((i+1)+'.  '+it.title,M+14,y+6.5,11.5,1,CR);
const col=it.level==3?OK:it.level==2?BR:BD;fill(CR);d.roundedRect(W-M-82,y+4,72,16,8,8,'F');put('Level '+it.level+' / 3',W-M-46,y+8,9,1,col,{align:'center'});
let yy=y+24+8;
put('Tindakan',lx,yy+1,8.5,1,N);para(A,vx,yy,9.5,LH,N,0);yy+=hA;
put('Penyebab',lx,yy+1,8.5,1,N);para(Cs,vx,yy,9.5,LH,N,0);yy+=hC;
put('Alasan',lx,yy+4,8.5,1,N);fill(CR);d.roundedRect(vx-4,yy,vw+8,hR-2,5,5,'F');fill(BR);d.rect(vx-4,yy+3,2.5,hR-8,'F');para(RS,vx+6,yy+6,9.5,LH,N,0);
let ry=y+24+8;put('PENILAIAN',rx,ry,7.5,1,N);ry+=14;
[['Tindakan',it.a],['Risiko / dampak',it.b],['Sebab-akibat',it.c]].forEach(c=>{mark(rx+6,ry+6,c[1]);put(c[0],rx+18,ry+2,9.5,0,N);ry+=19});
y+=h+6});
const rub=[['1','Hanya menyebut tindakan, atau alasan belum jelas.'],['2','Tindakan + risiko/dampak, belum menjelaskan mengapa tindakan efektif.'],['3','Tindakan + risiko + sebab-akibat (mengapa tindakan mengurangi risiko).']];
const rw=(CW-28-16)/3,rls=rub.map(r=>lines(r[1],rw-24,8.5,0)),rh=36+Math.max(...rls.map(l=>l.length))*11+10;
need(rh+4);y+=4;fill(SG);d.roundedRect(M,y,CW,rh,9,9,'F');put('Rubrik penilaian alasan',M+14,y+10,10,1,N);
rub.forEach((r,k)=>{const x=M+14+k*(rw+8),ry=y+30;fill(k==2?OK:k==1?BR:BD);d.circle(x+8,ry+8,8,'F');put(r[0],x+8,ry+3.5,9.5,1,WH,{align:'center'});para(rls[k],x+22,ry+2,8.5,11,N,0)});
const n=d.getNumberOfPages();for(let p=1;p<=n;p++){d.setPage(p);strk(BR);d.setLineWidth(.6);d.line(M,H-38,W-M,H-38);put('Network Security Mission  |  '+(D.name||''),M,H-30,8,0,N);put('Halaman '+p+' / '+n,W-M,H-30,8,0,BR,{align:'right'})}
return d}
/*PDF_END*/
async function pdf(){const m=$('cm');
if(!window.jspdf){m.textContent='Pembuat PDF belum termuat. Periksa koneksi internet lalu coba lagi.';return}
let dl=null;try{dl=await window.claude.use('downloads')}catch(x){}
const s=S.sc,q=[0,1,2].reduce((a,i)=>a+lv(i),0);
const D={name:S.name,kelas:S.kelas,date:new Date().toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'}),sc:s,fmt,q,pct:Math.round((s.t+s.r+s.c+s.s)/12*100),
items:P.map((p,i)=>{const r=S.rs[i]||{};return{title:p.n,action:p.a.find(o=>o.ok).t,cause:p.c.find(o=>o.ok).t,reason:r.t,level:lv(i)||1,a:!!r.a,b:!!r.b,c:!!r.c}})};
const fn='Hasil-Network-Security-Mission-'+(S.name||'siswa').replace(/[^A-Za-z0-9]+/g,'-')+'.pdf';
try{const doc=buildPDF(window.jspdf.jsPDF,D);
if(dl){await dl.save({filename:fn,data:doc.output('blob')});m.textContent='✓ PDF disimpan.'}
else{doc.save(fn);m.textContent='✓ PDF diunduh. Jika tidak muncul, buka halaman ini di tab sendiri (bukan pratinjau).'}}
catch(x){m.textContent=x&&x.code=='declined'?'Unduhan dibatalkan.':'PDF gagal dibuat. Coba lagi.'}}
let LK=TALL()+'|'+matchMedia('(max-height:520px)').matches,RT=0;
addEventListener('resize',()=>{clearTimeout(RT);RT=setTimeout(()=>{const k=TALL()+'|'+matchMedia('(max-height:520px)').matches;if(k!==LK){LK=k;if(S.v==1&&!DR)m1()}},150)});
addEventListener('keydown',ev=>{if(ev.key=='Escape'&&S.v==1&&S.sel&&!$('reg'))closeP()});
go(0);
