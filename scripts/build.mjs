import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import {build} from 'esbuild';
import sharp from 'sharp';

const root=path.resolve(import.meta.dirname,'..'), out=path.join(root,'dist');
const catalogue={window:{}};vm.runInNewContext(await fs.readFile(path.join(root,'projects.js'),'utf8'),catalogue);
const projects=catalogue.window.portfolioProjects;
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const productionOrigin='https://joe-kanjirathingal-portfolio-v2.vercel.app';
const production=process.env.VERCEL_ENV==='production';
const origin=(production?productionOrigin:process.env.SITE_URL||(process.env.VERCEL_URL?`https://${process.env.VERCEL_URL}`:'')).replace(/\/$/,'');
if(origin&&!/^https?:\/\/[a-z\d.:-]+$/i.test(origin))throw new Error('SITE_URL must be an HTTP(S) origin');
const previewRobots='<meta name="robots" content="noindex,nofollow">';
const publicPage=(html,page)=>production
  ? html.replace(previewRobots,`<link rel="canonical" href="${productionOrigin}${page}">`)
  : html;
await fs.mkdir(path.join(out,'assets','social'),{recursive:true});
await fs.mkdir(path.join(out,'projects'),{recursive:true});
for(const file of ['index.html','work.html','project.html','lab.html','journal.html','styles.css','enhancements.css','workbench.css','theme.js','app.js','projects.js'])await fs.copyFile(path.join(root,file),path.join(out,file));
for(const file of await fs.readdir(path.join(root,'assets')))if(!file.endsWith('.json'))await fs.copyFile(path.join(root,'assets',file),path.join(out,'assets',file));
await build({entryPoints:[path.join(root,'src','enhancements.js')],bundle:true,splitting:true,format:'esm',platform:'browser',target:['es2022'],minify:true,outdir:path.join(out,'assets'),chunkNames:'chunks/[name]-[hash]',legalComments:'linked',metafile:true});
const template=await fs.readFile(path.join(root,'project.html'),'utf8');
function wrap(text,length){const lines=[''];for(const word of text.split(' ')){let last=lines.length-1;if(lines[last]&&(lines[last]+' '+word).length>length){lines.push(word);}else lines[last]+=(lines[last]?' ':'')+word;}return lines;}
for(const project of projects){
  const titleLines=wrap(project.title,22);
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f4f4ee"/><rect x="660" y="100" width="490" height="410" rx="8" fill="${esc(project.color)}"/><circle cx="64" cy="65" r="6" fill="#354bdf"/><text x="85" y="71" font-family="sans-serif" font-size="15" fill="#555b5c" letter-spacing="2">JOE KANJIRATHINGAL / SELECTED WORK</text>${titleLines.map((line,i)=>`<text x="60" y="${228+i*70}" font-family="sans-serif" font-size="57" fill="#1c1d20" letter-spacing="-2">${esc(line)}</text>`).join('')}<text x="64" y="${245+titleLines.length*70}" font-family="sans-serif" font-size="19" fill="#555b5c">${esc(project.discipline)}</text><text x="64" y="530" font-family="sans-serif" font-size="16" fill="#555b5c">${esc(project.technologies.slice(0,4).join(' · '))}</text><path d="M1125 552h28v-28m-28 28 28-28" stroke="#354bdf" stroke-width="3" fill="none"/><path d="M60 575H1140" stroke="#cdd0ca"/></svg>`;
  const thumbnail=await sharp(path.join(root,project.imageSmall||project.image)).resize(450,340,{fit:'inside',withoutEnlargement:true}).png().toBuffer();
  const dimensions=await sharp(thumbnail).metadata();
  await sharp(Buffer.from(svg)).composite([{input:thumbnail,left:680+Math.floor((450-dimensions.width)/2),top:135+Math.floor((340-dimensions.height)/2)}]).png().toFile(path.join(out,'assets','social',`${project.id}.png`));
  const imageUrl=`${origin}/assets/social/${project.id}.png`, pageUrl=`${origin}/projects/${project.id}.html`;
  const social=`<base href="../"><meta property="og:type" content="website"><meta property="og:title" content="${esc(project.title)} — Joe Kanjirathingal"><meta property="og:description" content="${esc(project.summary)}"><meta property="og:image" content="${esc(imageUrl)}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:url" content="${esc(pageUrl)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${esc(imageUrl)}">`;
  const sections=(project.caseStudy||[]).map(s=>`<section class="case-study-section"><h2>${esc(s.heading)}</h2><p>${esc(s.text)}</p></section>`).join('');
  const links=[
    project.demo&&['Explore live project',project.demo],
    project.powerBiReport&&['Power BI report as PDF',project.powerBiReport],
    project.source&&['Code on GitHub',project.source],
    project.evidence&&['Read the evidence',project.evidence]
  ].filter(Boolean).map(([label,url])=>`<a class="pill-link" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`).join('');
  const outcome=`<section class="project-outcome" aria-label="Project outcome"><h2>Outcome</h2><p>${esc(project.resultSummary)}</p></section>`;
  const mediaVariants=project.imageSmall
    ? ` srcset="${esc(project.imageSmall)} ${project.imageSmallWidth}w, ${esc(project.image)} ${project.imageWidth}w" sizes="(max-width: 720px) 90vw, (max-width: 1300px) 80vw, 1060px"`
    : '';
  const serverContent=`<a class="text-link project-back" href="work.html">← All projects</a><h1>${esc(project.title)}</h1><p class="project-summary">${esc(project.summary)}</p>${outcome}${links?`<div class="project-actions">${links}</div>`:''}<div class="project-detail-media" style="background:${esc(project.color)}"><img src="${esc(project.image)}"${mediaVariants} alt="${esc(project.imageAlt||project.title+' project preview')}" width="${project.mediaWidth||1440}" height="${project.mediaHeight||900}"></div><p class="media-caption detail-media-caption">${esc(project.imageCaption||'Project illustration')}</p><dl class="project-facts"><div><dt>Focus</dt><dd>${esc(project.discipline)}</dd></div><div><dt>Tools</dt><dd>${project.technologies.map(esc).join(' · ')}</dd></div><div><dt>Project status</dt><dd>${esc(project.status)}</dd></div></dl><section class="project-detail-copy"><h2>In the build.</h2><div><ul>${project.features.map(s=>`<li>${esc(s)}</li>`).join('')}</ul><p class="project-note">${esc(project.note)}</p></div></section><div class="case-study">${sections}</div>`;
  const html=template.replace('<head>',`<head>${social}`).replace(/<title>[\s\S]*?<\/title>/,`<title>${esc(project.title)} — Joe Kanjirathingal</title>`).replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${esc(project.summary)}">`).replace(/<main[^>]*data-project-detail>[\s\S]*?<\/main>/,`<main class="content-width project-detail" id="main" data-project-detail data-project-id="${esc(project.id)}">${serverContent}</main>`);
  await fs.writeFile(path.join(out,'projects',`${project.id}.html`),publicPage(html.replace(/href="#/g,`href="projects/${project.id}.html#`),`/projects/${project.id}.html`));
}
let home=await fs.readFile(path.join(out,'index.html'),'utf8');
home=home.replaceAll('https://joe-kanjirathingal-portfolio.vercel.app/assets/joe-original.jpg',`${origin}/assets/social/quotecheck.png`);
home=home.replace(/<meta property="og:url" content="[^"]*">/,`<meta property="og:url" content="${origin}/">`);
await fs.writeFile(path.join(out,'index.html'),publicPage(home,'/'));
const workPath=path.join(out,'work.html');
await fs.writeFile(workPath,publicPage(await fs.readFile(workPath,'utf8'),'/work.html'));
const sitemapPath=path.join(out,'sitemap.xml');
if(production){
  const paths=['/','/work.html',...projects.map(project=>`/projects/${project.id}.html`)];
  const entries=paths.map(page=>`  <url><loc>${productionOrigin}${page}</loc></url>`).join('\n');
  await fs.writeFile(sitemapPath,`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`);
  await fs.writeFile(path.join(out,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${productionOrigin}/sitemap.xml\n`);
}else{
  await fs.rm(sitemapPath,{force:true});
  await fs.writeFile(path.join(out,'robots.txt'),'User-agent: *\nDisallow: /\n');
}
console.log(`Built ${projects.length} standalone project pages and PNG cards, homepage, catalogue, journal, and lab.`);
