// Shared materials for the city. All merged meshes use 4-component vertex colours:
// rgb = tint * ambient darkening, a = ambient darkening alone.
import * as THREE from 'three';
import * as T from './textures.js';

// Textured material whose texture alpha selects between the vertex tint (alpha 1, e.g. the
// bricks) and a fixed secondary colour (alpha 0, e.g. the mortar).
function tinted(name, t, second, o = {}) {
  const m = new THREE.MeshStandardMaterial({
    name, map: t.map, normalMap: t.normalMap || null, vertexColors: true,
    roughness: o.roughness ?? 0.9, metalness: 0, side: o.side || THREE.FrontSide,
  });
  if (t.normalMap) m.normalScale.set(o.normal ?? 1, o.normal ?? 1);
  const uSecond = { value: new THREE.Color(second) };
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uSecond = uSecond;
    sh.fragmentShader = sh.fragmentShader
      .replace('void main() {', 'uniform vec3 uSecond;\nvoid main() {')
      .replace('#include <color_fragment>', `#include <color_fragment>
        #ifdef USE_MAP
          diffuseColor.rgb = mix(uSecond * vColor.a, diffuseColor.rgb, sampledDiffuseColor.a);
        #endif`);
  };
  m.customProgramCacheKey = () => 'tinted';
  m.userData = { tile: t.tile || 1, cast: o.cast !== false, ...(o.user || {}) };
  if (o.offset) { m.polygonOffset = true; m.polygonOffsetFactor = -o.offset; m.polygonOffsetUnits = -o.offset * 2; }
  return m;
}

export function makeMaterials(quality = 1) {
  const brick = T.brickTex(1), stone = T.stoneTex(2), stucco = T.stuccoTex(3), tiles = T.tileTex(4), wood = T.woodTex(5);
  const paving = T.pavingTex(6), asphalt = T.asphaltTex(7), stripe = T.stripeTex(), paint = T.paintTex(), grassTile = T.grassTileTex();
  const atlas = T.atlasTex(), back = T.backdropTex();
  const M = {};
  M.brick = tinted('brick', brick, 0xcfc4b2, { roughness: 0.92, normal: 0.9 });
  M.stone = tinted('stone', stone, 0xa39c8e, { roughness: 0.95, normal: 1.0 });
  M.stucco = tinted('stucco', stucco, 0xffffff, { roughness: 0.95, normal: 0.6 });
  M.tiles = tinted('tiles', tiles, 0x222222, { roughness: 0.8, normal: 1.0 });
  M.wood = tinted('wood', wood, 0x000000, { roughness: 0.85, normal: 0.8 });
  M.paving = tinted('paving', paving, 0x000000, { roughness: 0.92, normal: 0.7, cast: false });
  M.asphalt = tinted('asphalt', asphalt, 0x000000, { roughness: 0.88, normal: 0.6, cast: false });
  M.roofing = tinted('roofing', asphalt, 0x000000, { roughness: 0.95, normal: 0.5, cast: false });
  M.roofing.userData.tile = 3;
  M.cloth = tinted('cloth', stripe, 0xf3ead8, { roughness: 0.9, side: THREE.DoubleSide });
  M.grassTile = tinted('grassTile', grassTile, 0x000000, { roughness: 1, cast: false, offset: 1 });

  // untextured, vertex coloured
  M.plain = new THREE.MeshStandardMaterial({ name: 'plain', vertexColors: true, roughness: 0.78, metalness: 0 });
  M.plain.userData = { cast: true };
  M.gloss = new THREE.MeshStandardMaterial({ name: 'gloss', vertexColors: true, roughness: 0.28, metalness: 0.25, envMapIntensity: 1.3 });
  M.gloss.userData = { cast: true };
  M.metal = new THREE.MeshStandardMaterial({ name: 'metal', vertexColors: true, roughness: 0.45, metalness: 0.75, envMapIntensity: 1.2 });
  M.metal.userData = { cast: true };
  M.glow = new THREE.MeshStandardMaterial({ name: 'glow', vertexColors: true, roughness: 0.6, emissive: 0xffc070, emissiveIntensity: 2.2, color: 0xffe0b0 });
  M.glow.userData = { cast: false, receive: false };
  M.cards = new THREE.MeshStandardMaterial({ name: 'cards', vertexColors: true, roughness: 0.9, side: THREE.DoubleSide });
  M.cards.userData = { cast: false };

  // windows, doors, signs
  M.atlas = new THREE.MeshStandardMaterial({
    name: 'atlas', map: atlas.map, emissiveMap: atlas.emissiveMap, emissive: 0xffffff, emissiveIntensity: 1.15,
    roughnessMap: atlas.roughnessMap, roughness: 1, metalness: 0, vertexColors: true, envMapIntensity: 1.6,
  });
  M.atlas.userData = { cast: false };

  // road paint decals
  M.paint = new THREE.MeshStandardMaterial({ name: 'paint', map: paint.map, vertexColors: true, transparent: true, roughness: 0.8, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4 });
  M.paint.userData = { cast: false, tile: paint.tile, order: 2 };

  // glass panes (greenhouse, shelters, skylights)
  M.pane = new THREE.MeshStandardMaterial({ name: 'pane', vertexColors: true, transparent: true, opacity: 0.38, roughness: 0.08, metalness: 0.1, envMapIntensity: 2.0, side: THREE.DoubleSide, depthWrite: false });
  M.pane.userData = { cast: false, order: 5 };

  // water
  M.water = new THREE.MeshPhysicalMaterial({ name: 'water', color: 0x3f6a66, roughness: 0.06, metalness: 0.0, transparent: true, opacity: 0.82, envMapIntensity: 2.2, vertexColors: true });
  M.water.userData = { cast: false, order: 3 };

  // backdrop
  M.far = new THREE.MeshStandardMaterial({ name: 'far', map: back.map, emissiveMap: back.emissiveMap, emissive: 0xffffff, emissiveIntensity: 0.6, vertexColors: true, roughness: 1 });
  M.far.userData = { cast: false, receive: false, tile: back.tile, global: true };

  M._tex = { atlas, quality };
  return M;
}

/** Park ground: one big painted colour map times a tiling detail texture (grass or gravel, picked by a mask). */
export function parkGroundMaterial(colorMap, maskMap) {
  const dg = T.grassDetailTex(), dp = T.gravelDetailTex();
  const m = new THREE.MeshStandardMaterial({ name: 'parkGround', map: colorMap, roughness: 1, metalness: 0 });
  const u = { uDetA: { value: dg }, uDetB: { value: dp }, uMask: { value: maskMap } };
  m.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, u);
    sh.vertexShader = sh.vertexShader.replace('void main() {', 'varying vec2 vWuv;\nvoid main() {\n vWuv = position.xz;');
    sh.fragmentShader = sh.fragmentShader
      .replace('void main() {', 'uniform sampler2D uDetA; uniform sampler2D uDetB; uniform sampler2D uMask; varying vec2 vWuv;\nvoid main() {')
      .replace('#include <map_fragment>', `#include <map_fragment>
        vec3 dA = mix(texture2D(uDetA, vWuv * 0.5).rgb, texture2D(uDetA, vWuv * 0.137 + 0.31).rgb, 0.45);
        vec3 dB = texture2D(uDetB, vWuv * 0.62).rgb;
        float pm = texture2D(uMask, vMapUv).r;
        diffuseColor.rgb *= mix(dA, dB, pm) * 2.0;`);
  };
  m.userData = { cast: false };
  return m;
}

/** Alpha-tested instanced cards (grass tufts, flowers, fallen leaves) that sway in the wind. */
export function cardMaterial(name, map, sway) {
  const m = new THREE.MeshStandardMaterial({ name, map, alphaTest: 0.42, side: THREE.DoubleSide, roughness: 1, metalness: 0 });
  const uTime = { value: 0 };
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uTime = uTime;
    sh.vertexShader = sh.vertexShader
      .replace('void main() {', 'uniform float uTime;\nvoid main() {')
      .replace('#include <begin_vertex>', `#include <begin_vertex>
        #ifdef USE_INSTANCING
          float ph = instanceMatrix[3].x * 0.35 + instanceMatrix[3].z * 0.27;
          float sw = (sin(uTime * 1.6 + ph) + 0.5 * sin(uTime * 3.7 + ph * 2.3)) * ${sway.toFixed(3)} * uv.y * uv.y;
          transformed.x += sw; transformed.z += sw * 0.6;
        #endif`);
    // light both sides of a card the same way (no flipped normal on the back face)
    sh.fragmentShader = sh.fragmentShader.replace('#include <normal_fragment_begin>', '#include <normal_fragment_begin>\n normal = normalize(vNormal);');
  };
  m.userData = { uTime };
  return m;
}
