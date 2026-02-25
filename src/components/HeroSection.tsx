import { motion } from "framer-motion";
import { Github, Mail, MapPin, ChevronDown } from "lucide-react";
import profileImg from "@/assets/profile.jpg";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-12 mb-6 flex justify-center"
        >
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden ">
            <img
              src={profileImg}
              alt="Krish Mehta"
              className="w-full h-full object-cover
        [mask-image:radial-gradient(circle,black_50%,transparent_100%)]
        [webkit-mask-image:radial-gradient(circle,black_62%,transparent_100%)]"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="font-mono text-primary text-sm md:text-base tracking-widest uppercase mb-4">
            Software Development Engineer
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4 text-glow gradient-text"
        >
          Krish Mehta
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Full-stack engineer & ML specialist building scalable cloud services, distributed systems,
          and intelligent applications. MS CS @ UMBC.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-6"
        >
          <a
            href="https://github.com/krishmm02"
            target="_blank"
            rel="noopener noreferrer"
            className="glass px-5 py-2.5 rounded-full flex items-center gap-2 text-sm text-foreground hover:border-primary/50 hover:card-glow transition-all duration-300"
          >
            <Github size={16} />
            GitHub
          </a>
          <a
            href="mailto:krish.mehta@umbc.edu"
            className="glass px-5 py-2.5 rounded-full flex items-center gap-2 text-sm text-foreground hover:border-primary/50 hover:card-glow transition-all duration-300"
          >
            <Mail size={16} />
            krish.mehta@umbc.edu
          </a>
          <span className="glass px-5 py-2.5 rounded-full flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin size={16} />
            Baltimore, MD
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-2 mb-2 animate-bounce"
        >
          <ChevronDown className="mx-auto text-primary/50" size={28} />
        </motion.div>
      </div>
    </section>
  );
}
