

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function getDestinationImageUrl(destination, category = 'landmark', width = 800, height = 600) {
  const seed = hashString(`${destination}-${category}`);
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

export function getAttractionImageUrl(destination, attractionName, width = 800, height = 600) {
  const seed = hashString(`${attractionName}-${destination}`);
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

export function getTourImageUrl(destination, tourType, width = 800, height = 600) {
  const seed = hashString(`${destination}-${tourType}-tour`);
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}
