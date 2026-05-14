"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export function LanguageToggle() {
  const [mounted, setMounted] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const newLocale = locale === "es" ? "en" : "es";

    let newPathname: string;
    if (pathname.startsWith(`/${locale}`)) {
      newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    } else if (locale === "es") {
      newPathname = `/en${pathname}`;
    } else {
      newPathname = `/${newLocale}${pathname}`;
    }

    router.replace(newPathname, { scroll: false });
  };

  if (!mounted) return null;

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={locale === "es" ? "Switch to English" : "Cambiar a español"}
      className="fixed top-6 right-20 z-40 w-11 h-11 flex items-center justify-center rounded-full
                 bg-background-soft/80 backdrop-blur-md
                 border border-border
                 shadow-sm hover:shadow-md transition-shadow
                 text-foreground font-bold text-sm"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={locale}
          initial={{ rotate: -90, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          exit={{ rotate: 90, scale: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute inline-flex"
        >
          {locale === "es" ? "ES" : "EN"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
