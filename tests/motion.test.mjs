import test from 'node:test';
import assert from 'node:assert/strict';
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
  assert.equal(motion.spotlightMedia({loop:'a.mp4'},true),'loop');
  assert.equal(motion.spotlightMedia({loop:'a.mp4'},false),'image');
  assert.equal(motion.spotlightMedia({},true),'image');
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
