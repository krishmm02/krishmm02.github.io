import { motion, useInView } from "framer-motion";
import { useRef, useState, useMemo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Html, OrbitControls } from "@react-three/drei";

const skillCategories = [
  {
    title: "Languages",
    color: "#22d3ee",
    skills: ["C/C++", "Java", "Python", "JavaScript", "TypeScript", "SQL"],
  },
  {
    title: "Frontend",
    color: "#3b82f6",
    skills: ["React.js", "React Native", "Flutter", "HTML/CSS", "Tailwind"],
  },
  {
    title: "Backend & Cloud",
    color: "#a78bfa",
    skills: ["Node.js", "Express.js", "Flask", "FastAPI", "AWS", "Docker", "Redis"],
  },
  {
    title: "ML & AI",
    color: "#ff5e7a",
    skills: ["TensorFlow", "PyTorch", "Scikit-Learn", "CNNs", "Transformers", "YOLO"],
  },
  {
    title: "Databases",
    color: "#10b981",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
  {
    title: "Tools & DevOps",
    color: "#f59e0b",
    skills: ["Git", "GitHub Actions", "Docker", "Postman", "Jira", "CI/CD"],
  },
];

function fibonacciSphere(i: number, n: number, r: number): [number, number, number] {
  const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
  const theta = Math.PI * (1 + Math.sqrt(5)) * i;
  return [
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  ];
}

function SkillNode({
  position,
  label,
  color,
  speed,
}: {
  position: [number, number, number];
  label: string;
  color: string;
  speed: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Float speed={speed} rotationIntensity={0.15} floatIntensity={0.5}>
      <group position={position}>
        <mesh
          scale={hovered ? 1.7 : 1}
          onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[0.11, 20, 20]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 2.2 : 0.55}
            roughness={0.05}
            metalness={0.85}
          />
        </mesh>
        <Html center position={[0, -0.22, 0]} style={{ pointerEvents: "none" }}>
          <div
            style={{
              color: hovered ? "#ffffff" : color,
              fontSize: hovered ? "13px" : "9.5px",
              fontFamily: "monospace",
              whiteSpace: "nowrap",
              background: hovered ? "rgba(0,0,0,0.88)" : "rgba(0,0,0,0.35)",
              padding: hovered ? "3px 9px" : "1px 4px",
              borderRadius: "4px",
              border: hovered ? `1px solid ${color}90` : "none",
              textShadow: hovered ? `0 0 10px ${color}` : "none",
              transition: "all 0.15s ease",
              opacity: hovered ? 1 : 0.75,
            }}
          >
            {label}
          </div>
        </Html>
      </group>
    </Float>
  );
}

function SkillsCloud() {
  const skills = useMemo(
    () => skillCategories.flatMap((cat) => cat.skills.map((skill) => ({ label: skill, color: cat.color }))),
    []
  );
  return (
    <group>
      {skills.map((s, i) => (
        <SkillNode
          key={s.label + i}
          position={fibonacciSphere(i, skills.length, 2.75)}
          label={s.label}
          color={s.color}
          speed={0.9 + ((i * 0.37) % 1.1)}
        />
      ))}
    </group>
  );
}

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-28 px-4 relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary/80 mb-3">Skills</p>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.05] mb-2">
            Technical <em className="gradient-text not-italic">Arsenal.</em>
          </h2>
          <p className="text-muted-foreground/60 text-xs font-mono mb-8">
            Drag to orbit · Hover a node to highlight
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="w-full rounded-2xl overflow-hidden glass border border-primary/10"
          style={{ height: "520px" }}
        >
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm font-mono">
                Loading 3D scene…
              </div>
            }
          >
            <Canvas camera={{ position: [0, 0, 7.5], fov: 52 }} dpr={[1, 1.5]}>
              <ambientLight intensity={0.35} />
              <pointLight position={[8, 8, 8]} intensity={1.2} color="#22d3ee" />
              <pointLight position={[-8, -8, -5]} intensity={0.7} color="#a855f7" />
              <pointLight position={[0, -8, 4]} intensity={0.4} color="#ff5e7a" />
              <SkillsCloud />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={1.4}
                minPolarAngle={0.25}
                maxPolarAngle={Math.PI - 0.25}
              />
            </Canvas>
          </Suspense>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-6 flex flex-wrap gap-3 justify-center"
        >
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className="flex items-center gap-2 glass px-4 py-2 rounded-full border border-border/40"
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: cat.color, boxShadow: `0 0 7px ${cat.color}` }}
              />
              <span className="text-xs font-mono text-muted-foreground">{cat.title}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
