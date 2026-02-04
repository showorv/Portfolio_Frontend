"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "../ui/button";

export default function Footer() {

  // const handleDownloadResume = () => {
  //   const link = document.createElement("a");
  //   link.href = "/resume.pdf"; // place resume.pdf inside /public
  //   link.download = "Yousuf_Showrov_Resume.pdf";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);

  //   // window.open("/resume.pdf", "_self");

  // //  window.alert("Resume not available yet. Will update soon!")
  // };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full bg-white dark:bg-[#192233] border-t border-slate-100 dark:border-[#232f48] py-12 px-6 md:px-20 lg:px-40"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left Section: Text */}
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h4 className="text-xl font-bold text-foreground dark:text-white">
          Let&apos;s build something amazing
          </h4>
          <p className="text-slate-500 dark:text-[#92a4c9]">
            Currently open to new projects and opportunities.
          </p>
        </div>

        {/* Right Section: Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="#contact"
            className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-primary text-white text-sm font-bold tracking-wide shadow-lg shadow-primary/20 transition-transform hover:-translate-y-1"
          >
            Get In Touch
          </Link>
          <Link href="https://drive.google.com/file/d/1dNGkSnZTMDslmlYJ6EGWqY3cijgnDL9Q/view?usp=sharing"  target="_blank"
  rel="noopener noreferrer">
          <Button
            size="lg"
            // onClick={handleDownloadResume}
            className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-slate-100 dark:bg-[#232f48] text-slate-900 dark:text-white text-sm font-bold tracking-wide hover:bg-slate-200 dark:hover:bg-[#2d3b5a] transition-all"
          >
            Download CV
          </Button>
          </Link>
        </div>
      </div>

      {/* Bottom Section: Copyright + Social */}
      <div className="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-slate-100 dark:border-[#232f48] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
        <p>© {new Date().getFullYear()} Yousuf Showrov. All rights reserved.</p>

        <div className="flex gap-4">
          <Link
            href="https://linkedin.com/in/YousufShowrov"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <Linkedin size={18} />
          </Link>
          <Link
            href="https://github.com/showorv"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <Github size={18} />
          </Link>
          <Link
            href="mailto:yousufshowrov994@gmail.com"
            className="hover:text-primary transition-colors"
          >
            <Mail size={18} />
          </Link>
        </div>
      </div>
    </motion.footer>
  );
}
