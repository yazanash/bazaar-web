import {
  Transmission,
  CarBodyType,
  DriveSystem,
  UsageType,
  ArabicLabels,
} from "@/types/enums";
import { CarFront, Users, DoorOpen, Settings2 } from "lucide-react";
import { CarSpecs } from "@/types/filters";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  states: CarSpecs;
  setStates: (val: Partial<CarSpecs>) => void;
}

export const CarSpecsSection = ({ states, setStates }: Props) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
      
      {/* شبكة خيارات الـ Select */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* ناقل الحركة */}
        <div className="space-y-2">
          <Label className="text-xs font-black text-slate-500 mr-1">ناقل الحركة</Label>
          <Select 
            value={states.Transmission} 
            onValueChange={(v) => setStates({ Transmission: v as Transmission })}
          >
            <SelectTrigger className="h-12 bg-white border-slate-200 rounded-xl font-bold shadow-sm">
              <SelectValue placeholder="اختر النوع" />
            </SelectTrigger>
            <SelectContent className="z-200">
              {[Transmission.Manual, Transmission.CVT, Transmission.DualClutch, Transmission.Automatic].map((t) => (
                <SelectItem key={t} value={t} className="font-bold">{ArabicLabels.Transmission[t]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* نوع الهيكل */}
        <div className="space-y-2">
          <Label className="text-xs font-black text-slate-500 mr-1">نوع الهيكل</Label>
          <Select 
            value={states.CarBodyType?.toString()} 
            onValueChange={(v) => setStates({ CarBodyType: v as unknown as CarBodyType })}
          >
            <SelectTrigger className="h-12 bg-white border-slate-200 rounded-xl font-bold shadow-sm">
              <SelectValue placeholder="اختر الهيكل" />
            </SelectTrigger>
            <SelectContent className="z-200">
              {[CarBodyType.Sedan, CarBodyType.OffRoad, CarBodyType.Station, CarBodyType.Hatchback, CarBodyType.Convertible, CarBodyType.Coupe, CarBodyType.SUV].map((b) => (
                <SelectItem key={b} value={b.toString()} className="font-bold">{ArabicLabels.CarBodyType[b]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* نظام الدفع */}
        <div className="space-y-2">
          <Label className="text-xs font-black text-slate-500 mr-1">نظام الدفع</Label>
          <Select 
            value={states.DriveSystem?.toString()} 
            onValueChange={(v) => setStates({ DriveSystem: v as unknown as DriveSystem })}
          >
            <SelectTrigger className="h-12 bg-white border-slate-200 rounded-xl font-bold shadow-sm">
              <SelectValue placeholder="اختر الدفع" />
            </SelectTrigger>
            <SelectContent className="z-200">
              {[DriveSystem.AWD, DriveSystem.FWD, DriveSystem.RWD, DriveSystem.FourWD].map((d) => (
                <SelectItem key={d} value={d.toString()} className="font-bold">{ArabicLabels.DriveSystem[d]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* نوع الاستخدام */}
        <div className="space-y-2">
          <Label className="text-xs font-black text-slate-500 mr-1">نوع الاستخدام</Label>
          <Select 
            value={states.UsageType?.toString()} 
            onValueChange={(v) => setStates({ UsageType: v as unknown as UsageType })}
          >
            <SelectTrigger className="h-12 bg-white border-slate-200 rounded-xl font-bold shadow-sm">
              <SelectValue placeholder="اختر الاستخدام" />
            </SelectTrigger>
            <SelectContent className="z-200">
              {[UsageType.ExternalUsage, UsageType.InternalUsage, UsageType.Personal].map((u) => (
                <SelectItem key={u} value={u.toString()} className="font-bold">{ArabicLabels.UsageType[u]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* حقول الأرقام (مقاعد وأبواب) */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-xs font-bold text-slate-500 flex items-center gap-2">
            <Users size={14} /> المقاعد
          </Label>
          <Input
            type="number"
            placeholder="0"
            value={states.SeatsCount || ""}
            onChange={(e) => setStates({ SeatsCount: e.target.value ? Number(e.target.value) : undefined })}
            className="h-12 bg-slate-50 border-slate-200 rounded-xl font-bold focus-visible:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold text-slate-500 flex items-center gap-2">
            <DoorOpen size={14} /> الأبواب
          </Label>
          <Input
            type="number"
            placeholder="0"
            value={states.DoorsCount || ""}
            onChange={(e) => setStates({ DoorsCount: e.target.value ? Number(e.target.value) : undefined })}
            className="h-12 bg-slate-50 border-slate-200 rounded-xl font-bold focus-visible:ring-blue-500"
          />
        </div>
      </div>

      {/* توجل "معدلة" بشكل عصري */}
      <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-600">
            <Settings2 size={20} />
          </div>
          <div>
            <p className="font-bold text-slate-700 text-sm">سيارة معدلة</p>
            <p className="text-[10px] text-slate-500">هل تحتوي إضافات غير أساسية؟</p>
          </div>
        </div>
        <Switch 
          checked={states.IsModified} 
          onCheckedChange={(v) => setStates({ IsModified: v })} 
        />
      </div>
    </div>
  );
};