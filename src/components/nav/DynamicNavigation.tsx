"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type RefObject,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn, triggerHaptic } from "@/lib/utils";
import { NumberTicker } from "@/components/ui/NumberTicker";
import StellarBuddy from "@/components/nav/StellarBuddy";

type Section = { id: string; title: string };

type DynamicNavigationProps = {
  triggerRef?: RefObject<HTMLElement | null>;
  toggleTheme?: () => void;
  isDark?: boolean;
  sections?: Section[];
  activeSectionId?: string | null;
  onSectionClick?: (id: string) => void;
  onNavigate?: (view: string) => void;
  currentView?: string;
  enableIsland?: boolean;
  shouldHideDock?: boolean;
};

const DEFAULT_SECTIONS: Section[] = [
  { id: "about", title: "navigation.about" },
  { id: "work", title: "navigation.work" },
  { id: "skills", title: "navigation.skills" },
  { id: "projects", title: "navigation.projects" },
  { id: "education", title: "navigation.education" },
  { id: "contact", title: "navigation.contact" },
];

const SCROLL_THRESHOLD_FALLBACK = 300;

const SPRING_TRANSITION = {
  type: "spring" as const,
  stiffness: 500,
  damping: 22,
  mass: 0.6,
};

function defaultToggleTheme() {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const apply = () => {
    const isDark = root.classList.contains("dark");
    if (isDark) {
      root.classList.remove("dark");
      try {
        localStorage.setItem("theme", "light");
      } catch {}
    } else {
      root.classList.add("dark");
      try {
        localStorage.setItem("theme", "dark");
      } catch {}
    }
  };

  const docWithVT = document as Document & {
    startViewTransition?: (cb: () => void) => unknown;
  };
  if (typeof docWithVT.startViewTransition === "function") {
    docWithVT.startViewTransition(apply);
  } else {
    apply();
  }
}

function defaultScrollToSection(id: string) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;

  const prev = el.style.scrollMarginTop;
  el.style.scrollMarginTop = "120px";
  el.scrollIntoView({ behavior: "smooth", block: "start" });

  window.setTimeout(() => {
    el.style.scrollMarginTop = prev;
  }, 800);
}

export default function DynamicNavigation({
  triggerRef,
  toggleTheme,
  isDark: isDarkProp,
  sections,
  activeSectionId: activeSectionIdProp,
  onSectionClick,
  onNavigate,
  enableIsland = true,
  shouldHideDock = false,
}: DynamicNavigationProps = {}) {
  const t = useTranslations();
  const resolvedSections = useMemo<Section[]>(
    () => (sections && sections.length > 0 ? sections : DEFAULT_SECTIONS),
    [sections],
  );

  const handleToggleTheme = useMemo(
    () => toggleTheme ?? defaultToggleTheme,
    [toggleTheme],
  );
  const handleSectionClickProp = useMemo(
    () => onSectionClick ?? defaultScrollToSection,
    [onSectionClick],
  );
  const handleNavigateProp = useMemo(
    () => onNavigate ?? (() => {}),
    [onNavigate],
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isIslandExpanded, setIsIslandExpanded] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [internalIsDark, setInternalIsDark] = useState(false);
  const [internalActiveId, setInternalActiveId] = useState<string | null>(null);

  const isDark = isDarkProp ?? internalIsDark;
  const activeSectionId = activeSectionIdProp ?? internalActiveId;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isDarkProp !== undefined) return;
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const sync = () => setInternalIsDark(root.classList.contains("dark"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [isDarkProp]);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgressValue(Math.round(latest * 100));
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!enableIsland) {
        if (isScrolled) setIsScrolled(false);
        return;
      }
      let shouldBeScrolled = false;
      const refEl = triggerRef?.current;
      if (refEl) {
        const rect = refEl.getBoundingClientRect();
        const triggerBottomAbsolute = rect.bottom + window.scrollY;
        shouldBeScrolled = window.scrollY > triggerBottomAbsolute - 100;
      } else {
        shouldBeScrolled = window.scrollY > SCROLL_THRESHOLD_FALLBACK;
      }
      if (shouldBeScrolled !== isScrolled) {
        setIsScrolled(shouldBeScrolled);
        triggerHaptic(5);
        if (!shouldBeScrolled) setIsIslandExpanded(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [triggerRef, isScrolled, enableIsland]);

  useEffect(() => {
    if (activeSectionIdProp !== undefined && activeSectionIdProp !== null)
      return;
    if (typeof window === "undefined") return;

    const SCROLL_LINE = 140;
    let raf = 0;

    const update = () => {
      raf = 0;
      let bestId: string | null = null;
      let bestDelta = Number.POSITIVE_INFINITY;

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom && resolvedSections.length > 0) {
        const last = resolvedSections[resolvedSections.length - 1].id;
        setInternalActiveId((prev) => (prev === last ? prev : last));
        return;
      }

      for (const s of resolvedSections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= SCROLL_LINE) {
          const delta = SCROLL_LINE - top;
          if (delta < bestDelta) {
            bestDelta = delta;
            bestId = s.id;
          }
        }
      }

      if (bestId === null && resolvedSections.length > 0) {
        bestId = resolvedSections[0].id;
      }
      if (bestId !== null) {
        setInternalActiveId((prev) => (prev === bestId ? prev : bestId));
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [resolvedSections, activeSectionIdProp]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setIsIslandExpanded(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isIslandMode = isScrolled && enableIsland && !isOpen && !shouldHideDock;

  const handleNavClick = useCallback(
    (sectionId: string) => {
      triggerHaptic(15);
      handleSectionClickProp(sectionId);
      handleNavigateProp(sectionId);
      setIsOpen(false);
    },
    [handleSectionClickProp, handleNavigateProp],
  );

  const handleToggle = useCallback(() => {
    triggerHaptic(10);
    if (isIslandMode) {
      setIsIslandExpanded((v) => !v);
    } else {
      setIsOpen((v) => !v);
    }
  }, [isIslandMode]);

  const getOpenWidth = (): number | string => (isMobile ? "90vw" : 540);
  const getClosedWidth = () => (isMobile ? 200 : 290);
  const getIslandWidth = () => {
    if (isMobile) return isIslandExpanded ? 300 : 220;
    return isIslandExpanded ? 305 : 235;
  };
  const getTriggerHeight = (): number | string => {
    if (isIslandMode) return isIslandExpanded ? "auto" : 43;
    return isMobile ? 48 : 58;
  };

  const animatedWidth = isOpen
    ? getOpenWidth()
    : isIslandMode
      ? getIslandWidth()
      : getClosedWidth();

  return (
    <>
      {}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={() => setIsOpen(false)}
      />

      <div className="fixed top-7 left-0 w-full z-50 flex flex-col items-center pointer-events-none">
        {}
        <div className="pointer-events-auto z-50">
          <motion.button
            type="button"
            layout
            onClick={handleToggle}
            aria-expanded={isOpen || isIslandExpanded}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            transition={SPRING_TRANSITION}
            className={cn(
              "relative flex items-center overflow-hidden border transition-colors duration-300",
              "shadow-[0_8px_32px_rgba(0,0,0,0.35)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.55)]",

              "bg-background-soft border-border",
              "hover:bg-background-soft/80",
              isIslandMode ? "rounded-[29px]" : "rounded-[14px]",
            )}
            style={{ height: getTriggerHeight() }}
            animate={{ width: animatedWidth }}
          >
            <AnimatePresence mode="popLayout">
              {isIslandMode ? (
                <motion.div
                  key="island-content"
                  initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col w-full px-1"
                >
                  <div className="flex items-center justify-between w-full pl-2 pr-2 h-[43px]">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span
                        className={cn(
                          "text-[12px] font-medium truncate max-w-[100px] md:max-w-[130px]",
                          "text-foreground",
                        )}
                      >
                        {t(
                          resolvedSections.find((s) => s.id === activeSectionId)
                            ?.title ?? "Contents",
                        )}
                      </span>
                      <ChevronDown
                        size={13}
                        className={cn(
                          "text-foreground/50 transition-transform",
                          isIslandExpanded && "rotate-180",
                        )}
                      />
                    </div>

                    <div className="flex items-center gap-3 pl-2">
                      <div className="text-[10px] font-medium text-foreground tabular-nums font-mono">
                        <NumberTicker value={progressValue} />
                      </div>
                      <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                        <svg
                          className="w-full h-full -rotate-90"
                          viewBox="0 0 36 36"
                        >
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="5"
                            className="text-foreground/15"
                          />
                          <motion.path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="5"
                            className="text-foreground"
                            style={{ pathLength: smoothProgress }}
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {}
                  {isIslandExpanded && resolvedSections.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden w-full pb-2 px-1"
                    >
                      <div className="h-[1px] w-full bg-foreground/10 mb-2" />
                      <div className="flex flex-col gap-0.5 max-h-[180px] overflow-y-auto">
                        {resolvedSections.map((section) => (
                          <button
                            key={section.id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              triggerHaptic(10);
                              handleSectionClickProp(section.id);
                              setIsIslandExpanded(false);
                            }}
                            className={cn(
                              "flex items-center justify-between px-3 py-1.5 rounded-lg text-[12px] transition-colors text-left",
                              activeSectionId === section.id
                                ? "bg-foreground/10 text-foreground font-medium"
                                : "text-foreground/60 hover:bg-foreground/5",
                            )}
                          >
                            <span className="truncate">{t(section.title)}</span>
                            {activeSectionId === section.id && (
                              <Check
                                size={11}
                                className="opacity-60 shrink-0 ml-2"
                              />
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="menu-trigger"
                  initial={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "flex items-center justify-between w-full h-full",
                    isMobile ? "px-4" : "px-6",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <StellarBuddy size={isMobile ? 26 : 32} />
                  </div>

                  <div className="flex items-center gap-3">
                    <Flipper isOpen={isOpen} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {}
        <div className="flex flex-col items-center gap-2 mt-2 w-full">
          <motion.div
            initial={false}
            animate={
              isOpen
                ? {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    height: 360,
                    width:
                      typeof getOpenWidth() === "number"
                        ? (getOpenWidth() as number)
                        : undefined,
                    pointerEvents: "auto",
                  }
                : {
                    opacity: 0,
                    y: -20,
                    scale: 0.95,
                    height: 0,
                    width: isMobile ? 200 : 250,
                    pointerEvents: "none",
                  }
            }
            style={isOpen && isMobile ? { width: "90vw" } : undefined}
            transition={SPRING_TRANSITION}
            className={cn(
              "relative overflow-hidden flex flex-col items-center origin-top",
              "bg-background-soft border border-border",
              "rounded-[18px] shadow-2xl",
            )}
          >
            <div className="w-full h-full py-6 px-5 flex flex-col items-center justify-center">
              {resolvedSections.map((section, idx) => (
                <motion.button
                  key={section.id}
                  type="button"
                  onClick={() => handleNavClick(section.id)}
                  initial={false}
                  animate={
                    isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                  }
                  transition={{
                    duration: 0.35,
                    delay: isOpen ? idx * 0.05 : 0,
                    ease: [0.32, 0.725, 0, 1],
                  }}
                  className={cn(
                    "group relative flex items-center justify-center w-full py-0.5",
                    "font-display font-bold tracking-tighter uppercase",
                    "text-[1.5rem] md:text-[2.4rem]",
                    "text-foreground hover:text-foreground/50",
                    "transition-colors duration-300",
                  )}
                >
                  {t(section.title)}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {}
      <span
        className="hidden"
        aria-hidden
        data-isdark={String(isDark)}
        onClick={handleToggleTheme}
      />
    </>
  );
}

function Flipper({ isOpen }: { isOpen: boolean }) {
  const t = useTranslations();
  return (
    <div className="relative h-3.5 w-11 overflow-hidden flex flex-col items-end">
      <div
        className={cn(
          "flex flex-col items-end gap-1 transition-transform duration-500 ease-[cubic-bezier(0.32,0.725,0,1)]",
          isOpen ? "-translate-y-[18px]" : "translate-y-0",
        )}
      >
        <span className="text-[10px] font-bold tracking-widest text-foreground/90 h-[14px] flex items-center">
          {t("navigation.menu")}
        </span>
        <span className="text-[10px] font-bold tracking-widest text-foreground/90 h-[14px] flex items-center">
          {t("navigation.close")}
        </span>
      </div>
    </div>
  );
}
