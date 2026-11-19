// The world: a small autumn city neighbourhood around a park.
//
//   createCity(world, opts) -> { group, update(dt, time, camera, focus), layout, debug }
//   opts.quality 0..1 scales ground cover (grass tufts, flowers, fallen leaves), the park ground map size and the far backdrop.
//   Collision is identical at every quality.
//
// Map (metres, Y up). "South" is -z, "east" is +x. The sun comes from the north-west.
//   park            x, z in -49..49        hills, pond (-21, 19), playground (22, 21), bandstand (-20, -20), picnic (21, -21)
//   park pavement   49..53                 utility poles on a ring at 51.6, every 22 m, wires all the way round
//   ring road       53..63 (sunk 0.14 m)   continues outward as four pairs of arms at x or z = +-58
//   outer pavement  63..67                 street trees, lamps, parked cars along the kerb
//   side blocks     front row at 67, yards to 92, back lane 92..97 (poles at 93), back row 97..111
//   corner blocks   SE cafe + market + greenhouse, NE church (steeple 30 m), NW building site + crane, SW warehouse + water tower
//   world.bounds    -116..116 on both axes; a street, far buildings and billboard trees lie beyond it
//
// layout = {
//   spawn, home (the nest in the big oak at the centre),
//   trees: the array from createTrees (also carries .group, .update and .trees for convenience),
//   pickupSpots: [{ pos, kind: 'acorn' | 'golden', where: 'roof' | 'wire' | 'ground' | 'tree' | 'special', name? }],
//   dogZones: [{ center, radius, kind: 'terrier' | 'shepherd' | 'bulldog', name }],
//   landmarks: { home, spawn, pond, playground, gazebo, picnic, steeple, church, waterTower, warehouse, cafe, market, greenhouse,
//                crane, site, scaffold, firstPole, firstRoof, bulldogYard }
// }
// Collision primitives carry extra fields that other modules may use: kind, tag, side ('S','E','N','W','corner'),
// row ('front','back',...), flat (true on flat-roofed building bodies), noCamera on thin boxes.
import * as THREE from 'three';
import { mulberry32 } from '../core/rng.js';
import { createTrees } from './trees.js';
import { Builder } from './city/builder.js';
import { makeMaterials } from './city/materials.js';
import { G, groundHeight, makePaths, buildParkGround, buildRoadNetwork } from './city/ground.js';
import { parkTreeSpecs, buildPark, buildGroundCover, buildNest } from './city/park.js';
import { buildBlocks, buildDrops } from './city/blocks.js';
import { buildStreets, wire } from './city/streets.js';
import { buildLandmarks, buildBackdrop } from './city/landmarks.js';
import { finishLayout } from './city/spots.js';
export { checkReachability } from './city/check.js';

export function createCity(world, opts = {}) {
  const quality = Math.max(0, Math.min(1, opts.quality ?? 1));
  const group = new THREE.Group(); group.name = 'city';
  world.setGroundHeightFn(groundHeight);
  world.bounds = { minX: -G.EDGE, maxX: G.EDGE, minZ: -G.EDGE, maxZ: G.EDGE };

  const S = {
    world, q: quality, group, rng: mulberry32(opts.seed ?? 20261119), mats: makeMaterials(quality), b: new Builder(world),
    treeSpecs: [], beds: [], paths: makePaths(), runs: [], golden: [], zonesRaw: [], landmarks: {},
    tufts: [], flowers: [], extraLeaves: [], lamps: [], poles: [], wires: [], spans: [], crossWires: [], washLines: [], buildings: [], roofTops: [], awnings: [], alleys: [],
    blocks: [], corners: [], dogYards: [], extPoles: [], lanePoles: [], animated: [],
    quadOf: (x, z) => (x >= 0 ? 1 : 0) + (z >= 0 ? 2 : 0),
  };
  S.run = (where, pts, tag, must) => S.runs.push({ where, pts, tag, must });
  S.wire = (a, b, o) => wire(S, a, b, o);

  const stages = {}, plainTris = () => { let n = 0; for (const [k, B] of S.b.batches) if (k.startsWith('plain|')) n += B.idx.length / 3; return n; };
  let last = 0; const stage = (name, fn) => { fn(S); const n = plainTris(); stages[name] = n - last; last = n; };
  parkTreeSpecs(S);
  stage('roads', buildRoadNetwork);
  stage('park', buildPark);
  stage('blocks', buildBlocks);
  stage('landmarks', buildLandmarks);
  stage('streets', buildStreets);
  stage('drops', buildDrops);
  stage('backdrop', buildBackdrop);
  buildParkGround(S);
  buildGroundCover(S);

  const treeSys = createTrees(world, S.treeSpecs, { quality });
  group.add(treeSys.group);
  const nestPos = buildNest(S, treeSys.trees[0]);
  const triangles = S.b.build(group);
  world.finalize();

  const fin = finishLayout(S, treeSys.trees, nestPos);
  const trees = treeSys.trees.slice();
  trees.trees = treeSys.trees; trees.group = treeSys.group; trees.update = treeSys.update;
  const layout = {
    spawn: fin.landmarks.spawn.clone(), home: nestPos.clone(), trees,
    pickupSpots: fin.pickupSpots, dogZones: fin.dogZones, landmarks: fin.landmarks,
  };
  function update(dt, time, camera, focus) {
    for (let i = 0; i < S.animated.length; i++) S.animated[i].value = time;
    if (treeSys.update) treeSys.update(dt, time, camera, focus);
  }
  return {
    group, update, layout,
    // extra data for the dev viewer and tests
    debug: { state: S, treeSys, triangles, stages },
  };
}
