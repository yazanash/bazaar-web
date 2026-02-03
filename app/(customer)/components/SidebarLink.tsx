"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SidebarLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      className={`
        flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 group
        ${isActive 
          ? "bg-blue-50 text-blue-600 shadow-sm" 
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}
      `}
    >
      {/* الأيقونة */}
      <div className={`transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
        {icon}
      </div>

      {/* النص */}
      <span className={`text-lg font-bold ${isActive ? "text-blue-700" : "text-slate-600"}`}>
        {label}
      </span>

     
    </Link>
  );
}