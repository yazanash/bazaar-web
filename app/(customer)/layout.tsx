import { MaterialNavBar } from "@/components/CustomerComponents/BottomNav";
import { SidebarLink } from "@/components/CustomerComponents/SidebarLink";
import { Home, Bell, Plus, Heart, User } from "lucide-react";
import { UnifiedHeader } from "@/components/CustomerComponents/Header";
import Image from "next/image";
export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full bg-[#F0F2F5] flex overflow-hidden font-sans ">
      <aside className="hidden md:flex flex-col w-72 bg-white border-e border-slate-200 shadow-sm">
        <div className="p-8">
          <Image
            src="/logo.png" 
            alt="Bazaar Logo"
            width={150} 
            height={40} 
            className="h-10 w-auto object-contain" 
            priority 
          />
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <SidebarLink href="/" icon={<Home size={22} />} label="Home" />
          <SidebarLink href="/myads" icon={<Plus size={22} />} label="My Ads" />
          <SidebarLink
            href="/favorites"
            icon={<Heart size={22} />}
            label="Favorites"
          />
          <SidebarLink
            href="/profile"
            icon={<User size={22} />}
            label="Account"
          />
        </nav>

        <div className="p-6 mt-auto border-t border-slate-100">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Bazaar v1.0
          </p>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-full relative min-w-0">
        <UnifiedHeader />

        <main className="flex-1 overflow-y-auto p-2 md:p-8 scroll-smooth">
          <div className="max-w-5xl mx-auto">{children}</div>
          <div className="h-24 md:hidden" />
        </main>

        <div className="md:hidden absolute bottom-0 left-0 right-0 z-50">
          <MaterialNavBar />
        </div>
      </div>
    </div>
  );
}
