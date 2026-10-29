import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const root=path.resolve(import.meta.dirname,'..');
const context={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'projects.js'),'utf8'),context);
const projects=context.window.portfolioProjects;
test('every catalogue project has a complete static page and its own social PNG',()=>{
  for(const project of projects){
    const file=path.join(root,'dist','projects',`${project.id}.html`);
    assert.ok(fs.existsSync(file),`${project.id} needs a shareable HTML page`);
    const html=fs.readFileSync(file,'utf8');
    const title=html.match(/<h1>([^<]+)<\/h1>/)?.[1].replaceAll('&amp;','&').replaceAll('&#39;',"'").replaceAll('&quot;','"');
    assert.equal(title,project.title,`${project.id} needs its title in server HTML`);
    assert.ok(html.includes('property="og:title"')&&html.includes(`assets/social/${project.id}.png`),`${project.id} needs unique metadata`);
    assert.ok(html.includes('The problem')&&html.includes('Results and limits'),`${project.id} needs its actual case study before JavaScript`);
    const skip=html.match(/class="skip-link" href="([^"]+)"/)?.[1];
    assert.equal(new URL(skip,'https://preview.test/').pathname,`/projects/${project.id}.html`,'Skip link must stay on the current case study despite the base URL');
    assert.ok(!html.includes('https://joe-kanjirathingal-portfolio.vercel.app/assets/social/'), 'Preview must not point to nonexistent production share images');
    const png=fs.readFileSync(path.join(root,'dist','assets','social',`${project.id}.png`));
    assert.equal(png.readUInt32BE(16),1200);assert.equal(png.readUInt32BE(20),630);
  }
});
test('built pages reference existing local assets and preserve legacy project entry',()=>{
  const htmlFiles=['index.html','work.html','project.html','lab.html','journal.html',...projects.map(p=>`projects/${p.id}.html`)];
  for(const filename of htmlFiles){
    const file=path.join(root,'dist',filename);assert.ok(fs.existsSync(file),`${filename} exists`);
    const html=fs.readFileSync(file,'utf8');
    assert.ok(html.includes('name="robots" content="noindex,nofollow"'), 'Separate preview should not compete in search');
    const base=html.includes('<base href="../">')?path.join(root,'dist'):path.dirname(file);
    for(const match of html.matchAll(/(?:src|href)="([^"#?]+)(?:[?#][^"]*)?"/g)){
      const target=match[1];if(/^(?:https?:|mailto:|data:|tel:|\.\.\/)/.test(target))continue;
      const local=path.resolve(base,target.replace(/^\//,''));
      assert.ok(fs.existsSync(local),`${filename} references missing ${target}`);
    }
  }
});
