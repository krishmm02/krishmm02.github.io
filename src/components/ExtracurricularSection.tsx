import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, BookOpen, Users, Globe } from "lucide-react";

const activities = [
  {
    role: "Senator – College of Engineering & Information Technology",
    org: "University of Maryland, Baltimore County",
    period: "Incoming · Academic Year 2025–2026",
    icon: Award,
    tag: "Leadership",
    tagColor: "#f59e0b",
    points: [
      "Elected as COEIT Senator to represent engineering and IT students in the Student Government Association.",
      "Will advocate for student interests, departmental funding, and academic policy at the institutional level.",
    ],
  },
  {
    role: "Math Tutor",
    org: "Reach Together Tutoring Program (RTTP) · UMBC",
    period: "2025 – Present",
    icon: BookOpen,
    tag: "Tutoring",
    tagColor: "#22d3ee",
    points: [
      "Provide one-on-one and small-group math tutoring to undergrad students through the RTTP program at UMBC.",
      "Help students build strong foundations in calculus, discrete mathematics, and linear algebra.",
    ],
  },
  {
    role: "Peer Mentor",
    org: "Birla Vishvakarma Mahavidyalaya",
    period: "March 2025",
    icon: Users,
    tag: "Mentorship",
    tagColor: "#a78bfa",
    points: [
      "Provided academic and personal support to second-year students, helping them navigate challenging courses like Data Structures and Algorithms.",
      "Fostered a positive learning environment by breaking down complex problems and building student confidence.",
      "Guided students in competitive programming strategies, with 20% of mentees reaching Master level on Codeforces.",
    ],
  },
  {
    role: "Head Web Developer",
    org: "The Robotic Society (TRS) · BVM Engineering College",
    period: "2021 – 2022",
    icon: Globe,
    tag: "Leadership",
    tagColor: "#10b981",
    link: "https://www.bvmengineering.ac.in/TRS/2021-2022/webdevloper.html",
    points: [
      "Led web development for TRS, overseeing the society's digital presence and managing the full membership and event data pipeline.",
      "Architected and maintained the society's recruitment portal, streamlining candidate intake and selection workflows.",
      "Owned all website updates, feature additions, and incident response — ensuring zero downtime during high-traffic events.",
    ],
  },
];

export default function ExtracurricularSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="extracurricular" className="py-28 px-4 relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary/80 mb-3">Beyond the Code</p>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.05] mb-12">
            Leadership &{" "}
            <em className="gradient-text not-italic">Community.</em>
          </h2>
        </motion.div>

        <div className="space-y-5">
          {activities.map((act, i) => (
            <motion.div
              key={act.role}
              initial={{ opacity: 0, x: -24 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.12 * i }}
              className="glass rounded-2xl p-6 hover:border-primary/25 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div className="flex items-start gap-4">
                  <div
                    className="p-2.5 rounded-xl border shrink-0"
                    style={{
                      backgroundColor: `${act.tagColor}14`,
                      borderColor: `${act.tagColor}30`,
                    }}
                  >
                    <act.icon size={20} style={{ color: act.tagColor }} />
                  </div>
                  <div>
                    <h4 className="font-display text-xl text-foreground leading-tight">{act.role}</h4>
                    <p className="text-primary text-sm font-mono mt-0.5">
                      {act.link ? (
                        <a href={act.link} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-2">
                          {act.org}
                        </a>
                      ) : (
                        act.org
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
                  <span className="text-xs text-muted-foreground font-mono">{act.period}</span>
                  <span
                    className="text-xs font-mono px-2.5 py-0.5 rounded-full border"
                    style={{
                      color: act.tagColor,
                      backgroundColor: `${act.tagColor}14`,
                      borderColor: `${act.tagColor}30`,
                    }}
                  >
                    {act.tag}
                  </span>
                </div>
              </div>

              <ul className="space-y-2">
                {act.points.map((point, j) => (
                  <li key={j} className="text-base text-muted-foreground flex gap-2">
                    <span className="text-primary mt-1 shrink-0">▹</span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
