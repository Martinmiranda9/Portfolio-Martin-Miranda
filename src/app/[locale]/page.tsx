import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import DynamicNavigation from "@/components/nav/DynamicNavigation";
import { Timeline } from "@/components/nav/Timeline";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { Hero } from "@/components/page/Hero";
import { Experience } from "@/components/page/Experience";
import { TechStack } from "@/components/page/TechStack";
import { SelectedWork } from "@/components/page/SelectedWork";
import { Education } from "@/components/page/Education";
import { Certifications } from "@/components/page/Certifications";
import { ContactNow } from "@/components/page/ContactNow";
import { Preloader } from "@/components/page/Preloader";

export default function Page() {
  return (
    <>
      <Preloader />
      <AmbientBackground />
      <DynamicNavigation />
      <Timeline />
      <ThemeToggle />
      <LanguageToggle />
      <CommandPalette />

      <main
        id="top"
        className="relative max-w-4xl mx-auto px-6 pt-24 md:pt-40 pb-6 z-10"
      >
        {}
        <Hero />

        {}
        <div id="work" className="scroll-mt-32">
          <Experience />
        </div>

        {}
        <div id="skills" className="scroll-mt-32">
          <TechStack />
        </div>

        {}
        <div id="projects" className="scroll-mt-32">
          <SelectedWork />
        </div>

        {}
        <div id="education" className="scroll-mt-32">
          <Education />
        </div>

        {}
        <Certifications />

        {}
        <ContactNow />
      </main>
    </>
  );
}
