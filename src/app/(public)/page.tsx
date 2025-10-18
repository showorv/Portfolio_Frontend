import About from "@/components/shared/AboutMe";
import BlogCard from "@/components/shared/BlogCard";

import Contact from "@/components/shared/Contact";
import Footer from "@/components/shared/Footer";
import Hero from "@/components/shared/Hero";
import Navbar from "@/components/shared/Navbar/Navbar";
import Projects from "@/components/shared/ProjectSection";
import { ModeToggle } from "@/components/shared/Toggle";
import SectionTitle from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog`, {
    cache: "no-cache"
  } )

  const {data:blogs} = await res.json()
  return (
    <div className="min-h-dvh ">

      <Hero />
      <Projects />
      <About />


      <SectionTitle title="My Blogs" subtitle="Read my latest articles" />
      <div className="max-w-7xl mx-auto px-6 flex justify-end mb-8">
    <Link href="/blogs">
      <Button variant="outline">See All</Button>
    </Link>
   
    </div>
    <section id="blogs" className=" bg-background/50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.slice(0,3).map((blog: any)=><BlogCard key={blog.id} post={blog} />)}  
      </div>
      </section>
  

    <Contact />
    </div>
  );
}
