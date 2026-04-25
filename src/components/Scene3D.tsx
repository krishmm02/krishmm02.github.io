import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// Simplex-noise morphing orb shader — multi-color cycling
const orbVertex = /* glsl */ `
  uniform float uTime;
  uniform float uIntensity;
  uniform float uTempo;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vNoise;

  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vNormal = normal;
    float t = uTime * (0.22 + uTempo * 0.55);

    /* 4 octaves of noise for extra bubbly randomness */
    float n1 = snoise(normal * 1.4 + vec3(t))          * 0.36;
    float n2 = snoise(normal * 2.8 - vec3(t * 0.65))   * 0.20;
    float n3 = snoise(normal * 5.6 + vec3(t * 0.4, -t * 0.3, t * 0.5)) * 0.10;
    float n4 = snoise(normal * 11.0 - vec3(t * 0.2))   * 0.05;

    float disp = (n1 + n2 + n3 + n4) * (0.55 + uIntensity * 1.1);
    vNoise = n1 + n2;
    vec3 newPos = position + normal * disp;
    vPosition = newPos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
`;

const orbFragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform float uIntensity;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform vec3 uColorD;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vNoise;

  void main() {
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fres = pow(1.0 - clamp(dot(viewDir, normalize(vNormal)), 0.0, 1.0), 2.2);

    /* Smooth cycle through 4 colours every ~16 s */
    float cycle = mod(uTime * 0.065, 4.0);
    vec3 c1; vec3 c2; float ct;
    if (cycle < 1.0)      { c1 = uColorA; c2 = uColorB; ct = smoothstep(0.0, 1.0, cycle); }
    else if (cycle < 2.0) { c1 = uColorB; c2 = uColorC; ct = smoothstep(0.0, 1.0, cycle - 1.0); }
    else if (cycle < 3.0) { c1 = uColorC; c2 = uColorD; ct = smoothstep(0.0, 1.0, cycle - 2.0); }
    else                  { c1 = uColorD; c2 = uColorA; ct = smoothstep(0.0, 1.0, cycle - 3.0); }

    /* Second time-offset cycle creates per-surface colour variation */
    float cycle2 = mod(uTime * 0.065 + 1.0, 4.0);
    vec3 d1; vec3 d2; float dt;
    if (cycle2 < 1.0)      { d1 = uColorB; d2 = uColorC; dt = smoothstep(0.0, 1.0, cycle2); }
    else if (cycle2 < 2.0) { d1 = uColorC; d2 = uColorD; dt = smoothstep(0.0, 1.0, cycle2 - 1.0); }
    else if (cycle2 < 3.0) { d1 = uColorD; d2 = uColorA; dt = smoothstep(0.0, 1.0, cycle2 - 2.0); }
    else                   { d1 = uColorA; d2 = uColorB; dt = smoothstep(0.0, 1.0, cycle2 - 3.0); }

    vec3 rimColor  = mix(c1, c2, ct);
    vec3 bodyColor = mix(d1, d2, dt);

    /* Noise drives colour split so bumps get a different hue */
    float noiseBlend = clamp(vNoise * 2.5 + 0.5, 0.0, 1.0);
    vec3 base = mix(bodyColor, rimColor, fres + noiseBlend * 0.3);

    float pulse = 0.5 + 0.5 * sin(uTime * 1.8 + vNoise * 6.0);
    vec3 col = base * (0.5 + fres * 1.5 + pulse * 0.15 * uIntensity);
    col += rimColor * fres * (0.7 + uIntensity * 0.9);

    gl_FragColor = vec4(col, 0.90);
  }
`;

function MorphingOrb() {
  const mesh = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      uTime:     { value: 0 },
      uIntensity: { value: 0.52 },
      uTempo:    { value: 0.42 },
      uColorA:   { value: new THREE.Color("#22d3ee") },  // cyan
      uColorB:   { value: new THREE.Color("#ff5e7a") },  // coral / pink
      uColorC:   { value: new THREE.Color("#a78bfa") },  // purple
      uColorD:   { value: new THREE.Color("#fbbf24") },  // amber / gold
    }),
    []
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.07;
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.09;
      mesh.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.11) * 0.05;
    }
  });

  return (
    /* Centered at [0, 1.4, 0] — sits behind the hero profile photo */
    <mesh ref={mesh} position={[0, 1.4, 0]}>
      <icosahedronGeometry args={[2.0, 64]} />
      <shaderMaterial
        vertexShader={orbVertex}
        fragmentShader={orbFragment}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function SineWaves() {
  const group = useRef<THREE.Group>(null);
  const lines = useMemo(() => {
    const colors = ["#22d3ee", "#ff5e7a", "#a78bfa", "#22d3ee", "#ff5e7a"];
    return colors.map((color, i) => {
      const segments = 220;
      const positions = new Float32Array((segments + 1) * 3);
      const geom = new THREE.BufferGeometry();
      geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.5 - i * 0.06,
      });
      return { geom, mat, phase: i * 0.7, freq: 1.1 + i * 0.35, amp: 0.32 + i * 0.04 };
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    lines.forEach((l, idx) => {
      const pos = l.geom.getAttribute("position") as THREE.BufferAttribute;
      const segs = pos.count - 1;
      for (let i = 0; i <= segs; i++) {
        const x = (i / segs - 0.5) * 9;
        const wave =
          Math.sin(x * l.freq + t * 1.4 + l.phase) * l.amp +
          Math.sin(x * (l.freq * 0.5) + t * 0.55) * 0.1;
        const y = wave - 2.2 + idx * 0.18;
        const z = Math.cos(x * 0.5 + t * 0.35 + idx) * 0.2;
        pos.setXYZ(i, x, y, z);
      }
      pos.needsUpdate = true;
    });
    if (group.current) group.current.rotation.x = -0.2;
  });

  return (
    <group ref={group}>
      {lines.map((l, i) => (
        <primitive key={i} object={new THREE.Line(l.geom, l.mat)} />
      ))}
    </group>
  );
}

function Particles() {
  const COUNT = 1600;
  const ref = useRef<THREE.Points>(null);
  const { positions, basePositions } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const basePositions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 2.8 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.5;
      const z = r * Math.cos(phi);
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      basePositions[i * 3] = x;
      basePositions[i * 3 + 1] = y;
      basePositions[i * 3 + 2] = z;
    }
    return { positions, basePositions };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const geom = ref.current.geometry as THREE.BufferGeometry;
    const pos = geom.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < COUNT; i++) {
      const by = basePositions[i * 3 + 1];
      const bz = basePositions[i * 3 + 2];
      pos.setXYZ(
        i,
        basePositions[i * 3],
        by + Math.sin(basePositions[i * 3] * 0.5 + t * 0.55) * 0.14,
        bz + Math.cos(bz * 0.4 + t * 0.35) * 0.1
      );
    }
    pos.needsUpdate = true;
    ref.current.rotation.y = t * 0.035;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#9bf2ff"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.4, 6.5], fov: 52 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[4, 3, 4]} intensity={1.4} color="#22d3ee" />
        <pointLight position={[-4, -2, -2]} intensity={1.6} color="#ff5e7a" />
        <MorphingOrb />
        <SineWaves />
        <Particles />
        <Stars radius={60} depth={50} count={300} factor={3} saturation={0} fade speed={0.8} />
      </Canvas>
    </div>
  );
}
