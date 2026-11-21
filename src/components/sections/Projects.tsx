import { useRef } from "react";
import { motion } from "framer-motion";
import { projects, type Project } from "@/data/content";
import Folder from "@/components/shell/Folder";
import ProjectArt from "@/components/art/ProjectArt";

function Frame({ p, featured }: { p: Project; featured?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-4px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = ""; };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="rounded-[3px] bg-[#2b2119] p-[7px] shadow-[0_28px_45px_-28px_rgba(40,25,10,.8)] transition-transform duration-300 ease-out will-change-transform"
    >
      <div className="bg-[var(--vellum)] p-3 sm:p-4">
        <div className={`overflow-hidden shadow-[inset_0_0_0_1px_rgba(0,0,0,.08)] ${featured ? "aspect-[4/3]" : "aspect-[4/3]"}`}>
          <ProjectArt id={p.id} className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}

function Placard({ p, big }: { p: Project; big?: boolean }) {
  return (
    <div>
      <p className="font-mono text-[11px] text-muted-ink">{p.file}</p>
      <h3 className={`mt-1 font-display font-semibold leading-tight text-ink ${big ? "text-[40px]" : "text-[30px]"}`}>{p.title}</h3>
      <p className="mt-0.5 font-display text-lg italic text-sanguine">{p.subtitle}</p>
      <p className="mt-3 text-[15.5px] leading-relaxed text-ink-2">{p.description}</p>
      <p className="mt-4 text-[13.5px] text-ink-2">
        <span className="eyebrow mr-2">Medium</span>
        {p.tech.join(", ")}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
        {p.link && (
          <a href={p.link} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[var(--ink)] px-4 py-2 text-[13.5px] font-semibold text-[var(--vellum)] transition hover:bg-[var(--sanguine)]">
            Visit the live site ↗
          </a>
        )}
        {p.github && (
          <a href={p.github} target="_blank" rel="noopener noreferrer" className="ink-link text-[14px] font-semibold">
            Read the source
          </a>
        )}
        {p.metric && <span className="font-hand text-[21px] text-verdigris">{p.metric}</span>}
      </div>
    </div>
  );
}

export default function Projects() {
  const [first, ...rest] = projects;
  return (
    <Folder
      id="projects"
      index={3}
      numeral="IV"
      label="Works"
      code="ls ./projects"
      title={<>The gallery. <em className="text-sanguine">Six things I've built.</em></>}
      intro="Each one comes with a live link or its source code. The pictures are generated from what each project does."
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 items-center gap-8 border-b border-rule-2 pb-14 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:gap-12"
      >
        <Frame p={first} featured />
        <Placard p={first} big />
      </motion.div>

      <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
        {rest.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: (i % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={i % 2 === 1 ? "md:mt-16" : ""}
          >
            <Frame p={p} />
            <div className="mt-6">
              <Placard p={p} />
            </div>
          </motion.article>
        ))}
      </div>
    </Folder>
  );
}
