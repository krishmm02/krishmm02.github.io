import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, BookOpen } from "lucide-react";

const education = [
  {
    school: "University of Maryland, Baltimore County",
    degree: "Master of Science in Computer Science",
    period: "Expected May 2027",
    icon: GraduationCap,
  },
  {
    school: "Birla Vishvakarma Mahavidyalaya",
    degree: "B.Tech in Information Technology",
    period: "May 2025 • CPI: 8.46/10",
    icon: BookOpen,
  },
];

const publications = [
  "Published review paper in WJAETS: ML Solutions for Adaptive Traffic Signal Control",
  "Research paper on ML for Automated Anode Grading in Mining",
  "Research paper on VoyagR: Stable Matching based on travel preferences",
];

export default function EducationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-24 px-4 relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-mono text-primary text-sm tracking-widest uppercase mb-2">Education & Research</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">
            Academic <span className="gradient-text">background</span>
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {education.map((edu, i) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="glass rounded-xl p-6 card-glow"
            >
              <edu.icon className="text-primary mb-3" size={24} />
              <h4 className="text-lg font-semibold text-foreground mb-1">{edu.school}</h4>
              <p className="text-sm text-primary font-mono mb-1">{edu.degree}</p>
              <p className="text-xs text-muted-foreground">{edu.period}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass rounded-xl p-6"
        >
          <h4 className="font-mono text-primary text-xs tracking-wider uppercase mb-4">Publications & Research</h4>
          <ul className="space-y-3">
            {publications.map((pub, i) => (
              <li key={i} className="text-sm text-muted-foreground flex gap-2">
                <span className="text-accent mt-0.5 shrink-0">◆</span>
                {pub}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
