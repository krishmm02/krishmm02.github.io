import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Mail, Phone, MapPin } from "lucide-react";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative pt-28 pb-12" ref={ref}>
      <div className="absolute inset-0 bg-aurora opacity-30 pointer-events-none" />
      <div className="max-w-3xl mx-auto px-4 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary/80 mb-3">Contact</p>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.0] mb-6">
            Let's <em className="gradient-text not-italic">connect.</em>
          </h2>
          <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
            Open to opportunities in software engineering, ML engineering, and full-stack development.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-16">
            <a
              href="mailto:krish.mehta@umbc.edu"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-bio text-background px-6 py-3 text-sm font-semibold shadow-glow-cyan hover:shadow-glow-coral transition-shadow"
            >
              <Mail size={15} />
              Send an email
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="https://github.com/krishmm02"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full text-sm font-medium hover:border-primary/60 transition-colors"
            >
              <Github size={15} />
              GitHub
            </a>
            <a
              href="tel:+16674316543"
              className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full text-sm font-medium hover:border-primary/60 transition-colors"
            >
              <Phone size={15} />
              (667) 431-6543
            </a>
            <span className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full text-sm text-muted-foreground">
              <MapPin size={15} className="text-primary" />
              Baltimore, MD
            </span>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-border/60 pt-8 flex items-center justify-between flex-wrap gap-3"
        >
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gradient-bio" />
            <span className="font-display text-base">Krish Mehta</span>
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} · Designed &amp; Built with care
          </p>
        </motion.div>
      </div>
    </section>
  );
}
