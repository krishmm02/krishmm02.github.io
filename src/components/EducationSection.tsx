import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, BookOpen } from "lucide-react";

const education = [
  {
    school: "University of Maryland, Baltimore County",
    degree: "Master of Science in Computer Science",
    period: "Expected May 2027",
    gpa: "GPA: 4.0 / 4.0",
    icon: GraduationCap,
    accentColor: "#22d3ee",
  },
  {
    school: "Birla Vishvakarma Mahavidyalaya",
    degree: "B.Tech in Information Technology",
    period: "May 2025",
    gpa: "CPI: 8.46 / 10",
    icon: BookOpen,
    accentColor: "#ff5e7a",
  },
];

const publications = [
  {
    text: "Published review paper in WJAETS: ML Solutions for Adaptive Traffic Signal Control",
    link: "https://wjaets.com/content/machine-learning-solutions-adaptive-traffic-signal-control-review-image-based-approaches",
  },
  { text: "Research paper on ML for Automated Anode Grading in Mining", link: null },
  { text: "Research paper on VoyagR: Stable Matching based on travel preferences", link: null },
];

export default function EducationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-28 px-4 relative" ref={ref}>
      <div className="absolute inset-0 bg-aurora opacity-20 pointer-events-none" />
      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary/80 mb-3">Education & Research</p>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.05] mb-12">
            Academic <em className="gradient-text not-italic">background</em>.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {education.map((edu, i) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="glass rounded-2xl p-6"
              style={{ boxShadow: `0 4px 30px ${edu.accentColor}12` }}
            >
              <edu.icon className="mb-3" size={24} style={{ color: edu.accentColor }} />
              <h4 className="font-display text-xl text-foreground mb-1">{edu.school}</h4>
              <p className="text-sm font-mono mb-1" style={{ color: edu.accentColor }}>{edu.degree}</p>
              <p className="text-xs text-muted-foreground font-mono">{edu.period}</p>
              <p className="text-xs font-mono text-secondary mt-1">{edu.gpa}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass rounded-2xl p-6"
        >
          <h4 className="font-mono text-primary text-xs tracking-[0.25em] uppercase mb-5">Publications & Research</h4>
          <ul className="space-y-3">
            {publications.map((pub, i) => (
              <li key={i} className="text-base text-muted-foreground flex gap-3">
                <span className="text-secondary mt-0.5 shrink-0">◆</span>
                {pub.link ? (
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors underline underline-offset-2"
                  >
                    {pub.text}
                  </a>
                ) : (
                  pub.text
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
