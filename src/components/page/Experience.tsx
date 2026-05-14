"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeader } from "./SectionHeader";
import { WorkTimeline, type TimelineItem } from "@/components/ui/WorkTimeline";

export function Experience() {
  const t = useTranslations("experience");

  const items: TimelineItem[] = [
    {
      id: "freelance",
      date: t("entries.freelance.date"),
      title: "Freelance",
      subtitle: t("entries.freelance.role"),
      location: "Córdoba, AR",
      logo: null,
      description: t("entries.freelance.description"),
      bullets: [
        t("entries.freelance.bullets.0"),
        t("entries.freelance.bullets.1"),
        t("entries.freelance.bullets.2"),
        t("entries.freelance.bullets.3"),
      ],
    },
    {
      id: "encodelabs",
      date: t("entries.encodelabs.date"),
      title: "Encodelabs",
      subtitle: t("entries.encodelabs.role"),
      location: "Córdoba, AR",
      logo: null,
      description: t("entries.encodelabs.description"),
      bullets: [
        t("entries.encodelabs.bullets.0"),
        t("entries.encodelabs.bullets.1"),
        t("entries.encodelabs.bullets.2"),
        t("entries.encodelabs.bullets.3"),
      ],
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="py-12"
    >
      <SectionHeader title={t("title")} caption={t("caption")} />
      <div className="mt-6">
        <WorkTimeline items={items} />
      </div>
    </motion.section>
  );
}
