import { motion } from "framer-motion";
import type { ReactNode } from "react";

export const FOLDER_TINTS = ["#ece7da", "#e3e7ee", "#e2e8e1", "#eee5e6", "#ebe5d4", "#e1e8e9", "#e8e4ee"];

/** An archive folder: a protruding tab with the folio number, and a paper body. */
export default function Folder({
  id,
  index,
  numeral,
  label,
  code,
  title,
  intro,
  doodle,
  children,
}: {
  id: string;
  index: number;
  numeral: string;
  label: string;
  code: string;
  title: ReactNode;
  intro?: ReactNode;
  doodle?: ReactNode;
  children: ReactNode;
}) {
  const tint = FOLDER_TINTS[index % FOLDER_TINTS.length];
  const tabLeft = `${(index % 4) * 21}%`;
  return (
    <section id={id} className="relative mx-auto max-w-6xl px-3 pt-24 sm:px-6 md:pt-32">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        {/* tab */}
        <div
          className="absolute -top-[42px] left-0 z-[1] flex h-[43px] items-center gap-3 rounded-t-xl border border-b-0 border-rule-2 px-5 sm:left-[var(--tab)]"
          style={{ background: tint, ["--tab" as string]: tabLeft }}
        >
          <span className="font-display text-xl font-semibold italic text-wine">{numeral}</span>
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink">{label}</span>
        </div>

        {/* body */}
        <div
          className="relative overflow-hidden rounded-xl rounded-tl-none border border-rule-2 px-5 pb-10 pt-10 shadow-[0_30px_60px_-40px_rgba(30,32,45,.45)] sm:rounded-tl-xl sm:px-10 sm:pb-14 md:px-14 md:pt-14"
          style={{ background: tint }}
        >
          {/* paper edge highlight + faint ruled margin */}
          <div className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,.55)]" />
          <div className="pointer-events-none absolute inset-y-0 left-3 hidden w-px bg-[rgba(123,35,64,.16)] md:block" />

          {doodle && (
            <div className="pointer-events-none absolute right-4 top-4 hidden text-[rgba(50,55,70,.5)] md:block">{doodle}</div>
          )}

          <header className="relative mb-10 max-w-3xl md:mb-14">
            <p className="eyebrow mb-4">
              Folio {numeral} <span className="mx-2 text-[var(--rule-2)]">/</span>
              <span className="normal-case tracking-normal">{code}</span>
            </p>
            <h2 className="font-display text-[clamp(2.4rem,6vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.01em] text-ink">
              {title}
            </h2>
            {intro && <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-ink-2">{intro}</p>}
          </header>

          <div className="relative">{children}</div>
        </div>
      </motion.div>
    </section>
  );
}
