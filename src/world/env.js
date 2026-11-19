// Sky, sun, fog, shadows: the shared golden-hour autumn look.
import * as THREE from 'three';

export const PALETTE = {
  sunColor: 0xffd2a0,
  skyZenith: 0x2f72d8,
  skyHorizon: 0xffe3c2,
  fog: 0xf2c9a4,
  hemiSky: 0xbcd6ff,
  hemiGround: 0x8a6b4a,
  // autumn foliage
  leaves: [0xd9541e, 0xe8892b, 0xf2b632, 0xc23b22, 0x9c2f1f, 0xb8a12e, 0x6f8f3a],
  bark: 0x5b4636,
  grass: 0x7d9a45,
  grassDry: 0xb3a252,
  asphalt: 0x44454b,
  sidewalk: 0xa9a39a,
  brick: [0x9c4a36, 0xb5654a, 0x7d3f33, 0xc9a27e, 0xd8cbb8, 0x6d6f78],
};

// Direction TO the sun (normalized). Low warm afternoon sun.
export const SUN_DIR = new THREE.Vector3(-0.55, 0.52, 0.42).normalize();

const skyVert = /* glsl */`
varying vec3 vDir;
void main(){
  vDir = normalize(position);
  vec4 p = modelViewMatrix * vec4(position, 0.0);
  gl_Position = projectionMatrix * vec4(p.xyz, 1.0);
  gl_Position.z = gl_Position.w; // far plane
}`;
const skyFrag = /* glsl */`
precision highp float;
varying vec3 vDir;
uniform vec3 uSun; uniform vec3 uZenith; uniform vec3 uHorizon; uniform vec3 uSunCol; uniform float uTime;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x), f.y); }
float fbm(vec2 p){ float a=0.5, s=0.0; for(int i=0;i<5;i++){ s+=a*noise(p); p=p*2.03+vec2(11.3,7.7); a*=0.5; } return s; }
void main(){
  vec3 d = normalize(vDir);
  float h = max(d.y, 0.0);
  vec3 col = mix(uHorizon, uZenith, pow(h, 0.42));
  col = mix(col, uZenith * 0.9, smoothstep(0.25, 0.9, h) * 0.35);
  // warm band near horizon towards the sun
  float sd = max(dot(d, uSun), 0.0);
  col += uSunCol * 0.22 * pow(sd, 6.0) * (1.0 - h*0.8);
  col += uSunCol * 1.2 * pow(sd, 90.0);
  col += vec3(1.0,0.95,0.85) * 6.0 * smoothstep(0.9994, 0.9998, sd);
  // clouds
  if (d.y > 0.01) {
    vec2 uv = d.xz / (d.y + 0.12) * 0.9 + vec2(uTime*0.004, 0.0);
    float c = fbm(uv*1.4);
    float m = smoothstep(0.52, 0.78, c) * smoothstep(0.01, 0.18, d.y);
    vec3 cc = mix(vec3(1.0,0.86,0.74), vec3(1.0,0.97,0.93), smoothstep(0.55,0.9,c));
    cc += uSunCol * 0.4 * pow(sd, 4.0);
    col = mix(col, cc, m*0.85);
  }
  // below horizon: fade to haze
  col = mix(col, uHorizon*0.92, smoothstep(0.0, -0.25, d.y));
  gl_FragColor = vec4(col, 1.0);
}`;

/**
 * Sets up renderer tone mapping, sky dome, sun + shadows, hemisphere light, fog and
 * environment reflections. Returns { sun, hemi, sky, update(focus: Vector3, time: number) }.
 * opts.shadowSize (default 2048), opts.shadowRange (half size in metres, default 42)
 */
export function setupEnvironment(scene, renderer, opts = {}) {
  const shadowSize = opts.shadowSize || 2048;
  const range = opts.shadowRange || 42;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const skyMat = new THREE.ShaderMaterial({
    vertexShader: skyVert, fragmentShader: skyFrag, side: THREE.BackSide, depthWrite: false, depthTest: true, fog: false,
    uniforms: {
      uSun: { value: SUN_DIR.clone() },
      uZenith: { value: new THREE.Color(PALETTE.skyZenith) },
      uHorizon: { value: new THREE.Color(PALETTE.skyHorizon) },
      uSunCol: { value: new THREE.Color(PALETTE.sunColor) },
      uTime: { value: 0 },
    },
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16), skyMat);
  sky.frustumCulled = false; sky.renderOrder = -1000;
  scene.add(sky);

  // environment map for reflections / ambient from the sky itself
  const pm = new THREE.PMREMGenerator(renderer);
  const envScene = new THREE.Scene();
  const envSky = new THREE.Mesh(new THREE.SphereGeometry(10, 32, 16), skyMat);
  envScene.add(envSky);
  const envRT = pm.fromScene(envScene, 0.04);
  scene.environment = envRT.texture;
  scene.environmentIntensity = 0.55;
  pm.dispose();

  scene.fog = new THREE.FogExp2(PALETTE.fog, 0.0062);

  const hemi = new THREE.HemisphereLight(PALETTE.hemiSky, PALETTE.hemiGround, 0.85);
  scene.add(hemi);

  const sun = new THREE.DirectionalLight(PALETTE.sunColor, 3.4);
  sun.castShadow = true;
  sun.shadow.mapSize.set(shadowSize, shadowSize);
  const cam = sun.shadow.camera;
  cam.left = -range; cam.right = range; cam.top = range; cam.bottom = -range; cam.near = 1; cam.far = 220;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.04;
  sun.shadow.radius = 2.5;
  scene.add(sun); scene.add(sun.target);

  const texel = (range * 2) / shadowSize;
  const _f = new THREE.Vector3();
  const lightRight = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), SUN_DIR).normalize();
  const lightUp = new THREE.Vector3().crossVectors(SUN_DIR, lightRight).normalize();
  function update(focus, time) {
    skyMat.uniforms.uTime.value = time;
    // snap the shadow frustum to texel increments so shadows do not shimmer
    const r = Math.round(focus.dot(lightRight) / texel) * texel;
    const u = Math.round(focus.dot(lightUp) / texel) * texel;
    const d = focus.dot(SUN_DIR);
    _f.copy(lightRight).multiplyScalar(r).addScaledVector(lightUp, u).addScaledVector(SUN_DIR, d);
    sun.target.position.copy(_f);
    sun.position.copy(_f).addScaledVector(SUN_DIR, 110);
    sun.target.updateMatrixWorld();
  }
  update(new THREE.Vector3(), 0);
  return { sun, hemi, sky, update };
}
