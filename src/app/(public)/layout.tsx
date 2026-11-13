import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import SmoothScroll from "@/components/shared/SmoothScroll";
import { getSite } from "@/lib/site";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const site = await getSite();

  return (
    <SmoothScroll>
      <main className="min-h-dvh flex flex-col">
        <Navbar name={site.hero.name} />
        <div className="min-h-screen">{children}</div>
        <Footer site={site} />
      </main>
    </SmoothScroll>
  );
}
