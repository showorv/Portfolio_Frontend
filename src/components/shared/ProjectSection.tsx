"use client";

import { useEffect, useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { motion } from "framer-motion";
import { fetchProjects } from "@/actions/public/getPublicProject";
import { IProject } from "@/types/projectTypes";
import Link from "next/link";
import Image from "next/image";

/** `home`: show only featured projects when any are marked, with a link to the full list. */
export default function Projects({ home = false }: { home?: boolean }) {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await fetchProjects();
        setProjects(response.data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    getProjects();
  }, []);

  const featured = projects.filter((project) => project.featured);
  const visible = home && featured.length ? featured : projects;

  return (
    <section id="projects" className="py-10 bg-background transition-colors duration-300 overflow-hidden ">
      <SectionTitle title="My Projects" subtitle="Some of my recent works" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading &&
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-[380px] rounded-xl border border-border bg-card animate-pulse" />
          ))}
        {visible.map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8 }}
            className="group relative flex flex-col rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#192233] transition-shadow hover:shadow-xl hover:shadow-primary/10"
          >

            <div className="relative h-48 w-full overflow-hidden">
              {project.featured && (
                <span className="absolute left-3 top-3 z-10 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow">
                  Featured
                </span>
              )}
              {project.thumbnail && (
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
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

      {home && visible.length < projects.length && (
        <div className="mt-10 flex justify-center">
          <Link
            href="/projects"
            className="rounded-lg border border-primary px-6 py-2.5 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            View all {projects.length} projects
          </Link>
        </div>
      )}
    </section>
  );
}
