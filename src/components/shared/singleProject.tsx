"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IProject } from "@/types/projectTypes";


export default function SingleProject({ project }: { project: IProject }) {
  if (!project) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        Project not found.
      </div>
    );
  }

  return (
    <section className="py-20 max-w-7xl mx-auto px-6">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12"
      >
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-square-terminal-icon lucide-square-terminal"><path d="m7 11 2-2-2-2"/><path d="M11 13h4"/><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/></svg>
            <span>Project Showcase</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            {project.title}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {project.description.substring(0,100)}
          </p>
      
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          {project.liveSite && (
            <Button asChild className="flex-1 md:flex-none h-12 px-6 font-bold">
              <Link
                href={project.liveSite}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-rocket-icon lucide-rocket"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
                Live Demo
              </Link>
            </Button>
          )}

          {project.projectLink && (
            <Button
              asChild
              variant="secondary"
              className="flex-1 md:flex-none h-12 px-6 font-bold"
            >
              <Link
                href={project.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code-icon lucide-code"><path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/></svg>
                GitHub
              </Link>
            </Button>
          )}
        </div>
      </motion.div>


      {project.thumbnail && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full aspect-video md:aspect-[21/9] rounded-xl overflow-hidden mb-16 shadow-2xl group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            priority
          />
        </motion.div>
      )}

 
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
 
        <div className="lg:col-span-2 space-y-12">
  
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-primary"></span>
              Project Overview
            </h2>

            <div className="text-muted-foreground text-lg leading-relaxed space-y-4">
              <p>{project.description}</p>
            </div>
          </section>


          {project.techStacks && project.techStacks.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">The Tech Stack</h2>

              <div className="flex flex-wrap gap-3">
                {project.techStacks.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-muted border border-border rounded-lg text-sm font-medium flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}

     
          {project.features && project.features.length > 0 && (
            <div className="glass-card p-8 rounded-xl border border-border bg-background/60 backdrop-blur">
              <div className="size-12 bg-primary/20 text-primary rounded-lg flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star-icon lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>
              </div>

              <h3 className="text-xl font-bold mb-4">Key Features</h3>

              <ul className="space-y-4 text-muted-foreground">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-primary font-bold">
                      {String(index + 1).padStart(2, "0")}.
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>


        <div className="space-y-8">
          <div className="bg-muted p-8 rounded-xl border border-border sticky top-24">
            <h3 className="text-lg font-bold mb-6 uppercase tracking-wider">
              Project Actions
            </h3>

            <div className="space-y-4">
              {project.liveSite && (
                <Button asChild className="w-full h-12 font-bold">
                  <Link
                    href={project.liveSite}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Live Site
                  </Link>
                </Button>
              )}

              {project.projectLink && (
                <Button asChild variant="outline" className="w-full h-12 font-bold">
                  <Link
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Source Code
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
