import Footer from "@/components/shared/Footer";
import Hero from "@/components/shared/Hero";
import Navbar from "@/components/shared/Navbar/Navbar";
import { ModeToggle } from "@/components/shared/Toggle";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-dvh ">
      {/* <Navbar /> */}
      <Hero />
      {/* <Footer /> */}
    </div>
  );
}
