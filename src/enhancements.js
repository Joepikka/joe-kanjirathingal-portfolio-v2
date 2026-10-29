import {searchProjects, resolveTheme, makeVectorSamples, pipelineStep} from './core.mjs';
import {initMotion} from './motion.js';

if(document.readyState==='loading') await new Promise(resolve=>document.addEventListener('DOMContentLoaded',resolve,{once:true}));

const projects = window.portfolioProjects || [];
document.title += ' · Portfolio V2';
const versionMark=document.querySelector('.wordmark .copyright');
if(versionMark){versionMark.textContent='V2';versionMark.classList.add('version-badge');}
const wordmark=document.querySelector('.wordmark');
if(wordmark)wordmark.setAttribute('aria-label','Joe Kanjirathingal, Portfolio Version 2, home');
const icon = {
  search:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/></svg>',
  sun:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>'
};
const announce = document.createElement('p');
announce.className = 'sr-only';
announce.setAttribute('role','status');
announce.setAttribute('aria-live','polite');
document.body.append(announce);
function message(text) { announce.textContent = ''; requestAnimationFrame(()=>{announce.textContent=text;}); }

// Extend existing navigation rather than replacing its accessible modal behavior.
document.querySelectorAll('.desktop-nav,.navigation-panel nav').forEach(nav => {
  const lab = document.createElement('a'); lab.href='lab.html'; lab.textContent='Lab';
  const journal = document.createElement('a'); journal.href='journal.html'; journal.textContent='Notes';
  const contact = Array.from(nav.children).find(a=>a.textContent==='Contact');
  nav.insertBefore(lab,contact||null); nav.insertBefore(journal,contact||null);
});
const tools = document.createElement('div');
tools.className='header-tools';
tools.innerHTML=`<button class="tool-button search-trigger" type="button" aria-label="Search projects" aria-haspopup="dialog">${icon.search}<span>Search</span><kbd>⌘ K</kbd></button><div class="theme-control">${icon.sun}<label class="sr-only" for="theme-preference">Color theme</label><select id="theme-preference" aria-label="Color theme"><option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option></select></div>`;
document.querySelector('.site-header')?.append(tools);
let preference='system';
try { const saved=localStorage.getItem('portfolio-theme'); if (['light','dark','system'].includes(saved)) preference=saved; } catch {}
const systemTheme=matchMedia('(prefers-color-scheme: dark)');
const themeSelect=document.querySelector('#theme-preference');
function applyTheme(value) {
  preference=value;
  document.documentElement.dataset.theme=resolveTheme(value,systemTheme.matches);
  if(themeSelect) themeSelect.value=value;
  window.dispatchEvent(new Event('portfolio-theme-change'));
}
applyTheme(preference);
themeSelect?.addEventListener('change',()=>{
  applyTheme(themeSelect.value);
  try {localStorage.setItem('portfolio-theme',preference);} catch {}
  message(`${preference} color theme selected`);
});
systemTheme.addEventListener('change',()=>applyTheme(preference));

const dialog=document.createElement('dialog');
dialog.className='search-dialog';
dialog.setAttribute('aria-labelledby','search-title');
dialog.innerHTML=`<div class="search-dialog-heading"><h2 id="search-title">Find something useful.</h2><button type="button" class="tool-button" data-close-search aria-label="Close project search">Close <kbd>Esc</kbd></button></div><label for="project-query">Search by project, skill, or technology</label><div class="search-input-row">${icon.search}<input id="project-query" type="search" placeholder="Try Python, NLP, or QuoteCheck" autocomplete="off" spellcheck="false"></div><p class="search-count" role="status" aria-live="polite"></p><div class="search-results"></div>`;
document.body.append(dialog);
const query=dialog.querySelector('input'), results=dialog.querySelector('.search-results');
let searchOpener=null;
function renderResults() {
  const found=searchProjects(projects,query.value);
  dialog.querySelector('.search-count').textContent=`${found.length} ${found.length===1?'project':'projects'}`;
  results.replaceChildren();
  if (!found.length) {
    const empty=document.createElement('div'); empty.className='search-empty';
    const heading=document.createElement('h3'); heading.textContent='No matches yet.';
    const text=document.createElement('p'); text.textContent='Try a different project name or technology.';
    const clear=document.createElement('button'); clear.type='button'; clear.className='small-button'; clear.textContent='Clear search';
    clear.addEventListener('click',()=>{query.value='';renderResults();query.focus();});
    empty.append(heading,text,clear);results.append(empty);return;
  }
  found.forEach(project=>{
    const a=document.createElement('a');a.href=`projects/${project.id}.html`;a.className='search-result';
    const title=document.createElement('strong');title.textContent=project.title;
    const description=document.createElement('span');description.textContent=project.discipline;
    const technologies=document.createElement('small');technologies.textContent=project.technologies.slice(0,5).join(' · ');
    a.append(title,description,technologies);results.append(a);
  });
}
function openSearch(opener=document.activeElement) {
  if(dialog.open)return;
  const navigation=document.querySelector('#navigation');
  if(navigation?.open){navigation.close();opener=document.querySelector('.menu-trigger');}
  searchOpener=opener;renderResults();dialog.showModal();query.focus();
}
document.querySelector('.search-trigger')?.addEventListener('click',event=>openSearch(event.currentTarget));
document.querySelector('[data-open-search]')?.addEventListener('click',event=>openSearch(event.currentTarget));
query.addEventListener('input',renderResults);
query.addEventListener('keydown',event=>{
  if(event.key==='Escape'){event.preventDefault();event.stopPropagation();dialog.close();}
  if(event.key==='ArrowDown'){event.preventDefault();results.querySelector('a,button')?.focus();}
});
dialog.querySelector('[data-close-search]').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>searchOpener?.focus());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
document.addEventListener('keydown',event=>{
  if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();openSearch();}
});

document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
  const text=button.dataset.copy==='email'?'joepikka5@gmail.com':document.querySelector(button.dataset.copy)?.textContent;
  if(!text)return;
  const original=button.textContent;
  try {
    await navigator.clipboard.writeText(text);
    button.textContent='Copied ✓';message('Copied to clipboard');
  } catch {
    button.textContent='Select text to copy';message(`Clipboard unavailable. Select the visible text and copy it: ${text}`);
  }
  setTimeout(()=>{button.textContent=original;},2600);
}));

const steps=Array.from(document.querySelectorAll('[data-pipeline-step]'));
const panels=Array.from(document.querySelectorAll('[data-pipeline-panel]'));
let activeStep=0, manualPipeline=false;
function selectStep(index) {
  activeStep=index;
  steps.forEach((step,i)=>{step.setAttribute('aria-pressed',String(i===index));step.classList.toggle('is-active',i===index);});
  panels.forEach((panel,i)=>{panel.hidden=i!==index;});
  document.querySelector('[data-pipeline-counter]')?.replaceChildren(document.createTextNode(`0${index+1} / 04`));
  document.querySelectorAll('.pipeline-dot').forEach((dot,i)=>dot.classList.toggle('is-active',i===index));
}
steps.forEach((step,index)=>step.addEventListener('click',()=>{manualPipeline=true;selectStep(index);}));
if(steps.length)selectStep(0);
const narrative=document.querySelector('[data-scroll-story]');
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
let storyFrame=false;
function updateStory() {
  storyFrame=false;
  if(!narrative||innerWidth<1000||reducedMotion.matches||manualPipeline||document.body.classList.contains('motion-paused'))return;
  const box=narrative.getBoundingClientRect();
  const progress=(innerHeight*.35-box.top)/Math.max(1,box.height-innerHeight*.6);
  if(box.top<innerHeight*.45&&box.bottom>innerHeight*.4)selectStep(pipelineStep(progress));
}
if(narrative)addEventListener('scroll',()=>{if(!storyFrame){storyFrame=true;requestAnimationFrame(updateStory);}},{passive:true});
document.querySelector('[data-follow-scroll]')?.addEventListener('click',()=>{manualPipeline=false;updateStory();message('Pipeline follows scrolling on wide screens');});

const samples=makeVectorSamples();
const sampleList=document.querySelector('[data-sample-list]');
function selectSample(id) {
  const sample=samples.find(s=>s.id===id);if(!sample)return;
  document.querySelectorAll('[data-sample]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.sample===id)));
  const text=document.querySelector('[data-selected-text]');if(text)text.textContent=sample.text;
  const category=document.querySelector('[data-selected-group]');if(category)category.textContent=sample.group;
  document.dispatchEvent(new CustomEvent('portfolio-sample',{detail:{id}}));
}
if(sampleList) {
  samples.forEach((sample,index)=>{
    const button=document.createElement('button');button.type='button';button.dataset.sample=sample.id;
    button.style.setProperty('--sample-color',sample.color);button.setAttribute('aria-pressed','false');
    button.innerHTML=`<span class="sample-number">${String(index+1).padStart(2,'0')}</span>`;
    const label=document.createElement('span');label.textContent=sample.text;button.append(label);
    button.addEventListener('click',()=>selectSample(sample.id));sampleList.append(button);
  });
  selectSample(samples[0].id);
}
document.addEventListener('portfolio-point-picked',event=>selectSample(event.detail.id));

let sceneModule;
function loadScenes(){return sceneModule ||= import('./scenes.js');}
document.querySelectorAll('[data-scene]').forEach(host=>{
  const button=host.querySelector('[data-start-scene]'), stop=host.querySelector('[data-stop-scene]');
  const status=host.querySelector('[data-scene-status]');
  let instance=null,requested=false;
  async function activate() {
    if(requested)return;requested=true;
    if(button){button.disabled=true;button.textContent='Loading 3D…';}
    if(status)status.textContent='Loading the interactive view. The static preview remains available.';
    try {
      const module=await loadScenes();
      instance=await module.mountScene(host,{samples,selectSample,selectedId:document.querySelector('[data-sample][aria-pressed="true"]')?.dataset.sample});
      host.classList.add('scene-ready');
      if(button)button.hidden=true;
      if(stop)stop.hidden=false;
      if(status)status.textContent=host.dataset.scene==='device'?'Drag to rotate. Stop 3D to return to the screenshot.':host.dataset.scene==='scatter'?'Drag to rotate; select a point or a sentence below.':'Illustrative network. Motion respects your pause preference.';
    } catch {
      requested=false;
      if(button){button.disabled=false;button.textContent='Try 3D again';}
      if(status)status.textContent='3D is unavailable in this browser. The static view and all text controls still work.';
      message('3D unavailable; showing the static alternative');
    }
  }
  button?.addEventListener('click',activate);
  stop?.addEventListener('click',()=>{
    instance?.dispose();instance=null;requested=false;host.classList.remove('scene-ready');
    if(button){button.hidden=false;button.disabled=false;button.textContent='Explore in 3D';button.focus();}
    stop.hidden=true;if(status)status.textContent='Static view. Activate 3D when you want to explore.';
  });
  if(host.dataset.scene==='network'&&innerWidth>=1000&&!reducedMotion.matches) {
    const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){activate();observer.disconnect();}},{rootMargin:'100px'});
    observer.observe(host);
  }
});

// Update legacy dynamically rendered links to the new shareable static routes.
document.querySelectorAll('a[href^="project.html?id="]').forEach(link=>{
  const id=new URL(link.href).searchParams.get('id');if(projects.some(p=>p.id===id))link.href=`projects/${id}.html`;
});
initMotion(projects);
