"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { siteConfig } from "@/lib/constants";

const FEATURED_SLUGS = [
  "vigil-24x7",
  "vivero-quilino",
  "ley-clara",
  "entity-management-system",
];

const SLUG_TO_KEY: Record<string, string> = {
  "vigil-24x7": "vigil",
  "ley-clara": "leyclara",
  "vivero-quilino": "vivero",
  "entity-management-system": "entitymgmt",
};

export function SelectedWork() {
  const t = useTranslations("projects");
  const tCommon = useTranslations("common");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const featured = FEATURED_SLUGS.map((slug) =>
    projects.find((p) => p.slug === slug),
  ).filter(Boolean) as typeof projects;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mb-16"
    >
      <h2 className="text-2xl font-display text-foreground mb-8 flex items-center gap-3">
        {t("title")}
        <div className="h-px flex-1 bg-border-soft" />
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featured.map((p, i) => {
          const media = p.caseStudy?.thumbnail || p.caseStudy?.screenshots?.[0];
          const key = SLUG_TO_KEY[p.slug || ""];
          return (
            <ProjectCard
              key={p.slug}
              index={i}
              slug={p.slug}
              title={key ? t(`items.${key}.title`) : p.title}
              description={key ? t(`items.${key}.description`) : p.description}
              tags={p.tags}
              githubUrl={p.link}
              imageUrl={media}
              videoUrl={p.caseStudy?.videoUrl}
              isDimmed={hoveredProject !== null && hoveredProject !== i}
              onHover={() => setHoveredProject(i)}
              onLeave={() => setHoveredProject(null)}
            />
          );
        })}
      </div>

      <div className="mt-12 flex justify-center">
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-6 py-2 rounded-full border border-border text-sm text-foreground-muted hover:bg-foreground/5 transition-colors active:scale-95"
        >
          {tCommon("viewAllProjects")}
          <ArrowUpRight
            size={14}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          />
        </a>
      </div>
    </motion.section>
  );
}
