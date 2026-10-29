import {AmbientLight,BoxGeometry,BufferGeometry,Color,DirectionalLight,Float32BufferAttribute,Group,LineBasicMaterial,LineSegments,Mesh,MeshStandardMaterial,PerspectiveCamera,PlaneGeometry,Points,PointsMaterial,Raycaster,Scene,SphereGeometry,SRGBColorSpace,TextureLoader,Vector2,WebGLRenderer} from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

export async function mountScene(host,{samples,selectSample,selectedId}) {
  const mount=host.querySelector('[data-scene-mount]');
  const scene=new Scene(), group=new Group();scene.add(group);
  const camera=new PerspectiveCamera(38,1,.1,100);camera.position.set(0,0,7.5);
  const renderer=new WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));
  renderer.outputColorSpace=SRGBColorSpace;
  renderer.domElement.setAttribute('aria-label',host.dataset.scene==='scatter'?'Interactive synthetic text-vector plot. Equivalent sentence buttons follow.':host.dataset.scene==='device'?'Rotatable 3D device showing a QuoteCheck screenshot.':'Decorative illustrative network');
  renderer.domElement.setAttribute('role','img');
  renderer.domElement.tabIndex=0;
  mount.append(renderer.domElement);
  let controls,frame=0,disposed=false,visible=false,last=0;
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const kind=host.dataset.scene;
  const disposers=[];
  function listen(target,event,handler){target.addEventListener(event,handler);disposers.push(()=>target.removeEventListener(event,handler));}
  const lineMaterial=new LineBasicMaterial({color:0x748491,transparent:true,opacity:.3});
  function render(){if(!disposed)renderer.render(scene,camera);}
  function canAnimate(){return kind==='network'&&visible&&!document.hidden&&!media.matches&&!document.body.classList.contains('motion-paused');}
  function animate(time=0){
    frame=0;if(disposed)return;
    if(canAnimate()){
      if(time-last>32){group.rotation.y=Math.sin(time*.00015)*.2;group.rotation.x=Math.cos(time*.00012)*.08;render();last=time;}
      frame=requestAnimationFrame(animate);
    }else render();
  }
  function wake(){if(!frame&&!disposed){render();if(canAnimate())frame=requestAnimationFrame(animate);}}
  function addLines(vertices){const geometry=new BufferGeometry();geometry.setAttribute('position',new Float32BufferAttribute(vertices,3));const lines=new LineSegments(geometry,lineMaterial);group.add(lines);return lines;}
  try {
    if(kind==='network') {
      const nodes=Array.from({length:30},(_,i)=>{
        const a=i*2.399963;const r=1.1+(i%5)*.15;
        return [Math.cos(a)*r,Math.sin(a)*r*.72,Math.sin(i*1.73)*.9];
      });
      const vertices=[];nodes.forEach((point,i)=>nodes.forEach((other,j)=>{if(j>i&&point.reduce((v,n,k)=>v+(n-other[k])**2,0)<1.7)vertices.push(...point,...other);}));
      addLines(vertices);
      const geometry=new BufferGeometry();geometry.setAttribute('position',new Float32BufferAttribute(nodes.flat(),3));
      group.add(new Points(geometry,new PointsMaterial({color:0x6575d8,size:.07,sizeAttenuation:true})));
      camera.position.z=5.5;
    } else if(kind==='scatter') {
      const meshes=[];
      for(const sample of samples){
        const dot=new Mesh(new SphereGeometry(.075,16,10),new MeshStandardMaterial({color:sample.color,roughness:.4,emissive:sample.color,emissiveIntensity:.12}));
        dot.position.set(...sample.position);dot.userData.sampleId=sample.id;group.add(dot);meshes.push(dot);
      }
      addLines([-2.4,-1.65,-.7,2.4,-1.65,-.7,-2.4,-1.65,-.7,-2.4,1.65,-.7,-2.4,-1.65,-.7,-2.4,-1.65,1.6]);
      scene.add(new AmbientLight(0xffffff,2.3));
      const light=new DirectionalLight(0xffffff,2);light.position.set(3,5,5);scene.add(light);
      controls=new OrbitControls(camera,renderer.domElement);controls.enablePan=false;controls.enableZoom=false;controls.enableDamping=false;controls.minPolarAngle=Math.PI*.2;controls.maxPolarAngle=Math.PI*.8;
      const raycaster=new Raycaster();const pointer=new Vector2();let start=null;
      listen(renderer.domElement,'pointerdown',event=>{start=[event.clientX,event.clientY];});
      listen(renderer.domElement,'pointerup',event=>{
        if(!start||Math.hypot(event.clientX-start[0],event.clientY-start[1])>8)return;
        const rect=renderer.domElement.getBoundingClientRect();pointer.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);
        raycaster.setFromCamera(pointer,camera);const hit=raycaster.intersectObjects(meshes)[0];
        if(hit)selectSample(hit.object.userData.sampleId);
      });
      function highlight(id){
        meshes.forEach(mesh=>{const selected=mesh.userData.sampleId===id;mesh.scale.setScalar(selected?1.7:1);mesh.material.emissiveIntensity=selected?.45:.12;});
        const sample=samples.find(item=>item.id===id);
        renderer.domElement.setAttribute('aria-label',`Interactive illustrative text-vector plot. Selected: ${sample?.text||'none'}`);
        render();
      }
      listen(document,'portfolio-sample',event=>highlight(event.detail.id));
      highlight(selectedId||samples[0].id);
    } else if(kind==='device') {
      scene.add(new AmbientLight(0xffffff,2));
      const key=new DirectionalLight(0xffffff,4);key.position.set(3,5,6);scene.add(key);
      const fill=new DirectionalLight(0xc2d5ff,2);fill.position.set(-4,2,1);scene.add(fill);
      const bodyMaterial=new MeshStandardMaterial({color:0x333940,metalness:.55,roughness:.4});
      const screenFrame=new Mesh(new BoxGeometry(3.55,2.32,.13),bodyMaterial);screenFrame.position.y=.24;group.add(screenFrame);
      const texture=await new TextureLoader().loadAsync(new URL('assets/quotecheck-small.webp',document.baseURI).href);texture.colorSpace=SRGBColorSpace;
      if(disposed){texture.dispose();return {dispose(){}};}
      const screen=new Mesh(new PlaneGeometry(3.27,2.04),new MeshStandardMaterial({map:texture,roughness:1,metalness:0,emissive:0xffffff,emissiveMap:texture,emissiveIntensity:.45}));screen.position.set(0,.24,.075);group.add(screen);
      const base=new Mesh(new BoxGeometry(3.8,.13,2.25),bodyMaterial);base.position.set(0,-.97,1.0);group.add(base);
      const keys=new Mesh(new BoxGeometry(3.17,.012,.9),new MeshStandardMaterial({color:0x20242b,roughness:.8}));keys.position.set(0,-.897,.55);group.add(keys);
      const touchpad=new Mesh(new BoxGeometry(1.05,.012,.58),new MeshStandardMaterial({color:0x424a54,metalness:.3,roughness:.65}));touchpad.position.set(0,-.897,1.46);group.add(touchpad);
      camera.position.set(3.6,2.3,6.8);controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,-.05,.5);controls.enableZoom=false;controls.enablePan=false;controls.minPolarAngle=Math.PI*.15;controls.maxPolarAngle=Math.PI*.55;controls.minAzimuthAngle=-Math.PI*.65;controls.maxAzimuthAngle=Math.PI*.65;
    }
    if(controls) {
      controls.update();
      controls.addEventListener('change',render);
      listen(renderer.domElement,'keydown',event=>{
        if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(event.key))return;
        event.preventDefault();
        if(event.key==='Home'){controls.reset();render();return;}
        group.rotation.y+=event.key==='ArrowLeft'?-.15:event.key==='ArrowRight'?.15:0;
        group.rotation.x+=event.key==='ArrowUp'?-.1:event.key==='ArrowDown'?.1:0;render();
      });
    }
    function resize(){const {width,height}=mount.getBoundingClientRect();if(width&&height){renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();wake();}}
    const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(mount);disposers.push(()=>resizeObserver.disconnect());
    const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;wake();});intersection.observe(host);disposers.push(()=>intersection.disconnect());
    const motionObserver=new MutationObserver(wake);motionObserver.observe(document.body,{attributes:true,attributeFilter:['class']});disposers.push(()=>motionObserver.disconnect());
    listen(document,'visibilitychange',wake);listen(media,'change',wake);listen(window,'portfolio-theme-change',()=>{lineMaterial.color=new Color(document.documentElement.dataset.theme==='dark'?0x9caab2:0x748491);render();});
    listen(renderer.domElement,'webglcontextlost',event=>{
      event.preventDefault();host.classList.remove('scene-ready');
      const status=host.querySelector('[data-scene-status]');if(status)status.textContent='The 3D view stopped. The static alternative is available; use Stop 3D to reset.';
      visible=false;
    });
    resize();render();
  }catch(error){dispose();throw error;}
  function dispose(){
    if(disposed)return;disposed=true;cancelAnimationFrame(frame);controls?.dispose();disposers.forEach(fn=>fn());
    scene.traverse(object=>{object.geometry?.dispose();const materials=Array.isArray(object.material)?object.material:[object.material];materials.filter(Boolean).forEach(material=>{material.map?.dispose();material.emissiveMap?.dispose();material.dispose();});});
    renderer.dispose();renderer.domElement.remove();
  }
  return {dispose};
}
