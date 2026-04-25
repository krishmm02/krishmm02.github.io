import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase, Code2 } from "lucide-react";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { icon: Briefcase, label: "Years Experience", value: "3+" },
    { icon: Code2, label: "Projects Built", value: "10+" },
    { icon: GraduationCap, label: "Education", value: "MS CS" },
  ];

  return (
    <section id="about" className="py-28 px-4 relative" ref={ref}>
      <div className="absolute inset-0 bg-aurora opacity-30 pointer-events-none" />
      <div className="max-w-3xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary/80 mb-3">About</p>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.05] mb-6">
            Building the <em className="gradient-text not-italic">future</em>,{" "}
            <br className="hidden sm:block" />one system at a time.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Software Development Engineer pursuing an MS in Computer Science at the University of Maryland,
            Baltimore County. Experienced in designing cloud-based backend services, distributed systems,
            and REST APIs on AWS, with a deep interest in machine learning and computer vision.
            Strong foundation in data structures, algorithms, and object-oriented design.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="glass rounded-xl p-5 text-center card-glow"
              >
                <stat.icon className="mx-auto mb-2 text-primary" size={22} />
                <p className="text-2xl font-bold text-foreground mb-0.5">{stat.value}</p>
                <p className="text-xs text-muted-foreground font-mono">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
