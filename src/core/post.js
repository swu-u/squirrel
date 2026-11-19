// Post-processing: bloom plus a warm colour grade and vignette.
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const GradeShader = {
  uniforms: { tDiffuse: { value: null }, uVignette: { value: 0.32 }, uSat: { value: 1.12 }, uDanger: { value: 0 }, uSpeed: { value: 0 } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse; uniform float uVignette, uSat, uDanger, uSpeed; varying vec2 vUv;
    void main(){
      vec2 d = vUv - 0.5;
      float r2 = dot(d, d);
      // slight radial smear at the edges when sprinting
      vec2 uv = vUv - d * r2 * 0.03 * uSpeed;
      vec3 c = texture2D(tDiffuse, uv).rgb;
      if (uSpeed > 0.01) { c = mix(c, (c + texture2D(tDiffuse, vUv - d * r2 * 0.07 * uSpeed).rgb + texture2D(tDiffuse, vUv - d * r2 * 0.11 * uSpeed).rgb) / 3.0, min(1.0, r2 * 4.0)); }
      float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
      c = mix(vec3(l), c, uSat);
      // warm highlights, cool shadows
      c *= mix(vec3(0.96, 0.98, 1.05), vec3(1.05, 1.0, 0.94), smoothstep(0.0, 0.7, l));
      c = c * (1.0 + 0.06 * (1.0 - l));
      float v = smoothstep(0.2, 0.85, r2 * 2.0);
      c *= 1.0 - v * uVignette;
      c = mix(c, c * vec3(1.15, 0.72, 0.68), v * uDanger);
      gl_FragColor = vec4(c, 1.0);
    }`,
};

export function createPost(renderer, scene, camera, opts = {}) {
  const size = renderer.getDrawingBufferSize(new THREE.Vector2());
  const rt = new THREE.WebGLRenderTarget(size.x, size.y, { type: THREE.HalfFloatType, samples: opts.msaa ?? 4 });
  const composer = new EffectComposer(renderer, rt);
  composer.addPass(new RenderPass(scene, camera));
  let bloom = null;
  if (opts.bloom !== false) {
    bloom = new UnrealBloomPass(new THREE.Vector2(size.x / 2, size.y / 2), 0.32, 0.7, 0.92);
    composer.addPass(bloom);
  }
  const grade = new ShaderPass(GradeShader);
  composer.addPass(grade);
  composer.addPass(new OutputPass());
  return {
    composer, grade, bloom,
    setSize(w, h, pr) { composer.setPixelRatio(pr); composer.setSize(w, h); },
    render(dt) { composer.render(dt); },
  };
}
