export function searchProjects(projects, query) {
  const words = String(query || '').trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return projects.filter(project => {
    const text = [project.title, project.discipline, project.summary, ...(project.technologies || [])].join(' ').toLocaleLowerCase();
    return words.every(word => text.includes(word));
  });
}

export function resolveTheme(preference, systemDark) {
  return preference === 'light' || preference === 'dark' ? preference : systemDark ? 'dark' : 'light';
}

// These positions are illustrative coordinates, not trained model embeddings.
export function makeVectorSamples() {
  const groups = [
    {name:'Account access',color:'#6475ee',center:[-1.5,.6,.2],texts:['I cannot sign into my account.','Please help reset my password.','My login code has expired.','I need to recover account access.']},
    {name:'Payments',color:'#c67646',center:[1.4,.8,-.3],texts:['I was charged twice for my order.','Where can I download my invoice?','My refund has not arrived yet.','I need to update my payment card.']},
    {name:'Delivery',color:'#308d80',center:[.1,-1.1,.6],texts:['My parcel has not arrived yet.','Can I change the delivery address?','The tracking link is not updating.','When will my replacement be delivered?']}
  ];
  const offsets = [[-.35,.28,.2],[.3,.1,-.26],[-.12,-.32,-.15],[.2,-.18,.31]];
  return groups.flatMap((group,g) => group.texts.map((text,i) => ({id:`sample-${g*4+i+1}`,text,group:group.name,color:group.color,position:group.center.map((v,k)=>v+offsets[i][k])})));
}

export function nearestSample(samples, point) {
  if (!Array.isArray(point) || point.length !== 3 || !point.every(Number.isFinite)) return null;
  let nearest = null, best = Infinity;
  for (const sample of samples) {
    const distance = sample.position.reduce((sum,value,index)=>sum+(value-point[index])**2,0);
    if (distance < best) { nearest = sample; best = distance; }
  }
  return nearest;
}

export function pipelineStep(progress) {
  return Math.min(3, Math.max(0, Math.floor((Number(progress) || 0)*4)));
}
