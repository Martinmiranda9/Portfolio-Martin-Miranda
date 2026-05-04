'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { SectionHeader } from './SectionHeader'

export function AboutMe() {
  const t = useTranslations('aboutMe')

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="py-12 scroll-mt-32"
    >
      <SectionHeader title={t('title')} caption={t('caption')} />

      <div className="mt-6 space-y-4 max-w-prose text-[15px] leading-relaxed text-foreground-muted">
        <p>{t('p1')}</p>
        <p>{t('p2')}</p>
        <p>{t('p3')}</p>
      </div>
    </motion.section>
  )
}
