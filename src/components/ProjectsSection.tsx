import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Layers, Brain, Music, Users, Gamepad2 } from "lucide-react";

const projects = [
  {
    title: "Superb Diamonds",
    subtitle: "Full-Stack ML-Assisted Platform",
    icon: Layers,
    accentColor: "#22d3ee",
    description:
      "Built superbdiamonds.in using React.js + Node.js with inventory control, certificate checks, and broker workflows. Trained ElasticNet regression on 20 years of RapNet data for diamond price prediction.",
    tech: ["React.js", "Node.js", "AWS", "Flask", "ElasticNet", "CDN"],
    link: "https://superbdiamonds.in",
    github: "https://github.com/krishmm02/SuperbDiamonds",
  },
  {
    title: "MelodyMind",
    subtitle: "AI-Based Therapeutic System",
    icon: Music,
    accentColor: "#ff5e7a",
    description:
      "Transformer-based NLP models (BERT/GPT variants) generating therapeutic music from emotional embeddings. Biometric-to-musical parameter conversion for real-time therapeutic adjustments.",
    tech: ["Transformers", "Flask", "React.js", "NLP", "BERT", "PyTorch"],
    link: "https://melodymind-waves.vercel.app/",
    github: "https://github.com/krishmm02/MelodyMind",
  },
  {
    title: "VoyagR",
    subtitle: "Travel Companion App",
    icon: Users,
    accentColor: "#a78bfa",
    description:
      "Travel matching app using Gale-Shapley stable marriage algorithm to pair users by budget, destination, and preferences. Real-time chat with Socket.IO for collaborative trip planning.",
    tech: ["React", "Socket.IO", "Node.js", "Algorithms"],
    github: "https://github.com/krishmm02/VoyagR",
  },
  {
    title: "Star Wars Game",
    subtitle: "Interactive Web Game",
    icon: Gamepad2,
    accentColor: "#f59e0b",
    description:
      "Retro 2D Star Wars-themed browser game with classic arcade-style gameplay. Features a CPU opponent powered by AI logic, allowing solo play against the computer. Fully playable in the browser.",
    tech: ["JavaScript", "TypeScript", "HTML", "CSS", "Node.js"],
    link: "https://may-the-force-be-with-you.app.space/",
    github: "https://github.com/krishmm02/Star_Wars_Game",
  },
  {
    title: "Anode Lifecycle Classifier",
    subtitle: "Computer Vision in Mining",
    icon: Brain,
    accentColor: "#10b981",
    description:
      "CNN-based classifier achieving 92% accuracy for anode lifecycle stages. Automated data preprocessing, augmentation pipelines, and real-time monitoring dashboards.",
    tech: ["TensorFlow", "Keras", "Flask", "CNN", "Python"],
    github: "https://github.com/krishmm02/Anode-Lifecycle-Classifier",
  },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-28 px-4 relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary/80 mb-3">Projects</p>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.05] mb-12">
            Things I've <em className="gradient-text not-italic">built</em>.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="glass rounded-2xl p-6 hover:border-primary/30 transition-all duration-500 group"
              style={{ boxShadow: `0 4px 30px ${project.accentColor}12` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="p-2.5 rounded-xl border"
                  style={{
                    backgroundColor: `${project.accentColor}14`,
                    borderColor: `${project.accentColor}30`,
                  }}
                >
                  <project.icon size={20} style={{ color: project.accentColor }} />
                </div>
                <div className="flex items-center gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>

              <h4 className="font-display text-xl text-foreground mb-1">{project.title}</h4>
              <p className="font-mono text-xs mb-3" style={{ color: project.accentColor }}>{project.subtitle}</p>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-2.5 py-1 rounded-md border"
                    style={{
                      color: `${project.accentColor}cc`,
                      backgroundColor: `${project.accentColor}0a`,
                      borderColor: `${project.accentColor}25`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
