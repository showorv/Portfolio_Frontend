"use client";

import { useEffect, useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchProjects } from "@/actions/public/getPublicProject";
import { IProject } from "@/types/projectTypes";

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
    <section id="projects" className="py-20 bg-background/50 relative">
      <SectionTitle title="My Projects" subtitle="Some of my recent works" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group"
          >
          
            {/* <div className="absolute -inset-1 rounded-xl blur-lg bg-gradient-to-r from-indigo-500 via-black to-indigo-500 opacity-10 group-hover:opacity-60 transition-opacity duration-500"></div> */}

            {/* Card */}
            <Card className="relative hover:shadow-xl dark:hover:shadow-white/10 transition-shadow rounded-xl overflow-hidden">
              {/* Project Thumbnail */}
              {project.thumbnail && (
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
              )}

              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex flex-wrap gap-2 mt-2">
                {project.techStacks?.map((tech) => (
                  <span
                    key={tech}
                    className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </CardContent>

              <CardContent className="flex gap-3 mt-4">
                {project.projectLink && (
                  <Button asChild variant="outline" size="sm">
                    <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  </Button>
                )}
                {project.liveSite && (
                  <Button asChild size="sm">
                    <a href={project.liveSite} target="_blank" rel="noopener noreferrer">
                      Live Demo
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
