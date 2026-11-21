import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile, projects, sections, scrollToId } from "@/data/content";

type Item = { id: string; group: string; label: string; hint?: string; run: () => void };

export default function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const items = useMemo<Item[]>(
    () => [
      ...sections.map((s) => ({ id: "go-" + s.id, group: "folders", label: s.label, hint: s.numeral ? `folio ${s.numeral}` : "top", run: () => scrollToId(s.id) })),
      { id: "fit", group: "actions", label: "check my fit for your role", hint: "skills & fit", run: () => scrollToId("fit") },
      {
        id: "copy",
        group: "actions",
        label: "copy email address",
        hint: profile.email,
        run: () => { navigator.clipboard?.writeText(profile.email).catch(() => {}); },
      },
      { id: "mail", group: "links", label: "send an email", hint: profile.email, run: () => { window.location.href = `mailto:${profile.email}`; } },
      { id: "gh", group: "links", label: "github", hint: "@" + profile.handle, run: () => window.open(profile.github, "_blank", "noopener") },
      { id: "li", group: "links", label: "linkedin", hint: "in/krish-mehta", run: () => window.open(profile.linkedin, "_blank", "noopener") },
      ...projects.map((p) => ({
        id: "p-" + p.id,
        group: "projects",
        label: p.title,
        hint: p.link ? "open live" : "open repo",
        run: () => window.open(p.link ?? p.github, "_blank", "noopener"),
      })),
    ],
    [],
  );

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((i) => (i.label + " " + i.group + " " + (i.hint ?? "")).toLowerCase().includes(s));
  }, [q, items]);

  useEffect(() => {
    if (open) {
      setQ("");
      setSel(0);
      setTimeout(() => input.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => setSel(0), [q]);

  const run = (i: Item | undefined) => {
    if (!i) return;
    onClose();
    setTimeout(i.run, 60);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(filtered.length - 1, s + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(0, s - 1)); }
    else if (e.key === "Enter") { e.preventDefault(); run(filtered[sel]); }
    else if (e.key === "Escape") onClose();
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center bg-[rgba(33,28,23,0.35)] px-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            role="dialog"
            aria-label="Command palette"
            initial={{ y: -12, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="card-paper w-full max-w-lg overflow-hidden"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-rule px-4">
              <span className="font-display text-xl italic text-sanguine">K</span>
              <input
                ref={input}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onKey}
                placeholder="Search folders, projects, links…"
                className="h-14 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-[var(--muted-ink)]"
                aria-label="Search commands"
              />
              <kbd className="rounded border border-rule-2 px-1.5 font-mono text-[10px] text-muted-ink">esc</kbd>
            </div>
            <ul className="max-h-[50vh] overflow-y-auto py-2 text-sm">
              {filtered.length === 0 && <li className="px-4 py-6 text-center text-muted-ink">Nothing found. Try “projects”.</li>}
              {filtered.map((i, idx) => {
                const header = i.group !== lastGroup;
                lastGroup = i.group;
                return (
                  <li key={i.id}>
                    {header && <p className="eyebrow px-4 pb-1 pt-3">{i.group}</p>}
                    <button
                      onMouseEnter={() => setSel(idx)}
                      onClick={() => run(i)}
                      className={`flex w-full items-center justify-between px-4 py-2 text-left ${
                        sel === idx ? "bg-[var(--paper-2)] text-ink" : "text-ink-2"
                      }`}
                    >
                      <span>
                        {sel === idx && <span className="mr-2 text-sanguine">›</span>}
                        {i.label}
                      </span>
                      <span className="truncate pl-4 font-mono text-[11px] text-muted-ink">{i.hint}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
