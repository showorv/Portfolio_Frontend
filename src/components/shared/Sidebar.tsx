"use client"
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Home, User, Settings, LogOut, CirclePlus, MessageCircle, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { logout } from "@/actions/login";
import { toast } from "sonner";

const navigation = [
  { name: "Blogs", href: "/dashboard/blogs", icon: Menu  },
  { name: "Create-Blog", href: "/dashboard/blogs/create", icon: CirclePlus },
  { name: "Projects", href: "/dashboard/projects", icon: Menu },
  { name: "Create-Project", href: "/dashboard/projects/create", icon: CirclePlus },
  { name: "Skills", href: "/dashboard/skills", icon: Menu },
  { name: "Add Skil", href: "/dashboard/skills/create", icon: CirclePlus },
  { name: "Message Info", href: "/dashboard/messages", icon: MessageCircle },
  
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname()
  const router = useRouter()

  console.log(pathname);

  const handleLogout =async ()=>{
    try {
        const data = await logout();
        if (data.success) {
          router.push("/login");
        } else {
          toast.error(data.message || "Logout failed");
        }
      } catch (err) {
        toast.error("Something went wrong");
      }
  }
  
  

  return (
   

    <aside
      className={cn(
        "min-h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >

      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        {!collapsed && <h1 className="text-lg font-bold">Admin Dashboard</h1>}
        <button
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex flex-col gap-10">
      <nav className="mt-4 flex flex-col gap-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 p-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                collapsed ? "justify-center" : "",
                isActive ? "bg-gray-200 dark:bg-gray-700 font-semibold" : ""
              )}
            >
              <item.icon className="w-5 h-5" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
      <Button
      className={cn(
        "w-40 mx-auto flex items-center justify-center gap-2",
        collapsed ? "w-10 p-2" : "w-40"
      )}

      onClick={handleLogout}
    >
      <LogOut className="w-5 h-5" />
      {!collapsed && <span>Logout</span>} 
    </Button>
    </div>
    </aside>
  
  );
}
