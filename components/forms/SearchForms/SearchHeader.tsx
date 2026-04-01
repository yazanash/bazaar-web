"use client";
import { ArrowRight, ArrowLeft, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchFilters } from "./SearchFilters";
import { Suspense } from "react";
import { useTranslations, useLocale } from "next-intl";
import { QuickCategories } from "./QuickCategories";
import { BodyTypeQuickFilter } from "./BodyTypeQuickFilter";

export default function SearchHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const t = useTranslations("search");
  const category = searchParams.get("Category");

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-slate-200 p-3 shadow-sm flex flex-col gap-4">
      {/* السطر الأول: أزرار التحكم الأساسية */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="p-2 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors border border-slate-100"
        >
          {locale === "ar" ? <ArrowRight size={22} /> : <ArrowLeft size={22} />}
        </button>

        <h1 className="font-black text-slate-800 text-lg">
          {t("title") || "البحث"}
        </h1>

        <Suspense fallback={null}>
          <SearchFilters />
        </Suspense>
      </div>

      {/* السطر الثاني: الكاتيجوري (عرض كامل) */}
      <div className="max-w-5xl mx-auto w-full">
        <QuickCategories />
      </div>

      {/* السطر الثالث: BodyType (يظهر عند اختيار فئة) */}
      {category && (
        <div className="max-w-5xl mx-auto w-full animate-in fade-in slide-in-from-top-2 duration-300">
          <Suspense fallback={null}>
            <BodyTypeQuickFilter category={category} />
          </Suspense>
        </div>
      )}
    </div>
  );
}
