"use client";
import { Heart, Home, Plus, Search, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export function UnifiedHeader() {
  return (
   <header className="sticky top-0 z-110 bg-white/80 backdrop-blur-md border-b border-slate-300/80 w-full flex justify-center">
      <div className="w-full max-w-5xl h-16 md:h-20 flex items-center justify-between px-4 gap-4">
        
        {/* اللوجو */}
        <Link href="/" className="flex items-center shrink-0">
          <Image src="/logo.png" alt="Bazaar" width={40} height={40} className="w-auto h-10 object-contain" priority />
        </Link>

        {/* البحث - صار أذكى في التوسع */}
        <div className="flex-1 flex justify-center max-w-md">
          <Link href="/search" className="w-full h-11 bg-slate-100 rounded-2xl flex items-center px-4 text-slate-500 text-sm border border-slate-200 hover:bg-slate-200 transition-all">
            <Search size={18} className="ml-2" />
            <span>بحث...</span>
          </Link>
        </div>

        {/* أزرار التنقل للشاشات الكبيرة فقط */}
        <nav className="hidden md:flex items-center gap-2">
          <HeaderLink href="/" icon={<Home size={20} />} label="الرئيسية" />
          <HeaderLink href="/myads" icon={<Plus size={20} />} label="إعلاناتي" />
          <HeaderLink href="/favorites" icon={<Heart size={20} />} label="المفضلة" />
          <HeaderLink href="/profile" icon={<User size={20} />} label="حسابي" />
        </nav>

        {/* زر المفضل للموبايل فقط (عشان ما يختفي الهيدر) */}
        <div className="md:hidden">
           <Link href="/favorites" className="p-2 text-slate-600"><Heart size={24} /></Link>
        </div>
      </div>
    </header>
  );
}
function HeaderLink({ href, icon, label }: { href: string, icon: any, label: string }) {
  return (
    <Link href={href} className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-blue-600 transition-all font-bold text-sm">
      {icon}
      <span>{label}</span>
    </Link>
  );
}
