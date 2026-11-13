"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { changePassword } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, Panel } from "./ui";

export default function PasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (next.length < 8) return void toast.error("New password must be at least 8 characters");
    if (next !== confirm) return void toast.error("The new passwords do not match");
    if (next === current) return void toast.error("Choose a password different from the current one");

    setSaving(true);
    const res = await changePassword(current, next);
    setSaving(false);

    if (!res.success) return void toast.error(res.message || "Could not change the password");

    toast.success("Password changed");
    setCurrent("");
    setNext("");
    setConfirm("");
  };

  return (
    <Panel className="max-w-md p-5">
      <form onSubmit={submit} className="space-y-5">
        <div>
          <h3 className="font-semibold">Change password</h3>
          <p className="mt-1 text-sm text-muted-foreground">You stay signed in on this device after changing it.</p>
        </div>
        <Field label="Current password" required>
          <Input type="password" required autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} />
        </Field>
        <Field label="New password" required hint="At least 8 characters.">
          <Input type="password" required autoComplete="new-password" value={next} onChange={(e) => setNext(e.target.value)} />
        </Field>
        <Field label="Confirm new password" required>
          <Input type="password" required autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        </Field>
        <Button type="submit" disabled={saving}>
          {saving && <Loader2 className="animate-spin" />}
          Change password
        </Button>
      </form>
    </Panel>
  );
}
