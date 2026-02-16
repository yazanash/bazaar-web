"use client";
import { Heart, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export function UnifiedHeader() {
  return (
    <header className="sticky top-0 z-110 bg-white backdrop-blur-md border-b border-slate-300/80 w-full flex justify-center">
      <div className="w-full max-w-5xl h-16 md:h-20 flex items-center justify-between px-4 gap-4">
        <div className="md:hidden flex items-center shrink-0">
          <Image
            src="/logo.png"
            alt="Bazaar Logo"
            width={150}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </div>

        <div className="flex-1 flex justify-center min-w-0">
          <Link
            href="/search"
            className="w-full max-w-100 h-11 bg-slate-200/70 rounded-2xl flex items-center justify-center relative text-slate-600 text-sm border border-slate-200/50 hover:bg-slate-300 transition-all cursor-pointer group"
          >
            <Search
              className="absolute right-4 text-slate-500 group-hover:text-blue-600 transition"
              size={18}
            />
            <span className="font-medium pr-4">بحث...</span>
          </Link>
          <Link
            href="/favorites"
            className={`
        flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 group
        text-slate-500 hover:bg-slate-50 hover:text-slate-900
      `}
          >
            <div
              className={`transition-transform duration-200 group-hover:scale-110`}
            >
              <Heart size={22} />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
