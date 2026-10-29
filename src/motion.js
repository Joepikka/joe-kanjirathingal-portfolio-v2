import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {canAnimate,pointerDepth} from './motion-policy.mjs';

gsap.registerPlugin(ScrollTrigger);

export function initMotion(projects){
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const fine=matchMedia('(hover:hover) and (pointer:fine) and (min-width:900px)');
  const desktop=matchMedia('(min-width:900px)');
  const compact=matchMedia('(max-width:720px)');
  const hero=document.querySelector('.hero');
  const list=document.querySelector('[data-project-list="featured"]');
  let context,hovering=false,entrancePlayed=false;
  const enabled=()=>canAnimate({paused:document.body.classList.contains('motion-paused'),reduced:reduced.matches,hidden:document.hidden});

  // Keep the existing portrait and real project imagery; the field is decorative SVG.
  let depth;
  if(hero){
    depth=document.createElement('div');depth.className='portrait-depth';
    const portrait=hero.querySelector('.hero-portrait');
    portrait.before(depth);depth.append(portrait);
    const field=document.createElement('div');field.className='hero-field';field.setAttribute('aria-hidden','true');
    field.innerHTML='<svg viewBox="0 0 1200 800" fill="none"><g class="field-orbits"><ellipse cx="600" cy="390" rx="440" ry="260" transform="rotate(-24 600 390)"/><ellipse cx="600" cy="390" rx="440" ry="160" transform="rotate(30 600 390)"/><path d="M78 600 296 238 787 128 1104 480 790 685 78 600M296 238 790 685M787 128 1104 480"/></g><g class="field-points"><circle cx="78" cy="600" r="4"/><circle cx="296" cy="238" r="5"/><circle cx="787" cy="128" r="4"/><circle cx="1104" cy="480" r="5"/><circle cx="790" cy="685" r="4"/></g></svg>';
    hero.prepend(field);
    const tag=document.createElement('p');tag.className='hero-field-label';tag.innerHTML='<span class="field-status"></span> DATA <span>→</span> MODELS <span>→</span> APPLICATIONS';
    hero.append(tag);
  }

  let showcase,showcaseImage,showcaseTitle,showcaseCount,currentId;
  const rows=list?[...list.querySelectorAll('.project-row')]:[];
  if(list){
    const wrap=document.createElement('div');wrap.className='work-showcase';list.before(wrap);wrap.append(list);
    showcase=document.createElement('a');showcase.className='project-spotlight';
    showcase.innerHTML='<div class="spotlight-top"><span>PROJECT IN FOCUS</span><span class="spotlight-count"></span></div><div class="spotlight-image"><img alt="" width="1440" height="900" decoding="async" loading="lazy"></div><div class="spotlight-bottom"><span class="spotlight-title"></span><span class="spotlight-cta">Read case study ↗</span></div><span class="spotlight-cursor" aria-hidden="true">Explore ↗</span>';
    wrap.prepend(showcase);
    showcaseImage=showcase.querySelector('img');showcaseTitle=showcase.querySelector('.spotlight-title');showcaseCount=showcase.querySelector('.spotlight-count');
    rows.forEach((row,index)=>{
      const project=projects.find(p=>p.id===row.dataset.project);
      if(!project)return;
      const number=document.createElement('span');number.className='project-index';number.textContent=String(index+1).padStart(2,'0');row.prepend(number);
      const thumb=document.createElement('div');thumb.className='row-image';thumb.style.background=project.color;
      const img=document.createElement('img');img.src=project.imageSmall||project.image;img.alt=project.imageAlt||`${project.title} project preview`;img.loading='lazy';img.width=project.mediaWidth;img.height=project.mediaHeight;thumb.append(img);row.append(thumb);
      if(project.imageKind==='concept'){const note=document.createElement('span');note.className='row-image-note';note.textContent='Concept illustration';thumb.append(note);}
      row.addEventListener('pointerenter',()=>{if(fine.matches)selectProject(project.id);});
      row.addEventListener('focus',()=>selectProject(project.id));
    });
    selectProject(rows[0]?.dataset.project);
  }

  function selectProject(id){
    if(!showcase||id===currentId)return;
    const project=projects.find(p=>p.id===id);if(!project)return;
    currentId=id;
    showcase.href=`projects/${id}.html`;showcase.setAttribute('aria-label',`Read ${project.title} case study`);
    showcaseImage.src=project.imageSmall||project.image;showcaseTitle.textContent=project.shortTitle||project.title;
    showcase.querySelector('.spotlight-top>span').textContent=project.imageKind==='concept'?'CONCEPT ILLUSTRATION':'PROJECT IN FOCUS';
    showcase.style.setProperty('--project-color',project.color);
    showcaseCount.textContent=`${String(rows.findIndex(r=>r.dataset.project===id)+1).padStart(2,'0')} / ${String(rows.length).padStart(2,'0')}`;
    rows.forEach(row=>row.classList.toggle('is-current',row.dataset.project===id));
    if(enabled())gsap.fromTo(showcaseImage,{opacity:.35,scale:1.025},{opacity:1,scale:1,duration:.28,ease:'power2.out',overwrite:true,clearProps:'opacity,transform'});
  }

  // A single control on every page shares the existing pause state.
  if(!document.querySelector('.motion-toggle')){
    const control=document.createElement('button');control.type='button';control.className='tool-button motion-toggle motion-tool';
    control.innerHTML='<svg class="pause-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M7 4v12M13 4v12"/></svg><span>Pause motion</span>';
    document.querySelector('.header-tools')?.append(control);
    control.addEventListener('click',()=>window.dispatchEvent(new CustomEvent('portfolio-motion-request',{detail:!document.body.classList.contains('motion-paused')})));
  }
  const control=document.querySelector('.motion-toggle');
  function syncControl(){
    const paused=document.body.classList.contains('motion-paused')||reduced.matches;
    if(control?.classList.contains('motion-tool')){
      const host=document.querySelector(compact.matches?'.navigation-panel .menu-socials':'.header-tools');
      if(host&&control.parentElement!==host)host.append(control);
    }
    if(control){control.disabled=reduced.matches;control.setAttribute('aria-pressed',String(paused));control.querySelector('span').textContent=reduced.matches?'Reduced motion':paused?'Resume motion':'Pause motion';control.setAttribute('aria-label',control.querySelector('span').textContent);}
  }

  const progress=document.createElement('div');progress.className='reading-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
  let movePortraitX,movePortraitY,moveFieldX,moveFieldY,moveCardX,moveCardY,moveCursorX,moveCursorY;
  function start(){
    context=gsap.context(()=>{
      document.body.classList.add('motion-enhanced');
      // Reveal only near the viewport; keyboard focus always makes content visible immediately.
      const revealTargets=document.querySelectorAll('.introduction h2,.intro-aside,.section-heading,.lab-teaser>div,.notes-teaser>div,.about-title,.about-copy,.skills-layout>div,.education-title,.education-row,.contact-heading,.page-heading,.study-note,.network-strip>div,.device-copy');
      revealTargets.forEach(target=>{
        const rect=target.getBoundingClientRect();
        if(rect.bottom<0||target.contains(document.activeElement))return;
        gsap.from(target,{y:desktop.matches?36:18,opacity:0,duration:.65,ease:'power3.out',scrollTrigger:{trigger:target,start:'top 94%',once:true}});
      });
      if(hero&&!entrancePlayed&&scrollY<80){
        entrancePlayed=true;
        gsap.from(['.location-hanger','.hero-role','.hero-field-label','.mobile-hero-name','.hero-bottom'],{y:22,opacity:0,duration:.85,stagger:.09,ease:'power3.out'});
        gsap.from(depth,{opacity:0,scale:1.025,duration:1.2,ease:'power2.out'});
      }
      if(desktop.matches){
        document.querySelectorAll('.ribbon-frame img,.desk-portrait img').forEach(image=>{
          gsap.fromTo(image,{yPercent:-4,scale:1.1},{yPercent:4,scale:1.1,ease:'none',scrollTrigger:{trigger:image.parentElement,start:'top bottom',end:'bottom top',scrub:.6}});
        });
        rows.forEach(row=>ScrollTrigger.create({trigger:row,start:'top 57%',end:'bottom 57%',onEnter:()=>selectProject(row.dataset.project),onEnterBack:()=>selectProject(row.dataset.project)}));
      }
      gsap.to(progress,{scaleX:1,ease:'none',scrollTrigger:{start:0,end:()=>ScrollTrigger.maxScroll(window),scrub:true}});
      if(fine.matches){
        if(depth){
          movePortraitX=gsap.quickTo(depth,'x',{duration:.65,ease:'power3.out'});movePortraitY=gsap.quickTo(depth,'y',{duration:.65,ease:'power3.out'});
          moveFieldX=gsap.quickTo('.hero-field','x',{duration:.8,ease:'power3.out'});moveFieldY=gsap.quickTo('.hero-field','y',{duration:.8,ease:'power3.out'});
        }
        if(showcase){
          moveCardX=gsap.quickTo(showcase.querySelector('.spotlight-image'),'rotationY',{duration:.5,ease:'power3.out'});
          moveCardY=gsap.quickTo(showcase.querySelector('.spotlight-image'),'rotationX',{duration:.5,ease:'power3.out'});
          moveCursorX=gsap.quickTo('.spotlight-cursor','x',{duration:.35,ease:'power3.out'});moveCursorY=gsap.quickTo('.spotlight-cursor','y',{duration:.35,ease:'power3.out'});
        }
      }
    });
    ScrollTrigger.refresh();
  }

  function stop(){
    context?.revert();context=null;document.body.classList.remove('motion-enhanced');
    hovering=false;showcase?.classList.remove('pointer-active');
    // Also finish a crossfade created outside the context before pausing.
    if(showcaseImage){gsap.killTweensOf(showcaseImage);gsap.set(showcaseImage,{clearProps:'opacity,transform'});}
  }
  function refresh(){stop();syncControl();if(enabled())start();}
  hero?.addEventListener('pointermove',event=>{
    if(!enabled()||!fine.matches)return;
    const p=pointerDepth(event.clientX,event.clientY,hero.getBoundingClientRect());
    movePortraitX?.(p.x*10);movePortraitY?.(p.y*7);moveFieldX?.(-p.x*22);moveFieldY?.(-p.y*16);
  },{passive:true});
  hero?.addEventListener('pointerleave',()=>{if(enabled()&&fine.matches){movePortraitX?.(0);movePortraitY?.(0);moveFieldX?.(0);moveFieldY?.(0);}});
  showcase?.addEventListener('pointermove',event=>{
    if(!enabled()||!fine.matches)return;
    const box=showcase.getBoundingClientRect(),p=pointerDepth(event.clientX,event.clientY,box);
    hovering=true;showcase.classList.add('pointer-active');moveCardX?.(p.x*5);moveCardY?.(-p.y*4);
    moveCursorX?.(Math.max(55,Math.min(box.width-55,event.clientX-box.left)));moveCursorY?.(Math.max(35,Math.min(box.height-35,event.clientY-box.top)));
  },{passive:true});
  showcase?.addEventListener('pointerleave',()=>{
    hovering=false;showcase.classList.remove('pointer-active');if(enabled()&&fine.matches){moveCardX?.(0);moveCardY?.(0);}
  });
  addEventListener('scroll',()=>{if(hovering){showcase.classList.remove('pointer-active');hovering=false;}},{passive:true});
  document.addEventListener('focusin',event=>{
    // No reveal animation can leave a keyboard target invisible.
    let target=event.target;
    while(target&&target!==document.body){if(target instanceof HTMLElement){gsap.killTweensOf(target,'opacity,y');target.style.removeProperty('opacity');}target=target.parentElement;}
  });
  addEventListener('portfolio-motion-change',refresh);document.addEventListener('visibilitychange',refresh);
  reduced.addEventListener('change',refresh);fine.addEventListener('change',refresh);desktop.addEventListener('change',refresh);
  compact.addEventListener('change',refresh);
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>ScrollTrigger.refresh()));
  addEventListener('load',()=>ScrollTrigger.refresh(),{once:true});
  document.fonts?.ready.then(()=>ScrollTrigger.refresh());
  addEventListener('pagehide',stop);addEventListener('pageshow',event=>{if(event.persisted)refresh();});
  refresh();
}
