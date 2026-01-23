"use client";

import { useEffect, useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { motion } from "framer-motion";
import Image from "next/image";

import { ISkill } from "@/types/skillTypes";
import { getSkill } from "@/actions/getSKill";

export default function About() {
 

  return (
    <section id="about" className="scroll-mt-32 py-10 bg-background">
      {/* ---------- Header ---------- */}
      {/* <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
            About Me
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A journey from curiosity to code, with a passion for building
            scalable web solutions.
          </p>
        </div>
      </div> */}
      <SectionTitle title="About Me" subtitle=" A journey from curiosity to code, with a passion for building
            scalable web solutions." />

      {/* ---------- Main Card ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="flex flex-col xl:flex-row rounded-2xl shadow-xl bg-card border border-border overflow-hidden">
          {/* ---------- Left: Image ---------- */}
          <div className="relative w-full xl:w-1/2 aspect-video xl:aspect-auto min-h-[280px]">
            <Image
              src="/logo.png"
              alt="Yousuf Showrov"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* ---------- Right: Content ---------- */}
          <div className="flex w-full min-w-72 grow flex-col justify-center gap-6 p-8 md:p-10">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">My Story</h3>

              <p className="text-muted-foreground text-base leading-relaxed">
                I started my programming journey with curiosity about how the
                web works, which quickly turned into a passion for building
                real-world applications. Over time, I’ve grown into a
                full-stack developer who enjoys creating scalable, maintainable
                and user-focused digital products.
              </p>

              <p className="text-muted-foreground text-base leading-relaxed">
                Outside of coding, you’ll find me in the gym pushing my limits
                or exploring new technologies. I believe consistency,
                discipline, and continuous learning are the foundations of both
                great fitness and great engineering.
              </p>
            </div>

            {/* ---------- Personality Badges ---------- */}
            <div className="flex flex-wrap gap-3 pt-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                💪 Fitness Enthusiast
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                ☕ Coffee Powered
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                🚀 Growth Mindset
              </div>
            </div>
          </div>
        </div>
      </motion.div>

   
    </section>
  );
}
