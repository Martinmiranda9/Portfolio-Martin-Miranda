'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { SectionHeader } from './SectionHeader'
import { WorkTimeline, type TimelineItem } from '@/components/ui/WorkTimeline'

type EducationEntry = {
  institution: string
  degree: string
  date: string
  location: string
  logo: string | null
  description: string
  bullets: string[]
  tags?: string[]
  link?: string
}

const EDUCATION: EducationEntry[] = [
  {
    institution: 'Quality ISAD',
    degree: 'Software Development Analyst',
    date: '2023 - 2025',
    location: 'Córdoba, Argentina',
    logo: '/images/quality-isad-logo.jpg',
    description: '', // Handled via translation
    bullets: [], // Handled via translation
    tags: [
      'Software Architecture',
      'Full Stack Development',
      'Database Design',
      'Systems Analysis',
      'Agile Methodologies',
      'Clean Code'
    ],
  },
]

export function Education() {
  const t = useTranslations('education')
  const items: TimelineItem[] = EDUCATION.map((e, i) => ({
    id: `${e.institution}-${i}`,
    date: e.date,
    title: t('quality.degree'),
    subtitle: e.institution,
    logo: e.logo,
    description: t('quality.description'),
    bullets: [
      t('quality.bullets.0'),
      t('quality.bullets.1'),
      t('quality.bullets.2'),
    ],
    tags: e.tags,
    link: e.link,
  }))

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="pt-12 pb-32"
    >
      <SectionHeader title={t('title')} caption={t('caption')} />
      <div className="mt-6">
        <WorkTimeline items={items} />
      </div>
    </motion.section>
  )
}
