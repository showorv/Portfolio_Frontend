"use client";

// import { EducationEntry } from "@/types/educationTypes"; // define this type
import { School, Award } from "lucide-react";
import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";

const educationData = [
  {
    id: 1,
    year: "2023 - 2027",
    title: "BSC in Computer Science And Engineering",
    institute: "American Internation University Of Bangladesh",
    icon: "school",
    iconColor: "bg-primary",
    details: [
      "Major in Software Engineering.",
      "Undergraduate (CGPA: 3.72/4.0).",
     
    ],
  },
  {
    id: 2,
    year: "2025",
    title: "Next Level Full Stack Developer Bootcamp",
    institute: "Programming Hero",
    icon: "award",
    iconColor: "bg-slate-300 dark:bg-slate-600",
    details: [
      "Intensive 6-month immersive program focused on industry level project using modern Typescript,Redux,Nextjs,Postgresql,Prisma,, cloud deployment, and agile methodologies.",
    ],
  },
];

export default function Education() {
  return (
    <section id="education" className="max-w-7xl mx-auto px-6 scroll-mt-32 py-10 bg-background">
      <SectionTitle title="Education" subtitle="My learning journey and milestones" />

      <div className="relative flex flex-col gap-12 before:absolute before:left-5 before:top-2 before:h-[calc(100%-16px)] before:w-[2px] before:bg-slate-200 dark:before:bg-[#232f48]">
        {educationData.map((edu) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative pl-10 group"
          >
            {/* Timeline Circle */}
            <div
              className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-white dark:border-background-dark ${edu.iconColor} z-10 transition-transform group-hover:scale-125`}
            >
              {edu.icon === "school" && <School className="w-4 h-4 text-white m-1" />}
              {edu.icon === "award" && <Award className="w-4 h-4 text-white m-1" />}
            </div>

            {/* Card */}
            <div className="flex flex-col gap-4 p-6 bg-white dark:bg-[#192233] rounded-xl border border-slate-100 dark:border-[#232f48] shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3 uppercase tracking-wider">
                    {edu.year}
                  </span>
                  <h3 className="text-xl font-bold">{edu.title}</h3>
                  <p className="text-slate-500 dark:text-[#92a4c9] font-medium">{edu.institute}</p>
                </div>

                <div className="w-12 h-12 rounded-lg bg-slate-50 dark:bg-background-dark flex items-center justify-center">
                  {edu.icon === "school" && <School className="w-5 h-5 text-primary" />}
                  {edu.icon === "award" && <Award className="w-5 h-5 text-slate-400" />}
                </div>
              </div>

              <ul className="space-y-2"> 
                {edu.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-600 dark:text-[#92a4c9] text-sm">
                    <span className="text-primary">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                    </span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
