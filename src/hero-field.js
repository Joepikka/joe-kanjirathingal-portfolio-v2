import {BufferAttribute,BufferGeometry,CanvasTexture,Color,Group,LineBasicMaterial,LineSegments,PerspectiveCamera,Points,PointsMaterial,Scene,WebGLRenderer} from 'three';
import {fieldLayout} from './motion-policy.mjs';

// Decorative network behind the hero portrait: nodes drift, part around the cursor and carry a signal pulse.
export function mountHeroField(host,{enabled}){
  const renderer=new WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));
  renderer.domElement.setAttribute('aria-hidden','true');
  host.append(renderer.domElement);
  const scene=new Scene(),group=new Group(),camera=new PerspectiveCamera(35,1,.1,20);
  camera.position.z=3.2;scene.add(group);
  const {nodes,edges,dust,layerOf}=fieldLayout(innerWidth>1400?900:600,11);
  const dot=document.createElement('canvas');dot.width=dot.height=64;
  const g=dot.getContext('2d');g.fillStyle='#fff';g.beginPath();g.arc(32,32,30,0,Math.PI*2);g.fill();
  const sprite=new CanvasTexture(dot);

  const nodeGeometry=new BufferGeometry(),dustGeometry=new BufferGeometry(),lineGeometry=new BufferGeometry();
  const nodePos=new Float32Array(nodes.length),dustPos=new Float32Array(dust.length),linePos=new Float32Array(edges.length*6);
  const colors=new Float32Array(nodes.length);
  nodeGeometry.setAttribute('position',new BufferAttribute(nodePos,3));
  nodeGeometry.setAttribute('color',new BufferAttribute(colors,3));
  dustGeometry.setAttribute('position',new BufferAttribute(dustPos,3));
  lineGeometry.setAttribute('position',new BufferAttribute(linePos,3));
  group.add(new LineSegments(lineGeometry,new LineBasicMaterial({color:0x263e36,transparent:true,opacity:.3})));
  group.add(new Points(dustGeometry,new PointsMaterial({color:0x263e36,size:.012,map:sprite,transparent:true,opacity:.45,depthWrite:false})));
  group.add(new Points(nodeGeometry,new PointsMaterial({size:.05,map:sprite,vertexColors:true,transparent:true,depthWrite:false})));

  // Positions change every frame, so the initial bounding spheres would cull everything.
  group.children.forEach(object=>{object.frustumCulled=false;});
  const ink=new Color(0x263e36),pulse=new Color(0x354bdf),mix=new Color();
  const offsets=new Float32Array(nodes.length+dust.length);
  let aspect=1,pointer=null,frame=0,visible=true,disposed=false;

  function place(source,target,base,time,live){
    for(let i=0;i<source.length;i+=3){
      const x=source[i]*aspect*.92+Math.sin(time*.4+i)*.012,y=source[i+1]+Math.cos(time*.33+i*.7)*.012;
      let tx=0,ty=0;
      if(pointer&&live){
        const dx=x-pointer.x,dy=y-pointer.y,d=Math.hypot(dx,dy),push=Math.max(0,1-d/.42)**2*.16;
        if(d>1e-4){tx=dx/d*push;ty=dy/d*push;}
      }
      const o=base+i/3*2;offsets[o]+=(tx-offsets[o])*.12;offsets[o+1]+=(ty-offsets[o+1])*.12;
      target[i]=x+offsets[o];target[i+1]=y+offsets[o+1];target[i+2]=source[i+2];
    }
  }
  function update(time,live){
    place(nodes,nodePos,0,time,live);place(dust,dustPos,nodes.length/3*2,time,live);
    // The pulse walks the five layers left to right, like a forward pass.
    const phase=live?(time*.9)%6.5-.5:-9;
    for(let n=0;n<nodes.length/3;n++){mix.copy(ink).lerp(pulse,Math.exp(-((phase-layerOf[n])**2)*2.5));colors.set([mix.r,mix.g,mix.b],n*3);}
    edges.forEach(([a,b],e)=>{linePos.set(nodePos.subarray(a*3,a*3+3),e*6);linePos.set(nodePos.subarray(b*3,b*3+3),e*6+3);});
    if(pointer&&live){group.rotation.y+=(pointer.x/aspect*.12-group.rotation.y)*.05;group.rotation.x+=(-pointer.y*.08-group.rotation.x)*.05;}
    for(const geometry of [nodeGeometry,dustGeometry,lineGeometry])geometry.attributes.position.needsUpdate=true;
    nodeGeometry.attributes.color.needsUpdate=true;
    renderer.render(scene,camera);
  }
  function loop(now){frame=0;if(disposed)return;const live=enabled()&&visible;update(now/1000,live);if(live)frame=requestAnimationFrame(loop);}
  function wake(){if(!frame&&!disposed)frame=requestAnimationFrame(loop);}
  function resize(){
    const {width,height}=host.getBoundingClientRect();if(!width||!height)return;
    renderer.setSize(width,height,false);aspect=width/height;camera.aspect=aspect;camera.updateProjectionMatrix();wake();
  }
  const observer=new ResizeObserver(resize);observer.observe(host);
  const seen=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;wake();});seen.observe(host);
  resize();
  return {
    wake,
    // x, y in -1..1 relative to the hero box; null when the pointer leaves.
    setPointer(p){pointer=p&&{x:p.x*aspect,y:-p.y};wake();},
    dispose(){
      disposed=true;cancelAnimationFrame(frame);observer.disconnect();seen.disconnect();
      for(const geometry of [nodeGeometry,dustGeometry,lineGeometry])geometry.dispose();
      sprite.dispose();renderer.dispose();renderer.domElement.remove();
    }
  };
}
