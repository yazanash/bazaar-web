"use client";

import { Bell } from "lucide-react";
import { SearchFilters } from "./SearchFilters"; // استيراد المكون الجديد
import { Button } from "@/components/ui/button";

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
          <SearchFilters />
        </div>

        

      </div>
    </header>
  );
}