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

test('pointer depth stays bounded outside the surface and handles empty bounds',()=>{
  assert.equal(typeof motion.pointerDepth,'function');
  const box={left:100,top:50,width:400,height:200};
  assert.deepEqual(motion.pointerDepth(300,150,box),{x:0,y:0});
  assert.deepEqual(motion.pointerDepth(-100,1000,box),{x:-1,y:1});
  assert.deepEqual(motion.pointerDepth(100,100,{left:0,top:0,width:0,height:0}),{x:0,y:0});
});
