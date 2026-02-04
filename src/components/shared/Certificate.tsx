"use client";

import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";

const certifications = [
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
];

export default function CertificationsSection() {
  return (
    <section className="py-10">
      <SectionTitle title="Certifications & Achievements"/>

      <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        {certifications.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="rounded-2xl border bg-background p-6 shadow-sm hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {item.org} • {item.year}
            </p>

            <motion.a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 6 }}
              className="inline-block text-sm font-medium text-primary"
            >
              View Credential →
            </motion.a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
