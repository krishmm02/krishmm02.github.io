import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { experiences, gapTerms, profile, projects, rolePresets, skillAliases, skillGroups } from "@/data/content";
import Folder from "@/components/shell/Folder";
import { CompassRose } from "@/components/art/Doodles";

/* Skills & Fit: pick a role or paste a job description. The page checks it against my real
   stack, shows the overlap, names the gaps honestly, and points to where each skill was used. */

const toRe = (aliases: string[]) =>
  new RegExp(`(?:^|[^a-z0-9+#])(?:${aliases.join("|")})(?=$|[^a-z0-9+#])`, "i");

const SKILL_RE = Object.entries(skillAliases).map(([name, a]) => [name, toRe(a)] as const);
const GAP_RE = Object.entries(gapTerms).map(([name, a]) => [name, toRe(a)] as const);
const ALL_SKILLS = new Set(skillGroups.flatMap((g) => g.skills));

const scan = (text: string, table: readonly (readonly [string, RegExp])[]) =>
  table.filter(([, re]) => re.test(text)).map(([n]) => n);

// what each job and project demonstrates
const evidence = [
  ...experiences.map((e) => ({
    kind: "Role",
    title: `${e.swe.role}, ${e.company}`,
    meta: e.period,
    skills: new Set([...e.tags, ...scan([...e.swe.points, ...(e.ml?.points ?? [])].join(" "), SKILL_RE)]),
    href: undefined as string | undefined,
  })),
  ...projects.map((p) => ({
    kind: "Project",
    title: p.title,
    meta: p.subtitle,
    skills: new Set(scan(`${p.tech.join(" , ")} , ${p.description}`, SKILL_RE)),
    href: p.link ?? p.github,
  })),
];

const SAMPLE_JD =
  "We're hiring a Software Engineer to build scalable REST APIs in Python and Node.js on AWS. You'll work with PostgreSQL, Redis, Kafka and Docker, ship features in React, and help productionise PyTorch models and LLM features. Kubernetes and CI/CD experience is a plus.";

export default function Fit() {
  const [preset, setPreset] = useState<string | null>(null);
  const [jd, setJd] = useState("");

  const result = useMemo(() => {
    let wants: string[] = [];
    let label = "";
    if (preset) {
      const r = rolePresets.find((x) => x.id === preset)!;
      wants = [...r.wants];
      label = r.label;
    } else if (jd.trim().length > 20) {
      wants = [...scan(jd, SKILL_RE), ...scan(jd, GAP_RE)];
      label = "this job description";
    }
    if (!wants.length) return null;
    const have = wants.filter((w) => ALL_SKILLS.has(w));
    const missing = wants.filter((w) => !ALL_SKILLS.has(w));
    const haveSet = new Set(have);
    const proof = evidence
      .map((e) => ({ ...e, hits: [...e.skills].filter((s) => haveSet.has(s)) }))
      .filter((e) => e.hits.length)
      .sort((a, b) => b.hits.length - a.hits.length)
      .slice(0, 4);
    return { label, have: haveSet, missing, score: Math.round((have.length / wants.length) * 100), proof };
  }, [preset, jd]);

  const needle = result ? -120 + (result.score / 100) * 240 : -35;
  const mail = result
    ? `mailto:${profile.email}?subject=${encodeURIComponent(`Role: ${preset ? result.label : "Software Engineer"}`)}&body=${encodeURIComponent(
        `Hi Krish,\n\nYour portfolio shows a ${result.score}% match for ${result.label}. We'd like to talk.\n\n`,
      )}`
    : `mailto:${profile.email}`;

  return (
    <Folder
      id="fit"
      index={1}
      numeral="II"
      label="Skills & Fit"
      code="match(role, krish)"
      title={<>Hiring for a role? <em className="text-sanguine">Let's see how I fit.</em></>}
      intro="Pick a role, or paste your job description. I'll show which requirements I already cover, where I've used each skill, and what I'd still need to learn."
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
        {/* the instrument */}
        <div className="card-paper p-5 sm:p-7">
          <p className="eyebrow mb-3">1. Choose a role</p>
          <div className="flex flex-wrap gap-2">
            {rolePresets.map((r) => (
              <button
                key={r.id}
                onClick={() => { setPreset(preset === r.id ? null : r.id); setJd(""); }}
                aria-pressed={preset === r.id}
                className={`rounded-full border-[1.5px] px-3.5 py-1.5 text-[14px] font-semibold transition ${
                  preset === r.id ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--vellum)]" : "border-rule-2 text-ink hover:border-[var(--ink)]"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <p className="eyebrow mb-3 mt-7">2. or paste a job description</p>
          <textarea
            value={jd}
            onChange={(e) => { setJd(e.target.value); setPreset(null); }}
            rows={5}
            placeholder="Paste the requirements here…"
            className="w-full resize-y rounded-md border border-rule-2 bg-[var(--paper)] p-3 text-[14.5px] leading-relaxed text-ink outline-none transition placeholder:text-[var(--muted-ink)] focus:border-[var(--lapis)]"
            aria-label="Job description"
          />
          {!jd && (
            <button onClick={() => { setJd(SAMPLE_JD); setPreset(null); }} className="ink-link mt-1 text-[13px]">
              Try a sample description
            </button>
          )}

          <div className="mt-6 flex items-center gap-5 border-t border-rule pt-6">
            <CompassRose className="w-28 shrink-0 text-[var(--ink-2)] sm:w-32" needle={needle} />
            <div aria-live="polite">
              {result ? (
                <>
                  <p className="font-display text-6xl font-semibold leading-none text-ink">
                    {result.score}<span className="text-3xl text-muted-ink">%</span>
                  </p>
                  <p className="mt-2 text-[14px] text-ink-2">
                    of the requirements for <strong className="text-ink">{result.label}</strong> are already in my stack.
                  </p>
                </>
              ) : (
                <p className="font-display text-2xl italic leading-snug text-muted-ink">The needle waits for a role.</p>
              )}
            </div>
          </div>

          <AnimatePresence>
            {result && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                {result.missing.length > 0 && (
                  <p className="mt-5 rounded-md bg-[rgba(176,129,44,.12)] px-4 py-3 text-[14px] leading-relaxed text-ink-2">
                    <span className="font-semibold text-ink">Still to learn:</span> {result.missing.join(", ")}. I've picked up a new
                    stack at every job so far, and these are next.
                  </p>
                )}
                <a
                  href={mail}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--sanguine)] px-5 py-3 text-[15px] font-semibold text-[var(--vellum)] transition hover:bg-[var(--ink)]"
                >
                  Write to me about this role →
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* the catalogue */}
        <div className="min-w-0">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {skillGroups.map((g) => (
              <div key={g.id} className="border-t-[1.5px] pt-3" style={{ borderColor: g.color }}>
                <p className="mb-2.5 flex items-baseline gap-2">
                  <span className="font-display text-lg italic" style={{ color: g.color }}>Plate {g.plate}.</span>
                  <span className="text-[13px] font-bold uppercase tracking-[0.12em] text-ink">{g.title}</span>
                </p>
                <ul className="flex flex-wrap gap-1.5">
                  {g.skills.map((s) => {
                    const hit = result?.have.has(s);
                    const dim = result && !hit;
                    return (
                      <li
                        key={s}
                        className="rounded-full border px-2.5 py-1 text-[13.5px] font-medium transition-all duration-300"
                        style={{
                          background: hit ? g.color : "rgba(250,246,238,.7)",
                          color: hit ? "#faf6ee" : "var(--ink)",
                          borderColor: hit ? g.color : "var(--rule-2)",
                          opacity: dim ? 0.55 : 1,
                        }}
                      >
                        {hit && "✓ "}{s}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {result && result.proof.length > 0 && (
              <motion.div
                key={result.label + result.score}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-10"
              >
                <p className="eyebrow mb-3">Where I've used them</p>
                <ul className="divide-y divide-[var(--rule-2)] border-y border-rule-2">
                  {result.proof.map((p) => (
                    <li key={p.title} className="py-3.5">
                      <p className="flex flex-wrap items-baseline gap-x-3">
                        <span className="font-mono text-[11px] uppercase text-sanguine">{p.kind}</span>
                        {p.href ? (
                          <a href={p.href} target="_blank" rel="noopener noreferrer" className="font-display text-xl font-semibold text-ink hover:text-lapis">
                            {p.title} ↗
                          </a>
                        ) : (
                          <span className="font-display text-xl font-semibold text-ink">{p.title}</span>
                        )}
                        <span className="text-[13px] text-muted-ink">{p.meta}</span>
                      </p>
                      <p className="mt-1 text-[13.5px] text-ink-2">{p.hits.join(" · ")}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Folder>
  );
}
