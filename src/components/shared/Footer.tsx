"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const links = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Blogs", href: "/blogs" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="border-t border-border bg-background/80 backdrop-blur-md mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col items-center gap-6 text-center">
        {/* Logo / Name */}
        <h2 className="text-2xl font-semibold text-foreground">
          Yousuf Showrov
        </h2>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6 mt-4">
          <Link
            href="https://github.com/YousufShowrov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github size={22} />
          </Link>
          <Link
            href="https://linkedin.com/in/YousufShowrov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin size={22} />
          </Link>
          <Link
            href="mailto:yousuf@example.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail size={22} />
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-sm text-muted-foreground mt-4">
          © {new Date().getFullYear()} Yousuf Showrov. Built with ❤️ using{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent font-medium">
            Next.js, Tailwind, and ShadCN
          </span>
          .
        </p>
      </div>
    </motion.footer>
  );
}
