import { TruckBodyType, TrucksUsageType, ArabicLabels } from "@/types/enums";
import { TruckSpecs } from "@/types/filters";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Truck, Weight } from "lucide-react";

interface Props {
  states: TruckSpecs;
  setStates: (val: Partial<TruckSpecs>) => void;
}

export const TruckSpecsSection = ({ states, setStates }: Props) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="grid grid-cols-1 gap-4">
        {/* هيكل الشاحنة */}
        <div className="space-y-2">
          <Label className="text-xs font-black text-slate-500 mr-1 flex items-center gap-2">
            <Truck size={14} className="text-slate-400" /> هيكل الشاحنة
          </Label>
          <Select
            value={states.TruckBodyType?.toString()}
            onValueChange={(v) =>
              setStates({ TruckBodyType: v as unknown as TruckBodyType })
            }
          >
            <SelectTrigger className="h-12 bg-white border-slate-200 rounded-xl font-bold shadow-sm text-right">
              <SelectValue placeholder="اختر نوع الهيكل" />
            </SelectTrigger>
            <SelectContent className="z-200">
              {[
                TruckBodyType.Chassis,
                TruckBodyType.Closed,
                TruckBodyType.Open,
                TruckBodyType.Pickup,
                TruckBodyType.Refrigerated,
                TruckBodyType.Tanker,
                TruckBodyType.Tipper,
                TruckBodyType.NotSpecified,
              ].map((b) => (
                <SelectItem key={b} value={b.toString()} className="font-bold">
                  {ArabicLabels.TruckBodyType[b]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* نوع الاستخدام للشاحنات */}
        <div className="space-y-2">
          <Label className="text-xs font-black text-slate-500 mr-1">
            نوع الاستخدام
          </Label>
          <Select
            value={states.TrucksUsageType?.toString()}
            onValueChange={(v) =>
              setStates({ TrucksUsageType: v as unknown as TrucksUsageType })
            }
          >
            <SelectTrigger className="h-12 bg-white border-slate-200 rounded-xl font-bold shadow-sm text-right">
              <SelectValue placeholder="اختر الاستخدام" />
            </SelectTrigger>
            <SelectContent className="z-200">
              {[
                TrucksUsageType.NotSpecified,
                TrucksUsageType.Personal,
                TrucksUsageType.HeavyTransport,
                TrucksUsageType.WaterTanker,
                TrucksUsageType.Refrigerated,
                TrucksUsageType.FurnitureMoving,
                TrucksUsageType.Construction,
              ].map((u) => (
                <SelectItem key={u} value={u.toString()} className="font-bold">
                  {ArabicLabels.TrucksUsageType[u]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* قسم الحمولة (Payload) */}
      <div className="space-y-3">
        <Label className="text-xs font-black text-slate-500 mr-1 flex items-center gap-2">
          <Weight size={14} className="text-slate-400" /> سعة الحمولة (طن)
        </Label>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <Input
              type="number"
              placeholder="من"
              value={states.PayloadFrom || ""}
              onChange={(e) =>
                setStates({
                  PayloadFrom: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
              className="h-12 bg-slate-50 border-slate-200 rounded-xl font-bold focus-visible:ring-slate-400"
            />
          </div>
          <div className="relative">
            <Input
              type="number"
              placeholder="إلى"
              value={states.PayloadTo || ""}
              onChange={(e) =>
                setStates({
                  PayloadTo: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
              className="h-12 bg-slate-50 border-slate-200 rounded-xl font-bold focus-visible:ring-slate-400"
            />
          </div>
        </div>
      </div>

      <div className="p-3 bg-slate-100 rounded-xl border border-dashed border-slate-300">
        <p className="text-[10px] text-slate-500 text-center font-medium leading-relaxed">
          تأكد من اختيار نوع الهيكل الصحيح لفلترة النتائج بدقة للمعدات الثقيلة.
        </p>
      </div>
    </div>
  );
};
