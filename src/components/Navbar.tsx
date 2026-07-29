"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Smartphone, LineChart, Scale, Activity, Lightbulb, Bookmark } from "lucide-react";

const navItems = [
  { name: "Latest", href: "/", icon: Smartphone },
  { name: "Compare", href: "/compare", icon: Scale },
  { name: "Analysis", href: "/analysis", icon: Activity },
  { name: "History", href: "/history", icon: LineChart },
  { name: "For You", href: "/recommendations", icon: Lightbulb },
  { name: "Watchlist", href: "/watchlist", icon: Bookmark },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Smartphone className="w-6 h-6 text-black" />
            <span className="font-bold text-xl tracking-tight">Cashify <span className="font-light">Researcher</span></span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-secondary",
                    isActive ? "bg-secondary text-black font-semibold" : "text-muted-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
