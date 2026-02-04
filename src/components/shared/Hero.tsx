"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const roles = ["Full Stack Web Developer", "Web Designer", "Cloud Enthusiast"];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // const handleDownloadResume = () => {
  //   const link = document.createElement("a");
  //   link.href = "/resume.pdf"; // place resume.pdf inside /public
  //   link.download = "Yousuf_Showrov_Resume.pdf";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);

  //   // window.open("/resume.pdf", "_self");

  // //  window.alert("Resume not available yet. Will update soon!")
  // };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-background transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
         
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-8 order-2 lg:order-1 text-center lg:text-left"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mx-auto lg:mx-0">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                Available for projects
              </div>

              <h1 className="text-2xl lg:text-4xl font-bold tracking-tight">
                Hi, I&apos;m{" "}
                <span className="text-primary">Yousuf Showrov</span>
              </h1>

            
              <div className="h-[32px] lg:h-[40px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={roles[index]}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="text-xl lg:text-2xl font-bold text-primary"
                  >
                    {roles[index]}
                  </motion.h2>
                </AnimatePresence>
              </div>

              <p className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed mx-auto lg:mx-0">
                Building scalable, user-centric web applications with modern
                technologies. Crafting seamless digital experiences from
                front-end to back-end architecture.
              </p>
            </div>

     
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4">
              <Link href="https://drive.google.com/file/d/1dNGkSnZTMDslmlYJ6EGWqY3cijgnDL9Q/view?usp=sharing"  target="_blank"
  rel="noopener noreferrer">
              <Button
                size="lg"
                // onClick={handleDownloadResume}
                className="rounded-xl px-8 py-6 text-base font-bold shadow-xl shadow-primary/20"
                
              >
                Download Resume
              </Button>
              </Link>
             
               <Link
                href="https://github.com/showorv"
                target="_blank"
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-muted hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/30 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </Link>

              <Link
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-muted hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/30 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>
            </div>


            <div className="flex justify-center lg:justify-start items-center gap-3 mb-10 md:mb-0">
              <Link href="#projects">
                <Button variant="outline" size="lg" className="rounded-xl">
                  View Projects
                </Button>
              </Link>

              <Link href="#skills">
                <Button variant="outline" size="lg" className="rounded-xl">
                  Skills
                </Button>
              </Link>

              <Link href="#about">
                <Button variant="outline" size="lg" className="rounded-xl">
                  About Me
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-[380px] lg:max-w-none lg:w-[440px] order-1 lg:order-2"
          >
            <div className="aspect-square rounded-full relative overflow-hidden border-8 border-muted shadow-2xl z-10">
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
              <Image
                src="/logo2.png"
                alt="Yousuf Showrov"
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Decorative blobs */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />

            {/* Experience badge */}
            <div className="absolute -bottom-2 right-10 z-20 bg-card px-4 py-2 rounded-lg shadow-xl border border-border flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-muted-foreground">
                  Experience
                </span>
                <span className="text-sm font-bold">1+ Years Exp.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ---------------- Scroll Indicator ---------------- */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
          className="w-5 h-9 rounded-full border-2 border-muted-foreground flex justify-center pt-1"
        >
          <div className="w-1 h-2 rounded-full bg-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
