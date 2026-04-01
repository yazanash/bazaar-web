import { ArabicLabels, EnglishLabels } from "@/types/enums";
import {
  Palette,
  Fuel,
  Gauge,
  Info,
  ParkingMeter,
  WalletCards,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

interface GeneralProps {
  description: string;
  color: string;
  fuelType: string | number;
  usedKilometers: number;
  isUsed: boolean;
  installment: boolean;
}

export function GeneralDetailsCard({
  description,
  color,
  fuelType,
  usedKilometers,
  isUsed,
  installment,
}: GeneralProps) {
  const t = useTranslations("ads.generalForm");
  const locale = useLocale();
  const isArabic = locale === "ar";
  return (
    <section className="px-4">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
        <h2 className="font-black text-slate-800 flex items-center gap-2">
          <Info size={20} className="text-blue-500" />
          {t("title")}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
            <Palette size={18} className="text-slate-400" />
            <div>
              <p className="text-[10px] font-bold text-slate-400">
                {t("color")}
              </p>
              <p className="text-sm font-black text-slate-700">
                {color || t("notSpecific")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
            <Fuel size={18} className="text-slate-400" />
            <div>
              <p className="text-[10px] font-bold text-slate-400">
                {" "}
                {t("fuelType")}
              </p>
              <p className="text-sm font-black text-slate-700">
                {(isArabic
                  ? ArabicLabels.FuelType[fuelType]
                  : EnglishLabels.FuelType[fuelType]) || t("notSpecific")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
            <ParkingMeter size={18} className="text-slate-400" />
            <div>
              <p className="text-[10px] font-bold text-slate-400">
                {t("usedKilometers")}
              </p>
              <p className="text-sm font-black text-slate-700">
                {usedKilometers || 0}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
            <Gauge size={18} className="text-slate-400" />
            <div>
              <p className="text-[10px] font-bold text-slate-400">
                {t("status")}
              </p>
              <p className="text-sm font-black text-slate-700">
                {isUsed ? t("used") : t("new")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
            <WalletCards size={18} className="text-slate-400" />
            <div>
              <p className="text-sm font-black text-slate-700">
                {installment ? t("installmentStatus") : ""}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {t("description")}
          </p>
          <p className="text-slate-600 text-sm leading-relaxed font-medium bg-slate-50/50 p-4 rounded-2xl italic">
            {description && description !== "none" ? `"${description}"` : ""}
          </p>
        </div>
      </div>
    </section>
  );
}
