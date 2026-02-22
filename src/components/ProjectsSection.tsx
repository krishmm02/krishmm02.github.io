import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Layers, Brain, Music, Users } from "lucide-react";

const projects = [
  {
    title: "Superb Diamonds",
    subtitle: "Full-Stack ML-Assisted Platform",
    icon: Layers,
    description:
      "Built superbdiamonds.in using React.js + Node.js with inventory control, certificate checks, and broker workflows. Trained ElasticNet regression on 20 years of RapNet data for diamond price prediction.",
    tech: ["React.js", "Node.js", "AWS", "Flask", "ElasticNet", "CDN"],
    link: "https://superbdiamonds.in",
    github: "https://github.com/Krish020902/SuperbDiamonds",
  },
  {
    title: "MelodyMind",
    subtitle: "AI-Based Therapeutic System",
    icon: Music,
    description:
      "Transformer-based NLP models (BERT/GPT variants) generating therapeutic music from emotional embeddings. Biometric-to-musical parameter conversion for real-time therapeutic adjustments.",
    tech: ["Transformers", "Flask", "React.js", "NLP", "BERT", "PyTorch"],
    github: "https://github.com/Krish020902/MelodyMind",
  },
  {
    title: "VoyagR",
    subtitle: "Travel Companion App",
    icon: Users,
    description:
      "Travel matching app using Gale-Shapley stable marriage algorithm to pair users by budget, destination, and preferences. Real-time chat with Socket.IO for collaborative trip planning.",
    tech: ["React", "Socket.IO", "Node.js", "Algorithms"],
    github: "https://github.com/Krish020902/VoyagR",
  },
  {
    title: "Anode Lifecycle Classifier",
    subtitle: "Computer Vision in Mining",
    icon: Brain,
    description:
      "CNN-based classifier achieving 92% accuracy for anode lifecycle stages. Automated data preprocessing, augmentation pipelines, and real-time monitoring dashboards.",
    tech: ["TensorFlow", "Keras", "Flask", "CNN", "Python"],
    github: "https://github.com/Krish020902/Anode-Lifecycle-Classifier",
  },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 px-4 relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-mono text-primary text-sm tracking-widest uppercase mb-2">Projects</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">
            Things I've <span className="gradient-text">built</span>
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="glass rounded-xl p-6 hover:border-primary/30 hover:card-glow transition-all duration-500 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
                  <project.icon className="text-primary" size={20} />
                </div>
                <div className="flex items-center gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>

              <h4 className="text-lg font-semibold text-foreground mb-1">{project.title}</h4>
              <p className="font-mono text-xs text-primary/80 mb-3">{project.subtitle}</p>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono text-primary/70 bg-primary/5 border border-primary/10 px-2 py-1 rounded"
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
