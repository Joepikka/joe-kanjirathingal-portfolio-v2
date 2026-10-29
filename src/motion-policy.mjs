export const canAnimate=({paused=false,reduced=false,hidden=false}={})=>!paused&&!reduced&&!hidden;

export function pointerDepth(x,y,box){
  if(!box.width||!box.height) return {x:0,y:0};
  const clamp=value=>Math.max(-1,Math.min(1,value));
  return {x:clamp((x-box.left)/box.width*2-1),y:clamp((y-box.top)/box.height*2-1)};
}
