import {
  BoxGeometry, CatmullRomCurve3, CylinderGeometry, Group, Mesh,
  MeshStandardMaterial, SphereGeometry, TorusGeometry, TubeGeometry, Vector3
} from 'three';

function material(color, emissiveIntensity = 0) {
  return new MeshStandardMaterial({color, emissive: color, emissiveIntensity, roughness: .52, metalness: .28});
}

function mesh(group, geometry, finish, x, y, z) {
  const object = new Mesh(geometry, finish);
  object.position.set(x, y, z);
  group.add(object);
  return object;
}

export function makeWorkbenchModels() {
  const slate = material(0x253451);
  const dark = material(0x131d33);
  const mint = material(0x80e7bf, .14);
  const violet = material(0x8881fb, .18);
  const gold = material(0xf3bf79, .14);
  const blue = material(0x4c7af8, .16);
  const tile = new BoxGeometry(.33, .14, .45);
  const node = new SphereGeometry(.095, 16, 12);
  const box = (group, size, finish, x, y, z) => mesh(group, new BoxGeometry(...size), finish, x, y, z);
  const disk = (group, radius, height, finish, x, y, z) =>
    mesh(group, new CylinderGeometry(radius, radius, height, 48), finish, x, y, z);
  const ring = (group, radius, width, finish, x, y, z) => {
    const object = mesh(group, new TorusGeometry(radius, width, 8, 72), finish, x, y, z);
    object.rotation.x = -Math.PI / 2;
  };
  function cable(group, points, finish, width = .024) {
    const curve = new CatmullRomCurve3(points.map(point => new Vector3(...point)));
    mesh(group, new TubeGeometry(curve, 24, width, 8), finish, 0, 0, 0);
  }
  function pedestal(name, accent) {
    const group = new Group();
    group.name = name;
    disk(group, 1.86, .22, dark, 0, -.17, 0);
    disk(group, 1.77, .12, slate, 0, -.016, 0);
    ring(group, 1.71, .015, accent, 0, .052, 0);
    for (let i = 0; i < 5; i++) {
      const x = (i - 2) * .14;
      box(group, [.07, .024, .028], accent, x, -.03, 1.766);
    }
    return group;
  }

  const markets = pedestal('Markets', mint);
  const heights = [.25, .52, .4, .78, 1.22, .63, .9, .49, .63];
  const signal = heights.map((height, index) => {
    const x = (index - 4) * .33;
    box(markets, [.19, height, .53], index === 4 ? gold : mint, x, .05 + height / 2, -.26);
    box(markets, [.22, .028, .23], slate, x, .06, .54);
    const point = [x, height + .21, -.21];
    if (index % 2 === 0) mesh(markets, node, index === 4 ? gold : blue, ...point);
    return point;
  });
  cable(markets, signal, blue, .027);
  box(markets, [2.95, .075, .84], dark, 0, .075, -.28);

  const retail = pedestal('Retail', violet);
  for (const [column, levels] of [3, 5, 4].entries()) {
    const x = (column - 1) * .76;
    box(retail, [.56, .09, .72], dark, x, .1, -.33);
    for (let i = 0; i < levels; i++) {
      mesh(retail, tile, i === levels - 1 ? violet : slate, x, .2 + i * .18, -.33);
      box(retail, [.18, .022, .025], i === levels - 1 ? mint : blue, x, .216 + i * .18, -.096);
    }
    cable(retail, [[x, .11, -.03], [x, .11, .43], [x * .65, .11, .78], [0, .11, .95]], violet);
  }
  disk(retail, .32, .16, blue, 0, .17, .98);
  ring(retail, .21, .027, mint, 0, .256, .98);

  const language = pedestal('Language', blue);
  disk(language, .53, .17, dark, 0, .15, 0);
  disk(language, .44, .43, slate, 0, .42, 0);
  ring(language, .43, .03, mint, 0, .61, 0);
  mesh(language, new SphereGeometry(.22, 24, 16), blue, 0, .78, 0);
  for (const [i, color] of [mint, violet, gold].entries()) {
    const angle = i * Math.PI * 2 / 3 + .1;
    const x = Math.cos(angle) * 1.12;
    const z = Math.sin(angle) * 1.12;
    disk(language, .26, .14, dark, x, .13, z);
    disk(language, .21, .11, color, x, .25, z);
    mesh(language, node, color, x, .55, z);
    cable(language, [[0, .68, 0], [x * .4, .84, z * .4], [x * .76, .66, z * .76], [x, .54, z]], color);
  }
  return [markets, retail, language];
}
