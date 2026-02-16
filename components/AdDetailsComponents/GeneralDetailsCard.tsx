import { ArabicLabels } from "@/types/enums";
import {
  Palette,
  Fuel,
  Gauge,
  Info,
  ParkingMeter,
  WalletCards,
} from "lucide-react";

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
  return (
    <section className="px-4">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
        <h2 className="font-black text-slate-800 flex items-center gap-2">
          <Info size={20} className="text-blue-500" />
          التفاصيل والوصف
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
            <Palette size={18} className="text-slate-400" />
            <div>
              <p className="text-[10px] font-bold text-slate-400">
                اللون خارجي
              </p>
              <p className="text-sm font-black text-slate-700">
                {color || "غير محدد"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
            <Fuel size={18} className="text-slate-400" />
            <div>
              <p className="text-[10px] font-bold text-slate-400">نوع الوقود</p>
              <p className="text-sm font-black text-slate-700">
                {ArabicLabels.FuelType[fuelType] || "غير محدد"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
            <ParkingMeter size={18} className="text-slate-400" />
            <div>
              <p className="text-[10px] font-bold text-slate-400">
                الكيلومترات
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
                الحالة (مستعمل / جديد)
              </p>
              <p className="text-sm font-black text-slate-700">
                {isUsed ? "جديد " : "مستعمل"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
            <WalletCards size={18} className="text-slate-400" />
            <div>
              <p className="text-[10px] font-bold text-slate-400">التقسيط</p>
              <p className="text-sm font-black text-slate-700">
                {installment ? " متاح" : " غير متاح"}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            وصف المعلن
          </p>
          <p className="text-slate-600 text-sm leading-relaxed font-medium bg-slate-50/50 p-4 rounded-2xl italic">
            {description && description !== "none"
              ? `"${description}"`
              : "لا يوجد وصف إضافي من قبل المعلن لهذا الإعلان."}
          </p>
        </div>
      </div>
    </section>
  );
}
