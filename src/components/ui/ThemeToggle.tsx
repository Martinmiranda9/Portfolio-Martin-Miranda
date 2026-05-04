'use client'

// Floating top-right theme toggle.
// Uses the View Transitions API (`document.startViewTransition`) so the swap
// runs through the diamond clip-path keyframes defined in globals.css.

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const swap = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const onClick = () => {
    const doc = document as Document & { startViewTransition?: (cb: () => void) => void }
    if (doc.startViewTransition) {
      doc.startViewTransition(swap)
    } else {
      swap()
    }
  }

  if (!mounted) return null
  
  const isDark = theme === 'dark'

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="fixed top-6 right-6 z-40 w-11 h-11 flex items-center justify-center rounded-full
                 bg-background-soft/80 backdrop-blur-md
                 border border-border
                 shadow-sm hover:shadow-md transition-shadow
                 text-foreground"
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 90, scale: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute inline-flex"
          >
            <Moon size={18} className="fill-current" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 90, scale: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute inline-flex"
          >
            <Sun size={18} className="fill-current" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
