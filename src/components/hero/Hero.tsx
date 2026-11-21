import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { profile, sections, scrollToId, stats } from "@/data/content";
import { useTypeCycle } from "@/hooks/use-scramble";
import { Arrow, Squiggle, Vitruvian } from "@/components/art/Doodles";
import type { SceneHandle } from "./particleScene";

const PHRASES = ["backend services.", "computer-vision models.", "LLM systems.", "data pipelines.", "full-stack products."];

export default function Hero() {
  const host = useRef<HTMLDivElement>(null);
  const scene = useRef<SceneHandle | null>(null);
  const [shape, setShape] = useState("sphere");
  const [webgl, setWebgl] = useState(true);
  const phrase = useTypeCycle(PHRASES, 55, 1800);

  useEffect(() => {
    let disposed = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    (async () => {
      try { await document.fonts?.load('700 100px "JetBrains Mono"'); } catch { /* system mono */ }
      const { createParticleScene } = await import("./particleScene");
      if (disposed || !host.current) return;
      try { scene.current = createParticleScene(host.current, { reduced, onShape: setShape }); }
      catch { setWebgl(false); }
    })();
    const onScroll = () => scene.current?.setScroll(Math.min(1, Math.max(0, window.scrollY / window.innerHeight)));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      disposed = true;
      window.removeEventListener("scroll", onScroll);
      scene.current?.dispose();
      scene.current = null;
    };
  }, []);

  const rise = (d: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: d, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <>
      <section id="home" className="relative min-h-[100svh] overflow-hidden pt-[60px]">
        {/* construction drawing behind the particles */}
        <div className="pointer-events-none absolute left-1/2 top-[78px] w-[300px] -translate-x-1/2 text-[rgba(90,95,110,.3)] md:left-auto md:right-[2%] md:top-[12%] md:w-[min(52vw,640px)] md:translate-x-0">
          <Vitruvian className="h-auto w-full" />
        </div>

        <div ref={host} className="absolute inset-x-0 top-[60px] h-[340px] cursor-crosshair md:inset-0 md:h-auto" onClick={() => scene.current?.next()} aria-hidden />

        <div className="pointer-events-none relative mx-auto flex max-w-6xl flex-col px-5 pb-16 pt-[340px] sm:px-8 md:min-h-[calc(100svh-60px)] md:justify-center md:pb-20 md:pt-0">
          <div className="max-w-[640px]">
            <motion.p {...rise(0.1)} className="eyebrow mb-6">
              {profile.role} <span className="mx-2 text-[var(--rule-2)]">·</span> {profile.location}
            </motion.p>

            <motion.h1
              {...rise(0.2)}
              className="font-display text-[clamp(4rem,13vw,9.5rem)] font-semibold leading-[0.84] tracking-[-0.02em] text-ink"
            >
              Krish
              <br />
              <span className="relative inline-block italic text-sanguine">
                Mehta
                <Squiggle className="absolute -bottom-3 left-1 w-[92%] text-[var(--ochre)]" />
              </span>
            </motion.h1>

            <motion.p {...rise(0.4)} className="mt-10 max-w-[560px] text-[19px] leading-relaxed text-ink-2 sm:text-xl">
              I design and build{" "}
              <span className="font-display text-[1.35em] font-semibold italic text-lapis">{phrase || " "}</span>
              <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] animate-pulse bg-[var(--lapis)]" />
              <br />
              MS Computer Science at UMBC with a 4.0 GPA, and three years shipping production code at four companies.
            </motion.p>

            <motion.div {...rise(0.55)} className="pointer-events-auto mt-9 flex flex-wrap gap-3">
              <button
                onClick={() => scrollToId("projects")}
                className="group rounded-full bg-[var(--ink)] px-6 py-3 text-[15px] font-semibold text-[var(--vellum)] transition hover:bg-[var(--sanguine)]"
              >
                See my work <span className="inline-block transition group-hover:translate-x-1">→</span>
              </button>
              <button
                onClick={() => scrollToId("fit")}
                className="rounded-full border-[1.5px] border-[var(--ink)] px-6 py-3 text-[15px] font-semibold text-ink transition hover:bg-[var(--ink)] hover:text-[var(--vellum)]"
              >
                Check my fit for your role
              </button>
              <a
                href={`mailto:${profile.email}`}
                className="rounded-full px-4 py-3 text-[15px] font-semibold text-lapis underline decoration-[1.5px] underline-offset-[6px] hover:text-sanguine"
              >
                {profile.email}
              </a>
            </motion.div>

            <motion.p {...rise(0.7)} className="mt-8 flex items-center gap-2 text-[13px] font-medium text-verdigris">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--verdigris)] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--verdigris)]" />
              </span>
              {profile.status}
            </motion.p>
          </div>
        </div>

        {webgl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="pointer-events-none absolute bottom-14 right-6 hidden items-end gap-2 text-[rgba(50,55,70,.8)] md:flex lg:right-[6%]"
          >
            <Arrow className="mb-14 w-14 -rotate-[100deg]" />
            <p className="max-w-[210px] font-hand text-[22px] leading-6">
              fig. 1. seven thousand points, drawn live. Move through them, or click to reshape.
              <span className="mt-1 block font-mono text-[11px] text-muted-ink">now: {shape}</span>
            </p>
          </motion.div>
        )}
      </section>

      {/* by the numbers */}
      <section aria-label="Highlights" className="mx-auto max-w-6xl px-5 sm:px-8">
        <dl className="grid grid-cols-2 border-t border-rule-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.value} className={`py-7 pr-4 ${i % 2 ? "pl-5 md:pl-6" : ""} ${i > 0 ? "md:border-l md:border-rule-2 md:pl-6" : ""} ${i % 2 ? "border-l border-rule-2" : ""}`}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-5xl font-semibold leading-none text-ink md:text-6xl">{s.value}</dd>
              <dd className="mt-2 max-w-[200px] text-[13.5px] leading-snug text-muted-ink">{s.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* table of contents */}
      <nav aria-label="Contents" className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="border-y border-rule-2 py-8">
          <p className="eyebrow mb-5">Contents</p>
          <ol className="grid gap-x-12 gap-y-1 sm:grid-cols-2">
            {sections.slice(1).map((s, i) => (
              <li key={s.id}>
                <button onClick={() => scrollToId(s.id)} className="group flex w-full items-baseline gap-3 py-1.5 text-left">
                  <span className="w-8 font-display text-xl italic text-wine">{s.numeral}</span>
                  <span className="font-display text-2xl font-semibold text-ink transition group-hover:text-lapis">{s.label}</span>
                  <span className="mx-1 flex-1 translate-y-[-4px] border-b border-dotted border-[var(--rule-2)]" />
                  <span className="font-mono text-[12px] text-muted-ink">p. {String(i * 4 + 3).padStart(2, "0")}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}
