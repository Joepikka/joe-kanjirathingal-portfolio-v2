// A short "signal thread" that trails the pointer; over links and buttons it coils into a ring.
// Canvas 2D, fine pointers only; the system cursor stays visible.
const COUNT=16,RING=20;

export function mountCursorThread(){
  const canvas=document.createElement('canvas');canvas.className='cursor-thread';canvas.setAttribute('aria-hidden','true');
  canvas.hidden=true;document.body.append(canvas);
  const g=canvas.getContext('2d');
  const nodes=Array.from({length:COUNT},()=>({x:-100,y:-100}));
  let pointer=null,hot=false,pulse=0,frame=0,active=false,color='#354bdf',dpr=1,spin=0;

  function resize(){
    dpr=Math.min(devicePixelRatio||1,2);
    canvas.width=innerWidth*dpr;canvas.height=innerHeight*dpr;g.setTransform(dpr,0,0,dpr,0,0);
  }
  function draw(){
    frame=0;if(!active||!pointer)return;
    spin+=.035;pulse*=.9;
    let moving=0;
    nodes.forEach((node,i)=>{
      let tx,ty,k;
      if(hot){const a=spin+i/COUNT*Math.PI*2,r=RING+pulse*14;tx=pointer.x+Math.cos(a)*r;ty=pointer.y+Math.sin(a)*r;k=.22;}
      else{const lead=i?nodes[i-1]:pointer;tx=lead.x;ty=lead.y;k=i?.42:.5;}
      const dx=tx-node.x,dy=ty-node.y;node.x+=dx*k;node.y+=dy*k;moving+=Math.abs(dx)+Math.abs(dy);
    });
    g.clearRect(0,0,innerWidth,innerHeight);
    g.strokeStyle=color;g.fillStyle=color;g.lineCap='round';
    for(let i=1;i<COUNT;i++){
      const a=nodes[i-1],b=nodes[i],t=1-i/COUNT;
      g.globalAlpha=hot?.55:t*.8;g.lineWidth=hot?1.4:.6+t*2.2;
      g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.stroke();
      if(i%4===0){g.globalAlpha=hot?.9:t;g.beginPath();g.arc(b.x,b.y,hot?2.2:1.2+t*2,0,Math.PI*2);g.fill();}
    }
    if(hot){g.globalAlpha=1;g.beginPath();g.moveTo(nodes[COUNT-1].x,nodes[COUNT-1].y);g.lineTo(nodes[0].x,nodes[0].y);g.stroke();}
    // Keep drawing while the thread moves or coils; stop once it has collapsed onto the pointer.
    if(hot||moving>.6||pulse>.02)frame=requestAnimationFrame(draw);
  }
  function wake(){if(!frame&&active)frame=requestAnimationFrame(draw);}
  function move(event){
    if(!active)return;
    if(!pointer)nodes.forEach(n=>{n.x=event.clientX;n.y=event.clientY;});
    pointer={x:event.clientX,y:event.clientY};
    hot=!!event.target.closest?.('a,button,select,input,label,[role=button]');
    wake();
  }
  function down(){if(active){pulse=1;wake();}}
  function leave(){pointer=null;g.clearRect(0,0,innerWidth,innerHeight);}
  addEventListener('resize',resize,{passive:true});
  addEventListener('pointermove',move,{passive:true});
  addEventListener('pointerdown',down,{passive:true});
  document.documentElement.addEventListener('pointerleave',leave);
  resize();
  return {
    enable(){active=true;color=getComputedStyle(document.documentElement).getPropertyValue('--blue').trim()||color;canvas.hidden=false;},
    disable(){active=false;cancelAnimationFrame(frame);frame=0;pointer=null;g.clearRect(0,0,innerWidth,innerHeight);canvas.hidden=true;}
  };
}
