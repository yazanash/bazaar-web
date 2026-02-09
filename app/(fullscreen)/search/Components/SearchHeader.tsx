// components/search/SearchHeader.tsx
"use client";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { SearchFilters } from "./SearchFilters";

export default function SearchHeader() {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 p-3 md:p-4">
      <div className="max-w-5xl mx-auto flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <ArrowRight size={22} className="text-slate-600" />
        </button>
        <SearchFilters />
      </div>
    </div>
  );
}