"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Category, ArabicLabels, EnglishLabels } from "@/types/enums";
import { useLocale } from "next-intl";

export function QuickCategories() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const currentCat = searchParams.get("Category");

  const cats = [Category.Passenger, Category.Motorcycles, Category.Trucks];

  const handleSelect = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentCat === val) {
      params.delete("Category");
      params.delete("CarBodyType"); // تنظيف الأنواع عند إلغاء الفئة
      params.delete("MotorBodyType");
      params.delete("TruckBodyType");
    } else {
      params.set("Category", val);
      // تنظيف الأنواع القديمة لأنها لا تتوافق مع الفئة الجديدة
      params.delete("CarBodyType");
      params.delete("MotorBodyType");
      params.delete("TruckBodyType");
    }
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 px-1">
      {cats.map((cat) => {
        const isActive = currentCat === cat.toString();
        return (
          <button
            key={cat}
            onClick={() => handleSelect(cat.toString())}
            className={`
              px-5 py-2 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-300
              ${
                isActive
                  ? "bg-[#1A68A6] text-white shadow-md shadow-blue-200 border-[#1A68A6]"
                  : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 shadow-sm"
              }
              active:scale-95 border-2
            `}
          >
            {locale === "en"
              ? EnglishLabels.Category[cat]
              : ArabicLabels.Category[cat]}
          </button>
        );
      })}
    </div>
  );
}
