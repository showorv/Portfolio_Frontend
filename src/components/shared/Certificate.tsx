"use client";

import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import type { ICertificate } from "@/types/siteTypes";

export default function CertificationsSection({ items }: { items: ICertificate[] }) {
  if (items.length === 0) return null;

  return (
    <section id="Achievements" className="mx-auto max-w-7xl px-6 py-10 lg:py-20">
      <SectionTitle
        title="Achievements"
        subtitle="Certifications and recognitions earned through learning and competitions"
      />

      <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        {items.map((item, i) => (
          <motion.div
            key={`${item.title}-${i}`}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="rounded-2xl border bg-background p-6 shadow-sm hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>

            <p className="text-sm text-muted-foreground mb-4">{[item.org, item.year].filter(Boolean).join(" • ")}</p>

            {item.link && (
              <motion.a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 6 }}
                className="inline-block text-sm font-medium text-primary"
              >
                View Credential →
              </motion.a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
