import About from "@/components/shared/AboutMe";
import Blogs from "@/components/shared/Blogs";
import Contact from "@/components/shared/Contact";
import Footer from "@/components/shared/Footer";
import Hero from "@/components/shared/Hero";
import Navbar from "@/components/shared/Navbar/Navbar";
import Projects from "@/components/shared/ProjectSection";
import { ModeToggle } from "@/components/shared/Toggle";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-dvh ">
      {/* <Navbar /> */}
      <Hero />
      <Projects />
      <About />
      <Blogs />
      <Contact />

      {/* <Footer /> */}
    </div>
  );
}
