import SiteForm from "@/components/admin/SiteForm";
import { getSite } from "@/lib/site";

export default async function SiteContentPage() {
  const site = await getSite();
  return <SiteForm site={site} />;
}
