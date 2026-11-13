"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowDown, BadgeCheck, Download, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ISite } from "@/types/siteTypes";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function Hero({ hero, contact }: { hero: ISite["hero"]; contact: ISite["contact"] }) {
  const roles = hero.roles;
  const socials = [
    { label: "GitHub", href: contact.github, icon: Github },
    { label: "LinkedIn", href: contact.linkedin, icon: Linkedin },
  ].filter((social) => social.href);
  const [index, setIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // the hero drifts and fades as the page scrolls past it
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    if (roles.length < 2) return;
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % roles.length), 2200);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-dvh flex items-center justify-center bg-background overflow-hidden"
    >
      {/* backdrop: faint grid plus two slow drifting glows */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)] opacity-60"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -left-24 size-[420px] rounded-full bg-primary/20 blur-[110px]"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -50, 0], y: [0, -60, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-32 -right-24 size-[460px] rounded-full bg-primary/15 blur-[120px]"
      />

      <div className="relative max-w-[1200px] w-full mx-auto px-6 pt-28 pb-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            style={{ y: textY, opacity: fade }}
            className="flex-1 space-y-7 order-2 lg:order-1 text-center lg:text-left"
          >
            <motion.div
              variants={rise}
              className={hero.badge ? "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest" : "hidden"}
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              {hero.badge}
            </motion.div>

            <motion.h1 variants={rise} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              Hi, I&apos;m{" "}
              <span className="bg-primary bg-clip-text text-transparent">
                {hero.name}
              </span>
            </motion.h1>

            <motion.div variants={rise} className="h-8 lg:h-10 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={roles[index % roles.length]}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="text-xl lg:text-2xl font-bold text-primary"
                >
                  {roles[index % roles.length]}
                </motion.h2>
              </AnimatePresence>
            </motion.div>

            <motion.p
              variants={rise}
              className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed mx-auto lg:mx-0"
            >
              {hero.intro}
            </motion.p>

            <motion.div variants={rise} className="flex flex-wrap justify-center lg:justify-start items-center gap-4">
              {hero.resumeUrl && (
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <Button asChild size="lg" className="rounded-xl px-8 py-6 text-base font-bold shadow-xl shadow-primary/25">
                  <Link
                    href={hero.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download /> Download Resume
                  </Link>
                </Button>
              </motion.div>
              )}

              {socials.map(({ label, href, icon: Icon }) => (
                <motion.div key={label} whileHover={{ y: -3, rotate: -4 }} whileTap={{ scale: 0.92 }}>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="size-12 flex items-center justify-center rounded-xl bg-muted hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/30 transition-colors"
                  >
                    <Icon className="size-[22px]" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={rise} className="flex flex-wrap justify-center lg:justify-start items-center gap-3">
              {[
                { label: "View Projects", href: "#projects" },
                { label: "Skills", href: "#skills" },
                { label: "About Me", href: "#about" },
              ].map((link) => (
                <Button key={link.href} asChild variant="outline" size="lg" className="rounded-xl">
                  <a href={link.href}>{link.label}</a>
                </Button>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            style={{ y: imageY }}
            className="relative w-full max-w-[300px] sm:max-w-[380px] lg:max-w-none lg:w-[440px] order-1 lg:order-2"
          >
            {/* slowly turning dashed ring behind the portrait */}
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 rounded-full border-2 border-dashed border-primary/30"
            />

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="aspect-square rounded-full relative overflow-hidden border-8 border-muted shadow-2xl shadow-primary/20 z-10"
            >
              <div className="absolute inset-0 z-10 bg-primary/20 mix-blend-overlay" />
              <Image src={hero.image || "/logo2.png"} alt={hero.name} fill priority sizes="(min-width: 1024px) 440px, 380px" className="object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.5, ease: EASE }}
              className={hero.experience ? "absolute -bottom-2 right-4 sm:right-10 z-20" : "hidden"}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="bg-card px-4 py-2 rounded-lg shadow-xl border border-border flex items-center gap-3"
              >
                <BadgeCheck className="size-5 text-primary" />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">Experience</span>
                  <span className="text-sm font-bold">{hero.experience}</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}>
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
