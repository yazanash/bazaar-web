"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Plus, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function MaterialNavBar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/profile", icon: User, label: "حسابي" },
    { href: "/", icon: Home, label: "الرئيسية" },
    { href: "/myads", icon: Plus, label: "إعلاناتي" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center z-100 p-0 pointer-events-none">
      <nav
        className={cn(
          "md:hidden",
          "pointer-events-auto",
          "w-full max-w-200 h-20 bg-slate-50/90 backdrop-blur-md border-t border-gray-200",
          " md:border md:shadow-2xl",
          "flex justify-around items-center px-6 transition-all duration-500",
        )}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center flex-1 gap-1 relative group"
            >
              <div
                className={cn(
                  "relative px-6 py-1.5 rounded-full transition-all duration-300",
                  isActive
                    ? "bg-cyan-100 text-cyan-900"
                    : "text-gray-500 group-hover:bg-gray-100",
                )}
              >
                <Icon size={26} strokeWidth={isActive ? 2.5 : 2} />
              </div>

              <span
                className={cn(
                  "text-[12px] font-bold transition-colors",
                  isActive ? "text-cyan-900" : "text-gray-400",
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
