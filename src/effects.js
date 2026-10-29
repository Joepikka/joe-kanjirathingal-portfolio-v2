// Small interaction effects: hero name weight follows the pointer, headings decrypt into view,
// result numbers count up, and dot grids bend around the pointer. All respect pause and reduced motion.
import {countParts} from './motion-policy.mjs';

const GLYPHS='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&';

export function initEffects(enabled){
  proximityName(enabled);decryptHeadings(enabled);countUp(enabled);
  document.querySelectorAll('.lab-teaser,.contact-section').forEach(host=>dotGrid(host,enabled));
}

function splitChars(node){
  // Wrap each character of every text node in a span, keeping <i> and other markup.
  const chars=[];
  [...node.childNodes].forEach(child=>{
    if(child.nodeType===3){
      const frag=document.createDocumentFragment();
      for(const ch of child.textContent){const s=document.createElement('span');s.className='char';s.textContent=ch;frag.append(s);chars.push(s);}
      child.replaceWith(frag);
    }else if(child.nodeType===1&&child.tagName!=='BR')chars.push(...splitChars(child));
  });
  return chars;
}

function proximityName(enabled){
  const hero=document.querySelector('.hero');if(!hero)return;
  const targets=[...hero.querySelectorAll('.name-track>span,.mobile-hero-name')];
  const chars=targets.flatMap(splitChars);if(!chars.length)return;
  let pointer=null,frame=0;
  function draw(){
    frame=0;
    const live=pointer&&enabled();
    chars.forEach(ch=>{
      if(!live){ch.style.fontWeight='';return;}
      const r=ch.getBoundingClientRect(),d=Math.hypot(r.left+r.width/2-pointer.x,r.top+r.height/2-pointer.y);
      const t=Math.max(0,1-d/260);
      ch.style.fontWeight=t?Math.round(400+t*t*500):'';
    });
    // The marquee keeps moving, so keep sampling while the pointer is over the hero.
    if(live)frame=requestAnimationFrame(draw);
  }
  hero.addEventListener('pointermove',e=>{pointer={x:e.clientX,y:e.clientY};if(!frame)frame=requestAnimationFrame(draw);},{passive:true});
  for(const type of ['pointerleave','pointercancel','pointerup'])hero.addEventListener(type,e=>{if(type==='pointerleave'||e.pointerType!=='mouse'){pointer=null;if(!frame)frame=requestAnimationFrame(draw);}},{passive:true});
}

function decryptHeadings(enabled){
  const headings=document.querySelectorAll('.section-heading h2,.introduction h2,.about-title h2,.education-title h2,.lab-teaser h2,.notes-teaser h2,.contact-heading h2,.page-heading h1,.page-intro h1');
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting)return;observer.unobserve(entry.target);
    if(enabled())run(entry.target);
  }),{rootMargin:'0px 0px -12% 0px'});
  headings.forEach(h=>observer.observe(h));
  function run(heading){
    const label=heading.textContent.replace(/\s+/g,' ').trim();
    heading.setAttribute('aria-label',label);
    const chars=splitChars(heading).filter(c=>c.textContent.trim());
    const finals=chars.map(c=>c.textContent);
    const start=performance.now(),duration=Math.min(1400,500+chars.length*18);
    const restore=()=>{chars.forEach((c,i)=>c.textContent=finals[i]);heading.removeAttribute('aria-label');};
    setTimeout(restore,duration+200);
    let seed=chars.length;
    const rand=()=>(seed=(seed*16807)%2147483647)/2147483647;
    (function tick(now){
      const p=Math.min(1,(now-start)/duration);
      chars.forEach((c,i)=>{
        if(i/chars.length<p||!enabled()){c.textContent=finals[i];return;}
        // Match the final letter's case so line widths barely move while decrypting.
        const glyph=GLYPHS[Math.floor(rand()*GLYPHS.length)];c.textContent=finals[i]===finals[i].toLowerCase()?glyph.toLowerCase():glyph;
      });
      if(p<1&&enabled())requestAnimationFrame(tick);else restore();
    })(start);
  }
}

function countUp(enabled){
  const cells=[...document.querySelectorAll('.evaluation-row strong,.evaluation-table td')].map(el=>({el,parts:countParts(el.textContent.trim())})).filter(c=>c.parts);
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting)return;observer.unobserve(entry.target);
    const cell=cells.find(c=>c.el===entry.target);if(!cell||!enabled())return;
    const {value,decimals,prefix,suffix}=cell.parts,final=cell.el.textContent,start=performance.now();
    cell.el.setAttribute('aria-label',final);
    // Never leave a wrong figure on screen if animation frames stall (background tab, throttling).
    let done=false;setTimeout(()=>{if(!done){done=true;cell.el.textContent=final;cell.el.removeAttribute('aria-label');}},1400);
    (function tick(now){
      if(done)return;
      const p=Math.min(1,(now-start)/1200),eased=1-(1-p)**3;
      cell.el.textContent=p<1&&enabled()?prefix+(value*eased).toLocaleString('en-US',{minimumFractionDigits:decimals,maximumFractionDigits:decimals})+suffix:final;
      if(p<1&&enabled())requestAnimationFrame(tick);else{done=true;cell.el.removeAttribute('aria-label');}
    })(start);
  }),{threshold:.6});
  cells.forEach(c=>observer.observe(c.el));
}

function dotGrid(host,enabled){
  const canvas=document.createElement('canvas');canvas.className='dot-grid';canvas.setAttribute('aria-hidden','true');
  host.classList.add('has-dot-grid');host.prepend(canvas);
  const g=canvas.getContext('2d'),GAP=30;
  let dots=[],pointer=null,frame=0,w=0,h=0,color='#858e8c';
  function layout(){
    const dpr=Math.min(devicePixelRatio||1,2);w=host.clientWidth;h=host.clientHeight;
    canvas.width=w*dpr;canvas.height=h*dpr;g.setTransform(dpr,0,0,dpr,0,0);
    color=getComputedStyle(host).color;
    dots=[];for(let y=GAP/2;y<h;y+=GAP)for(let x=GAP/2;x<w;x+=GAP)dots.push({x,y,ox:0,oy:0});
    draw();
  }
  function draw(){
    frame=0;let moving=false;
    g.clearRect(0,0,w,h);g.fillStyle=color;
    const live=pointer&&enabled();
    for(const d of dots){
      let tx=0,ty=0;
      if(live){const dx=d.x-pointer.x,dy=d.y-pointer.y,dist=Math.hypot(dx,dy);if(dist<140&&dist>.1){const push=(1-dist/140)**2*22;tx=dx/dist*push;ty=dy/dist*push;}}
      d.ox+=(tx-d.ox)*.16;d.oy+=(ty-d.oy)*.16;if(Math.abs(tx-d.ox)+Math.abs(ty-d.oy)>.05)moving=true;
      const lift=Math.min(1,Math.hypot(d.ox,d.oy)/10);
      g.globalAlpha=.16+lift*.5;g.beginPath();g.arc(d.x+d.ox,d.y+d.oy,1.2+lift*1.3,0,Math.PI*2);g.fill();
    }
    if(moving)frame=requestAnimationFrame(draw);
  }
  const wake=()=>{if(!frame)frame=requestAnimationFrame(draw);};
  host.addEventListener('pointermove',e=>{const r=host.getBoundingClientRect();pointer={x:e.clientX-r.left,y:e.clientY-r.top};wake();},{passive:true});
  for(const type of ['pointerleave','pointercancel','pointerup'])host.addEventListener(type,e=>{if(type==='pointerleave'||e.pointerType!=='mouse'){pointer=null;wake();}},{passive:true});
  new ResizeObserver(layout).observe(host);
  addEventListener('portfolio-motion-change',wake);
}
