import PasswordForm from "@/components/admin/PasswordForm";
import { PageHeader } from "@/components/admin/ui";

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Your admin account." />
      <PasswordForm />
    </>
  );
}
