"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, Loader2, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { saveSite } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { ICertificate, IEducation, ISite } from "@/types/siteTypes";
import ImagePicker from "./ImagePicker";
import { Field, PageHeader, Panel, TagInput } from "./ui";

const TABS = [
  { key: "hero", label: "Hero" },
  { key: "about", label: "About" },
  { key: "education", label: "Education" },
  { key: "certificates", label: "Achievements" },
  { key: "contact", label: "Contact & links" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const blankEducation: IEducation = { year: "", title: "", institute: "", details: [] };
const blankCertificate: ICertificate = { title: "", org: "", year: "", link: "" };

/** Header row for one entry of a repeatable list: position, reorder and remove. */
function ItemBar({
  label,
  index,
  count,
  onMove,
  onRemove,
}: {
  label: string;
  index: number;
  count: number;
  onMove: (direction: -1 | 1) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-1">
      <p className="flex-1 text-sm font-semibold">
        {label} {index + 1}
      </p>
      <Button type="button" variant="ghost" size="icon-sm" onClick={() => onMove(-1)} disabled={index === 0} aria-label="Move up">
        <ArrowUp />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => onMove(1)}
        disabled={index === count - 1}
        aria-label="Move down"
      >
        <ArrowDown />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={onRemove}
        aria-label="Remove"
        className="text-destructive hover:text-destructive"
      >
        <Trash2 />
      </Button>
    </div>
  );
}

const moved = <T,>(list: T[], index: number, direction: -1 | 1) => {
  const next = [...list];
  [next[index], next[index + direction]] = [next[index + direction], next[index]];
  return next;
};

export default function SiteForm({ site }: { site: ISite }) {
  const [form, setForm] = useState(site);
  const [tab, setTab] = useState<TabKey>("hero");
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  const update = (next: ISite) => {
    setForm(next);
    setDirty(true);
  };
  const setHero = (patch: Partial<ISite["hero"]>) => update({ ...form, hero: { ...form.hero, ...patch } });
  const setAbout = (patch: Partial<ISite["about"]>) => update({ ...form, about: { ...form.about, ...patch } });
  const setContact = (patch: Partial<ISite["contact"]>) => update({ ...form, contact: { ...form.contact, ...patch } });
  const setEducation = (index: number, patch: Partial<IEducation>) =>
    update({ ...form, education: form.education.map((item, i) => (i === index ? { ...item, ...patch } : item)) });
  const setCertificate = (index: number, patch: Partial<ICertificate>) =>
    update({ ...form, certificates: form.certificates.map((item, i) => (i === index ? { ...item, ...patch } : item)) });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.hero.name.trim()) {
      setTab("hero");
      return void toast.error("Your name cannot be empty");
    }

    // empty paragraphs and half-filled rows are dropped rather than saved blank
    const cleaned: ISite = {
      ...form,
      about: { ...form.about, paragraphs: form.about.paragraphs.map((p) => p.trim()).filter(Boolean) },
      education: form.education.filter((item) => item.title.trim()),
      certificates: form.certificates.filter((item) => item.title.trim()),
    };

    setSaving(true);
    const res = await saveSite(cleaned);
    setSaving(false);

    if (!res.success) return void toast.error(res.message || "Could not save your changes");
    setForm(cleaned);
    setDirty(false);
    toast.success("Site content saved");
  };

  return (
    <form onSubmit={submit}>
      <PageHeader title="Site content" description="The text, images and links on your landing page.">
        {dirty && <span className="text-xs text-muted-foreground">Unsaved changes</span>}
        <Button type="submit" disabled={saving || !dirty}>
          {saving ? <Loader2 className="animate-spin" /> : <Save />}
          Save changes
        </Button>
      </PageHeader>

      <div className="mb-5 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="inline-flex gap-1 rounded-lg border border-border bg-card p-1" role="tablist">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              className={cn(
                "cursor-pointer whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                tab === key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {tab === "hero" && (
        <div className="grid gap-6 lg:grid-cols-3">
          <Panel className="space-y-5 p-5 lg:col-span-2">
            <Field label="Your name" required>
              <Input value={form.hero.name} onChange={(e) => setHero({ name: e.target.value })} />
            </Field>
            <Field label="Roles" hint="These rotate under your name. Press Enter or comma after each one.">
              <TagInput value={form.hero.roles} onChange={(roles) => setHero({ roles })} placeholder="Full Stack Web Developer" />
            </Field>
            <Field label="Intro">
              <Textarea value={form.hero.intro} onChange={(e) => setHero({ intro: e.target.value })} rows={4} />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Status badge" hint="Leave empty to hide it.">
                <Input value={form.hero.badge} onChange={(e) => setHero({ badge: e.target.value })} placeholder="Available for projects" />
              </Field>
              <Field label="Experience badge">
                <Input value={form.hero.experience} onChange={(e) => setHero({ experience: e.target.value })} placeholder="1+ Years Exp." />
              </Field>
            </div>
            <Field label="Resume link" hint="Used by the Download Resume and Download CV buttons. Leave empty to hide them.">
              <Input type="url" value={form.hero.resumeUrl} onChange={(e) => setHero({ resumeUrl: e.target.value })} placeholder="https://" />
            </Field>
          </Panel>
          <Panel className="h-fit space-y-3 p-5">
            <p className="text-sm font-medium">Portrait</p>
            <ImagePicker value={form.hero.image} onChange={(image) => setHero({ image })} />
            <p className="text-xs text-muted-foreground">Shown in a circle, so a square photo works best.</p>
          </Panel>
        </div>
      )}

      {tab === "about" && (
        <div className="grid gap-6 lg:grid-cols-3">
          <Panel className="space-y-5 p-5 lg:col-span-2">
            <Field label="Section subtitle">
              <Input value={form.about.subtitle} onChange={(e) => setAbout({ subtitle: e.target.value })} />
            </Field>
            <div className="space-y-3">
              <p className="text-sm font-medium">My story</p>
              {form.about.paragraphs.map((paragraph, index) => (
                <div key={index} className="flex gap-2">
                  <Textarea
                    value={paragraph}
                    onChange={(e) =>
                      setAbout({ paragraphs: form.about.paragraphs.map((p, i) => (i === index ? e.target.value : p)) })
                    }
                    rows={4}
                    aria-label={`Paragraph ${index + 1}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setAbout({ paragraphs: form.about.paragraphs.filter((_, i) => i !== index) })}
                    aria-label={`Remove paragraph ${index + 1}`}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => setAbout({ paragraphs: [...form.about.paragraphs, ""] })}>
                <Plus /> Add paragraph
              </Button>
            </div>
            <Field label="Traits" hint="The small tags under your story. Press Enter or comma after each one.">
              <TagInput value={form.about.traits} onChange={(traits) => setAbout({ traits })} placeholder="Growth Mindset" />
            </Field>
          </Panel>
          <Panel className="h-fit space-y-3 p-5">
            <p className="text-sm font-medium">Photo</p>
            <ImagePicker value={form.about.image} onChange={(image) => setAbout({ image })} />
          </Panel>
        </div>
      )}

      {tab === "education" && (
        <div className="space-y-4">
          {form.education.map((item, index) => (
            <Panel key={index} className="space-y-4 p-5">
              <ItemBar
                label="Entry"
                index={index}
                count={form.education.length}
                onMove={(direction) => update({ ...form, education: moved(form.education, index, direction) })}
                onRemove={() => update({ ...form, education: form.education.filter((_, i) => i !== index) })}
              />
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <Field label="Title" required>
                    <Input value={item.title} onChange={(e) => setEducation(index, { title: e.target.value })} placeholder="BSc in Computer Science" />
                  </Field>
                </div>
                <Field label="Years">
                  <Input value={item.year} onChange={(e) => setEducation(index, { year: e.target.value })} placeholder="2023 - 2027" />
                </Field>
              </div>
              <Field label="Institute">
                <Input value={item.institute} onChange={(e) => setEducation(index, { institute: e.target.value })} />
              </Field>
              <Field label="Details" hint="Bullet points. Press Enter after each one.">
                <TagInput
                  value={item.details}
                  onChange={(details) => setEducation(index, { details })}
                  placeholder="Major in Software Engineering."
                  splitOnComma={false}
                />
              </Field>
            </Panel>
          ))}
          <Button type="button" variant="outline" onClick={() => update({ ...form, education: [...form.education, blankEducation] })}>
            <Plus /> Add education
          </Button>
          <p className="text-xs text-muted-foreground">The first entry is shown as your main degree. With no entries the section is hidden.</p>
        </div>
      )}

      {tab === "certificates" && (
        <div className="space-y-4">
          {form.certificates.map((item, index) => (
            <Panel key={index} className="space-y-4 p-5">
              <ItemBar
                label="Achievement"
                index={index}
                count={form.certificates.length}
                onMove={(direction) => update({ ...form, certificates: moved(form.certificates, index, direction) })}
                onRemove={() => update({ ...form, certificates: form.certificates.filter((_, i) => i !== index) })}
              />
              <Field label="Title" required>
                <Input value={item.title} onChange={(e) => setCertificate(index, { title: e.target.value })} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <Field label="Issued by">
                    <Input value={item.org} onChange={(e) => setCertificate(index, { org: e.target.value })} />
                  </Field>
                </div>
                <Field label="Year">
                  <Input value={item.year} onChange={(e) => setCertificate(index, { year: e.target.value })} placeholder="2026" />
                </Field>
              </div>
              <Field label="Credential link">
                <Input type="url" value={item.link} onChange={(e) => setCertificate(index, { link: e.target.value })} placeholder="https://" />
              </Field>
            </Panel>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => update({ ...form, certificates: [...form.certificates, blankCertificate] })}
          >
            <Plus /> Add achievement
          </Button>
          <p className="text-xs text-muted-foreground">With no entries the section is hidden.</p>
        </div>
      )}

      {tab === "contact" && (
        <Panel className="max-w-2xl space-y-5 p-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Email">
              <Input type="email" value={form.contact.email} onChange={(e) => setContact({ email: e.target.value })} />
            </Field>
            <Field label="Phone">
              <Input type="tel" value={form.contact.phone} onChange={(e) => setContact({ phone: e.target.value })} />
            </Field>
          </div>
          <Field label="GitHub">
            <Input type="url" value={form.contact.github} onChange={(e) => setContact({ github: e.target.value })} placeholder="https://github.com/..." />
          </Field>
          <Field label="LinkedIn">
            <Input type="url" value={form.contact.linkedin} onChange={(e) => setContact({ linkedin: e.target.value })} placeholder="https://www.linkedin.com/in/..." />
          </Field>
          <p className="text-xs text-muted-foreground">Used in the hero, the contact section and the footer. Empty ones are hidden.</p>
        </Panel>
      )}
    </form>
  );
}
