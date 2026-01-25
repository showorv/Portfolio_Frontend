"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import { toast } from "sonner"; 
import { createMessage } from "@/actions/message";
import { Mail, PhoneCall } from "lucide-react";
import { Button } from "../ui/button";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, subject, description } = formData;

    if (!name || !email || !subject || !description) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      await createMessage(formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", description: "" });
    } catch (error) {
      toast.error("Failed to send message.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-10 lg:py-20">
       <SectionTitle title="Contact Me" subtitle="Get in touch with me" />
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        {/* Left Column: Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
          Let&apos;s <span className="text-primary">Connect</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-400">
            Have a project in mind or just want to say hi? I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>

          {/* Contact Cards */}
          <div className="mt-12 space-y-6">
            <ContactCard
              icon={Mail}
              title="Email Me"
              value="yousufshowrov994@gmail.com"
              href="mailto:yousufshowrov994@gmail.com"
            />
            <ContactCard
              icon={PhoneCall}
              title="Call Me"
              value="01321066589"
              href="tel:+8801321066589"
            />
            {/* <ContactCard
              icon="chat"
              title="WhatsApp"
              value="Message on WhatsApp"
              href="#"
            /> */}
          </div>

     
        </motion.div>

        {/* Right Column: Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-xl border border-white/5 bg-white/5 p-8 lg:p-10 backdrop-blur-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormInput
                label="Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
              <FormInput
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
            </div>
            <FormInput
              label="Subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Project Inquiry"
            />
            <FormTextarea
              label="Message"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="How can I help you?"
              rows={5}
            />

            <Button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-4 text-base font-bold text-white transition-all hover:brightness-110 active:scale-[0.98]"
            >
         
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">     {loading ? "Sending..." : "Send Message"}</span>
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}



function ContactCard({ icon: Icon, title, value, href }: { icon: any; title: string; value: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-4 group"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm font-bold uppercase tracking-wider text-slate-500">{title}</p>
        <span className="text-lg font-medium text-white group-hover:text-primary transition-colors">{value}</span>
      </div>
    </a>
  );
}


function FormInput({ label, name, type, value, onChange, placeholder }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-300">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-background-dark/50 px-4 py-3 text-white placeholder:text-slate-600 focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
      />
    </div>
  );
}

function FormTextarea({ label, name, value, onChange, placeholder, rows }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-300">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-lg border border-white/10 bg-background-dark/50 px-4 py-3 text-white placeholder:text-slate-600 focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none resize-none"
      />
    </div>
  );
}
