"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/ui/SectionTitle";
import Image from "next/image";
import { IProject } from "@/types/projectTypes";
import Link from "next/link";



export default function SingleProject({ project }: { project:IProject }) {
  if (!project) {
    return (
      <div className="py-20 text-center text-gray-500">Project not found.</div>
    );
  }

  return (
    <section className="py-20 max-w-5xl mx-auto px-6">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-background/60 backdrop-blur-md rounded-2xl shadow-lg border border-border p-8"
      >
     
        <SectionTitle title={project.title} subtitle="Project Overview" />

      
        {project.thumbnail && (
          <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

     
        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
          {project.description}
        </p>

    
        {project.features && project.features.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">✨ Key Features</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

 
        {project.techStacks && project.techStacks.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">🧠 Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStacks.map((tech, index) => (
                <span
                  key={index}
                  className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-8">
          {project.projectLink && (
            <Button asChild variant="outline">
              <Link
                href={project.projectLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Link>
            </Button>
          )}
          {project.liveSite && (
            <Button asChild>
              <Link
                href={project.liveSite}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
              </Link>
            </Button>
          )}
        </div>
      </motion.div>
    </section>
  );
}
