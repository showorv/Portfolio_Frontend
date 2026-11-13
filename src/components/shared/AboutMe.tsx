"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import { motion } from "framer-motion";
import Image from "next/image";
import type { ISite } from "@/types/siteTypes";

export default function About({ about, name }: { about: ISite["about"]; name: string }) {
  return (
    <section id="about" className="scroll-mt-32 py-10 bg-background">
      <SectionTitle title="About Me" subtitle={about.subtitle} />

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="flex flex-col xl:flex-row rounded-2xl shadow-xl bg-card border border-border overflow-hidden">
          {about.image && (
            <div className="relative w-full xl:w-1/2 aspect-video xl:aspect-auto min-h-[280px]">
              <Image src={about.image} alt={name} fill sizes="(min-width: 1280px) 50vw, 100vw" className="object-cover" />
            </div>
          )}

          <div className="flex w-full min-w-72 grow flex-col justify-center gap-6 p-8 md:p-10">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">My Story</h3>
              {about.paragraphs.map((paragraph, i) => (
                <p key={i} className="text-muted-foreground text-base leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {about.traits.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-4">
                {about.traits.map((trait) => (
                  <div
                    key={trait}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider"
                  >
                    {trait}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
