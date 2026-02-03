"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, RotateCcw, Check } from "lucide-react";
import { Slider } from "@/components/ui/slider";
// افترضت أنك تستخدم مكونات Shadcn UI أو مكتبة مشابهة
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
  DrawerHeader,
} from "@/components/ui/drawer";

export function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // States للفلاتر (القيم المبدئية من الـ URL إذا وجدت)
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [isUsed, setIsUsed] = useState(
    searchParams.get("condition") === "used",
  );
  const [priceRange, setPriceRange] = useState([0, 100000]);

  const handleApply = () => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (city) params.set("city", city);
    params.set("condition", isUsed ? "used" : "new");
    // أضف باقي الباراميترز هنا...

    router.push(`/search?${params.toString()}`);
  };

  const handleReset = () => {
    setCategory("");
    setCity("");
    setIsUsed(false);
    router.push("/search");
  };

  return (
    <Drawer direction="right">
      {" "}
      {/* غيرت الاتجاه لليمين ليناسب اللغة العربية */}
      <DrawerTrigger asChild>
        <div className="w-full max-w-100 h-11 bg-slate-200/70 rounded-2xl flex items-center justify-center relative text-slate-600 text-sm border border-slate-200/50 hover:bg-slate-300 transition-all cursor-pointer group">
          <Search
            className="absolute right-4 text-slate-500 group-hover:text-blue-600 transition"
            size={18}
          />
          <span className="font-medium pr-4">بحث...</span>
        </div>
      </DrawerTrigger>
      <DrawerContent className="h-screen w-full max-w-md bg-white border-l border-slate-200 z-120 flex flex-col">
        <DrawerHeader className="sr-only">
          <DrawerTitle>فلاتر البحث</DrawerTitle>
          <DrawerDescription>
            استخدم الفلاتر أدناه لتضييق نطاق بحثك عن السيارات
          </DrawerDescription>
        </DrawerHeader>
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-xl font-black text-slate-800">تصفية النتائج</h2>
          <Search size={20} className="text-blue-600" />
        </div>

        {/* محتوى الفلاتر - مطابق للصورة الثانية */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8" dir="rtl">
          {/* الفئة */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-500">الفئة</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-12 bg-slate-100 border-none rounded-xl px-4 focus:ring-2 focus:ring-blue-500/20 outline-none"
            >
              <option value="">غير محدد</option>
              <option value="cars">سيارات</option>
              <option value="bikes">موتورات</option>
            </select>
          </div>

          {/* المدينة */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-500">المدينة</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full h-12 bg-slate-100 border-none rounded-xl px-4 focus:ring-2 focus:ring-blue-500/20 outline-none"
            >
              <option value="">كل المدن</option>
              <option value="suwayda">السويداء</option>
              <option value="damascus">دمشق</option>
            </select>
          </div>

          {/* مستعمل / جديد (Toggle) */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="font-bold text-slate-700">مستعمل</span>
            <button
              onClick={() => setIsUsed(!isUsed)}
              className={`w-12 h-6 rounded-full transition-colors relative ${isUsed ? "bg-blue-600" : "bg-slate-300"}`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isUsed ? "right-7" : "right-1"}`}
              />
            </button>
          </div>

          <div className="space-y-4" onPointerDown={(e) => e.stopPropagation()}>
            <label className="text-sm font-bold text-slate-500">
              نطاق السعر ($)
            </label>

            <div className="flex items-center gap-3" dir="rtl">
              {/* السعر الأدنى */}
              <div className="flex-1 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 mr-1">
                  من
                </span>
                <input
                  type="number"
                  placeholder="0"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value), priceRange[1]])
                  }
                  className="w-full h-12 bg-slate-100 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-xl px-4 outline-none transition-all font-bold text-slate-700"
                />
              </div>

              {/* فاصل بصري */}
              <div className="mt-5 text-slate-300">—</div>

              {/* السعر الأعلى */}
              <div className="flex-1 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 mr-1">
                  إلى
                </span>
                <input
                  type="number"
                  placeholder="200,000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  className="w-full h-12 bg-slate-100 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-xl px-4 outline-none transition-all font-bold text-slate-700"
                />
              </div>
            </div>
          </div>
        </div>
        {/* أزرار التحكم السفلية */}
        <div className="p-6 border-t border-slate-100 bg-white grid grid-cols-2 gap-4">
          <button
            onClick={handleApply}
            className="h-12 bg-blue-600 text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-blue-700 transition"
          >
            <Check size={18} />
            تطبيق
          </button>
          <button
            onClick={handleReset}
            className="h-12 bg-slate-100 text-slate-600 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-slate-200 transition"
          >
            <RotateCcw size={18} />
            إعادة تعيين
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
