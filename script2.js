(function(){
  var ITEMS=[
    {id:1,name:'Yonex Astrox badminton racket',cat:'Sports',tags:'badminton racket bat shuttle play sports',price:80,dep:500,km:0.4,owner:'Rohit S.',rating:4.8},
    {id:2,name:'Li-Ning racket pair with shuttles',cat:'Sports',tags:'badminton racket bat shuttle pair sports',price:120,dep:600,km:0.9,owner:'Neha K.',rating:4.9},
    {id:3,name:'Cosco beginner badminton racket',cat:'Sports',tags:'badminton racket bat beginner',price:40,dep:200,km:1.6,owner:'Aman V.',rating:4.5},
    {id:4,name:'Wilson tennis racket',cat:'Sports',tags:'tennis racket bat sports',price:90,dep:600,km:2.4,owner:'Simran B.',rating:4.7},
    {id:5,name:'Bosch cordless drill machine',cat:'Tools',tags:'drill machine driver tool wall hole bosch',price:150,dep:1000,km:0.7,owner:'Harpreet G.',rating:4.9},
    {id:6,name:'Stanley hammer drill kit',cat:'Tools',tags:'drill machine hammer tool kit',price:180,dep:1200,km:1.8,owner:'Vikas M.',rating:4.6},
    {id:7,name:'Aluminium ladder, 8 ft',cat:'Tools',tags:'ladder climb tool home',price:100,dep:800,km:1.1,owner:'Deepak R.',rating:4.7},
    {id:8,name:'Canon 1500D DSLR with 18-55 lens',cat:'Cameras',tags:'dslr camera canon photo lens photography',price:600,dep:5000,km:1.3,owner:'Ishaan T.',rating:4.9},
    {id:9,name:'Tripod, 5 ft adjustable',cat:'Cameras',tags:'tripod camera stand photo video',price:80,dep:500,km:0.6,owner:'Pooja L.',rating:4.6},
    {id:10,name:'4-person camping tent',cat:'Outdoor',tags:'camping tent camp trek outdoor sleep',price:250,dep:1500,km:2.1,owner:'Karan D.',rating:4.8},
    {id:11,name:'JBL party speaker',cat:'Party',tags:'speaker music sound party jbl bluetooth',price:350,dep:2000,km:0.8,owner:'Mehak A.',rating:4.8},
    {id:12,name:'Full HD projector with screen',cat:'Party',tags:'projector screen movie presentation party',price:500,dep:3000,km:1.9,owner:'Gagan P.',rating:4.7},
    {id:13,name:'Acoustic guitar with capo',cat:'Music',tags:'guitar acoustic music instrument',price:200,dep:1500,km:1.4,owner:'Lakshay N.',rating:4.7},
    {id:14,name:'Geared cycle, 21 speed',cat:'Cycles',tags:'cycle bicycle bike ride gear',price:120,dep:1500,km:2.7,owner:'Tanvi C.',rating:4.6}
  ];
  ITEMS.forEach(function(i){i.sample=true;i.photos=[]});
  var nextId=100;
  var CATS=['Sports gear','Power tools','Cameras','Camping','Party sound','Guitars','Cycles','Projectors','Ladders','Tripods'];
  var CATQ={'Sports gear':'racket','Power tools':'drill machine','Cameras':'camera','Camping':'tent','Party sound':'speaker','Guitars':'guitar','Cycles':'cycle','Projectors':'projector','Ladders':'ladder','Tripods':'tripod'};
  var SYN={bat:'racket',rackets:'racket',cameras:'camera',drills:'drill',tents:'tent',speakers:'speaker',bike:'cycle',bicycle:'cycle',photo:'camera',music:'speaker',guitars:'guitar'};
  var STOP={a:1,an:1,the:1,for:1,i:1,need:1,want:1,to:1,rent:1,of:1,some:1,my:1,one:1,day:1,and:1,with:1};
  var COLORS=['#BFE8D4','#FFD2BD','#C9DAFF','#DCCFFF','#FFC9DD','#BDE6EE'];
  var TINT={Sports:'#F2692D',Tools:'#D99A00',Cameras:'#5B6CFF',Outdoor:'#1FA971',Party:'#E5489B',Music:'#8B5CF6',Cycles:'#11A3B5',Other:'#64748B'};
  var ICON={
    Sports:'<ellipse cx="38" cy="25" rx="15" ry="19" transform="rotate(35 38 25)"/><path d="M28 37L11 56M31 13l16 24M24 21l18 14"/>',
    Tools:'<path d="M9 21h31a6 6 0 0 1 6 6v7H9z"/><path d="M46 27h12M19 34l-3 19h11l2-19"/>',
    Cameras:'<rect x="7" y="20" width="50" height="32" rx="6"/><circle cx="32" cy="36" r="9"/><path d="M22 20l3-7h14l3 7"/>',
    Outdoor:'<path d="M5 52L32 12l27 40z"/><path d="M32 12v40M23 52l9-17 9 17"/>',
    Party:'<rect x="15" y="7" width="34" height="50" rx="7"/><circle cx="32" cy="21" r="4"/><circle cx="32" cy="40" r="10"/>',
    Music:'<circle cx="23" cy="42" r="12"/><circle cx="23" cy="42" r="3"/><path d="M31 34l22-22M49 7l8 8"/>',
    Cycles:'<circle cx="15" cy="43" r="10"/><circle cx="49" cy="43" r="10"/><path d="M15 43l11-19h16l7 19M26 24l9 19M38 24l-2-7h-7"/>',
    Other:'<path d="M7 20l25-13 25 13v25L32 58 7 45z"/><path d="M7 20l25 13 25-13M32 33v25"/>'
  };
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var state={q:'badminton racket',range:99,sort:'km',results:[],busy:false};
  var $=function(id){return document.getElementById(id)};

  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function icon(cat){return '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(ICON[cat]||ICON.Other)+'</svg>'}
  function tint(cat){return TINT[cat]||TINT.Other}
  function ratingTxt(it){return it.rating?'★ '+it.rating.toFixed(1):'New'}
  function money(n){return '₹'+n.toLocaleString('en-IN')}

  function tokens(q){
    return q.toLowerCase().replace(/[^a-z0-9 ]/g,' ').split(/\s+/).filter(function(w){return w&&!STOP[w]}).map(function(w){return SYN[w]||w});
  }
  function match(q){
    var t=tokens(q);
    if(!t.length) return [];
    var scored=ITEMS.map(function(it){
      var hay=(it.name+' '+it.tags+' '+it.cat).toLowerCase(),n=0;
      t.forEach(function(w){if(hay.indexOf(w)>-1)n++});
      return {it:it,n:n};
    }).filter(function(s){return s.n>0});
    var full=scored.filter(function(s){return s.n===t.length});
    return (full.length?full:scored).map(function(s){return s.it});
  }
  function sorted(list){
    var k=state.sort,c=list.slice();
    c.sort(function(a,b){
      if(k==='price') return a.price-b.price||a.km-b.km;
      if(k==='rating') return (b.rating||0)-(a.rating||0)||a.km-b.km;
      return a.km-b.km;
    });
    return c;
  }
  function visible(){
    return sorted(state.results.filter(function(i){return i.km<=state.range}));
  }

  /* ---------- results ---------- */
  function picHTML(it){
    var inner=it.photos.length
      ?'<img src="'+it.photos[0]+'" alt="'+esc(it.name)+'" loading="lazy">'
      :icon(it.cat);
    var badge=it.photos.length>1?'<span class="count">'+it.photos.length+' photos</span>':(it.sample?'<span class="sample">Sample</span>':'');
    return '<div class="pic" style="--tint:'+tint(it.cat)+'">'+inner+badge+'</div>';
  }
  function render(){
    var list=visible(),grid=$('grid');
    var nearestKm=list.length?Math.min.apply(null,list.map(function(i){return i.km})):0;
    $('countLine').textContent=list.length+(list.length===1?' owner':' owners')+' for “'+state.q+'”';
    grid.innerHTML='';
    if(!list.length){
      var e=document.createElement('div');e.className='empty';
      e.innerHTML='<h3>Nobody nearby has this yet</h3><p>Try a wider distance or a simpler word, like “racket” or “drill”. Or be the first to list it.</p>';
      grid.appendChild(e);
    }
    list.forEach(function(it,idx){
      var c=document.createElement('article');
      c.className='card enter'+(it.km===nearestKm?' nearest':'');
      c.style.animationDelay=(idx*60)+'ms';
      var col=COLORS[it.id%COLORS.length];
      c.innerHTML=picHTML(it)+
        '<div class="row"><span class="tag">'+esc(it.cat)+'</span><span class="km">'+it.km.toFixed(1)+' km</span></div>'+
        '<h3>'+esc(it.name)+'</h3>'+
        '<div class="owner"><span class="avatar" style="background:'+col+'">'+esc(it.owner.charAt(0).toUpperCase())+'</span><span>'+esc(it.owner)+' · <span class="mono">'+ratingTxt(it)+'</span></span></div>'+
        '<div class="card-foot"><div class="price">₹'+it.price+'<small> / day</small></div><button class="btn small" type="button" data-rent="'+it.id+'">Rent</button></div>';
      grid.appendChild(c);
    });
    var add=document.createElement('button');
    add.type='button';add.className='add-card';add.setAttribute('data-list','');
    add.innerHTML='<span class="plus"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></span><b>Have one of these?</b><span>List it with photos and start earning.</span>';
    grid.appendChild(add);
    $('resultsTitle').textContent=list.length?'Closest owners first':'No match yet';
    $('radarNote').textContent=list.length?('Nearest: '+nearestKm.toFixed(1)+' km away'):'No pins in this range.';
    rebuildPins(list);
  }

  function setAI(text,thinking){
    $('aiText').textContent=text;
    $('aiLine').classList.toggle('thinking',!!thinking);
  }
  function summary(){
    var list=visible();
    if(!list.length) return 'No owner nearby lists that yet. Try another word.';
    var n=list.slice().sort(function(a,b){return a.km-b.km})[0];
    return 'Found '+list.length+' near you. Closest is '+n.owner+', '+n.km.toFixed(1)+' km away at ₹'+n.price+' a day.';
  }
  function search(q,scroll){
    q=(q||'').trim();
    if(!q||state.busy) return;
    state.q=q;state.busy=true;
    $('q').value=q;
    var steps=['Reading your request…','Checking owners around you…','Ranking by distance and price…'];
    var i=0;
    function next(){
      if(i<steps.length){setAI(steps[i],true);i++;setTimeout(next,reduce?0:450);return}
      state.results=match(q);
      state.busy=false;
      render();
      setAI(summary(),false);
      if(scroll){$('browse').scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'})}
    }
    next();
  }

  /* ---------- rent sheet ---------- */
  var cur=null,days=1,lastFocus=null;
  function paint(){
    var sub=cur.price*days;
    $('sCalc').textContent=days+(days===1?' day':' days')+' × '+money(cur.price);
    $('sSub').textContent=money(sub);
    $('sDep').textContent=money(cur.dep);
    $('sTotal').textContent=money(sub);
    Array.prototype.forEach.call($('sDays').children,function(b){b.setAttribute('aria-pressed',String(+b.dataset.d===days))});
  }
  function showPhoto(i){
    var pic=$('sPhoto').querySelector('.pic img');
    if(pic) pic.src=cur.photos[i];
    Array.prototype.forEach.call($('sPhoto').querySelectorAll('.strip button'),function(b,k){b.setAttribute('aria-pressed',String(k===i))});
  }
  function openSheet(id){
    cur=ITEMS.filter(function(i){return i.id===id})[0];days=1;
    lastFocus=document.activeElement;
    $('sTag').textContent=cur.cat+' · '+cur.km.toFixed(1)+' km away';
    $('sTitle').textContent=cur.name;
    $('sOwner').textContent='Owner: '+cur.owner+' · '+(cur.rating?'rated '+cur.rating.toFixed(1):'new on NEEDit');
    var html='<div class="pic" style="--tint:'+tint(cur.cat)+'">'+(cur.photos.length?'<img src="'+cur.photos[0]+'" alt="'+esc(cur.name)+'">':icon(cur.cat))+'</div>';
    if(cur.photos.length>1){
      html+='<div class="strip" style="margin-top:8px">'+cur.photos.map(function(p,k){return '<button type="button" data-photo="'+k+'" aria-label="Show photo '+(k+1)+'" aria-pressed="'+(k===0)+'"><img src="'+p+'" alt=""></button>'}).join('')+'</div>';
    }
    $('sPhoto').innerHTML=html;
    var d=$('sDays');d.innerHTML='';
    [1,2,3,5,7].forEach(function(n){
      var b=document.createElement('button');b.type='button';b.className='chip';b.dataset.d=n;b.textContent=n+(n===1?' day':' days');d.appendChild(b);
    });
    paint();
    $('backdrop').hidden=false;
    $('sSend').focus();
  }
  function closeSheet(){
    $('backdrop').hidden=true;
    if(lastFocus&&lastFocus.focus) lastFocus.focus();
  }
  var toastT;
  function toast(msg){
    var old=document.querySelector('.toast');if(old)old.remove();
    var t=document.createElement('div');t.className='toast';t.setAttribute('role','status');t.textContent=msg;
    document.body.appendChild(t);
    clearTimeout(toastT);toastT=setTimeout(function(){t.remove()},4200);
  }

  /* ---------- listing form with photos ---------- */
  var photos=[];
  function readPhoto(file){
    return new Promise(function(res,rej){
      var fr=new FileReader();
      fr.onload=function(){
        var img=new Image();
        img.onload=function(){
          var m=900,s=Math.min(1,m/Math.max(img.width,img.height));
          var c=document.createElement('canvas');
          c.width=Math.max(1,Math.round(img.width*s));c.height=Math.max(1,Math.round(img.height*s));
          c.getContext('2d').drawImage(img,0,0,c.width,c.height);
          res(c.toDataURL('image/jpeg',.82));
        };
        img.onerror=function(){rej()};
        img.src=fr.result;
      };
      fr.onerror=function(){rej()};
      fr.readAsDataURL(file);
    });
  }
  function renderThumbs(){
    var box=$('thumbs');box.innerHTML='';
    photos.forEach(function(p,i){
      var d=document.createElement('div');d.className='thumb';
      d.innerHTML='<img src="'+p+'" alt="Photo '+(i+1)+' of your item">'+
        '<button type="button" data-rm="'+i+'" aria-label="Remove photo '+(i+1)+'"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg></button>'+
        (i===0?'<span class="cover">Cover</span>':'');
      box.appendChild(d);
    });
  }
  function addFiles(list){
    var msg=$('photoMsg');msg.textContent='';
    var files=Array.prototype.filter.call(list,function(f){return /^image\//.test(f.type)});
    if(!files.length){if(list.length) msg.textContent='Only image files can be added.';return}
    var room=4-photos.length;
    if(room<=0){msg.textContent='You can add up to 4 photos. Remove one first.';return}
    if(files.length>room) msg.textContent='Only '+room+' more photo'+(room>1?'s fit':' fits')+' (4 maximum).';
    files.slice(0,room).forEach(function(f){
      readPhoto(f).then(function(url){
        if(photos.length<4){photos.push(url);renderThumbs()}
      }).catch(function(){msg.textContent='Could not read “'+f.name+'”. Try a JPG or PNG.'});
    });
  }
  function openList(){
    lastFocus=document.activeElement;
    $('lErr').textContent='';$('photoMsg').textContent='';
    $('listBackdrop').hidden=false;
    $('lName').focus();
  }
  function closeList(){
    $('listBackdrop').hidden=true;
    if(lastFocus&&lastFocus.focus) lastFocus.focus();
  }
  function publish(e){
    e.preventDefault();
    var name=$('lName').value.trim(),price=parseInt($('lPrice').value,10),dep=parseInt($('lDep').value,10)||0;
    var err=$('lErr');
    if(name.length<3){err.textContent='Give your item a name so renters can find it.';$('lName').focus();return}
    if(!(price>=10)){err.textContent='Set a daily price of ₹10 or more.';$('lPrice').focus();return}
    err.textContent='';
    var cat=$('lCat').value;
    var it={id:nextId++,name:name,cat:cat,tags:(name+' '+cat).toLowerCase(),price:price,dep:dep,km:0.3,owner:$('lOwner').value.trim()||'You',rating:null,photos:photos.slice(),sample:false};
    ITEMS.push(it);
    closeList();
    $('listForm').reset();photos=[];renderThumbs();
    toast('Listed “'+name+'”. Renters nearby can see it now.');
    state.busy=false;
    search(name,true);
  }

  /* ---------- radar ---------- */
  var cv=$('radar'),ctx=cv.getContext('2d'),pins=[],W=0,H=0,dpr=1,col={};
  function readColors(){
    var s=getComputedStyle(document.documentElement);
    ['--ink','--muted','--line','--accent','--pop','--surface','--map'].forEach(function(k){col[k]=s.getPropertyValue(k).trim()});
  }
  function size(){
    var r=cv.getBoundingClientRect();
    dpr=Math.min(window.devicePixelRatio||1,2);
    W=r.width;H=r.height;
    cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  function rebuildPins(list){
    pins=list.map(function(it){
      var a=((it.id*137.5)%360)*Math.PI/180;
      return {it:it,a:a,r:Math.min(it.km/3,1)};
    });
    if(reduce) draw(0);
  }
  function draw(t){
    if(!W) return;
    ctx.clearRect(0,0,W,H);
    var cx=W/2,cy=H/2,R=Math.min(W,H)/2-14;
    var sweep=reduce?-0.6:(t*0.0011)%(Math.PI*2);
    ctx.lineWidth=1;ctx.strokeStyle=col['--line'];ctx.fillStyle=col['--map'];
    ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);ctx.fill();ctx.stroke();
    [1/3,2/3].forEach(function(f){ctx.beginPath();ctx.arc(cx,cy,R*f,0,Math.PI*2);ctx.stroke()});
    ctx.beginPath();ctx.moveTo(cx-R,cy);ctx.lineTo(cx+R,cy);ctx.moveTo(cx,cy-R);ctx.lineTo(cx,cy+R);ctx.stroke();
    ctx.fillStyle=col['--muted'];ctx.font='600 10px JetBrains Mono, monospace';ctx.textAlign='left';
    [['1 km',1/3],['2 km',2/3],['3 km',1]].forEach(function(p){ctx.fillText(p[0],cx+4,cy-R*p[1]+(p[1]===1?12:-4))});
    var g=ctx.createConicGradient?ctx.createConicGradient(sweep-0.9,cx,cy):null;
    if(g){
      g.addColorStop(0,'rgba(0,0,0,0)');
      g.addColorStop(0.14,col['--accent']);
      g.addColorStop(0.1401,'rgba(0,0,0,0)');
      ctx.save();ctx.globalAlpha=.3;ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,R,0,Math.PI*2);ctx.closePath();ctx.fill();ctx.restore();
    }
    ctx.strokeStyle=col['--accent'];ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(sweep)*R,cy+Math.sin(sweep)*R);ctx.stroke();
    var near=pins.slice().sort(function(a,b){return a.it.km-b.it.km}).slice(0,3);
    pins.forEach(function(p){
      var x=cx+Math.cos(p.a)*p.r*R*.94,y=cy+Math.sin(p.a)*p.r*R*.94;
      var d=((sweep-p.a)%(Math.PI*2)+Math.PI*2)%(Math.PI*2);
      var glow=reduce?0.4:Math.max(0,1-d/1.4);
      var isNear=near.indexOf(p)>-1;
      ctx.beginPath();ctx.arc(x,y,6+glow*9,0,Math.PI*2);ctx.fillStyle=col['--pop'];ctx.globalAlpha=.2+glow*.45;ctx.fill();ctx.globalAlpha=1;
      ctx.beginPath();ctx.arc(x,y,isNear?6:4.5,0,Math.PI*2);ctx.fillStyle=tint(p.it.cat);ctx.fill();
      ctx.lineWidth=2;ctx.strokeStyle=col['--ink'];ctx.stroke();
      if(isNear){
        var label=p.it.km.toFixed(1)+' km';
        ctx.font='700 11px JetBrains Mono, monospace';
        var tw=ctx.measureText(label).width,left=x+tw+22>W;
        var lx=left?x-tw-12:x+12,ly=Math.max(14,Math.min(H-8,y-10));
        ctx.fillStyle=col['--surface'];ctx.globalAlpha=.92;ctx.fillRect(lx-4,ly-11,tw+8,16);ctx.globalAlpha=1;
        ctx.fillStyle=col['--ink'];ctx.textAlign='left';ctx.fillText(label,lx,ly+1);
      }
    });
    ctx.beginPath();ctx.arc(cx,cy,7,0,Math.PI*2);ctx.fillStyle=col['--ink'];ctx.fill();
    ctx.beginPath();ctx.arc(cx,cy,3,0,Math.PI*2);ctx.fillStyle=col['--surface'];ctx.fill();
    ctx.fillStyle=col['--ink'];ctx.font='700 10px JetBrains Mono, monospace';ctx.textAlign='center';ctx.fillText('YOU',cx,cy+22);
  }
  function loop(t){draw(t);requestAnimationFrame(loop)}

  /* ---------- typed headline ---------- */
  function typer(){
    var words=['badminton racket','drill machine','DSLR camera','camping tent','party speaker','8 ft ladder'];
    var el=$('typed'),w=0,c=words[0].length,del=true;
    if(reduce) return;
    function tick(){
      var word=words[w];
      if(del){
        c--;el.textContent=word.slice(0,c)||' ';
        if(c<=0){del=false;w=(w+1)%words.length}
        setTimeout(tick,32);
      }else{
        word=words[w];c++;el.textContent=word.slice(0,c);
        if(c>=word.length){del=true;setTimeout(tick,1500)}else setTimeout(tick,70);
      }
    }
    setTimeout(tick,1800);
  }

  /* ---------- wiring ---------- */
  var track=$('track');
  var CATCOL={'Sports gear':'#F2692D','Power tools':'#D99A00','Cameras':'#5B6CFF','Camping':'#1FA971','Party sound':'#E5489B','Guitars':'#8B5CF6','Cycles':'#11A3B5','Projectors':'#E5489B','Ladders':'#D99A00','Tripods':'#5B6CFF'};
  CATS.concat(CATS).forEach(function(n){
    var b=document.createElement('button');b.type='button';b.className='chip';b.textContent=n;b.dataset.q=CATQ[n];b.style.setProperty('--c',CATCOL[n]);track.appendChild(b);
  });
  document.addEventListener('click',function(e){
    var t=e.target.closest('button,a');if(!t) return;
    if(t.hasAttribute('data-list')){openList();return}
    if(t.dataset.q){search(t.dataset.q,t.closest('.band')!==null||t.closest('.try')!==null);return}
    if(t.dataset.range){
      state.range=+t.dataset.range;
      document.querySelectorAll('[data-range]').forEach(function(b){b.setAttribute('aria-pressed',String(b===t))});
      render();return;
    }
    if(t.dataset.rent){openSheet(+t.dataset.rent);return}
    if(t.dataset.d){days=+t.dataset.d;paint();return}
    if(t.dataset.photo){showPhoto(+t.dataset.photo);return}
    if(t.dataset.rm){photos.splice(+t.dataset.rm,1);renderThumbs();$('photoMsg').textContent='';return}
  });
  $('searchForm').addEventListener('submit',function(e){e.preventDefault();search($('q').value,true)});
  $('sort').addEventListener('change',function(){state.sort=this.value;render()});
  $('sClose').addEventListener('click',closeSheet);
  $('lClose').addEventListener('click',closeList);
  $('lCancel').addEventListener('click',closeList);
  $('backdrop').addEventListener('click',function(e){if(e.target===this)closeSheet()});
  $('listBackdrop').addEventListener('click',function(e){if(e.target===this)closeList()});
  document.addEventListener('keydown',function(e){
    if(e.key!=='Escape') return;
    if(!$('listBackdrop').hidden) closeList(); else if(!$('backdrop').hidden) closeSheet();
  });
  $('sSend').addEventListener('click',function(){
    var name=cur.owner;closeSheet();
    toast('Request sent to '+name+'. This is a prototype, so nothing is booked.');
  });
  $('listForm').addEventListener('submit',publish);
  $('lFile').addEventListener('change',function(){addFiles(this.files);this.value=''});
  var drop=$('drop');
  ['dragenter','dragover'].forEach(function(n){drop.addEventListener(n,function(e){e.preventDefault();drop.classList.add('over')})});
  ['dragleave','drop'].forEach(function(n){drop.addEventListener(n,function(e){e.preventDefault();drop.classList.remove('over')})});
  drop.addEventListener('drop',function(e){if(e.dataTransfer&&e.dataTransfer.files) addFiles(e.dataTransfer.files)});
  $('themeBtn').addEventListener('click',function(){
    var root=document.documentElement,now=root.getAttribute('data-theme');
    if(!now) now='light';
    root.setAttribute('data-theme',now==='dark'?'light':'dark');
    readColors();if(reduce) draw(0);
  });
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',function(){readColors()});

  function calc(){
    var p=+$('cPrice').value,d=+$('cDays').value;
    $('cPriceV').textContent=money(p);$('cDaysV').textContent=d;$('cOut').textContent=money(p*d);
  }
  $('cPrice').addEventListener('input',calc);$('cDays').addEventListener('input',calc);calc();

  if('IntersectionObserver' in window&&!reduce){
    var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{threshold:.15});
    document.querySelectorAll('.rv').forEach(function(n){io.observe(n)});
  }

  readColors();size();
  window.addEventListener('resize',function(){size();if(reduce)draw(0)});
  if(window.ResizeObserver) new ResizeObserver(function(){size();if(reduce)draw(0)}).observe(cv.parentNode);
  state.results=match(state.q);
  render();
  setAI(summary(),false);
  if(reduce) draw(0); else requestAnimationFrame(loop);
  typer();
})();
