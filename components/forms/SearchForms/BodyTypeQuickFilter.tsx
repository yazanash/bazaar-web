"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CarBodyType,
  TruckBodyType,
  MotorBodyType,
  ArabicLabels,
  EnglishLabels,
  Category,
} from "@/types/enums";
import { useLocale } from "next-intl";

export function BodyTypeQuickFilter({ category }: { category: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();

  // تحديد القائمة والاسم البرمجي للحقل بناءً على الفئة
  let options: any[] = [];
  let paramKey = "";

  if (category === Category.Passenger.toString()) {
    options = [
      CarBodyType.Sedan,
      CarBodyType.SUV,
      CarBodyType.Hatchback,
      CarBodyType.Coupe,
      CarBodyType.OffRoad,
      CarBodyType.Station,
      CarBodyType.Convertible,
    ];
    paramKey = "CarBodyType";
  } else if (category === Category.Motorcycles.toString()) {
    options = [
      MotorBodyType.Steel,
      MotorBodyType.Chrome,
      MotorBodyType.Aluminum,
      MotorBodyType.CarbonFiber,
    ];
    paramKey = "MotorBodyType";
  } else if (category === Category.Trucks.toString()) {
    options = [
      TruckBodyType.Refrigerated,
      TruckBodyType.Closed,
      TruckBodyType.Open,
      TruckBodyType.Tanker,
      TruckBodyType.Chassis,
      TruckBodyType.Tipper,
      TruckBodyType.Pickup,
    ];
    paramKey = "TruckBodyType";
  }

  const currentVal = searchParams.get(paramKey);

  const handleSelect = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentVal === val) params.delete(paramKey);
    else params.set(paramKey, val);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => handleSelect(opt.toString())}
          className={`px-3 py-1 rounded-lg border-2 text-[14] font-medium whitespace-nowrap transition-all ${
            currentVal === opt.toString()
              ? "bg-orange-500 text-white"
              : " text-black/70 border border-gray"
          }`}
        >
          {/* جلب الاسم من الـ Enum Labels */}
          {locale === "ar"
            ? ArabicLabels[paramKey as keyof typeof ArabicLabels][opt]
            : EnglishLabels[paramKey as keyof typeof EnglishLabels][opt]}
        </button>
      ))}
    </div>
  );
}
