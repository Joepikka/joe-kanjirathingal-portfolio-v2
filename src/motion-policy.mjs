export const canAnimate=({paused=false,reduced=false,hidden=false}={})=>!paused&&!reduced&&!hidden;

export function pointerDepth(x,y,box){
  if(!box.width||!box.height) return {x:0,y:0};
  const clamp=value=>Math.max(-1,Math.min(1,value));
  return {x:clamp((x-box.left)/box.width*2-1),y:clamp((y-box.top)/box.height*2-1)};
}

export const spotlightMedia=(project,animate)=>project?.explainer&&animate?'loop':'image';

// "96.24%" -> parts to count up to; anything that is not one plain number stays static.
export function countParts(text){
  const m=/^(\d{1,3}(?:,\d{3})*|\d+)(?:\.(\d+))?(%?)$/.exec(text);
  if(!m)return null;
  return {prefix:'',value:Number(m[1].replace(/,/g,'')+(m[2]?'.'+m[2]:'')),decimals:m[2]?.length||0,suffix:m[3]};
}

// Seeded so the hero network keeps the same shape on every visit.
function random(seed){return()=>{seed=seed+0x6d2b79f5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}

export function fieldLayout(dustCount,seed=1){
  const rand=random(seed),layers=[5,8,10,8,5],nodes=[],edges=[],starts=[];
  layers.forEach((count,layer)=>{
    starts.push(nodes.length/3);
    for(let i=0;i<count;i++)nodes.push(-0.8+layer*0.4+(rand()-.5)*.06,-0.7+1.4*(i+.5)/count+(rand()-.5)*.05,(rand()-.5)*.4);
  });
  layers.slice(0,-1).forEach((count,layer)=>{
    const next=layers[layer+1];
    for(let i=0;i<count;i++)for(let k=0;k<2;k++)edges.push([starts[layer]+i,starts[layer+1]+Math.floor(rand()*next)]);
  });
  const dust=[];for(let i=0;i<dustCount;i++)dust.push(rand()*2-1,rand()*2-1,rand()-.5);
  return {nodes,edges,dust,layerOf:layers.flatMap((count,layer)=>Array(count).fill(layer))};
}
