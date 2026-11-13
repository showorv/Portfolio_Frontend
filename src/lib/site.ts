import { api } from "@/lib/server-api";
import type { ISite } from "@/types/siteTypes";

/** What the site shows until content is saved from the admin panel. */
export const defaultSite: ISite = {
  hero: {
    name: "Yousuf Showrov",
    roles: ["Full Stack Web Developer", "Web Designer", "Cloud Enthusiast"],
    badge: "Available for projects",
    intro:
      "Building scalable, user-centric web applications with modern technologies. Crafting seamless digital experiences from front-end to back-end architecture.",
    image: "/logo2.png",
    experience: "1+ Years Exp.",
    resumeUrl: "https://drive.google.com/file/d/1wA_Y1EQ65I9SkJ_bxGtyjO5hlD6z2fmz/view?usp=sharing",
  },
  about: {
    subtitle: "A journey from curiosity to code, with a passion for building scalable web solutions.",
    image: "/logo2.png",
    paragraphs: [
      "Impact-driven Full-stack developer specializing in the MERN stack with a strong foundation in building scalable, secure, and user-centric web applications. Skilled in developing end-to-end solutions with clean, responsive user interfaces and robust backend systems. Passionate about AWS and cloud technologies and continuous learning. Seeking a remote opportunity to contribute to high-impact products.",
      "I started my programming journey with curiosity about how the web works, which quickly turned into a passion for building real-world applications. Over time, I’ve grown into a full-stack developer who enjoys creating scalable, maintainable and user-focused digital products.",
    ],
    traits: ["Growth Mindset", "Adaptability", "Learning Agility"],
  },
  education: [
    {
      year: "2023 - 2027",
      title: "BSC in Computer Science And Engineering",
      institute: "American Internation University Of Bangladesh",
      details: ["Major in Software Engineering.", "Undergraduate (CGPA: 3.72/4.0)."],
    },
    {
      year: "2025",
      title: "Next Level Full Stack Developer Bootcamp",
      institute: "Programming Hero",
      details: [
        "Intensive 6-month immersive program focused on industry level project using modern Typescript,Redux,Nextjs,Postgresql,Prisma,, cloud deployment, and agile methodologies.",
      ],
    },
  ],
  certificates: [
    {
      title: "Full Stack Web Development Certification",
      org: "Programming Hero",
      year: "2026",
      link: "https://drive.google.com/file/d/1H-ePRsHbp9GjOMjX8uMyEFMw8TPFmIjR/view?usp=sharing",
    },
    {
      title: "Hackathon Finalist",
      org: "Inter-University Hackathon",
      year: "2025",
      link: "https://drive.google.com/file/d/12TAZK95V43YtTosvGFYtcYnJ1lmHc4gW/view?usp=sharing",
    },
  ],
  contact: {
    email: "yousufshowrov994@gmail.com",
    phone: "01321066589",
    github: "https://github.com/showorv",
    linkedin: "https://www.linkedin.com/in/yousuf-showrov-3b2836414",
  },
};

/**
 * Saved content wins as-is, including emptied fields and lists, so anything
 * removed in the admin stays removed. Defaults only fill what was never saved.
 */
export async function getSite(): Promise<ISite> {
  const res = await api<Partial<ISite> | null>("/site");
  const saved = res.success ? res.data : null;

  if (!saved) return defaultSite;

  return {
    hero: { ...defaultSite.hero, ...saved.hero },
    about: { ...defaultSite.about, ...saved.about },
    education: saved.education ?? defaultSite.education,
    certificates: saved.certificates ?? defaultSite.certificates,
    contact: { ...defaultSite.contact, ...saved.contact },
  };
}
