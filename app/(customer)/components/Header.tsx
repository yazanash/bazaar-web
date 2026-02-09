"use client";

import { Bell, Search } from "lucide-react";
import { SearchFilters } from "./SearchFilters"; // استيراد المكون الجديد
import { Button } from "@/components/ui/button";
import Link from "next/link";
export function UnifiedHeader() {
  return (
    <header className="sticky top-0 z-110 bg-white backdrop-blur-md border-b border-slate-300/80 w-full flex justify-center">
      <div className="w-full max-w-5xl h-16 md:h-20 flex items-center justify-between px-4 gap-4">
        {/* اللوغو (يظهر في الموبايل فقط لأن السايدبار فيه اللوغو للويب) */}
        <div className="md:hidden flex items-center shrink-0">
          <h1 className="text-xl font-black text-blue-900 italic tracking-tighter">
            BAZAAR
          </h1>
        </div>

        {/* حقل البحث المستدعى كمكون منفصل */}
        <div className="flex-1 flex justify-center min-w-0">
          {/* <SearchFilters /> */}
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
        </div>
      </div>
    </header>
  );
}
