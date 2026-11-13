import { getSkills } from "@/actions/admin";
import SkillManager from "@/components/admin/SkillManager";

export default async function SkillsPage() {
  const res = await getSkills();
  return <SkillManager skills={res.data ?? []} />;
}
