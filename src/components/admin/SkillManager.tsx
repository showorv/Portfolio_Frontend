"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Pencil, Plus, Sparkles, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteSkill, saveSkill } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { thumb } from "@/lib/upload";
import type { ISkill } from "@/types/skillTypes";
import ImagePicker from "./ImagePicker";
import { ConfirmDialog, EmptyState, Field, PageHeader, Panel } from "./ui";

// the landing page groups skills by exactly these categories
const CATEGORIES = ["Frontend", "Backend", "Database", "Tools"];

const blank = { name: "", category: CATEGORIES[0], thumbnail: "" };

export default function SkillManager({ skills }: { skills: ISkill[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<{ id: string | null; form: typeof blank } | null>(null);
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState<ISkill | null>(null);

  const groups = [
    ...CATEGORIES.map((category) => ({ category, items: skills.filter((s) => s.category === category) })),
    { category: "Other", items: skills.filter((s) => !CATEGORIES.includes(s.category)) },
  ].filter((group) => group.items.length);

  const setField = (key: keyof typeof blank, value: string) =>
    setEditing((prev) => prev && { ...prev, form: { ...prev.form, [key]: value } });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    if (editing.form.name.trim().length < 2) return void toast.error("Give the skill a name");

    setSaving(true);
    const res = await saveSkill(editing.id, editing.form);
    setSaving(false);

    if (!res.success) return void toast.error(res.message || "Could not save the skill");
    toast.success(editing.id ? "Skill updated" : "Skill added");
    setEditing(null);
    router.refresh();
  };

  const remove = async () => {
    if (!toDelete?._id) return;
    const res = await deleteSkill(toDelete._id);
    setToDelete(null);
    if (!res.success) return void toast.error(res.message || "Delete failed");
    toast.success("Skill deleted");
    router.refresh();
  };

  const addButton = (
    <Button onClick={() => setEditing({ id: null, form: blank })}>
      <Plus /> Add skill
    </Button>
  );

  return (
    <>
      <PageHeader title="Skills" description={`${skills.length} skill${skills.length === 1 ? "" : "s"} in ${groups.length} categor${groups.length === 1 ? "y" : "ies"}`}>
        {addButton}
      </PageHeader>

      {skills.length === 0 ? (
        <EmptyState icon={Sparkles} title="No skills yet" description="Add the technologies you work with.">
          {addButton}
        </EmptyState>
      ) : (
        <div className="space-y-6">
          {groups.map(({ category, items }) => (
            <Panel key={category} className="p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {category} <span className="font-normal">· {items.length}</span>
                </h3>
                {category !== "Other" && (
                  <Button variant="ghost" size="sm" onClick={() => setEditing({ id: null, form: { ...blank, category } })}>
                    <Plus /> Add
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((skill) => (
                  <div key={skill._id} className="flex items-center gap-3 rounded-lg border border-border p-2.5">
                    <div className="grid size-10 shrink-0 place-items-center rounded-md bg-muted/60">
                      {skill.thumbnail && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={thumb(skill.thumbnail, 96)} alt="" className="size-7 object-contain" />
                      )}
                    </div>
                    <span className="min-w-0 flex-1 truncate text-sm font-medium">{skill.name}</span>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Edit ${skill.name}`}
                      onClick={() =>
                        setEditing({
                          id: skill._id ?? null,
                          form: { name: skill.name ?? "", category: skill.category || CATEGORIES[0], thumbnail: skill.thumbnail ?? "" },
                        })
                      }
                    >
                      <Pencil />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Delete ${skill.name}`}
                      onClick={() => setToDelete(skill)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                ))}
              </div>
            </Panel>
          ))}
        </div>
      )}

      <Dialog open={Boolean(editing)} onOpenChange={(open) => !open && !saving && setEditing(null)}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={submit} className="space-y-5">
            <DialogHeader>
              <DialogTitle>{editing?.id ? "Edit skill" : "Add skill"}</DialogTitle>
              <DialogDescription>Shown in the Technical Skills section of your site.</DialogDescription>
            </DialogHeader>
            <Field label="Name" required>
              <Input value={editing?.form.name ?? ""} onChange={(e) => setField("name", e.target.value)} placeholder="TypeScript" autoFocus />
            </Field>
            <Field label="Category">
              <select
                value={editing?.form.category ?? CATEGORIES[0]}
                onChange={(e) => setField("category", e.target.value)}
                className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:bg-input/30"
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category} className="bg-background">
                    {category}
                  </option>
                ))}
              </select>
            </Field>
            <div className="space-y-1.5">
              <p className="text-sm font-medium">Icon</p>
              <ImagePicker compact value={editing?.form.thumbnail} onChange={(url) => setField("thumbnail", url)} />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditing(null)} disabled={saving}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving && <Loader2 className="animate-spin" />}
                {editing?.id ? "Save changes" : "Add skill"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={Boolean(toDelete)}
        onOpenChange={(open) => !open && setToDelete(null)}
        title="Delete this skill?"
        description={`“${toDelete?.name}” will be removed from your site.`}
        onConfirm={remove}
      />
    </>
  );
}
