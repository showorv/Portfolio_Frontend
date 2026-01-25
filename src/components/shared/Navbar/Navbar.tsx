"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "../Toggle";
import Link from "next/link";


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    // { name: "Blogs", href: "/blogs" },
    { name: "Education", href: "/#education" },
    { name: "Projects", href: "/#projects" },
   
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-background/80 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
      
        <h1 className="text-xl font-bold text-foreground">
          Yousuf Showrov
        </h1>

       
        <div className="hidden md:flex items-center gap-6">
        {links.map(({ name, href }) => (
          <Link
            key={name}
            href={href}
            scroll={true}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {name}
          </Link>
        ))}
      <Link href="#contact">
  <Button className="bg-primary cursor-pointer">Hire Me</Button>
</Link>
          <ModeToggle />
        </div>

     
        <div className="md:hidden flex items-center gap-3">
          <ModeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
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
            className="md:hidden bg-background/90 backdrop-blur-md border-t border-border"
          >
            <div className="flex flex-col items-center py-4 gap-4">
            {links.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              scroll={true}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {name}
            </Link>
))}
                <Link href="#contact">
  <Button className="bg-primary cursor-pointer">Hire Me</Button>
</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
