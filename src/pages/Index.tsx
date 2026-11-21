import { useEffect, useState } from "react";
import { sections } from "@/data/content";
import TopBar from "@/components/shell/TopBar";
import CommandPalette from "@/components/shell/CommandPalette";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Fit from "@/components/sections/Fit";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Service from "@/components/sections/Service";
import Contact from "@/components/sections/Contact";

const Index = () => {
  const [palette, setPalette] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen">
      <TopBar active={active} onPalette={() => setPalette(true)} />
      <main className="pb-24">
        <Hero />
        <About />
        <Fit />
        <Experience />
        <Projects />
        <Education />
        <Service />
        <Contact />
      </main>
      <CommandPalette open={palette} onClose={() => setPalette(false)} />
    </div>
  );
};

export default Index;
