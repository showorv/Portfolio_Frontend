"use client"

import { motion } from "framer-motion"

export default function SectionTitle({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: 0.12 }}
      className="text-center mb-10"
    >
      <div className="flex items-center justify-center gap-3 mb-2">
        {/* accent bar grows in before the title rises */}
        <motion.div
          variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1 } }}
          transition={{ duration: 0.4 }}
          className="h-8 w-1.5 origin-bottom bg-primary rounded-full"
        />
        <div className="overflow-hidden">
          <motion.h2
            variants={{ hidden: { y: "100%" }, show: { y: 0 } }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl font-bold"
          >
            {title}
          </motion.h2>
        </div>
      </div>

      {subtitle && (
        <motion.p
          variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5 }}
          className="text-muted-foreground max-w-2xl mx-auto px-6"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
