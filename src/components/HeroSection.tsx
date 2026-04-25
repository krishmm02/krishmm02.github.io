import { motion, AnimatePresence } from "framer-motion";
import { Github, Mail, MapPin, ChevronDown } from "lucide-react";
import { useState, useEffect, lazy, Suspense } from "react";
import profileImg from "@/assets/profile.jpg";

const Scene3D = lazy(() => import("@/components/Scene3D"));

const titles = [
  "Software Development Engineer",
  "Full-Stack Engineer",
  "ML & AI Engineer",
  "Cloud Backend Engineer",
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % titles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">

      {/* ── 3D canvas: absolute inside this section so it shares the same
           stacking context as the text, enabling mix-blend-mode to work ── */}
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>

      {/* Aurora gradient */}
      <div className="absolute inset-0 bg-aurora pointer-events-none" />
      {/* Grid overlay — inline opacity avoids creating an extra stacking context */}
      <div className="absolute inset-0 grid-bg pointer-events-none" style={{ opacity: 0.4 }} />

      {/* Content — relative, no z-index: stays in same stacking context as the canvas above,
          so mix-blend-difference on children blends against the actual blob pixels */}
      <div className="relative text-center max-w-4xl mx-auto pt-28 pb-16">

        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 mb-8"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/70">
            Open to opportunities · MS CS @ UMBC
          </span>
        </motion.div>

        {/* Profile photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-bio blur-lg" style={{ opacity: 0.6 }} />
            <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden ring-2 ring-primary/30">
              <img src={profileImg} alt="Krish Mehta" className="w-full h-full object-cover" />
            </div>
          </div>
        </motion.div>

        {/* Cycling role
            mobile  → mix-blend-difference + white = complement of whatever blob colour is behind it
            desktop → normal cyan, full opacity */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="h-6 flex items-center justify-center mb-5 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={titles[index]}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-[11px] uppercase tracking-[0.3em] text-white mix-blend-difference"
            >
              {titles[index]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Name
            mobile  → white + mix-blend-difference → letter colour = complement of blob pixel behind it
            desktop → normal gradient Mehta */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="font-display text-6xl sm:text-8xl md:text-9xl leading-[0.92] tracking-tight mb-6 text-white mix-blend-difference"
        >
          Krish <em className="not-italic">Mehta</em>
        </motion.h1>

        {/* Description
            mobile  → white + mix-blend-difference
            desktop → muted foreground */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="text-white mix-blend-difference text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Full-stack engineer &amp; ML specialist building scalable cloud services,
          distributed systems, and intelligent applications.
        </motion.p>

        {/* CTA links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-6"
        >
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-bio text-background px-6 py-3 text-sm font-semibold shadow-glow-cyan hover:shadow-glow-coral transition-shadow"
          >
            View my work
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="https://github.com/krishmm02"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium hover:border-primary/60 transition-colors"
          >
            <Github size={15} />
            GitHub
          </a>
          <a
            href="mailto:krish.mehta@umbc.edu"
            className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium hover:border-primary/60 transition-colors"
          >
            <Mail size={15} />
            Email
          </a>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex items-center justify-center gap-1.5 text-muted-foreground text-sm mb-12"
        >
          <MapPin size={13} className="text-primary/70" />
          <span className="font-mono text-xs tracking-wide">Baltimore, MD</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="animate-float"
        >
          <ChevronDown className="mx-auto text-primary/40" size={26} />
        </motion.div>
      </div>

      {/* Bottom ticker */}
      <div className="absolute bottom-0 inset-x-0 z-10 border-t border-border/60 bg-background/60 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-center md:justify-between flex-wrap gap-x-6 gap-y-1 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/60">
          <span>↳ full-stack · ml · cloud</span>
          <span>react · python · aws · pytorch</span>
          <span className="hidden md:inline">latency-obsessed</span>
          <span className="hidden md:inline">gpa 4.0</span>
        </div>
      </div>
    </section>
  );
}
