"use client";

import { useEffect, useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { motion } from "framer-motion";
import { fetchProjects } from "@/actions/public/getPublicProject";
import { IProject } from "@/types/projectTypes";
import Link from "next/link";

export default function Projects() {
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await fetchProjects();
        setProjects(response.data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    getProjects();
  }, []);

  return (
    <section id="projects" className="py-10 bg-background transition-colors duration-300 overflow-hidden ">
      <SectionTitle title="My Projects" subtitle="Some of my recent works" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative flex flex-col rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#192233] transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Project Thumbnail */}
            <div className="relative h-48 w-full overflow-hidden">
              {project.thumbnail && (
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <span className="bg-white text-primary px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
                  View Details
                </span>
              </div>
            </div>

            {/* Project Content */}
            <div className="p-5 space-y-3">
              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.techStacks?.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold">{project.title}</h3>
              <p className="text-slate-500 dark:text-[#92a4c9] text-sm line-clamp-2">
                {project.description}
              </p>

              {/* Buttons */}
              <div className="flex gap-2 mt-2 flex-wrap">
                <Link href={`/projects/${project._id}`} className="w-full md:w-auto">
                  <button className="w-full md:w-auto py-2.5 px-4 rounded-lg border border-primary text-primary font-bold text-sm hover:bg-primary hover:text-white transition-colors">
                    View Details
                  </button>
                </Link>
                {project.liveSite && (
                  <a
                    href={project.liveSite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:w-auto py-2.5 px-4 rounded-lg border border-primary text-primary font-bold text-sm hover:bg-primary hover:text-white transition-colors text-center"
                  >
                    Live Link
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
