import { motion } from "framer-motion";
import { education, publications, research } from "@/data/content";
import Folder from "@/components/shell/Folder";
import { Laurel, WaxSeal } from "@/components/art/Doodles";

export default function Education() {
  return (
    <Folder
      id="education"
      index={4}
      numeral="V"
      label="Education"
      code="education.json"
      title={<>Degrees <em className="text-sanguine">and research.</em></>}
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {education.map((e, i) => {
          const [score, ...unit] = e.score.split(" ");
          return (
            <motion.article
              key={e.school}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-[4px] border border-rule-2 bg-[var(--vellum)] p-2 shadow-[0_24px_40px_-30px_rgba(30,32,45,.6)]"
            >
              {/* diploma double rule */}
              <div className="relative h-full border-[3px] border-double border-[var(--rule-2)] px-6 pb-8 pt-7 text-center sm:px-8">
                <p className="eyebrow">{i === 0 ? "In progress" : "Conferred"} · {e.period}</p>
                <h3 className="mx-auto mt-4 max-w-sm font-display text-[30px] font-semibold leading-tight text-ink">{e.degree}</h3>
                <p className="mt-2 text-[15px] text-ink-2">{e.school}</p>

                <div className="relative mx-auto mt-6 flex h-36 w-36 items-center justify-center">
                  <Laurel className="absolute inset-0 h-full w-full text-[var(--verdigris)]" />
                  <div>
                    <p className="font-display text-5xl font-semibold leading-none text-ink">{score}</p>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-ink">{unit.join(" ")}</p>
                  </div>
                </div>
                <WaxSeal className="absolute bottom-3 right-3 w-[72px] rotate-[-10deg] sm:w-[84px]" label={i === 0 ? "UMBC" : "BVM"} />
              </div>
            </motion.article>
          );
        })}
      </div>

      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="card-paper mt-14 grid grid-cols-1 gap-8 p-6 sm:p-8 md:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] md:items-center"
      >
        <div>
          <p className="eyebrow">Current research · {research.period}</p>
          <h3 className="mt-3 font-display text-[32px] font-semibold leading-tight text-ink">{research.title}</h3>
          <p className="mt-1 text-[14px] font-semibold text-sanguine">
            {research.kind} · Advisor: {research.advisor}
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-2">{research.summary}</p>
        </div>
        <div className="flex items-end justify-center gap-5 md:justify-end" aria-label="Accuracy comparison">
          {[
            [research.result[0], "learned router", "var(--sanguine)", 100],
            [research.result[1], "best single LLM", "var(--rule-2)", 77],
          ].map(([v, l, c, h]) => (
            <div key={l as string} className="flex w-24 flex-col items-center">
              <p className="font-display text-3xl font-semibold text-ink">{v}</p>
              <div className="mt-2 w-14 rounded-t-sm" style={{ height: `${(h as number) * 1.3}px`, background: c as string }} />
              <p className="mt-2 text-center text-[12px] leading-tight text-muted-ink">{l}</p>
            </div>
          ))}
        </div>
      </motion.article>

      <div className="mt-14">
        <p className="eyebrow mb-4">Papers</p>
        <ol className="divide-y divide-[var(--rule-2)] border-y border-rule-2">
          {publications.map((p, i) => (
            <li key={p.title} className="grid grid-cols-[40px_1fr] gap-2 py-4 sm:grid-cols-[48px_1fr_auto] sm:items-baseline sm:gap-4">
              <span className="font-display text-2xl italic text-sanguine">{["i", "ii", "iii"][i]}.</span>
              {p.link ? (
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="font-display text-[22px] font-semibold leading-snug text-ink hover:text-lapis">
                  {p.title} <span className="text-lapis">↗</span>
                </a>
              ) : (
                <span className="font-display text-[22px] font-semibold leading-snug text-ink">{p.title}</span>
              )}
              <span
                className={`col-start-2 w-fit rounded-full px-2.5 py-0.5 text-[12px] font-semibold sm:col-start-auto ${
                  p.status === "published" ? "bg-[var(--verdigris)] text-[var(--vellum)]" : "bg-[var(--paper-2)] text-ink-2"
                }`}
              >
                {p.status === "published" ? "Published" : "Research paper"}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </Folder>
  );
}
