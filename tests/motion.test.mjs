import test from 'node:test';
import assert from 'node:assert/strict';
import {mountHeroSwipe} from '../src/hero-swipe.js';
const motion=await import('../src/motion-policy.mjs').catch(error=>{
  if(error.code!=='ERR_MODULE_NOT_FOUND') throw error;
  return {};
});

test('decorative motion stops for pause, reduced motion, and a hidden document',()=>{
  assert.equal(typeof motion.canAnimate,'function');
  assert.equal(motion.canAnimate({}),true);
  for(const key of ['paused','reduced','hidden']) assert.equal(motion.canAnimate({[key]:true}),false);
});

test('spotlight plays a loop only when the project has one and motion is allowed',()=>{
  assert.equal(motion.spotlightMedia({explainer:'a.mp4'},true),'loop');
  assert.equal(motion.spotlightMedia({explainer:'a.mp4'},false),'image');
  assert.equal(motion.spotlightMedia({},true),'image');
});

test('count-up only animates plain numbers and keeps their format',()=>{
  assert.deepEqual(motion.countParts('96.24%'),{prefix:'',value:96.24,decimals:2,suffix:'%'});
  assert.deepEqual(motion.countParts('1,000'),{prefix:'',value:1000,decimals:0,suffix:''});
  assert.deepEqual(motion.countParts('0.0074'),{prefix:'',value:.0074,decimals:4,suffix:''});
  for(const text of ['135 / 1,000 (13.5%)','0 / 18','Human review for every request',''])assert.equal(motion.countParts(text),null);
});

test('hero field layout is deterministic, bounded and layered',()=>{
  const a=motion.fieldLayout(300,7),b=motion.fieldLayout(300,7);
  assert.deepEqual(a,b);
  assert.equal(a.dust.length,300*3);
  assert.ok([...a.dust,...a.nodes].every(v=>v>=-1&&v<=1));
  assert.ok(a.edges.length>0&&a.edges.every(([i,j])=>i<a.nodes.length/3&&j<a.nodes.length/3));
});

test('pointer depth stays bounded outside the surface and handles empty bounds',()=>{
  assert.equal(typeof motion.pointerDepth,'function');
  const box={left:100,top:50,width:400,height:200};
  assert.deepEqual(motion.pointerDepth(300,150,box),{x:0,y:0});
  assert.deepEqual(motion.pointerDepth(-100,1000,box),{x:-1,y:1});
  assert.deepEqual(motion.pointerDepth(100,100,{left:0,top:0,width:0,height:0}),{x:0,y:0});
});

test('the hero draws a bounded trail for a touch swipe and clears it when canceled',()=>{
  const hero=new EventTarget();
  hero.getBoundingClientRect=()=>({left:10,top:20});
  const classes=new Set();
  const attributes=new Map();
  const path={
    classList:{add:name=>classes.add(name),remove:name=>classes.delete(name)},
    setAttribute:(name,value)=>attributes.set(name,value)
  };
  let enabled=true;
  const clear=mountHeroSwipe(hero,path,()=>enabled);
  const send=(type,x,{pointerType='touch',pointerId=1}={})=>hero.dispatchEvent(
    Object.assign(new Event(type,{cancelable:true}),{clientX:x,clientY:80,pointerType,pointerId,isPrimary:true})
  );
  send('pointerdown',20,{pointerType:'mouse'});
  send('pointermove',65,{pointerType:'mouse'});
  assert.equal(classes.size,0);
  send('pointerdown',30);
  send('pointermove',34);
  assert.equal(classes.size,0);
  assert.equal(send('pointermove',75,{pointerId:2}),true);
  assert.equal(classes.size,0);
  assert.equal(send('pointermove',80),true);
  assert.equal(attributes.get('points'),'20,60 70,60');
  assert.ok(classes.has('is-active'));
  for(let x=90;x<300;x+=10)send('pointermove',x);
  assert.ok(attributes.get('points').split(' ').length<=16);
  send('pointercancel',300);
  assert.equal(classes.size,0);
  send('pointermove',310);
  assert.equal(classes.size,0);
  send('pointerdown',20);
  send('pointermove',50);
  enabled=false;
  clear();
  assert.equal(classes.size,0);
  send('pointerdown',20);
  send('pointermove',50);
  assert.equal(classes.size,0);
});
