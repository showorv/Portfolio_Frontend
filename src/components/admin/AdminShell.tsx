"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ExternalLink,
  FolderKanban,
  Images,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  PanelsTopLeft,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import { logout } from "@/actions/auth";
import { ModeToggle } from "@/components/shared/Toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { name: "Skills", href: "/dashboard/skills", icon: Sparkles },
  { name: "Media", href: "/dashboard/media", icon: Images },
  { name: "Messages", href: "/dashboard/messages", icon: Mail },
  { name: "Site content", href: "/dashboard/site", icon: PanelsTopLeft },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const isActive = (pathname: string, href: string) =>
  href === "/dashboard" ? pathname === href : pathname.startsWith(href);

export default function AdminShell({
  children,
  unreadMessages = 0,
}: {
  children: React.ReactNode;
  unreadMessages?: number;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // close the drawer after navigating on mobile
  useEffect(() => setOpen(false), [pathname]);

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
    router.refresh();
  };

  const current = navigation.find((item) => isActive(pathname, item.href));

  const nav = (
    <div className="flex h-full flex-col">
      <Link href="/dashboard" className="flex items-center gap-3 px-5 h-16 border-b border-border shrink-0">
        <div className="size-9 rounded-xl bg-primary text-primary-foreground grid place-items-center font-bold text-sm">
          YS
        </div>
        <div className="leading-tight">
          <p className="font-semibold text-sm">Portfolio Admin</p>
          <p className="text-xs text-muted-foreground">Yousuf Showrov</p>
        </div>
      </Link>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navigation.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="size-[18px] shrink-0" />
              <span className="flex-1">{item.name}</span>
              {item.name === "Messages" && unreadMessages > 0 && (
                <span
                  className={cn(
                    "min-w-5 rounded-full px-1.5 text-center text-xs font-semibold",
                    active ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground"
                  )}
                >
                  {unreadMessages}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3 space-y-1 shrink-0">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <ExternalLink className="size-[18px]" />
          View site
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer"
        >
          <LogOut className="size-[18px]" />
          Log out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-dvh bg-muted/40">
      {/* desktop sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 border-r border-border bg-card">{nav}</aside>

      {/* mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] border-r border-border bg-card shadow-2xl"
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="absolute right-3 top-4 rounded-md p-1.5 text-muted-foreground hover:bg-accent"
              >
                <X className="size-5" />
              </button>
              {nav}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu />
          </Button>
          <h1 className="flex-1 truncate text-base font-semibold">{current?.name ?? "Dashboard"}</h1>
          <ModeToggle />
        </header>

        <main className="mx-auto w-full max-w-6xl p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
