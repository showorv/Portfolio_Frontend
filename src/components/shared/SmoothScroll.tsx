"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import Lenis from "lenis";
import { ArrowUp } from "lucide-react";
import "lenis/dist/lenis.css";

/**
 * Public-site scroll behaviour: eased wheel scrolling, smooth jumps to
 * #sections, a reading progress bar and a back-to-top button.
 * Visitors who ask for reduced motion get native scrolling and no transforms.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  const [showTop, setShowTop] = useState(false);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({
      autoRaf: true,
      duration: 1.1,
      // lands below the fixed navbar via scroll-padding-top in globals.css
      anchors: true,
    });
    setLenis(instance);

    return () => {
      instance.destroy();
      setLenis(null);
    };
  }, []);

  useEffect(() => scrollY.on("change", (y) => setShowTop(y > 600)), [scrollY]);

  const toTop = () => (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" }));

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-primary"
      />

      {children}

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.92 }}
            onClick={toTop}
            aria-label="Back to top"
            className="fixed bottom-5 right-5 z-40 grid size-11 cursor-pointer place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30"
          >
            <ArrowUp className="size-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
