"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../Toggle";

const links = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Education", id: "education" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // highlight whichever section currently crosses the middle of the viewport
  useEffect(() => {
    if (!onHome) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    // sections render after data loads, so look them up on a short delay too
    const watch = () => links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    watch();
    const timer = setTimeout(watch, 1500);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [onHome]);

  // on the home page a plain hash lets the smooth scroller take over
  const hrefFor = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled || menuOpen ? "backdrop-blur-md bg-background/80 border-b border-border shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 12, scale: 1.08 }}
            className="size-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold"
          >
            YS
          </motion.div>
          <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            Yousuf Showrov
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map(({ name, id }) => {
            const isActive = onHome && active === id;
            return (
              <a
                key={id}
                href={hrefFor(id)}
                className={cn(
                  "relative px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-primary/10"
                  />
                )}
                <span className="relative">{name}</span>
              </a>
            );
          })}
          <Button asChild className="ml-3 bg-primary cursor-pointer">
            <a href={hrefFor("contact")}>Hire Me</a>
          </Button>
          <div className="ml-2">
            <ModeToggle />
          </div>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <ModeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="text-foreground focus:outline-none"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-border"
          >
            <div className="flex flex-col items-center py-4 gap-1">
              {links.map(({ name, id }, i) => (
                <motion.a
                  key={id}
                  href={hrefFor(id)}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i }}
                  className={cn(
                    "w-full py-2.5 text-center font-medium transition-colors",
                    onHome && active === id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {name}
                </motion.a>
              ))}
              <Button asChild className="mt-2 bg-primary cursor-pointer">
                <a href={hrefFor("contact")} onClick={() => setMenuOpen(false)}>
                  Hire Me
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
