import * as THREE from "three";

/* A GPU particle field that morphs between shapes: a sphere, "</>", "KM" and a torus knot.
   Particles flee the cursor, scatter as the hero scrolls away, and the morph is driven in the
   vertex shader so the CPU only updates a handful of uniforms per frame. */

const COUNT = 7000;

const vertex = /* glsl */ `
  attribute vec3 aFrom;
  attribute vec3 aTo;
  attribute float aRand;
  uniform float uTime;
  uniform float uProgress;
  uniform float uScatter;
  uniform float uSize;
  uniform vec2 uMouse;     // cursor in normalised device coords
  uniform float uMouseOn;  // 0..1, eased in and out
  uniform float uAspect;
  varying float vRand;
  varying float vDepth;

  void main() {
    float t = clamp((uProgress - aRand * 0.45) / 0.55, 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);
    vec3 p = mix(aFrom, aTo, t);

    // swirl outward mid-flight
    float flight = sin(t * 3.14159);
    p += normalize(p + vec3(0.001)) * flight * (0.15 + aRand * 0.4);

    // idle breathing
    p.x += sin(uTime * 0.9 + aRand * 40.0) * 0.018;
    p.y += cos(uTime * 0.8 + aRand * 31.0) * 0.018;
    p.z += sin(uTime * 0.6 + aRand * 17.0) * 0.03;

    // scroll scatter
    vec3 dir = normalize(vec3(sin(aRand * 91.7), cos(aRand * 57.3), sin(aRand * 13.1 + 1.0)));
    p += dir * uScatter * (2.5 + aRand * 5.0);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);

    // cursor repel, measured on screen so it works the same at any rotation or depth
    vec4 clip = projectionMatrix * mv;
    vec2 ndc = clip.xy / clip.w;
    vec2 d = (ndc - uMouse) * vec2(uAspect, 1.0);
    float dist = length(d);
    float f = smoothstep(0.19, 0.0, dist) * uMouseOn;
    f = f * f * (3.0 - 2.0 * f);
    mv.xy += (d / max(dist, 0.0001)) * f * 0.065 * -mv.z;
    mv.z += f * 0.5;

    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.55 + aRand * 0.9) / -mv.z;
    vRand = aRand;
    vDepth = clamp((-mv.z - 4.0) / 6.0, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uFade;
  varying float vRand;
  varying float vDepth;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d);
    a = smoothstep(0.0, 0.35, a);
    vec3 col = mix(uColorA, uColorB, step(0.84, vRand));
    float alpha = a * (0.3 + 0.55 * vRand) * (1.0 - vDepth * 0.55) * uFade;
    gl_FragColor = vec4(col, alpha);
  }
`;

function fibSphere(n: number, r: number) {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const rr = r * (0.92 + Math.random() * 0.08);
    out[i * 3] = rr * Math.sin(phi) * Math.cos(theta);
    out[i * 3 + 1] = rr * Math.cos(phi);
    out[i * 3 + 2] = rr * Math.sin(phi) * Math.sin(theta);
  }
  return out;
}

function fromText(n: number, text: string, width: number, weight = 700) {
  const cw = 640, ch = 320;
  const canvas = document.createElement("canvas");
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  let size = 260;
  ctx.font = `${weight} ${size}px "JetBrains Mono", ui-monospace, monospace`;
  while (ctx.measureText(text).width > cw * 0.92 && size > 40) {
    size -= 10;
    ctx.font = `${weight} ${size}px "JetBrains Mono", ui-monospace, monospace`;
  }
  ctx.fillText(text, cw / 2, ch / 2 + size * 0.04);
  const data = ctx.getImageData(0, 0, cw, ch).data;
  const pts: number[] = [];
  for (let y = 0; y < ch; y += 2) {
    for (let x = 0; x < cw; x += 2) {
      if (data[(y * cw + x) * 4 + 3] > 128) pts.push(x, y);
    }
  }
  const out = new Float32Array(n * 3);
  const scale = width / cw;
  for (let i = 0; i < n; i++) {
    const k = Math.floor(Math.random() * (pts.length / 2)) * 2;
    out[i * 3] = (pts[k] - cw / 2 + Math.random() * 2) * scale;
    out[i * 3 + 1] = -(pts[k + 1] - ch / 2 + Math.random() * 2) * scale;
    out[i * 3 + 2] = (Math.random() - 0.5) * 0.35;
  }
  return out;
}

function torusKnot(n: number) {
  const geo = new THREE.TorusKnotGeometry(1.6, 0.3, 420, 20, 2, 3);
  const src = geo.attributes.position.array as Float32Array;
  const verts = src.length / 3;
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const k = Math.floor(Math.random() * verts) * 3;
    out[i * 3] = src[k] + (Math.random() - 0.5) * 0.05;
    out[i * 3 + 1] = src[k + 1] + (Math.random() - 0.5) * 0.05;
    out[i * 3 + 2] = src[k + 2] + (Math.random() - 0.5) * 0.05;
  }
  geo.dispose();
  return out;
}

export type SceneHandle = {
  next: () => string;
  setScroll: (v: number) => void;
  dispose: () => void;
};

export const SHAPES = ["sphere", "</>", "KM", "knot"] as const;

export function createParticleScene(host: HTMLElement, opts: { reduced: boolean; onShape?: (s: string) => void }): SceneHandle {
  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
  const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 0);
  host.appendChild(renderer.domElement);
  renderer.domElement.style.display = "block";

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 8);

  const isNarrow = () => host.clientWidth < 768;
  const textWidth = () => (isNarrow() ? 4.6 : 6.4);

  const targets: Float32Array[] = [
    fibSphere(COUNT, 2.3),
    fromText(COUNT, "</>", textWidth()),
    fromText(COUNT, "KM", textWidth() * 0.8),
    torusKnot(COUNT),
  ];

  const geo = new THREE.BufferGeometry();
  const rand = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) rand[i] = Math.random();
  const from = new Float32Array(targets[0]);
  const to = new Float32Array(targets[0]);
  geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(targets[0]), 3));
  geo.setAttribute("aFrom", new THREE.BufferAttribute(from, 3));
  geo.setAttribute("aTo", new THREE.BufferAttribute(to, 3));
  geo.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 20);

  const uniforms = {
    uTime: { value: 0 },
    uProgress: { value: 1 },
    uScatter: { value: 0 },
    uSize: { value: 34 * dpr },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uMouseOn: { value: 0 },
    uAspect: { value: 1 },
    uColorA: { value: new THREE.Color("#1b1d24") },
    uColorB: { value: new THREE.Color("#2a4597") },
    uFade: { value: 0 },
  };

  const mat = new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending,
  });
  const points = new THREE.Points(geo, mat);
  const group = new THREE.Group();
  group.add(points);

  // two thin orbit rings for depth
  const ringMat = new THREE.LineBasicMaterial({ color: 0x7d7f8a, transparent: true, opacity: 0.18 });
  const rings: THREE.LineLoop[] = [];
  [3.3, 3.9].forEach((r, i) => {
    const pts: THREE.Vector3[] = [];
    for (let k = 0; k < 160; k++) {
      const a = (k / 160) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
    }
    const ring = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), ringMat);
    ring.rotation.x = 1.15 + i * 0.25;
    ring.rotation.y = i * 0.6;
    rings.push(ring);
    group.add(ring);
  });
  scene.add(group);

  // place the cluster right of centre on wide screens, behind the copy on narrow ones
  const layout = () => {
    const w = host.clientWidth, h = host.clientHeight;
    renderer.setSize(w, h, false);
    renderer.domElement.style.width = w + "px";
    renderer.domElement.style.height = h + "px";
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    uniforms.uAspect.value = w / h;
    group.position.x = isNarrow() ? 0 : 2.9;
    group.position.y = 0;
    group.scale.setScalar(isNarrow() ? 0.85 : 0.8);
    uniforms.uSize.value = (isNarrow() ? 22 : 34) * dpr;
  };
  layout();
  const ro = new ResizeObserver(layout);
  ro.observe(host);

  let shape = 0;
  let progress = 1;
  let scroll = 0;
  const tilt = new THREE.Vector2(0, 0);
  const tiltTarget = new THREE.Vector2(0, 0);
  const mouseTarget = new THREE.Vector2(0, 0);
  let mouseOnTarget = 0;
  const NAV = 64; // the fixed header sits over the top of the hero

  const onMove = (e: PointerEvent) => {
    const r = host.getBoundingClientRect();
    const inside =
      e.clientX >= r.left && e.clientX <= r.right && e.clientY >= Math.max(r.top, NAV) && e.clientY <= r.bottom;
    if (!inside) { mouseOnTarget = 0; tiltTarget.set(0, 0); return; }
    const x = ((e.clientX - r.left) / r.width) * 2 - 1;
    const y = -((e.clientY - r.top) / r.height) * 2 + 1;
    // entering from outside: jump straight to the cursor instead of sweeping across the shape
    if (uniforms.uMouseOn.value < 0.05) uniforms.uMouse.value.set(x, y);
    mouseTarget.set(x, y);
    mouseOnTarget = 1;
    tiltTarget.set(Math.max(-1, Math.min(1, x)), Math.max(-1, Math.min(1, y)));
  };
  const onLeave = () => { mouseOnTarget = 0; tiltTarget.set(0, 0); };
  window.addEventListener("pointermove", onMove, { passive: true });
  const onUp = (e: PointerEvent) => { if (e.pointerType !== "mouse") onLeave(); };
  window.addEventListener("pointerup", onUp, { passive: true });
  document.addEventListener("pointerleave", onLeave);
  host.addEventListener("pointerleave", onLeave);

  const morphTo = (idx: number) => {
    // start from where every particle is right now, so clicking mid-morph never jumps
    if (progress < 1) {
      for (let i = 0; i < COUNT; i++) {
        let t = Math.min(1, Math.max(0, (progress - rand[i] * 0.45) / 0.55));
        t = t * t * (3 - 2 * t);
        for (let k = 0; k < 3; k++) from[i * 3 + k] = from[i * 3 + k] + (to[i * 3 + k] - from[i * 3 + k]) * t;
      }
    } else {
      from.set(to);
    }
    to.set(targets[idx]);
    (geo.attributes.aFrom as THREE.BufferAttribute).needsUpdate = true;
    (geo.attributes.aTo as THREE.BufferAttribute).needsUpdate = true;
    progress = 0;
    shape = idx;
    opts.onShape?.(SHAPES[idx]);
  };

  const next = () => {
    morphTo((shape + 1) % targets.length);
    lastMorph = performance.now();
    return SHAPES[shape];
  };

  let visible = true;
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
  io.observe(host);

  let raf = 0;
  let last = performance.now();
  let lastMorph = performance.now();
  let fade = 0;
  let spin = 0;
  let roll = 0;
  const TAU = Math.PI * 2;
  const loop = (now: number) => {
    raf = requestAnimationFrame(loop);
    if (!visible || document.hidden) { last = now; return; }
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    fade = Math.min(1, fade + dt * 0.8);
    uniforms.uFade.value = fade;
    if (!opts.reduced) uniforms.uTime.value += dt;
    if (progress < 1) progress = Math.min(1, progress + dt * (opts.reduced ? 2 : 0.55));
    uniforms.uProgress.value = progress;
    // frame-rate independent easing
    const k = 1 - Math.pow(0.0001, dt);
    uniforms.uMouse.value.lerp(mouseTarget, Math.min(1, k * 1.6));
    uniforms.uMouseOn.value += (mouseOnTarget - uniforms.uMouseOn.value) * Math.min(1, k * 0.9);
    tilt.lerp(tiltTarget, Math.min(1, k * 0.35));
    uniforms.uScatter.value += (scroll - uniforms.uScatter.value) * Math.min(1, k * 0.6);

    if (!opts.reduced && now - lastMorph > 6500) next();

    const name = SHAPES[shape];
    const t = uniforms.uTime.value;
    // Each shape turns in the way that keeps it readable:
    //  sphere spins about its vertical axis; the knot rolls in its own plane (never edge-on);
    //  text faces the camera and sways gently.
    let ty = 0, tx = 0;
    if (name === "sphere") {
      if (!opts.reduced) spin += dt * 0.22;
      roll = Math.round(roll / TAU) * TAU;
      ty = spin; tx = 0.25;
    } else if (name === "knot") {
      spin = Math.round(spin / TAU) * TAU;
      if (!opts.reduced) roll += dt * 0.25;
      ty = spin + Math.sin(t * 0.4) * 0.3; tx = 0.2;
    } else {
      spin = Math.round(spin / TAU) * TAU;
      roll = Math.round(roll / TAU) * TAU;
      ty = spin + Math.sin(t * 0.35) * 0.28;
    }
    const ease = Math.min(1, k * 0.35);
    group.rotation.y += (ty + tilt.x * 0.3 - group.rotation.y) * ease;
    group.rotation.x += (tx - tilt.y * 0.2 - group.rotation.x) * ease;
    points.rotation.z += (roll - points.rotation.z) * ease;
    rings[0].rotation.z += dt * 0.15;
    rings[1].rotation.z -= dt * 0.1;

    renderer.render(scene, camera);
  };

  raf = requestAnimationFrame(loop);

  return {
    next,
    setScroll: (v) => { scroll = opts.reduced ? 0 : v; },
    dispose: () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerleave", onLeave);
      geo.dispose();
      mat.dispose();
      ringMat.dispose();
      rings.forEach((r) => r.geometry.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
