import { motion } from "framer-motion";
import { activities } from "@/data/content";
import Folder from "@/components/shell/Folder";

export default function Service() {
  return (
    <Folder
      id="service"
      index={5}
      numeral="VI"
      label="Service"
      code="ps aux | grep krish"
      title={<>Leadership, competition <em className="text-sanguine">and community.</em></>}
    >
      <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
        {activities.map((a, i) => (
          <motion.article
            key={a.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: (i % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="border-t-[1.5px] border-[var(--ink)] pt-5"
          >
            <div className="flex items-baseline justify-between gap-4">
              <p className="eyebrow">{a.period}</p>

            </div>
            <h3 className="mt-2 font-display text-[28px] font-semibold leading-tight text-ink">{a.role}</h3>
            <p className="mt-1 text-[14.5px] font-semibold text-sanguine">
              {a.link ? (
                <a href={a.link} target="_blank" rel="noopener noreferrer" className="hover:underline hover:underline-offset-4">
                  {a.org} ↗
                </a>
              ) : (
                a.org
              )}
            </p>
            <ul className="mt-3 space-y-2">
              {a.points.map((p) => (
                <li key={p} className="flex gap-3 text-[15.5px] leading-relaxed text-ink-2">
                  <span className="mt-[10px] h-[5px] w-[5px] shrink-0 rotate-45 bg-[var(--ochre)]" />
                  {p}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </Folder>
  );
}
