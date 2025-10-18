"use client";

import { useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner"; // optional toast for feedback

import { createMessage } from "@/actions/message";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, description } = formData;

    if (!name || !email || !description) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      await createMessage(formData); 
      console.log(formData);
      
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", description: "" });
    } catch (error) {
      toast.error("Failed to send message.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-background/50">
      <SectionTitle title="Contact Me" subtitle="Get in touch with me" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto px-6"
      >
    
        <div className="relative group">
  
          <div className="absolute -inset-1 rounded-xl blur-lg bg- dark:opacity-20  transition-opacity duration-500 "></div>

          <form
            onSubmit={handleSubmit}
            className="relative bg-background dark:bg-foreground/10 p-8 rounded-xl shadow-lg flex flex-col gap-6 transition-colors duration-300"
          >
            <Input
              type="text"
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              placeholder="Your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Textarea
              placeholder="Your Message"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              required
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>


        <div className="mt-10 flex justify-center gap-6">
          <a href="https://github.com/YousufShowrov" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition">
            GitHub
          </a>
          <a href="https://linkedin.com/in/YousufShowrov" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition">
            LinkedIn
          </a>
          <a href="mailto:yourmail@example.com" className="text-muted-foreground hover:text-primary transition">
            Email
          </a>
        </div>
      </motion.div>
    </section>
  );
}
