// The hero: a fully procedural, procedurally animated squirrel.
//
//   createSquirrel(opts) -> { group, update(dt, s), trigger(name, data), getHeadWorldPosition(out) }
//
// Local frame of `group`: origin = point on the surface between the feet, +Y = surface normal, +Z = facing.
// Everything is animated in that local frame, so the game can rotate the group onto walls or ceilings.
//
// How it is built (3 draw calls, about 21k triangles):
//  1. "fur" mesh: one dynamic geometry rebuilt on the CPU every frame. A body tube swept along a spine
//     curve (rump, hips, chest, neck, rigid head rings), four leg tubes on two-bone inverse kinematics,
//     a tail core tube, and small rigid parts (paws, ears, eyes, nose) placed by matrices.
//  2. "shell" mesh: the tail plume. The tail tube instanced 16 times, pushed out along its normals, with a
//     strand pattern cut out in the fragment shader (shell fur), pale frosted tips around the silhouette.
//  3. "hair" mesh: camera-facing alpha-tested hair cards (cheek, chest and rump fluff, ear tufts, whiskers).
// The tail is a 12 joint spring chain with follow-through. Poses are plain parameter arrays that get blended,
// then solved (spine curve, analytic leg IK) and written straight into the vertex buffers. Nothing is
// allocated per frame.
//
// s.turn is the yaw rate in rad/s, positive = turning towards local +X (a positive rotation about +Y).
import * as THREE from 'three';
import { mulberry32 } from '../core/rng.js';
import { SUN_DIR } from '../world/env.js';

const TAU = Math.PI * 2, PI = Math.PI;
const clamp = (x, a, b) => (x < a ? a : x > b ? b : x);
const lerp = (a, b, t) => a + (b - a) * t;
const sstep = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const fract = (x) => x - Math.floor(x);
const damp = (cur, target, tau, dt) => cur + (target - cur) * (1 - Math.exp(-dt / tau));

// ------------------------------------------------------------------ pose parameters
const HIPY = 0, HIPZ = 1, HIPP = 2, CHY = 3, CHZ = 4, CHP = 5, YAWB = 6, ROLL = 7, HDY = 8, HDZ = 9, HYAW = 10, HPIT = 11, HROL = 12,
  FLX = 13, FLY = 14, FLZ = 15, FRX = 16, FRY = 17, FRZ = 18, HLX = 19, HLY = 20, HLZ = 21, HRX = 22, HRY = 23, HRZ = 24,
  FLP = 25, FRP = 26, HLP = 27, HRP = 28, HFY = 29, SPLAY = 30, TP0 = 31, TC1 = 32, TC2 = 33, TYAW = 34, TSTIF = 35, TFLUF = 36, SIT = 37,
  NP = 38;

// skeleton dimensions (metres)
const THIGH = 0.095, SHANK = 0.1, HFOOT = 0.058;   // hind: hip-knee, knee-ankle, ankle-ball
const UARM = 0.072, FARM = 0.078, FPAW = 0.02;     // front: shoulder-elbow, elbow-wrist, wrist-palm
const RUMP = 0.088;
const TAIL_N = 12, TAIL_SEG = 0.0385, TAIL_SUB = 2, TAIL_ST = TAIL_N * TAIL_SUB + 1;
const TAIL_H1 = 6; // joints in the first (base) half
const TAIL_FUR = 0.066, TAIL_CORE = 0.034;

function setFeet(P, fx, fy, fz, fp, hx, hy, hz, hp) {
  P[FLX] = fx; P[FLY] = fy; P[FLZ] = fz; P[FRX] = -fx; P[FRY] = fy; P[FRZ] = fz; P[FLP] = fp; P[FRP] = fp;
  P[HLX] = hx; P[HLY] = hy; P[HLZ] = hz; P[HRX] = -hx; P[HRY] = hy; P[HRZ] = hz; P[HLP] = hp; P[HRP] = hp;
}

// frozen on all fours: low, ready, tail in a soft arch behind
function poseStand(P) {
  P.fill(0);
  P[HIPY] = 0.132; P[HIPZ] = -0.088; P[HIPP] = 0.36; P[CHY] = 0.108; P[CHZ] = 0.08; P[CHP] = -0.24;
  P[HDY] = 0.04; P[HDZ] = 0.128; P[HPIT] = 0.06;
  setFeet(P, 0.036, 0, 0.115, 0.05, 0.07, 0, -0.04, 0.25);
  P[TP0] = 0.75; P[TC1] = -0.03; P[TC2] = -0.16; P[TSTIF] = 1; P[TFLUF] = 1;
}

// sitting up on the haunches, front paws tucked, tail up in an S
function poseSit(P) {
  P.fill(0);
  P[HIPY] = 0.082; P[HIPZ] = -0.072; P[HIPP] = 1.02; P[CHY] = 0.228; P[CHZ] = -0.01; P[CHP] = 1.25;
  P[HDY] = 0.1; P[HDZ] = 0.098; P[HPIT] = 0.02;
  setFeet(P, 0.023, 0.172, 0.062, 1.25, 0.078, 0, 0.012, 0.0);
  P[TP0] = 1.0; P[TC1] = 0.12; P[TC2] = -0.42; P[TSTIF] = 1.25; P[TFLUF] = 1.05; P[SIT] = 1;
}

// pressed against a steep surface, limbs splayed. cd = 1 when facing down (hind feet turned back)
function poseCling(P, cd, alert) {
  P.fill(0);
  P[HIPY] = 0.058; P[HIPZ] = -0.094; P[HIPP] = 0.0; P[CHY] = 0.056 + 0.03 * alert; P[CHZ] = 0.086; P[CHP] = 0.1 + 0.22 * alert;
  P[HDY] = 0.03 + 0.03 * alert; P[HDZ] = 0.124 - 0.015 * alert; P[HPIT] = 0.25 + 0.4 * alert;
  setFeet(P, 0.1, 0, 0.165, 0.05, lerp(0.115, 0.085, cd), 0, lerp(-0.06, -0.2, cd), 0.12);
  P[HFY] = PI * cd; P[SPLAY] = 1;
  P[TP0] = 0.06; P[TC1] = 0.0; P[TC2] = 0.012; P[TSTIF] = 1.1; P[TFLUF] = 1;
}

export function strideLength(speed, steep = 0) {
  const sn = clamp(speed / 12, 0, 1);
  return (0.25 + 0.65 * Math.pow(sn, 0.85)) * (1 - 0.15 * steep);
}

let fcZ = 0, fcY = 0, fcP = 0;
function footCycle(phk, duty, L, hind, bw) {
  if (phk < duty) {
    const u = phk / duty;
    fcZ = L * (0.5 - u); fcY = 0;
    fcP = hind ? 0.3 + 0.9 * u * u : 0.05 + 0.75 * u * u * u;
  } else {
    const s = (phk - duty) / (1 - duty), m = -1.3, s2 = s * s, s3 = s2 * s;
    fcZ = L * (-0.5 * (2 * s3 - 3 * s2 + 1) + m * (s3 - 2 * s2 + s) + 0.5 * (-2 * s3 + 3 * s2) + m * (s3 - s2));
    const arc = Math.sin(PI * s);
    if (hind) {
      const early = Math.sin(PI * Math.min(1, s * 1.7)); const e2 = early * early;
      fcY = (0.028 + 0.03 * bw) * arc + 0.05 * bw * e2;
      fcZ -= 0.085 * bw * e2;
      fcP = s < 0.35 ? lerp(1.2, 2.3, s / 0.35) : lerp(2.3, 0.3, sstep(0.35, 1, s));
    } else {
      const late = Math.sin(PI * Math.pow(s, 1.5)); const l2 = late * late;
      fcY = (0.024 + 0.025 * bw) * arc + 0.045 * bw * l2;
      fcZ += 0.07 * bw * l2;
      fcP = s < 0.3 ? lerp(0.8, 1.4, s / 0.3) : s < 0.8 ? lerp(1.4, -0.2, sstep(0.3, 0.8, s)) : lerp(-0.2, 0.05, (s - 0.8) / 0.2);
    }
  }
}

// locomotion: scurry (diagonal) at low speed, bounding gallop at speed, splayed alternating climb on steep surfaces
function poseGait(P, ph, speed, steep, climb, thin) {
  P.fill(0);
  const sn = clamp(speed / 12, 0, 1);
  const bw = sstep(1.6, 4.0, speed) * (1 - steep);
  const stride = strideLength(speed, steep);
  const maxTravel = lerp(0.14, 0.215, bw);
  const duty = Math.min(lerp(0.5, 0.4, bw), maxTravel / stride);
  const L = duty * stride;
  const cd = Math.max(0, -climb) * steep;
  const a = TAU * ph;
  // --- body
  const fa = 0.55 + 0.45 * sn;
  const A = 0.012 + 0.02 * sn;
  const flex = Math.cos(a - TAU * 0.37);
  // bound
  const bHipY = 0.128 + A * 1.1 * Math.cos(a - TAU * 0.16), bChY = 0.116 + A * Math.cos(a - TAU * 0.74);
  const bHipZ = -0.096 + 0.034 * flex * fa, bChZ = 0.088 - 0.024 * flex * fa;
  const bHipP = 0.1 + 0.42 * flex * fa, bChP = -0.03 - 0.3 * flex * fa;
  // scurry
  const sHipY = 0.113 + 0.004 * Math.cos(2 * a), sChY = 0.103 + 0.004 * Math.cos(2 * a + 1.2);
  let hipY = lerp(sHipY, bHipY, bw), chY = lerp(sChY, bChY, bw);
  let hipZ = lerp(-0.098, bHipZ, bw), chZ = lerp(0.084, bChZ, bw);
  let hipP = lerp(0.1, bHipP, bw), chP = lerp(-0.04, bChP, bw);
  let yawb = lerp(0.11, 0.0, bw) * Math.sin(a + 0.6);
  let hdy = lerp(0.03, 0.036 - 0.55 * (bChY - 0.116), bw), hdz = lerp(0.128, 0.132, bw), hpit = lerp(0.1, 0.06 + 0.07 * flex, bw);
  let tp0 = lerp(0.22, 0.26 + 0.2 * Math.cos(a - TAU * 0.22), bw), tc1 = lerp(0.0, 0.012, bw), tc2 = 0.03;
  // climbing: pressed to the surface
  if (steep > 0.001) {
    hipY = lerp(hipY, 0.059 + 0.003 * Math.cos(2 * a), steep); chY = lerp(chY, 0.056, steep);
    hipZ = lerp(hipZ, -0.096, steep); chZ = lerp(chZ, 0.086, steep);
    hipP = lerp(hipP, 0.02, steep); chP = lerp(chP, 0.1, steep);
    yawb = lerp(yawb, 0.3 * Math.sin(a + 0.6), steep);
    hdy = lerp(hdy, 0.03, steep); hpit = lerp(hpit, 0.3, steep);
    tp0 = lerp(tp0, 0.05, steep); tc1 = lerp(tc1, 0, steep); tc2 = lerp(tc2, 0.01, steep);
  }
  hipY -= 0.012 * thin; chY -= 0.012 * thin;
  P[HIPY] = hipY; P[HIPZ] = hipZ; P[HIPP] = hipP; P[CHY] = chY; P[CHZ] = chZ; P[CHP] = chP; P[YAWB] = yawb;
  P[HDY] = hdy; P[HDZ] = hdz; P[HPIT] = hpit;
  P[ROLL] = 0.05 * thin * Math.sin(a);
  P[TP0] = tp0; P[TC1] = tc1; P[TC2] = tc2; P[TSTIF] = 1; P[TFLUF] = 1;
  P[SPLAY] = steep; P[HFY] = PI * cd;
  // --- feet
  const line = 1 - 0.86 * thin;
  const fx = lerp(lerp(0.037, 0.03, bw), 0.098, steep) * line, hx = lerp(lerp(0.06, 0.07, bw), 0.112, steep) * line;
  const z0f = lerp(0.105, 0.128, bw) + 0.045 * steep, z0h = lerp(-0.07, -0.062, bw) + 0.01 * steep - 0.13 * cd;
  const oFR = lerp(0.5, 0.07, bw), oHL = lerp(0.5, 0.4, bw), oHR = lerp(1.0, 0.47, bw);
  const yk = 1 - 0.55 * steep, pk = 1 - 0.7 * steep; // on steep surfaces the paws stay close and flat
  footCycle(fract(ph), duty, L, false, bw); P[FLX] = fx; P[FLY] = fcY * yk; P[FLZ] = z0f + fcZ; P[FLP] = fcP * pk;
  footCycle(fract(ph - oFR + 1), duty, L, false, bw); P[FRX] = -fx; P[FRY] = fcY * yk; P[FRZ] = z0f + fcZ; P[FRP] = fcP * pk;
  footCycle(fract(ph - oHL + 1), duty, L, true, bw); P[HLX] = hx; P[HLY] = fcY * yk; P[HLZ] = z0h + fcZ; P[HLP] = fcP * pk;
  footCycle(fract(ph - oHR + 2), duty, L, true, bw); P[HRX] = -hx; P[HRY] = fcY * yk; P[HRZ] = z0h + fcZ; P[HRP] = fcP * pk;
}

// airborne: the flying leap. fall = 0 while rising, 1 while dropping towards the landing
function poseAir(P, fall) {
  P.fill(0);
  P[HIPY] = 0.116 + 0.022 * fall; P[HIPZ] = -0.116 + 0.03 * fall; P[HIPP] = -0.08 + 0.34 * fall;
  P[CHY] = 0.114 - 0.016 * fall; P[CHZ] = 0.102 - 0.008 * fall; P[CHP] = 0.08 - 0.3 * fall;
  P[HDY] = 0.032; P[HDZ] = 0.134; P[HPIT] = 0.14 - 0.34 * fall;
  setFeet(P, lerp(0.03, 0.038, fall), lerp(0.118, 0.02, fall), lerp(0.285, 0.24, fall), lerp(0.1, -0.35, fall),
    lerp(0.056, 0.068, fall), lerp(0.098, 0.03, fall), lerp(-0.36, -0.06, fall), lerp(3.3, 0.7, fall));
  P[TP0] = lerp(0.1, 0.6, fall); P[TC1] = 0; P[TC2] = lerp(0.0, 0.03, fall); P[TSTIF] = 1.7; P[TFLUF] = 1.2; P[SPLAY] = 0.2;
}

function blend(out, A, B, t) { for (let i = 0; i < NP; i++) out[i] = A[i] + (B[i] - A[i]) * t; }

// ------------------------------------------------------------------ shading
const NOISE_GLSL = /* glsl */`
float sqH3(vec3 p){ p = fract(p*0.3183099+0.1); p *= 17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
float sqN3(vec3 x){ vec3 i=floor(x), f=fract(x); f=f*f*(3.0-2.0*f);
  return mix(mix(mix(sqH3(i),sqH3(i+vec3(1,0,0)),f.x), mix(sqH3(i+vec3(0,1,0)),sqH3(i+vec3(1,1,0)),f.x),f.y),
             mix(mix(sqH3(i+vec3(0,0,1)),sqH3(i+vec3(1,0,1)),f.x), mix(sqH3(i+vec3(0,1,1)),sqH3(i+vec3(1,1,1)),f.x),f.y), f.z); }
`;

// The shared shadow map is far too coarse (about 4 cm per texel) for a 50 cm animal to shadow itself without
// blocky lines crawling over its back. So the whole squirrel samples the shadow map at one point: its centre,
// pushed a little towards the sun. It still darkens softly when it runs into the shade of a tree or a roof,
// and it still casts its own shadow on the world.
const uSunDir = { value: SUN_DIR };
function oneShadowSample(sh) {
  sh.uniforms.uSunDir = uSunDir;
  sh.vertexShader = sh.vertexShader
    .replace('#include <common>', '#include <common>\nuniform vec3 uSunDir;')
    .replace('#include <shadowmap_vertex>', /* glsl */`#include <shadowmap_vertex>
      #if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
        vDirectionalShadowCoord[ 0 ] = directionalShadowMatrix[ 0 ] * vec4((modelMatrix * vec4(0.0, 0.12, 0.0, 1.0)).xyz + uSunDir * 0.45, 1.0);
      #endif`);
}

function makeFurMaterial(uFlash) {
  const m = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.82, metalness: 0.0 });
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uFlash = uFlash; oneShadowSample(sh);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nattribute vec3 aRest; attribute vec2 aMat; varying vec3 vRest; varying vec2 vMat;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvRest = aRest; vMat = aMat;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform float uFlash; varying vec3 vRest; varying vec2 vMat;\n' + NOISE_GLSL)
      .replace('#include <normal_fragment_maps>', /* glsl */`#include <normal_fragment_maps>
        {
          float gloss = vMat.x, fuzz = vMat.y;
          vec3 fV = normalize(vViewPosition);
          // fine fur streaks, stretched along the hair direction, faded out with distance so they never shimmer
          vec3 fp = vRest * vec3(300.0, 300.0, 85.0);
          float fw = max(fwidth(fp.x), max(fwidth(fp.y), fwidth(fp.z)));
          float fade = 1.0 - smoothstep(0.35, 1.3, fw);
          float fn = sqN3(fp) * 0.6 + sqN3(fp * 2.7 + 9.1) * 0.4;
          float bn = sqN3(vRest * vec3(46.0, 46.0, 22.0));
          diffuseColor.rgb *= mix(1.0, (0.80 + 0.40 * fn), fuzz * fade) * mix(1.0, 0.9 + 0.2 * bn, fuzz);
          // soft fuzz rim
          float ndv = clamp(dot(normal, fV), 0.0, 1.0);
          float fr = pow(1.0 - ndv, 2.4);
          diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * 1.45 + vec3(0.085, 0.07, 0.055), fr * fuzz * 0.85);
          #if NUM_DIR_LIGHTS > 0
            vec3 fL = directionalLights[0].direction;
            float back = clamp(dot(normal, fL) * 0.5 + 0.55, 0.0, 1.0);
            totalEmissiveRadiance += directionalLights[0].color * diffuseColor.rgb * (fr * back * 0.10 * fuzz);
            // slightly softer terminator than bare lambert: fur scatters light
            normal = normalize(normal + fL * (0.16 * fuzz));
          #endif
          roughnessFactor = mix(roughnessFactor, 0.07, clamp(gloss, 0.0, 1.0));
          totalEmissiveRadiance += step(1.5, gloss) * vec3(2.2);
          totalEmissiveRadiance += vec3(1.0, 0.42, 0.3) * uFlash * (1.0 - clamp(gloss, 0.0, 1.0));
        }`);
  };
  m.customProgramCacheKey = () => 'squirrelFur2';
  return m;
}

// tail plume: shell fur. the tail tube is drawn N times, pushed out along its normals, with a strand pattern cut out
function makeShellMaterial(uFlash, uFluff, cols) {
  const m = new THREE.MeshStandardMaterial({ roughness: 0.92, metalness: 0, alphaTest: 0.5 });
  m.alphaToCoverage = true;
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uFlash = uFlash; sh.uniforms.uFluff = uFluff; oneShadowSample(sh);
    sh.uniforms.uRoot = { value: cols.root }; sh.uniforms.uMid = { value: cols.mid }; sh.uniforms.uTip = { value: cols.tip };
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', `#include <common>
        attribute float aShell; attribute vec3 aTan; attribute float aLen; attribute vec2 aSuv; uniform float uFluff;
        varying float vH; varying vec2 vSuv; varying float vLen;`)
      .replace('#include <begin_vertex>', /* glsl */`
        vec3 transformed = vec3(position);
        {
          float L = aLen * uFluff;
          transformed += normal * (aShell * L) + aTan * (aShell * aShell * L * 0.7);
          vH = aShell; vSuv = aSuv; vLen = aLen;
        }`);
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>
        uniform float uFlash; uniform vec3 uRoot; uniform vec3 uMid; uniform vec3 uTip; varying float vH; varying vec2 vSuv; varying float vLen;
        float shH(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float shStrand(vec2 uv, vec2 cells, float h, out float tipness){
          vec2 g = uv * cells; vec2 id = floor(g); id.x = mod(id.x, cells.x); vec2 f = fract(g) - 0.5;
          float r1 = shH(id), r2 = shH(id + 17.3);
          f += (vec2(r1, r2) - 0.5) * 0.5;
          float mh = 0.5 + 0.5 * r2;
          float k = h / mh;
          tipness = k;
          return (1.0 - dot(f, f) * 3.4) - k;
        }`)
      .replace('#include <color_fragment>', /* glsl */`#include <color_fragment>
        float shTip = 0.0;
        {
          float t1, t2;
          // soft clumping: slow variation of the fur depth gives a tufted outline without hard cones
          vec2 cg = vSuv * vec2(7.0, 9.0); vec2 ci = floor(cg), cf = fract(cg); cf = cf * cf * (3.0 - 2.0 * cf);
          float cl = mix(mix(shH(vec2(mod(ci.x, 7.0), ci.y)), shH(vec2(mod(ci.x + 1.0, 7.0), ci.y)), cf.x),
                         mix(shH(vec2(mod(ci.x, 7.0), ci.y + 1.0)), shH(vec2(mod(ci.x + 1.0, 7.0), ci.y + 1.0)), cf.x), cf.y);
          float hh = vH * (1.0 + 0.3 * cl);
          float a1 = shStrand(vSuv, vec2(40.0, 44.0), hh, t1);
          float a2 = shStrand(vSuv + 0.37, vec2(90.0, 96.0), hh * 1.04, t2);
          float fw = max(fwidth(vSuv.x) * 90.0, fwidth(vSuv.y) * 96.0);
          float far2 = smoothstep(0.35, 1.0, fw), far1 = smoothstep(0.8, 2.2, fw);
          float avg = 0.56 - hh;
          a1 = mix(a1, avg, far1); a2 = mix(a2, avg, far2);
          t1 = mix(t1, hh * 1.5, far1); t2 = mix(t2, hh * 1.5, far2);
          float a = a1; shTip = t1;
          if (a2 > a) { a = a2; shTip = t2; }
          diffuseColor.a = clamp(0.5 + a * 4.0, 0.0, 1.0);
          vec3 c = mix(uRoot, uMid, smoothstep(0.0, 0.55, vH));
          c *= 0.66 + 0.34 * smoothstep(0.0, 0.8, vH);   // roots sit in shadow
          diffuseColor.rgb = c;
        }`)
      .replace('#include <normal_fragment_maps>', /* glsl */`#include <normal_fragment_maps>
        {
          vec3 fV = normalize(vViewPosition);
          float fr = pow(1.0 - clamp(abs(dot(normal, fV)), 0.0, 1.0), 1.6);
          // pale frosted tips, strongest around the silhouette
          float frost = smoothstep(0.4, 0.95, shTip) * (0.06 + 0.94 * fr) * smoothstep(0.25, 0.7, vH);
          diffuseColor.rgb = mix(diffuseColor.rgb, uTip, frost * 0.9);
          #if NUM_DIR_LIGHTS > 0
            vec3 fL = directionalLights[0].direction;
            totalEmissiveRadiance += directionalLights[0].color * diffuseColor.rgb * (fr * clamp(dot(normal, fL) * 0.5 + 0.6, 0.0, 1.0) * 0.14);
            normal = normalize(normal + fL * 0.28);
          #endif
          totalEmissiveRadiance += vec3(1.0, 0.42, 0.3) * uFlash;
        }`);
  };
  m.customProgramCacheKey = () => 'squirrelShell2';
  return m;
}

function makeHairTexture(rnd) {
  const S = 256;
  const cv = document.createElement('canvas'); cv.width = cv.height = S;
  const g = cv.getContext('2d');
  g.clearRect(0, 0, S, S); g.fillStyle = '#fff';
  const RW = 184, cx = RW / 2;
  // dense base of the tuft
  g.beginPath(); g.moveTo(cx - 30, S); g.quadraticCurveTo(cx - 40, S * 0.86, cx - 12, S * 0.72);
  g.lineTo(cx + 12, S * 0.72); g.quadraticCurveTo(cx + 40, S * 0.86, cx + 30, S); g.closePath(); g.fill();
  // strands fanning out and breaking up towards the tips
  for (let n = 0; n < 90; n++) {
    const x0 = cx + rnd.range(-34, 34), sp = (x0 - cx) / 34, len = 0.55 + 0.45 * Math.sqrt(rnd());
    const x1 = clamp(x0 + sp * rnd.range(8, 34) + rnd.range(-12, 12), 6, RW - 6), y1 = S * (1 - len);
    const mx = (x0 + x1) / 2 + rnd.range(-6, 6), my = S * (1 - len * 0.5), w0 = rnd.range(3.0, 5.5);
    g.beginPath(); g.moveTo(x0 - w0, S); g.quadraticCurveTo(mx - w0 * 0.7, my, x1, y1);
    g.quadraticCurveTo(mx + w0 * 0.7, my, x0 + w0, S); g.closePath(); g.fill();
  }
  // a single hair for whiskers
  const wx = S * 0.89;
  g.beginPath(); g.moveTo(wx - 3.2, S); g.lineTo(wx - 0.9, 0); g.lineTo(wx + 0.9, 0); g.lineTo(wx + 3.2, S); g.closePath(); g.fill();
  const src = g.getImageData(0, 0, S, S).data;
  const data = new Uint8Array(S * S * 4);
  for (let y = 0; y < S; y++) {
    const v = y / (S - 1), sy = S - 1 - y; // row 0 of the texture = root
    // agouti banding: dark band below the pale tip
    const lum = 0.92 + 0.08 * sstep(0.0, 0.3, v);
    for (let x = 0; x < S; x++) {
      const o = (y * S + x) * 4, so = (sy * S + x) * 4;
      const col = x < RW ? (0.9 + 0.1 * (((x * 7919) % 13) / 12)) : 1;
      const l = x < RW ? lum * col : 1;
      data[o] = data[o + 1] = data[o + 2] = Math.round(255 * l);
      data[o + 3] = src[so + 3];
    }
  }
  const tex = new THREE.DataTexture(data, S, S, THREE.RGBAFormat);
  tex.colorSpace = THREE.SRGBColorSpace; tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter; tex.magFilter = THREE.LinearFilter; tex.anisotropy = 4;
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping; tex.needsUpdate = true;
  return tex;
}

function makeHairMaterial(uFlash, tex, tipColor) {
  const m = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9, metalness: 0, map: tex, alphaTest: 0.36, side: THREE.DoubleSide });
  m.alphaToCoverage = true;
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uFlash = uFlash; sh.uniforms.uTip = { value: tipColor }; oneShadowSample(sh);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nattribute vec3 aDir; attribute float aSide; attribute vec3 aFx; varying vec3 vFx;')
      .replace('#include <begin_vertex>', /* glsl */`
        vec3 transformed = vec3(position);
        {
          vec3 camO = (inverse(modelMatrix) * vec4(cameraPosition, 1.0)).xyz;
          vec3 sv = cross(aDir, camO - position);
          float sl = length(sv);
          sv = sl > 1e-6 ? sv / sl : vec3(1.0, 0.0, 0.0);
          transformed += sv * aSide;
          float fres = pow(1.0 - abs(dot(normalize(camO - position), normalize(normal))), 1.4);
          vFx = vec3(aFx.x * (0.1 + 0.9 * fres), aFx.y * (0.35 + 0.65 * fres), aFx.z * (1.0 - smoothstep(0.12, 0.42, fres)));
        }`);
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform float uFlash; uniform vec3 uTip; varying vec3 vFx;')
      .replace('#include <color_fragment>', /* glsl */`#include <color_fragment>
        {
          float hv = vMapUv.y;
          diffuseColor.rgb *= 1.0 - vFx.y * smoothstep(0.3, 0.56, hv) * (1.0 - smoothstep(0.66, 0.84, hv));
          diffuseColor.rgb = mix(diffuseColor.rgb, uTip, vFx.x * smoothstep(0.68, 0.93, hv));
          diffuseColor.a *= 1.0 - vFx.z;
        }`)
      .replace('#include <normal_fragment_maps>', /* glsl */`#include <normal_fragment_maps>
        normal = normalize(vNormal);
        #if NUM_DIR_LIGHTS > 0
          normal = normalize(normal + directionalLights[0].direction * 0.3);
        #endif
        totalEmissiveRadiance += vec3(1.0, 0.42, 0.3) * uFlash;`);
  };
  m.customProgramCacheKey = () => 'squirrelHair2';
  return m;
}

// ------------------------------------------------------------------ small math on plain arrays (column major 3x3)
function m3RotX(o, a) { const c = Math.cos(a), s = Math.sin(a); o[0] = 1; o[1] = 0; o[2] = 0; o[3] = 0; o[4] = c; o[5] = s; o[6] = 0; o[7] = -s; o[8] = c; }
function m3RotY(o, a) { const c = Math.cos(a), s = Math.sin(a); o[0] = c; o[1] = 0; o[2] = -s; o[3] = 0; o[4] = 1; o[5] = 0; o[6] = s; o[7] = 0; o[8] = c; }
function m3RotZ(o, a) { const c = Math.cos(a), s = Math.sin(a); o[0] = c; o[1] = s; o[2] = 0; o[3] = -s; o[4] = c; o[5] = 0; o[6] = 0; o[7] = 0; o[8] = 1; }
function m3Mul(o, A, B) {
  for (let c = 0; c < 3; c++) {
    const b0 = B[c * 3], b1 = B[c * 3 + 1], b2 = B[c * 3 + 2];
    _mt[c * 3] = A[0] * b0 + A[3] * b1 + A[6] * b2;
    _mt[c * 3 + 1] = A[1] * b0 + A[4] * b1 + A[7] * b2;
    _mt[c * 3 + 2] = A[2] * b0 + A[5] * b1 + A[8] * b2;
  }
  for (let i = 0; i < 9; i++) o[i] = _mt[i];
}
const _mt = new Float64Array(9);

// two bone IK. writes the middle joint to (ikKx..), the reached end to (ikEx..)
let ikKx = 0, ikKy = 0, ikKz = 0, ikEx = 0, ikEy = 0, ikEz = 0;
function ik2(rx, ry, rz, tx, ty, tz, l1, l2, px, py, pz) {
  let dx = tx - rx, dy = ty - ry, dz = tz - rz;
  let d = Math.sqrt(dx * dx + dy * dy + dz * dz);
  if (d < 1e-6) { dx = 0; dy = -1; dz = 0; d = 1e-6; }
  const ux = dx / d, uy = dy / d, uz = dz / d;
  const dd = clamp(d, Math.abs(l1 - l2) + 0.004, l1 + l2 - 0.0015);
  const a = (l1 * l1 - l2 * l2 + dd * dd) / (2 * dd);
  const h = Math.sqrt(Math.max(0, l1 * l1 - a * a));
  const pd = px * ux + py * uy + pz * uz;
  let qx = px - ux * pd, qy = py - uy * pd, qz = pz - uz * pd;
  let ql = Math.sqrt(qx * qx + qy * qy + qz * qz);
  if (ql < 1e-5) { qx = 0; qy = 1; qz = 0; ql = 1; }
  qx /= ql; qy /= ql; qz /= ql;
  ikKx = rx + ux * a + qx * h; ikKy = ry + uy * a + qy * h; ikKz = rz + uz * a + qz * h;
  ikEx = rx + ux * dd; ikEy = ry + uy * dd; ikEz = rz + uz * dd;
}

// keyed profile lookup with smooth interpolation
function prof(keys, vals, t) {
  if (t <= keys[0]) return vals[0];
  for (let i = 1; i < keys.length; i++) if (t <= keys[i]) { const u = (t - keys[i - 1]) / (keys[i] - keys[i - 1]); return lerp(vals[i - 1], vals[i], u * u * (3 - 2 * u)); }
  return vals[vals.length - 1];
}

// ------------------------------------------------------------------ the squirrel
export function createSquirrel(opts = {}) {
  const rnd = mulberry32(((opts.seed ?? 1) * 7919 + 13) >>> 0);
  const group = new THREE.Group(); group.name = 'squirrel';
  const rig = new THREE.Group(); group.add(rig);
  const uFlash = { value: 0 };

  const C = (hex) => { const c = new THREE.Color(hex); return [c.r, c.g, c.b]; };
  const COL = {
    back: C(0x735847), russet: C(0x9c5a38), cream: C(0xf4e6cc), face: C(0xae7448), paw: C(0xb07a50), toe: C(0x7a5240),
    earIn: C(0x8e5a44), eye: C(0x070504), nose: C(0x24140f), white: C(0xffffff), ring: C(0xdcbf94),
    tailRoot: C(0x5a3520), tailMid: C(0x9c5228), tailTip: C(0xfaf0dc), frost: C(0xdccdb6), whisk: C(0x2c2018),
  };
  const mix3 = (o, A, B, t) => { o[0] = lerp(A[0], B[0], t); o[1] = lerp(A[1], B[1], t); o[2] = lerp(A[2], B[2], t); return o; };

  // ---------------- fur geometry builder
  const bPos = [], bCol = [], bRest = [], bMat = [], bIdx = [];
  let vCount = 0;
  const o_ = { r: 1, g: 1, b: 1, rx: 0, ry: 0, rz: 0, gloss: 0, fuzz: 1 };
  function addTube(nr, ns, fn) {
    const v0 = vCount, cs = new Float32Array(ns), sn = new Float32Array(ns);
    for (let j = 0; j < ns; j++) { const a = j / ns * TAU; cs[j] = Math.cos(a); sn[j] = Math.sin(a); }
    for (let i = 0; i < nr; i++) for (let j = 0; j < ns; j++) {
      o_.gloss = 0; o_.fuzz = 1;
      fn(i, j, cs[j], sn[j], o_);
      bPos.push(0, 0, 0); bCol.push(o_.r, o_.g, o_.b); bRest.push(o_.rx, o_.ry, o_.rz); bMat.push(o_.gloss, o_.fuzz);
    }
    for (let i = 0; i < nr - 1; i++) for (let j = 0; j < ns; j++) {
      const a = v0 + i * ns + j, b = v0 + i * ns + (j + 1) % ns, c = v0 + (i + 1) * ns + j, d = v0 + (i + 1) * ns + (j + 1) % ns;
      bIdx.push(a, b, c, b, d, c);
    }
    vCount += nr * ns;
    return { v0, nr, ns, cs, sn, cen: new Float32Array(nr * 3), capA: true, capB: true };
  }
  let restShift = 0;
  function addPart(pieces) {
    const v0 = vCount, rp = [], rn = [];
    restShift += 0.37;
    for (const pc of pieces) {
      const g = pc.geo, pa = g.attributes.position, na = g.attributes.normal, base = vCount;
      for (let v = 0; v < pa.count; v++) {
        const x = pa.getX(v), y = pa.getY(v), z = pa.getZ(v);
        bPos.push(0, 0, 0); rp.push(x, y, z); rn.push(na.getX(v), na.getY(v), na.getZ(v));
        const c = pc.colorFn ? pc.colorFn(x, y, z, na.getX(v), na.getY(v), na.getZ(v)) : pc.color;
        bCol.push(c[0], c[1], c[2]); bRest.push(x + restShift, y, z * 3.0); bMat.push(pc.gloss || 0, pc.fuzz ?? 1);
      }
      const ix = g.index;
      if (ix) for (let k = 0; k < ix.count; k++) bIdx.push(base + ix.getX(k)); else for (let k = 0; k < pa.count; k++) bIdx.push(base + k);
      vCount += pa.count;
    }
    return { v0, n: vCount - v0, rp: new Float32Array(rp), rn: new Float32Array(rn) };
  }
  const _m4 = new THREE.Matrix4(), _e = new THREE.Euler(), _q = new THREE.Quaternion(), _v1 = new THREE.Vector3(), _v2 = new THREE.Vector3();
  function G(geo, sx, sy, sz, rx, ry, rz, tx, ty, tz) {
    _m4.compose(_v1.set(tx, ty, tz), _q.setFromEuler(_e.set(rx, ry, rz)), _v2.set(sx, sy, sz));
    geo.applyMatrix4(_m4); return geo;
  }

  // ---------------- body rings (static table)
  const NS = 24;
  const rSeg = [], rT = [], rW = [], rHt = [], rHb = [], rWb = [], rYo = [], rZ = [], rArc = [];
  const HIPR = [0.082, 0.076, 0.068];
  for (const t of [0, 0.07, 0.18, 0.34, 0.54, 0.77]) { // A: rump cap
    const f = t === 0 ? 0.0 : Math.sqrt(1 - (1 - t) * (1 - t));
    rSeg.push(0); rT.push(t); rW.push(HIPR[0] * f); rHt.push(HIPR[1] * f); rHb.push(HIPR[2] * f); rWb.push(1); rYo.push(0); rZ.push(0); rArc.push(-RUMP * (1 - t));
  }
  const BK = [0, 0.3, 0.65, 1], BW = [0.082, 0.085, 0.074, 0.06], BT = [0.076, 0.07, 0.061, 0.053], BB = [0.068, 0.077, 0.071, 0.06];
  for (let k = 0; k <= 12; k++) { // B: hips -> chest
    const t = k / 12;
    rSeg.push(1); rT.push(t); rW.push(prof(BK, BW, t)); rHt.push(prof(BK, BT, t)); rHb.push(prof(BK, BB, t)); rWb.push(1); rYo.push(0); rZ.push(0); rArc.push(0.185 * t);
  }
  // head rings (head space): z, yoff, w, ht, hb, wb
  const HEAD = [
    [-0.055, -0.004, 0.044, 0.041, 0.040, 1.0],
    [-0.040, 0.001, 0.051, 0.049, 0.042, 1.0],
    [-0.020, 0.003, 0.055, 0.053, 0.043, 1.05],
    [0.000, 0.003, 0.055, 0.052, 0.043, 1.12],
    [0.018, 0.000, 0.050, 0.046, 0.042, 1.15],
    [0.034, -0.005, 0.041, 0.036, 0.038, 1.1],
    [0.047, -0.011, 0.031, 0.025, 0.030, 1.0],
    [0.058, -0.016, 0.022, 0.016, 0.022, 1.0],
    [0.066, -0.019, 0.013, 0.010, 0.013, 1.0],
    [0.0705, -0.020, 0.0, 0.0, 0.0, 1.0],
  ];
  for (const t of [1 / 6, 2 / 6, 3 / 6, 4 / 6, 5 / 6]) { // C: neck
    const u = t * t * (3 - 2 * t);
    rSeg.push(2); rT.push(t); rW.push(lerp(0.06, HEAD[0][2], u)); rHt.push(lerp(0.053, HEAD[0][3], u)); rHb.push(lerp(0.06, HEAD[0][4], u)); rWb.push(1); rYo.push(0); rZ.push(0); rArc.push(0.185 + 0.075 * t);
  }
  const HEAD_R0 = rSeg.length;
  for (const h of HEAD) { rSeg.push(3); rT.push(0); rZ.push(h[0]); rYo.push(h[1]); rW.push(h[2]); rHt.push(h[3]); rHb.push(h[4]); rWb.push(h[5]); rArc.push(0.26 + 0.055 + h[0]); }
  const NR = rSeg.length;
  const _c = [0, 0, 0], _c2 = [0, 0, 0];
  const body = addTube(NR, NS, (i, j, c, s, o) => {
    const seg = rSeg[i], t = rT[i];
    const top = sstep(-0.15, 0.6, s);
    let belly = sstep(-0.22, -0.62, s);
    mix3(_c, COL.russet, COL.back, top * 0.92);
    if (seg === 0) belly *= sstep(0.2, 0.9, t) * 0.85;
    if (seg === 2) belly = sstep(-0.12, -0.55, s);
    o.fuzz = 1;
    if (seg === 3) {
      const hz = rZ[i], muzzle = sstep(0.026, 0.054, hz);
      belly = Math.max(sstep(-0.05, -0.45, s), muzzle * sstep(0.8, 0.15, s) * 0.92);
      mix3(_c, mix3(_c2, COL.face, COL.back, top * 0.5), COL.face, muzzle);
      o.fuzz = 1 - 0.35 * muzzle;
    }
    mix3(_c, _c, COL.cream, belly);
    o.r = _c[0]; o.g = _c[1]; o.b = _c[2];
    const w = s < 0 ? rW[i] : rW[i];
    o.rx = c * w; o.ry = s * (s >= 0 ? rHt[i] : rHb[i]); o.rz = rArc[i];
  });

  // ---------------- legs
  const LSEG = 14;
  const HIND_K = [0, 0.07, 0.24, 0.5, 0.78, 1.0, 1.25, 1.6, 2.0], HIND_KR = [0.004, 0.028, 0.041, 0.042, 0.035, 0.026, 0.019, 0.013, 0.011];
  const FRONT_K = [0, 0.08, 0.3, 0.65, 1.0, 1.35, 1.7, 2.0], FRONT_KR = [0.004, 0.024, 0.032, 0.028, 0.021, 0.016, 0.0125, 0.0105];
  const HIND_T = [0, 0.035, 0.08, 0.15, 0.25, 0.37, 0.5, 0.64, 0.78, 0.9, 1.0, 1.12, 1.28, 1.5, 1.75, 2.0], HIND_R = HIND_T.map((t) => prof(HIND_K, HIND_KR, t));
  const FRONT_T = [0, 0.04, 0.09, 0.18, 0.3, 0.47, 0.65, 0.83, 1.0, 1.18, 1.4, 1.7, 2.0], FRONT_R = FRONT_T.map((t) => prof(FRONT_K, FRONT_KR, t));
  function legTube(T, R, side, hind) {
    const tb = addTube(T.length, LSEG, (i, j, c, s, o) => {
      const inner = sstep(0.15, 0.75, -c * side);
      mix3(_c, COL.russet, COL.back, hind ? 0.25 * (1 - T[i] / 2) : 0.1);
      if (!hind) mix3(_c, _c, COL.cream, inner * 0.8 * (1 - sstep(0.7, 1.3, T[i])));
      else mix3(_c, _c, COL.cream, inner * 0.45 * sstep(0.6, 1.6, T[i]));
      mix3(_c, _c, COL.paw, sstep(1.3, 2.0, T[i]) * 0.7);
      o.r = _c[0]; o.g = _c[1]; o.b = _c[2];
      o.rx = c * R[i] + side * 0.3 + (hind ? 0.9 : 0.5); o.ry = s * R[i]; o.rz = T[i] * 0.08;
    });
    tb.capB = false; tb.T = T; tb.R = R;
    return tb;
  }
  const legHL = legTube(HIND_T, HIND_R, 1, true), legHR = legTube(HIND_T, HIND_R, -1, true);
  const legFL = legTube(FRONT_T, FRONT_R, 1, false), legFR = legTube(FRONT_T, FRONT_R, -1, false);

  // ---------------- tail core
  const TS = 16, SHELLS = opts.shells ?? 16;
  const tailTube = addTube(TAIL_ST, TS, (i, j, c, s, o) => {
    mix3(_c, COL.tailRoot, COL.tailMid, 0.25); _c[0] *= 0.5; _c[1] *= 0.5; _c[2] *= 0.5;
    o.r = _c[0]; o.g = _c[1]; o.b = _c[2]; o.rx = c * 0.02 + 2.0; o.ry = s * 0.02; o.rz = i * 0.02; o.fuzz = 0.6;
  });
  const fluffProf = (t) => (0.5 + 0.5 * sstep(0.0, 0.3, t)) * (1 - 0.12 * sstep(0.82, 1.0, t));

  // ---------------- rigid parts
  const sph = (w, h) => new THREE.SphereGeometry(1, w, h);
  const cap = (r, l) => new THREE.CapsuleGeometry(r, l, 3, 8).rotateX(PI / 2);
  function pawPieces(hind) {
    const out = [];
    if (hind) {
      out.push({ geo: G(cap(0.0095, 0.044), 1.2, 0.85, 1, 0, 0, 0, 0, -0.001, 0.032), color: COL.paw });
      for (const a of [-0.27, -0.09, 0.09, 0.27]) out.push({ geo: G(cap(0.0044, 0.012), 1, 0.9, 1, 0.1, a, 0, Math.sin(a) * 0.06, -0.0035, 0.059 + Math.cos(a) * 0.006), color: COL.toe });
    } else {
      out.push({ geo: G(sph(10, 8), 0.0118, 0.0085, 0.0155, 0, 0, 0, 0, -0.001, 0.012), color: COL.paw });
      for (const a of [-0.42, -0.14, 0.14, 0.42]) out.push({ geo: G(cap(0.0038, 0.0065), 1, 0.9, 1, 0.2, a, 0, Math.sin(a) * 0.022, -0.0035, 0.0215 + Math.cos(a) * 0.005), color: COL.toe });
    }
    return out;
  }
  const pawFL = addPart(pawPieces(false)), pawFR = addPart(pawPieces(false));
  const pawHL = addPart(pawPieces(true)), pawHR = addPart(pawPieces(true));

  function earGeo() {
    const U = [0, 0.16, 0.36, 0.56, 0.74, 0.88, 0.96, 1.0], WF = [0.78, 0.96, 1.0, 0.9, 0.68, 0.4, 0.2, 0.0];
    const nv = 14, H = 0.044, W = 0.0145, D = 0.0095;
    const pos = [], idx = [];
    for (let i = 0; i < U.length; i++) for (let j = 0; j < nv; j++) {
      const v = j / nv * TAU, f = WF[i], sv = Math.sin(v);
      const h = sv >= 0 ? D * f * sv : -0.5 * D * f * sv; // back bulges, front is cupped in
      pos.push(W * f * Math.cos(v), H * U[i], -h);
    }
    for (let i = 0; i < U.length - 1; i++) for (let j = 0; j < nv; j++) {
      const a = i * nv + j, b = i * nv + (j + 1) % nv, c = (i + 1) * nv + j, d = (i + 1) * nv + (j + 1) % nv;
      idx.push(a, b, c, b, d, c);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals();
    return g;
  }
  const earColor = (x, y, z, nx, ny, nz) => {
    const inner = sstep(0.1, 0.7, nz) * sstep(0.0145, 0.005, Math.abs(x) + y * 0.1);
    return mix3([0, 0, 0], mix3(_c2, COL.russet, COL.back, 0.25), COL.earIn, inner);
  };
  const earL = addPart([{ geo: earGeo(), colorFn: earColor, fuzz: 0.8 }]);
  const earR = addPart([{ geo: earGeo(), colorFn: earColor, fuzz: 0.8 }]);

  const EYE_R = 0.0172;
  function eyePieces(side) {
    return [
      { geo: G(sph(16, 12), EYE_R * 0.74, EYE_R, EYE_R, 0, 0, 0, 0, 0, 0), color: COL.eye, gloss: 1, fuzz: 0 },
      { geo: G(sph(8, 6), 0.0022, 0.0042, 0.0042, 0, 0, 0, EYE_R * 0.74 * 0.82, 0.0068, 0.0052 * side), color: COL.white, gloss: 2, fuzz: 0 },
    ];
  }
  const eyeL = addPart(eyePieces(1)), eyeR = addPart(eyePieces(-1));
  // pale eye rings and the nose live in head space
  const EYE_POS = [0.0425, 0.015, 0.011];
  const eyeM = [new Float64Array(9), new Float64Array(9)];
  for (let k = 0; k < 2; k++) {
    const side = k === 0 ? 1 : -1;
    const d = new THREE.Vector3(side, 0.14, 0.3).normalize();
    const y = new THREE.Vector3(0, 1, 0).addScaledVector(d, -d.y).normalize();
    const z = new THREE.Vector3().crossVectors(d, y);
    eyeM[k].set([d.x, d.y, d.z, y.x, y.y, y.z, z.x, z.y, z.z]);
  }
  function ringGeo(k) {
    const g = new THREE.TorusGeometry(EYE_R * 0.985, 0.0019, 6, 22).rotateY(PI / 2);
    g.translate(0.0018, 0, 0);
    const m = eyeM[k];
    _m4.set(m[0], m[3], m[6], EYE_POS[0] * (k === 0 ? 1 : -1), m[1], m[4], m[7], EYE_POS[1], m[2], m[5], m[8], EYE_POS[2], 0, 0, 0, 1);
    g.applyMatrix4(_m4); return g;
  }
  const headStatic = addPart([{ geo: ringGeo(0), color: COL.ring, fuzz: 0.7 }, { geo: ringGeo(1), color: COL.ring, fuzz: 0.7 }]);
  const nosePart = addPart([{ geo: G(sph(10, 8), 0.0078, 0.0056, 0.006, 0, 0, 0, 0, 0, 0), color: COL.nose, gloss: 0.75, fuzz: 0 }]);
  const NOSE_POS = [0, -0.0135, 0.0685];
  const EAR_POS = [0.035, 0.037, -0.036];
  const earBase = [new Float64Array(9), new Float64Array(9)];
  {
    const a = new Float64Array(9), b = new Float64Array(9);
    for (let k = 0; k < 2; k++) {
      const side = k === 0 ? 1 : -1;
      m3RotZ(a, -0.42 * side); m3RotX(b, -0.3); m3Mul(a, a, b); m3RotY(b, 0.55 * side); m3Mul(earBase[k], a, b);
    }
  }

  // ---------------- finalize fur geometry
  const NV = vCount;
  const furGeo = new THREE.BufferGeometry();
  const Pn = new Float32Array(NV * 3), Nn = new Float32Array(NV * 3);
  const posAttr = new THREE.BufferAttribute(Pn, 3); posAttr.setUsage(THREE.DynamicDrawUsage);
  const nrmAttr = new THREE.BufferAttribute(Nn, 3); nrmAttr.setUsage(THREE.DynamicDrawUsage);
  furGeo.setAttribute('position', posAttr); furGeo.setAttribute('normal', nrmAttr);
  furGeo.setAttribute('color', new THREE.Float32BufferAttribute(bCol, 3));
  furGeo.setAttribute('aRest', new THREE.Float32BufferAttribute(bRest, 3));
  furGeo.setAttribute('aMat', new THREE.Float32BufferAttribute(bMat, 2));
  furGeo.setIndex(bIdx);
  furGeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0.2, -0.1), 1.0);
  furGeo.boundingBox = new THREE.Box3(new THREE.Vector3(-1, -0.8, -1.1), new THREE.Vector3(1, 1.2, 0.9));
  const furMat = makeFurMaterial(uFlash);
  const furMesh = new THREE.Mesh(furGeo, furMat);
  furMesh.castShadow = true; furMesh.receiveShadow = true;
  rig.add(furMesh);

  // ---------------- hair cards
  const kSide = [], kUv = [], kCol = [], kIdx = [], kFx = [];
  let nCards = 0;
  function addCard(wRoot, wTip, cRoot, cTip, whisker, frost = 0, band = 0, sil = 0) {
    const k = nCards++;
    kFx.push(frost, band, sil, frost, band, sil, frost, band, sil, frost, band, sil);
    kSide.push(-wRoot, wRoot, -wTip, wTip);
    const flip = rnd() < 0.5;
    let u0 = whisker ? 0.84 : 0.004, u1 = whisker ? 0.94 : 0.715;
    if (flip) { const t = u0; u0 = u1; u1 = t; }
    kUv.push(u0, 0.01, u1, 0.01, u0, 0.995, u1, 0.995);
    kCol.push(cRoot[0], cRoot[1], cRoot[2], cRoot[0], cRoot[1], cRoot[2], cTip[0], cTip[1], cTip[2], cTip[0], cTip[1], cTip[2]);
    const b = k * 4; kIdx.push(b, b + 1, b + 2, b + 1, b + 3, b + 2);
    return k;
  }
  // (a) cards rooted on tube vertices: [card, vertex, neighbour vertex along the tube, sign, lift cos, lift sin, length]
  const tc = [];
  const furCards = opts.furCards !== false;
  if (furCards) {
    for (let i = 1; i < NR - 3; i++) for (let j = 0; j < NS; j++) {
      const seg = rSeg[i], c = body.cs[j], s = body.sn[j], t = rT[i];
      let p = 0, len = 0.034, lift = 0.35, wR = 0.006, wT = 0.011;
      if (seg === 0 && t > 0.1 && t < 0.6) { p = 0.6; len = 0.028; lift = 0.3; }                                   // rump
      if (seg === 1 && t < 0.3 && s < 0.55) { p = 0; }
      if (seg === 1 && s < -0.45) { p = 0.0; }                           // belly
      if (seg === 1 && t > 0.7 && s < -0.8) { p = 0.6; len = 0.022; lift = 0.32; }               // chest
      if (seg === 2 && s < -0.4) { p = 0.8; len = 0.022; lift = 0.34; }                            // throat bib
      if (seg === 3) {
        const hz = rZ[i];
        if (hz < 0.036 && hz > -0.045 && s < -0.3 && s > -0.9 && Math.abs(c) > 0.3) { p = 0.85; len = 0.026; lift = 0.5; wR = 0.006; wT = 0.011; } // cheeks
      }
      if (p === 0) continue;
      const vi = body.v0 + i * NS + j, vj = body.v0 + i * NS + (j + 1) % NS;
      const o = vi * 3;
      const base = [bCol[o], bCol[o + 1], bCol[o + 2]];
      for (let rep = 0; rep < 3; rep++) {
        if (rnd() > p) continue;
        const k = addCard(wR * 0.6, wT * rnd.range(0.5, 0.8), base, base, false, 0.1 + 0.1 * rnd(), 0.04);
        const la = lift * rnd.range(0.6, 1.4);
        tc.push(k, vi, vi + NS, -1, Math.cos(la), Math.sin(la), len * rnd.range(0.7, 1.2), vj, rnd());
      }
    }
  }
  const tubeCards = new Float32Array(tc); const nTubeCards = tc.length / 9;
  // (b) rigid cards in a frame: [card, frame, rx, ry, rz, dx, dy, dz, len]   frames: 0 head, 1 ear L, 2 ear R, 3 whiskers L, 4 whiskers R
  const rc = [];
  for (let k = 0; k < 2; k++) { // ear tufts
    for (let n = 0; n < 7; n++) {
      const dx = rnd.range(-0.3, 0.3), dz = rnd.range(-0.45, 0.0), l = Math.hypot(dx, 1, dz);
      const ec = mix3([0, 0, 0], COL.russet, COL.tailRoot, 0.3 + 0.3 * rnd());
      const card = addCard(0.0035, 0.0055, ec, ec, false, 0.15, 0.1);
      rc.push(card, 1 + k, rnd.range(-0.004, 0.004), 0.027 + 0.002 * n, -0.003, dx / l, 1 / l, dz / l, rnd.range(0.02, 0.034));
    }
  }
  for (let k = 0; k < 2; k++) { // whiskers
    const side = k === 0 ? 1 : -1;
    for (let n = 0; n < 6; n++) {
      const up = lerp(-0.45, 0.35, n / 5) + rnd.range(-0.06, 0.06), fw = rnd.range(0.2, 0.45);
      const l = Math.hypot(1, up, fw);
      const card = addCard(0.0022, 0.0012, COL.whisk, mix3([0, 0, 0], COL.whisk, COL.cream, 0.6), true);
      rc.push(card, 3 + k, side * 0.0, rnd.range(-0.003, 0.003), rnd.range(-0.004, 0.004), side / l, up / l, fw / l, rnd.range(0.05, 0.075));
    }
  }
  const rigidCards = new Float32Array(rc); const nRigidCards = rc.length / 9;
  const WHISK_POS = [0.017, -0.018, 0.051];

  const KV = nCards * 4;
  const CP = new Float32Array(KV * 3), CD = new Float32Array(KV * 3), CN = new Float32Array(KV * 3);
  const hairGeo = new THREE.BufferGeometry();
  const cpAttr = new THREE.BufferAttribute(CP, 3), cdAttr = new THREE.BufferAttribute(CD, 3), cnAttr = new THREE.BufferAttribute(CN, 3);
  cpAttr.setUsage(THREE.DynamicDrawUsage); cdAttr.setUsage(THREE.DynamicDrawUsage); cnAttr.setUsage(THREE.DynamicDrawUsage);
  hairGeo.setAttribute('position', cpAttr); hairGeo.setAttribute('aDir', cdAttr); hairGeo.setAttribute('normal', cnAttr);
  hairGeo.setAttribute('aSide', new THREE.Float32BufferAttribute(kSide, 1));
  hairGeo.setAttribute('aFx', new THREE.Float32BufferAttribute(kFx, 3));
  hairGeo.setAttribute('uv', new THREE.Float32BufferAttribute(kUv, 2));
  hairGeo.setAttribute('color', new THREE.Float32BufferAttribute(kCol, 3));
  hairGeo.setIndex(kIdx);
  hairGeo.boundingSphere = furGeo.boundingSphere; hairGeo.boundingBox = furGeo.boundingBox;
  const hairTex = makeHairTexture(mulberry32(4242));
  const hairMat = makeHairMaterial(uFlash, hairTex, new THREE.Color(0xf2e2c4));
  const hairMesh = new THREE.Mesh(hairGeo, hairMat);
  hairMesh.castShadow = false; hairMesh.receiveShadow = true;
  rig.add(hairMesh);

  // ---------------- tail shells
  const SV = TAIL_ST * (TS + 1);
  const SP = new Float32Array(SV * 3), SN = new Float32Array(SV * 3), STn = new Float32Array(SV * 3);
  const uFluff = { value: 1 };
  const shellGeo = new THREE.InstancedBufferGeometry();
  const spAttr = new THREE.BufferAttribute(SP, 3), snAttr = new THREE.BufferAttribute(SN, 3), stAttr = new THREE.BufferAttribute(STn, 3);
  spAttr.setUsage(THREE.DynamicDrawUsage); snAttr.setUsage(THREE.DynamicDrawUsage); stAttr.setUsage(THREE.DynamicDrawUsage);
  {
    const suv = [], slen = [], sidx = [], sh = [];
    for (let i = 0; i < TAIL_ST; i++) for (let j = 0; j <= TS; j++) {
      const t = i / (TAIL_ST - 1);
      suv.push(j / TS, t * 1.0); slen.push(TAIL_FUR * fluffProf(t) * (i === 0 ? 0.35 : i === 1 ? 0.7 : 1));
    }
    for (let i = 0; i < TAIL_ST - 1; i++) for (let j = 0; j < TS; j++) {
      const a = i * (TS + 1) + j, b = a + 1, c = a + TS + 1, d = c + 1;
      sidx.push(a, b, c, b, d, c);
    }
    for (let k = 0; k < SHELLS; k++) sh.push((k + 1) / SHELLS);
    shellGeo.setAttribute('position', spAttr); shellGeo.setAttribute('normal', snAttr); shellGeo.setAttribute('aTan', stAttr);
    shellGeo.setAttribute('aSuv', new THREE.Float32BufferAttribute(suv, 2)); shellGeo.setAttribute('aLen', new THREE.Float32BufferAttribute(slen, 1));
    shellGeo.setAttribute('aShell', new THREE.InstancedBufferAttribute(new Float32Array(sh), 1));
    shellGeo.setIndex(sidx); shellGeo.instanceCount = SHELLS;
    shellGeo.boundingSphere = furGeo.boundingSphere; shellGeo.boundingBox = furGeo.boundingBox;
  }
  const shellMat = makeShellMaterial(uFlash, uFluff, { root: new THREE.Color(0x4a2a1a), mid: new THREE.Color(0x96522a), tip: new THREE.Color(0xf6ead4) });
  const shellMesh = new THREE.Mesh(shellGeo, shellMat);
  shellMesh.castShadow = false; shellMesh.receiveShadow = true;
  rig.add(shellMesh);

  function emitCard(k, rx, ry, rz, dx, dy, dz, len, nx, ny, nz) {
    const o = k * 12, tx = rx + dx * len, ty = ry + dy * len, tz = rz + dz * len;
    CP[o] = rx; CP[o + 1] = ry; CP[o + 2] = rz; CP[o + 3] = rx; CP[o + 4] = ry; CP[o + 5] = rz;
    CP[o + 6] = tx; CP[o + 7] = ty; CP[o + 8] = tz; CP[o + 9] = tx; CP[o + 10] = ty; CP[o + 11] = tz;
    for (let q = 0; q < 12; q += 3) { CD[o + q] = dx; CD[o + q + 1] = dy; CD[o + q + 2] = dz; CN[o + q] = nx; CN[o + q + 1] = ny; CN[o + q + 2] = nz; }
  }

  // ---------------- dynamic writers
  function ring(tube, i, cx, cy, cz, Xx, Xy, Xz, Ux, Uy, Uz, w, ht, hb, wb) {
    const ns = tube.ns, cs = tube.cs, sn = tube.sn;
    let o = (tube.v0 + i * ns) * 3;
    tube.cen[i * 3] = cx; tube.cen[i * 3 + 1] = cy; tube.cen[i * 3 + 2] = cz;
    for (let j = 0; j < ns; j++) {
      const c = cs[j], s = sn[j];
      const lx = c * (s < 0 ? w * (1 + (wb - 1) * Math.min(1, -s * 2.2)) : w), ly = s * (s >= 0 ? ht : hb);
      Pn[o++] = cx + Xx * lx + Ux * ly; Pn[o++] = cy + Xy * lx + Uy * ly; Pn[o++] = cz + Xz * lx + Uz * ly;
    }
  }
  function tubeNormals(tube) {
    const { v0, nr, ns, cen } = tube;
    for (let i = 0; i < nr; i++) {
      const ip = i < nr - 1 ? i + 1 : i, im = i > 0 ? i - 1 : i;
      const pole = (i === 0 && tube.capA) || (i === nr - 1 && tube.capB);
      for (let j = 0; j < ns; j++) {
        const o = (v0 + i * ns + j) * 3;
        let nx, ny, nz;
        if (pole) {
          const q = i === 0 ? 1 : nr - 2, sg = 1;
          nx = (cen[i * 3] - cen[q * 3]) * sg; ny = (cen[i * 3 + 1] - cen[q * 3 + 1]) * sg; nz = (cen[i * 3 + 2] - cen[q * 3 + 2]) * sg;
        } else {
          const a = (v0 + ip * ns + j) * 3, b = (v0 + im * ns + j) * 3;
          const c = (v0 + i * ns + (j + 1) % ns) * 3, d = (v0 + i * ns + (j + ns - 1) % ns) * 3;
          const ax = Pn[a] - Pn[b], ay = Pn[a + 1] - Pn[b + 1], az = Pn[a + 2] - Pn[b + 2];
          const bx = Pn[c] - Pn[d], by = Pn[c + 1] - Pn[d + 1], bz = Pn[c + 2] - Pn[d + 2];
          nx = by * az - bz * ay; ny = bz * ax - bx * az; nz = bx * ay - by * ax;
        }
        const l = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
        Nn[o] = nx / l; Nn[o + 1] = ny / l; Nn[o + 2] = nz / l;
      }
    }
  }
  function applyPart(part, M, ox, oy, oz, sy) {
    const rp = part.rp, rn = part.rn; let o = part.v0 * 3;
    for (let v = 0, q = 0; v < part.n; v++, q += 3) {
      const x = rp[q], y = rp[q + 1] * sy, z = rp[q + 2];
      Pn[o] = ox + M[0] * x + M[3] * y + M[6] * z; Pn[o + 1] = oy + M[1] * x + M[4] * y + M[7] * z; Pn[o + 2] = oz + M[2] * x + M[5] * y + M[8] * z;
      const nx = rn[q], ny = rn[q + 1], nz = rn[q + 2];
      Nn[o] = M[0] * nx + M[3] * ny + M[6] * nz; Nn[o + 1] = M[1] * nx + M[4] * ny + M[7] * nz; Nn[o + 2] = M[2] * nx + M[5] * ny + M[8] * nz;
      o += 3;
    }
  }

  // frame helper: X = normalize(Xref - T (Xref.T)), U = T x X
  let fXx = 1, fXy = 0, fXz = 0, fUx = 0, fUy = 1, fUz = 0;
  function frame(Tx, Ty, Tz, Rx, Ry, Rz) {
    const d = Rx * Tx + Ry * Ty + Rz * Tz;
    let x = Rx - Tx * d, y = Ry - Ty * d, z = Rz - Tz * d;
    const l = Math.sqrt(x * x + y * y + z * z) || 1;
    x /= l; y /= l; z /= l;
    fXx = x; fXy = y; fXz = z;
    fUx = Ty * z - Tz * y; fUy = Tz * x - Tx * z; fUz = Tx * y - Ty * x;
  }
  // cubic hermite
  let hPx = 0, hPy = 0, hPz = 0, hTx = 0, hTy = 0, hTz = 0;
  function herm(ax, ay, az, mx, my, mz, bx, by, bz, nx, ny, nz, t) {
    const t2 = t * t, t3 = t2 * t;
    const h00 = 2 * t3 - 3 * t2 + 1, h10 = t3 - 2 * t2 + t, h01 = -2 * t3 + 3 * t2, h11 = t3 - t2;
    hPx = h00 * ax + h10 * mx + h01 * bx + h11 * nx; hPy = h00 * ay + h10 * my + h01 * by + h11 * ny; hPz = h00 * az + h10 * mz + h01 * bz + h11 * nz;
    const d00 = 6 * t2 - 6 * t, d10 = 3 * t2 - 4 * t + 1, d01 = -6 * t2 + 6 * t, d11 = 3 * t2 - 2 * t;
    let x = d00 * ax + d10 * mx + d01 * bx + d11 * nx, y = d00 * ay + d10 * my + d01 * by + d11 * ny, z = d00 * az + d10 * mz + d01 * bz + d11 * nz;
    const l = Math.sqrt(x * x + y * y + z * z) || 1;
    hTx = x / l; hTy = y / l; hTz = z / l;
  }
  // catmull-rom
  function crom(p0, p1, p2, p3, t) { return 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t); }
  function cromD(p0, p1, p2, p3, t) { return 0.5 * ((-p0 + p2) + 2 * (2 * p0 - 5 * p1 + 4 * p2 - p3) * t + 3 * (-p0 + 3 * p1 - 3 * p2 + p3) * t * t); }

  // leg tube through joint J, mid joint K, end A
  function writeLeg(tube, Jx, Jy, Jz, Kx, Ky, Kz, Ax, Ay, Az, Rx, Ry, Rz, flat) {
    const T = tube.T, R = tube.R;
    for (let i = 0; i < T.length; i++) {
      const tt = T[i];
      let px, py, pz, dx, dy, dz;
      if (tt <= 1) {
        const ex = 2 * Jx - Kx, ey = 2 * Jy - Ky, ez = 2 * Jz - Kz;
        px = crom(ex, Jx, Kx, Ax, tt); py = crom(ey, Jy, Ky, Ay, tt); pz = crom(ez, Jz, Kz, Az, tt);
        dx = cromD(ex, Jx, Kx, Ax, tt); dy = cromD(ey, Jy, Ky, Ay, tt); dz = cromD(ez, Jz, Kz, Az, tt);
      } else {
        const u = tt - 1, ex = 2 * Ax - Kx, ey = 2 * Ay - Ky, ez = 2 * Az - Kz;
        px = crom(Jx, Kx, Ax, ex, u); py = crom(Jy, Ky, Ay, ey, u); pz = crom(Jz, Kz, Az, ez, u);
        dx = cromD(Jx, Kx, Ax, ex, u); dy = cromD(Jy, Ky, Ay, ey, u); dz = cromD(Jz, Kz, Az, ez, u);
      }
      const l = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
      frame(dx / l, dy / l, dz / l, Rx, Ry, Rz);
      const r = R[i], fl = lerp(flat, 1, sstep(0.6, 1.3, tt));
      ring(tube, i, px, py, pz, fXx, fXy, fXz, fUx, fUy, fUz, r * fl, r, r, 1);
    }
    tubeNormals(tube);
  }

  // ---------------- state
  const P = new Float32Array(NP), PA = new Float32Array(NP), PB = new Float32Array(NP), PC = new Float32Array(NP), PG = new Float32Array(NP), PX = new Float32Array(NP);
  const H = new Float64Array(9), M1 = new Float64Array(9), M2 = new Float64Array(9), M3 = new Float64Array(9);
  const headPos = new Float64Array(3), reach = new Float64Array(4);
  const tp = new Float32Array((TAIL_N + 1) * 3), tprev = new Float32Array((TAIL_N + 1) * 3), tv = new Float32Array((TAIL_N + 1) * 3), tt = new Float32Array((TAIL_N + 1) * 3);
  const stC = new Float32Array(TAIL_ST * 3), stT = new Float32Array(TAIL_ST * 3), stX = new Float32Array(TAIL_ST * 3), stU = new Float32Array(TAIL_ST * 3);
  let tailInit = false;
  const tbPrev = new Float64Array(3);
  const frameO = new Float64Array(5 * 3), frameM = [H, new Float64Array(9), new Float64Array(9), new Float64Array(9), new Float64Array(9)];

  const st = {
    time: 0, phase: 0.4, moveW: 0, airW: 0, steep: 0, thin: 0, climb: 0, alert: 0, turn: 0, speedS: 0, prevSpeed: 0, wasMoving: false, wasAir: false,
    // triggers (elapsed seconds, <0 = inactive)
    jumpT: -1, landT: -1, landK: 0, launchT: -1, launchK: 1, attackT: -1, throwT: -1, hurtT: -1, pickupT: -1, chatterT: -1,
    // head saccades
    lookYaw: 0, lookPit: 0, lookRol: 0, lookVY: 0, lookVP: 0, lookVR: 0, tgtYaw: 0, tgtPit: 0, tgtRol: 0, sacTimer: 0.3,
    earT: [-1, -1], earNext: [0.8, 1.7], earAng: [0, 0],
    blinkT: -1, blinkNext: 2.2, noseEnv: 0, noseNext: 0.5,
    flickT: -1, flickNext: 1.6, flickSide: 1,
    fall: 0, breath: 0,
  };
  const rr = mulberry32(((opts.seed ?? 1) * 104729 + 7) >>> 0);

  function trigger(name, data) {
    switch (name) {
      case 'jump': st.jumpT = 0; break;
      case 'land': st.landT = 0; st.landK = clamp(data && data.impact != null ? data.impact : 0.5, 0, 1); st.phase = 0.02; break;
      case 'burst': st.launchT = 0; st.launchK = 1.8; tailKick(1.8); break;
      case 'attack': st.attackT = 0; break;
      case 'throw': st.throwT = 0; break;
      case 'hurt': st.hurtT = 0; tailKick(1.2); st.earT[0] = st.earT[1] = 0; break;
      case 'pickup': st.pickupT = 0; break;
      case 'chatter': st.chatterT = 0; break;
    }
  }
  function tailKick(k) {
    for (let i = 1; i <= TAIL_N; i++) { const f = i / TAIL_N; tv[i * 3 + 1] += 1.6 * k * f; tv[i * 3 + 2] -= 1.2 * k * f; }
  }
  const adv = (t, dt, dur) => (t < 0 ? -1 : (t + dt > dur ? -1 : t + dt));

  // ------------------------------------------------------------------ update
  function update(dt, s) {
    dt = clamp(dt || 0, 0, 0.1);
    const speed = Math.max(0, s.speed || 0);
    const air = s.mode === 'air';
    const time = s.time != null ? s.time : st.time + dt;
    st.time = time;
    const moving = !air && speed > 0.08;

    // start: explosive launch
    if (moving && !st.wasMoving && !st.wasAir) {
      st.phase = 0.42;
      if (st.launchT < 0 || st.launchT > 0.1) { st.launchT = 0; st.launchK = 1; tailKick(0.7 + 0.5 * clamp(speed / 8, 0, 1)); }
    }
    st.wasMoving = moving; st.wasAir = air;

    st.moveW = damp(st.moveW, moving ? 1 : 0, moving ? 0.028 : 0.035, dt);
    st.airW = damp(st.airW, air ? 1 : 0, air ? 0.05 : 0.035, dt);
    st.steep = damp(st.steep, clamp(s.steep || 0, 0, 1), 0.08, dt);
    st.thin = damp(st.thin, clamp(s.thin || 0, 0, 1), 0.1, dt);
    st.climb = damp(st.climb, clamp(s.climb || 0, -1, 1), 0.1, dt);
    st.alert = damp(st.alert, clamp(s.alert || 0, 0, 1), 0.06, dt);
    st.turn = damp(st.turn, s.turn || 0, 0.07, dt);
    st.fall = damp(st.fall, sstep(1.5, -3.5, s.airUp || 0), 0.06, dt);
    if (!air) st.phase = fract(st.phase + speed * dt / strideLength(speed, st.steep));
    const sn = clamp(speed / 12, 0, 1);
    const stillW = (1 - st.moveW) * (1 - st.airW);
    const scan = st.alert * stillW;

    // timers
    st.jumpT = adv(st.jumpT, dt, 0.5); st.landT = adv(st.landT, dt, 0.5); st.launchT = adv(st.launchT, dt, 0.45);
    st.attackT = adv(st.attackT, dt, 0.25); st.throwT = adv(st.throwT, dt, 0.3); st.hurtT = adv(st.hurtT, dt, 0.5);
    st.pickupT = adv(st.pickupT, dt, 0.2); st.chatterT = adv(st.chatterT, dt, 0.95); st.flickT = adv(st.flickT, dt, 0.34);
    st.blinkT = adv(st.blinkT, dt, 0.13);

    // ---- base pose
    poseStand(PA); poseSit(PB); blend(P, PA, PB, sstep(0, 1, st.alert));
    if (st.steep > 0.002) { poseCling(PC, Math.max(0, -st.climb), st.alert); blend(P, P, PC, sstep(0, 1, st.steep)); }
    if (st.thin > 0.002) { // perched on something thin: feet in one line, low, tail out for balance
      const k = st.thin, line = 1 - 0.84 * k;
      P[FLX] *= lerp(1, line, 1 - P[SIT] * 0.0); P[FRX] *= line; P[HLX] *= line; P[HRX] *= line;
      P[HIPY] -= 0.01 * k; P[CHY] -= 0.012 * k * (1 - st.alert);
      P[TP0] = lerp(P[TP0], 0.22, 0.8 * k); P[TC1] = lerp(P[TC1], 0.0, 0.8 * k); P[TC2] = lerp(P[TC2], 0.02, 0.8 * k);
    }
    if (st.moveW > 0.002) { poseGait(PG, st.phase, speed, st.steep, st.climb, st.thin); blend(P, P, PG, st.moveW); }
    if (st.airW > 0.002) { poseAir(PX, st.fall); blend(P, P, PX, st.airW); }

    // thin: tail swings side to side for balance, body sways against it
    if (st.thin > 0.002) {
      const sw = Math.sin(time * 3.1) * 0.6 + Math.sin(time * 5.3 + 1.3) * 0.4;
      P[TYAW] += 0.07 * st.thin * sw * (1 - st.airW);
      P[ROLL] -= 0.07 * st.thin * sw * (1 - st.airW);
    }
    // turning: spine and tail bend into the turn, slight bank
    const tn = clamp(st.turn, -8, 8);
    P[YAWB] += clamp(tn * 0.075, -0.5, 0.5) * (1 - 0.5 * st.airW);
    P[ROLL] += clamp(-tn * 0.03 * (0.3 + sn), -0.3, 0.3) * st.moveW;
    P[HYAW] += clamp(tn * 0.06, -0.5, 0.5);
    P[TYAW] += clamp(tn * 0.014, -0.09, 0.09);

    // breathing (fast and shallow when alert)
    const bf = lerp(2.4, 5.2, st.alert);
    st.breath = Math.sin(time * TAU * bf) * lerp(0.022, 0.014, st.alert) * stillW + Math.sin(time * TAU * 3.1) * 0.006 * (1 - stillW);

    // ---- overlays
    let sy = 1, sz = 1, blink = 0, earFlat = 0.45 * sn * st.moveW + 0.6 * st.airW;
    if (st.launchT >= 0) {
      const t = st.launchT, k = st.launchK;
      const crouch = t < 0.075 ? Math.sin(PI * t / 0.075) : 0;
      const stretch = sstep(0.04, 0.09, t) * Math.exp(-Math.max(0, t - 0.09) / 0.09);
      P[CHY] -= 0.026 * k * crouch; P[HIPY] -= 0.02 * k * crouch; P[HIPP] += 0.2 * k * crouch; P[CHP] -= 0.1 * k * crouch;
      P[HPIT] += 0.12 * k * stretch; P[CHZ] += 0.012 * k * stretch; P[HIPZ] -= 0.01 * k * stretch;
      sz *= 1 - 0.07 * k * crouch + 0.05 * k * stretch; sy *= 1 - 0.05 * k * crouch;
      earFlat += 0.5 * stretch;
    }
    if (st.jumpT >= 0) { const e = Math.exp(-st.jumpT / 0.11); sz *= 1 + 0.13 * e; sy *= 1 - 0.04 * e; }
    if (st.landT >= 0) {
      const t = st.landT, k = st.landK;
      const e = Math.exp(-t / 0.075) * Math.cos(t * 24);
      sy *= 1 - 0.3 * k * e; sz *= 1 + 0.06 * k * e;
      const dip = Math.exp(-t / 0.07) * k;
      P[CHY] -= 0.03 * dip; P[HIPY] -= 0.022 * dip; P[HPIT] -= 0.15 * dip;
    }
    if (st.attackT >= 0) {
      const u = st.attackT / 0.25;
      const wind = Math.sin(PI * clamp(u / 0.26, 0, 1)); const strike = sstep(0.16, 0.38, u) * (1 - sstep(0.6, 1, u));
      const w = sstep(0, 0.1, u) * (1 - sstep(0.72, 1, u));
      P[CHZ] += -0.02 * wind + 0.075 * strike; P[CHY] += 0.03 * wind + 0.012 * strike; P[CHP] += 0.25 * wind - 0.1 * strike;
      P[HIPZ] += 0.03 * strike; P[HDZ] += 0.028 * strike; P[HDY] += 0.012 * wind - 0.012 * strike;
      const snap = Math.sin(PI * clamp((u - 0.3) / 0.3, 0, 1));
      P[HPIT] += 0.3 * wind - 0.4 * snap; P[TP0] += 0.5 * strike;
      const sk = sstep(0.16, 0.4, u);
      const py = lerp(P[CHY] + 0.06, 0.05, sk), pz = lerp(P[CHZ] + 0.085, P[CHZ] + 0.2, sk), pp = lerp(-0.9, 0.5, sk);
      P[FLX] = lerp(P[FLX], lerp(0.042, 0.022, sk), w); P[FLY] = lerp(P[FLY], py, w); P[FLZ] = lerp(P[FLZ], pz, w); P[FLP] = lerp(P[FLP], pp, w);
      P[FRX] = lerp(P[FRX], -lerp(0.042, 0.022, sk), w); P[FRY] = lerp(P[FRY], py + 0.012, w); P[FRZ] = lerp(P[FRZ], pz - 0.012, w); P[FRP] = lerp(P[FRP], pp, w);
      sz *= 1 + 0.06 * strike; earFlat += 0.6 * w;
    }
    if (st.throwT >= 0) {
      const u = st.throwT / 0.3;
      const rise = sstep(0, 0.28, u) * (1 - sstep(0.7, 1, u)); const w = sstep(0, 0.12, u) * (1 - sstep(0.75, 1, u));
      const fl = sstep(0.4, 0.58, u);
      const up = rise * (1 - P[SIT]);
      P[CHY] += 0.075 * up; P[CHZ] -= 0.035 * up; P[CHP] += 0.7 * up; P[HIPP] += 0.35 * up; P[HIPY] -= 0.015 * up; P[HDY] += 0.03 * up - 0.01 * fl * rise; P[HDZ] -= 0.035 * up;
      P[CHZ] += 0.03 * fl * rise; P[HPIT] += 0.2 * rise * (1 - fl) - 0.15 * fl * rise;
      const py = lerp(P[CHY] + 0.085, P[CHY] + 0.01, fl), pz = lerp(P[CHZ] + 0.03, P[CHZ] + 0.17, fl), pp = lerp(1.0, -0.3, fl);
      P[FLX] = lerp(P[FLX], 0.026, w); P[FLY] = lerp(P[FLY], py, w); P[FLZ] = lerp(P[FLZ], pz, w); P[FLP] = lerp(P[FLP], pp, w);
      P[FRX] = lerp(P[FRX], -0.026, w); P[FRY] = lerp(P[FRY], py, w); P[FRZ] = lerp(P[FRZ], pz, w); P[FRP] = lerp(P[FRP], pp, w);
      P[TP0] += 0.35 * fl * rise;
    }
    let flash = 0;
    if (st.hurtT >= 0) {
      const t = st.hurtT, e = Math.exp(-t / 0.11);
      sy *= 1 - 0.24 * e * Math.cos(t * 20); sz *= 1 - 0.08 * e;
      P[CHZ] -= 0.03 * e; P[HDZ] -= 0.02 * e; P[HPIT] += 0.45 * e; P[CHY] += 0.012 * e; P[ROLL] += 0.22 * e * Math.sin(t * 46);
      flash = Math.exp(-t / 0.09); if (t < 0.26) blink = 1; earFlat = 1;
    }
    uFlash.value = flash;
    if (st.pickupT >= 0) {
      const b = Math.sin(PI * st.pickupT / 0.2); const b2 = b * b;
      P[HPIT] -= 0.55 * b2; P[HDY] -= 0.03 * b2; P[HDZ] += 0.012 * b2; P[CHY] -= 0.008 * b2;
    }
    let flick = 0;
    if (st.chatterT >= 0) {
      const t = st.chatterT, env = sstep(0, 0.06, t) * (1 - sstep(0.7, 0.95, t));
      const w = Math.sin(TAU * 7.5 * t);
      flick += Math.max(0, w) * Math.max(0, w) * env * 1.1;
      P[CHY] += 0.012 * w * env; P[HIPY] += 0.004 * w * env; P[HDZ] += 0.012 * Math.max(0, w) * env; P[HPIT] += 0.1 * w * env;
    }
    // idle: sharp double tail flicks now and then
    if (stillW > 0.5 && st.alert > 0.15) {
      st.flickNext -= dt;
      if (st.flickNext <= 0) { st.flickT = 0; st.flickNext = rr.range(1.4, 4.2); st.flickSide = rr.sign(); }
    }
    if (st.flickT >= 0) {
      const t = st.flickT;
      const p1 = t < 0.09 ? Math.sin(PI * t / 0.09) : 0, p2 = t > 0.15 && t < 0.24 ? Math.sin(PI * (t - 0.15) / 0.09) : 0;
      flick += (p1 * p1 + p2 * p2) * stillW;
      P[TYAW] += 0.05 * st.flickSide * (p1 - p2) * stillW;
    }
    if (flick > 0) { P[TP0] -= 0.55 * flick; P[TC2] += 0.2 * flick; P[TC1] += 0.04 * flick; }

    // ---- head saccades, ears, nose, blink (decision level; the fast springs run in the substeps below)
    st.sacTimer -= dt;
    if (st.sacTimer <= 0) {
      st.sacTimer = rr.range(0.3, 1.2);
      const ll = s.lookLocal;
      if (ll && rr() < 0.68) {
        const dx = ll.x, dy = ll.y - (P[CHY] + P[HDY]), dz = ll.z - (P[CHZ] + P[HDZ]);
        st.tgtYaw = clamp(Math.atan2(dx, dz), -1.9, 1.9) + rr.range(-0.08, 0.08);
        st.tgtPit = clamp(Math.atan2(dy, Math.hypot(dx, dz)), -0.7, 0.9) + rr.range(-0.05, 0.05);
        st.tgtRol = rr.range(-0.12, 0.12);
      } else {
        st.tgtYaw = rr.range(0.25, 1.25) * rr.sign(); if (rr() < 0.25) st.tgtYaw = rr.range(-0.2, 0.2);
        st.tgtPit = rr.range(-0.15, 0.32); st.tgtRol = rr() < 0.3 ? rr.range(-0.3, 0.3) : rr.range(-0.06, 0.06);
      }
      if (scan > 0.3 && rr() < 0.5) st.earT[rr() < 0.5 ? 0 : 1] = 0;
    }
    for (let k = 0; k < 2; k++) {
      st.earNext[k] -= dt * (0.4 + scan);
      if (st.earNext[k] <= 0) { st.earT[k] = 0; st.earNext[k] = rr.range(0.5, 2.6); }
      if (st.earT[k] >= 0) { st.earT[k] += dt; if (st.earT[k] > 0.16) st.earT[k] = -1; }
      st.earAng[k] = st.earT[k] >= 0 ? Math.sin(PI * st.earT[k] / 0.16) : 0;
    }
    st.blinkNext -= dt; if (st.blinkNext <= 0) { st.blinkT = 0; st.blinkNext = rr.range(1.8, 5.5); }
    if (st.blinkT >= 0) blink = Math.max(blink, Math.sin(PI * st.blinkT / 0.13));
    st.noseNext -= dt; if (st.noseNext <= 0) { st.noseEnv = 1; st.noseNext = rr.range(0.5, 1.8); }
    st.noseEnv = Math.max(0, st.noseEnv - dt / 0.45);
    const twitch = Math.sin(time * 58) * st.noseEnv * (0.4 + 0.6 * stillW);

    // ---- fast dynamics in substeps: head spring and tail chain
    const lookAmt = scan + 0.0;
    const gy = st.tgtYaw * lookAmt, gp = st.tgtPit * lookAmt, gr = st.tgtRol * lookAmt;
    const nsub = dt > 1e-6 ? Math.min(8, Math.ceil(dt / (1 / 120))) : 0;
    const h = nsub ? dt / nsub : 0;
    for (let q = 0; q < nsub; q++) {
      const w = 62, z2 = 2 * 0.72 * w;
      st.lookVY += ((gy - st.lookYaw) * w * w - st.lookVY * z2) * h; st.lookYaw += st.lookVY * h;
      st.lookVP += ((gp - st.lookPit) * w * w - st.lookVP * z2) * h; st.lookPit += st.lookVP * h;
      st.lookVR += ((gr - st.lookRol) * w * w - st.lookVR * z2) * h; st.lookRol += st.lookVR * h;
    }
    const hy = st.lookYaw, hpi = st.lookPit;
    P[HYAW] += hy * 0.78; P[YAWB] += hy * 0.22 * (1 - st.steep * 0.6); P[HPIT] += hpi; P[HROL] += st.lookRol;
    P[CHP] += 0.05 * hpi * P[SIT];

    // squash and stretch on the rig
    sy = clamp(sy, 0.55, 1.4); sz = clamp(sz, 0.7, 1.4);
    rig.scale.set(1 / Math.sqrt(sy * sz), sy, sz);

    solve(dt, nsub, h, speed, twitch, blink, earFlat);
    st.prevSpeed = speed;
  }

  // ------------------------------------------------------------------ rig solve and geometry write
  function solve(dt, nsub, h, speed, twitch, blink, earFlat) {
    const yb = P[YAWB], yawH = -0.35 * yb, yawC = 0.65 * yb, roll = P[ROLL];
    const hipx = 0, hipy = P[HIPY], hipz = P[HIPZ], chx = 0, chy = P[CHY], chz = P[CHZ];
    const cph = Math.cos(P[HIPP]), sph_ = Math.sin(P[HIPP]), cpc = Math.cos(P[CHP]), spc = Math.sin(P[CHP]);
    const syh = Math.sin(yawH), cyh = Math.cos(yawH), syc = Math.sin(yawC), cyc = Math.cos(yawC);
    const Thx = syh * cph, Thy = sph_, Thz = cyh * cph;
    const Tcx = syc * cpc, Tcy = spc, Tcz = cyc * cpc;
    // side axes with roll
    const cr = Math.cos(roll), sr = Math.sin(roll);
    frame(Thx, Thy, Thz, cyh, 0, -syh);
    const Xhx = fXx * cr + fUx * sr, Xhy = fXy * cr + fUy * sr, Xhz = fXz * cr + fUz * sr;
    frame(Thx, Thy, Thz, Xhx, Xhy, Xhz); const Uhx = fUx, Uhy = fUy, Uhz = fUz;
    frame(Tcx, Tcy, Tcz, cyc, 0, -syc);
    const Xcx = fXx * cr + fUx * sr, Xcy = fXy * cr + fUy * sr, Xcz = fXz * cr + fUz * sr;
    frame(Tcx, Tcy, Tcz, Xcx, Xcy, Xcz); const Ucx = fUx, Ucy = fUy, Ucz = fUz;

    // head matrix H = Ry(yaw) Rx(-pitch) Rz(roll)
    m3RotY(H, yawC + P[HYAW]); m3RotX(M1, -P[HPIT]); m3Mul(H, H, M1); m3RotZ(M1, P[HROL] + roll * 0.3); m3Mul(H, H, M1);
    const hx = chx + syc * P[HDZ], hyy = chy + P[HDY], hz = chz + cyc * P[HDZ];
    headPos[0] = hx; headPos[1] = hyy; headPos[2] = hz;
    const hbx = hx + H[6] * HEAD[0][0] + H[3] * HEAD[0][1], hby = hyy + H[7] * HEAD[0][0] + H[4] * HEAD[0][1], hbz = hz + H[8] * HEAD[0][0] + H[5] * HEAD[0][1];

    // spine
    const dB = Math.hypot(chx - hipx, chy - hipy, chz - hipz);
    const dC = Math.hypot(hbx - chx, hby - chy, hbz - chz) * 1.05;
    const sit = P[SIT], br = st.breath;
    const lenScale = clamp(Math.sqrt(0.185 / Math.max(0.08, dB)), 0.9, 1.12);
    for (let i = 0; i < NR; i++) {
      const sg = rSeg[i], t = rT[i];
      let w = rW[i], ht = rHt[i], hb = rHb[i];
      if (sg === 3) {
        const z = rZ[i], yo = rYo[i];
        ring(body, i, hx + H[6] * z + H[3] * yo, hyy + H[7] * z + H[4] * yo, hz + H[8] * z + H[5] * yo, H[0], H[1], H[2], H[3], H[4], H[5], w, ht, hb, rWb[i]);
        continue;
      }
      if (sg === 0) {
        const q = 1 - t;
        hPx = hipx - Thx * q * RUMP - Uhx * 0.016 * q * q; hPy = hipy - Thy * q * RUMP - Uhy * 0.016 * q * q; hPz = hipz - Thz * q * RUMP - Uhz * 0.016 * q * q;
        let x = Thx * RUMP + Uhx * 0.032 * q, y = Thy * RUMP + Uhy * 0.032 * q, z = Thz * RUMP + Uhz * 0.032 * q;
        const l = Math.sqrt(x * x + y * y + z * z); hTx = x / l; hTy = y / l; hTz = z / l;
        frame(hTx, hTy, hTz, Xhx, Xhy, Xhz);
        w *= 1 + 0.16 * sit; hb *= 1 + 0.1 * sit;
      } else if (sg === 1) {
        herm(hipx, hipy, hipz, Thx * dB, Thy * dB, Thz * dB, chx, chy, chz, Tcx * dB, Tcy * dB, Tcz * dB, t);
        frame(hTx, hTy, hTz, lerp(Xhx, Xcx, t), lerp(Xhy, Xcy, t), lerp(Xhz, Xcz, t));
        const bump = Math.sin(PI * clamp(t * 0.9 + 0.1, 0, 1));
        w *= (1 + br * bump + 0.16 * sit * (1 - t)) * lerp(1, lenScale, bump); hb *= (1 + br * 1.2 * bump + 0.12 * sit * (1 - t)) * lerp(1, lenScale, bump); ht *= lerp(1, lenScale, bump);
      } else {
        herm(chx, chy, chz, Tcx * dC * 0.75, Tcy * dC * 0.75, Tcz * dC * 0.75, hbx, hby, hbz, H[6] * dC * 0.6, H[7] * dC * 0.6, H[8] * dC * 0.6, t);
        const u = t * t * (3 - 2 * t);
        // ring planes turn steadily from the chest direction to the head direction, so a sharply bent neck never folds over itself
        let ax = lerp(Tcx, H[6], u), ay = lerp(Tcy, H[7], u), az = lerp(Tcz, H[8], u);
        const al = Math.sqrt(ax * ax + ay * ay + az * az) || 1; ax /= al; ay /= al; az /= al;
        frame(ax, ay, az, lerp(Xcx, H[0], u), lerp(Xcy, H[1], u), lerp(Xcz, H[2], u));
      }
      ring(body, i, hPx, hPy, hPz, fXx, fXy, fXz, fUx, fUy, fUz, w, ht, hb, 1);
    }
    tubeNormals(body);

    // ---- legs
    const splay = P[SPLAY];
    for (let k = 0; k < 2; k++) {
      const side = k === 0 ? 1 : -1;
      // hind
      {
        const jx = hipx + Xhx * side * 0.05 - Uhx * 0.018 + Thx * 0.008, jy = hipy + Xhy * side * 0.05 - Uhy * 0.018 + Thy * 0.008, jz = hipz + Xhz * side * 0.05 - Uhz * 0.018 + Thz * 0.008;
        const o = k === 0 ? HLX : HRX, fp = P[k === 0 ? HLP : HRP];
        const psi = yawH * 0.5 + side * P[HFY];
        const fdx = Math.sin(psi), fdz = Math.cos(psi), cf = Math.cos(fp), sf = Math.sin(fp);
        const bx = P[o], by = P[o + 1], bz = P[o + 2];
        const ax = bx - fdx * cf * HFOOT, ay = by + sf * HFOOT + 0.0105, az = bz - fdz * cf * HFOOT;
        ik2(jx, jy, jz, ax, ay, az, THIGH, SHANK, side * (0.75 + 1.5 * splay), -0.3 + 0.32 * splay, 1.0 - 0.5 * splay);
        reach[2 + k] = Math.hypot(ikEx - ax, ikEy - ay, ikEz - az);
        writeLeg(k === 0 ? legHL : legHR, jx, jy, jz, ikKx, ikKy, ikKz, ikEx, ikEy, ikEz, Xhx, Xhy, Xhz, 0.68 + 0.28 * splay);
        // foot frame: Z along the foot, X sideways, Y dorsal
        M3[6] = fdx * cf; M3[7] = -sf; M3[8] = fdz * cf; M3[0] = fdz; M3[1] = 0; M3[2] = -fdx;
        M3[3] = M3[7] * M3[2] - M3[8] * M3[1]; M3[4] = M3[8] * M3[0] - M3[6] * M3[2]; M3[5] = M3[6] * M3[1] - M3[7] * M3[0];
        applyPart(k === 0 ? pawHL : pawHR, M3, ikEx, ikEy, ikEz, 1);
      }
      // front
      {
        const jx = chx + Xcx * side * 0.034 - Ucx * 0.03 + Tcx * 0.02, jy = chy + Xcy * side * 0.034 - Ucy * 0.03 + Tcy * 0.02, jz = chz + Xcz * side * 0.034 - Ucz * 0.03 + Tcz * 0.02;
        const o = k === 0 ? FLX : FRX, fp = P[k === 0 ? FLP : FRP];
        const psi = yawC * 0.6 - side * 0.12 * (1 - splay) * 0 + side * 0.25 * splay;
        const fdx = Math.sin(psi), fdz = Math.cos(psi), cf = Math.cos(fp), sf = Math.sin(fp);
        const bx = P[o], by = P[o + 1], bz = P[o + 2];
        const ax = bx - fdx * cf * FPAW, ay = by + sf * FPAW + 0.0085, az = bz - fdz * cf * FPAW;
        ik2(jx, jy, jz, ax, ay, az, UARM, FARM, side * (0.28 + 1.9 * splay), 0.45 - 1.0 * P[SIT] - 0.42 * splay, -1.0 + 0.5 * splay);
        reach[k] = Math.hypot(ikEx - ax, ikEy - ay, ikEz - az);
        writeLeg(k === 0 ? legFL : legFR, jx, jy, jz, ikKx, ikKy, ikKz, ikEx, ikEy, ikEz, Xcx, Xcy, Xcz, 0.85);
        M3[6] = fdx * cf; M3[7] = -sf; M3[8] = fdz * cf; M3[0] = fdz; M3[1] = 0; M3[2] = -fdx;
        M3[3] = M3[7] * M3[2] - M3[8] * M3[1]; M3[4] = M3[8] * M3[0] - M3[6] * M3[2]; M3[5] = M3[6] * M3[1] - M3[7] * M3[0];
        applyPart(k === 0 ? pawFL : pawFR, M3, ikEx, ikEy, ikEz, 1);
      }
    }

    // ---- head parts
    for (let k = 0; k < 2; k++) {
      const side = k === 0 ? 1 : -1;
      // ears: base orientation, laid back at speed, quick twitches
      const tw = st.earAng[k];
      m3RotX(M1, -0.75 * earFlat - 0.35 * tw); m3RotZ(M2, side * (-0.25 * tw - 0.25 * earFlat)); m3Mul(M1, M1, M2);
      const EM = frameM[1 + k];
      m3Mul(EM, H, earBase[k]); m3Mul(EM, EM, M1);
      const ex = hx + H[0] * EAR_POS[0] * side + H[3] * EAR_POS[1] + H[6] * EAR_POS[2], ey = hyy + H[1] * EAR_POS[0] * side + H[4] * EAR_POS[1] + H[7] * EAR_POS[2], ez = hz + H[2] * EAR_POS[0] * side + H[5] * EAR_POS[1] + H[8] * EAR_POS[2];
      applyPart(k === 0 ? earL : earR, EM, ex, ey, ez, 1);
      frameO[(1 + k) * 3] = ex; frameO[(1 + k) * 3 + 1] = ey; frameO[(1 + k) * 3 + 2] = ez;
      // eyes
      m3Mul(M2, H, eyeM[k]);
      const px = hx + H[0] * EYE_POS[0] * side + H[3] * EYE_POS[1] + H[6] * EYE_POS[2], py = hyy + H[1] * EYE_POS[0] * side + H[4] * EYE_POS[1] + H[7] * EYE_POS[2], pz = hz + H[2] * EYE_POS[0] * side + H[5] * EYE_POS[1] + H[8] * EYE_POS[2];
      applyPart(k === 0 ? eyeL : eyeR, M2, px, py, pz, 1 - 0.9 * blink);
      // whisker pads twitch
      const WM = frameM[3 + k];
      m3RotY(M1, side * 0.16 * twitch); m3RotZ(M2, side * 0.08 * twitch); m3Mul(M1, M1, M2); m3Mul(WM, H, M1);
      frameO[(3 + k) * 3] = hx + H[0] * WHISK_POS[0] * side + H[3] * WHISK_POS[1] + H[6] * WHISK_POS[2];
      frameO[(3 + k) * 3 + 1] = hyy + H[1] * WHISK_POS[0] * side + H[4] * WHISK_POS[1] + H[7] * WHISK_POS[2];
      frameO[(3 + k) * 3 + 2] = hz + H[2] * WHISK_POS[0] * side + H[5] * WHISK_POS[1] + H[8] * WHISK_POS[2];
    }
    frameO[0] = hx; frameO[1] = hyy; frameO[2] = hz;
    applyPart(headStatic, H, hx, hyy, hz, 1);
    {
      const ny = NOSE_POS[1] + 0.0012 * twitch, nz = NOSE_POS[2];
      applyPart(nosePart, H, hx + H[3] * ny + H[6] * nz, hyy + H[4] * ny + H[7] * nz, hz + H[5] * ny + H[8] * nz, 1 + 0.12 * twitch);
    }

    // ---- tail
    const tbx = hipx - Thx * 0.074 + Uhx * 0.026, tby = hipy - Thy * 0.074 + Uhy * 0.026, tbz = hipz - Thz * 0.074 + Uhz * 0.026;
    // target curve (forward kinematics from the base)
    {
      let x = tbx, y = tby, z = tbz;
      tt[0] = x; tt[1] = y; tt[2] = z;
      for (let i = 1; i <= TAIL_N; i++) {
        const th = P[TP0] + P[TC1] * Math.min(i - 1, TAIL_H1) + P[TC2] * Math.max(0, i - 1 - TAIL_H1);
        const ps = yawH - P[TYAW] * i; // positive TYAW swings the tail tip towards +X
        const ct = Math.cos(th), sn_ = Math.sin(th);
        x += -Math.sin(ps) * ct * TAIL_SEG;
        y += sn_ * TAIL_SEG; z += -Math.cos(ps) * ct * TAIL_SEG;
        tt[i * 3] = x; tt[i * 3 + 1] = Math.max(y, 0.03); tt[i * 3 + 2] = z;
      }
    }
    if (!tailInit) { tailInit = true; tp.set(tt); tv.fill(0); tbPrev[0] = tbx; tbPrev[1] = tby; tbPrev[2] = tbz; }
    if (nsub > 0) {
      // pseudo forces from the body's own motion: the tail lags behind accelerations and turns
      const dv = clamp(speed - st.prevSpeed, -6, 6);
      const ang = -st.turn * dt * 0.85, ca = Math.cos(ang), sa = Math.sin(ang);
      for (let i = 1; i <= TAIL_N; i++) {
        const f = i / TAIL_N, o = i * 3;
        tv[o + 2] -= dv * 0.5 * f; tv[o + 1] += Math.abs(dv) * 0.16 * f;
        const rx = tp[o] - tbx, rz = tp[o + 2] - tbz;
        tp[o] = tbx + rx * ca + rz * sa; tp[o + 2] = tbz - rx * sa + rz * ca;
      }
      const stiff = P[TSTIF];
      for (let q = 0; q < nsub; q++) {
        const f = (q + 1) / nsub;
        tp[0] = lerp(tbPrev[0], tbx, f); tp[1] = lerp(tbPrev[1], tby, f); tp[2] = lerp(tbPrev[2], tbz, f);
        for (let i = 1; i <= TAIL_N; i++) {
          const o = i * 3, u = i / TAIL_N;
          const k = lerp(1500, 190, Math.pow(u, 0.7)) * stiff * stiff, c = 2 * 0.42 * Math.sqrt(k);
          tv[o] += ((tt[o] - tp[o]) * k - tv[o] * c) * h; tv[o + 1] += ((tt[o + 1] - tp[o + 1]) * k - tv[o + 1] * c) * h; tv[o + 2] += ((tt[o + 2] - tp[o + 2]) * k - tv[o + 2] * c) * h;
          tprev[o] = tp[o]; tprev[o + 1] = tp[o + 1]; tprev[o + 2] = tp[o + 2];
          tp[o] += tv[o] * h; tp[o + 1] += tv[o + 1] * h; tp[o + 2] += tv[o + 2] * h;
        }
        for (let i = 1; i <= TAIL_N; i++) {
          const o = i * 3, p = o - 3;
          let dx = tp[o] - tp[p], dy = tp[o + 1] - tp[p + 1], dz = tp[o + 2] - tp[p + 2];
          const l = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1e-6, sc = TAIL_SEG / l;
          tp[o] = tp[p] + dx * sc; tp[o + 1] = tp[p + 1] + dy * sc; tp[o + 2] = tp[p + 2] + dz * sc;
          if (tp[o + 1] < 0.028) tp[o + 1] = 0.028;
          tv[o] = (tp[o] - tprev[o]) / h; tv[o + 1] = (tp[o + 1] - tprev[o + 1]) / h; tv[o + 2] = (tp[o + 2] - tprev[o + 2]) / h;
        }
      }
    }
    tp[0] = tbx; tp[1] = tby; tp[2] = tbz;
    tbPrev[0] = tbx; tbPrev[1] = tby; tbPrev[2] = tbz;
    // stations along a smooth curve through the joints, with transported frames
    let pXx = Xhx, pXy = Xhy, pXz = Xhz;
    const fl = P[TFLUF];
    for (let sI = 0; sI < TAIL_ST; sI++) {
      const j = Math.min(TAIL_N - 1, (sI / TAIL_SUB) | 0), u = sI / TAIL_SUB - j;
      const i0 = Math.max(0, j - 1) * 3, i1 = j * 3, i2 = (j + 1) * 3, i3 = Math.min(TAIL_N, j + 2) * 3;
      const cx = crom(tp[i0], tp[i1], tp[i2], tp[i3], u), cy = crom(tp[i0 + 1], tp[i1 + 1], tp[i2 + 1], tp[i3 + 1], u), cz = crom(tp[i0 + 2], tp[i1 + 2], tp[i2 + 2], tp[i3 + 2], u);
      let dx = cromD(tp[i0], tp[i1], tp[i2], tp[i3], u), dy = cromD(tp[i0 + 1], tp[i1 + 1], tp[i2 + 1], tp[i3 + 1], u), dz = cromD(tp[i0 + 2], tp[i1 + 2], tp[i2 + 2], tp[i3 + 2], u);
      const l = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1; dx /= l; dy /= l; dz /= l;
      frame(dx, dy, dz, pXx, pXy, pXz); pXx = fXx; pXy = fXy; pXz = fXz;
      const o = sI * 3;
      stC[o] = cx; stC[o + 1] = cy; stC[o + 2] = cz; stT[o] = dx; stT[o + 1] = dy; stT[o + 2] = dz;
      stX[o] = fXx; stX[o + 1] = fXy; stX[o + 2] = fXz; stU[o] = fUx; stU[o + 1] = fUy; stU[o + 2] = fUz;
      const t = sI / (TAIL_ST - 1);
      const r = sI === TAIL_ST - 1 ? 0.0 : TAIL_CORE * fluffProf(t) * (1 - 0.55 * sstep(0.84, 1, t));
      ring(tailTube, sI, cx, cy, cz, fXx, fXy, fXz, fUx, fUy, fUz, r, r * 0.82, r * 0.82, 1);
    }
    tubeNormals(tailTube);
    // copy the core into the shell geometry (it has one extra seam vertex per ring)
    for (let i = 0, d = 0; i < TAIL_ST; i++) {
      const so = (tailTube.v0 + i * TS) * 3, to = i * 3;
      for (let j = 0; j <= TS; j++, d += 3) {
        const q = so + (j % TS) * 3;
        SP[d] = Pn[q]; SP[d + 1] = Pn[q + 1]; SP[d + 2] = Pn[q + 2]; SN[d] = Nn[q]; SN[d + 1] = Nn[q + 1]; SN[d + 2] = Nn[q + 2];
        STn[d] = stT[to]; STn[d + 1] = stT[to + 1]; STn[d + 2] = stT[to + 2];
      }
    }
    spAttr.needsUpdate = true; snAttr.needsUpdate = true; stAttr.needsUpdate = true; uFluff.value = fl;

    // ---- hair cards
    for (let q = 0, o = 0; q < nTubeCards; q++, o += 9) {
      const k = tubeCards[o], vi = tubeCards[o + 1] * 3, vn = tubeCards[o + 2] * 3, sg = tubeCards[o + 3], cl = tubeCards[o + 4], sl = tubeCards[o + 5];
      const vj = tubeCards[o + 7] * 3, fj = tubeCards[o + 8];
      let tx = (Pn[vn] - Pn[vi]) * sg, ty = (Pn[vn + 1] - Pn[vi + 1]) * sg, tz = (Pn[vn + 2] - Pn[vi + 2]) * sg;
      const l = Math.sqrt(tx * tx + ty * ty + tz * tz) || 1; tx /= l; ty /= l; tz /= l;
      const nx = Nn[vi], ny = Nn[vi + 1], nz = Nn[vi + 2];
      emitCard(k, Pn[vi] + (Pn[vj] - Pn[vi]) * fj - nx * 0.005, Pn[vi + 1] + (Pn[vj + 1] - Pn[vi + 1]) * fj - ny * 0.005, Pn[vi + 2] + (Pn[vj + 2] - Pn[vi + 2]) * fj - nz * 0.005,
        tx * cl + nx * sl, ty * cl + ny * sl, tz * cl + nz * sl, tubeCards[o + 6], nx, ny, nz);
    }
    for (let q = 0, o = 0; q < nRigidCards; q++, o += 9) {
      const k = rigidCards[o], f = rigidCards[o + 1], M = frameM[f], fo = f * 3;
      const x = rigidCards[o + 2], y = rigidCards[o + 3], z = rigidCards[o + 4], dx = rigidCards[o + 5], dy = rigidCards[o + 6], dz = rigidCards[o + 7];
      emitCard(k, frameO[fo] + M[0] * x + M[3] * y + M[6] * z, frameO[fo + 1] + M[1] * x + M[4] * y + M[7] * z, frameO[fo + 2] + M[2] * x + M[5] * y + M[8] * z,
        M[0] * dx + M[3] * dy + M[6] * dz, M[1] * dx + M[4] * dy + M[7] * dz, M[2] * dx + M[5] * dy + M[8] * dz, rigidCards[o + 8], H[3], H[4], H[5]);
    }
    posAttr.needsUpdate = true; nrmAttr.needsUpdate = true; cpAttr.needsUpdate = true; cdAttr.needsUpdate = true; cnAttr.needsUpdate = true;
  }

  function getHeadWorldPosition(out) {
    group.updateWorldMatrix(true, false);
    rig.updateMatrix(); rig.matrixWorld.multiplyMatrices(group.matrixWorld, rig.matrix);
    return out.set(headPos[0], headPos[1], headPos[2]).applyMatrix4(rig.matrixWorld);
  }

  // first pose so the mesh is valid before the first update
  update(0, { mode: 'surface', speed: 0, steep: 0, climb: 0, thin: 0, turn: 0, airForward: 0, airUp: 0, airTime: 0, alert: 0, lookLocal: null, time: 0 });

  return {
    group, update, trigger, getHeadWorldPosition,
    // extras for tools
    info: { triangles: bIdx.length / 3 + kIdx.length / 3 + (TAIL_ST - 1) * TS * 2 * SHELLS, vertices: NV + KV + SV, cards: nCards, drawCalls: 3 },
    _state: st, _pose: P, _reach: reach,
  };
}
