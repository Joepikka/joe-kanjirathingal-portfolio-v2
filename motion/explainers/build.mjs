// Generates one HyperFrames composition and one sound-cue list per project from projects.mjs.
// Run: node build.mjs, then render each scenes/<id>.html with `hyperframes render -c`.
import fs from 'node:fs';
import path from 'node:path';
import {explainers} from './projects.mjs';

const dir = import.meta.dirname, W = 1300, H = 1000, DURATION = 20;
const TITLE_END = 1.6, STEP = 3.6, RESULT_AT = TITLE_END + STEP * 4;
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
const HEIGHTS = [.42, .78, .31, .64, .92, .5, .27, .71, .58, .36, .85, .44, .68, .29, .6, .81];
const SHADES = [.35, .55, .4, .7, .5, .9, .6, .45, .8, .65, 1, .5, .75, .4];

// Each widget returns markup plus timeline lines and sound cues, starting at `at` seconds.
function widget(w, id, at, cues) {
  const el = `#${id}`;
  const lines = [], add = s => lines.push(s);
  let html = '';
  switch (w.type) {
    case 'chips':
      html = `<div class="chips">${w.items.map((t, i) => `<span class="chip${w.accent === i ? ' accent' : ''}">${esc(t)}</span>`).join('')}</div>`;
      add(`tl.fromTo("${el} .chip",{opacity:0,y:20,scale:.92},{opacity:1,y:0,scale:1,duration:.4,ease,stagger:.16},${at + .25});`);
      w.items.forEach((_, i) => cues.push({t: at + .25 + i * .16, type: 'pop', g: .7}));
      break;
    case 'list':
      html = `<div class="list">${w.rows.map(([a, b], i) => `<div class="row"><span>${esc(a)}</span>${w.bars ? `<div class="track"><div class="fill" style="width:${w.bars[i] * 100}%"></div></div>` : ''}${b ? `<span class="tag${w.miss === i ? ' miss' : ''}">${esc(b)}</span>` : ''}</div>`).join('')}</div>${w.note ? `<p class="note">${esc(w.note)}</p>` : ''}`;
      add(`tl.fromTo("${el} .row",{opacity:0,x:-26},{opacity:1,x:0,duration:.45,ease,stagger:.15},${at + .25});`);
      w.rows.forEach((_, i) => cues.push({t: at + .25 + i * .15, type: 'tick', g: .55}));
      if (w.bars) add(`tl.fromTo("${el} .fill",{scaleX:0},{scaleX:1,duration:.8,ease,stagger:.15},${at + .45});`);
      if (w.rows.some(r => r[1])) {
        add(`tl.fromTo("${el} .tag",{opacity:0,scale:.6},{opacity:1,scale:1,duration:.3,ease:"back.out(2)",stagger:.18},${at + 1.1});`);
        w.rows.filter(r => r[1]).forEach((_, i) => cues.push({t: at + 1.1 + i * .18, type: 'pop', g: .7}));
      }
      if (w.note) add(`tl.fromTo("${el} .note",{opacity:0},{opacity:1,duration:.4},${at + 1.2});`);
      break;
    case 'bars':
      html = `<div class="bars">${w.rows.map(([a, v, d], i) => `<div class="bar-row${w.accent === i || (w.accent === undefined && i === 0) ? ' accent' : ''}"><span>${esc(a)}</span><div class="track"><div class="fill" style="width:${v * 100}%"></div></div><b>${esc(d)}</b></div>`).join('')}</div>${w.note ? `<p class="note">${esc(w.note)}</p>` : ''}`;
      add(`tl.fromTo("${el} .bar-row",{opacity:0,y:18},{opacity:1,y:0,duration:.4,ease,stagger:.14},${at + .25});`);
      add(`tl.fromTo("${el} .fill",{scaleX:0},{scaleX:1,duration:.9,ease,stagger:.14},${at + .45});`);
      cues.push({t: at + .45, type: 'whoosh', len: .5, g: .5});
      if (w.note) add(`tl.fromTo("${el} .note",{opacity:0},{opacity:1,duration:.4},${at + 1.1});`);
      break;
    case 'card': {
      html = `<div class="card"><small>${esc(w.label)}</small><p class="type">${esc(w.text)}</p></div>`;
      const typing = Math.min(1.6, .05 * w.text.length + .3);
      add(`tl.fromTo("${el} .card",{opacity:0,y:26},{opacity:1,y:0,duration:.5,ease},${at + .2});`);
      add(`tl.fromTo("${el} .type",{clipPath:"inset(0 100% 0 0)"},{clipPath:"inset(0 0% 0 0)",duration:${typing},ease:"none"},${at + .6});`);
      cues.push({t: at + .6, type: 'key', len: typing, n: w.text.replace(/\s/g, '').length});
      break;
    }
    case 'vector':
      html = `<div class="vector">${HEIGHTS.map(h => `<i style="height:${h * 100}%"></i>`).join('')}</div><p class="note">${esc(w.label)}</p>`;
      add(`tl.fromTo("${el} .vector i",{scaleY:0},{scaleY:1,duration:.55,ease,stagger:.045},${at + .25});`);
      add(`tl.fromTo("${el} .note",{opacity:0},{opacity:1,duration:.4},${at + .9});`);
      cues.push({t: at + .25, type: 'riser', len: .9, g: .5});
      break;
    case 'grid':
    case 'gridline': {
      const cells = Array.from({length: w.cells}, (_, i) => `<i style="opacity:${SHADES[i % SHADES.length]}"></i>`).join('');
      html = `${w.label ? `<p class="note top">${esc(w.label)}</p>` : ''}<div class="grid" style="grid-template-columns:repeat(${w.cols},1fr)">${cells}</div>${w.type === 'gridline' ? '<svg class="trend" viewBox="0 0 600 180"><path d="M0 150 L85 130 L170 138 L255 104 L340 112 L425 76 L510 86 L600 46"/></svg>' : ''}`;
      add(`tl.fromTo("${el} .grid i",{scale:0},{scale:1,duration:.35,ease,stagger:.035},${at + .25});`);
      if (w.label) add(`tl.fromTo("${el} .note",{opacity:0},{opacity:1,duration:.4},${at + .2});`);
      if (w.type === 'grid') add(`tl.to("${el} .grid i:nth-child(5n+3)",{backgroundColor:"var(--accent)",opacity:1,duration:.3,stagger:.08},${at + 1.5});`);
      if (w.type === 'gridline') {
        add(`tl.fromTo("${el} .trend path",{strokeDasharray:720,strokeDashoffset:720},{strokeDasharray:720,strokeDashoffset:0,duration:1.2,ease:"power2.inOut"},${at + 1});`);
        cues.push({t: at + 1, type: 'whoosh', len: 1, g: .45});
      }
      cues.push({t: at + .25, type: 'tick', g: .5});
      break;
    }
    case 'split':
      html = `<div class="split">${w.segments.map(([t, f, c]) => `<i class="${c}" style="flex:${f}">${esc(t)}</i>`).join('')}</div><p class="note between"><span>${esc(w.left)}</span><span>${esc(w.right)}</span></p>`;
      add(`tl.fromTo("${el} .split i",{scaleX:0},{scaleX:1,duration:.5,ease,stagger:.25},${at + .3});`);
      add(`tl.fromTo("${el} .note",{opacity:0},{opacity:1,duration:.4},${at + 1.1});`);
      w.segments.forEach((_, i) => cues.push({t: at + .3 + i * .25, type: 'whoosh', len: .35, g: .45}));
      break;
    case 'flow':
      html = `<div class="flow">${w.nodes.map((n, i) => `${i ? '<span class="arrow">↓</span>' : ''}<span class="node${i === w.nodes.length - 1 ? ' accent' : ''}">${esc(n)}</span>`).join('')}</div>`;
      add(`tl.fromTo("${el} .node",{opacity:0,y:20},{opacity:1,y:0,duration:.4,ease,stagger:.45},${at + .25});`);
      add(`tl.fromTo("${el} .arrow",{opacity:0,y:-10},{opacity:1,y:0,duration:.3,ease,stagger:.45},${at + .5});`);
      w.nodes.forEach((_, i) => cues.push({t: at + .25 + i * .45, type: 'pop', g: .7}));
      break;
    case 'button':
      html = `<div class="buttons"><span class="btn primary">${esc(w.primary)}</span><span class="btn">${esc(w.secondary)}</span><p class="stamp${w.blocked ? ' blocked' : ''}">${esc(w.stamp)}</p></div><div class="cursor"></div>`;
      add(`tl.fromTo("${el} .btn",{opacity:0,y:18},{opacity:1,y:0,duration:.4,ease,stagger:.12},${at + .25});`);
      add(`tl.fromTo("${el} .cursor",{opacity:0,x:560,y:420},{opacity:1,x:470,y:46,duration:.8,ease:"power2.inOut"},${at + .5});`);
      add(`tl.to("${el} .cursor",{scale:.7,duration:.1,yoyo:true,repeat:1},${at + 1.35});`);
      add(`tl.to("${el} .btn.primary",{backgroundColor:"${w.blocked ? 'var(--muted)' : 'var(--accent)'}",borderColor:"${w.blocked ? 'var(--muted)' : 'var(--accent)'}",duration:.2},${at + 1.4});`);
      add(`tl.fromTo("${el} .stamp",{opacity:0,y:8},{opacity:1,y:0,duration:.35,ease},${at + 1.55});`);
      cues.push({t: at + 1.38, type: 'click'}, {t: at + 1.55, type: w.blocked ? 'hit' : 'success', g: .7});
      break;
  }
  return {html, lines};
}

function scene(p) {
  const cues = [{t: 0.05, type: 'whoosh', len: .8, g: .8}, {t: .55, type: 'hit', g: .6}];
  const steps = p.steps.map((s, i) => {
    const at = TITLE_END + i * STEP, id = `s${i}`;
    const w = widget(s.widget, id, at, cues);
    cues.push({t: at, type: 'wipe'});
    return {s, i, at, id, ...w};
  });
  cues.push({t: RESULT_AT, type: 'wipe'}, {t: RESULT_AT + .5, type: 'chime', g: .8});
  const ink = p.dark ? '#f8f8f5' : '#1c1d20', muted = p.dark ? '#c1c6c3' : '#55585d', accent = p.dark ? '#a1afff' : '#354bdf';
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=${W}, height=${H}">
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<style>
@font-face{font-family:"DM Sans";src:url("assets/dm-sans.woff2") format("woff2");font-weight:100 1000}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden;background:${p.color}}
#root{position:relative;width:100%;height:100%;background:${p.color};color:${ink};font-family:"DM Sans",sans-serif;--ink:${ink};--muted:${muted};--accent:${accent};--line:${ink}24;--soft:${ink}14}
#head{position:absolute;left:84px;right:84px;top:70px;display:flex;justify-content:space-between;font-size:26px;letter-spacing:.14em}
#head span:last-child{color:var(--muted)}
#title{position:absolute;left:84px;right:84px;top:330px}
#title h1{font-size:132px;font-weight:400;letter-spacing:-.045em;line-height:1}
#title p{margin-top:26px;font-size:36px;color:var(--muted);letter-spacing:-.02em}
.step{position:absolute;left:84px;right:84px;top:180px;height:600px;display:grid;grid-template-columns:450px 1fr;gap:70px}
.copy .idx{font-size:26px;color:var(--muted);letter-spacing:.1em}
.copy h2{margin-top:22px;font-size:60px;font-weight:400;letter-spacing:-.04em;line-height:1.05}
.copy p{margin-top:24px;font-size:31px;line-height:1.35;color:var(--muted);letter-spacing:-.015em}
.stage{position:relative;align-self:center}
.chips{display:flex;flex-wrap:wrap;gap:16px}
.chip{padding:18px 30px;border:1.5px solid var(--line);border-radius:60px;font-size:30px}
.chip.accent{background:var(--accent);border-color:var(--accent);color:${p.dark ? '#1c1d20' : '#fff'}}
.row{display:flex;align-items:center;gap:22px;padding:20px 0;border-top:1.5px solid var(--line);font-size:31px;letter-spacing:-.02em}
.row>span:first-child{flex:1}
.row .track{flex:1}
.track{height:14px;background:var(--soft)}
.fill{height:100%;background:var(--ink);transform-origin:left}
.tag{font-size:26px;padding:7px 16px;border-radius:40px;background:var(--ink);color:${p.dark ? '#1c1d20' : '#f8f8f5'}}
.tag.miss{background:transparent;color:var(--ink);border:1.5px dashed var(--ink)}
.bar-row{display:grid;grid-template-columns:270px 1fr 120px;gap:22px;align-items:center;padding:18px 0;font-size:30px;letter-spacing:-.02em}
.bar-row b{font-weight:400;text-align:right;font-variant-numeric:tabular-nums}
.bar-row.accent .fill{background:var(--accent)}
.note{margin-top:18px;font-size:26px;color:var(--muted);letter-spacing:.02em}
.note.top{margin:0 0 18px}
.note.between{display:flex;justify-content:space-between}
.card{padding:40px 44px;background:${p.dark ? '#ffffff14' : '#fff'};border-radius:8px;box-shadow:0 22px 50px #1c1d2014}
.card small{display:block;font-size:26px;letter-spacing:.1em;color:var(--muted);text-transform:uppercase;margin-bottom:18px}
.card .type{font-size:46px;line-height:1.2;letter-spacing:-.03em}
.vector{display:flex;align-items:flex-end;gap:10px;height:330px}
.vector i{flex:1;background:var(--accent);transform-origin:bottom;border-radius:3px 3px 0 0}
.grid{display:grid;gap:10px}
.grid i{aspect-ratio:1;background:var(--ink);border-radius:4px}
.trend{display:block;width:100%;height:170px;margin-top:28px;border-bottom:1.5px solid var(--line)}
.trend path{fill:none;stroke:var(--accent);stroke-width:4}
.split{display:flex;gap:6px;height:110px}
.split i{display:grid;place-items:center;font-style:normal;font-size:28px;color:#fff;transform-origin:left}
.split .ink{background:#1c1d20}.split .grey{background:#626469}.split .blue{background:#354bdf}
.flow{display:flex;flex-direction:column;align-items:flex-start;gap:12px}
.node{padding:24px 30px;border:1.5px solid var(--line);border-radius:10px;font-size:31px;background:${p.dark ? '#ffffff0d' : '#ffffff80'}}
.node.accent{background:var(--accent);border-color:var(--accent);color:${p.dark ? '#1c1d20' : '#fff'}}
.arrow{font-size:40px;line-height:1;color:var(--muted);padding-left:34px}
.buttons{width:520px}
.btn{display:block;text-align:center;padding:24px;border-radius:60px;font-size:32px;margin-bottom:18px;border:1.5px solid var(--line)}
.btn.primary{background:var(--ink);color:${p.dark ? '#1c1d20' : '#fff'};border-color:var(--ink)}
.stamp{margin-top:10px;font-size:29px;color:var(--accent)}
.stamp.blocked{color:var(--muted)}
.cursor{position:absolute;left:0;top:0;width:34px;height:34px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 10px ${accent}33}
#result{position:absolute;left:84px;right:84px;top:300px}
#result small{font-size:26px;letter-spacing:.14em;color:var(--muted)}
#result h2{margin-top:26px;font-size:58px;font-weight:400;letter-spacing:-.035em;line-height:1.15;max-width:1050px}
#result p{margin-top:34px;font-size:32px;color:var(--muted);max-width:980px;line-height:1.35}
#rail{position:absolute;left:84px;right:84px;top:850px;height:3px;background:var(--line)}
#progress{height:100%;background:var(--accent);transform-origin:left}
#labels{position:absolute;left:84px;right:84px;top:874px;display:grid;grid-template-columns:repeat(4,1fr);gap:24px;font-size:26px;letter-spacing:-.015em}
</style>
</head>
<body>
<div id="root" data-composition-id="main" data-start="0" data-duration="${DURATION}" data-width="${W}" data-height="${H}">
<div id="head" class="clip" data-start="0" data-duration="${DURATION}"><span>${esc(p.title.toUpperCase())} · HOW IT WORKS</span><span>ILLUSTRATIVE FLOW</span></div>
<div id="title" class="clip" data-start="0" data-duration="${TITLE_END}"><h1>${esc(p.title)}</h1><p>${esc(p.discipline)}</p></div>
${steps.map(({s, i, at, id, html}) => `<div id="${id}" class="step clip" data-start="${at}" data-duration="${STEP}"><div class="copy"><p class="idx">0${i + 1} / 04</p><h2>${esc(s.title)}</h2><p>${esc(s.text)}</p></div><div class="stage">${html}</div></div>`).join('\n')}
<div id="result" class="clip" data-start="${RESULT_AT}" data-duration="${DURATION - RESULT_AT}"><small>RESULT</small><h2>${esc(p.result)}</h2><p>${esc(p.limit)}</p></div>
<div id="rail" class="clip" data-start="${TITLE_END}" data-duration="${STEP * 4}"><div id="progress"></div></div>
<div id="labels" class="clip" data-start="${TITLE_END}" data-duration="${STEP * 4}">${p.steps.map(s => `<span>${esc(s.title)}</span>`).join('')}</div>
</div>
<script>
const tl=gsap.timeline({paused:true});
const ease="power3.out";
const labels=gsap.utils.toArray("#labels span");
tl.fromTo("#title h1",{opacity:0,y:40},{opacity:1,y:0,duration:.7,ease},.05);
tl.fromTo("#title p",{opacity:0,y:20},{opacity:1,y:0,duration:.6,ease},.35);
tl.to("#title",{opacity:0,y:-24,duration:.35,ease:"power1.in"},${TITLE_END - .4});
tl.fromTo("#progress",{scaleX:0},{scaleX:1,duration:${STEP * 4},ease:"none"},${TITLE_END});
tl.set(labels,{opacity:.32},0);
${steps.map(({at, id, lines, i}) => [
    `tl.to(labels[${i}],{opacity:1,color:"${accent}",duration:.3},${at});`,
    i ? `tl.to(labels[${i - 1}],{color:"${ink}",duration:.3},${at});` : '',
    `tl.fromTo("#${id} .copy",{opacity:0,x:-30},{opacity:1,x:0,duration:.55,ease},${at});`,
    `tl.fromTo("#${id} .stage",{opacity:0},{opacity:1,duration:.3},${at + .1});`,
    ...lines,
    `tl.to("#${id}",{opacity:0,duration:.3,ease:"power1.in"},${(at + STEP - .35).toFixed(2)});`,
  ].filter(Boolean).join('\n')).join('\n')}
tl.fromTo("#result small",{opacity:0},{opacity:1,duration:.4},${RESULT_AT});
tl.fromTo("#result h2",{opacity:0,y:30},{opacity:1,y:0,duration:.6,ease},${RESULT_AT + .15});
tl.fromTo("#result p",{opacity:0,y:20},{opacity:1,y:0,duration:.5,ease},${RESULT_AT + .55});
tl.to("#result",{opacity:0,duration:.4,ease:"power1.in"},${DURATION - .45});
window.__timelines["main"]=tl;
</script>
</body>
</html>
`;
  return {html, cues: cues.sort((a, b) => a.t - b.t).map(c => ({...c, t: +c.t.toFixed(2)}))};
}

fs.mkdirSync(path.join(dir, 'scenes'), {recursive: true});
fs.mkdirSync(path.join(dir, 'cues'), {recursive: true});
for (const p of explainers) {
  const {html, cues} = scene(p);
  fs.writeFileSync(path.join(dir, 'scenes', `${p.id}.html`), html);
  fs.writeFileSync(path.join(dir, 'cues', `${p.id}.json`), JSON.stringify(cues, null, 1));
}
console.log(`Wrote ${explainers.length} scenes and cue lists.`);
