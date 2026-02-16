"use client";
import Link from "next/link";
import { Car, Motorbike, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { ArabicLabels, Category } from "@/types/enums";
export function Categories() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleCategoryClick = (categoryValue: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (categoryValue === Category.NotSpecified) {
      params.delete("Category");
    } else {
      params.set("Category", categoryValue.toString());
    }

    router.push(`/search?${params.toString()}`);
  };
  const cats = [
    { id: Category.Passenger, label: "سيارات", icon: Car },
    { id: Category.Motorcycles, label: "موتورات", icon: Motorbike },
    { id: Category.Trucks, label: "شاحنات", icon: Truck },
  ];

  return (
    <div className="px-4 py-4">
      <div className="flex gap-3">
        {cats.map((item) => {
          const Icon = item.icon;

          return (
            <button
              onClick={() => handleCategoryClick(item.id)}
              key={item.id}
              className="flex-1 flex flex-col items-center justify-center gap-2 py-4 
                         bg-white border-2 border-slate-200 rounded-2xl
                         hover:border-blue-400 hover:bg-blue-50/30 
                         transition-all duration-300 group shadow-sm active:scale-95"
            >
              <Icon
                size={28}
                className="text-slate-500 group-hover:text-blue-600 transition-colors"
                strokeWidth={2}
              />

              <span className="text-sm font-black text-slate-700 group-hover:text-blue-700">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
