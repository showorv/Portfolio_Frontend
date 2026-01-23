"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getSkill } from "@/actions/getSKill";
import { ISkill } from "@/types/skillTypes";
import SectionTitle from "../ui/SectionTitle";
import { Database, DatabaseZap, Layers, Wrench } from "lucide-react";

type SkillCategory = "Frontend" | "Backend" | "Database" | "Tools";

export default function Skills() {
  const [skills, setSkills] = useState<ISkill[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await getSkill();
        setSkills(res.data);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      }
    };
    fetchSkills();
  }, []);

  const groupedSkills: Record<SkillCategory, ISkill[]> = {
    Frontend: [],
    Backend: [],
    Database: [],
    Tools: [],
  };

  skills.forEach((skill) => {
    const category = skill.category as SkillCategory;
    if (groupedSkills[category]) groupedSkills[category].push(skill);
  });

  const categories = [
    { key: "Frontend", icon: Layers },
    { key: "Backend", icon: Database },
    { key: "Database", icon: DatabaseZap },
    { key: "Tools", icon: Wrench },
  ] as const;

  return (
    <section id="skills" className="scroll-mt-20 py-10 bg-background">
      <SectionTitle
        title="Technical Skills"
        subtitle="Technologies I use to build modern, scalable applications"
      />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {categories.map(({ key, icon: Icon }) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-5"
          >
            {/* Category Header */}
            <div className="flex items-center gap-2">
              <Icon className="text-primary w-5 h-5" />
              <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">
                {key}
              </h3>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-3">
              {groupedSkills[key].map((skill) => (
                <motion.div
                  key={skill._id}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex flex-col items-center gap-2 px-2 py-2 bg-card rounded-lg border border-border hover:shadow-md transition-all"
                >
                  {/* Logo */}
                  <div className="w-8 h-8 rounded-md bg-muted/40 flex items-center justify-center">
                    {skill.thumbnail && (
                      <img
                        src={skill.thumbnail}
                        alt={skill.name}
                        className="w-8 h-8 object-contain"
                      />
                    )}
                  </div>

                  {/* Name */}
                  <span className="text-xs text-center font-semibold leading-tight">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
