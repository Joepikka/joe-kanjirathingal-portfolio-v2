import {DirectionalLight, HemisphereLight, OrthographicCamera, Scene, WebGLRenderer} from 'three';
import {makeWorkbenchModels} from './workbench-models.js';

export function mountWorkbenchScene(host, {onLost, motionAllowed}) {
  const renderer = new WebGLRenderer({alpha: true, antialias: true, powerPreference: 'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-hidden', 'true');
  const scene = new Scene();
  const camera = new OrthographicCamera(-3, 3, 2.5, -2.5, .1, 50);
  camera.position.set(4.6, 4, 6.4);
  camera.lookAt(0, .35, 0);
  scene.add(new HemisphereLight(0xdbe7ff, 0x35415e, 2.4));
  const key = new DirectionalLight(0xffead3, 3.2);
  key.position.set(3.5, 7, 5);
  scene.add(key);
  const rim = new DirectionalLight(0x80a8ff, 2.2);
  rim.position.set(-4, 4, -3);
  scene.add(rim);

  const models = makeWorkbenchModels();
  scene.add(...models);
  let active = 0;
  let heading = 0;
  let frame = 0;
  let drag = null;
  let disposed = false;
  let visible = true;
  host.append(canvas);

  function draw() {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    const model = models[active];
    const delta = heading - model.rotation.y;
    model.rotation.y = motionAllowed() && Math.abs(delta) > .002
      ? model.rotation.y + delta * .19
      : heading;
    renderer.render(scene, camera);
    if (model.rotation.y !== heading) wake();
  }
  function wake() {
    if (!frame && !disposed && visible && !document.hidden) frame = requestAnimationFrame(draw);
  }
  function resize() {
    const {width, height} = host.getBoundingClientRect();
    if (!width || !height) return;
    const aspect = width / height;
    const halfHeight = Math.max(2.38, 2.36 / aspect);
    camera.top = halfHeight;
    camera.bottom = -halfHeight;
    camera.right = halfHeight * aspect;
    camera.left = -camera.right;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    wake();
  }
  function select(index, direction = 0) {
    active = index;
    heading = 0;
    models.forEach((model, i) => { model.visible = i === index; });
    models[index].rotation.y = motionAllowed() ? direction * .55 : 0;
    wake();
  }
  function turn(amount) {
    heading += amount;
    wake();
  }
  canvas.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0) return;
    drag = {id: event.pointerId, x: event.clientX};
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener('pointermove', event => {
    if (drag?.id !== event.pointerId) return;
    turn((event.clientX - drag.x) * .022);
    drag.x = event.clientX;
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) {
    canvas.addEventListener(type, event => {
      if (drag?.id === event.pointerId) drag = null;
    });
  }
  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    onLost();
  });
  const sizeObserver = new ResizeObserver(resize);
  sizeObserver.observe(host);
  const viewportObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    wake();
  });
  viewportObserver.observe(host);
  document.addEventListener('visibilitychange', wake);
  select(0);
  resize();

  function dispose() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frame);
    sizeObserver.disconnect();
    viewportObserver.disconnect();
    document.removeEventListener('visibilitychange', wake);
    const resources = new Set();
    scene.traverse(object => {
      if (object.geometry) resources.add(object.geometry);
      if (object.material) resources.add(object.material);
    });
    resources.forEach(resource => resource.dispose());
    renderer.dispose();
    canvas.remove();
  }
  return {select, turn, wake, dispose};
}
