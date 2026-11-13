import About from "@/components/shared/AboutMe";
import CertificationsSection from "@/components/shared/Certificate";
import Contact from "@/components/shared/Contact";
import Education from "@/components/shared/Education";
import Hero from "@/components/shared/Hero";
import Projects from "@/components/shared/ProjectSection";
import Skills from "@/components/shared/Skill";
import { getSite } from "@/lib/site";

export default async function Home() {
  const site = await getSite();

  return (
    <div className="min-h-dvh">
      <Hero hero={site.hero} contact={site.contact} />
      <About about={site.about} name={site.hero.name} />
      <Skills />
      <Education items={site.education} />
      <Projects home />
      <CertificationsSection items={site.certificates} />
      <Contact contact={site.contact} />
    </div>
  );
}
