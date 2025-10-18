"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center text-center relative bg-gradient-to-b from-gray-900 via-black to-gray-900"
    >

        <div className="container max-w-7xl  mx-auto flex flex-col md:flex-row items-center px-6 gap-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <h1 className="mt-20 text-5xl md:text-6xl font-extrabold text-white">
          Hi, I’m{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Yousuf Showrov
          </span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          Full-Stack Web Developer passionate about building modern web apps
          with performance and scalability in mind.
        </p>
        <div className="flex justify-center gap-4">
          <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            View Projects
          </Button>
          <Button variant="outline" className="border-gray-600 text-gray-300">
            Download Resume
          </Button>
        </div>
      </motion.div>

      <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex justify-center"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary shadow-lg">
            <Image
              src="/logo.png"
              alt="Yousuf Showrov"
              fill
              className="object-cover"
              priority

            />
          </div>
        </motion.div>

        </div>


    </section>
  );
}
