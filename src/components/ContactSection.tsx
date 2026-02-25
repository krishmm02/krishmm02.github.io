import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Mail, Phone, MapPin } from "lucide-react";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 px-4 relative" ref={ref}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-mono text-primary text-sm tracking-widest uppercase mb-2">Contact</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Let's <span className="gradient-text">connect</span>
          </h3>
          <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
            Open to opportunities in software engineering, ML engineering, and full-stack development.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <a
              href="mailto:krish.mehta@umbc.edu"
              className="glass px-6 py-3 rounded-full flex items-center gap-2 text-sm text-foreground hover:border-primary/50 hover:card-glow transition-all duration-300"
            >
              <Mail size={16} className="text-primary" />
              krish.mehta@umbc.edu
            </a>
            <a
              href="tel:+16674316543"
              className="glass px-6 py-3 rounded-full flex items-center gap-2 text-sm text-foreground hover:border-primary/50 hover:card-glow transition-all duration-300"
            >
              <Phone size={16} className="text-primary" />
              (667) 431-6543
            </a>
            <a
              href="https://github.com/krishmm02"
              target="_blank"
              rel="noopener noreferrer"
              className="glass px-6 py-3 rounded-full flex items-center gap-2 text-sm text-foreground hover:border-primary/50 hover:card-glow transition-all duration-300"
            >
              <Github size={16} className="text-primary" />
              krishmm02
            </a>
            <span className="glass px-6 py-3 rounded-full flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={16} className="text-primary" />
              Baltimore, MD
            </span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-xs text-muted-foreground/50 font-mono"
        >
          Designed & Built by Krish Mehta © {new Date().getFullYear()}
        </motion.p>
      </div>
    </section>
  );
}
