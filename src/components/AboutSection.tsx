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
    <section id="about" className="py-24 px-4 relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-mono text-primary text-sm tracking-widest uppercase mb-2">About</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
            Building the <span className="gradient-text">future</span>, one system at a time
          </h3>

          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl mb-12">
            Software Development Engineer pursuing an MS in Computer Science at the University of Maryland, 
            Baltimore County. Experienced in designing cloud-based backend services, distributed systems, 
            and REST APIs on AWS, with a deep interest in machine learning and computer vision. 
            Strong foundation in data structures, algorithms, and object-oriented design.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="glass rounded-xl p-6 text-center card-glow"
              >
                <stat.icon className="mx-auto mb-3 text-primary" size={24} />
                <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
