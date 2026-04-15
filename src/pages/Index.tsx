import { Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
const Scene3D = lazy(() => import("@/components/Scene3D"));
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import EducationSection from "@/components/EducationSection";
import ExtracurricularSection from "@/components/ExtracurricularSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden scroll-smooth">
      <Navbar />

      {/* 3D Background - fixed behind hero */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      </div>

      {/* Content overlay */}
      <div className="relative z-10">
        <HeroSection />

        {/* Gradient fade from transparent to solid background */}
        <div className="relative">
          <div className="absolute inset-x-0 -top-32 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />
          <div className="bg-background">
            <AboutSection />
            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
            <EducationSection />
            <ExtracurricularSection />
            <ContactSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
