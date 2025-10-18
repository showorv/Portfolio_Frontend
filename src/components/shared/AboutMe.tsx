"use client";

import { useEffect, useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { motion } from "framer-motion";
import Image from "next/image";

import { ISkill } from "@/types/skillTypes";
import { getSkill } from "@/actions/getSKill";

export default function About() {
  const [skills, setSkills] = useState<ISkill[]>([]);

  useEffect(() => {
    const getSkills = async () => {
      try {
        const response = await getSkill();
        setSkills(response.data);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      }
    };
    getSkills();
  }, []);

  return (
    <section id="about" className="py-20 bg-background/50">
      <SectionTitle title="About Me" subtitle="Get to know me better" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        {/* Left: Bio */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex-1 space-y-6"
        >
          <h3 className="text-2xl font-semibold text-foreground">Hello! I’m Yousuf Showrov</h3>
          <p className="text-muted-foreground leading-relaxed">
            I’m a passionate full-stack developer with experience in building modern web applications using
            React, Next.js, Node.js, MongoDB, and cloud technologies. I enjoy turning ideas into functional,
            beautiful, and performant web apps.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I create scalable, user-friendly solutions and enjoy learning new technologies to stay ahead in the fast-paced world of web development.
          </p>
        </motion.div>

        {/* Right: Image */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex-1 flex justify-center"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary shadow-lg">
            <Image
              src="/logo.png" // your image path
              alt="Yousuf Showrov"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* Skills below */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-10 flex flex-wrap justify-center gap-3 px-6"
      >
        {skills.map((skill) => (
          <div
            key={skill._id}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-3 py-1 rounded-md text-sm font-medium shadow-md"
          >
            {skill.name}
          </div>
        ))}
      </motion.div> */}

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
  className="mt-10 flex flex-wrap justify-center gap-3 px-6"
>
  {skills.map((skill) => (
    <div
      key={skill._id}
      className="flex items-center justify-center bg-black py-2 rounded-md text-sm "
    >
      {skill.thumbnail && (
        <img
          src={skill.thumbnail} 
          alt={skill.name}
          className="w-20 h-20 object-contain"
        />
      )}

    </div>
  ))}
</motion.div>
    </section>
  );
}
