import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    company: "FitterFly",
    role: "Software Development Engineer",
    location: "Mumbai",
    period: "Jan 2025 – Jun 2025",
    points: [
      "Owned backend services for food-logging workflows with REST APIs handling concurrent requests",
      "Implemented Redis caching and stateless API design to reduce latency and improve scalability",
      "Built end-to-end Flutter features with BLoC pattern and integrated ML inference pipeline",
    ],
  },
  {
    company: "Cerebulb",
    role: "Full-Stack Engineer",
    location: "GIFT City",
    period: "Jun 2024 – Dec 2024",
    points: [
      "Built React.js views and Flask + SQL dashboards for real-time equipment monitoring",
      "Trained CNN-based anode lifecycle classifier achieving 92% accuracy",
      "Automated backend checks reducing manual review work by 40%",
    ],
  },
  {
    company: "BlissQuants",
    role: "Software Development Engineer",
    location: "Surat",
    period: "Jan 2023 – Jun 2024",
    points: [
      "Developed React Native app with Flask + AWS Lambda for real-time financial analytics",
      "Integrated delta hedging metrics and implied volatility for F&O trading workflows",
      "Collaborated with financial specialists on trading signal visualization",
    ],
  },
  {
    company: "Tech Elecon",
    role: "Full-Stack Developer",
    location: "Anand",
    period: "Jul 2023 – Dec 2023",
    points: [
      "Built Admin portal using React.js, Express.js, and Node.js with role-based routing",
      "Designed scalable MongoDB database for grievances, products, and employee tasks",
    ],
  },
];

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 px-4 relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-mono text-primary text-sm tracking-widest uppercase mb-2">Experience</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">
            Where I've <span className="gradient-text">worked</span>
          </h3>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/30 to-transparent" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * i }}
                className="relative pl-8 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-8 top-2 w-2.5 h-2.5 rounded-full bg-primary -translate-x-1 animate-pulse-glow" />

                <div className="glass rounded-xl p-6 hover:border-primary/30 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground">{exp.company}</h4>
                      <p className="text-primary text-sm font-mono">{exp.role}</p>
                    </div>
                    <div className="text-right mt-1 sm:mt-0">
                      <p className="text-xs text-muted-foreground font-mono">{exp.period}</p>
                      <p className="text-xs text-muted-foreground">{exp.location}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {exp.points.map((point, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-primary mt-1 shrink-0">▹</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
