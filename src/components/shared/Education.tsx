"use client";

import { School, Award, Check } from "lucide-react";
import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import type { IEducation } from "@/types/siteTypes";

export default function Education({ items }: { items: IEducation[] }) {
  if (items.length === 0) return null;

  return (
    <section id="education" className="max-w-7xl mx-auto px-6 scroll-mt-32 py-10 bg-background overflow-hidden">
      <SectionTitle title="Education" subtitle="My learning journey and milestones" />

      <div className="relative flex flex-col gap-12 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-16px)] before:w-[2px] before:bg-slate-200 dark:before:bg-[#232f48]">
        {items.map((edu, index) => {
          // the first entry is the main degree, the rest read as courses and awards
          const Icon = index === 0 ? School : Award;
          return (
            <motion.div
              key={`${edu.title}-${index}`}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative pl-10 group"
            >
              <div
                className={`absolute left-0 top-1.5 size-6 rounded-full grid place-items-center z-10 transition-transform group-hover:scale-125 ${
                  index === 0 ? "bg-primary" : "bg-slate-400 dark:bg-slate-600"
                }`}
              >
                <Icon className="size-3.5 text-white" />
              </div>

              <div className="flex flex-col gap-4 p-6 bg-white dark:bg-[#192233] rounded-xl border border-slate-100 dark:border-[#232f48] shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div>
                    {edu.year && (
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3 uppercase tracking-wider">
                        {edu.year}
                      </span>
                    )}
                    <h3 className="text-xl font-bold">{edu.title}</h3>
                    <p className="text-slate-500 dark:text-[#92a4c9] font-medium">{edu.institute}</p>
                  </div>
                  <div className="size-12 rounded-lg bg-slate-50 dark:bg-white/5 flex items-center justify-center">
                    <Icon className={`size-5 ${index === 0 ? "text-primary" : "text-slate-400"}`} />
                  </div>
                </div>

                {edu.details.length > 0 && (
                  <ul className="space-y-2">
                    {edu.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-[#92a4c9] text-sm">
                        <Check className="size-4 mt-0.5 shrink-0 text-primary" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
