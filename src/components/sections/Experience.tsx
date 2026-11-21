import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { experiences } from "@/data/content";
import Folder from "@/components/shell/Folder";
import { Arrow } from "@/components/art/Doodles";

const hash = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
};

type Lens = "swe" | "ml";

export default function Experience() {
  const [lens, setLens] = useState<Lens>("swe");

  return (
    <Folder
      id="experience"
      index={2}
      numeral="III"
      label="Experience"
      code="git log --career"
      title={<>Three years of production work, <em className="text-sanguine">four teams.</em></>}
      intro="Most of my roles covered both software and machine learning. Pick the side that matters for your role and the titles and details switch with it."
    >
      <div className="mb-12 flex flex-wrap items-center gap-4">
        <span className="eyebrow">Read as</span>
        <div role="tablist" aria-label="Experience lens" className="relative flex rounded-full border-[1.5px] border-[var(--ink)] p-1">
          {([
            ["swe", "Software Engineering"],
            ["ml", "Machine Learning"],
          ] as const).map(([id, label]) => (
            <button
              key={id}
              role="tab"
              aria-selected={lens === id}
              onClick={() => setLens(id)}
              className={`relative z-[1] rounded-full px-4 py-1.5 text-[14px] font-semibold transition-colors ${lens === id ? "text-[var(--vellum)]" : "text-ink hover:text-sanguine"}`}
            >
              {lens === id && (
                <motion.span layoutId="lens-pill" className="absolute inset-0 -z-[1] rounded-full bg-[var(--ink)]" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
              )}
              {label}
            </button>
          ))}
        </div>
      </div>

      <ol className="relative">
        <span className="absolute bottom-6 left-[7px] top-3 w-px bg-[var(--rule-2)] md:left-[171px]" aria-hidden />

        {experiences.map((e, i) => {
          const [start, end] = e.period.split(" – ");
          const v = lens === "ml" && e.ml ? e.ml : e.swe;
          return (
            <motion.li
              key={e.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
              className="relative grid grid-cols-1 pb-12 pl-8 last:pb-0 md:grid-cols-[150px_1fr] md:gap-12 md:pl-0"
            >
              <div className="mb-2 md:mb-0 md:pt-1 md:text-right">
                <p className="font-display text-2xl font-semibold italic leading-none text-ink md:text-[28px]">{end}</p>
                <p className="mt-1 text-[13px] text-muted-ink">from {start}</p>
                <p className="mt-2 hidden font-mono text-[10.5px] text-[var(--rule-2)] md:block">commit {hash(e.company)}</p>
              </div>

              <span
                className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-[2.5px] border-[var(--paper)] md:left-[164px]"
                style={{ background: i === 0 ? "var(--sanguine)" : "var(--ink)", boxShadow: "0 0 0 1px var(--rule-2)" }}
                aria-hidden
              />

              <div className="card-paper relative p-5 sm:p-7">
                {e.branch && (
                  <div className="pointer-events-none absolute -top-9 right-2 hidden items-end gap-1 text-[rgba(50,55,70,.7)] sm:flex">
                    <span className="font-hand text-[19px]">in parallel with BlissQuants</span>
                    <Arrow className="w-10 rotate-[100deg]" />
                  </div>
                )}
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-[30px] font-semibold leading-tight text-ink">{e.company}</h3>
                  <span className="text-[13px] font-medium text-muted-ink">{e.location}</span>
                </div>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={v.role}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22 }}
                  >
                    <p className="mt-0.5 text-[15.5px] font-semibold text-sanguine">{v.role}</p>
                    <ul className="mt-4 space-y-2.5">
                      {v.points.map((p) => (
                        <li key={p} className="flex gap-3 text-[16px] leading-relaxed text-ink-2">
                          <span className="mt-[11px] h-[5px] w-[5px] shrink-0 rotate-45 bg-[var(--ochre)]" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
                <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-rule pt-4">
                  {e.tags.map((t) => (
                    <li key={t} className="rounded-full bg-[var(--paper-2)] px-2.5 py-0.5 text-[12.5px] font-medium text-ink-2">{t}</li>
                  ))}
                </ul>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </Folder>
  );
}
