import { profile, sections, scrollToId } from "@/data/content";
import { FOLDER_TINTS } from "./Folder";

export default function TopBar({ active, onPalette }: { active: string; onPalette: () => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-rule-2 bg-[rgba(246,244,239,0.88)] backdrop-blur-md">
      <div className="mx-auto flex h-[60px] max-w-6xl items-end gap-4 px-3 sm:px-6">
        <button onClick={() => scrollToId("home")} className="mb-3 flex shrink-0 items-baseline gap-2" aria-label="Back to top">
          <span className="font-display text-[28px] font-semibold italic leading-none text-sanguine">K</span>
          <span className="hidden font-display text-xl font-semibold leading-none text-ink sm:inline">Krish Mehta</span>
        </button>

        <nav className="no-scrollbar -mb-px flex flex-1 items-end gap-1 overflow-x-auto pl-2" aria-label="Folders">
          {sections.slice(1).map((s, i) => {
            const on = active === s.id;
            return (
              <button
                key={s.id}
                onClick={() => scrollToId(s.id)}
                aria-current={on ? "true" : undefined}
                className={`flex shrink-0 items-baseline gap-1.5 rounded-t-lg border border-b-0 px-3 text-[12.5px] font-semibold transition-all ${
                  on ? "h-[42px] border-rule-2 pt-3 text-ink" : "h-[34px] border-transparent pt-2 text-muted-ink hover:h-[38px] hover:text-ink"
                }`}
                style={{ background: on ? FOLDER_TINTS[i % FOLDER_TINTS.length] : "transparent" }}
              >
                <span className="font-display text-[15px] italic text-wine">{s.numeral}</span>
                {s.label}
              </button>
            );
          })}
        </nav>

        <div className="mb-3 hidden shrink-0 items-center gap-2 md:flex">
          <button
            onClick={onPalette}
            className="rounded-full border border-rule-2 px-3 py-1 text-[12px] font-medium text-ink-2 transition hover:border-[var(--ink)] hover:text-ink"
          >
            Index <kbd className="ml-1 font-mono text-[10px] text-muted-ink">Ctrl K</kbd>
          </button>
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-[var(--ink)] px-4 py-1.5 text-[12px] font-semibold text-[var(--vellum)] transition hover:bg-[var(--sanguine)]"
          >
            Hire me
          </a>
        </div>
      </div>
    </header>
  );
}
