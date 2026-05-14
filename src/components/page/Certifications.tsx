"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Award, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/utils";

type Certification = {
  id: string;
  name: string;
  institution: string;
  date: string;
  link?: string;
  logo?: string;
};

const CERTIFICATIONS: Certification[] = [
  {
    id: "claude-code",
    name: "Claude Code in Action",
    institution: "Anthropic",
    date: "Mar 2026",
    logo: "https://img.icons8.com/fluent/1200/claude.jpg",
  },
  {
    id: "qa-santex",
    name: "Quality Assurance (QA)",
    institution: "Santex",
    date: "Aug 2025",
    logo: "https://d6ndhdy3e79ef.cloudfront.net/images/organizations/320/santex.png",
  },
  {
    id: "prompt-eng",
    name: "Foundations of Prompt Engineering",
    institution: "Amazon Web Services (AWS)",
    date: "May 2025",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrX7yoCF0oIOFUDibu9uchgeyihc1pRCUOcQ&s",
  },
  {
    id: "n8n",
    name: "N8N Automation",
    institution: "Universidad Nacional de Córdoba",
    date: "Jan 2026",
    logo: "https://agro.unc.edu.ar/wp-content/uploads/2024/03/Logo-UNC-azul.png",
  },
  {
    id: "python-cisco",
    name: "Python Programming",
    institution: "Cisco Networking Academy",
    date: "Aug 2022",
    logo: "https://thumbs.dreamstime.com/b/cisco-logo-editorial-ilustrativo-sobre-fondo-blanco-icono-vectorial-logotipos-iconos-conjunto-redes-sociales-banner-plano-vectores-210442411.jpg",
  },
  {
    id: "gestion-comercial",
    name: "Business Management",
    institution: "Universidad Nacional de Córdoba",
    date: "",
    logo: "https://agro.unc.edu.ar/wp-content/uploads/2024/03/Logo-UNC-azul.png",
  },
  {
    id: "data-analytics",
    name: "Data Analytics",
    institution: "Coderhouse",
    date: "Jan 2021",
    logo: "https://derecho.uncuyo.edu.ar/cache/457c6385eeb7036851e1ebb12b10ab0b_732_1296.jpg",
  },
];

function CertRow({
  cert,
  index,
  t,
}: {
  cert: Certification;
  index: number;
  t: any;
}) {
  const initials = cert.institution.slice(0, 2).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative flex gap-4 md:gap-6 pb-8 last:pb-0"
    >
      {}
      <div className="shrink-0 w-12 flex justify-center pt-3 relative z-10">
        <div className="w-2.5 h-2.5 rounded-full bg-foreground/10 border-2 border-background ring-1 ring-foreground/10 group-hover:bg-accent group-hover:ring-accent/30 transition-all duration-500" />
      </div>

      {}
      <div className="flex-1 pt-1 min-w-0">
        <div className="flex items-center gap-3">
          {}
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg border border-border bg-background-soft flex items-center justify-center shadow-sm overflow-hidden group-hover:scale-105 transition-transform shrink-0">
            {cert.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={cert.logo}
                alt={`${cert.institution} logo`}
                className="w-full h-full object-contain p-1.5 opacity-90 group-hover:opacity-100"
              />
            ) : (
              <Award
                size={18}
                className="text-foreground-faint group-hover:text-accent transition-colors"
              />
            )}
          </div>
          {}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base md:text-lg font-bold text-foreground group-hover:text-accent transition-colors leading-tight pr-2">
                {t(`items.${cert.id}.name`)}
              </h3>
              {cert.date && (
                <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-medium text-foreground-faint bg-background-soft px-2 py-0.5 rounded-full w-fit shrink-0 mt-0.5">
                  <Calendar size={10} /> {t(`items.${cert.id}.date`)}
                </div>
              )}
            </div>
            <p className="text-xs md:text-sm font-medium text-foreground-muted mt-0.5 truncate">
              {t(`items.${cert.id}.institution`)}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Certifications() {
  const t = useTranslations("certifications");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="pb-32"
    >
      <SectionHeader title={t("title")} caption={t("caption")} />
      <div ref={containerRef} className={cn("relative mt-6")}>
        {}
        <div className="absolute left-[23px] top-4 bottom-0 w-[2px] bg-foreground/5 z-0" />
        {}
        <div className="absolute left-[23px] top-4 bottom-0 w-[2px] z-0 overflow-hidden">
          <motion.div
            className="w-full bg-accent origin-top"
            style={{ scaleY, height: "100%" }}
          />
        </div>

        <div className="relative">
          {CERTIFICATIONS.map((cert, index) => (
            <CertRow key={cert.id} cert={cert} index={index} t={t} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
