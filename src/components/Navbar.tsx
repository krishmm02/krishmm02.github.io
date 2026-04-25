import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Activities", href: "#extracurricular" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mt-4 flex items-center justify-between glass rounded-full pl-5 pr-2 py-2">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2.5 group"
          >
            <span className="relative flex h-7 w-7 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-gradient-bio blur-md opacity-70 group-hover:opacity-100 transition" />
              <span className="relative h-3 w-3 rounded-full bg-gradient-bio animate-pulse-ring" />
            </span>
            <span className="font-display text-xl tracking-tight">KM</span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-mono tracking-wide"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Say hi <span aria-hidden>→</span>
          </a>

          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden p-2 rounded-full glass"
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-px bg-foreground mb-1.5" />
            <span className="block w-5 h-px bg-foreground" />
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="md:hidden glass mt-2 rounded-2xl p-4 flex flex-col gap-3"
            >
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
                  className="text-sm text-muted-foreground hover:text-foreground font-mono py-1 transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
                className="rounded-full bg-foreground text-background px-4 py-2 text-sm text-center font-medium"
              >
                Say hi →
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
