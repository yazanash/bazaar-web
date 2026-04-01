import { MaterialNavBar } from "@/components/CustomerComponents/BottomNav";
import { SidebarLink } from "@/components/CustomerComponents/SidebarLink";
import { Home, Bell, Plus, Heart, User } from "lucide-react";
import { UnifiedHeader } from "@/components/CustomerComponents/Header";
import Image from "next/image";
// import { getTranslations } from "next-intl/server";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const t = await getTranslations("layout");
  return (
    <div className="h-screen w-full bg-[#F0F2F5] flex overflow-hidden font-sans ">
      <div className="flex-1 flex flex-col h-full relative min-w-0">
        <UnifiedHeader />
        <main className="flex-1 overflow-y-auto p-2 md:p-8 scroll-smooth">
          <div className="max-w-5xl mx-auto">{children}</div>
          <div className="h-24 md:hidden" />
        </main>
        <div className="absolute bottom-0 left-0 right-0 z-50">
          <MaterialNavBar />
        </div>
      </div>
    </div>
  );
}
