const express    = require('express');
const router     = express.Router();

router.get('/campaign', async (req, res) => {
  try {
    const terrainImages = { grass: { src: '/uploads/plains.png' } }
    const provinceMap = {
      center: {
        name: 'Center',
        color: '#ffff00',
        holdings: ['0,0'],
      },
      provinceA: {
        name: 'Eastwood',
        color: '#ff9933',
        holdings: ['1,0', '1,-1', '2,-2', '2,-1', '3,-1', '4,-1', '4,-2', '4,-3', '5,-2'],
      },
      provinceB: {
        name: 'Ironreach',
        color: '#33cc99',
        holdings: ['-2,2', '-2,1', '-3,1', '-3,2', '-3,3', '-3,4']
      }
    };

    let clusterSpacing = 20
    let terrainMap = initMapData(20,20)
  
    terrainMap = generateRandomClusters({
      terrainMap,
      types: ['forest', 'hills'],
      clusterCount: [8, 12],
      sizeRange: [20, 40],
      mapRange: clusterSpacing
    });

    terrainMap = generateRandomClusters({
      terrainMap,
      types: ['desert'],
      clusterCount: [1, 1],
      sizeRange: [24, 30],
      mapRange: clusterSpacing
    });

    terrainMap = generateRandomClusters({
      terrainMap,
      types: ['mountain'],
      clusterCount: [2, 4],
      sizeRange: [12, 16],
      mapRange: clusterSpacing
    });

    terrainMap = findRiverSourceInMountains(terrainMap)
    terrainMap = setProvinces(terrainMap, provinceMap)

    res.render('campaign', { terrainMap: terrainMap, terrainImages: terrainImages, provinceMap: provinceMap });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/api/campaign', async (req, res) => {
  try {
    const terrainImages = { grass: { src: './images/grass.jpg' } }
    const provinceMap = {
      center: {
        name: 'Eastwood',
        color: '#ff9933',
        holdings: ['0,0'],
      },
      provinceA: {
        name: 'Eastwood',
        color: '#ff9933',
        holdings: ['1,0', '1,-1', '2,-2', '2,-1', '3,-1', '4,-1', '4,-2', '4,-3', '5,-2'],
      },
      provinceB: {
        name: 'Ironreach',
        color: '#33cc99',
        holdings: ['-2,2', '-2,1', '-3,1', '-3,2', '-3,3', '-3,4']
      }
    };

    let clusterSpacing = 20
    let terrainMap = initMapData(20,20)
  
    terrainMap = generateRandomClusters({
      terrainMap,
      types: ['forest', 'hills'],
      clusterCount: [8, 12],
      sizeRange: [20, 40],
      mapRange: clusterSpacing
    });

    terrainMap = generateRandomClusters({
      terrainMap,
      types: ['desert'],
      clusterCount: [1, 1],
      sizeRange: [24, 30],
      mapRange: clusterSpacing
    });

    terrainMap = generateRandomClusters({
      terrainMap,
      types: ['mountain'],
      clusterCount: [2, 4],
      sizeRange: [12, 16],
      mapRange: clusterSpacing
    });

    terrainMap = findRiverSourceInMountains(terrainMap)
    terrainMap = setProvinces(terrainMap, provinceMap)

    res.send({ terrainMap: terrainMap });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

function setProvinces(terrainMap, provinceMap) {
  // Set provinces
  for (const [provinceId, province] of Object.entries(provinceMap)) {
    for (const key of province.holdings) {
      if (terrainMap[key]) {
        terrainMap[key].province = provinceId;
        console.log(`${key}`,  `${terrainMap[key]}`)
      }
    }
  }
  return terrainMap
}

function findRiverSourceInMountains(terrainMap) {
  const mountainSources = Object.entries(terrainMap).filter(([_, tile]) => tile.type === 'mountain').map(([key]) => key.split(',').map(Number));
  if (mountainSources.length > 0) {
    for (let i = 0; i < 2; i++) {
      const [q, r] = mountainSources[Math.floor(Math.random() * mountainSources.length)];
      generateRiver({terrainMap, startQ: q, startR: r, length: 100 });
    }
  }

  for (const [key, tile] of Object.entries(terrainMap)) {
    if (tile.type === 'mountain') {
      const [q, r] = key.split(',').map(Number);
      generateCluster({ terrainMap, q, r, type: 'hills', size: randomInt(4, 8), spread: 0.8 });
    }
  }
  return terrainMap
}

function initMapData(mapCols, mapRows) {
  let terrainMap = {}
  for (let col = -Math.floor(mapCols); col <= Math.floor(mapCols); col++) {
    for (let row = -Math.floor(mapRows); row <= Math.floor(mapRows); row++) {
      const q = col;
      const r = row - Math.floor(col / 2);
      const key = `${q},${r}`;
      terrainMap[key] = {
        ...terrainPresets('plains'),
        type: 'plains'
      };
    }
  }
  return terrainMap
}

function generateRandomClusters({ terrainMap, types = ['forest', 'mountain', 'desert'], clusterCount = [2, 4], sizeRange = [10, 25], mapRange = clusterSpacing }) {
  for (const type of types) {
    const count = randomInt(clusterCount[0], clusterCount[1]);
    for (let i = 0; i < count; i++) {
      const q = randomInt(-mapRange, mapRange);
      const r = randomInt(-mapRange, mapRange);
      const size = randomInt(sizeRange[0], sizeRange[1]);
      const spread = Math.random() * 1.5 + 0.8; // ~0.8–2.3
      terrainMap = generateCluster({ terrainMap, q, r, type, size, spread });
    }
  }

  return terrainMap
}

function generateCluster({ terrainMap, q, r, type, size = 10, spread = 1.5 }) {
  const visited = new Set();
  const toVisit = [{ q, r }];
  let placed = 0;

  while (toVisit.length && placed < size) {
    const current = toVisit.shift();
    const key = `${current.q},${current.r}`;
    if (visited.has(key)) continue;
    visited.add(key);

    const existing = terrainMap[key];
    if (existing && existing.type !== 'mountain' && existing.type !== 'river' && existing.type !== 'lake') {
      terrainMap[key] = {
        ...terrainPresets(type),
        type
      };
      placed++;
    }

    const directions = [
      { q: 1, r: 0 }, { q: -1, r: 0 },
      { q: 0, r: 1 }, { q: 0, r: -1 },
      { q: 1, r: -1 }, { q: -1, r: 1 }
    ];
    
    for (const dir of directions) {
      if (Math.random() < spread) {
        toVisit.push({ q: current.q + dir.q, r: current.r + dir.r });
      }
    }
  }

  return terrainMap
}

function generateRiver({terrainMap, startQ, startR, length = 100 }) {
  let q = startQ;
  let r = startR;

  const directions = [
    { q: 1, r: 0 },   // E
    { q: 1, r: -1 },  // NE
    { q: 0, r: -1 },  // NW
    { q: -1, r: 0 },  // W
    { q: -1, r: 1 },  // SW
    { q: 0, r: 1 },   // SE
  ];

  let prevDir = null;

  for (let i = 0; i < length; i++) {
    const key = `${q},${r}`;
    if (terrainMap[key]) {
      terrainMap[key] = {
        ...terrainPresets('river'),
        type: 'river'
      };
    }

    // Get valid directions
    const candidates = directions
      .map((dir, idx) => {
        const nq = q + dir.q;
        const nr = r + dir.r;
        const nKey = `${nq},${nr}`;
        const isValid = terrainMap[nKey]
          && terrainMap[nKey].type !== 'mountain'
          && terrainMap[nKey].type !== 'river'
          && !hasAdjacentRiver(nq, nr, q, r);

        return isValid ? { q: nq, r: nr, dir, idx } : null;
      })
      .filter(Boolean);

    if (!candidates.length) {
      const currentTile = terrainMap[key];
      if (currentTile && currentTile.type === 'plains') {
        generateLakeCluster(q, r);
      }
      break;
    }

    // Early termination if next to map edge
    if (isAdjacentToMapEdge(q, r)) {
      // Optionally: form lake if terrain is plains
      const tile = terrainMap[`${q},${r}`];
      if (tile && tile.type === 'plains') {
        generateLakeCluster(q, r);
      }
      break;
    }

    // Favor directions similar to previous, avoid backtracking
    if (prevDir !== null) {
      candidates.sort((a, b) => {
        const angleDiffA = Math.min(Math.abs(a.idx - prevDir), 6 - Math.abs(a.idx - prevDir));
        const angleDiffB = Math.min(Math.abs(b.idx - prevDir), 6 - Math.abs(b.idx - prevDir));
        return angleDiffA - angleDiffB;
      });
    }

    // Select best available direction with small randomness
    const maxBias = Math.min(2, candidates.length - 1);
    const choiceIndex = Math.random() < 0.6 ? 0 : randomInt(1, maxBias);
    const next = candidates[choiceIndex];
    if (next) {
      prevDir = next.idx;
      q = next.q;
      r = next.r;
    }

    function isAdjacentToMapEdge(q, r) {
      return directions.some(dir => {
        const nq = q + dir.q;
        const nr = r + dir.r;
        return !terrainMap[`${nq},${nr}`];
      });
    }
  }

  function hasAdjacentRiver(q, r, fromQ, fromR) {
    return directions.some(dir => {
      const nq = q + dir.q;
      const nr = r + dir.r;
      const key = `${nq},${nr}`;
      return (nq !== fromQ || nr !== fromR) &&
            terrainMap[key]?.type === 'river';
    });
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function terrainPresets(terrain) {
  const terrainPresets = {
    'plains':       { color: '#4caf50', image: 'plains', title: 'Plains' },
    'plains-river': { color: '#4caf50', image: 'plains-river', title: 'Plains with River' },
    'forest':       { color: '#388e3c', image: 'forest', title: 'Forest' },
    'mountain':     { color: '#888888', image: 'mountain', title: 'Mountain' },
    'desert':       { color: '#a67c52', image: 'desert', title: 'Desert' },
    'river':        { color: '#3399ff', image: 'river', title: 'River' },
    'lake':         { color: '#3f88c5', image: 'lake', title: 'Lake' },
    'hills':        { color: '#6c8b3c', image: 'hills', title: 'Hills' }
  };
  return terrainPresets[terrain]
}

module.exports = router;
