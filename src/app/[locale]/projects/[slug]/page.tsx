'use client'

import { useParams } from 'next/navigation'
import { useTranslations, useMessages } from 'next-intl'
import { motion } from 'framer-motion'
import { ArrowLeft, Github, ExternalLink, Trophy } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { projects } from '@/data/projects'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { LanguageToggle } from '@/components/ui/LanguageToggle'

// Map slugs to translation keys (same as SelectedWork)
const SLUG_TO_KEY: Record<string, string> = {
  'vigil-24x7': 'vigil',
  'bk-shoot': 'bkshoot',
  'deep-learning-cnn-comparison': 'cnn',
  'personal-web-portfolio': 'portfolio',
  'wikipedia-scraper': 'scraper',
  'university-library-system': 'library',
}

// Stagger animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
}

export default function ProjectPage() {
  const params = useParams()
  const slug = params.slug as string
  const t = useTranslations('projects')
  const tCase = useTranslations('caseStudy')
  const messages = useMessages() as any

  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display text-foreground mb-4">404</h1>
          <p className="text-foreground-muted mb-8">{tCase('notFound')}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-mono tracking-widest uppercase text-accent hover:text-foreground transition-colors"
          >
            <ArrowLeft size={14} />
            {tCase('backToHome')}
          </Link>
        </div>
      </div>
    )
  }

  const cs = project.caseStudy
  const translationKey = SLUG_TO_KEY[slug]
  
  const hasCaseStudyTranslation = translationKey && messages.projects?.items?.[translationKey]?.caseStudy
  
  const challengeText = hasCaseStudyTranslation ? t(`items.${translationKey}.caseStudy.challenge` as any) : cs?.challenge
  const approachText = hasCaseStudyTranslation ? t(`items.${translationKey}.caseStudy.approach` as any) : cs?.approach
  const featuresData = hasCaseStudyTranslation ? t.raw(`items.${translationKey}.caseStudy.features` as any) : cs?.features

  return (
    <>
      <ThemeToggle />
      <LanguageToggle />

      <main className="relative max-w-4xl mx-auto px-6 pt-16 md:pt-24 pb-24 z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ← ALL PROJECTS */}
          <motion.div variants={itemVariants}>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-foreground-muted hover:text-foreground transition-colors group mb-12 block"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              {tCase('allProjects')}
            </Link>
          </motion.div>

          {/* Tags */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-5 mt-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full border border-border-soft text-[11px] font-mono tracking-wide text-foreground-muted"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground tracking-tight leading-[1.1] mb-6"
          >
            {translationKey ? t(`items.${translationKey}.title` as any) : project.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-foreground-muted leading-relaxed max-w-2xl mb-8"
          >
            {translationKey ? t(`items.${translationKey}.description` as any) : project.description}
          </motion.p>

          {/* Code button */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-10">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm font-mono text-foreground hover:bg-foreground hover:text-background transition-all duration-300 active:scale-95"
            >
              <Github size={16} />
              {tCase('code')}
              <ExternalLink size={12} className="opacity-50" />
            </a>
          </motion.div>

          {/* Awards */}
          {cs?.awards && cs.awards.length > 0 && (
            <motion.div variants={itemVariants} className="flex flex-col gap-3 mb-12">
              {cs.awards.map((award, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl bg-background-soft border border-border-soft"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <Trophy size={18} className="text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{award.title}</p>
                    <p className="text-xs text-foreground-muted mt-0.5">{award.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Main screenshot / thumbnail */}
          {(cs?.thumbnail || cs?.screenshots?.[0]) && (
            <motion.div
              variants={itemVariants}
              className="relative w-full rounded-2xl overflow-hidden border border-border-soft mb-16"
            >
              {cs?.videoUrl ? (
                <video
                  src={cs.videoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={cs?.thumbnail || cs?.screenshots?.[0]}
                  alt={project.title}
                  className="w-full h-auto"
                />
              )}
            </motion.div>
          )}

          {/* CHALLENGE section */}
          {challengeText && (
            <motion.section variants={itemVariants} className="mb-14">
              <h2 className="text-[11px] font-mono tracking-[0.25em] uppercase text-foreground-faint mb-5">
                {tCase('challenge')}
              </h2>
              <p className="text-sm md:text-base text-foreground leading-relaxed max-w-2xl">
                {challengeText}
              </p>
            </motion.section>
          )}

          {/* APPROACH section */}
          {approachText && (
            <motion.section variants={itemVariants} className="mb-14">
              <h2 className="text-[11px] font-mono tracking-[0.25em] uppercase text-foreground-faint mb-5">
                {tCase('approach')}
              </h2>
              <p className="text-sm md:text-base text-foreground leading-relaxed max-w-2xl">
                {approachText}
              </p>
            </motion.section>
          )}

          {/* FEATURES grid */}
          {featuresData && featuresData.length > 0 && (
            <motion.section variants={itemVariants} className="mb-16">
              <h2 className="text-[11px] font-mono tracking-[0.25em] uppercase text-foreground-faint mb-6">
                {tCase('whatItDoes')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featuresData.map((feat: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="p-5 rounded-xl bg-background-soft border border-border-soft hover:border-border transition-colors duration-300"
                  >
                    <h3 className="text-sm font-semibold text-foreground mb-2">{feat.title}</h3>
                    <p className="text-xs text-foreground-muted leading-relaxed">{feat.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* TABLES */}
          {cs?.tables && cs.tables.length > 0 && (
            <motion.section variants={itemVariants} className="mb-16">
              {cs.tables.map((table, ti) => (
                <div key={ti} className="mb-10 last:mb-0">
                  <h2 className="text-[11px] font-mono tracking-[0.25em] uppercase text-foreground-faint mb-5">
                    {table.title}
                  </h2>
                  <div className="overflow-x-auto rounded-xl border border-border-soft">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-background-soft">
                          {table.headers.map((header, hi) => (
                            <th
                              key={hi}
                              className="px-4 py-3 text-left text-[11px] font-mono font-semibold tracking-wider uppercase text-foreground-faint border-b border-border-soft"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {table.rows.map((row, ri) => (
                          <tr
                            key={ri}
                            className="border-b border-border-soft last:border-b-0 hover:bg-background-soft/50 transition-colors"
                          >
                            {row.map((cell, ci) => (
                              <td
                                key={ci}
                                className="px-4 py-3 text-foreground-muted"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </motion.section>
          )}

          {/* GALLERY */}
          {cs?.screenshots && cs.screenshots.length > 0 && (
            <motion.section variants={itemVariants} className="mb-16">
              <h2 className="text-[11px] font-mono tracking-[0.25em] uppercase text-foreground-faint mb-6">
                {tCase('gallery')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cs.screenshots.map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="rounded-xl overflow-hidden border border-border-soft hover:border-border transition-colors duration-300 group cursor-pointer"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`${project.title} screenshot ${i + 1}`}
                      className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Report link */}
          {cs?.reportUrl && (
            <motion.div variants={itemVariants} className="mb-16">
              <a
                href={cs.reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm font-mono text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
              >
                {tCase('viewReport')}
                <ExternalLink size={12} className="opacity-50" />
              </a>
            </motion.div>
          )}

          {/* Back to projects */}
          <motion.div
            variants={itemVariants}
            className="pt-8 border-t border-border-soft flex justify-center"
          >
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-foreground-muted hover:text-foreground transition-colors group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              {tCase('backToProjects')}
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </>
  )
}
