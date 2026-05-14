"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const GREETINGS = ["Hello", "Hola"];

const SESSION_KEY = "preloader-shown";

export function Preloader() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") return;
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    if (index >= GREETINGS.length - 1) {
      const t = setTimeout(() => setVisible(false), 450);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setIndex((i) => i + 1), index === 0 ? 420 : 220);
    return () => clearTimeout(t);
  }, [index, visible]);

  useEffect(() => {
    if (!visible) return;
    const cap = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(cap);
  }, [visible]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{
            y: "-100vh",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 },
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background text-foreground overflow-visible cursor-wait"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={GREETINGS[index]}
              initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(8px)" }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "font-display italic text-4xl md:text-7xl tracking-tight text-foreground",
              )}
            >
              {GREETINGS[index]}
            </motion.span>
          </AnimatePresence>

          {}
          <svg
            className="absolute top-full w-full h-[20vh] fill-background pointer-events-none"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <path
              d="M0 0 Q50 100 100 0 L100 0 L0 0"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
